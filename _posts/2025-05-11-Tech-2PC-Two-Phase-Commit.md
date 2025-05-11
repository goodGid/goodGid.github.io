---
layout: post
title:  " 2PC(Two-Phase Commit)란 무엇일까? "
categories: Tech
author: goodGid
use_math: true
---
* content
{:toc}

## 2PC(Two-Phase Commit)

* **2PC(Two-Phase Commit)**는 

  Coordinator(조정자)와 Participants(참여자) 간의 프로토콜 

  트랜잭션을 모든 Participant에게 동일하게 커밋하거나 롤백하도록 보장하는 개념을 뜻한다.



### Coordinator, Participants

* Coordinator

  트랜잭션을 관리하며, 커밋/롤백 여부를 결정한다.

* Participants (또는 Resource Managers)

  실제 데이터 연산이 일어나는 노드를 뜻한다. 
  
  (ex. DB 인스턴스, 서비스 등)


---

## 2 Phase

### Prepare Phase (Voting Phase)

* Coordinator가 모든 Participants에게 *prepare to commit* 메시지를 보낸다.

  Participant는 로컬 트랜잭션을 prepare 상태로 저장(로그 기록 포함)한 뒤

  성공하면 YES(vote-commit)를 응답하고

  실패하면 NO(vote-abort)를 응답한다.


### Commit Phase (Decision Phase)

* Coordinator는 모든 Participant가 YES를 보냈다면

  모든 Participant에게 Commit을 해도 된다는 명령어를 전송한다.

* 만약 하나라도 NO를 보냈다면

  모든 Participant에게 rollback 하라는 명령어를 전송한다.

---

## 단점

### Blocking 

* Coordinator가 장애나 네트워크 이슈로 다운이 되면

  Participant들은 결정을 못 내리고 무기한 대기할 수 있다.

> 장애 상황

* Coordinator가 모든 Participant로부터 YES 응답을 받음

  -> Commit 하기로 결정

  -> Coordinator가 Commit 명령을 보내기 전에 장애로 다운

  -> Participant는 Commit 명령을 아직 못 받음

  -> Participant의 상태가 Prepare 완료이지만 하지만 Commit 여부는 모름

### 성능 병목

* 모든 Participant의 응답을 기다려야 하므로 느려지게 된다.

---

## 단점 보완

* Three-Phase Commit (3PC)

  블로킹 문제를 줄이기 위한 비동기적 변형

* Paxos / Raft

  복잡한 상황에서도 합의를 보장하는 비잔틴 내성 합의 알고리즘을 이용

* **SAGA 패턴**

  롱런 트랜잭션에서 각 스텝을 로컬 트랜잭션으로 처리하고 보상 트랜잭션으로 롤백


---

## Summary

* 2PC 전략은 실무에서 사용하기에 단점이 명확하여 기피된다고 한다.

* 실무에서는 분산 트랜잭션 환경에서 정합성을 지키기 위해 다음과 같은 개념을 사용하니 추가로 학습을 해보자.

1. **SAGA 패턴 (비동기 + 보상 트랜잭션)**

2. **Event-Driven Architecture + Idempotent Consumer**

3. **Outbox Pattern + 메시지 큐 + Eventual Consistency**

