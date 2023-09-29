---
layout: post
title:  " [아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지! 강의 정리 : 아파치 카프카 CLI 활용 "
categories: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [강의](https://shorturl.at/gpsQS) 내용을 바탕으로 작성하였습니다.

## 카프카 CLI 툴 소개

* 230923 : 딱히 정리 할 내용 X

---

### SaaS형 아파치 카프카 소개

* 230922 : 딱히 정리 할 내용 X

---

### SaaS형 아파치 카프카 장점과 단점

* 230922 : 딱히 정리 할 내용 X


---

## 로컬에서 카프카 브로커 실행

<p>
<img src="/assets/img/kafka/Running_a_Kafka_broker_locally_1.png" alt="" style="max-width: 100%;"> 
</p>

* data 디렉토리를 생성해준다.


<p>
<img src="/assets/img/kafka/Running_a_Kafka_broker_locally_2.png" alt="" style="max-width: 100%;"> 
<img src="/assets/img/kafka/Running_a_Kafka_broker_locally_3.png" alt="" style="max-width: 100%;"> 
</p>

* config/server.properties에서 log.dirs과 listener 값을 수정해준다.

### 주키퍼 실행

<p>
<img src="/assets/img/kafka/Running_a_Kafka_broker_locally_4.png" alt="" style="max-width: 100%;"> 
</p>

### 카프카 브로커 실행

<p>
<img src="/assets/img/kafka/Running_a_Kafka_broker_locally_5.png" alt="" style="max-width: 100%;"> 
</p>

* 순서는 주키퍼를 실행시키고 

  카프카 브로커를 실행시켜야 한다.

### 카프카 정상 실행 여부 확인

<p>
<img src="/assets/img/kafka/Running_a_Kafka_broker_locally_6.png" alt="" style="max-width: 100%;"> 
<img src="/assets/img/kafka/Running_a_Kafka_broker_locally_7.png" alt="" style="max-width: 100%;"> 
</p>

### 테스트 편의를 위한 hosts 설정 

<p>
<img src="/assets/img/kafka/Running_a_Kafka_broker_locally_8.png" alt="" style="max-width: 100%;"> 
</p>

---

## kafka-topics.sh <br> kafka-configs.sh <br> kafka-console-producer.sh <br> kafka-console-consumer.sh <br> kafka-consumer-groups.sh <br> 그 외 커맨드 라인 툴 <br> 카프카 토픽을 만드는 두가지 방법 <br> 카프카 브로커와 로컬 커맨드 라인 툴 버전을 맞춰야 하는 이유

* 230929 : 따로 정리 할 내용 X

  첨부 자료 참고

---

## Reference

* [[아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지!](https://shorturl.at/gpsQS)