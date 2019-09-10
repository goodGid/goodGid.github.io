---
layout: post
title:  " Spring 프레임워크 핵심 기술 - 스프링 AOP : 개념 소개 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.


## AOP란?

* Aspect-oriendted Programming (AOP)은 OOP를 보완하는 수단이다.

* 흩어진 Aspect를 모듈화 할 수 있는 프로그래밍 기법이다.


---

![](/assets/img/spring/spring_framwework_core_concept_1.png)

## Concerns이란?

* 여러 클래스 혹은 여러 메소드에 나타나는 **비슷한 코드들**을 말한다.

* 예를 들어보자.

```
만약 A,B,C 클래스에서 모두 트랜잭션 처리가 필요한 상황이라면
일반적으로 다음과 같은 Flow를 갖게 된다.

1. setAutoCommit을 false로 설정
2. Query 실행
3. Commit / RollBack

그리고 위의 코드가 A,B,C 클래스에 있는 서비스를 감싸야한다.
즉 A,B,C 클래스에는 비슷한 코드가 중복으로 사용이 된다.

만약 Concerns의 변경이 일어나게 된다면 어떻게 될까?
해당 Concerns을 사용한 모든 소스코드들을 찾아 수정을 해야한다.
다시말해 유지 보수가 쉽지 않다.
```










---


## AOP : Aspect

* 위와 같은 상황을 방지하기 위해 **AOP**는 **Aspect**라는 개념을 이용하여 해결한다.

* Aspect로 흩어진 것들을 한 곳으로 모은다.

* Aspect를 만드는 기준은 각각의 Concerns별로 생성을 한다.

* 그리고 A,B,C 클래스에 트랜잭션 처리를 위해 들어있던 코드들(=Concerns)을 제거하고 

* 그 Aspect안에 Concerns을 정의하고 Concerns들이 어디에 적용되어야하는지 개발자가 명시해준다.

* ex) 두번째 그림의 *Aspect Y* 는 A,B 클래스에 적용해야한다를 뜻한다.

* 즉 *해야할 일* 과 *적용해야할 대상* 을 묶어 **모듈화**를 해놓는다.


---

## AOP : 주요 개념

### Aspect

* Aspect = **Advice** + **PointCut**

* 모듈화 그 자체

### Target 

* Aspect가 갖고 있는 Advice를 적용하는 대상들 <br> ex) A,B,C 클래스

* PointCut보다 **상위 개념 느낌**이다. 

* ex) A 클래스의 B 메소드에 적용이라면 <br> Target : A 클래스 <br> PointCut : B 메소드

### Advice

* What to do = 해야할 일

* ex) 로깅을 한다. <br> Hello를 출력한다. 등등


### Join Point

* 사전적 의미로는 *합류점* 이라고 생각하면 된다. <small> 매우 와닿지 않는다. -ㅂ- </small>

* 가장 흔하게 사용하는 Join Point는 **메소드 실행 시점**이다.

* 해당 메소드를 실행할 때 이 Advice를 끼워 넣어라 <br> ex) 해당 메소드를 실행하기 전에 'Hello를 출력'(= Adivce)하라.

* 여기서 끼워 넣을 수 있는 지점이 **Joint Point**이다.

* 굉장히 다양한 합류점(= Join Point)가 있다.

    - 생성자 호출 직전

    - 생성자 생성 시

    - 필드에 접근하기 전

    - 필드에서 값을 가져갈 때 

* 즉 Join Point는 Spec이라 생각하면 된다.


### PointCut

* 어디에 적용해야하는지에 대한 정보

* ex) A 클래스의 B 메소드에 적용이라면 <br> Target : A 클래스 <br> PointCut : B 메소드


---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

