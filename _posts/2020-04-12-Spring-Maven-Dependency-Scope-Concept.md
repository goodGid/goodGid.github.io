---
layout: post
title:  " Maven Dependency의 Scope 개념 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

## Scope Concept

* Maven Dependency에서

* Scope 옵션은

* 해당 의존성을 

* 언제 어떻게

* Class Path에 넣어서 

* 사용할 것인가를 정의하는 값이다.

* 보다 자세한 내용은

* [Maven Official Docs](http://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#Dependency_Scope)를 참고하자.




---

## Scope Type

### Compile

* Compile 시점에 필요하다.

* **기본값(=Default)**이다.

* 프로젝트의 모든 Class Path에 추가된다.

---

### Runtime

* Runtime 시점에 필요하다.

* Compile 시점에는 필요가 없지만 

* 실행 시점에는 필요하다.

<br>

* Runtime, 테스트 시 Class Path에 추가 되지만 

* Compile시에는 추가 되지 않는다.

* ex) JDBC 드라이버

---

### Provided

* Compile 시점에 필요하다.

* Scope 값을

* provided로 설정한

* 의존성에 대해서는

* Runtime 시점에 JDK 혹은 컨테이너가 제공한다.

```
This is much like compile, but indicates you expect the JDK or a container to provide the dependency at runtime. For example, when building a web application for the Java Enterprise Edition, you would set the dependency on the Servlet API and related Java EE APIs to scope provided because the web container provides those classes. This scope is only available on the compilation and test classpath, and is not transitive.
// From Maven Official Docs 
```

* 간략 요약하면 

* Wep Application 개발 시

* Servlet API or Java EE API들은 

* **provided** Scope으로 지정해야한다.

* 왜냐하면

* 톰캣과 같은 컨테이너가 제공해주기 때문이다.

* ex) Servlet API 

---

### Test

* Compile 시점에 필요하다.

* 배포때는 제외된다.

* ex) JUnit

---

## Example 

``` xml
<dependencies>
    <dependency>
    <!-- [1]  : Junit -->
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>

    <!-- [2] : javax.servlet -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.0.1</version>
      <scope>provided</scope>
    </dependency>
</dependencies>
```

> [1] : Junit

* Junit Dependency의 

* Scope 옵션 값은

* Test Scope으로 되어있다.

<br>

* 그렇기 때문에

* Junit은 Source Class Path에서는 사용이 불가하다.

* 오직 Test Path에서만 사용이 가능하다.

<br>

* 이러한 설정은

* **File** -> **Project Structure** 에서 가능하다.

![](/assets/img/spring/Spring-Maven-Dependency-Scope-Concept_1.png)

<br>

* 참고로 **단축키(=Short Cut)**은 다음과 같다.

* Mac OS : *Cmd + ;* 

* Window : *Ctrl + ;*

<br>

> [2] : javax.servlet

* javax.servlet Dependency의

* Scope 옵션 값은

* provided로 되어있다.

<br>

* provided는

* 코딩 시점에서는 사용 가능하지만

* Runtime 시점에 클래스 Path에서 제외된다.

<br>

* 그렇다면 Runtime 시점에는 어떻게 되는걸까?

* 일반적으로 톰캣과 같은 컨테이너에서 제공되어진다.

<br>

* 즉 provideds는

* Runtime 시점에 어디선가 제공되는 의존성이다.


---

## 참고

* [Maven(메이븐) pom.xml 파일의 scope 설정은 무엇입니까?](https://sarc.io/index.php/development/812-maven-pom-xml-scope)

* [[Maven] pom.xml <scope> 설명](https://jjeong.tistory.com/834)

* [[Maven] Dependency Scope의 종류](https://krespo.net/166)

* [Dependency Scope](http://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#Dependency_Scope)

* [Maven Dependency의 scope의 의미](https://homo-ware.tistory.com/43)



