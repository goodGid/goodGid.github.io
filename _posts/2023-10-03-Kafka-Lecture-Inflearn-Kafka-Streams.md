---
layout: post
title:  " [아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지! 강의 정리 : 카프카 스트림즈 "
categories: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [강의](https://shorturl.at/gpsQS) 내용을 바탕으로 작성하였습니다.

## 카프카 스트림즈 소개

<p>
<img src="/assets/img/kafka/Kafka_streams_1.png" alt="" style="max-width: 100%;">
</p>

### 스트림즈를 사용해야 하는 이유 

> 프로듀서와 컨슈머를 조합하지 않고 스트림즈를 사용해야 하는 이유 

<p>
<img src="/assets/img/kafka/Kafka_streams_2.png" alt="" style="max-width: 100%;">
</p>




---

### 스트림즈 내부 구조

<p>
<img src="/assets/img/kafka/Kafka_streams_3.png" alt="" style="max-width: 100%;">
</p>

---

### 스트림즈 어플리케이션 스케일 아웃

<p>
<img src="/assets/img/kafka/Kafka_streams_4.png" alt="" style="max-width: 100%;">
</p>


---

### 토폴로지

<p>
<img src="/assets/img/kafka/Kafka_streams_5.png" alt="" style="max-width: 100%;">
</p>

---

### 프로세서와 스트림

<p>
<img src="/assets/img/kafka/Kafka_streams_6.png" alt="" style="max-width: 100%;">
</p>

---

### 소스 프로세서, 스트림 프로세서, 싱크 프로세서

<p>
<img src="/assets/img/kafka/Kafka_streams_7.png" alt="" style="max-width: 100%;">
</p>

---

### 소스 프로세서, 스트림 프로세서, 싱크 프로세서

<p>
<img src="/assets/img/kafka/Kafka_streams_8.png" alt="" style="max-width: 100%;">
</p>

---

## 스트림즈 DSL

<p>
<img src="/assets/img/kafka/Streams_dsl_1.png" alt="" style="max-width: 100%;">
</p>

---

## KStream, KTable, GlobalKTable

### KStream

<p>
<img src="/assets/img/kafka/Kstream_ktable_globalktable_1.png" alt="" style="max-width: 100%;">
</p>

---

### KTable

<p>
<img src="/assets/img/kafka/Kstream_ktable_globalktable_2.png" alt="" style="max-width: 100%;">
</p>

---

### 코파티셔닝

<p>
<img src="/assets/img/kafka/Kstream_ktable_globalktable_3.png" alt="" style="max-width: 100%;">
</p>

---

### 코파티셔닝되지 않는 2개 토픽의 이슈

<p>
<img src="/assets/img/kafka/Kstream_ktable_globalktable_4.png" alt="" style="max-width: 100%;">
</p>

---

### GlobalKTable

<p>
<img src="/assets/img/kafka/Kstream_ktable_globalktable_5.png" alt="" style="max-width: 100%;">
</p>

* 파티션에 있는 모든 데이터가

  각 태스크에서 사용된다.

* 큰 데이터 용량은 GlobalKTable에서 사용하기에 부담된다.

  일반적으로 코파티셔닝 KStream이나 KTable을 활용하는 경우가 대부분이다.

---

## 스트림즈 주요 옵션 소개

### 스트림즈DSL 중요 옵션 (필수)

<p>
<img src="/assets/img/kafka/Introduction_to_Streams_main_options_1.png" alt="" style="max-width: 100%;">
</p>

---

### 스트림즈DSL 중요 옵션 (선택)

<p>
<img src="/assets/img/kafka/Introduction_to_Streams_main_options_2.png" alt="" style="max-width: 100%;">
</p>

* num.stream.threads는 스케일업과 같이 

  1개의 물리 장비에서 여러 쓰레드로 실행시킬 때 사용된다.

---

## 스트림즈 애플리케이션 개발하기 <br> KStream, KTable 조인 스트림즈 애플리케이션 <br> KStream, GlobalKTable 조인 스트림즈 애플리케이션

<p>
<img src="/assets/img/kafka/Join_streams_application_1.png" alt="" style="max-width: 100%;">
</p>


* 231002 : 실제 프로그래밍 내용이라 정리 X

---

## 스트림즈DSL의 윈도우 프로세싱

<p>
<img src="/assets/img/kafka/Streams_DSL_Window_Processing_1.png" alt="" style="max-width: 100%;">
</p>

---

### 텀블링 윈도우

<p>
<img src="/assets/img/kafka/Streams_DSL_Window_Processing_2.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Streams_DSL_Window_Processing_3.png" alt="" style="max-width: 100%;">
</p>

---

### 호핑 윈도우

<p>
<img src="/assets/img/kafka/Streams_DSL_Window_Processing_4.png" alt="" style="max-width: 100%;">
</p>

---

### 슬라이딩 윈도우

<p>
<img src="/assets/img/kafka/Streams_DSL_Window_Processing_5.png" alt="" style="max-width: 100%;">
</p>

---

### 세션 윈도우

<p>
<img src="/assets/img/kafka/Streams_DSL_Window_Processing_6.png" alt="" style="max-width: 100%;">
</p>


---

### 윈도우 연산시 주의 사항

<p>
<img src="/assets/img/kafka/Streams_DSL_Window_Processing_7.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Streams_DSL_Window_Processing_8.png" alt="" style="max-width: 100%;">
</p>

* 231002 : 무슨 말인지 잘 이해 안 감

  관련 내용을 더 찾아봐야 내가 실제로 경험해 봐야 이해도가 높아질 거 같아서 일단 스킵

---

## 스트림즈DSL의 Queryable store

<p>
<img src="/assets/img/kafka/Queryable_store_1.png" alt="" style="max-width: 100%;">
</p>

* 231002 : 레디스처럼 사용할 수 있다니 신기하다.

---

## 프로세서 API

<p>
<img src="/assets/img/kafka/Processor_API_1.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Processor_API_2.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Processor_API_3.png" alt="" style="max-width: 100%;">
</p>

* 231003 : 스트림즈를 더 많이 이용할 거 같아서 

  프로세서 API는 가볍게 '이런 게 있구나'정도로 스킵

---

## 카프카 스트림즈와 스파크 구조적 스트리밍 비교

<p>
<img src="/assets/img/kafka/Kafka_streams_and_spark_streams_1.png" alt="" style="max-width: 100%;">
</p>

* 231003 : 완전 Devpos 부분이라 가볍게 스킵


---

## Reference

* [[아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지!](https://shorturl.at/gpsQS)