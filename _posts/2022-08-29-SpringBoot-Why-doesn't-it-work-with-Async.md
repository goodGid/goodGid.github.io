---
layout: post
title:  " Spring Boot @Async 동작 원리 : @Async를 선언했는데 왜 Async로 동작하지 않을까? "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## Goal

* 이번 글에서는 @Async로 method를 선언했지만
  
  Async로 동작하지 않는 이유에 대해 알아본다.




## Project Code

* 이 글에서 다루는 모든 코드는 [Github Repository](https://github.com/goodGid/Spring-Boot-2.7.1-Async-Practice)에서 받을 수 있습니다.

> Environment

* Java 11

* Spring Boot 2.7.1

* Gradle 7.4.1

---

### Config

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_1.png)

* Spring Async 기능을 사용하기 위해 

  AsyncConfig 파일에 **@EnableAsync** 어노테이션을 선언해준다.

* 그리고 Async로 동작한다는 건

  Main Thread가 아니라 Sub Thread에 Task를 위임하는 것이기에 Thead Pool을 정의해준다.

* 이렇게 생성한 Thread Pool은 [EmailService]({{site.url}}/SpringBoot-Why-doesn't-it-work-with-Async/#service)에서 사용하게 된다.

  ex) @Async("defaultTaskExecutor"), @Async("messagingTaskExecutor")

---

### Controller

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_2.png)

* AsyncService를 Bean으로 주입받는 특별할 거 없는 Controller이다.

---

### Service

> AsyncService

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_3.png)

* AsyncService는 Async 메소드를 가진 EmailService를 Bean으로 주입받는다.

> EmailService

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_4.png)

* Async로 동작시킬 메소드를 가진 클래스 파일이다.

  그리고 여기서 각 메소드마다 어떤 Thread Pool로 동작시킬지 지정해준다.

---

### TestCase

> Case 1

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_5.png)

* Main Thread Name은 http-nio-8080-exec-1

  sendMail( )를 처리하는 Thread Name은 defaultTaskExecutor-1

  sendMailWithCustomThreadPool( )를 처리하는 Thread Name은 messagingTaskExecutor-1

* 즉 우리가 원하는 대로 Async하게 동작함을 확인할 수 있다.

* 그 이유는 다음과 같다.

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_6.png)

* Caller(=AsyncService)는 EmailService를 호출하는데

  여기서 Spring이 개입하여
  
  순수한 EmailService Bean이 아니라

  Wrapping된 EmailService를 사용하도록 하여

  Async하게 동작할 수 있는 메커니즘을 제공한다.

* 즉 EmailService를 Proxy 객체로 Wrapping 하여 Async하게 동작이 가능해진다.

---

> Case 2

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_7.png)

* 모든 작업을 처리하는 Thead Name이 "http-nio-8080-exec-2"이다.

* 그 이유는 EmailService를 Bean으로 주입 받아 사용하는 게 아니라

  EmailService 인스턴스를 생성하여 사용하므로

  Spring이 중간에 개입하여 Proxy 객체로 Wrapping 할 수 없게 되고

  그 결과 Async가 아니라 Sync로 동작하게 된다.

---

> Case 3

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_8.png)

* Case 3은 내부에 @Async 어노테이션을 붙인 메소드를 호출하는데

  결과를 보면 알 수 있듯이 Sync하게 동작한다.

* 그 이유는 Case 2와 마찬가지이다.

---

> Case 2와 Case 3이 동작하지 않는 이유

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_9.png)

* 그 [이유](https://dzone.com/articles/effective-advice-on-spring-async-part-1)는 다음과 같다.

```
Never write an Async method in the same class 
where the caller method invokes the same Async methodAsync method 
in the same class where the caller method invokes the same Async method. 

So, always remember that 
when using this reference
Async does not work.

Because although it creates a proxy
the call bypasses the proxy 
and directly call the method 
so that Thread will not be spawned. 

This will prevent the developer from having the wrong assumption 
that it will work in an Async fashion. 

Most developers carelessly implement Async in this way, 
so be very careful when writing the Async caller method. 

It should be in different class when calling the Async method.
```

---

## Summary

* 정리하자면 다음과 같다.

* 기본적으로 Async하게 동작하기 위해선 Spring의 도움이 필요하다.

* 만약 Async하게 동작하기를 희망하는 요청이 있다면

  그 요청을 처리할 수 있는 Bean을

  Spring이 중간에 Proxy 객체로 Wrapping 하여 Async로 동작할 수 있게 도와준다.

* 하지만 Spring Container에 있는 Bean을 사용하지 않거나

  (= new EmailService( ) )

  Direct로 접근하게 되면

  (= AsyncService#sendMail( ) )

  Spring의 도움을 받을 수 없으므로 Async하게도 동작할 수 없게 된다.

```
Because although it creates a proxy
the call bypasses the proxy 
and directly call the method 
so that Thread will not be spawned. 
```

* 그러면 글의 제목이자 질문이었던

  **같은 클래스에서 호출하면 왜 Async 하게 동작하지 않는가?**에 답을 해보자면 다음과 같이 할 수 있겠다.

* A. Spring이 생성해주는 **Proxy** 기능을 사용하지 않기 때문이다.

---

## Reference

* [Effective Advice on Spring Async: Part 1](https://dzone.com/articles/effective-advice-on-spring-async-part-1)


