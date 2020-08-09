---
layout: post
title:  " Spring 프레임워크 핵심 기술 - Proxy 객체를 만드는 방법 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Proxy 객체

* Proxy 객체를 생성하는 방식은 

  대상 객체가 **Interface 구현 여부**에 따라 달라진다.

* 대표적으로 2가지 방식이 존재한다.

  **JDK Dynamic Proxy**와 **CGLIB** 방식.





---

## JDK Dynamic Proxy

* Java 안에 있는 Dynamic Proxy는

  Interface만 Proxy 객체로 생성할 수 있다.

* 만약 대상 객체가 클래스일 경우엔

  CGLIB를 사용하여 Proxy 객체를 생성해야 한다.

---

## CGLIB

* CGLIB는 

  코드 생성 라이브러리로서(Code Generator Library) 

  **런타임**에 **동적**으로 

  Java Class의 Proxy를 생성한다.

* 그러므로 클래스도 Proxy로 만들 수 있다.

---

* [Bean의 Scope]({{site.url}}/Spring-Framework-Bean-Scope/)에서 

  문제가 되었던 [Singleton --> Proto 참조]({{site.url}}/Spring-Framework-Bean-Scope/#singleton--proto-참조)인 경우에

  클래스 기반의 Proxy를 생성해야 하므로

  CGLIB를 사용하여 Proxy 객체를 생성했다.


---

## Reference

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

