---
layout: post
title:  " DispatcherServlet 동작 원리 "
categories: Spring
author: goodGid
---
* content
{:toc}

## Front Controller 패턴

![](/assets/img/spring/Spring-How-DispatcherServlet-works_1.png)

* Spring은 Front Controller 패턴을 사용한다.

* 모든 요청을 Controller 1개 받아서

  해당 요청을 처리할 handler에게 **위임(=dispatch)**한다.



---


## DispacherServlet

* Spring이 Front Controller 패턴 역할을 해주는 Servlet을 이미 구현해놓았다.

  = DispacherServlet

---

### DispacherServlet 동작 순서

<blockquote> 1. 요청을 분석한다. </blockquote>

![](/assets/img/spring/Spring-How-DispatcherServlet-works_2.png)

<blockquote> 2. 등록된 handlerMappings 중에서 요청을 처리할 수 있는 handler를 찾는다. </blockquote>

![](/assets/img/spring/Spring-How-DispatcherServlet-works_3.png)

<blockquote> 3. 등록된 handlerAdapters 중에서 handler(=2번 결과)를 처리할 수 있는 adapter를 찾는다. </blockquote>

![](/assets/img/spring/Spring-How-DispatcherServlet-works_4.png)

<blockquote> 4. 그렇게 찾은 adapter를 사용하여 실제 요청을 처리한다. </blockquote>

![](/assets/img/spring/Spring-How-DispatcherServlet-works_5.png)

<blockquote> 5. 4번의 return 값을 보고 예외처리 / View Rendering / Response Body로 응답할지 결정한다. </blockquote>

* View Rendering 하는 경우

![](/assets/img/spring/Spring-How-DispatcherServlet-works_6.png)


---

## Reference

* [스프링 웹 MVC DispatcherServlet 1~3부](https://www.inflearn.com/course/%EC%9B%B9-mvc/)