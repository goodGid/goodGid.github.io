---
layout: post
title:  " MyBatis 공식 문서(Docs) 읽어보기 : properties "
categories: MyBatis
author: goodGid
---
* content
{:toc}

## Prologue

* MyBatis에서 제공하는 공식 문서(Docs)를 참고하여

  [Configuration XML - properties](https://mybatis.org/mybatis-3/configuration.html#properties)개념에 대해 학습해보자.




---

## Properties

### 동적 설정


```
These are externalizable, substitutable properties that can be configured in a typical Java Properties file instance, or passed in through sub-elements of the properties element. 
The properties can then be used throughout the configuration files to substitute values that need to be dynamically configured. For example:
```

* Properties를 설정하는 파일이 A라고 할 때

  A안에서 설정하는 모든 Properties의 값들을 반드시 A에서만 관리할 필요가 없다.

  B파일에서 Properties 값을 설정하고

  A에서는 B파일을 참고하여 **동적(Dynamic)**으로 Properties를 설정할 수 있다.

  즉 externalizable, substitutable하다.

> config.properties

``` xml
<properties resource="org/mybatis/example/config.properties">
  <property name="username" value="goodgid"/>
  <property name="password" value="1q2w3e4r"/>
</properties>
```

> Dynamic property management

``` xml
<!-- it would be replaced by the values set in config.properties -->
<dataSource type="POOLED">
  <property name="username" value="${username}"/>  
  <property name="password" value="${password}"/>
</dataSource>
```


---

### 우선 순위

```
If a property exists in more than one of these places, 
MyBatis loads them in the following order:

1.  Properties specified in the body of the properties element are read first,
2.  Properties loaded from the classpath resource 
    or url attributes of the properties element are read second,
    and override any duplicate properties already specified.
3.  Properties passed as a method parameter are read last, 
    and override any duplicate properties that may have been loaded from the properties body 
    and the resource/url attributes.

Thus, the highest priority properties are those passed in as a method parameter, 
followed by resource/url attributes 
and finally the properties specified in the body of the properties element.
```

* 만약 Properties 값이 여러개 존재하면

  3 -> 2 -> 1 순서로 override하여 적용이 된다.

1. Properties element에 명시된 값을 읽는다.

2. Classpath 또는 URL 속성에 명시된 값을 읽는다.

3. Method parameter로 전달된 값을 읽는다.


---

### Default Value

```
Since the MyBatis 3.4.2
your can specify a default value into placeholder as follow:

This feature is disabled by default. 
If you specify a default value into placeholder, 
you should be enable this feature by adding a special property as follow:
```

* MyBatis 3.4.2부터는 

  **:**를 사용하여 Default 값 설정이 가능하다. 

  하지만 기본 설정이 disable하기 때문에 설정이 필요하다.


> Set **enable-default-value**

``` xml
<properties resource="org/mybatis/example/config.properties">
<!-- Enable this feature -->
<property name="org.apache.ibatis.parsing.PropertyParser.enable-default-value" value="true"/> 
```

> Usage

``` xml
<dataSource type="POOLED">
  <!-- If 'username' property not present, username become 'goodgid' -->
  <property name="username" value="${username:goodgid}"/> 
</dataSource>
```

---

### Default Value Separator

```
This will conflict with the ":" character in property keys (e.g. db:username)
or the ternary operator of OGNL expressions
(e.g. ${tableName != null ? tableName : 'global_constants'}) on a SQL definition.

If you use either and want default property values,
you must change the default value separator by adding this special property
```

* 그런데 순수하게 **:**를 사용하면 conflict이 일어 날 수 있다.

  case 1) DB 설정 시 db:username과 같이 사용하는 경우

  case 2) 삼항 연산자(ternary operator)를 사용하는 경우 

  왜냐하면 여기에서도 **:**를 사용하기 때문에

  Default Value로 사용된 건지 알 수가 없다.

* 그래서 Default Value 기능을 사용하려면

  **default-value-separator**를 custom하게 설정해주는 게 좋다.

  
> Set **default-value-separator**

``` xml
<properties resource="org/mybatis/example/config.properties">
  <!-- Change default value of separator -->
  <property name="org.apache.ibatis.parsing.PropertyParser.default-value-separator" value="?:"/> 
</properties>
```

> Usage

``` xml
<dataSource type="POOLED">
  <!-- If 'username' property not present, username become 'goodgid' -->
  <property name="username" value="${db:username?:goodgid}"/>
</dataSource>
```

---


## Summary

* MyBatis의 properties 속성에 대해 알아봤다.

* 영어로 작성이 되어있기 때문에 주관적으로 해석하고 의역을 하였다.

  혹시 글을 읽다 이상한 부분이 있다면 직접 문서를 읽어보는걸 추천한다.

  ( 추가적으로 피드백까지 주면 매우 감사하겠습니다. )

* 만약 영어로 된 문서를 읽기 힘들다면 한글로 번역된 [사이트](https://mybatis.org/mybatis-3/ko/configuration.html#properties)를 참고하자.



---

## Reference

* [MyBatis Docs : Configuration XML](https://mybatis.org/mybatis-3/configuration.html)