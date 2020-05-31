---
layout: post
title:  " MyBatis 공식 문서(Docs) 읽어보기 : typeHandlers "
categories: MyBatis
author: goodGid
---
* content
{:toc}

## Prologue

* MyBatis에서 제공하는 공식 문서(Docs)를 참고하여

  [Configuration XML - typeHandlers](https://mybatis.org/mybatis-3/configuration.html#typeHandlers)개념에 대해 학습해보자.




---

## typeHandlers


```
Whenever MyBatis sets a parameter on a PreparedStatement or retrieves a value from a ResultSet, a TypeHandler is used to retrieve the value in a means appropriate to the Java type. 
```

* MyBatis가 값을 set 하거나 retrieve 할 때

  우리는 Java 타입을 사용하기 때문에 알맞게 변경해줄 필요가 있다.

  이 때 알맞게 변경해주는 과정에서

  typeHandler를 사용하여 가장 적합한 Java 타입을 찾는다.


```
You can override the type handlers or create your own to deal with unsupported or non-standard types. 
To do so, implement the interface org.apache.ibatis.type.TypeHandler or extend the convenience class org.apache.ibatis.type.BaseTypeHandler and optionally map it to a JDBC type. For example:
```

* 지원하지 않거나 비표준인 타입에 대해서는 

  typeHandler를 만들 수 있다.
  
  또한 기존의 typeHandler를 override 할 수도 있다.

* override 하는 방법은 2가지가 있다.

1. **Interface**(*org.apache.ibatis.type.TypeHandler*)를 구현한다.

2. *org.apache.ibatis.type.BaseTypeHandler*를 extend 한다.

* override를 하였으면

  optionally하게 그것을 JDBC 타입으로 매핑해준다.

> Example

``` java
@MappedJdbcTypes(JdbcType.VARCHAR)
public class ExampleTypeHandler extends BaseTypeHandler<String> {

  @Override
  public void setNonNullParameter(PreparedStatement ps, int i,
                                  Object parameter, 
                                  JdbcType jdbcType) throws SQLException {
    // parameter를 Encrypt 한다.
    ps.setString(i, (String)encrypt(parameter));
  }

  @Override
  public String getNullableResult(ResultSet rs, 
                                  String columnIndex) throws SQLException {

    // ResultSet으로 부터 가져온 Data를 Decrypt 한다.
    return decrypt(rs.getString(columnName));
  }

  @Override
  public String getNullableResult(ResultSet rs, 
                                  int columnIndex) throws SQLException {
    // ResultSet으로 부터 가져온 Data를 Decrypt 한다.
    return decrypt(rs.getString(columnName));
  }

  @Override
  public String getNullableResult(CallableStatement cs, 
                                  int columnIndex) throws SQLException {
    // ResultSet으로 부터 가져온 Data를 Decrypt 한다.
    return decrypt(rs.getString(columnName));
  }
  
  private String encrypt(String toEncrypt) { ... }

  private String decrypt(String toDecrypt) { ... }
}
```

* 위와 같이 typeHandler를 생성 후

  일괄적으로 적용하고 싶다면 다음과 같이 하면 된다.

``` xml
<!-- mybatis-config.xml -->
<typeHandlers>
  <typeHandler handler="xxx.yyy.zzz.ExampleTypeHandler"/>
</typeHandlers>
```

---

* 일괄적으로 적용할 게 아니라면

  Query Mapper 작성시 아래와 같이 사용하면 암/복호화 수행이 가능하다.

<br>

> Insert / Update 암호화

* Insert 

``` xml
insert into member (number)
values (
  #{number,jdbcType=VARCHAR,
    typeHandler=xxx.yyy.zzz.ExampleTypeHandler}
  )
```

* Update

``` 
update member
set number = #{number,
              jdbcType=VARCHAR,
              typeHandler=xxx.yyy.zzz.ExampleTypeHandler}
where member_no = #{memberNo,jdbcType=DECIMAL}
```

<br>

> Select 복호화

``` xml
<result column="col_name" 
        jdbcType="VARCHAR" 
        property="pojo_member_name" 
        typeHandler="xxx.yyy.zzz.ExampleTypeHandler" />
```

---

```
Using such a TypeHandler would override the existing type handler for Java String properties and VARCHAR parameters and results. 
Note that MyBatis does not introspect upon the database metadata to determine the type, 
so you must specify that it’s a VARCHAR field in the parameter and result mappings to hook in the correct type handler. 
This is due to the fact that MyBatis is unaware of the data type until the statement is executed.
```




---

## Summary

* MyBatis의 typeHandlers 속성에 대해 알아봤다.

* 영어로 작성되어있기 때문에 주관적으로 해석하고 의역을 하였다.

  혹시 글을 읽다 이상한 부분이 있다면 직접 문서를 읽어보는 걸 추천한다.

  ( 추가로 피드백까지 주면 매우 감사하겠습니다. )

* 만약 영어로 된 문서를 읽기 힘들다면 한글로 번역된 [사이트](https://mybatis.org/mybatis-3/ko/configuration.html#typeHandlers)를 참고하자.


---

## Reference

* [MyBatis Docs : Configuration XML](https://mybatis.org/mybatis-3/configuration.html)