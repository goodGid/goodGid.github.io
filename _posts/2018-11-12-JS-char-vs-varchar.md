---
layout: post
title:  " CHAR와 VARCHAR 비교 및 특징"
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

## CHAR

* CHAR는 고정 사이즈이다.

* 남는 공간은 공백으로 채우게 된다.

* **공백 채움 비교(blank-padded comparison semantics)**를 사용한다.

* 예를 들어 CHAR(10) 인데 'test'라는 4자짜리 문자열을 insert하게 되면 남는 공간은 6개의 공백으로 채우게 된다.

* 따라서 무조건 처음 선언된 10byte가 소요된다.

* 물론 값을 받아 올 때 이 공백은 자동으로 제거된다. <br> 공백까지 읽고 싶다면 *PAD_CHAR_TO_FULL_LENGTH* 모드를 활성화하면 공백까지 다 읽어온다.

* CHAR형의 경우 삽입되는 데이터가 선언된 길이보다 작다면 <br> 남는 공간은 스페이스로 채워지므로 **공간의 낭비**가 발생한다.

* 따라서 반드시 고정길이에 해당하는 데이터만 CHAR로 선언하시는 것이 좋다.












---

## VARCHAR

* VARCHAR는 이름이 의미하듯 가변길이이다.

* 데이터를 삽입하면 데이터값외에 삽입된 문자열의 길이를 저장하는데 <br> 255글자 이하에는 1바이트, 그 이상은 2바이트의 추가 공간을 필요로 한다.

* 즉 실질적인 데이터와 **길이 정보**도 같이 저장된다. 

* 예를 들어 VARCHAR(10)에 'test'라는 4자짜리 문자열을 삽입하면 <br> 4byte + **1byte(길이를 저장하기 위한 메모리)** = 5byte가 소모된다.

* 저정할 수 있는 길이는 0부터 255까지이며 <br> MySQL 5.0.3 이후에는 0부터 65,535까지 지정할 수 있다. 

<br>

* VARCHAR 값은 저장될 때에 공백이 추가되지 않는다. 

* 하지만 **공백에 대한 처리는 버전**에 따라 다르다. 

* MySQL 5.0.3 **이후**부터는 표준 SQL과의 호환성을 위해 뒤따르는 **공백들을 제거하지 않고 보관**하며 **읽어들일 때도 보존**해준다. 

* MySQL 5.0.3 **이전**에는 저장될 때에 뒤따르는 **공백들은 제거**되었고 이는 값을 읽어들일 때에도 **제거된 채로 읽힘**을 의미한다.

* MySQL 5.0.3 이전에 뒤따르는 공백들을 유지하기 위해서는 [BLOB](https://ko.wikipedia.org/wiki/%EB%B0%94%EC%9D%B4%EB%84%88%EB%A6%AC_%EB%9D%BC%EC%A7%80_%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8)나 TEXT 형을 선택해야 했다. 


<br>

* 기존 데이터 길이보다 더 큰 데이터로 **업데이트**할 경우 **데이터 파편화**가 발생한다.

* 기존 보다 큰 데이터를 저장하기 위해서 **새로운 저장 영역에 새로 할당**해야하므로 데이터 파편화가 발생한다.

* 테이블 ROW 중에 CHAR, VARCHAR 타입이 **섞여 있으면 데이터 파편화**는 발생할 수 밖에 없다.

* 파편화를 염두하고 설계한다면 테이블의 데이터 타입 중에 VARCHAR 타입을 사용해선 안된다.

* 그러나 MySQL에서는 다음의 쿼리를 적용하면 파편화를 막을 수 있다. 

> ALTER TABLE tblname ROW_FORMAT = FIXED;

* VARCHAR 타입을 CHAR 타입처럼 동작하도록 강제로 지정하는 것이다. 

* CHAR처럼 동작하기 때문에 데이터 용량은 증가하지만

* VARCHAR로 인한 파편화로 성능 저하는 막을 수 있다.


<br> 

* 특이한 점으로는 4자 이하의 VARCHAR는 CHAR로 자동 변환된다.

* 만약 테이블안에 VARCHAR나 text, blob 같은 가변길이 데이터가 하나라도 있을 경우 <br> 3자 이상의 CHAR컬럼이 자동으로 VARCHAR로 바뀌게 된다.

* TABLE을 만든 후 실제로 무슨 형으로 변환되었는지 DESC table_name으로 확인 할 수 있다.

* 이렇게 하는 이유는 물론 **성능과 속도** 때문이다.


> Q. 그렇다면 모두 VARCHAR를 사용하지 않는 이유는 무엇일까? 

* 무조건 VARCHAR를 사용시 가변이기 때문에 <br> 내부에서 추가적인 Logic이 발생되어 **속도 저하**를 일으킬 수 있다. 




---



## CHAR와 VARCHAR의 비교


### 저장 영역

1. CHAR형은 고정형. 최대 길이는 255.

2. VARCHAR형은 가변형. 최대 길이는 255, <br> MySQL 5.0.3 이후부터는 65,535까지 가능.

3. MySQL 4.1 이후 버전부터는 CHAR(n), VARCHAR(n)에서 n은 바이트가 아니라 글자 수를 의미한다. <br> ex) CHAR(30)은 30 글자까지 보관할 수 있다.





* VARCHAR 유형은 가변 길이이므로 필요한 영역은 실제 데이터 크기뿐이다. 

* 그렇기 때문에 길이가 다양한 컬럼과 정의된 길이와 실제 데이터 길이에 차이가 있는 컬럼에 적합하다.

* 저장 측면에서도 CHAR 유형보다 작은 영역에 저장할 수 있으므로 장점이 있다.

---

### 비교 방법

* CHAR에서는 문자열을 비교할 때 공백을 채워서 비교하는 방법을 사용한다. 

* CHAR(8)이고 'AA'가 저장되어 있다면 'AA' 뒤에 공백 6자리를 붙여 8자리로 비교하는 것이다.

```
따라서  'AA' = 'AA  '은 실제로 'AA      ' = 'AA      '가 되어 같다는 결과가 나온다.
```

* 반면 VARCHAR에서는 공백도 하나의 문자로 취급하므로 끝에 공백이 들어가면 다른 문자로 판단한다.

```
같은 예로 들면 'AA' != 'AA '로 공백이 있어 서로 다른 문자로 판단한다.
```

* 따라서 이름, 주소 등의 길이가 변할 수 있는 값은 VARCHAR를 사용하고

* 사번, 주민등록번호와 같이 길이가 일정한 데이터는 CHAR를 사용하는게 좋다. 

---

### 속도 측면

* Fixed table vs Dynamic table의 속도 차이를 테스트해보자.

```
아래와 같이 2개의 테이블을 만들고 

create table variable (
one int primary key,
two VARCHAR(10),
three VARCHAR(30) );

create table fixed (
one int primary key,
two CHAR(10),
three CHAR(30) );

10만건의 자료를 
insert 한 후 select 속도를 비교한 결과
 
select는 table full scan
"select * from variable"
"select * from fixed"
2개의 쿼리를 사용

CHAR를 사용했을 경우에는 0.54 sec가 걸렸으며
VARCHAR를 사용했을 경우에는 0.64 sec 가 걸렸다.

즉 Fixed type table(고정길이 테이블)을 사용할 경우
0.1 sec가 더 빨랐다.

겨우 0.1초라고 생각할 수도 있으나 동시에 100개의 접속이
들어올 경우를 가정한다면 무시할 수 없는 속도 차이이다.
```

* VARCHAR형의 경우 일일이 그 길이를 계산하여야 다음 ROW를 얻을 수 있는 반면 <br> CHAR형의 경우는 항상 고정된 ROW 사이즈를 가지고 있으므로 얻고자하는 ROW를 찾아내는데 훨씬 빠르다.

---

### Strict SQL Mode

* 엄격한 SQL 모드(strict SQL mode)가 활성화되지 않은 상태에서  <br> 열의 최대 길이를 초과하여 값을 저장하면 값을 잘라서 보관하고 경고를 발생시킨다. 

* 엄격한 SQL 모드를 **활성화**하면 <br> 공백이 아닌 문자열을 자를 때에 경고 대신 **에러를 발생**시키고 값을 추가하지 못하도록 할 수 있다. 

* VARCHAR일 경우 해당 열의 길이를 초과하는 공백들은 **SQL 모드에 관계없이** 잘린 후 **저장되며 경고를 발생**시킨다. 

* CHAR일 경우에는 마찬가지로 동작하지만 **경고가 발생**하지 않는다.

<br> 

* 다음 표는 문자열을 CHAR(4)와 VARCHAR(4) 열에 보관할 때 CHAR와 VARCHAR형의 차이점을 보여준다. 

![](/assets/img/javascript/js_char_vs_varchar_1.png)

* 마지막 열의 값은 **엄격한 SQL 모드를 사용하지 않을 때**만 적용된다. 

* 만약 엄격한 SQL 모드로 MySQL이 동작한다면 길이를 초과하는 값을 저장되지 않고 **에러를 발생**시키게 된다.


---

## 참고

* [CHAR대신 VARCHAR를 쓰는이유??](https://okky.kr/article/217655)

* [데이터베이스 데이터 유형 및 CHAR와 VARCHAR 비교](http://hyeonstorage.tistory.com/290)

* [VARCHAR 와 CHAR의 속도차이를 알고 싶습니다.](http://database.sarang.net/?inc=read&aid=16220&criteria=mysql&subcrit=&id=115&limit=20&keyword=lock&page=16)

* [CHAR과 VARCHAR2 차이점, 언제 어떻게 사용할까?](http://thebetterday.tistory.com/entry/CHAR-VARCHAR2-Different)

* [MySQL 5 : CHAR 와 VARCHAR 형](http://blog.naver.com/PostView.nhn?blogId=ez_&logNo=140117777068)

