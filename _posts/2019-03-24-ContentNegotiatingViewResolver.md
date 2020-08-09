---
layout: post
title:  " ContentNegotiatingViewResolver 알아보기 "
categories: Spring
author: goodGid
---
* content
{:toc}

## ContentNegotiatingViewResolver

* **ContentNegotiatingViewResolver**는 ViewResolve 중 하나이다.

<br>

* AcceptHeader에 따라 응답이 달라진다.

* ex) accept(MediaType.APPLICATION_JSON_UTF8)

<br>

* AcceptHeader는 

* "브라우저가 어떤한 타입의 본문을 응답을 원한다"를 서버한테 알려준다.

<br>

* ContentNegotiatingViewResolver는 

* 어떤 요청이 들어오면 

* 그 요청에 응답을 만들 수 있는 모든 View를 찾는다.

* 그리고 최종적으로 

* 그 AcceptHeader랑 비교해서 해당 View를 Return한다.








* 간혹 AcceptHeader가 없는 요청이 있다. 

* 그런 경우를 대비해서 format이라는 Parameter를 사용한다.

* ex) "/path?format=pdf"


---

## Reference

* [스프링 부트 개념과 활용 : 스프링 웹 MVC 3부: ViewResolve](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8/)

