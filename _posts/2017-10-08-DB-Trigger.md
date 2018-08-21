---
layout: post
title:  "Trigger"
categories: Database
tags: Database
author: goodGid
---
* content
{:toc}


## Concept

> Trigger는 이벤트가 발생 시 자동적으로 수행되는 사용자 정의 프로시저이다.

 ```
Create Trigger 트리거명 [After | Before] [Insert | Update | Delete ] on 테이블명
Referencing [New | Old ] Table as 테이블명
For Each Row
When 조건식
트리거 Body
```    

* After : 테이블이 변경된 後 트리거 실행
* Before : 테이블이 변경되기 前 트리거 실행

* New : 새로 추가되거나 변경에 참여할 튜플들의 집합에 트리거가 적용
* Old : 변경된 튜플들의 집합에 트리거가 적용

* Set : 변수에 값을 치환할 때는 예약어 Set을 사용

* Begin으로 시작해서 End로 끝나는데, 적어도 1개 이상의 SQL문이 있어야 함


 ---

|          | Old    | New |
|:-------:|:-------:|:-------:|
| Insert   | Null   | 입력 값   |
|----
| Update   | 변경 前 값   | 변경 後 값   |
|----
| Delete   | 삭제 前 값   | Null   |
|=====

---
## Example

 Q. <학생> 테이블에 새로운 레코드가 삽인될 때, 삽입되는 레코드에 학년 정보가 누락됐으면 학년 필드에 
 "신입생"을 치환하는 트리거를 '학년정보_tri'라는 이름으로 정의하시오
{: .notice}


```    
Create Trigger 학년정보_tri Before Insert On 학생
Referencing New Table AS new_table
For Each Row
When new_table.학년 = ''
Begin
    Set new_table.학년 = '신입생';
End;
```    

