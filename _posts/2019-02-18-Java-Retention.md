---
layout: post
title:  " Retention Docs 읽어보기 "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

* [Meta Annotations]({{site.url}}/) 중 대표적인 예시이다.

* Annotation Type Retention의 Oracle Docs를 읽어보자.







---

## Annotation Type Retention

* 기본적인 선언 부분

``` java
@Documented
@Retention(value=RUNTIME)
@Target(value=ANNOTATION_TYPE)
public @interface Retention
```

* Description


``` 
Indicates how long annotations with the annotated type are to be retained. 
// 주석 된 유형의 주석을 보유 할 기간을 나타낸다.(?)

If no Retention annotation is present on an annotation type declaration, the retention policy defaults to RetentionPolicy.CLASS.
// 어노테이션 유형 선언에 보존 주석이없는 경우 보존 정책의 기본값은 RetentionPolicy.CLASS이다.(?)

A Retention meta-annotation has effect only if the meta-annotated type is used directly for annotation. 
// Meta Annotation인 Retention은 효과가 있다.
// 만약 Meta Annotation가 Annotation에 직접적으로 사용될 경우

It has no effect if the meta-annotated type is used as a member type in another annotation type.
// 효과가 없다.
// 만약 Meta Annotation Type이 다른 Annotation Type의 멤버 타입으로 사용될 경우

```

* 확 와닿는 Docs 해석은 아니다.


---

## 참고

* [Annotation Type Retention](https://docs.oracle.com/javase/7/docs/api/java/lang/annotation/Retention.html)