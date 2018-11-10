---
layout: post
title:  "Integrity"
categories: Database
tags: Database
author: goodGid
---

* content
{:toc}


## Concept

> Integrity란 데이터베이스에 저장된 값과 실제 값이 일치하는 정확성을 의미

1. NULL 무결성
* 릴레이션의 `특정 속성 값`이 NULL이 될 수 없도록 하는 규정 <br><br>

2. 고유(Unique) 무결성
* 릴레이션의 `특정 속성`에 대해 각 튜플이 갖는 속성 값들이 서로 달라야 한다는 규정 <br><br>

3. 도메인(Domain) 무결성
* `특정 속성`의 값이 그 속성이 정의된 도메인에 속한 값이어야 한다는 규정 <br><br>

4. 키(Key) 무결성
* 하나의 릴레이션에는 적어도 `하나의 키`가 존재해야 한다는 규정 <br><br>

5. 관계(Relationship) 무결성
* 릴레이션에 어느 한 튜플의 삽입 가능 여부 or 한 릴레이션과 다른 릴레이션의 튜플들 사이의 관계에 대한 <br> `적절성 여부`를 지정한 규정 <br><br>

6. 참조(Referential) 무결성
* 외래키 값은 `NULL` or 참조 릴레이션의 `기본키 값`과 동일해야 한다는 규정 <br><br>

7. 개체(Entity) 무결성
* 기본 릴레이션의 `기본키`를 구성하는 어떤 속성도 NULL 일 수 없다는 규정 <br><br>



