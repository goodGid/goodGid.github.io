---
layout: post
title:  " [1편] Kafka vs RabbitMQ 어떤 Message Queue를 선택해야할까? (How to Choose a Message Queue? Kafka vs. RabbitMQ) "
categories: Technology
author: goodGid
---
* content
{:toc}

## Prologue

* 요즘에는 프로젝트 Message Queue(MQ) 사용 시 

  Kafka를 가장 먼저 떠올리고 사용하는데
  
  이게 때로는 특정 요구 사항을 고려할 때 항상 최선의 선택은 아니다.


---

## Database-Backed Queue

* 스타벅스를 예로 보면 가장 중요한 두 가지 요구 사항은 다음과 같다.

1. 계산원이 기다리지 않고 다음 주문을 받을 수 있도록 비동기식 처리를 수행한다.

2. 문제가 있어도 고객의 주문을 놓치지 않는다.

* 커피를 만드는 사람은 종종 동일한 음료를 일괄적으로 만들기 때문에 

  여기서 메시지 순서는 크게 중요하지 않다. 
  
* 대기열이 각 스타벅스 매장으로 제한되어 있으므로 확장성도 그다지 중요하지 않다.

* 그래서 스타벅스 대기열은 DB 테이블에서 구현될 수 있다.

<center> <img src="/assets/img/tech/Tech-How-to-Choose-a-Message-Queue-1_1.png" style="max-width: 80%;"> </center>

* Cashier는 주문을 받고 DB에 새 주문을 생성한다.

  그와 동시에 Coffe Maker는 커피를 제조한다.

  만약 커피가 다 만들어졌다면 DB에 주문이 완료되었다고 표시하고

  그 이벤트를 받은 Customer는 커피를 가져간다.

* 이 일련의 과정은 서로에게 Dependency 없이 병렬적으로 이뤄질 수 있고

  Kafka 없이도 DB를 사용해 간단한 대기열 요구 사항을 충족시킬 수 있음을 볼 수 있다.


---

## Redis-Backed Queue

<center> <img src="/assets/img/tech/Tech-How-to-Choose-a-Message-Queue-1_2.png" style="max-width: 80%;"> </center>

* 이번에는 DB가 아닌 Redis를 활용해보자.

* Redis를 MQ로 사용하는 방법으로는 3가지가 있다.

1. Pub/Sub

2. List

3. Stream

---

### Pub/Sub

<center> <img src="/assets/img/tech/Tech-How-to-Choose-a-Message-Queue-1_2_1.png" style="max-width: 80%;"> </center>

* 먼저 Redis Pus/Sub구조에 대해 알아보자.

  위 그림처럼 Redis에는 Channel이라는 개념이 존재하고

  프로듀서는 Channel에 데이터를 보내고

  Redis는 해당 Channel을 구독하고 있는 컨슈머에게 데이터를 보내게 된다.
  
* 여기서 우리는 **보낸다**를 주의 깊게 봐야 하는데

  컨슈머 입장에선 Pull 방식이 아닌 Push 방식으로 동작하므로

  컨슈머가 원하는 시점에 데이터를 가져오는 게 아니라

  일방적으로 Channel로부터 데이터를 받게 되는 구조이다.

* 이러한 구조로 인해 한 가지 제한 사항이 발생하게 되는데

  바로 데이터가 **최대 한 번(At Most Once)**만 전달된다는 점이다.

* 그래서 Channel에 데이터가 생성되는 시점에

  구독하고 있는 컨슈머가 없거나

  컨슈머가 존재해서 데이터를 받았지만

  로직 실행 중 컨슈머에 문제라도 발생하게 된다면 데이터를 유실하게 된다.

* 또한 Pub/Sub 구조에서는 데이터를 따로 저장하지 않으므로

  Redis가 죽게 되면 모든 Pub/Sub 데이터는 사라지므로

  일부 데이터가 손실되어도 문제가 되지 않는

  모니터링 데이터 수집과 같은 시스템에 사용하는 게 바람직하다.

---

> Redis Pub/Sub 관련 글 추천

* [PUB/SUB, 잘 알고 쓰자!](https://medium.com/frientrip/pub-sub-%EC%9E%98-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90-de9dc1b9f739)

---

### List

* Redis의 List 데이터 구조는 FIFO 대기열을 구성할 수 있다.
  
* 컨슈머는 BLPOP 명령어를 사용하여 

  Blocking 모드에서 메시지를 기다리므로 Timeout 설정이 필요하다.

* 같은 List를 바라보는 컨슈머는 
  
  각 메시지가 1개의 컨슈머에 의해서만 소비될 수 있게 컨슈머 그룹을 형성한다.

  컨슈머 그룹 관점에서 보면 1번만 메시지를 가져갈 수 있고

  그 그룹에 속해있는 컨슈머들을 제어하기 위해 컨슈머 그룹을 형성한다.

* Redis List는 Pusb/Sub과 달리 Disk에 데이터를 저장한다.

---

> Redis BLPOP Command Explained

* BLPOP 명령어는 

  Redis에서 List에서 요소를 Pop 하여 반환하는 데 사용되는 명령어 중 하나이다. 

* 이 명령어는 지정된 시간 동안 

  List가 비어 있지 않으면 요소를 반환하고
  
  List가 비어있다면 지정된 Timeout 동안 기다리고 명령어를 종료한다.

* 여기서 List를 **Blocking 상태**로 대기를 하므로

  멀티스레드 환경이나 병렬 작업에서

  특정 이벤트나 데이터의 동시 처리가 필요한 상황에서 유용하게 활용될 수 있다.

---

> Blocking 처리 장점

* 동기화(Synchronization)

  여러 스레드나 작업이 동시에 데이터에 접근하거나 
  
  수정하는 경우 데이터 일관성을 유지해야 하는데 

  블로킹 연산은 특정 자원에 대한 접근을 동기화하고
  
  데이터가 사용 가능해질 때까지 대기함으로써 
  
  동시에 여러 스레드가 자원에 접근하는 것을 제어할 수 있다.

---

> Example

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

  그래서 만약 List가 empty 상태라면 즉시 Null을 반환하고 대기하지 않고 명령어는 즉시 종료되며

  List에 값이 있다면 1개의 값을 Pop 후 명령어는 종료된다.
  
---

> Redis List 관련 글 추천

* [Redis BLPOP Command Explained](https://database.guide/redis-blpop-command-explained)

* [[Redis] List의 고급 커맨드들](https://planbs.tistory.com/entry/Redis-List%EC%9D%98-%EA%B3%A0%EA%B8%89-%EC%BB%A4%EB%A7%A8%EB%93%9C%EB%93%A4)


---

### Stream

* Stream은 위의 두 가지 방법의 제한 사항을 해결해 준다. 

* 컨슈머는 새 메시지의 경우 `$`를 사용 

  특정 메시지 ID의 경우 `<id>`를 사용 
  
  처음부터 읽을 경우 `0-0` 등 메시지를 읽을 위치를 선택할 수 있다.

---

> Redis Stream 관련 글 추천

* [Redis Streams와 Apache Kafka: 두 데이터 스트리밍 시스템 비교](https://wiki.yowu.dev/ko/Knowledge-base/NoSQL/redis-streams-vs-apache-kafka-comparing-two-data-streaming-systems)

---

## Summary

* DB 및 Redis를 사용하여 MQ를 구현하고 사용할 수 있다.

  그러나 특정 제약 사항이 비즈니스 개발을 하는데 발목을 잡는다면
  
  MQ를 다루는 전문적인 솔루션을 사용하는 게 좋다.

* [다음 글에서는 MQ를 다루는 솔루션]({site.url}/Tech-How-To-Choose-A-Message-Queue-2)에 대해 알아보도록 하자.

  ex) RabbitMQ, Kafka

---

## Reference

* [How to Choose a Message Queue? Kafka vs. RabbitMQ](https://blog.bytebytego.com/p/how-to-choose-a-message-queue-kafka)

* [Complete Guide to Redis Publish Subscribe](https://www.geeksforgeeks.org/redis-publish-subscribe/)