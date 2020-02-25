---
layout: post
title:  " DispatcherServlet 동작 원리 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

## DispatcherServlet 초기화

* 다음의 특별한 타입의 빈들을 찾거나 기본 전력에 해당하는 빈들을 등록한다.

* HandlerMapping : 핸들러를 찾아주는 인터페이스

* HandlerAdapter : 핸들러를 실행하는 인터페이스

* HandlerExceptionResolver

* ViewResolver







---

## DispatcherServlet 동작 순서

1. 요청을 분석한다. (로케일, 테마, 멀티파트 등)

2. (핸들러 맵핑에게 위임하여) 요청을 처리할 핸들러를 찾는다.

3. (등록되어 있는 핸들러 어댑터 중에) 해당 핸들러를 실행할 수 있는 "핸들러 어댑터"를 찾는다.

4. 찾아낸 "핸들러 어댑터"를 사용해서 핸들러의 응답을 처리한다.
    - 핸들러의 리턴값을 보고 어떻게 처리할지 판단한다.
        - ex) 뷰 이름에 해당하는 뷰를 찾아서 모델 데이터를 렌더링한다.
        - ex) @ResponseBody라는 Annotation을 달고있는 메소드에서 리턴하면 응답에 바로 쓰고 Model and View는 Null값을 지정

5. (부가적으로)예외가 발생하면 예외 처리 핸들러에 요청 처리를 위임한다.

6. 최종적으로 응답을 보낸다.


---

## 참고

* [스프링 웹 MVC DispatcherServlet 1~3부](https://www.inflearn.com/course/%EC%9B%B9-mvc/)