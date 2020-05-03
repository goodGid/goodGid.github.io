---
layout: post
title:  " Outer Join이란? "
categories: DB
author: goodGid
---
* content
{:toc}

## Join

* Join은 2개의 테이블에 대해 

  연관된 튜플들을 결합하여 새로운 릴레이션을 반환한다.

* Join은 크게 Inner & Outer Join 으로 구분된다.

  해당 글에서는 Inner Join에 대해서 알아본다.

  Innerr Join은 [Inner Join이란?]({{site.url}}/DB-Inner-Join) 글을 참고하자.

--- 

## Outer Join

* Join 조건에 만족하지 않는 튜플도 결과로 출력하기 위한 방법이다.

* **Left Outer Join**, **Right Outer Join**, **Full Outer Join**이 있다.

---

### Left Outer Join

* Inner Join의 결과를 구한 후 

  **우측** 릴레이션의 어떤 튜플과도 맞지 않는 
  
  **좌측** 릴레이션에 있는 튜플들에 **NULL 값**을 붙여 Inner Join 결과에 추가한다.

```
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1 Left Outer Join 테이블명2
ON 테이블명1.속성명 = 테이블명2.속성명;

SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1, 테이블명2
ON 테이블명1.속성명 = 테이블명2.속성명(+);
```


---

### Right Outer Join

* Inner Join의 결과를 구한 후 

  **좌측** 릴레이션의 어떤 튜플과도 맞지 않는 
  
  **우측** 릴레이션에 있는 튜플들에 **NULL 값**을 붙여 Inner Join 결과에 추가한다.

```
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1 Right Outer Join 테이블명2
ON 테이블명1.속성명 = 테이블명2.속성명;

SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1, 테이블명2
ON 테이블명1.속성명(+) = 테이블명2.속성명;
```  

---

### Left & Right Outer Join

* Inner Join은 두 릴레이션에서 **관련 있는 튜플만** 표시된다.

* Left Outer Join은 **좌측 릴레이션**이 **기준**이 되어 

  좌측 릴레이션에 있는 튜플은 **모두 표시**되고 
  
  **우측 릴레이션**에서는 **관련 있는 튜플**만 표시된다.

* Right Outer Join은 **우측 릴레이션**이 **기준**이 되어 

  우측 릴레이션에 있는 튜플은 **모두 표시**되고 
  
  **좌측 릴레이션**에서는 **관련 있는 튜플**만 표시된다.

* Outer Join에서 **'+'**를 사용하면 

  Inner Join과 동일한 형식으로 사용 가능하다. 
  
  **Left일 때**는 **조건문의 우측**에 **Right일 때**는 **조건문의 좌측**에 '+'를 사용한다.

---

### Full Outer Join

* **Left Outer Join**과 **Right Outer Join**을 합쳐 놓은 개념이다.

```
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1 Full Outer Join 테이블명2
ON 테이블명1.속성명 = 테이블명2.속성명;
```

---


### Example

![](/assets/img/db/Join_1.png)

![](/assets/img/db/Join_2.png)


> Q. <학생> 테이블과 <학과> 테이블에서 학과 코드값이 같은 튜플을 Join하여 학번, 이름, 학과코드, 학과명을 출력하는 SQL문을 작성하시오. 이 때 학과 코드가 입력되지 않은 학생도 출력하시오.


```
Select 학번, 이름, 학생.학과코드, 학과명
From 학생 Left Outer Join 학과
On 학생.학과코드 = 학과.학과코드;

Select 학번, 이름, 학생.학과코드, 학과명
From 학생, 학과
Where 학생.학과코드 = 학과.학과코드(+);
```

![](/assets/img/db/Join_6.png)

---

> Q. <학생> 테이블과 <학과> 테이블에서 학과 코드값이 같은 튜플을 Join하여 학번, 이름, 학과코드, 학과명을 출력하는 SQL문을 작성하시오. 이 때 학과코드가 입력 안 된 학생이나 학과명이 없는 학과 코드 모두 출력하시오.

```
Select 학번, 이름, 학생.학과코드, 학과명
From 학생 Full Outer Join 학과
On 학생.학과코드 = 학과.학과코드;
```

![](/assets/img/db/Join_7.png)