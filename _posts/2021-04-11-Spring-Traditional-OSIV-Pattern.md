---
layout: post
title:  " OSIV 패턴(Open Session in View Pattern) : 전통적인 OSIV 패턴 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 게시물은 [원글](http://aeternum.egloos.com/2798098)을 읽고 정리한 글이며 원글을 읽어보는 걸 강력하게 추천드립니다 !

## 전통적인 OSIV

* OSIV를 구현하는 전통적인 방법은 **서블릿 필터**를 사용하는 것이다.

* 서블릿 필터를 사용하는 OSIV 패턴의 경우 다음과 같은 과정으로 동작한다.

---

1. 요청이 필터로 도착

1. Session 오픈 (= 영속성 컨텍스트 준비)

1. DB 트랜잭션 시작

1. 컨트롤러에게 요청 위임
  
1. 처리 후 View 렌더링

1. 필터로 복귀

1. 트랜잭션 커밋 && JDBC 커넥션 반환 && 영속성 컨텍스트 Flush
  
1. 만약 위 과정에서 예외 발생 시 트랜잭션을 **롤백** 후 Session 종료

---

* 정리하자면 다음과 같다.

```
필터 시작 시점 : Session 오픈(= 영속성 컨텍스트 준비), 트랜잭션 시작
필터 종료 시점 : Session 닫기(= 영속성 컨텍스트 닫기), 트랜잭션 커밋, 영속성 컨텍스트 Flush, 영속성 컨텍스트 상태 전이
```



---

### 구현

* 다음은 서블릿 필터를 사용하는 OSIV 패턴의 일반적인 구현 방법이다. 

  ref : [하이버네이트 완벽 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=6287142)

> Example

``` java
public class HibernateSessionRequestFilter implements Filter {
    private SessionFactory sessionFactory;

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        try {
            // DB Transaction 시작 sessionFactory.getCurrentSession().beginTransaction();
            // 다음 필터 호출(요청 처리 계속 진행) chain.doFilter(request, response);
            // DB Transaction 커밋
            sessionFactory.getCurrentSession().getTransaction().commit();
        } catch (Throwable ex) {
            // 무조건 롤백
            try {
                if (sessionFactory.getCurrentSession().getTransaction().isActive()) {
                    sessionFactory.getCurrentSession().getTransaction().rollback();
                }
            } catch (Throwable rbEx) {
                rbEx.printStackTrace();
            }
            // 다른 처리를 한다.
            throw new ServletException(ex);
        }
    }

    public void init(FilterConfig filterConfig) throws ServletException {
        sessionFactory = HibernateUtil.getSessionFactory();
    }

    public void destroy() {
    }
}
```

* 일반적으로 Flush 모드의 기본값인 [FlushMode.AUTO]({{site.url}}/Spring-OSIV-Session-Flush-Concept/#flushmodeauto)를 사용하므로

  영속성 컨텍스트에서 관리하는 모든 Persistent 상태의 객체는

  View의 렌더링이 완료되고

  서블릿 필터에서 트랜잭션을 커밋하는 순간 DB로 Flush 된다.

* 또한 ConnectionReleaseMode의 기본값인 AFTER_TRANSACTION 에 따라

  **JDBC 커넥션의 반환 시점** 역시 

  View 렌더링이 완료되고

  서블릿 필터 내에서 트랜잭션이 커밋 또는 롤백 되는 시점에 이루어진다.

![](/assets/img/spring/Spring-Traditional-OSIV-Pattern_1.png)


---

## Session.close( ) 호출 시점

* 여기서 가장 중요한 포인트는 **Session.close( )가 호출되는 시점**이다.

* Session.close( )가 호출되는 시점은

  모든 요청 처리를 끝낸 후이므로

  요청을 처리하는 과정에서는 언제든 영속성 컨텍스트에 접근이 가능하다.

  (= Application 레이어에서도 접근이 가능하다.)

  (= Service 레이어에서도 접근이 가능하다.)

* 하이버네이트는 Session.close( )가 호출되면

  모든 Persistent 상태의 객체를 Detached 상태로 변경하고 영속성 컨텍스트를 닫는다.

> 상태 변경 전

* 영속성 컨텍스트의 영속 객체들의 상태가 유효하므로

  모든 Persistent 객체에 대해 언제든 접근할 수 있다.

  그러므로 **지연 로딩(Lazy Loading)**이 가능해진다.

* 이러한 특징 때문에

  Application 레이어가 아닌 View 레이어에서도 
  
  영속성 컨텍스트에 접근하여 지연 로딩이 가능해진다.

* 추가로 이 특징 때문에 [단점]({{site.url}}/Spring-Traditional-OSIV-Pattern/#단점)도 존재하게 된다.

> 상태 변경 후

* 상태가 변경되었다면 해당 영속 객체에 대해 접근을 하는 행위는 위험하다.

  즉 Session.close( ) 호출 후

  View를 렌더링하면서 영속 객체에 접근을 시도한다면 **LazyInitializationException**이 발생한다.
  
  (= 영속성 컨텍스트가 닫혀있는 상황) 

  (= 접근하는 영속 객체의 상태가 Persistent가 아닌 상황)

---

### 단점

* 전통적인 OSIV는 장점도 있지만, 단점도 존재한다.

#### 모호한 트랜잭션 경계

* 일반적으로 **레이어 아키텍쳐 구조(View, Application, Domain, Infrasturcture)**에서

  트랜잭션의 경계는 Application 레이어에 한정적이다.

* 그런데 전통적인 OSIV에서 트랜잭션의 유효 범위는 모든 레이어에 존재한다.

  왜냐하면 트랜잭션이 종료되는 순간은 
  
  모든 요청이 끝난 후 필터로 다시 돌아와서 Session.close( )를 호출하는 시점이기 때문이다.

* 그러므로 누군가 의도치 않게 View 레이어에서 

  영속 객체를 수정하면 최종적으로는 그 객체가 DB에 반영된다.

* 그러므로 영속 객체에 대한 핸들링의 범위가 너무 광범위해진다는 단점이 존재한다.

---

#### JDBC 커넥션 보유 시간 증가

* 모호한 트랜잭션 경계 단점과 같은 맥락으로

  필터에 도착하면 그 시점부터 JDBC 커넥션을 보유하고

  모든 요청이 종료된 후 반환을 하므로 커넥션 보유 시간이 지나치게 길어진다.

---

### 단점 개선

* View 렌더링하는 시점에 지연 로딩을 허용하면서도

  일관성 있는 트랜잭션 경계를 유지하는 합리적인 절충안은 

  서블릿 필터에서 Session을 오픈하되

  트랜잭션 경계는 Application 레이어 범위로 한정 짓는 것이다.

* 그래서 Spring 프레임워크에서는 

  FlushMode와 ConnectionReleaseMode의 조정을 통해

  전통적인 OSIV의 단점을 보완한 **OpenSessionInViewFilter**와 **OpenSessionInViewInterceptor**를 제공한다.

* 두 클래스의 가장 큰 특징은 

  기존처럼 View에서 지연 로딩을 가능하게 하는 동시에

  트랜잭션 경계를 Application 레이어로 한정 짓을 수 있다.


---

## Summary

* 전통적인 OSIV 패턴에 대해 알아봤다.

  그리고 전통적인 OSIV 패턴에서의 단점을 보완하기 위해

  Spring에서는 어떻게 OSIV 패턴을 적용했는지도 알아보자.

* 그리고 최대한 자세하게 **전통적인 OSIV 패턴**에 대해 글을 작성했지만

  글을 읽으면서 다소 부족한 부분이 있다고 느껴지거나

  좀 더 자세하게 알아보고 싶다면 반드시 [원글](http://aeternum.egloos.com/2798098)에 첨부되어있는 PDF 파일을 읽어보도록 하자 !

---

## Reference

* [Open Session in View Pattern](http://aeternum.egloos.com/2798098)