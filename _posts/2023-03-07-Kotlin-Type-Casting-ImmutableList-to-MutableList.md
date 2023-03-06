---
layout: post
title:  " [Kotlin] ImmutableList를 MutableList로 Type Casting을 한다면? (feat. Array.ArrayList vs Arrays.ArrayList) "
categories: Kotlin
author: goodGid
---
* content
{:toc}

## Overview

* Kotlin에서 ImmutableList를 반환하는 listOf( )를 사용하여 재미난 실험을 해보자.

* listOf( )가 반환하는 인스턴스를 강제로 MutableList로 Type Casting을 하고

  그 인스턴스에 값을 추가하는 행위를 해보려고 한다.




---

## Problem

``` kotlin
fun test() {
    val list = listOf(1, 2, 3)

    if (list is MutableList) {
        list.add(4)
    }
}

fun main() {
    test()
}
```

* 위 코드를 실행시키면 어떻게 될까?

* 컴파일 에러가 발생하진 않고 런타임에 UnsupportedOperationException가 발생한다. 

``` kotlin
Exception in thread "main" java.lang.UnsupportedOperationException
	at java.base/java.util.AbstractList.add(AbstractList.java:153)
	at java.base/java.util.AbstractList.add(AbstractList.java:111)
	at dev.be.kotlinsandbox.KotlinSandboxApplicationKt.test(KotlinSandboxApplication.kt:9)
	at dev.be.kotlinsandbox.KotlinSandboxApplicationKt.main(KotlinSandboxApplication.kt:14)
	at dev.be.kotlinsandbox.KotlinSandboxApplicationKt.main(KotlinSandboxApplication.kt)
```

---

## Deep Dive

``` java
1. // java.util.ArrayList.ArrayList()
2. ArrayList list1 = new ArrayList<Integer>();
3. list1.add(1);
4.
5. // java.util.Arrays.asList
6. List<Integer> list2 = Arrays.asList();
7. list2.add(1);
```

* Problem에서 왜 UnsupportedOperationException가 발생했는지 파악하기 위해

  잠시 Java 코드로 돌아와 위 코드를 살펴보도록 하자.

* 위 코드 또한 7번째 줄에서 UnsupportedOperationException가 발생한다.

* 그 이유는 알아보기 위해 우리는 ArrayList와 Arrays에 대해 학습할 필요가 있다.


### ArrayList

> java.util.ArrayList#add(E)

``` java
/**
  * Appends the specified element to the end of this list.
  *
  * @param e element to be appended to this list
  * @return <tt>true</tt> (as specified by {@link Collection#add})
  */
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}
```

* ArrayList를 살펴보면 Dynamic하게 Size를 조절한다.

  ( 자세한 설명은 다른 글 혹은 직접 코드를 살펴보는 것을 추천한다. )


### Arrays

> java.util.Arrays#asList

![](/assets/img/kotlin/Kotlin-Type-Casting-ImmutableList-to-MutableList_1.png)

* Arrays는 **Fixed Size**이므로 

  임의로 값을 추가하려고 하면 UnsupportedOperationException가 발생한다.


### Answer

``` kotlin
fun test() {
    val list = listOf(1, 2, 3) // [1]

    if (list is MutableList) { // [2]
        list.add(4) // [3]
    }
    
    val toMutableList = list.toMutableList() // [4]
    toMutableList.add(4)
}
```

* [1] : Kotlin에서 listOf( )를 호출하면 ImmutableList인 Arrays.ArrayList 인스턴스를 반환한다.

* [2] : ImmutableList를 강제로 MutableList로 변환하고

* [3] : 값을 추가하려고 하면 ImmutableList이므로 Exception이 발생한다.

* [4] : 그러므로 list 프로퍼티에 값을 추가하려면 MutableList 인스턴스를 새로 생성하여야 한다.

![](/assets/img/kotlin/Kotlin-Type-Casting-ImmutableList-to-MutableList_2.png)

* Type of **list** property : Arrays.ArrayList

* Type of **toMutableList** property : ArrayList

---

## Summary

* Kotlin에서 listOf( )는 ImmutableList를 반환한다.

* Array.ArrayList vs Arrays.ArrayList 차이에 대해 알아봤다.

  아무 생각 없이 사용했던 코드들에 대해 한번쯤을 되돌아볼 수 있는 시간이 되었다.

---

## Reference

* [이펙티브 코틀린 - 아이템 1. 가변성을 제한하라](https://bit.ly/3F2kh2t)