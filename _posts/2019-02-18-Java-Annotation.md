---
layout: post
title:  " Java Annotation "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

## Annotation

* 어노테이션(Annontion)은 정말 유용한 자바의 구문이다. 

* 기본적인 종류는 몇가지에 한정 되지만 커스텀 어노테이션(Custom Annotation)을 만들 수 있다.

* 어노테이션의 본질적인 목적은 소스 코드에 **메타데이터를 표현**하는 것이다. 

* 단순히 부가적인 표현뿐만 아니라 **리플렉션(reflection)**을 이용하면 어노테이션 지정만으로도 원하는 클래스를 주입이 가능해진다.







---

## Bulit-in Annotation

* 자바에서는 기본적으로 제공하는 어노테이션들이 존재한다.

    - @Override - 메소드가 오버라이드 됐는지 검증한다. <br> 만약 부모 클래스 또는 구현해야할 인터페이스에서 해당 메소드를 찾을 수 없다면 컴파일 오류가 발생한다.

    - @Deprecated - 메소드를 사용하지 않도록 유도한다. <br> 만약 사용한다면 컴파일 경고를 일으킨다.

    - @SuppressWarnings - 컴파일 경고를 무시하도록 한다.

    - @SafeVarargs - 제너릭 같은 가변인자 매개변수를 사용할 때 경고를 무시한다. (자바7 이상)

    - @FunctionalInterface - 람다 함수등을 위한 인터페이스를 지정한다. <br> 메소드가 없거나 두개 이상 되면 컴파일 오류가 발생한다. (자바 8이상)


``` java
Annotations applied to Java code:
@Override - Checks that the method is an override. Causes a compile error if the method is not found in one of the parent classes or implemented interfaces.
@Deprecated - Marks the method as obsolete. Causes a compile warning if the method is used.
@SuppressWarnings - Instructs the compiler to suppress the compile time warnings specified in the annotation parameters.
@SafeVarargs - Suppress warnings for all callers of a method or constructor with a generics varargs parameter, since Java 7.
@FunctionalInterface - Specifies that the type declaration is intended to be a functional interface, since Java 8.
```

---

## Meta Annotations

* 위에서 본 기본 어노테이션 외에도 메타 어노테이션(Meta Annotation)들이 있다. 

* 이 메타 어노테이션을 이용해 커스텀 어노테이션을 만들 수 있다.

    - @Retention - 어노테이션의 적용 범위이다. <br> 즉 어떤 시점까지 어노테이션이 영향을 미치는지 결정한다.

    - @Documented - 문서에도 어노테이션의 정보가 표현된다.

    - @Target - 어노테이션이 적용할 위치를 결정한다.

    - @Inherited - 이 어노테이션을 선언하면 자식 클래스가 부모 클래스의 어노테이션을 상속 받을 수 있다.
    
    - @Repeatable - 반복적으로 어노테이션을 선언할 수 있게 한다.


``` java
Annotations applied to other annotations (also known as "Meta Annotations"):

@Retention - Specifies how the marked annotation is stored—Whether in code only, compiled into the class, or available at runtime through reflection.
@Documented - Marks another annotation for inclusion in the documentation.
@Target - Marks another annotation to restrict what kind of Java elements the annotation may be applied to.
@Inherited - Marks another annotation to be inherited to subclasses of annotated class (by default annotations are not inherited to subclasses).
@Repeatable - Specifies that the annotation can be applied more than once to the same declaration, since Java 8.
```


---

## Custom Annontation

* 자바에서 커스텀 어노테이션을 선언하는 방법은 매우 간단하다.

``` java
public @interface MyAnnonation {}
```

* 본격적으로 커스텀 어노테이션을 작성해보자.

``` java
import java.lang.annotation.*;

@Inherited
@Documented
@Retention(RetentionPolicy.RUNTIME) // 컴파일 이후에도 JVM에 의해서 참조가 가능합니다.
//@Retention(RetentionPolicy.CLASS) // 컴파일러가 클래스를 참조할 때까지 유효합니다.
//@Retention(RetentionPolicy.SOURCE) // 어노테이션 정보는 컴파일 이후 없어집니다.
@Target({
        ElementType.PACKAGE, // 패키지 선언시
        ElementType.TYPE, // 타입 선언시
        ElementType.CONSTRUCTOR, // 생성자 선언시
        ElementType.FIELD, // 멤버 변수 선언시
        ElementType.METHOD, // 메소드 선언시
        ElementType.ANNOTATION_TYPE, // 어노테이션 타입 선언시
        ElementType.LOCAL_VARIABLE, // 지역 변수 선언시
        ElementType.PARAMETER, // 매개 변수 선언시
        ElementType.TYPE_PARAMETER, // 매개 변수 타입 선언시
        ElementType.TYPE_USE // 타입 사용시
})
public @interface MyAnnotation {
    /* enum 타입을 선언할 수 있습니다. */
    public enum Quality {BAD, GOOD, VERYGOOD}
    /* String은 기본 자료형은 아니지만 사용 가능합니다. */
    String value();
    /* 배열 형태로도 사용할 수 있습니다. */
    int[] values();
    /* enum 형태를 사용하는 방법입니다. */
    Quality quality() default Quality.GOOD;
}
```


---

## 참고

* [자바 어노테이션(Java Annotations)](https://jdm.kr/blog/216)