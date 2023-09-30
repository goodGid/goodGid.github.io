---
layout: post
title:  " [아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지! 강의 정리 : 카프카 기본 개념 설명 "
categories: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [강의](https://shorturl.at/gpsQS) 내용을 바탕으로 작성하였습니다.

## 카프카 브로커와 클러스터

### 주키퍼

* 주키퍼는 카프카 클러스터를 운영하기 위해 필요한 어플리케이션이다.

* 카프카 2.x -> 반드시 필요 O

  카프카 3.x -> 반드시 필요 X, 하지만 완벽히 대체하지 못하여 아직까진 주키퍼가 있는 게 안전하다.

---

### 브로커 

![](/assets/img/kafka/Kafka_broker_and_cluster_1.png)

* 하나의 서버(=인스턴스)에는 한 개의 카프카 브로커 프로세스가 실행된다.

---

### 클러스터

* n개의 브로커를 묶어놓은 형태를 뜻한다.



---

## 카프카 클러스터와 주키퍼

![](/assets/img/kafka/Kafka_cluster_and_Zookeeper_1.png)

* 230917 : 별 내용 X

---

## 카프카 브로커의 역할들

### 컨트롤러, 데이터 삭제

![](/assets/img/kafka/Roles_of_Kafka_Broker_1.png)

* 시간이나 용량을 기준으로 삭제가 진행된다.

  또한 compact 명령어를 사용하여 삭제가 가능하다.

---

### 컨슈머 오프셋 저장, 코디네이터

![](/assets/img/kafka/Roles_of_Kafka_Broker_2.png)

* __consumer_offsets은 인터널 토픽이라고 부르고 

  특별히 볼 일도 없고 
  
  내부 매커니즘에 의해 자동 생성되어 사용된다.

---

## 브로커 로그와 세그먼트

![](/assets/img/kafka/Broker_Logs_and_Segments_1.png)

<p>
<img src="/assets/img/kafka/Broker_Logs_and_Segments_2.png" alt="" style="max-width: 49%;">
<img src="/assets/img/kafka/Broker_Logs_and_Segments_3.png" alt="" style="max-width: 49%;">
</p>

* 브로커는 데이터를 **파일 시스템**에 저장한다.

* 위에서 말하는 메시지란

  프로듀서가 보낸 레코드 1개를 데이터를 메시지 혹은 레코드라 부른다.

* 데이터는 1개의 파일에 연속적으로 저장되는 것이 아니라 나뉘어 저장된다.

* 나뉘는 기준은 바이트, 시간 2가지 조건이 있다.

* 해당 조건이 충족되면

  프로듀서가 전송하는 데이터는 기존 파일이 아닌 새로운 파일에 적재된다.

* 파일명에 사용되는 번호는 오프셋 번호이다.

  ( 오프셋 = 레코드의 고유한 번호 )

---

## 세그먼트와 삭제 주기 (cleanup.policy)

### cleanup.policy = delete

<p>
<img src="/assets/img/kafka/Segments_and_deletion_cycle_1.png" alt="" style="max-width: 49%;">
<img src="/assets/img/kafka/Segments_and_deletion_cycle_2.png" alt="" style="max-width: 49%;">
</p>

* 액티브가 아닌 세그먼트 단위로 삭제가 이뤄진다.

* 삭제를 하는 방법은 크게 2가지가 있는데 첫 번째 방법은 delete 옵션을 설정하는 것이다.

* 인스턴스의 Disk 크기를 보고 retension 값을 정해야 한다.

  ex) Disk 크기는 작은데 retension을 너무 길게 가져가면 안 된다.

---

### cleanup.policy = compact

<p>
<img src="/assets/img/kafka/Segments_and_deletion_cycle_3.png" alt="" style="max-width: 100%;"> 
</p>

---

### 테일/헤드 영역, 클린/더티 로그

<p>
<img src="/assets/img/kafka/Segments_and_deletion_cycle_4.png" alt="" style="max-width: 100%;"> 
</p>

---

### min.cleanable.dirty.ratio

<p>
<img src="/assets/img/kafka/Segments_and_deletion_cycle_5.png" alt="" style="max-width: 100%;"> 
</p>

---

## 복제 (Replication)

<p>
<img src="/assets/img/kafka/Kafka_Replication_1.png" alt="" style="max-width: 100%;"> 
</p>

* 카프카의 데이터 복제는 파티션 단위로 이루어진다.

* 토픽 생성 시 파티션의 복제 개수도 같이 설정한다.

* 옵션을 선택하지 않으면 브로커에 설정된 옵션 값을 따라가는데

  일반적으로는 2,3으로 설정한다.

<p>
<img src="/assets/img/kafka/Kafka_Replication_2.png" alt="" style="max-width: 49%;"> 
<img src="/assets/img/kafka/Kafka_Replication_3.png" alt="" style="max-width: 49%;"> 
</p>


* 위 예시는 Replication Factor = 3으로 설정되어 있고

  1GB 데이터를 보내면 총 3GB 디스크가 필요하다.

---

### 브로커에 장애가 발생할 경우

<p>
<img src="/assets/img/kafka/Kafka_Replication_4.png" alt="" style="max-width: 100%;"> 
</p>

* 토픽마다 복제 수를 다르게 설정하여 운영한다.

* 데이터 처리 속도가 중요하다면 1 또는 2로 설정하고 

  금융 정보와 같이 중요한 정보는 복제 수를 높은 값으로 설정한다.

  ex) 1로 설정하는 경우는 matrix 데이터

---

## ISR (In-Sync-Replicas)

![](/assets/img/kafka/Kafka_ISR_1.png)

![](/assets/img/kafka/Kafka_ISR_2.png)

* 토픽 단위로 설정이 가능하다.

---

## 토픽과 파티션

![](/assets/img/kafka/Kafka_Topics_and_Partitions_1.png)

* 토픽은 1개 이상의 파티션으로 구성되어 있다.

* 다양한 목적을 가진 여러 컨슈머 그룹들이 토픽의 데이터를 여러 번 가져갈 수 있다.


---

### 토픽 생성 시 파티션이 배치되는 방법

<p>
<img src="/assets/img/kafka/Kafka_Topics_and_Partitions_2.png" alt="" style="max-width: 100%;"> 
<img src="/assets/img/kafka/Kafka_Topics_and_Partitions_3.png" alt="" style="max-width: 100%;"> 
</p>

* 라운드 로빈 방식으로 리더 파티션을 생성한다.

---

### 특정 브로커에 파티션이 쏠린 현상

<p>
<img src="/assets/img/kafka/Kafka_Topics_and_Partitions_4.png" alt="" style="max-width: 100%;"> 
<img src="/assets/img/kafka/Kafka_Topics_and_Partitions_5.png" alt="" style="max-width: 100%;"> 
</p>

---

### 파티션 개수와 컨슈머 개수의 처리량

<p>
<img src="/assets/img/kafka/Kafka_Topics_and_Partitions_6.png" alt="" style="max-width: 100%;"> 
</p>

* 2개 파티션을 1개의 컨슈머가 컨슘 하는 건 가능하나

  1개의 파티션에 대해 2개의 컨슈머가 컨슘 하는 건 불가능하다.

* 프로듀서가 초당 10개를 펍 하면

  파티션의 수는 최소 10개 이상으로 설정한다.

  그리고 컨슈머 수도 최소 10개 이상이 되어야 한다.
  
  일반적으로는 초당 10개 펍이 이뤄난다면 20개 정도 여유롭게 설정한다.

---

### 파티션 개수를 줄이는 것은 불가능

<p>
<img src="/assets/img/kafka/Kafka_Topics_and_Partitions_7.png" alt="" style="max-width: 100%;"> 
</p>

* KIP-694 = 카프카 운영보수를 위한 지라 티켓

---

## 레코드

![](/assets/img/kafka/Kafka_Record_1.png)

* 프로듀서는 오프셋과 타임스탬프를 갖고 있지 않고

  저 값은 브로커가 레코드 생성 시 설정한다.

---

### 레코드-타임스탬프

![](/assets/img/kafka/Kafka_Record_2.png)

* 토픽 단위로 설정 가능

---

### 레코드-오프셋

![](/assets/img/kafka/Kafka_Record_3.png)

---

### 레코드-헤더

![](/assets/img/kafka/Kafka_Record_4.png)

---

### 레코드-메시지 키

![](/assets/img/kafka/Kafka_Record_5.png)

* 메시지 키는 필수 값이 아니다.

* 키 값을 지정하지 않으면 null로 세팅되고 라운드 로빈 방식으로 파티션에 매핑된다.

  키 값을 지정하면 해쉬값에 의해 특정 파티션에 매핑되어 전달된다.

---

## 레코드-메시지 값

![](/assets/img/kafka/Kafka_Record_6.png)

---

## 유지보수하기 좋은 토픽 이름 정하기

<p>
<img src="/assets/img/kafka/Choosing_a_maintainable_topic_name_1.png" alt="" style="max-width: 100%;"> 
<img src="/assets/img/kafka/Choosing_a_maintainable_topic_name_2.png" alt="" style="max-width: 100%;"> 
</p>

* 개인적으로 가장 앞에 Env를 지정하는 게 좋아보인다.

---

## 클라이언트 메타데이터와 브로커 통신

<p>
<img src="/assets/img/kafka/Client_metadata_and_broker_communication_1.png" alt="" style="max-width: 100%;"> 
<img src="/assets/img/kafka/Client_metadata_and_broker_communication_2.png" alt="" style="max-width: 100%;"> 
</p>






---

## Reference

* [[아파치 카프카 애플리케이션 프로그래밍] 개념부터 컨슈머, 프로듀서, 커넥트, 스트림즈까지!](https://shorturl.at/gpsQS)