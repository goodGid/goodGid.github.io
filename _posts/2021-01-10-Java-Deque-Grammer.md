---
layout: post
title:  " Java Deque 문법 알아보기 "
categories: Java
author: goodGid
---
* content
{:toc}

## Prologue

* Java에서 Deque Interface 사용법에 대해 알아본다.


---


## Deque

``` java
public static void main(String[] args) {

    Deque<String> deque = new LinkedList<String>();
    
    /**
      * - Add at the last
      * public boolean add(E e) {
      *         this.linkLast(e);
      *         return true;
      *     }
      */
    deque.add("Element 1"); // "1"

    /**
      * - Add at the first
      * public void addFirst(E e) {
      *         this.linkFirst(e);
      *     }
      */
    deque.addFirst("Element 2"); // "2" 1

    /**
      * - Add at the last
      * public void addLast(E e) {
      *         this.linkLast(e);
      *     }
      */
    deque.addLast("Element 3"); // 2 1 "3"

    /**
      * - Add at the first
      * public void push(E e) {
      *         this.addFirst(e);
      *     }
      */
    deque.push("Element 4"); // "4" 2 1 3

    /**
      * - Add at the last
      * public boolean offer(E e) {
      *         return this.add(e);
      *     }
      */
    deque.offer("Element 5"); // 4 2 1 3 "5"

    /**
      * - Add at the first
      * public boolean offerFirst(E e) {
      *         this.addFirst(e);
      *         return true;
      *     }
      */
    deque.offerFirst("Element 6"); // "6" 4 2 1 3 5

    System.out.println("## Deque");
    System.out.println(deque);

    // We can remove the first element
    // or the last element.
    deque.removeFirst();
    deque.removeLast();
    System.out.println("## Deque after removing");
    System.out.println("First and Last : " + deque);
}
```
> Output

```
## Deque
[Element 6, Element 4, Element 2, Element 1, Element 3, Element 5]

## Deque after removing
First and Last : [Element 4, Element 2, Element 1, Element 3]
```


---

## Reference

* [Deque interface in Java with Example](https://www.geeksforgeeks.org/deque-interface-java-example/)
* [Deque In Java](https://www.scaler.com/topics/java/deque-in-java/)
