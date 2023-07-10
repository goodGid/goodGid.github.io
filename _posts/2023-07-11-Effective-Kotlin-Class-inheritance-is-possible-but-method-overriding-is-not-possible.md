---
layout: post
title:  " [Effective Kotlin] 클래스 상속은 가능한데 메서드 재정의(Overriding)는 불가능하게 제한하는 방법 : open 키워드를 사용하자 "
categories: Kotlin
author: goodGid
---
* content
{:toc}

## Overview

* ["이펙티브 코틀린 - 아이템 36. 상속보다는 컴포지션을 사용하라"](https://bit.ly/3F2kh2t)에 나오는 내용을 정리했습니다.


---

## Goal

* 상속은 가능하지만

  그 클래스 안에 메서드는 재정의하지 못하게 하는 방법에 대해 알아보자.


---

## Content

* 우리가 어떤 클래스를 정의할 때

  해당 클래스의 모든 메서드를 수정하지 못하게

  즉 재정의하는 걸 제한하려면 클래스에 final 키워드를 사용하면 된다.

  ex) final class Xxx

* 하지만 만약 특정 클래스에 대해

  어떤 메서드는 재정의를 가능하게 하고

  어떤 메서드는 재정의를 불가능하게 제한하고 싶다면 어떻게 해야 할까?

* 그럴 때 **open** 키워드를 사용하면 된다.

> Example Code

![](/assets/img/kotlin/Effective-Kotlin-Class-inheritance-is-possible-but-method-overriding-is-not-possible_1.png)

* Parent 클래스에 open 키워드를 사용한다.

  그러면 이 클래스에는 "오버라이딩을 못하는 메서드가 존재하는구나"라고 해석할 수 있고

  기본값으로는 모든 메서드의 오버라이딩이 불가능해진다.

* 그런데 여기서 오버라이딩을 허용할 메서드가 있다면

  해당 메서드에 open 키워드를 붙여준다.

* 그러면 Parent 클래스에서는

  a( ) 메서드는 재정의가 **불가능**하고

  b( ) 메서드는 재정의가 **가능**해진다.

![](/assets/img/kotlin/Effective-Kotlin-Class-inheritance-is-possible-but-method-overriding-is-not-possible_2.png)

* 실제로 코딩을 해보면

  a( ) 메서드는 final 클래스라 재정의가 불가능하다는 에러를 친절하게 알려준다.


---

## Summary

* open 키워드에 대해 알아봤다.

  정확히 어떤 역할을 하는지 몰랐는데

  이번 기회를 통해

  상속은 가능하되 특정 메서드에 대한 재정의를 불가능하게 하는 기능이 있음을 알게 되었다.


---

## Reference

* [이펙티브 코틀린 - 아이템 36. 상속보다는 컴포지션을 사용하라](https://bit.ly/3F2kh2t)