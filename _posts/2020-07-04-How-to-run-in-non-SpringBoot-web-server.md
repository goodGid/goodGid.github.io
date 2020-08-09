---
layout: post
title:  " SpringBoot 웹서버가 아닌 형태로 실행하는 방법 "
categories: Spring
author: goodGid
---
* content
{:toc}

## WebApplicationType

> Application.class

``` java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(Application.class);
        application.setWebApplicationType(WebApplicationType.NONE);
        application.run();
    }
}
```

* WebApplicationType 을 NONE으로 설정하고

  실행하면 애플리케이션이 바로 종료된다.

> WebApplicationType

``` java
public enum WebApplicationType {
    NONE,
    SERVLET,
    REACTIVE;
    ...
}
```




---

> Q. Spring Boot 자체가 웹서버일까?

* Nope !

* Spring Boot는 웹서버가 아니라 **툴**이다.

  - 내장 Servlet Container를 쉽게 사용할 수 있게 해주는 툴
  
  - 스프링 프레임워크를 쉽게 사용할 수 있게 해주는 툴

* 웹 서버는 톰캣 네티 제티 언더토우 같은 게 서버이다.


---

## Reference

* [스프링 부트 개념과 활용](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)