---
layout: post
title:  " [아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지! 강의 정리 : 카프카 프로듀서 애플리케이션 개발 "
categories: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [강의](https://shorturl.at/gpsQS) 내용을 바탕으로 작성하였습니다.

## 카프카 프로듀서 소개

<p>
<img src="/assets/img/kafka/Introduction_to_Kafka_Producer_1.png" alt="" style="max-width: 100%;"> 
</p>

* (복습) 오프셋은 카프카의 특정 파티션에 저장 된 후 지정된다.

  나머지 내용은 [[아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지! 강의 정리 : 카프카 기본 개념 설명]({{site.url}}/Kafka-Lecture-Inflearn-Kafka-basic-concepts-explained)를 참고하자.



---

## 파티셔너(Partitioner)

### 프로듀서의 기본 파티셔너

<p>
<img src="/assets/img/kafka/producers_default_partitioner_1.png" alt="" style="max-width: 100%;"> 
</p>

* UniformStickyPartitioner가 Default 파티셔너이다.

<p>
<img src="/assets/img/kafka/producers_default_partitioner_2.png" alt="" style="max-width: 100%;"> 
</p>

* RoundRobinPartitioner는 [카프카 프로듀서 소개]({{site.url}}/Kafka-Lecture-Inflearn-Kafka-Producer-Application-Development/#카프카-프로듀서-소개)를 보면 어큐뮤레이터에 데이터가 쌓이면

  바로 파티션으로 요청을 하게 되고 

  그러므로 파티셔너의 처리 성능이 낮다고 볼 수 있다.

* 반면 UniformStickyPartitioner는 데이터를 모아서 요청을 하므로 상대적으로 처리 성능이 높다.

---

####  RoundRobinPartitioner

<p>
<img src="/assets/img/kafka/producers_default_partitioner_3.png" alt="" style="max-width: 100%;"> 
</p>

* 메시지를 순차적으로 파티션으로 분배하는 전략이다.

* 메시지가 발행될 때마다 다음 파티션으로 메시지를 보내는 방식이다.

* 예를 들어 첫 번째 메시지는 파티션 1로 

  두 번째 메시지는 파티션 2로 
  
  세 번째 메시지는 다시 파티션 1로 보내는 식으로 동작한다.

---

#### UniformStickyPartitioner

<p>
<img src="/assets/img/kafka/producers_default_partitioner_4.png" alt="" style="max-width: 100%;"> 
</p>

* RoundRobinPartitioner와 유사한 개념을 가지고 있다.

* 이 전략도 메시지를 파티션 간에 고르게 분산하려는 목적을 가지고 있다.

* 파티션의 크기에 따라 조정된다. 

  즉 파티션의 크기가 다를 때도 고르게 분산할 수 있도록 도와주는데

  예를 들어 파티션 1에 100개의 메시지가 있고 
  
  파티션 2에 50개의 메시지가 있을 때 
  
  UniformStickyPartitioner는 파티션 2에 더 많은 메시지를 보내 
  
  파티션 1과 2를 고르게 유지하려고 시도한다.

* 정리하자면 RoundRobinPartitioner는 메시지를 순차적으로 파티션으로 분배하고 

  UniformStickyPartitioner는 파티션의 크기를 고려하여 메시지를 분산한다.

---

### 프로듀서의 커스텀 파티셔너

<p>
<img src="/assets/img/kafka/producers_custom_partitioner_1.png" alt="" style="max-width: 100%;"> 
</p>


---

## 프로듀서 주요 옵션 소개

<p>
<img src="/assets/img/kafka/Introduction_to_producer_main_options_1.png" alt="" style="max-width: 100%;"> 
<img src="/assets/img/kafka/Introduction_to_producer_main_options_2.png" alt="" style="max-width: 100%;"> 
</p>

---


## ISR(In-Sync-Replicas)와 acks 옵션
Isr_and_acks_option_1

### acks = 1

<p>
<img src="/assets/img/kafka/Isr_and_acks_option_1.png" alt="" style="max-width: 100%;"> 
</p>

* 대부분 환경에서는 acks = 1로 설정해도 문제가 없다.

---

### acks = -1

<p>
<img src="/assets/img/kafka/Isr_and_acks_option_2.png" alt="" style="max-width: 100%;"> 
</p>

---

### min.insync.replicas

<p>
<img src="/assets/img/kafka/Isr_and_acks_option_3.png" alt="" style="max-width: 100%;"> 
</p>

* min.insync.replicas를 1로 설정하면

  acks를 1로 설정한 결과랑 동일하다.

  = 리더 파티션에만 데이터를 저장하면 끝

---

### acks = -1 && min.insync.replicas = 2

<p>
<img src="/assets/img/kafka/Isr_and_acks_option_4.png" alt="" style="max-width: 100%;"> 
</p>


---

## 프로듀서 애플리케이션 개발하기 <br> 메시지 키를 가진 프로듀서 애플리케이션 <br> 파티션 번호를 지정한 프로듀서 애플리케이션 <br> 커스텀 파티셔너 프로듀서 애플리케이션 <br> 레코드 전송 결과를 확인하는 프로듀서 애플리케이션 <br> 프로듀서 애플리케이션의 안전한 종료

* 230930 : 실제 프로젝트 개발이라 정리 할 내용 X


---

## Reference

* [[아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지!](https://shorturl.at/gpsQS)