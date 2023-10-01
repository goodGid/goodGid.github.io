---
layout: post
title:  " [아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지! 강의 정리 : 멱등성 프로듀서, 트랜잭션 프로듀서와 컨슈머 "
categories: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [강의](https://shorturl.at/gpsQS) 내용을 바탕으로 작성하였습니다.

## 멱등성 프로듀서

<p>
<img src="/assets/img/kafka/Idempotence_producer_1.png" alt="" style="max-width: 49%;">
<img src="/assets/img/kafka/Idempotence_producer_2.png" alt="" style="max-width: 49%;">
<img src="/assets/img/kafka/Idempotence_producer_3.png" alt="" style="max-width: 49%;">
</p>


### 멱등성 프로듀서의 동작

<p>
<img src="/assets/img/kafka/Idempotence_producer_4.png" alt="" style="max-width: 100%;">
</p>

### 멱등성 프로듀서가 아닌 경우

<p>
<img src="/assets/img/kafka/Idempotence_producer_5.png" alt="" style="max-width: 50%;">
</p>

### 멱등성 프로듀서인 경우

<p>
<img src="/assets/img/kafka/Idempotence_producer_6.png" alt="" style="max-width: 50%;">
</p>

### 멱등성 프로듀서의 한계

<p>
<img src="/assets/img/kafka/Idempotence_producer_7.png" alt="" style="max-width: 100%;">
</p>

### 멱등성 프로듀서로 설정할 경우 옵션

<p>
<img src="/assets/img/kafka/Idempotence_producer_8.png" alt="" style="max-width: 100%;">
</p>

### 멱등성 프로듀서 사용 시 오류 확인

<p>
<img src="/assets/img/kafka/Idempotence_producer_9.png" alt="" style="max-width: 100%;">
</p>

---

## 트랜잭션 프로듀서, 컨슈머

<p>
<img src="/assets/img/kafka/Transaction_producer_and_consumer_1.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Transaction_producer_and_consumer_2.png" alt="" style="max-width: 100%;">
</p>


---

### 트랜잭션 프로듀서 설정

<p>
<img src="/assets/img/kafka/Transaction_producer_and_consumer_3.png" alt="" style="max-width: 100%;">
</p>

* initTransactions( ), beginTransaction( ), commitTransaction( ) 사이에 보낼 데이터를 넣는다.

---

### 트랜잭션 컨슈머 설정

<p>
<img src="/assets/img/kafka/Transaction_producer_and_consumer_4.png" alt="" style="max-width: 100%;">
</p>


---

## Reference

* [[아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지!](https://shorturl.at/gpsQS)