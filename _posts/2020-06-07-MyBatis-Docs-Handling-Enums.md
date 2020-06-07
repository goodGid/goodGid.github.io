---
layout: post
title:  " MyBatis 공식 문서(Docs) 읽어보기 : Handling Enums "
categories: MyBatis
author: goodGid
---
* content
{:toc}

## Prologue

* MyBatis에서 제공하는 공식 문서(Docs)를 참고하여

  [Configuration XML - Handling Enums](https://mybatis.org/mybatis-3/configuration.html)개념에 대해 학습해보자.

  그런데 **Handling Enums**은 목차에 없고

  [typeHandlers](https://mybatis.org/mybatis-3/configuration.html#typeHandlers) 아래 [objectFactory](https://mybatis.org/mybatis-3/configuration.html#objectFactory) 위에 위치한다.




---

## Handling Enums

```
If you want to map an Enum, 
you'll need to use either EnumTypeHandler or EnumOrdinalTypeHandler.

Note EnumTypeHandler is special in the sense that unlike other handlers, 
it does not handle just one specific class, but any class that extends Enum
```

* MyBatis를 사용할 때 

  Enum Type에 매핑을 하려고 한다면

  **EnumTypeHandler** 혹은 **EnumOrdinalTypeHandler**을 사용해야 한다.
  
* EnumTypeHandler 는 일반적인 handlers랑 다르다.
  
  EnumTypeHandler는 하나의 특별한 클래스만 다루는 게 아니라 

  Enum 클래스를 extend 하는 모든 클래스를 다룬다.

  (= <E extends Enum<E>> )

---

> EnumTypeHandler.class

``` java
package org.apache.ibatis.type;

public class EnumTypeHandler<E extends Enum<E>> extends BaseTypeHandler<E> {
    private Class<E> type;

    public EnumTypeHandler(Class<E> type) {
        if (type == null) {
            throw new IllegalArgumentException("Type argument cannot be null");
        } else {
            this.type = type;
        }
    }

    public void setNonNullParameter(PreparedStatement ps, 
                                    int i, E parameter, 
                                    JdbcType jdbcType) throws SQLException {
        if (jdbcType == null) {
            ps.setString(i, parameter.name());
        } else {
            ps.setObject(i, parameter.name(), jdbcType.TYPE_CODE);
        }
    }
}
```

* i번째 값을 

  입력받은 parameter를 그대로 사용하는 게 아니라

  parameter.name()의 값으로 사용하는 걸 볼 수 있다.

* 즉 이 경우에 parameter는 Enum이 될 테고

  Enum.name()이기 때문에 

  사용자가 명시한 Enum 클래스가 적절한 값으로 convert 되는 걸 알 수 있다.

---

> EnumOrdinalTypeHandler.class

``` java
package org.apache.ibatis.type;

public class EnumOrdinalTypeHandler<E extends Enum<E>> extends BaseTypeHandler<E> {
    private Class<E> type;
    private final E[] enums;

    public EnumOrdinalTypeHandler(Class<E> type) {
        if (type == null) {
            throw new IllegalArgumentException("Type argument cannot be null");
        } else {
            this.type = type;
            this.enums = (Enum[])type.getEnumConstants();
            if (this.enums == null) {
                throw new IllegalArgumentException(type.getSimpleName() + " does not represent an enum type.");
            }
        }
    }

    public void setNonNullParameter(PreparedStatement ps, 
                                    int i, E parameter, 
                                    JdbcType jdbcType) throws SQLException {
        // ordinal을 가져오기 때문에 Enum의 위치값으로 매핑된다.
        // 여기서 말하는 위치값이란 0,1,2,3, ... 이다.                              
        ps.setInt(i, parameter.ordinal());
    }
}
```

* EnumTypeHandler 와 동작 과정은 비슷하다.

  하지만 EnumTypeHandler 는 parameter.name()이라면

  EnumOrdinalTypeHandler 는 클래스 명에서 알 수 있듯이

  parameter.ordinal() 값으로 convert 해주는 것을 알 수 있다.

---

### Example

> Grade.class

``` java
public enum Grade {
    GOLD("1"),
    SILVER("2");

    private String priority;

    Grade(String priority) {
        this.priority = priority;
    }

    public String getPriority() {
        return priority;
    }
}
```

---

> GradeDao.class

``` java
@Getter
@Setter
@NoArgsConstructor
public class GradeDao {

    private Long grade_seq;

    private Grade level;

    private Grade grade;
}
```

---

> GradeController

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

        System.out.println(gold + " " + gold.getPriority()); // output : GOLD 1
        System.out.println(silver + " " + silver.getPriority()); // output : SILVER 2

        GradeDao gradeDao = new GradeDao();
        Long seq = (long) (Math.random() * 100);

        gradeDao.setGrade_seq(seq);
        gradeDao.setLevel(gold);
        gradeDao.setGrade(gold);

        gradeMapper.insert(gradeDao);

        return new CommonResponse<>(ReturnCode.SUCCESS);
    }
}
```

---

> GradeMapper.xml

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >

<mapper namespace="goodgid.odot.repository.oltp.GradeMapper">

	<select id="insert" parameterType="GradeDao">
		insert into GRADE (grade_seq, level, priority)
		values (#{grade_seq, jdbcType=DECIMAL},
		#{level, jdbcType=VARCHAR, 
                          typeHandler=org.apache.ibatis.type.EnumTypeHandler},
		#{grade, jdbcType=VARCHAR, 
                          typeHandler=org.apache.ibatis.type.EnumOrdinalTypeHandler})
	</select>

</mapper>
```

* Enum 타입 같은 경우 

  MyBatis에게 특정 Handler 사용을 명시해줘야 한다.

  level -> EnumTypeHandler

  grade -> EnumOrdinalTypeHandler

* 위 Example에서는 Custom Handler를 사용하지 않았다.

  만약 Custom Hander를 사용하고 싶다면 

  *typeHandler=xxx.yyy.zzz.customHandler* 처럼 사용하면 된다.

---


> DB

```
column : grade_seq | level | priority
value  :    79     | GOLD  |    0
```

* level column에는

  Enum 클래스의 Name이 들어가고

  priority column에는

  Enum 클래스의 위치(ordinal)가 들어간다.





---

## Summary

* MyBatis의 Handling Enums 속성에 대해 알아봤다.

* 영어로 작성되어있기 때문에 주관적으로 해석하고 의역을 하였다.

  혹시 글을 읽다 이상한 부분이 있다면 직접 문서를 읽어보는 걸 추천한다.

  ( 추가로 피드백까지 주면 매우 감사하겠습니다. )

* 만약 영어로 된 문서를 읽기 힘들다면 한글로 번역된 [사이트](https://mybatis.org/mybatis-3/ko/configuration.html)를 참고하자.


---

## Reference

* [MyBatis Docs : Configuration XML](https://mybatis.org/mybatis-3/configuration.html)

* [[MyBatis] Enum 열거형 - TypeHandler를 통한 Enum Mapping 예제](http://blog.naver.com/PostView.nhn?blogId=kbh3983&logNo=220829521087)