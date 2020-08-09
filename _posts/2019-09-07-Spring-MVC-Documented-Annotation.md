---
layout: post
title:  " Spring MVC - @Documented 애노테이션 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @Documneted

* 사용하려는 애노테이션(=A)에 

* @Documneted를 [메타 애노테이션]({{site.url}}//Spring-MVC-Custom-Annotation/#메타meta-애노테이션)으로 설정이 되어있다면

* 해당 애노테이션(=A)을 사용하는 애노테이션의 코드 문서에는

* 사용한 애노테이션(=A)이 노출된다.







---

## Example

> RequestMapping 애노테이션

``` java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
public @interface RequestMapping {
    String name() default "";

    @AliasFor("path")
    String[] value() default {};

    @AliasFor("value")
    String[] path() default {};

    RequestMethod[] method() default {};

    String[] params() default {};

    String[] headers() default {};

    String[] consumes() default {};

    String[] produces() default {};
}
```

* RequestMapping에서 **value**와 **path** 필드를 보면 

``` java
@AliasFor("path")
String[] value() default {};

@AliasFor("value")
String[] path() default {};
```

* AliasFor 애노테이션을 사용한다. 

* 그리고 AliasFor 애노테이션에는 @Documented가 선언되어 있다.

> AliasFor 애노테이션

``` java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
@Documented
public @interface AliasFor {
    @AliasFor("attribute")
    String value() default "";

    @AliasFor("value")
    String attribute() default "";

    Class<? extends Annotation> annotation() default Annotation.class;
}
```

<br>

* 코드 문서를 확인해보자.

* RequestMapping의 코드 문서를 보자.

* [Java Docs : Annotation Type RequestMapping](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html)
 
* 그리고 [value](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html#value--)와 [path](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html#path--) 필드에 관한 부분을 보면 다음과 같다.


``` java
@AliasFor(value="path")
public abstract String[] value
The primary mapping expressed by this annotation.
This is an alias for path(). For example @RequestMapping("/foo") is equivalent to @RequestMapping(path="/foo").

Supported at the type level as well as at the method level! When used at the type level, all method-level mappings inherit this primary mapping, narrowing it for a specific handler method.

Default:
{}
```

``` java
@AliasFor(value="value")
public abstract String[] path
The path mapping URIs (e.g. "/myPath.do"). Ant-style path patterns are also supported (e.g. "/myPath/*.do"). At the method level, relative paths (e.g. "edit.do") are supported within the primary mapping expressed at the type level. Path mapping URIs may contain placeholders (e.g. "/${connect}").
Supported at the type level as well as at the method level! When used at the type level, all method-level mappings inherit this primary mapping, narrowing it for a specific handler method.

Since:
4.2
See Also:
ValueConstants.DEFAULT_NONE
Default:
{}
```

* 문서에서 *@AliasFor(value="value")* 와 *@AliasFor(value="path")* 를 볼 수 있다.

* 즉 @AliasFor에는 

* @Documented 애노테이션이 

* 메타 애노테이션으로 설정이 되어있기 때문에

* @RequestMapping에서 

* @AliasFor를 사용하는 필드에 대해서는

* @AliasFor가 노출되게 된다.


---

## Reference

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

