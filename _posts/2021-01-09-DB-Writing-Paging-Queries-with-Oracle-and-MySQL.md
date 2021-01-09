---
layout: post
title:  " Paging 쿼리(Query) 작성하기 with Oracle, MySQL "
categories: DB
author: goodGid
---
* content
{:toc}

## Prologue

* 검색하면 많은 Paging Query가 나온다.

  그런데 내 입맛에 맞는 Query가 없었다.

* 예제용 Query가 아닌 

  실무에서 사용할 수 있는 Query를 원했다.

* 그래서 누군가에게 도움이 되고

  내가 나중에 사용할 필요가 있을 시 사용하기 위해서 정리해놓는다.

* Oracle과 MySQL 2가지 버전으로 알아보자.

---

## Requirements

* 1페이지에 20개의 데이터를 보여준다.

* 조회하고 싶은 페이지 클릭 시 

  해당 페이지에서 노출되어야 할 데이터를 노출한다.

---

## Glossary

* count : 1페이지에 노출할 데이터의 양

  ex) count = 30이라면 1페이지에 30개의 데이터를 보여준다.

* startNum : 조회하려는 페이지의 번호

  ex) 3이라면 3페이지를 보려는 것이다.

---

## Paging Query

### Data

<p>
<img src="/assets/img/db/Writing-Paging-Queries-with-Oracle-and-MySQL_1.png" alt="">
<img src="/assets/img/db/Writing-Paging-Queries-with-Oracle-and-MySQL_2.png" alt="">
</p>


* DB에 총 60개의 데이터가 있다.


### Query

#### Oracle

``` sql
SELECT PG2.*
FROM (SELECT PG1.*, ROWNUM R_NUM
      FROM (select m.seq as seq
                   m.name as name
            from member m
            where m.name like '%name%') PG1
      WHERE ROWNUM <= /*count*/20 * /*startNum*/3) PG2
WHERE R_NUM > /*count*/20 * (/*startNum*/3 - 1)
  AND ROWNUM <= /*count*/20;
```



---


#### MySQL

``` sql
SELECT PG2.*
FROM (SELECT PG1.*, @ROWNUM := @ROWNUM + 1 as R_NUM
      FROM (select m.seq  as seq,
                   m.name as name
            from member m
            where m.name like '%name%') PG1
      WHERE (@rownum := 0) = 0 <= /*count*/20 * /*startNum*/3) PG2
WHERE R_NUM > /*count*/20 * (/*startNum*/3 - 1)
limit /*count*/20;
```

* **:=** 문법은 좌측에 있는 변수에 우측에 있는 값을 할당시키는 문법이다.


---


### Query Result

![](/assets/img/db/Writing-Paging-Queries-with-Oracle-and-MySQL_3.png)

* 3페이지를 클릭했다.

  (startNum = 3)

* 그러므로 40 ~ 60번 데이터를 읽어온다.

---

## Summary

* Paging Query를 Oracle과 MySQL 버전으로 작성했다.

  유용하게 사용하자 ! 