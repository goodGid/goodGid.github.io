---
layout: post
title:  " Index와 Primary Key의 차이점 "
categories: Database
tags: Database
author: goodGid
---
* content
{:toc}

## Index와 Primary Key

* 일반적인 DBMS에서 **PK는 자동으로 Index**가 적용된다.

* PK는 **개념적인 값**이다. <br> PK는 여러 Tuple 중 유일한 Tuple임을 보장한다.

* 실제 값이 존재하지만 PK라고 따로 **물리적으로 저장**되지 않기 때문이다.

* 반면 Index는 Tuple들의 유일성을 보장하지 않는다.









* Index는 단지 테이블에서 Tuple을 보다 빨리 찾기위해 사용된다.

* Index를 걸면 Index를 거는 컬럼을 기준으로 새로운 **자료 구조(B-tree등)**를 생성하여 **별도의 디스크 공간**에 저장한다.

* 다음은 Employ를 나타내는 테이블이다.

```
CREATE TABLE Employee
(EmployeeId INT PRIMARY KEY, LastName VARCHAR(50), FirstName VARCHAR(50),
DepartmentId INT, StartDate DATETIME, TermDate DATETIME, TermReason INT)
```

* 여기서 EmployeeId는 PK로 이 테이블에서는 EmployeeId로 각 Tuple을 구별하게 된다.

* 만약 LastName만을 가지고 특정 Tuple을 찾을려고 하면 <br> 해당 LastName을 가진 모든 복수개의 Tuple이 검색 될 것이다.

* 검색 결과값의 수(Count)가 적다면 프로그래머가 눈으로 체크할 수 있지만 <br> 그 수가 많아진다면 일일이 구별하는 것은 불가능하다.

* 이럴 때 PK를 사용하면 단 번에 찾을 수 있게 된다.

<br>

* *Oh* 라는 LastName을 가진 사람을 찾고자 할 때 <br> 만약 Index가 걸려있지 않는 상황이라면 어떻게 될까?

* 일단은 DB에서 **테이블의 모든 Tuple**을 갖고와 일일이 LastName이 *Oh* 인 Tuple을 찾게된다.

* 하지만 Index가 걸려있다면 DB의 모든 Tuple을 갖고올 필요가 없어진다.

* Index는 **별도의 자료 구조**로 따로 저장되어 있다.

* 그렇기 때문에 그 자료 구조에서 조건에 맞는 Tuple만 갖고오면 된다.

* 또한 Index는 **해당 컬럼을 기준으로 정렬**되어 있기 때문에 <br> 검색을 할 때도 모든 Tuple을 검색하지 않아도 된다.

* 일반적으로 B-tree 자료 구조를 사용하는데 <br> 이럴 경우에 트리를 타고 내려오면된다.

* 따라서 빠른 시간안에 검색이 가능해진다.


---

## 참고

* [Index와 Primary Key의 차이점](http://plaboratory.org/archives/809)