---
layout: post
title:  " Production 환경에서 Redis를 사용하는 가장 효과적인 6가지 방법 - Website Analytics, Flash Sale "
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

* 이번 글에서는 Redis를 활용한 Website Analytics, Flash Sale 사례를 살펴본다.




---

## [Website Analytics](https://blog.bytebytego.com/i/137885990/website-analytics)

* 인터넷 애플리케이션에서는 대량의 데이터에 대한 분석을 수행해야 하는 경우가 많다.

  ex) 특정 웹 페이지에 대한 페이지 조회수(PV) 계산, 해당 페이지의 고유 방문자 수(UV) 계산

* 하지만 수천만 또는 수억 명의 대규모 사용자의 데이터를 처리하는 작업은 어렵다.

* 이를 구현하기 위해 HashSet을 사용하여 각 사용자 ID를 저장하면
  
  메모리 공간이 고유 사용자에 따라 선형적으로 증가하므로 확장성 측면에서 좋지 않다.

---

### HyperLogLog

* HyperLogLog와 같은 Redis의 확률적 데이터 구조를 활용하면

  PV 및 UV 지표에 대한 카디널리티를 효율적으로 추정할 수 있다.

* HyperLogLog 데이터 구조는 추가된 요소 수에 관계없이 

  **상수 메모리**를 사용하여 대략적인 카디널리티 수를 제공한다. 

> 메모리 할당
  
* 메모리 공간을 조정하면 표준 오류를 제어할 수 있다. 

  즉 더 많은 메모리를 할당하면 정확도가 향상된다. 
  
* 그러나 메모리가 부족한 경우에도 
  
  HyperLogLog는 합리적인 오류로 대규모 카디널리티를 추정할 수 있다. 
  
* 이를 통해 웹 규모에서 페이지 보기와 고유 방문자를 추적하는 동시에 메모리 소비를 고정할 수 있다.

* 그러므로 HyperLogLog는 PV/UV 분석을 하는데 훌륭한 도움과 방법을 제공한다.

---

### 동작 방식

<center><img src="/assets/img/redis/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-Website-Analytics_1.png" style="max-width: 60%;"></center>

**페이지 조회수 추적**

* 사용자가 페이지를 방문하면 해당 페이지에 매핑된 HyperLogLog 키에 해당 사용자 ID를 PFADD시킨다.

* 예상 페이지 조회수를 얻으려면 HyperLogLog 키에서 PFCOUNT를 실행한다.

* 이를 통해 최소한의 메모리를 소비하며 PV 값을 추적할 수 있다.

* 또한 페이지 전체에서 해당 페이지의 고유 방문자 수(UV)를 계산할 수도 있다.

---

### 단점 아닌 단점 

* HyperLogLog는 고유한 원소의 개수를 근사화하는 **확률 알고리즘**이고

  정확도는 일반적으로 매우 높지만

  100% 정확한 값이 아닌 1~2% 오차 범위 안에서 확률 근사치를 제공한다.
  
* 그러므로 정확도가 중요한 경우에는 

  정확한 카운팅 알고리즘을 사용해야 한다.

---

## [Flash Sale](https://blog.bytebytego.com/i/137885990/flash-sale)

* 선착순 판매는 각 제품의 수량 제한으로 인해 순간적으로 동시 요청이 많이 발생한다.

* Redis의 Key-Value 저장소를 사용하면 

  이러한 동시 요청을 조정하는 분산 잠금을 구현할 수 있다.

  잠금을 획득한 인스턴스만 업데이트를 진행할 수 있으며 완료되면 잠금을 해제한다.

---

### 동작 방식

![](/assets/img/redis/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-Flash-Sale_1.png)

* 인스턴스 A가 업데이트하려고 한다고 가정하고 

  inventorylock 키 값이 현재 0이면 
  
  잠금을 사용할 수 있음을 나타내는 1로 설정 후 lock을 획득한다.
  
* Redis는 **단일 스레드**에서 

  모든 명령을 **순차적**으로 실행하므로 

  여러 인스턴스가 요청을 하더라도 순서대로 실행된다.

* 이 후 인스턴스 B가 업데이트를 시도하지만 

  이미 인스턴스 A에 의해 잠금 설정이 되었으므로 요청이 실패한다.







---

### [SETNX](https://redis.io/commands/setnx)

```
SETNX inventorylock 1 // Update the inventory
DEL inventorylock
```

> 참고

  글을 작성하는 시점에 [SETNX](https://redis.io/commands/setnx) 명령어는 deprecated 되었다.

  만약 사용할 필요가 있다면 SET 명령어에 NX 옵션을 사용해서 대체해서 사용하는 걸 추천한다.

* SETNX 명령을 사용하여 원자적으로 잠금을 획득할 수 있지만 2가지 문제점이 존재한다.

> 무한정 점유

* Lock을 획득한 인스턴스가 해제를 하지 않고 죽으면 무한정 점유를 하게 된다.

> 의도치 않은 해제

* SETNX 명령어는 값을 확인하지 않고

  임의로 값 세팅을 할 수 있다.

  예를 들어 인스턴스 A가 lock을 획득했지만 

  인스턴스 B가 임의로 SETNX 명령어를 사용하면 인스턴스 A가 획득한 lock을 해제된다.

---

### [SET](https://redis.io/commands/set)

* [SET 명령어](https://redis.io/commands/set)를 사용하면 위 문제를 해결할 수 있다.

* 만료 시간 값을 설정하여 무한정 점유를 막을 수 있고

  잠금 소유자만 키를 해제할 수 있도록 식별자 값을 설정할 수도 있다.

```
SET inventorylock instanceA NX PX 10000 // Update the inventory
```



---

## Summary

* 이번글에 다룬 사례 외에도 

  Redis를 활용한 [Cache, Session Store]({{site.url}}/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-1), [Website Leaderboard, Message Queue]({{site.url}}/Redis-Most-Impactful-Ways-Redis-Is-Used-In-Production-Systems-2)에 대해 추가적으로 알아보자.


---

## Reference

* [The 6 Most Impactful Ways Redis is Used in Production Systems](https://blog.bytebytego.com/p/the-6-most-impactful-ways-redis-is)