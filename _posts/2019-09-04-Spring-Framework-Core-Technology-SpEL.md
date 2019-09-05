---
layout: post
title:  " Spring 프레임워크 핵심 기술 - SpEL (스프링 Expression Language) "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## [스프링 EL​](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#expressions)이란?

* 스프링 코어단에 추가되어서 <br> 스프링과 관련된 여러 프로젝트에서 사용되는 기능이다.

* 객체 그래프를 조회하고 조작하는 기능을 제공한다.

* Unified EL​과 비슷하지만 <br> 메소드 호출을 지원하며 <br> 문자열 템플릿 기능도 제공한다.

* OGNL, MVEL, JBOss EL 등 자바에서 사용할 수 있는 여러 EL이 있지만 <br> SpEL은 모든 스프링 프로젝트 전반에 걸쳐 사용할 EL로 만들었다.

* 스프링 3.0 부터 지원한다.

---

## 문법

* #{“표현식"}

* ${“프로퍼티"}

* *표현식* 은 프로퍼티를 가질 수 있지만 <br> 프로퍼티는 *표현식* 을 가질 수 없다. <br> ex) #{ ${ my.data } + 1 }

* [Reference](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#expressions-language-ref) 참고


---

## 실습

### 기본 

* **Property에 있는 값**을 참조하는 것과 프로퍼티와 표현식을 사용하는 법에 대해 알아보자.

> application.properties

``` java
my.name = "goodgid"
my.blog.address = "goodGid.github.io"
my.value = 123456789
```

> AppRuner

``` java
@Component
public class AppRuner implements ApplicationRunner {

    @Value("#{1 + 1}")
    int value;

    @Value("#{'hello ' + 'goodGid'}")
    String greeting;

    @Value("#{1 eq 1}")
    boolean trueOrFalse;

    @Value("hello") // 문자열을 입력하면 그대로 입력이 된다.
    String hello;

    @Value("#{'spring'}") // 문자열을 입력하면 그대로 입력이 된다.
    String studyFramework;

//    @Value("#{"spring"}") //  "" 를 사용하면 안된다.
//    String ERROR_studyFramework;

    @Value("${my.name}") // property에서 값을 읽어 올 수 있다.
    String name;

    @Value("${my.blog.address}") // property에서 값을 읽어 올 수 있다.
    String blogAddress;

    @Value("#{ ${my.value} eq 123456789 }") // 표현식 안에 프로퍼티 방식
    boolean valueCheck;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println(value); // 2
        System.out.println(greeting); // helllo goodGid
        System.out.println(trueOrFalse); // true
        System.out.println(hello); // hello
        System.out.println(studyFramework); // spring
        System.out.println(name); // "goodGid"
        System.out.println(blogAddress); // "goodGid.github.io"
        System.out.println(valueCheck); // true
    }
}
```

---

### 심화 : Bean 정보 참조

* Bean에 있는 정보를 참조하는 것도 가능하다.

> Object

``` java
@Component
public class Event {

    private int id = 123;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
```

> AppRuner

``` java
@Component
public class AppRuner implements ApplicationRunner {

    @Value("#{event.id}")
    int id;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Bean에 있는 정보도 참조가 가능하다.
        System.out.println(id); // 123
    }
}
```

---

## 사용되는 곳

* @Value 애노테이션

* @ConditionalOnExpression 애노테이션

* 스프링 시큐리티
    - 메소드 시큐리티, @PreAuthorize, @PostAuthorize, @PreFilter, @PostFilter
    - XML 인터셉터 URL 설정
    - ...

* 스프링 데이터
    - @Query 애노테이션

* Thymeleaf

* 기타 등등




---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

