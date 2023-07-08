---
layout: post
title:  " [Effective Kotlin] 특정 함수(require, check, requireNotNull)를 사용해 스마트 캐스팅 기능 활용하기 "
categories: Kotlin
author: goodGid
---
* content
{:toc}

## Overview

* ["이펙티브 코틀린 - 아이템 5. 예외를 활용해 코드에 제한을 걸어라"](https://bit.ly/3F2kh2t)에 나오는 내용을 정리했습니다.


---

## Goal

* 코틀린이 제공하는 

  require, check, requireNotNull 함수를 사용하여 
  
  스마트 캐스팅 기능을 적극 활용해 보자.


---

## Concept

* 코틀린에서 특정 함수를 사용하여 true가 나왔다면

  해당 조건은 이후로도 true라고 가정한다.

* 따라서 이를 활용해서 타입 비교를 했다면

  **스마트 캐스트**가 작동한다.

> Example 

![](/assets/img/kotlin/Effective-Kotlin-Smart-Casting_1.png)

* Person 객체에 있는 프로퍼티들은 모두 다 nullable 하다.

* 그런데 해당 객체를 사용하는 sendMail( ) 함수에서

  require, check, requireNotNull 함수를 사용하여 null 체크를 함으로써

  그 이후 코드에서는 스마트 캐스팅 된 상태로

  따로 null 체크 없이 프로퍼티를 사용할 수 있게 된다.

---

## Summary

* 코틀린 기능을 활용하여 스마트 캐스팅을 해보자 !

* 다만 실제 회사에서 사용하고자 한다면 

  코틀린에 제공하는 함수가 발생하는 순수한 Exception 보다는

  해당 Exception을 한 번 감싼 Custom한 Exception을 발생시킬 수 있게 
  
  적절하게 재정의해서 사용하는 게 좋아 보인다.

  ~~그런데 이펙티브 코틀린에서는 순수한 Exception을 사용하라고 나와 있다.~~

---

## Reference

* [이펙티브 코틀린 - 아이템 5. 예외를 활용해 코드에 제한을 걸어라](https://bit.ly/3F2kh2t)