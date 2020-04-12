---
layout: post
title:  " SQL : Insert Query에 SEQUENCE.nextVAL을 바로 사용하기 "
categories: DataBase
author: goodGid
---
* content
{:toc}

## Prologue

* DB에 데이터를 Insert하는 경우

* 일반적인 Flow라면 다음과 같다.

---

1. Sequence 값을 조회

2. DAO 같은곳에 Sequence 및 추가적인 데이터 세팅

3. 2번에서 생성한 DAO를 DB에 Insert

---

* 그렇지만 데이터 보정을 위해 DB에 Insert를 해줘야하는 경우라면

* 일반적인 Flow로 해결 하기 보다는 다이렉트로 DB에 Row를 Insert 해줘야한다.

* 이럴 경우에 DB row에 Sequence 값을 어떻게 다이렉트로 세팅해 줄 수 있는지 알아보자.
 

## 일반적인 Flow

``` java
public interface DatabaseUtilMapper {

	final static String GET_SYSDATE = "SELECT sysdate FROM DUAL";
	final static String GET_SEQUENCE = "SELECT ${sequenceName}.NEXTVAL FROM DUAL";
	final static String GET_SEQUENCE_YMD = 
	"SELECT to_number(to_char(sysdate, 'yyyymmdd')||${sequenceName}.NEXTVAL) FROM DUAL";

	@Select(GET_SYSDATE)
	Date getSysdate();

	@Select(GET_SEQUENCE)
	Long getSequence(@Param("sequenceName") String sequenceName);
	
	@Select(GET_SEQUENCE_YMD)
	Long getSequenceYmd(@Param("sequenceName") String sequenceName);
}
```

* 일반적으로 

* Sequence 값을 세팅하여

* DB에 Insert를 해주는 경우엔

* Sequence를 채번하여 받아온 후 

* 그 값을 사용하여 Sequence 값을 세팅한다.

* 예를 들면 다음과 같다.


``` java
Long sequence = databaseUtilMapper.getSequence("원하는 시퀀스 이름");
userModel.setSequence(sequence)
// To do something
```

* 물론 이미 테이블에 

* Sequence가 생성되어있다는 전제하에 이뤄진다.


## Query에 SEQUENCE.nextVAL 사용

* INSERT Query 작성 시 

* 다이렉트로 Sequence 값을 세팅해줘야하는 경우라면 

* 다음과 같이 Query를 작성하면 된다.

``` java
INSERT INTO Table_Name(row_seq, name)
VALUES( SQ_Table_Name.nextVAL, 'goodgid' );
```

* 이런식으로 쿼리를 작성하면

* Sequence를 채번하고

* 그 값을 다시 세팅해주는 과정을 생략할 수 있다.