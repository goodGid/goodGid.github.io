---
layout: post
title:  " [시스템 설계 (System Design) - 한번에 인터뷰 합격하기] 3강 : 빅데이터를 활용한 작업 "
categories: SystemDesign
author: goodGid
---
* content
{:toc}

> 이 글은 [강의](https://www.udemy.com/course/best-system-design-interview) 내용을 토대로 작성하였습니다.

---

## 메시지 큐

![](/assets/img/sd/SD-Working-with-Big-Data_1.png)

### SQS (Simple Queue Service)

* ex) AWS SQS 서비스



---

### MQ

* 단일 소비자 시스템이 있다.

* Pub/Sub과 같이 특정 발행자에 대해 여러 소비자가 있을 수 있다.

---

## 클라우드 컴퓨팅 : 개요

### 서비스 별 상품 목록

![](/assets/img/sd/SD-Working-with-Big-Data_2.png)

---

### 데이터 레이크란?

* 많은 양의 비정형 데이터를 어딘가에 저장하는 개념

  이후 정형 데이터처럼 쿼리가 가능

  ex) S3, GCP의 Cloud Storage, MS Data Lake Storage

---

### AWS를 사용한 데이터 웨어하우스 설계

![](/assets/img/sd/SD-Working-with-Big-Data_3.png)

* 230507 (Sun) : 한 줄 요약

  굳이 AWS 면접을 보는 게 아니라면 몰라도 될 듯

* Amazon Kinesis Data Firehose로 서버 로그를 S3로 데이터 스트리밍 연결

  키네시스는 생성되는 로그를 확인
  
  그리고 구조화 작업(ex. json, csv)을 거친 후 데이터를 스트리밍 처리를 함

---

### 하이브리드 클라우드

![](/assets/img/sd/SD-Working-with-Big-Data_4.png)

* 중요한 정보는 온프레미스에 저장

* 굳이 온프레미스 처리가 필요 없다면 퍼블릭 클라우드를 사용


---

## Refernece

* [시스템 설계 (System Design) - 한번에 인터뷰 합격하기](https://www.udemy.com/course/best-system-design-interview)