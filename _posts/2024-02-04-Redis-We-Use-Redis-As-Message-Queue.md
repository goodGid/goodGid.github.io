---
layout: post
title:  " Redis를 MessageQueue로 활용하는 방법 "
categories: Redis
author: goodGid
use_math: true
---
* content
{:toc}

## Redis as MessageQueue

<center> <img src="/assets/img/tech/Tech-How-to-Choose-a-Message-Queue-1_2.png" style="max-width: 80%;"> </center>

* Redis를 MQ로 사용하는 방법으로는 3가지가 있다.

1. Pub/Sub

2. List

3. Stream

---

## [Pub/Sub](https://blog.bytebytego.com/i/137885990/use-pubsub)

<center> <img src="/assets/img/redis/Redis-We-Use-Redis-As-Message-Queue-Pub-Sub_1.png" style="max-width: 80%;"> </center>

* 먼저 Redis Pus/Sub구조에 대해 알아보자.

  위 그림처럼 Redis에는 Channel이라는 개념이 존재하고

  프로듀서는 채널에 데이터를 보내고

  Redis는 해당 채널을 구독하고 있는 컨슈머들에게 데이터를 보내게 된다.

  = 컨슈머는 하나 이상의 채널을 구독할 수 있다.

---

### Push 방식 (feat. At Most Once)
  
* 여기서 **보낸다**를 주의 깊게 봐야 하는데

  컨슈머 입장에선 Pull 방식이 아닌 **Push 방식**으로 동작하므로

  컨슈머가 원하는 시점에 데이터를 가져오는 게 아니라

  일방적으로 채널로부터 데이터를 받게 되는 구조이다.

* 이러한 구조로 인해 한 가지 제한 사항이 발생하게 되는데

  바로 데이터가 **최대 한 번(At Most Once)**만 전달된다는 점이다.

* 그래서 채널에 데이터가 생성되는 시점에

  구독하고 있는 컨슈머가 없거나

  컨슈머가 존재해서 데이터를 받았지만

  로직 실행 중 컨슈머에 문제라도 발생하게 된다면 데이터를 유실하게 된다.

---

### 백업 기능 X

* Pub/Sub 구조에서는 데이터를 따로 저장하지 않으므로

  Redis가 죽게 되면 모든 Pub/Sub 데이터는 사라지므로

  일부 데이터가 손실되어도 문제가 되지 않는

  모니터링 데이터 수집과 같은 시스템에 사용하는 게 바람직하다.


---

### 제한 사항 (feat. Kafka)

```
1. No persistence guarantees - Messages are ephemeral.
2. No delivery assurances - Messages can be lost.
3. No ordering guarantees - Messages may be received out of order.
```

* Kafka와 같은 강력한 Brokered Messaging System에 비해 다음과 같은 제한 사항이 있다.

  그러므로 안정성 측면에서는 다소 불안한 면이 있다.

### Example 

<center><img src="/assets/img/redis/Redis-We-Use-Redis-As-Message-Queue-Pub-Sub_2.png" style="max-width: 70%;"></center>

---

> Redis Pub/Sub 관련 글 추천

* [PUB/SUB, 잘 알고 쓰자!](https://medium.com/frientrip/pub-sub-%EC%9E%98-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90-de9dc1b9f739)

---

## List

<center><img src="/assets/img/redis/Redis-We-Use-Redis-As-Message-Queue-List_1.png" style="max-width: 50%;"></center>

* Redis의 List 데이터 구조는 FIFO 대기열을 구성할 수 있다.

* 프로듀서는 LPUSH 명령을 사용하여 목록 끝에 메시지를 추가하고 

  컨슈머는 BLPOP 혹은 BRPOP 명령을 사용하여 목록 앞/뒷부분에서 메시지를 검색한다.
  
* BLPOP과 [BRPOP]({{site.url}}/Redis-Why-Use-BRPOP-Instead-of-POP) 명령어는 Blocking 모드에서 메시지를 기다리므로 Timeout 설정이 필요하다.

* 같은 List를 바라보는 컨슈머는 
  
  각 메시지가 1개의 컨슈머에 의해서만 소비될 수 있게 컨슈머 그룹을 형성한다.

  컨슈머 그룹 관점에서 보면 1번만 메시지를 가져갈 수 있고

  그 그룹에 속해있는 컨슈머들을 제어하기 위해 컨슈머 그룹을 형성한다.

* Redis List는 Pusb/Sub과 달리 Disk에 데이터를 저장한다.

---

### Blocking 처리 장점

* 동기화(Synchronization)

  여러 스레드나 작업이 동시에 데이터에 접근하거나 
  
  수정하는 경우 데이터 일관성을 유지해야 하는데 

  블로킹 연산은 특정 자원에 대한 접근을 동기화하고
  
  데이터가 사용 가능해질 때까지 대기함으로써 
  
  동시에 여러 스레드가 자원에 접근하는 것을 제어할 수 있다.

---

### Polling & BRPOP

* 컨슈머는 Redis를 폴링 하여 새 메시지를 확인해야 한다.

  이로 인해 CPU 리소스가 낭비될 수 있으므로

  BRPOP을 사용하여 새 메시지를 효율적으로 기다린다.

  참고 : [Redis에서 POP 명령어 대신 BRPOP 명령어를 사용하는 이유는 뭘까?]({{site.url}}/Redis-Why-Use-BRPOP-Instead-of-POP)

---

### 메시지 유지 방법 (feat. BRPOPPUSH)

* 메시지가 소비되면 List에서 제거한다. 

  만약 Kafka와 같이 메시지를 유지하려면 BRPOPPUSH를 사용해야 한다.

---

### 단점

* 느린 컨슈머로 인해 메시지가 메모리에 쌓일 수 있다. 

* 병렬로 메시지를 소비하여 빠르게 처리할 수 있는 컨슈머 그룹을 지원하지 않는다.

  따라서 Redis List는 간단한 임시 MQ에 가장 적합하다.

---

### 부록

**Redis BLPOP 사용 예시**

* [BLPOP](https://database.guide/redis-blpop-command-explained) 명령어는 지정된 시간 동안 

  List가 비어 있지 않으면 요소를 반환하고
  
  List가 비어있다면 지정된 Timeout 동안 기다리고 명령어를 종료한다.

* 여기서 List를 **Blocking 상태**로 대기를 하므로

  멀티스레드 환경이나 병렬 작업에서

  특정 이벤트나 데이터의 동시 처리가 필요한 상황에서 유용하게 활용될 수 있다.

---

**Syntax**

```
BLPOP key [key ...] timeout
```

**Test Data**

```
// Suppose we create a list like this:
RPUSH scores 1 2 3

LRANGE scores 0 -1
 1) "1"
 2) "2"
 3) "3"
```

**BLPOP Commnad**

```
BLPOP scores 0
1) "scores"
2) "1"
```

**After BLPOP Command**

```
LRANGE scores 0 -1
1) "2"
2) "3"
```

* 1번째 value는 Key이고 

  2번째 value는 List에서 Pop 된 값이다.

* 여기서 Timeout 값으로 0을 줬는데

  그러면 Redis 서버는 List에 요소가 추가될 때까지 블로킹하지 않고 즉시 반환한다.

  그래서 만약 List가 empty 상태라면 즉시 null을 반환하고 대기하지 않고 명령어는 즉시 종료되며

  List에 값이 있다면 1개의 값을 Pop 후 명령어는 종료된다.
  
---

> Redis List 관련 글 추천

* [Redis BLPOP Command Explained](https://database.guide/redis-blpop-command-explained)

* [[Redis] List의 고급 커맨드들](https://planbs.tistory.com/entry/Redis-List%EC%9D%98-%EA%B3%A0%EA%B8%89-%EC%BB%A4%EB%A7%A8%EB%93%9C%EB%93%A4)

---

## [Stream](https://blog.bytebytego.com/i/137885990/use-streams)

* Redis Streams는 이벤트 소싱에 적합한 Append-Only Logs 이다. 

* 스트림은 Message Persistence, Ordering Guarantees, Support for Consumer Groups을 지원한다.

---

### 동작 방식

<center><img src="/assets/img/redis/Redis-We-Use-Redis-As-Message-Queue-Stream_1.png" alt="" style="max-width: 80%;"></center>

* 프로듀서는 **\*** 매개변수와 함께 XADD를 사용하여 스트림에 새 메시지를 추가한다. 

* **\*** 는 Redis에게 각 메시지에 대한 고유 ID를 자동으로 생성하도록 지시한다. 
  
  **\*** 가 제공되지 않으면 사용자는 중복을 피하기 위해 자신의 고유 ID를 지정해야 한다. 
  
  이러한 ID를 사용하면 메시지 순서 추적, 중복 방지, 처리 후 전달 확인이 가능하다.

> XGROUP & XREADGROUP

* XGROUP 명령어를 사용하여 Consumer Group을 생성한다. 

* XREADGROUP을 사용하면 동일한 스트림에 대해

  여러 컨슈머가 병렬로 소비를 할 수 있다.
  
* 예를 들어, "Consumer Group 1"에서
  
  "Consumer 1"과 "Consumer 2"는 동시에 메시지를 소비할 수 있다.

> 소비된 메시지

* 소비된 메시지는 보통 entries list에 임시로 보관되어 있다가

  컨슈머가 XACK 명령어를 사용하면 재전송을 피하기 위해 목록에서 제거된다.

---

### 장점

* Stream는 List에 비해

  메시지 전송에 대한 보증과 더 나은 처리량을 지원하는 Message Queue로 활용될 수 있다.

---

> Redis Stream 관련 글 추천

* [Redis Streams와 Apache Kafka: 두 데이터 스트리밍 시스템 비교](https://wiki.yowu.dev/ko/Knowledge-base/NoSQL/redis-streams-vs-apache-kafka-comparing-two-data-streaming-systems)

---

## Summary

* Redis를 Message Queue로 사용하는 방법에 대해 알아봤다.

  흔히 Message Queue 기능이 필요하면 당연하듯 Kafka를 떠올리겠지만

  상황과 규모에 따라선 Redis로도 충분히 요구 사항을 충족시킬 수 있음을 인지하면 좋을 듯하다.

---

## Reference

* [The 6 Most Impactful Ways Redis is Used in Production Systems](https://blog.bytebytego.com/p/the-6-most-impactful-ways-redis-is)

* [How to Choose a Message Queue? Kafka vs. RabbitMQ](https://blog.bytebytego.com/p/how-to-choose-a-message-queue-kafka)

* [Complete Guide to Redis Publish Subscribe](https://www.geeksforgeeks.org/redis-publish-subscribe/)