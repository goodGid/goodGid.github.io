---
layout: post
title:  " [아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지! 강의 정리 : 카프카 커넥트 소개 "
categories: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [강의](https://shorturl.at/gpsQS) 내용을 바탕으로 작성하였습니다.

## 카프카 커넥트 소개

<p>
<img src="/assets/img/kafka/Kafka_connect_introduce_1.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Kafka_connect_introduce_2.png" alt="" style="max-width: 100%;">
</p>

* 커넥터는 태스크들을 관린한다.

* 태스트가 실질적인 데이터 처리를 담당한다.

* 커넥트안에 커넥터가 존재한다.

---

## 커넥터

<p>
<img src="/assets/img/kafka/Kafka_connect_1.png" alt="" style="max-width: 100%;">
</p>

---

### 커넥터 플러그인

<p>
<img src="/assets/img/kafka/Kafka_connect_2.png" alt="" style="max-width: 100%;">
</p>

---

### 오픈소스 커넥터

<p>
<img src="/assets/img/kafka/Kafka_connect_3.png" alt="" style="max-width: 100%;">
</p>

---

### 컨버터, 트랜스폼

<p>
<img src="/assets/img/kafka/Kafka_connect_4.png" alt="" style="max-width: 100%;">
</p>

---

## 커넥트 배포 및 운영

<p>
<img src="/assets/img/kafka/Connect_Deployment_and_Operations_1.png" alt="" style="max-width: 100%;">
</p>

---

### 단일 모드 커넥트

커넥트가 프로세스로 실행되는데 소스 커넥터를 1개 쓰레드로 실행

<p>
<img src="/assets/img/kafka/Connect_Deployment_and_Operations_2.png" alt="" style="max-width: 100%;">
</p>

---

### 분산 모드 커넥트

<p>
<img src="/assets/img/kafka/Connect_Deployment_and_Operations_3.png" alt="" style="max-width: 100%;">
</p>

---

## 단일모드 커넥트

<p>
<img src="/assets/img/kafka/Single_mode _connect_1.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Single_mode _connect_2.png" alt="" style="max-width: 100%;">
</p>

---

## 분산모드 커넥트


<p>
<img src="/assets/img/kafka/Distributed_mode_connect_1.png" alt="" style="max-width: 100%;">
<img src="/assets/img/kafka/Distributed_mode_connect_2.png" alt="" style="max-width: 100%;">
</p>

```
offset.storage.topic=connect-offsets 
offset.storage.replication.factor=1 
config.storage.topic=connect-configs 
config.storage.replication.factor=1 
status.storage.topic=connect-status 
status.storage.replication.factor=1
```
* 그룹 id 별로 topic을 설정해야 한다.

  미리 생성하거나 커넥트 생성 시 생성되도록 설정이 필요하다.

* 위처럼 모든 것을 정의하고

  커넥트 프로세스 실행 시
  
  토픽 있는지 확인하고 없으면 생성한다.

* 그리고 카프카 클러스터를 연동하면서

  플러그인 디렉터리에 있는 플러그인을 추가해서 실행시키게 된다.

* 실행된 커넥트는 REST API를 통해

  파이프라인 역할을 하는 쓰레드를 동작시킨다.

---

## Reference

* [[아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지!](https://shorturl.at/gpsQS)