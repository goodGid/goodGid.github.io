---
layout: post
title:  " Spring Boot 프로젝트에 DB 연동하기 : 연동 방법은 매우 많다 ! "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## Prologue

* Spring Boot 프로젝트에서 

  DB 연동하는 방법에 대해 알아본다.

  이 중 마음에 드는 방법으로 설정하면 된다.



---

## Common Property

> db.yml

``` java
db:
  url: jdbc:mysql://xxx:3306/HelloGoodGid
  username: hello
  password: goodGid
  driver-class-name: com.mysql.cj.jdbc.Driver
```

* 기본적으로 DB 연동에 필요한 정보들은 따로 파일로 관리한다.


---


## DB Config Setting

### 첫 번째 방법

* 대부분 많이 사용하는 방식일 텐데

  application.yml에 DB Property 값을 설정해주는 방법이다.

> application.yml

``` java
spring:
  datasource:
    url: ${db.url}
    username: ${db.username}
    password: ${db.password}
    driver-class-name: ${db.driver-class-name}
```

* 주의할 점은 

  application.yml에는 DB 정보뿐만 아니라 

  다른 설정들이 들어가서 public 하게 Open이 되어있다.

* 그런 파일에 DB 정보를 노출하면 안 되니

  DB 정보는 따로 관리를 해주는 게 안전하다.

  그래서 필자는 db.yml에 있는 값을 참조해서 매핑이 될 수 있도록 하였다.

* 하지만 슬프게도 

  그냥 db.yml 값을 참조할 순 없고 추가적인 설정이 필요하다.

  그 방법으로는 [Custom *.yml 사용]({{site.url}}/Analyzing-the-Feign-Client-and-Use/#custom-yml-%EC%82%AC%EC%9A%A9) 글을 참고하자 !



---

### 두 번째 방법

> DataSourceConfig

``` java
@Configuration
public class DataSourceConfig {

    @Value("${db.url}")
    private String url;

    @Value("${db.username}")
    private String username;

    @Value("${db.password}")
    private String password;

    @Value("${db.driver-class-name}")
    private String driverClassName;

    @Bean
    public DataSource datasource() {
        return DataSourceBuilder.create()
                                .url(url)
                                .username(username)
                                .password(password)
                                .driverClassName(driverClassName)
                                .build();
    }
}
```

* application.yml가 아닌 **Java 파일**로 DB 정보를 관리한다.

---

### 세 번째 방법

> DataSourceConfig

``` java
@Configuration
@PropertySource("classpath:xxx/yyy/application-${spring.profiles.active}.yml") // [1]
public class DataSourceConfig {

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource") // [2]
    public DataSourceProperties primaryDataSourceProperties() { // [3]
        DataSourceProperties sourceProperty = new DataSourceProperties();
        return sourceProperty;
    }

    // [4]
    @Bean
    @Primary
    @Qualifier("primaryDataSource")
    public DataSource primaryDataSource(DataSourceProperties properties) { // [4-1]
      return properties.initializeDataSourceBuilder().build();
    }

    // [4]
    @Bean
    @Primary
    @Qualifier("primaryDataSource")
    public DataSource primaryDataSource() {
      return primaryDataSourceProperties().initializeDataSourceBuilder().build(); // [4-2]
    }
}
```

* [1] : DB 정보를 가진 파일의 path를 명시해준다.

  그런데 application.yml 같은 경우엔 따로 설정하지 않아도 자동으로 값을 읽어온다.

  즉 *@PropertySource("classpath:xxx/yyy/application.yml")* 코드가 없어도 정상적으로 동작한다.

* [2] : 읽어드릴 property의 해당하는 prefix를 명시해준다.

  이 예제에서 prefix 값은 *spring.datasource* 이다.

* [3] : 아무런 설정이 없는 DataSourceProperties 객체를 반환한다.

  반환과 동시에 Bean으로 등록되고

  이 Bean은 primaryDataSource(DataSourceProperties properties) 호출 시 
  
  Spring이 알아서 spring.datasource 값을 Binding 시킨 후 parameter로 넘겨준다.

* [4] : DataSource를 생성한다.

  DataSource를 생성하는데 2가지 방법이 있으니 개인취향에 따라 사용하면 된다.

  - [4-1] : DB 정보를 가진 DataSourceProperties를 parameter로 받는다.
  
    parameter로 전달받은 값을 사용하여 DataSource를 생성한다.

  - [4-2] : DataSourceProperties를 직접 호출한다.
  
    따로 parameter를 받지 않고 primaryDataSourceProperties( )를 호출하여 DataSource를 생성한다.


---

## Summary

* Spring Boot 프로젝트에서 DB를 연동하는 방법은 다양하다.

  각자가 선호하는 스타일로 연동을 해보자 !

---

## Reference

* [[스프링부트] 2.1.8 에러:Failed to determine a suitable driver class](https://m.blog.naver.com/neem693/221658224988)

* [Spring Boot multi module, multi profile 환경에서 @PropertySouce 사용하기](https://luvstudy.tistory.com/60)