---
layout: post
title:  " MyBatis 공식 문서(Docs) 읽어보기 : settings "
categories: MyBatis
author: goodGid
---
* content
{:toc}

## Prologue

* MyBatis에서 제공하는 공식 문서(Docs)를 참고하여

  [Configuration XML - settings](https://mybatis.org/mybatis-3/configuration.html#settings)개념에 대해 학습해보자.




---

## settings

```
These are extremely important tweaks that modify the way that MyBatis behaves at runtime. 
The following table describes the settings, their meanings and their default values.
```

* Runtime 시점에 MyBatis가 동작하는 방식을 컨트롤 할 수 있다.

### cacheEnabled

```
Globally enables or disables any caches configured in any mapper under this configuration.
```

* 전역적으로 캐시 활성화/비활성화 설정이 가능하다.

* *Values* : true / false

  *Default* : true

---

### lazyLoadingEnabled

```
Globally enables or disables lazy loading. 
When enabled, all relations will be lazily loaded. 
This value can be superseded for a specific relation by using the fetchType attribute on it.	
```

* 전역적으로 lazy loading 설정이 가능하다.

* 만약 enable 상태이면

  모든 relations들은 lazy loading이 된다.

* 이 값은 fetchType 속성을 사용하여 

  특정 관계에 대해서 따로 설정할 수 있다.

* *Values* : true / false

  *Default* : false


---

### aggressiveLazyLoading

```
When enabled, any method call will load all the lazy properties of the object. 
Otherwise, each property is loaded on demand (see also lazyLoadTriggerMethods).
```

* 해당 값을 활성화하면

  메서드 호출 시 객체의 모든 lazy 속성을 load 한다.

* 그렇지 않으면 각 프로퍼티가 필요할 때 load 한다.

  추가적으로 lazyLoadTriggerMethods를 보자.

* *Values* : true / false

  *Default* : false (true in ≤3.4.1)


---

### lazyLoadTriggerMethods

```
Specifies which Object's methods trigger a lazy load
```

* lazy load를 실행시킬 Object의 메서드를 지정한다.

* *Values* : A method name list separated by commas	

  *Default* : equals,clone,hashCode,toString


---

### multipleResultSetsEnabled

```
Allows or disallows multiple ResultSets to be returned from a single statement 
(compatible driver required).	
```

* 1개의 Query를 실행시킨 후 

  Multi로 ResultSets을 return 할 수 있게 설정할 수 있다.

  그런데 드라이버가 지원해야 한다.

* *Valid* : true / false

  *Default* : true

---

### useColumnLabel

```
Uses the column label instead of the column name. 
Different drivers behave differently in this respect. 
Refer to the driver documentation, or test out both modes to determine how your driver behaves.	
```

* column name 대신 column label을 사용한다.

* 드라이버마다 조금 다르게 작동한다. 

* 문서와 간단한 테스트를 통해 실제 기대하는 것처럼 작동하는지 확인해야 한다.


* *Valid* : true / false

  *Default* : true



---


### useGeneratedKeys

```
Allows JDBC support for generated keys. 
A compatible driver is required. 
This setting forces generated keys to be used if set to true, 
as some drivers deny compatibility but still work (e.g. Derby).	
```

* JDBC가 keys 생성을 가능하게 한다. 

* *Valid* : true / false

  *Default* : false


---

### autoMappingBehavior

```
Specifies if and how MyBatis should automatically map columns to fields/properties. 
- NONE disables auto-mapping. 
- PARTIAL will only auto-map results with no nested result mappings defined inside. 
- FULL will auto-map result mappings of any complexity (containing nested or otherwise).
```

* MyBatis가 column <-> propertie 매핑 시

  어떻게 매핑시킬지 설정한다.

* *Values* : NONE, PARTIAL, FULL

  *Default* : PARTIAL

---

### autoMappingUnknownColumnBehavior

```
Specify the behavior when detects an unknown column (or unknown property type) of automatic mapping target.
- NONE: Do nothing
- WARNING: Output warning log 
(The log level of 'org.apache.ibatis.session.AutoMappingUnknownColumnBehavior' must be set to WARN)
- FAILING: Fail mapping (Throw SqlSessionException)
```

* unknown column이 발견되었을 경우 어떻게 처리할지 설정한다.

1. NONE : 아무것도 하지 않는다.

2. WARNING : warn log를 출력한다.

3. FAILING : SqlSessionException을 발생시킨다. 


* *Valid* : NONE, WARNING, FAILING

  *Default* : NONE


---

### defaultExecutorType

```
Configures the default executor. 
SIMPLE executor does nothing special. 
REUSE executor reuses prepared statements. 
BATCH executor reuses statements and batches updates.	
```

* default executor를 설정한다.

* *Valid* : SIMPLE / REUSE / BATCH

  *Default* : SIMPLE

---

### defaultStatementTimeout

```
Sets the number of seconds the driver will wait for a response from the database.	
```

* DB 요청 후 Response를 받기까지 몇 초를 기다릴지 설정한다.

* *Valid* : Any positive integer

  *Default* : Not Set (null)


---

### defaultFetchSize

```
Sets the driver a hint as to control fetching size for return results. 
This parameter value can be override by a query setting.	
```

* DB 요청 후 결과를 가져올 때 

  가져올 데이터의 크기를 제어한다.

```
-- DB의 500개의 row가 존재
select * from table_name
fetchSize = 250일 경우
250개의 데이터만 Return 한다.
```

* Query Setting 값으로 override 될 수 있다.

* *Valid* : Any positive integer

  *Default* : Not Set (null)


---


### safeRowBoundsEnabled

```
Allows using RowBounds on nested statements. 
If allow, set the false.
```	

* 중첩 구문 안에서 RowBounds 사용을 허용한다.

  사용을 원한다면 false로 설정을 해야 한다.

* *Values* : true / false

  *Default* : false


---

### mapUnderscoreToCamelCase

```
Enables automatic mapping from classic database column names A_COLUMN to camel case classic Java property names aColumn.	
```

* DB column name을 Camel Case로 자동으로 매핑시킨다.

* *Values* : true / false

  *Default* : false

---

### localCacheScope

```
MyBatis uses local cache to prevent circular references and speed up repeated nested queries. 
By default (SESSION) all queries executed during a session are cached. 
If localCacheScope=STATEMENT local session will be used just for statement execution, 
no data will be shared between two different calls to the same SqlSession.	
```

* MyBytis는 다음 이유로 local cache를 사용한다.

1. 순환 참조(circular references) 방지

2. 반복적인 중첩 쿼리들의 속도 향상

---

* Default는 localCacheScope = SESSION이다.

  하나의 세션이 유지되는 동안 실행된 모든 쿼리들은 cache 된다.

* 만약 localCacheScope = STATEMENT 일 경우엔

  local session은 statement execution에서만 사용된다.

  즉 같은 SqlSession 이더라도 
  
  서로 다른 call 사이에서는 데이터를 공유하지 않는다.

* *Values* : SESSION / STATEMENT

  *Default* : SESSION

---


### jdbcTypeForNull

```
Specifies the JDBC type for null values when no specific JDBC type was provided for the parameter. 
Some drivers require specifying the column JDBC type but others work with generic values like NULL, VARCHAR or OTHER.	
```

* parameter의 JDBC 타입이 정확하게 명시되지 않았을 경우에 

  해당 parameter의 JDBC 타입을 null value로 설정한다.

* 일부 드라이버는 JDBC 타입 명시를 요구하지만 

  다른 드라이버는 NULL, VARCHAR 또는 OTHER와 같은 일반 값으로 동작한다.

* *Values* : JdbcType enumeration. Most common are: NULL, VARCHAR and OTHER	

  *Default* : OTHER


---

## Summary

* MyBatis의 settings 속성에 대해 알아봤다.

  속성이 너무나도 많아서 

  Docs에서 대표 예시로 명시한 것들에 대해서만 학습했다.

* 영어로 작성되어있기 때문에 주관적으로 해석하고 의역을 하였다.

  혹시 글을 읽다 이상한 부분이 있다면 직접 문서를 읽어보는 걸 추천한다.

  ( 추가로 피드백까지 주면 매우 감사하겠습니다. )

* 만약 영어로 된 문서를 읽기 힘들다면 한글로 번역된 [사이트](https://mybatis.org/mybatis-3/ko/configuration.html#settings)를 참고하자.


---

## Reference

* [MyBatis Docs : Configuration XML](https://mybatis.org/mybatis-3/configuration.html)