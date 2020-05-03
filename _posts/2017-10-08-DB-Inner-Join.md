---
layout: post
title:  " Inner Join이란? "
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

  Outer Join은 [Outer Join이란?]({{site.url}}/DB-Outer-Join) 글을 참고하자.

---

## Inner Join

* **Equi Join**과 **Non-Equi Join**으로 구분된다.





---

### Equi Join

* **연결 고리**가 되는 **공통 속성**을 **Join 속성**이라 한다.

* Join 대상 테이블에서 **공통 속성**을 기준으로 

  '=' 비교에 의해 같은 값을 가지는 행을 연결하여 결과를 생성한다.

* Join 조건이 '='일 때 **동일 속성**이 2번 나타나게 되는데

  이 중 **중복된 속성**을 제거하여 1번만 표기하는 방법을 **Natural Join**이라 한다.



---

> Where 절을 이용한 Equi Join의 표기 형식

```
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1, 테이블명2
WHERE 테이블명1.속성명 = 테이블명2.속성명;
```

---

> Natural Join을 이용한 Equi Join의 표기 형식

```
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1 Natural Join 테이블명2;
```

---

> Join ~ Using 절을 이용한 Equi Join의 표기 형식

```
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1 Join 테이블명2 USING(속성명);
```


---

#### Example

![](/assets/img/db/Join_1.png)

![](/assets/img/db/Join_2.png)

![](/assets/img/db/Join_3.png)



> Q. <학생> 테이블과 <학과> 테이블에서 학과코드값이 같은 튜플을 Join하여 학번, 이름, 학과코드, 학과명을 출력하는 SQL문을 작성하시오.


```
Select 학번, 이름, 학생.학과코드, 학과명
From 학생, 학과
Where 학생.학과코드 = 학과.학과코드;

Select 학번, 이름, 학생.학과코드, 학과명
From 학생 Natural Join 학과;

Select 학번, 이름, 학생.학과코드, 학과명
From 학생 Join 학과 Using(학과코드);
```

![](/assets/img/db/Join_4.png)



* 테이블을 조인하여 사용할 때 **한 테이블에만** 있는 속성은 테이블명을 **생략**할 수 있지만 **두 테이블**에 모두 속해 있는 속성은 **반드시** 속성명을 테이블명과 함께 표시해야 한다.

* **Natural Join**은 **조인할 속성**을 **지정하지 않기** 때문에 조인하려는 두 테이블에는 **같은 이름**, **같은 속성의 도메인**이 반드시 **존재**해야 한다. <학생> 테이블과 <학과>테이블에는 같은 이름의 속성과 범위가 같은 도메인을 갖는 학과코드가 있기 때문에 Natural Join이 가능


---

### Non-Equi 조인

* Non-Equi은 Join 조건에 '=' 조건이 아닌 

  **나머지 비교 연산자**를 사용하는 Join 방법이다.

```
SELECT [테이블명1.]속성명, [테이블명2.]속성명
FROM 테이블명1, 테이블명2
WHERE (Non-Equi Join 조건);
```

---


> Q. <학생> 테이블과 <성적등급> 테이블을 Join하여 각 학생의 학번, 이름, 성적, 등급을 출력하는 SQL문을 작성하시오.

```
SELECT 학번, 이름, 성적, 등급
FROM 학생, 성적등급
WHERE 학생.성적 BETWEEN 성적등급.최저 AND 성적등급.최고;
```


![](/assets/img/db/Join_5.png)