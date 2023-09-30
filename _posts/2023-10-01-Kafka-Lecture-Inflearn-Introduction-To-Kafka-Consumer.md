---
layout: post
title:  " [아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지! 강의 정리 : 카프카 컨슈머 소개 "
categories: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [강의](https://shorturl.at/gpsQS) 내용을 바탕으로 작성하였습니다.

## 카프카 컨슈머 소개

### 컨슈머 내부 구조

<p>
<img src="/assets/img/kafka/Consumer_internal_structure_1.png" alt="" style="max-width: 100%;">
</p>

* fetcher는 레코드를 미리 가져온다.

* ConsumerRecords는 오프셋을 포함한다.




---

## 컨슈머 그룹

* 2개 파티션을 1개의 컨슈머가 컨슘 하는 건 가능하나

  1개의 파티션에 대해 2개의 컨슈머가 컨슘 하는 건 불가능하다.


### 컨슈머 그룹의 컨슈머가 파티션 개수보다 많을 경우

<p>
<img src="/assets/img/kafka/Consumer_group_1.png" alt="" style="max-width: 100%;">
</p>


---

### 컨슈머 그룹을 활용하는 이유

<p>
<img src="/assets/img/kafka/Consumer_group_2.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Consumer_group_3.png" alt="" style="max-width: 100%;">
</p>

---

## 리밸런싱

<p>
<img src="/assets/img/kafka/Rebalancing_1.png" alt="" style="max-width: 100%;">
</p>

---

## 커밋

<p>
<img src="/assets/img/kafka/Commit_1.png" alt="" style="max-width: 100%;">
</p>

---

## 어사이너(Assignor)

<p>
<img src="/assets/img/kafka/Assignor_1.png" alt="" style="max-width: 100%;">
</p>

* 일반적으로 토픽과 컨슈머를 1:1로 대응하므로

  크게 어사이너를 신경 쓸 필요는 없다.

---

## 컨슈머 주요 옵션 소개

<p>
<img src="/assets/img/kafka/Introduction_to_major_consumer_options_1.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Introduction_to_major_consumer_options_2.png" alt="" style="max-width: 100%;">
</p>

* 커밋 관련해서는 자동 커밋이 기본값이다.

* 하트비트 값인 3초가 지나고 

  하트비트를 기다리는데
  
  그렇게 10초가 지났다면 리밸런싱 작업이 이뤄난다.

---

## auto.offset.reset

<p>
<img src="/assets/img/kafka/Auto_offset_reset_1.png" alt="" style="max-width: 100%;">
</p>

* 컨슈머에 있는 선택 옵션 중 하나이다.

* 새로 만든 컨슈머 그룹을 운영하려고 할 때만 사용된다.

  이미 운영중이라면 기존에 오프셋을 보고 동작한다.

---

## 컨슈머 어플리케이션 개발하기 <br> 수동 커밋 컨슈머 어플리케이션 <br> 리밸런스 리스너를 가진 컨슈머 어플리케이션 <br> 리밸런스 리스너를 가진 컨슈머 애플리케이션 <br> 파티션 할당 컨슈머 애플리케이션

* 230930 : 실제 프로그래밍 내용이라 정리 할 내용 X

> 리밸런스 리스너를 가진 컨슈머

<p>
<img src="/assets/img/kafka/Consumer_with_rebalance_listener_1.png" alt="" style="max-width: 100%;">
</p>

---

## 컨슈머 애플리케이션의 안전한 종료

<p>
<img src="/assets/img/kafka/Safe_shutdown_of_consumer_applications_1.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Safe_shutdown_of_consumer_applications_2.png" alt="" style="max-width: 100%;">
</p>


---

## 멀티스레드 컨슈머 애플리케이션

<p>
<img src="/assets/img/kafka/Multithread_consumer_applications_1.png" alt="" style="max-width: 100%;">
</p>

---

## 컨슈머 랙

<p>
<img src="/assets/img/kafka/Consumer_lag_1.png" alt="" style="max-width: 49%;">
<img src="/assets/img/kafka/Consumer_lag_2.png" alt="" style="max-width: 49%;">
</p>

### 프로듀서와 컨슈머의 데이터 처리량

<p>
<img src="/assets/img/kafka/Consumer_lag_3.png" alt="" style="max-width: 100%;">
</p>

### 랙 모니터링

<p>
<img src="/assets/img/kafka/Consumer_lag_4.png" alt="" style="max-width: 100%;">
</p>

### 랙 모니터링 - 처리량 이슈

<p>
<img src="/assets/img/kafka/Consumer_lag_5.png" alt="" style="max-width: 100%;">
</p>

### 랙 모니터링 - 파티션 이슈

<p>
<img src="/assets/img/kafka/Consumer_lag_6.png" alt="" style="max-width: 100%;">
</p>

---

## 컨슈머 랙을 모니터링하는 방법

> 카프카 명령어 사용

<p>
<img src="/assets/img/kafka/Consumer_lag_monitoring_1.png" alt="" style="max-width: 100%;">
</p>

--- 

> metrics( ) 메서드 사용

<p>
<img src="/assets/img/kafka/Consumer_lag_monitoring_2.png" alt="" style="max-width: 49%;">
<img src="/assets/img/kafka/Consumer_lag_monitoring_3.png" alt="" style="max-width: 49%;">
</p>

* 컨슈머가 죽으면 확인을 할 수 없다.

--- 

> 외부 모니터링 툴 사용

<p>
<img src="/assets/img/kafka/Consumer_lag_monitoring_4.png" alt="" style="max-width: 100%;">
</p>

* 데이터 독 혹은 컨플루언트 컨트롤 센터가 좋다.

* 모든 토픽, 모든 컨슈머 그룹 정보를 수집해서 보여줌으로 엄청난 편의성을 제공한다.

---

## 카프카 버러우

<p>
<img src="/assets/img/kafka/Kafka_monitoring_tool_burrow_1.png" alt="" style="max-width: 100%;">
</p>

### 컨슈머 랙 이슈 판별

<p>
<img src="/assets/img/kafka/Kafka_monitoring_tool_burrow_2.png" alt="" style="max-width: 100%;">
</p>

### 컨슈머 랙 평가

<p>
<img src="/assets/img/kafka/Kafka_monitoring_tool_burrow_3.png" alt="" style="max-width: 100%;">
</p>

### 정상 케이스

<p>
<img src="/assets/img/kafka/Kafka_monitoring_tool_burrow_4.png" alt="" style="max-width: 100%;">
</p>

### 컨슈머 처리량 이슈

<p>
<img src="/assets/img/kafka/Kafka_monitoring_tool_burrow_5.png" alt="" style="max-width: 100%;">
</p>

### 컨슈머 이슈

<p>
<img src="/assets/img/kafka/Kafka_monitoring_tool_burrow_6.png" alt="" style="max-width: 100%;">
</p>

### 컨슈머 랙 모니터링 아키텍처

<p>
<img src="/assets/img/kafka/Kafka_monitoring_tool_burrow_7.png" alt="" style="max-width: 100%;">
</p>

---

## Reference

* [[아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지!](https://shorturl.at/gpsQS)