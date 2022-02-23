---
layout: post
title:  " Github Action을 사용하여 빌드시 동적으로 변숫값 주입하기 (feat. Dynamic Variable Substitution) "
categories: Github
author: goodGid
---
* content
{:toc}

## Problem

* Github Action을 사용하면 

  젠킨스와 같은 다른 툴을 사용하지 않고 CI(Continuous Integration)가 가능하다.

* 그런데 일반적으로 

  DB 정보와 같은 값들을 가진 resource 파일은 
  
  ignore 처리를 하여 Repository에 노출하지 않는다.

  그러므로 만약 빌드 시 resource 정보를 참조해야 하는 경우엔 빌드를 실패하게 된다.

* 그래서 이 글에서는 

  빌드를 성공하기 위해 Github Action에서 **동적**으로 변수에 값을 주입하는 방법에 대해 알아본다.



---

## 들어가기 앞서

* 예제 프로젝트는 

  Github Action과 AWS를 사용하여 CI/CD 구축을 해두었다.

* 이 글에서 저 모든 과정을 설명하는 건 너무 많기에

  동적으로 변수에 값을 주입하는 부분에 대해서만 언급하려고 한다.

---

## Github Action Workflows

![](/assets/img/github/Github-Action-Dynamic-Variable-Substitution_1.png)

* Github Action을 사용하기 위해선 

  *.github/workflows* 경로에 [workflow](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/.github/workflows/deploy.yaml#L26)를 정의해야 하고

  위 사진은 workflow에서 동적으로 값을 주입해주는 코드 부분이다.

* 코드는 매우 직관적이며 

  주입하는 방법은 보는 바와 같이 2가지가 있고 편의에 맞게 사용하면 된다.

---

<ol>
  <li>
    <p> Github에 Secrets 값 사용 (= "from deploy.yaml")</p>
    <p><img src="/assets/img/github/Github-Action-Dynamic-Variable-Substitution_2.png" alt=""></p>
  </li>
  <li>
    <p> 원하는 값 명시 (= "from deploy.yaml")</p>
  </li>
</ol>

---

### Code Analysis

* 위 코드를 보면 override.value라는 변수에 동적으로 값을 주입하고 있다.

  그러면 [실제 프로젝트](https://github.com/goodGid/Github-Action-Variable-Substitution)에서 저 변수가 어떻게 사용되는지 확인해보자.

* 프로젝트에서 우리가 확인해야 하는 부분은 2곳이다.

---

> **override.value** 변수가 선언되어 있는 [application.yaml](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/src/main/resources/application.yaml)

``` yaml
override:
  value: 'from application.yaml'
```

---

> **override.value** 변수를 사용하는 [DemoController](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/src/main/java/dev/be/github_action_variable_substitution/controller/DemoController.java)

![](/assets/img/github/Github-Action-Dynamic-Variable-Substitution_3.png)

---

### 요청 결과 (동적 변수 주입 X)

![](/assets/img/github/Github-Action-Dynamic-Variable-Substitution_4.png)

* Local에서 서버를 띄워 요청을 하면 [application.yaml](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/src/main/resources/application.yaml)에 정의되어 있는 값을 볼 수 있다.

---

### 요청 결과 (동적 변수 주입 O)

![](/assets/img/github/Github-Action-Dynamic-Variable-Substitution_5.png)

* 다음으로 Github Action을 통해 빌드 된 서버에 요청하였을 경우 

  동적으로 주입했던 **from deploy.yaml** 값이 나오는 것을 볼 수 있다.

---

### 실제 프로젝트 적용 예시

> deploy.yaml

``` yaml
- name: Set Yaml
  uses: microsoft/variable-substitution@v1
  with:
    files: {% raw %}${{ env.RESOURCE_PATH }} {% endraw %}
  env:
    spring.security.oauth2.client.registration.google.client-id: {% raw %}${{ secrets.GOOGLE_CLIENT_ID }} {% endraw %}
    spring.security.oauth2.client.registration.google.client-secret: {% raw %}${{ secrets.GOOGLE_CLIENT_SECRET }} {% endraw %}
    spring.security.oauth2.client.registration.google.redirect-uri: {% raw %}${{ secrets.GOOGLE_REDIRECT_URI }} {% endraw %}
    spring.datasource.url: {% raw %}${{ secrets.RDS_HOST }} {% endraw %}
    spring.datasource.username: {% raw %}${{ secrets.RDS_USERNAME }} {% endraw %}
    spring.datasource.password: {% raw %}${{ secrets.RDS_PASSWORD }} {% endraw %}
    jwt.secret: {% raw %}${{ secrets.JWT_SECRET }} {% endraw %}
    jwt.tokenSecret: {% raw %}${{ secrets.JWT_TOKEN_SECRET }} {% endraw %}
    jwt.authorizationRedirectUris.0: {% raw %}${{ secrets.CLIENT_REDIRECT_URI_1 }} {% endraw %}
    jwt.authorizationRedirectUris.1: {% raw %}${{ secrets.CLIENT_REDIRECT_URI_2 }} {% endraw %} 
```

> src/main/resources/application.yaml

``` yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: ${google.client-id}
            client-secret: ${google.client-secret}
            redirect-uri: ${baseurl}/oauth2/code/google
            scope: profile,email
  jpa:
    generate-ddl: true
    show-sql: true
    database: mysql
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        show_sql: true
        format_sql: true
        dialect: org.hibernate.dialect.MySQL5Dialect
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://${rds.hostname}:${rds.port}/${rds.dbname}?characterEncoding=utf8
    username: ${rds.username}
    password: ${rds.password}

# 토큰 관련 secret Key 및 RedirectUri 설정
jwt:
  secret: ${jwt.secret}
  tokenSecret: ${jwt.token-secret}
  tokenExpiry: 1800000
  refreshTokenExpiry: 604800000
  authorizationRedirectUris:
    - ${redirecturi1}
    - ${redirecturi2}
```

* 실제로 프로젝트에서는 위와 같이 적용을 하였다.

* 참고로 deploy.yaml에서 주입된 값이 application.yaml에 있는 값을 덮어쓴다.

  그러므로 application.yaml에 있는 값은 무시해도 된다.

  즉 다음처럼 value에 이상한 값을 넣어도 정상적으로 동작한다.

  = value에 적혀있는 값은 신경 쓰지 않아도 된다.

``` yaml
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: xxx
    username: yyy
    password: zzz
```

---

## Summary

* 우리는 Github Action을 사용하여 빌드 시

  동적으로 특정 변수에 값을 주입하는 방법에 대해 알아봤다.

* 누군가에게 유용한 정보가 되었으면 좋겠다 ! 

* 끝으로 관련 코드는 [Github](https://github.com/goodGid/Github-Action-Variable-Substitution)에서 확인할 수 있다.