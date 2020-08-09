---
layout: post
title:  " Oracle FlashBack 이용한 데이터 복구 "
categories: DB
author: goodGid
---
* content
{:toc}

## Prologue

* Udpate문을 작성하는데

* where 절없이 Commit을 해버렸다.

* 그래서 모든 Data의 Row 값이 변경되어버리는 상황이 발생했다.

* 그 문제를 해결하면서 알게된 개념을 정리하고자한다.

## Oracle FlashBack

* Oracle FlashBack은

* DB 관리중에 실수로 

* Data를 삭제 or 변경 후

* Commit을 하였을 경우

* DB에 구조적인 변화 없이 

* Commit 이전 상태의 정보를 

* 조회할 수 있도록 해주는 기능이다.









### Requirements

> 권한 필요

* DBMS_FLASHBACK 패키지에 대한 

* EXECUTE을 수행할 수 있는 권한이 필요하다.


> UNDO_MANAGEMENT 값 설정

* UNDO_MANAGEMENT 값을 AUTO로 설정한다.

* ex) UNDO_MANAGEMENT = AUTO



> UNDO_RETENTION 파라미터 값 설정

* 설정한 UNDO_RETENTION 기간내에만 조회가 가능하다.

* UNDO_RETENTION의 Default 시간은 10800(3시간)이다.

* ex) Alter SYSTEM Set UNDO_RETENTION = 1800


## Solution

> Data 검색

``` java
// 10초전 데이터 조회
SELECT * FROM TEST_TABLE AS OF TIMESTAMP ( SYSTIMESTAMP - INTERVAL '10' SECOND);

// 30분전 데이터 조회
SELECT * FROM TEST_TABLE AS OF TIMESTAMP ( SYSTIMESTAMP - INTERVAL '30' MINUTE);
 
// 3시간전 데이터 조회
SELECT * FROM TEST_TABLE AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '3' HOUR);
 
// 1일전 데이터 조회
SELECT * FROM TEST_TABLE AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '1' DAY);

// 특정 시간
SELECT * 
FROM TEST_TABLE
AS OF TIMESTAMP TO_TIMESTAMP('2020-01-01 01:01:01', 'YYYY-MM-DD HH24:MI:SS') 
WHERE TEST_COLUMN = 1
```

> Data 복구

``` java
-- Insert
Insert Into TEST_TABLE (
    Select * 
    From TEST_TABLE AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '1' DAY)
    )
Where TEST_COLUMN = 1

-- Update
Update TEST_TABLE
Set TEST_COLUN = (
    Select * 
    From TEST_TABLE AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '1' DAY)
    )
Where TEST_COLUMN = 1
```


## Summary

* DB를 조작하는 과정에서

* 실수로 Data를 삭제 or 변경하였을 경우

* 당황하지 말고 

* 차분하게 FlashBack 기능을 사용하도록 하자.


---

## Reference

* [Oracle FlashBack 이용한 데이터 복구](https://jp1020.tistory.com/entry/Oracle-FlashBack-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B3%B5%EA%B5%AC)

* [[Oracle]TIMESTAMP 활용](https://kongzz.tistory.com/17)

* [[oracle] TIMESTAMP 데이터 복원, 복구](https://dlevelb.tistory.com/704)

* [Oracle Database TIP](http://www.gurubee.net/lecture/1876)