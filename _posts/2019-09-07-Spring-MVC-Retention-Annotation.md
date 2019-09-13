---
layout: post
title:  " Spring MVC - @Retention 애노테이션 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @Retention

``` java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Retention {
    /**
     * Returns the retention policy.
     * @return the retention policy
     */
    RetentionPolicy value();
}
```

* @Retention은 해당 애노테이션이 언제까지 유지할지 알려주는 애노테이션이다.

* 그러므로 Retention 애노테이션에도 

* 자기 자신이 어느 시점까지 유효한지를 명시해줘야한다.

``` java
@Retention(RetentionPolicy.RUNTIME)
```

---

### RetentionPolicy

* Retention에는 3가지 속성이 있다.

* SOURCE, CLASS, RUNTIME

``` java
public enum RetentionPolicy {
    /**
     * Annotations are to be discarded by the compiler.
     */
    SOURCE,

    /**
     * Annotations are to be recorded in the class file by the compiler
     * but need not be retained by the VM at run time.  
     * This is the default
     * behavior.
     */
    CLASS,

    /**
     * Annotations are to be recorded in the class file by the compiler and
     * retained by the VM at run time, so they may be read reflectively.
     *
     * @see java.lang.reflect.AnnotatedElement
     */
    RUNTIME
}
```










#### Source

* 만약 커스텀 애노테이션을 주석처럼 사용하고 싶다면 옵션을 Source로 바꿔주면 된다.

* 그렇게 되면 컴파일을 하여 생성된 .class에 

* 해당 애노테이션 정보가 사라진다.

* 즉 소스 코드까지만 유지한다. 

* = 컴파일 후 해당 애노테이션은 사라진다.


#### Class

* @Retention의 기본값은 클래스 타임이다. 

* CLASS 설명을 보면 알 수 있다.  <br> *<small>**This is the default**</small>*

* 컴파일 한 .class 파일에서도 유지를 한다. 
    
* 즉 런타임 시 클래스를 메모리로 읽어오면 해당 정보는 사라진다.

#### Runtime

* 클래스를 메모리에 읽어왔을 때까지 유지한다. 

* 코드에서 이 정보를 바탕으로 특정 로직을 실행할 수 있다.

---

## 끝으로

* @Retention 옵션에 의해 Test Code의 성공 유무가 정해지는 좋은 예시가 있다.

* 반드시 [커스텀 애노테이션(Custom Annotation) 사용하기]({{site.url}}/Spring-MVC-Custom-Annotation/#커스텀-애노테이션custom-annotation-사용하기) 글을 읽어보자.

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

