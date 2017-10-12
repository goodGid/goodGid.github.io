---
layout: post
title:  "DataBase :: Transaction"
date:   2017-10-12
excerpt: "Transaction 개념"
cate : "post"
tag:
- DB
---

## Concept

> Transaction은 데이터베이스에서 하나의 논리적 기능을 수행하기 위한 일련의 연산 집합으로서 작업의 단위이다.

* Commit
    * 트랜잭션 처리가 정상적으로 종료되어 트랜잭션이 수행한 변경 내용을 데이터베이스에 반영하는 연산

* RollBack
    * 트랜잭션 처리가 비정상으로 종료되어 데이터베이스의 일관성이 깨졌을 때 트랜잭션이 행한 모든 변경 작업을 취소하고 이전 상태로 되돌리는 연산


---

## 트랜잭션의 특성

1. 원자성 (Atomicity)

2. 일관성 (Consistency)

3. 독립성 (Isolation)

4. 영속성 (Durability)