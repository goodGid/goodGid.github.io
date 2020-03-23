---
layout: post
title:  " SQL : Insert Query에 SEQUENCE.nextVAL을 바로 사용하기 "
categories: DataBase
author: goodGid
---
* content
{:toc}

## AS-IS

``` java
public interface DatabaseUtilMapper {

	final static String GET_SYSDATE = "SELECT sysdate FROM DUAL";
	final static String GET_SEQUENCE = "SELECT ${sequenceName}.NEXTVAL FROM DUAL";
	final static String GET_SEQUENCE_YMD = "SELECT to_number(to_char(sysdate, 'yyyymmdd')||${sequenceName}.NEXTVAL) FROM DUAL";

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

* 그 값을 사용하여

* Sequence 값을 세팅한다.

* 예를 들면 다음과 같다.


``` java
Long sequence = databaseUtilMapper.getSequence("원하는 시퀀스 이름");
userModel.setSequence(sequence)
...
```

* 물론 이미 테이블에 

* Sequence가 생성되어있다는 전제하에 이뤄진다.


## TO-BE

* 글쓴이는

* Sequence를 채번하고 저장하고 다시 세팅하는 과정을 생략하고

* INSERT Query를 작성할 때

* 바로 Sequence값을 넣어줘야하는 상황이 필요했다.

* 그래서 찾아본 결과

* 다음과 같이 하면 되었다.

``` sql
INSERT INTO 테이블명(row_seq)
VALUES( 
SQ_테이블명.nextVAL
);
```

* 이런식으로 쿼리를 작성하면

* Sequence를 채번하고

* 그 값을 다시 세팅해주는 과정을 생략할 수 있다.