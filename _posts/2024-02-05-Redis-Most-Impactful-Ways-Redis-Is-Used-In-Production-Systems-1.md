---
layout: post
title:  " Production 환경에서 Redis를 사용하는 가장 효과적인 6가지 방법 - Cache, Session Store "
categories: Redis
author: goodGid
use_math: true
---
* content
{:toc}

> 연재 글 목록

1. [Production 환경에서 Redis를 사용하는 가장 효과적인 6가지 방법 - Cache, Session Store]({{site.url}}/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-1)

2. [Production 환경에서 Redis를 사용하는 가장 효과적인 6가지 방법 - Leaderboard, Message Queue]({{site.url}}/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-2)

3. [Production 환경에서 Redis를 사용하는 가장 효과적인 6가지 방법 - Website Analytics, Flash Sale]({{site.url}}/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-3)

---

## Prologue

* 이번 글에서는 Redis를 활용한 Cache, Session Store 사례를 살펴본다.

---

## [Cache](https://blog.bytebytego.com/i/137885990/cache)

![](/assets/img/redis/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-Cache_1.png)

* 일반적인 캐시 아키텍처에는 세 가지 계층이 있다.




###  Application Cache

* Application 메모리 내부에 위치하며 

  일반적으로 사용자 프로필과 같이 자주 액세스하는 데이터를 보관하는 해시맵이다. 
  
  캐시 크기가 작고 앱을 다시 시작하면 데이터가 손실된다.

### Second Level Cache

* 각 서버에서만 존재하는 캐시이다.

### Distributed Cache

* Application 서버와 별도의 서버에 배포되는 Redis이다. 

* 수평 확장성을 위해 캐시를 여러 서버에 걸쳐 배치할 수 있고

  그 캐시는 여러 앱에서 공유된다.

---

> Pareto Principle

* Pareto Principle에 의하면 데이터의 약 20%가 액세스의 80%를 차지하는 경향이 있다. 

  따라서 Redis에서 가장 인기 있는 20%의 데이터를 캐싱하면
  
  대부분의 요청에 대한 성능이 향상될 수 있다.

---

## [Session Store](https://blog.bytebytego.com/i/137885990/session-store)

* Session Store는 Web Application 요청 전반에 걸쳐 상태를 유지하는 데 중요한 구성 요소이다.

* 서버는 Redis를 사용하여 각 사용자의 세션 데이터를 저장하고 관리한다.

> 고유 Session ID 값

* 세션 생성 시 유저별로 고유한 세션 ID를 사용해야 한다.

> 독립적인 Session 처리

* Reids를 Session Store로 사용하면 

  특정 Application에 종속적인 세션 작업이 필요 없으며

  로드밸런싱을 하여도 문제없이 세션 처리가 가능해진다.

> Redis Session Data Type

* JSON 또는 유사한 형식으로 직렬화된다. 

> Session TTL

* 일정 기간 동안 활동이 없으면 세션을 만료시켜

  보안이 향상되고 리소스 확보가 된다.

> Flow

<center><img src="/assets/img/redis/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-Session-Store_1.png" style="max-width: 60%;"></center>
  
* 1,2 : 유저가 로그인 요청을 한다.

* 3,4 : User Service는 고유한 세션 ID를 생성하여 Redis에 새 세션을 생성한다.

* 5,6 : User Service는 세션 ID를 유저에게도 보낸다.

* 7,8 : 유저가 장바구니에 제품을 추가한다.

* 9,10 : Shopping Cart Service는 세션 ID를 사용하여 Redis에서 세션 데이터를 검색 후 업데이트한다.

* 11,12 : Shopping Cart Service는 성공 응답을 반환한다.

---

## Summary 

* 이번글에 다룬 사례 외에도 

  Redis를 활용한 [Leaderboard, Message Queue]({{site.url}}/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-2), [Website Analytics, Flash Sale]({{site.url}}/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-3)에 대해 추가적으로 알아보자.

---

## Reference

* [The 6 Most Impactful Ways Redis is Used in Production Systems](https://blog.bytebytego.com/p/the-6-most-impactful-ways-redis-is)