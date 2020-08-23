---
layout: post
title:  " Junit5 - 소개 및 구조 "
categories: Junit5
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## JUnit 5 소개

* 17년 10월에 공개되었다.

* Java 8 이상을 필요로 한다.



---

## JUnit 5 구조

![](/assets/img/junit/Junit5-Intro-Structure_1.png)


### JUnit Flatform

* JUnit으로 만든 Test Code를 실행시키는 Launcher를 의미한다.

  Launcher를 통해서 콘솔에서도 테스트 실행이 가능하다.

* TestEngine API를 제공한다.

---


### JUnit Vintage

* JUnit3과 4의 구현체이다.

  = TestEngine API 구현체이다.

---


### JUnit Jupiter

* JUnit5 구현체이다.

  = TestEngine API 구현체이다.

* Spring Boot에서는 2.2 올리면서 Default로 설정되었다.

  그래서 프로젝트를 생성하면 기본적으로

  Dependency에서 vintage-engine은 exclude가 되어있다.

``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
    <exclusions>
    <exclusion>
        <groupId>org.junit.vintage</groupId>
        <artifactId>junit-vintage-engine</artifactId>
    </exclusion>
    </exclusions>
</dependency>
```



---

## Summary

* JUnit5에서는 **Vintage -> Jupiter** 기억하자.



---

## Reference

* [더 자바, 애플리케이션을 테스트하는 다양한 방법 : JUnit 5 소개](https://www.inflearn.com/course/the-java-application-test)

* [JUnit5 User Guide 공부 #1](https://sun-22.tistory.com/81)