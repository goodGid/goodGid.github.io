---
layout: post
title:  " [MyBatis] Custom TypeHandler를 사용하여 Enum Type 다루기 "
categories: MyBatis
author: goodGid
---
* content
{:toc}

## Prologue

* [이전 글]({{site.url}}/MyBatis-Docs-Handling-Enums)에서 Mybatis에서 Enum Class를 다루기 위해 

  기본적으로 제공하는 **EnumTypeHandler**와 **EnumOrdinalTypeHandler**에 대해 알아봤다.

  이 글에서는 Custom TypeHandler를 만들어 Enum Class를 다루는 법에 대해 알아보자.





## Code

### Enum

#### CodeEnum

``` java
public interface CodeEnum {
    String getCode();
}
```

---

#### Grade

``` java
public enum Grade implements CodeEnum {
    GOLD("1"),
    SILVER("2");

    private String priority;

    Grade(String priority) {
        this.priority = priority;
    }

    public String getPriority() {
        return priority;
    }

    @MappedTypes(Grade.class) // [1]
    public static class TypeHandler extends CodeEnumTypeHandler<Grade> { // [2]
        public TypeHandler() {
            super(Grade.class);
        }
    }

    @Override
    public String getCode() {
        return priority;
    }
}
```

* [1] : @MappedTypes를 사용하여 해당 method가 다룰 Class를 명시해준다.
  
  즉 Mapper에서 typeHandler 값으로 선언한 handler가 
  
  다루게 될 Class가 Grade라는 걸 알려준다고 이해하면 된다.

* [2] : CodeEnumTypeHandler 우리가 생성한 TypeHandler이다.

  이 글의 가장 핵심적인 개념이다.

  자세한 내용은 아래에서 알아본다.

---

### Dao

``` java
@Getter
@Setter
@NoArgsConstructor
public class GradeDao {
    private Long grade_seq;
    private Grade level;
    private Grade grade;
    private Grade priority;
}
```

---

### Config

#### mybatis-config.xml

``` xml
<configuration>
	<!-- See : https://mybatis.org/mybatis-3/ko/configuration.html#settings	-->
  <settings>
    <setting name="cacheEnabled" value="true" />
    <setting name="lazyLoadingEnabled" value="true" />
    <setting name="aggressiveLazyLoading" value="false" />
    <setting name="multipleResultSetsEnabled" value="true" />
    <setting name="useColumnLabel" value="true" />
    <setting name="useGeneratedKeys" value="false" />
    <setting name="autoMappingBehavior" value="PARTIAL" />
    <setting name="defaultExecutorType" value="SIMPLE" />
    <setting name="defaultStatementTimeout" value="25" />
    <setting name="safeRowBoundsEnabled" value="false" />
    <setting name="mapUnderscoreToCamelCase" value="false" />
    <setting name="localCacheScope" value="SESSION" />
    <setting name="jdbcTypeForNull" value="OTHER" />
  </settings>

  <!-- [1] -->
  <typeHandlers>
  </typeHandlers>

</configuration>
```

* [1] : mybatis-config에서는 따로 설정을 잡아준 게 없다.

---


### CodeEnumTypeHandler

* CodeEnumTypeHandler을 

  **abstract** class 선언 여부에 따라 Mapper.xml에서 사용법이 달라진다.

  우선은 CodeEnumTypeHandler 에 대해 분석해보고 이해해보자.

  그리고 사용법에 대해 알아보자.

---

> CodeEnumTypeHandler를 왜 abstract로 만들까?

*이 질문에 대해서는 abstract class 개념을 공부하면 좋다.*

* 여기서는 간단하게 이유에 대해 생각해보자면

  Enum Class를 다루는 공통적인 핵심 로직을 

  CodeEnumTypeHandler에 선언을 하여

  각각의 Custom Handler들이 CodeEnumTypeHandler를 상속하도록 구조를 잡는다.

---

#### 분석

> CodeEnumTypeHandler.class

``` java
public class CodeEnumTypeHandler<E extends Enum<E>> implements TypeHandler<CodeEnum> {

    private Class<E> type;

    public CodeEnumTypeHandler(Class<E> type) {
        this.type = type;
    }

    @Override
    public void setParameter(PreparedStatement ps, int i,
                             CodeEnum parameter, JdbcType jdbcType) throws SQLException {
        // [1] : Component -> DB 요청 시 사용 될 method
        ps.setString(i, parameter.getCode());
    }

    @Override
    public CodeEnum getResult(ResultSet rs, String columnName) throws SQLException {
        String code = rs.getString(columnName);

        // [2] : DB -> Component로 Data Read 시 사용 될 method
        if (columnName.equals("ordinal")) {
            switch (code) {
                case "0":
                    code = "1";
                case "1":
                    code = "2";
            }
        }

        return getCodeEnum(code);
    }

    private CodeEnum getCodeEnum(String code) {
        try {
            CodeEnum[] enumConstants = (CodeEnum[]) type.getEnumConstants();
            for (CodeEnum codeNum : enumConstants) {
                if (codeNum.getCode().equals(code)) { // [3]
                    return codeNum;
                }
            }
            return null;
        } catch (Exception e) {
            throw new TypeException("Can't make enum object '" + type + "'", e);
        }
    }
}
```

---

> setParameter()

``` java
[1] : ps.setString(i, parameter.getCode());
```

* Component -> DB 요청하는 상황에서

  DB query의 i번째 인자 값을 

  순수한 parameter가 아닌

  parameter.getCode() 값으로 지정해준다.

  그리고 getCode()의 signature는 
  
  [Grade.class]({{site.url}}/MyBatis-Handling-TypeHandler-Enum/#grade)에 있는 method를 사용한다.

``` java
@Override
public String getCode() {
    return priority;
}
```

* 그러므로 query에는 Enum Class를 넘겼지만

  DB에는 Enum의 priority 값이 들어가 지게 된다.

  

---

> getResult()

* [2] : 코드의 필요성에 대해 질문을 던질 수 있다.

  하지만 굉장히 중요한 코드 블럭이다.

* 우선 해당 method의 역할에 대해 생각해보면
  
  method name(= getResult()) 보면 알 수 있듯이 어떠한 Result를 갖고 온다.
  
  이 상황에서는 DB에서 data를 가지고 온다고 이해할 수 있다.
  
  그리고 그 data를 우리가 사용하는 Enum Class로 알맞게 변경시켜 줄 method이다.

  왜냐하면 그러기 위해 CodeEnumTypeHandler를 만들었기 때문이다.

* 그렇다면 여기서 [2] code는 왜 필요한 걸까?

  우리는 **EnumOrdinalTypeHandler**를 사용하여 data를 insert 했다.

  EnumOrdinalTypeHandler를 사용하였기 때문에

  DB에서 read 한 **data 값의 의미**는

  Enum Class에서 몇 번째에 있는지를 뜻한다.

* 예를 들어 Grade Enum Class를 보면 다음과 같다.
  
  *GOLD는 1번째에 위치 --> 0 값이 DB에 insert*

  *SILVER는 2번째에 위치 --> 1 값이 DB에 insert*

* 그러므로 DB에서 data를 read 할 경우 

  해당 ordinal가 Enum Class에서 어떤 값과 mapping 되어야 할지 
  
  convert 작업이 필요하고 해당 코드 블록이 그 역할을 해준다.

* 이런 식으로 Enum Class를 사용하여 DB와의 통신을 한다면 
  
  DB의 data를 알맞은 Enum Class로 변경해줄 필요가 있다.

  그리고 이 개념이 Custom TypeHandler의 **핵심**이자 
  
  이 글에서 다루고자 했던 **가장 중요한 개념**이다.


---


> getCodeEnum()

``` java
[3] : if (codeNum.getCode().equals(code))
```

* Enum Class의 각 값들(= codeNum.getCode( ))과 

  getCodeEnum()의 argument로 받은 code를 비교하면서 
  
  알맞은 Enum 값을 return 시켜준다.

* 즉 DB에서 읽은 data를 

  알맞은 Enum Class로 변환시켜주는 작업을 해준다.

---

#### 사용법

> abstract 사용 O

``` java
public abstract class CodeEnumTypeHandler<E extends Enum<E>> implements TypeHandler<CodeEnum> { 
    ...
}
```

> GradeMapper.xml

``` xml
<mapper namespace="goodgid.odot.repository.oltp.GradeMapper">
	<resultMap id="BaseResultMap" type="GradeDao">
		<result column="grade_seq" property="grade_seq" jdbcType="DECIMAL" />
		<result column="level" property="level" jdbcType="VARCHAR" />
<!-- -----------------------------------------[1]----------------------------------------- -->
		<result column="ordinal" property="ordinal" jdbcType="VARCHAR" 
                        typeHandler="goodgid.odot.common.enums.Grade$TypeHandler" />
		<result column="priority" property="priority" jdbcType="VARCHAR" 
                        typeHandler="goodgid.odot.common.enums.Grade$TypeHandler" />
<!-- ------------------------------------------------------------------------------------- -->
	</resultMap>


    <select id="selectByPrimaryKey" parameterType="java.lang.Long" resultMap="BaseResultMap">
        select *
        from GRADE
        where grade_seq = #{gradeSequence,jdbcType=DECIMAL}
    </select>

    <select id="insert" parameterType="GradeDao">
        insert into GRADE (grade_seq, level, ordinal, priority)
        values (#{grade_seq, jdbcType=DECIMAL},
<!-- -----------------------------------------[2]----------------------------------------- -->
        #{level, jdbcType=VARCHAR, 
                        typeHandler=org.apache.ibatis.type.EnumTypeHandler},
        #{ordinal, jdbcType=VARCHAR, 
                        typeHandler=org.apache.ibatis.type.EnumOrdinalTypeHandler},
        #{priority, jdbcType=VARCHAR, 
                        typeHandler=goodgid.odot.common.enums.Grade$TypeHandler})
<!-- ------------------------------------------------------------------------------------- -->
    </select>
</mapper>
```

* [1] : **$**을 사용한다.

  **$**는 해당 Class 내부에 있는 Inner Class를 뜻한다.

  ex) Grade$TypeHandler

---

* [2] : 각 type별로 사용할 typeHandler를 사용한다.

```
level : (Default) EnumTypeHandler
--> EnumTypeHandler를 사용하였기 때문에 Enum Type이 저장된다.
--> ex) GOLD, SILVER

ordinal : (Default) EnumOrdinalTypeHandler
--> EnumOrdinalTypeHandler를 사용하였기 때문에 Enum Type의 위치(ordinal)가 저장된다.
--> ex) 0(GOLD의 위치), 1(SILVER의 위치)

priority : (Custom) Grade$TypeHandler
--> Custom typeHandler이기 때문에 사용자가 정의한 값이 저장된다.
--> ex) 1(GOLD 타입의 priority 값), 2(SILVER 타입의 priority 값)
```






---

> abstract 사용 X

``` java
public class CodeEnumTypeHandler<E extends Enum<E>> implements TypeHandler<CodeEnum> {
    ...
}
```

> GradeMapper.xml

``` xml
<mapper namespace="goodgid.odot.repository.oltp.GradeMapper">
    <resultMap id="BaseResultMap" type="GradeDao">
        <result column="grade_seq" property="grade_seq" jdbcType="DECIMAL" />
        <result column="level" property="level" jdbcType="VARCHAR" />
<!-- -----------------------------------------[1]----------------------------------------- -->
    <result column="ordinal" property="ordinal" jdbcType="VARCHAR" 
                    typeHandler="goodgid.odot.common.enums.CodeEnumTypeHandler" />
    <result column="priority" property="priority" jdbcType="VARCHAR" 
                    typeHandler="goodgid.odot.common.enums.CodeEnumTypeHandler" />
<!-- ------------------------------------------------------------------------------------- -->
    </resultMap>


    <select id="selectByPrimaryKey" parameterType="java.lang.Long" resultMap="BaseResultMap">
        select *
        from GRADE
        where grade_seq = #{gradeSequence,jdbcType=DECIMAL}
    </select>

    <select id="insert" parameterType="GradeDao">
        insert into GRADE (grade_seq, level, ordinal, priority)
        values (#{grade_seq, jdbcType=DECIMAL},
        #{level, jdbcType=VARCHAR, 
                        typeHandler=org.apache.ibatis.type.EnumTypeHandler},
        #{ordinal, jdbcType=VARCHAR, 
                        typeHandler=org.apache.ibatis.type.EnumOrdinalTypeHandler},
<!-- -----------------------------------------[2]----------------------------------------- -->
        #{priority, jdbcType=VARCHAR, 
                        typeHandler=goodgid.odot.common.enums.CodeEnumTypeHandler})
<!-- ------------------------------------------------------------------------------------- -->
    </select>
</mapper>
```

* [1],[2] : typeHandler로 CodeEnumTypeHandler Class를 지정해준다.



---

### Controller

#### GradeController

``` java
@RestController
@RequestMapping("grade")
@Slf4j
public class GradeController {

    @Autowired
    private GradeMapper gradeMapper;

    @GetMapping
    public CommonResponse<?> getGrade() {

        Grade gold = Grade.valueOf("GOLD");
        Grade silver = Grade.valueOf("SILVER");

        System.out.println(gold + " " + gold.getPriority()); // Output : GOLD 1
        System.out.println(silver + " " + silver.getPriority()); // Output : SILVER 2

        GradeDao gradeDao = new GradeDao();

        gradeDao.setGrade_seq(1L);
        gradeDao.setLevel(gold);
        gradeDao.setOrdinal(gold);
        gradeDao.setPriority(gold);
        gradeMapper.insert(gradeDao);

        GradeDao result = gradeMapper.selectByPrimaryKey(seq);
        print(result); // Output : 1 GOLD GOLD GOLD

        return new CommonResponse<>(ReturnCode.SUCCESS);
    }
}
```


---

### DataBase

```
column : grade_seq | level | ordinal | priority
value  :     1     | GOLD  |    0    |    1
```

* level column -> Enum Type Name

  ordinal column -> Enum Class에서 위치(ordinal)

  priority column -> Enum Type의 priority value


---

## Summary

* 출력 결괏값 :  **1 GOLD GOLD GOLD** 

  DB 저장 값 : **1 GOLD 0 1**

  위 2가지 값에 대해 정확히 이해했다면

  MyBatis에서 Custom TypeHandler를 사용하는 방법에 대해 정확히 이해했다고 보면 된다.

  만약 이해가 되지 않는다면 

  반드시 글을 다시 읽어보고 이해하였으면 좋겠다.

* 글을 쓰다 보니 내용이 많아지고 

  불필요한 내용을 정리하는 과정이 반복되다 보니
  
  정말 오랜만에 글을 쓰기 위해 1주일 넘는 시간을 할애했다.

  글이 길어지니 오히려 가독성과 이해하는 데 있어 힘들지 않을까? 라는 아쉬움이 남지만

  그래도 끝까지 읽고 조금이라도 도움이 되었으면 정말 좋겠다.


---

## Reference

* [MyBatis Docs : Configuration XML](https://mybatis.org/mybatis-3/configuration.html)

* [[MyBatis] Enum 열거형 - TypeHandler를 통한 Enum Mapping 예제](http://blog.naver.com/PostView.nhn?blogId=kbh3983&logNo=220829521087)

* [[iBatis] Java의 enum 사용하기](http://egloos.zum.com/entireboy/v/4360348)