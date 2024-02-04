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

* 자세한 내용은 [Redis를 MessageQueue로 활용하는 방법]({{site.url}}/Redis-We-Use-Redis-As-Message-Queue) 글을 참고하자.

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