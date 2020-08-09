---
layout: post
title:  " @Component와 @Bean의 차이 "
categories: Spring
author: goodGid
---
* content
{:toc}

* Spring Annotation인 **@Component**와 **@Bean**의 차이에 대해 알아보자.






---

## 차이점

``` java
@Bean
public ObjectMapper objectMapper(){
    return new ObjectMapper();
}
```

``` java
@Component
public class CustomMapper{
    ...
}
```

* @Bean의 경우 

* 개발자가 컨트롤이 불가능한 외부 라이브러리들을 

* Bean으로 등록하고 싶은 경우에 사용된다. 

<br>

* 예를 들면 ObjectMapper의 경우 

* ObjectMapper Class에 @Component를 선언할 수 없으니

* ObjectMapper의 인스턴스를 생성하는 메소드를 만들고 

* 해당 메소드에 @Bean을 선언하여 Bean으로 등록한다.

<br>

* 반면 개발자가 직접 컨트롤이 가능한 Class들의 경우엔 

* @Component를 사용한다.


---


## 질문

> Q. 개발자가 생성한 Class에 @Bean은 선언이 가능할까?

* No !

<br>

* @Bean과 @Component는 

* 각각 선언할 수 있는 타입이 정해져있어 

* 해당 용도외에 선언에는 **컴파일 에러**가 발생한다.

<br>

``` java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Component {
   /**
    * The value may indicate a suggestion for a logical component name,
    * to be turned into a Spring bean in case of an autodetected component.
    * @return the suggested component name, if any (or empty String otherwise)
    */
   String value() default "";
}
```
* @Target이 TYPE로 지정되어 Class에만 사용이 가능하다.

<br>

``` java
@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Bean {
   /**
    * Alias for {@link #name}.
    * <p>Intended to be used when no other attributes are needed, for example:
    * {@code @Bean("customBeanName")}.
    * @since 4.3.3
    * @see #name
    */
   @AliasFor("name")
   String[] value() default {};
```
* 사용할 수 있는 타입은

* *ElementType.METHOD, ElementType.ANNOTATION_TYPE* 이다.

---


## Summary

* @Component는 

* 선언된 클래스를 Bean으로 만드는거고 

* @Bean은 반환하는 객체를 Bean으로 만드는 것이다.

<br>

> @Bean

* @Bean은 

* setter나 builder 등을 통해서 

* 사용자가 프로퍼티를 변경해서 생성한 인스턴스를 

* Spring에게 관리하라고 맡기는 것이다.

<br>

> @Component

* @Component는 

* 클래스를 Spring에게 알아서 

* **인스턴스 생성** 및 **Bean 등록** 하는 과정을 맡기는 것이다.


---

## Reference

* [@Bean vs @Component](https://jojoldu.tistory.com/27)

* [@Component vs @Bean 차이점이 궁금합니다.](https://okky.kr/article/355942)

* [@Bean 과 @Component의 차이](https://effectivesquid.tistory.com/entry/Bean-%EA%B3%BC-Component%EC%9D%98-%EC%B0%A8%EC%9D%B4)