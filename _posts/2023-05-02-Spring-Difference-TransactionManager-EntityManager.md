---
layout: post
title:  " Spring에서 transactionManager와 entityManager 차이에 대해 아시나요? "
categories: Spring
author: goodGid
---
* content
{:toc}

## Question

* Spring에서 transactionManager와 entityManager 차이에 대해 아시나요?

* (모른다면) 우리 같이 차이에 대해 알아봅시다 !

---



## Prologue

* 개발 환경이 **Spring Framework + JPA**를 사용한다는 가정하고 글을 작성하였습니다.

---

## transactionManager 개념

* Spring에서 Transaction을 관리하기 위한 인터페이스이다.

  = Transaction 관리를 위한 설정을 제공한다.

---

### 왜 필요한 걸까?

* transactionManager를 사용하면 

  Transaction 시작 및 종료 시

  작업된 결과물에 대해 커밋 및 롤백에 대한 결정을 하게 된다.

* 그러므로 transactionManager를 사용하면

  DB에서의 데이터 변경 작업을 안전하게 수행할 수 있게 된다.

---

### 그러면 entityManager는 왜 필요한 걸까?

* entityManager 개념에 대해 알아보면 필요성을 알 수 있다.

---

### entityManager 개념

* entityManager는 JPA(Java Persistence API)에서 사용하는 인터페이스이다.

  = DB 통신을 위해 사용된다.

* entityManager는 DB와의 상호작용을 처리한다.

  ex) DML(Data Manipulation Language, select, insert, update, delete)

* entityManager는 Entity Manager Factory에서 생성되며

  어플리케이션 Life Cycle 중 1번만 생성된다.

---

### 그래서 뭐가 다른 걸까?

* JPA에서는 javax.persistence.EntityManager를 사용하여 DB와의 통신을 한다. 

  하지만 이 **EntityManager에서는 Transaction을 관리하지 않는다.**

  그래서 Spring은 Transaction 관리를 위한 transactionManager를 제공한다.

---

### EntityManager에서는 Transaction을 관리하지 않는다 (?)

* javax.persistence.EntityManager 인터페이스는 Transaction을 직접 관리하지 않는다. 

* 그 이유는 EntityManager가 JPA 스펙의 일부이며

  JPA는 Transaction을 관리하는 것이 아니라 
  
  **객체-관계 매핑(ORM)을 수행하는 데 집중**하기 때문이다.

* 따라서 EntityManager는 Transaction을 직접 시작하거나 커밋하거나 롤백하지 않는다. 

  대신 EntityManager는 Transaction 관리를 위한 도구로서 사용된다. 
  
  그러므로 일반적으로 EntityManager는 Transaction 범위 내에서 사용된다.

* 이는 Spring Framework와 함께 사용될 때 

  EntityManager에서 DB 작업 수행 시
  
  Spring의 transactionManager를 사용하여 트랜잭션 범위를 관리하므로
  
  해당 Transaction 범위 내에서 작업이 수행되도록 보장할 수 있다.

---

## Summary

* transactionManager와 entityManager는 각각 다른 역할을 수행한다.

* transactionManager는 Transaction 관리를 위한 인터페이스이고 

  entityManager는 JPA에서 DB와 통신을 하기 위한 인터페이스이다.
  
* 하지만 이 둘은 서로 협력하여 DB 작업을 안전하게 하는데 도와준다.