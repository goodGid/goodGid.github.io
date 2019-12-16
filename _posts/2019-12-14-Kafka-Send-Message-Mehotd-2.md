---
layout: post
title:  " Kafka Message Send Method :: 2st "
categories: Kafka
tags: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [책](https://book.naver.com/bookdb/book_detail.nhn?bid=13540082)을 바탕으로 작성하였습니다.

## 메시지 전송 방법

* 프로듀서 옵션 중 

* acks 옵션을 어떻게 설정하는지에 따라

* 카프카로 메시지를 전송 시 

* 메시지 손실 여부 / 메시지 전송 속도 / 처리량 등이 달라지게 된다.







<br>

* 각 옵션은 정확하게 이해하고

* 사용해야하므로

* 3가지 경우를 통해

* 자세히 알아보자.

1. **[메시지 손실 가능성 ↑ && 빠른 전송]({{site.url}}/Kafka-Send-Message-Mehotd-1/#메시지-손실-가능성---빠른-전송)**

2. **[메시지 손실 가능성 ↓ && 적당한 전송 속도]({{site.url}}/Kafka-Send-Message-Mehotd-1/#메시지-손실-가능성---적당한-전송-속도)**

3. **[메시지 손실 X && 전송 속도 ↓]({{site.url}}/Kafka-Send-Message-Mehotd-2/#메시지-손실-x--전송-속도-)**

<br>

* 이 글에서는 3번 상황에 대해 알아보고

* 1,2번 상황에 대해서는 

* [Kafka Message Send Method :: 1st]({{site.url}}/Kafka-Send-Message-Mehotd-1/)글을 참고하자.







---

## 메시지 손실 X && 전송 속도 ↓

* 카프카를 사용하는 입장에서 

* 절대 손실되지 않는 상황을 원할 수 있다.

<br>

* 그래서 카프카에서는 

* **acks = all** 이라는 옵션을 제공한다.

<br>

* acks = all의 동작 방식은

* 프로듀서가 메시지를 전송하고 

* 리더 / 팔로워 모두에게 메시지를 받았는지 확인한다.

<br>

* 속도적인 측면에선 acks 옵션 중 가장 느리지만

* 메시지 손실을 허용하지 않는다.

<br>

* acks = all을 완벽하게 사용하고자 한다면

* 프로듀서의 설정 뿐만 아니라

* **브로커의 설정**도 같이 조정해야한다.

* (= 최소 리플리케이션 팩터를 지정하는 옵션 : min.insync.replicas)

* 브로커의 설정에 따라 응답 확인을 기다리는 수가 달라지게 된다.

---

## Example

* 토픽의 리플리케이션 팩터는 3인 상황이다.

* min.insync.replicas 옵션은

* 브로커의 설정은 환경설정 파일인

* server.properties에서 변경할 수 있다.

> Producer : acks = all && Broker : min.insync.replicas = 1

![](/assets/img/kafka/Kafka-Send-Message-Mehotd_6.png)

```
1. 프로듀서가 acks = all 옵션으로 리더에게 메시지를 보낸다.

2. 리더는 메시지를 받은 후 저장한다.

3. 리더는 min.insync.replicas가 1로 설정되어 있고 

   최소 하나의 리플리케이션 조건을 갖췄기 때문에 

   프로듀서에게 메시지를 받았다고 acks를 보낸다.
```

<br>

* 손실 없는 메시지 전송을 위해 

* 프로듀서가 acks = all 옵션으로 메시지를 전송했지만

* 결과적으로 acks = 1 처럼 동작한다.

* 이유는 브로커 환경 설정에 

* min.insync.replicas에 정의된 값이 1이기 때문이다.


<br>

* 카프카에서는 프로듀서만 acks = all로 메시지를 보낸다고

* 손실 없는 메시지를 보장해주는 것이 아니다.

* 그렇기 때문에 옵션을 잘 이해하고 설정해야한다.

---

> Producer : acks = all && Broker : min.insync.replicas = 2

![](/assets/img/kafka/Kafka-Send-Message-Mehotd_7.png)

```
1. 프로듀서가 acks = all 옵션으로 리더에게 메시지를 보낸다.

2. 리더는 메시지를 받은 후 저장한다.

   브로커 1에 있는 팔로워는 변경 사항이나 새로 받은 메시지가 없는지를

   리더로부터 주기적으로 확인하면서

   새로운 메시지가 전송된 것을 확인하면

   리더로부터 메시지를 가져와 저장한다.

3. 리더는 min.insync.replicas가 2으로 설정되어 있기 때문에

   acks를 보내기전에 최소 2개의 리플리케이션을 유지하는지 확인한다.

4. 리더는 프로듀서가 전송한 메시지에 대해

   acks를 프로듀서에게 보낸다.
```

* 손실 없는 메시지 전송을 위해 

* 프로듀서가 acks = all 옵션을 메시지를 전송했고

* 프로듀서는 acks를 받았다.

<br>

* 만약 리더가 acks를 보내자마자 

* 예외적인 경우로 리더 선출 작업이 발생해도

* 그 메시지를 가지고 있는 팔로워가 있기 때문에

* 메시지 손실은 발생하지 않는다.

<br>

* *아파치 카프카 문서* 에서는

* 손실없는 메시지 전송을 위한 **조건**을 다음과 같이 명시한다.
 
```
Producer : acks = all

Broker : min.insync.replicas = 2

Topic : Replication Factor = 3
```

<br>

* 만약 위 그림에서

* 브로커 1이 다운되는 현상이 발생해도

* 남아있는 팔로워가 또 있기 때문에

* min.insync.replicas = 2를 유지할 수 있게 된다.

<br>

* 즉 1대 정도의 서버 장애가 발생하더라도

* 손실없는 메시지 전송을 유지할 수 있다.

<br>

* 여기서 의문을 던질 수 있는 포인트가 있다.

* 손실없는 메시지 전송을 위해

* min.insync.replicas = 3으로 해야하는거 아닌가?

* 왜 아파치 카프카 문서에서는 

* min.insync.replicas의 값을 2로 권장하는걸까?

* min.insync.replicas가 3인 상황을 살펴보자.

---

> Producer : acks = all && Broker : min.insync.replicas = 3

![](/assets/img/kafka/Kafka-Send-Message-Mehotd_8.png)

```
1. 프로듀서가 acks = all 옵션으로 리더에게 메시지를 보낸다.

2. 리더는 메시지를 받은 후 저장한다.

   브로커 1에 있는 팔로워는 변경 사항이나 새로 받은 메시지가 없는지를

   리더로부터 주기적으로 확인하면서

   새로운 메시지가 전송된 것을 확인하면

   리더로부터 메시지를 가져와 저장한다.

3. 리더는 min.insync.replicas가 3으로 설정되어 있기 때문에

   acks를 보내기전에 최소 3개의 리플리케이션을 유지하는지 확인한다.

4. 리더는 프로듀서가 전송한 메시지에 대해

   acks를 프로듀서에게 보낸다.
```

* 이렇게만 보면

* 3개를 다 살펴보기 때문에

* 가장 강력한 방법이라고 생각할 수 있다.

* 하지만 3개를 다 살펴보기 때문에

* 예상치 못한 상황이 발생할 수 있다.

<br>

* 프로듀서가 토픽의 리더에게 메시지를 전송하게 되면

* 3곳(리더 / 팔로워1 / 팔로워2)에서 모두 메시지를 받아야만

* 리더는 프로듀서에게

* 메시지를 잘 받았다는 **확인(acks)**를 보낼 수 있다.

<br>

* 하지만 이 상황에서 

* 브로커 3번을 강제로 종료하게 되면

* 팔로워 하나가 다운되었고

* ISR에는 리더와 팔로워 하나만 남게 된다.

<br>

* 결국 옵션으로 설정한 조건(=min.insync.replicas)을 충족시킬 수 없는 상황이 된다.

* 즉 카프카로 메시지를 보낼 수 없는 

* 클러스터 전체 장애와 비슷한 상황이 발생하게 된다.

<br>

* min.insync.replicas = 2인 상황에서는

* 카프카 브로커 하나가 다운되더라도

* 크리티컬한 장애 상황없이 서비스를 잘 처리할 수 있도록 구성되어 있는데

* min.insync.replicas = 3로 설정을 하면서

* 브로커 하나만 다운되더라도 

* 서비스의 장애가 발생하게 된다.

<br>

* 이러한 이유 때문에

* 손실없는 메시지 전송을 위해서 

* 다음과 같이 설정하기를 권장하는 것이다.
 
```
Producer : acks = all

Broker : min.insync.replicas = 2

Topic : Replication Factor = 3
```

---

## 참고

* [카프카, 데이터 플랫폼의 최강자 실시간 비동기 스트리밍 솔루션 카프카의 기본부터 확장 응용까지](https://book.naver.com/bookdb/book_detail.nhn?bid=13540082)