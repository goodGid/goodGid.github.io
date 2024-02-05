---
layout: post
title:  " Production 환경에서 Redis를 사용하는 가장 효과적인 6가지 방법 - Leaderboard, Message Queue "
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

* 이번 글에서는 Redis를 활용한 Leaderboard, Message Queue 사례를 살펴본다.





---

## [Leaderboard](https://blog.bytebytego.com/i/137885990/leaderboard)

* 실시간으로 빠르게 변화하는 

  수백만 명의 사용자와 점수를 처리하기 위한 

  고성능의 Leaderboard를 구축하는 것은 어렵지만

  Redis Sorted Set(ZSet) 데이터 구조는 
  
  빠르고 확장 가능한 Leaderboard를 구현하는 방법을 제공한다.

* ZSet은 score 별로 정렬된 collection을 관리하며 $O(log N)$ 시간 복잡도를 갖는다.

---

### Zset 속성

* Members are unique

* Each member has an associated score

* Members are sorted by score

* Supports common ops like add, remove, query range, rank, etc.

---

### Example

**Redis ZSet 명령을 사용하여 걸음 수에 대한 실시간 Leaderboard 구축 예제**

![](/assets/img/redis/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-Leaderboard_1.png)

> Step 1

* [ZADD](https://redis.io/commands/zadd)를 사용하여 ZSet을 초기화하고 초기값이 1000인 Bob을 추가한다.

> Step 2

* Bob의 기존 항목에 ZINCRBY를 사용하여 Bob의 걸음 수를 15만큼 증가시킨다.

> Step 3

* [ZREVRANGE](https://redis.io/commands/zrevrange)를 사용하여 상위 3개 걸음 수 값을 반환한다.

```
ZREVERANGE stepcounts 0 2
stepcounts라는 Key 값들 중 0(상위 1번째) ~ 2(상위 3번째) 까지 값을 반환해라.
```



---

## [Message Queue](https://blog.bytebytego.com/i/137885990/message-queue)

* Apache Kafka와 같은 전용 MQ 시스템은 비동기 메시징을 위한 일반적인 솔루션이다.

  그러나 다른 미들웨어를 도입하면 오버헤드와 복잡성이 추가된다. 
  
* Redis는 회사의 기술 스택에 다른 기술을 추가하지 않고도

  기본적인 메시징 요구 사항을 충족할 수 있는 
  
  가벼운 Pub/Sub 및 MQ 기능을 제공한다.

* Redis에서 메시지 대기열을 구현하는 방법에는 3가지가 있다.

1. List 사용

2. Stream 사용

3. Pub/Sub 사용

* 자세한 내용은 [Redis를 MessageQueue로 활용하는 방법]({{site.url}}/Redis-We-Use-Redis-As-Message-Queue) 글을 참고하자.

---

## Summary

* 이번글에 다룬 사례 외에도 

  Redis를 활용한 [Cache, Session Store]({{site.url}}/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-1), [Website Analytics, Flash Sale]({{site.url}}/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-3)에 대해 추가적으로 알아보자.

---

## Reference

* [The 6 Most Impactful Ways Redis is Used in Production Systems](https://blog.bytebytego.com/p/the-6-most-impactful-ways-redis-is)