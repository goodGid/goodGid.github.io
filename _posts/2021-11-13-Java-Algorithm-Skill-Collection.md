---
layout: post
title:  " [Java] 알고리즘(Algorithm)을 위한 코드 정리해두기 "
categories: AlgorithmSkill
author: goodGid
---
* content
{:toc}

## Prologue

* Java로 알고리즘을 풀다 보면 반복적으로 막히는 부분이 있다.

  이런 부분들을 정리해놓기 위한 포스팅이다.


---

## Idea

### Sliding Window

* [LeetCode : 121. Best Time to Buy and Sell Stock]({{site.url}}/LeetCode-Best-Time-to-Buy-and-Sell-Stock)



---

## Algorithm

### PriorityQueue

* 내림차순 + PriorityQueue 사용 방법

``` java
PriorityQueue<Integer> queue = new PriorityQueue<>(Collections.reverseOrder());


// public class PriorityQueue<E> extends AbstractQueue<E> implements java.io.Serializable
public PriorityQueue(Comparator<? super E> comparator) {
    this(DEFAULT_INITIAL_CAPACITY, comparator);
}
```

> Point

* comparator 값으로 *Collections.reverseOrder( )*를 넘겨주면 내림차순 우선순위 큐 생성이 가능하다.

---

> Problem

* [LeetCode : 215. Kth Largest Element in an Array]({{site.url}}/LeetCode-Kth-Largest-Element-in-an-Array/#2-code-21-11-10-x)


---

### String 문법

* String에서 i번째 값 읽어오기

``` java
String s = "abc";
System.out.println(s.charAt(0)); // a
```

---

### List 사용

* List 선언과 동시에 값 할당

``` java
// 1. JDK 5 이상에서 사용 가능
List<String> list = Arrays.asList("Amsterdam", "Paris", "London");

// 2.
List<String> list = Arrays.asList(new String[] { "a", "b", "c" });

// 3.
List<String> list = new ArrayList<>() {% raw  %}{{ ... }}{% endraw  %} // Compile Error 발생
List<String> list = new ArrayList<String>() {
    { 
        add("A");
        add("B");
        add("C");
    }
};
```