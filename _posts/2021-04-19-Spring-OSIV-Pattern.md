---
layout: post
title:  " OSIV 패턴(Open Session in View Pattern) : Spring의 OSIV(OpenSessionInViewFilter) 구현 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 게시물은 [원글](http://aeternum.egloos.com/2798098)을 읽고 정리한 글이며 원글을 읽어보는 걸 강력하게 추천드립니다 !

## Prologue

* [이전 글]({{site.url}}/Spring-Traditional-OSIV-Pattern)에서 전통적인 OSIV 패턴 개념과 **단점**에 대해 알아봤다.

* 이번 글에서는 Spring이 전통적인 OSIV 패턴의 단점을 어떻게 보완하였는지에 대해 알아본다.

---

## Spring의 OSIV

* Spring 프레임워크에서는 추가적인 작업 없이

  전통적인 OSIV와 비슷한 메커니즘을 제공하며
  
  OSIV 패턴의 장점을 취할 수 있는

  org.springframework.orm.hibernate3.support.OpenSessionInViewFilter 클래스를 제공한다.

* 그리고 전통적인 OSIV의 **단점**을 보완하고자 2가지 요소에 대한 고민이 있었다.

1. 트랜잭션의 유효 범위

2. JDBC 커넥션의 유효 범위



---

### Session 및 트랜잭션

* Spring에서 제공하는 OpenSessionInViewFilter는 

  **필터 내에서 Session을 오픈하지만 트랜잭션은 시작하지 않는다.**

  = 트랜잭션을 시작하지 않았으므로 필터 안에서 JDBC 커넥션을 얻지 않는다.

  = 하이버네이트는 트랜잭션 시작 시 커넥션을 얻어온다.

* 비록 필터 내에서 트랜잭션이 시작되진 않았지만

  ( JDBC 커넥션 확보 X = Session과 DB와의 연결 X )

  Session은 생성되었으므로 **영속 객체를 관리할 영속성 컨텍스트는 생성**되어있다.

---

### FlushMode

* 서블릿 필터는 Session을 오픈 후 

  Session의 FlushMode를 **FlushMode.MANUAL**로 변경한다.

* 그리고 해당 Session을 현재 스레드의 ThreadLocal에 저장시키고

  이후 Spring은 ThreadLocal에 저장된 **단일 Session**을 통해 모든 영속성 관련처리를 수행한다.

<br>

* 여기서 FlushMode를 FlushMode.MANUAL로 설정하게 되면

  명시적으로 Session.flush( )를 호출해야만

  영속성 컨텍스트를 DB로 동기화시킨다.

* 그러나 OpenSessionInViewFilter는 요청이 완료된 시점에

  명시적으로 Session.flush( )를 호출하지 않으므로 

  영속성 컨텍스트에 존재하는 Persistent 객체들은 DB로 Flush되지 않는다.


<br>

* 그렇다면 이런 궁금증이 생길 수 있다.

```
Q. 명시적으로 Session.flush( )를 호출하지 않으면 DB로 동기화가 되지 않는다고 했는데
개발하면서 임의로 Session을 flush 해준 적이 없는데 
어떻게 자동으로 DB로 영속성 컨텍스트가 동기화되는 거지?
```

* 위 질문의 답을 찾기 위해 조금 더 알아보자.

* 필터에서 OSIV를 위한 설정을 마친 후

  Controller로 요청을 위임한다. (= Application 레이어)

  그리고 작성한 코드를 따라가다

  @Transactional 어노테이션을 만나면

  **HibernateTransactionManager**를 통해 트랜잭션을 시작한다.

* 이 때 위에서 언급했던 ThreadLocal에 저장된 단일 Session을 얻어와

  필터에서 FlushMode.MANUAL로 설정했던 FlushMode를 **FlushMode.AUTO**로 변경한다.

* 즉 트랜잭션 시작 전에 FlushMode를 변경함으로써

  임의의 Session.flush( ) 호출이 없어도 

  트랜잭션이 커밋되는 시점에 자동으로 Flush가 이뤄진다.

  (= **위 질문의 답**)

* 커밋 이후에는 현재 FlushMode가 AUTO 이므로

  다시 MANUAL로 복구하여

  이후의 수정 사항이 DB로 Flush 되는 것을 방지한다.

  = 트랜잭션의 범위를 제한시킨다.

* 정리하자면 Spring의 OSIV 패턴은 

  이러한 메커니즘을 통해 전통적인 OSIV의 단점을 보완하였다.

* 즉 Application 레이어가 아닌 영역의 변경 사항들을
  
  DB로 Flush 되는 것을 방지할 수 있는 장치를 마련하였다.

  = 명시적으로 호출하지 않는다면 DB에 Flush 되지 않는다.

---

### 트랜잭션 이후

* 트랜잭션 완료 시점에 JDBC 커넥션은 반환되어

  Session과 DB와의 연결이 끊겼지만

  Session.close( )가 호출되지 않았으므로

  영속성 컨텍스트는 그대로 존재한다.

  ( Session.close( )는 필터에서 호출된다. )

* 따라서 트랜잭션 내 영속성 컨텍스트에 캐시된 영속 객체의 상태는 

  Persistent 상태에서 Detached로 전이되지 않았으므로 LazyLoading이 가능하다.

---

### 트랜잭션 미적용 데이터 접근

* 방금 LazyLoading이 가능하다고 말했다.

  하지만 트랜잭션이 완료 시점에 JDBC 커넥션은 반환되었고

  LazyLoading을 하기 위해선 DB와의 통신이 필요하다.

* 그렇다면 어떻게 LazyLoading이 가능한 걸까?

* LazyLoading이 가능한 이유는

  하이버네이트가 **트랜잭션 미적용 데이터 접근**을 허용하기 때문이다.

* 트랜잭션 미적용 데이터 접근이란 

  **자동 커밋 모드(Auto commit mode)**를 사용해 데이터에 접근하는 것을 의미한다.

* 여기서 말하는 자동 커밋 모드는

  명시적인 트랜잭션 범위를 지정하지 않아도

  내부적으로 개별 DML문을 짧은 트랜잭션 내에서 실행할 수 있도록 해주는 모드를 말한다.

* 그러므로 @Transactional을 통해 명시적으로 트랜잭션이 지정되지 않은 곳에서

  LazyLoading이 발생하면 하이버네이트는 내부적으로 트랜잭션 미적용 데이터 접근 방식으로 이를 처리한다.

* 즉 프록시를 초기화할 때마다

  커넥션 풀로부터 매번 새로운 JDBC 커넥션을 얻어와 LazyLoading을 처리 후 커넥션 풀로 반환한다.


---

### 다시 OpenSessionInViewFilter로

* 위 과정을 거친 후 모든 요청 작업이 끝나게 되면

  다시 OpenSessionInViewFilter로 돌아오게 된다.

* 그리고 필터에서 Session.close( )를 호출하고
  
  모든 Persistent 객체 상태를 Detached 상태로 전이하며 영속성 컨텍스트가 닫히게 된다.

* 이로써 Spring에서는 OSIV 패턴을 구현한 요청은 마무리된다.

* 이 모든 과정을 그림으로 나타내면 다음과 같다.

![](/assets/img/spring/Spring-OSIV-Pattern_1.png)


---

## Self Q&A

* Spring의 OSIV 패턴 개념을 정리하고자 다음 질문에 스스로 답변을 해보자.

> Q. 왜 필터에서 FlushMode를 수정하는 걸까?

* 전통적인 OSIV에서는 [트랜잭션의 범위]({{site.url}}/Spring-Traditional-OSIV-Pattern/#%EB%AA%A8%ED%98%B8%ED%95%9C-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EA%B2%BD%EA%B3%84)가 모호하다는 단점이 있었다.

  그러므로 Spring에서는 FlushMode를 MANUAL로 설정하여

  Application 레이어에서만 FlushMode를 AUTO로 설정하여

  다른 레이어에서의 변경은 DB로 Flush 되지 못하도록 강제화시킨 것이다.

<br>

> Q. JDCB 커넥션을 반환하였어도 LazyLoading이 가능한 이유는?

* 하이버네이트가 트랜잭션 미적용 데이터 접근을 허용하기 때문이다.

---

## Summary

* 전통적인 OSIV의 단점을 보완하고자

  Spring에서 어떻게 접근하였는지 알아봤다.

* OSIV과 관련해서 굉장히 중요한 개념이니 반드시 알아두자 !

* 끝으로 글의 서두에도 언급했지만

  반드시 [Open Session in View Pattern](http://aeternum.egloos.com/2798098)글을 읽어보는 걸 강력하게 추천한다.

  정말 너무나도 좋은 글이라서 읽어보는 걸 권하고 싶다 !


---

## Reference

* [Open Session in View Pattern](http://aeternum.egloos.com/2798098)