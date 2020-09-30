---
layout: post
title:  " Java 8의 Arrays.parallelSort( ) Method : MultiThread로 정렬을 하다. "
categories: Java
author: goodGid
---
* content
{:toc}

## Prologue

* Java 8부터 parallelSort( ) API를 제공한다. 

  해당 메소드는 Parallel하게 Array의 Elements를 정렬시킨다.



---

## Arrays.parallelSort( )

```
parallelSort() method uses concept of MultiThreading which makes the sorting faster as compared to normal sorting method.
```

* [Arrays.parallelSort( )](https://www.geeksforgeeks.org/java-8-arrays-parallelsort-method-with-examples/)는 MultiThread로 동작을 하기 때문에 일반적인 Arrays.sort( )보다 빠르다.


### Algorithm

```
1. The array is divided into sub-arrays and that 
   sub-arrays is again divided into their sub-arrays, 
   until the minimum level of detail in a set of array.
2. Arrays are sorted individually by multiple thread. 
3. The parallel sort uses Fork/Join Concept for sorting.
4. Sorted sub-arrays are then merged.
```


---

### Example

``` java
public static void main(String[] args){
    int size = 1500;
    int[] numbers = new int[size];
    Random random = new Random();

    IntStream.range(0, size).forEach(i -> numbers[i] = random.nextInt());
    Arrays.sort(numbers);

    IntStream.range(0, size).forEach(i -> numbers[i] = random.nextInt());
    Arrays.parallelSort(numbers);
}
```

* 시간을 측정해보면 

  **parallelSort( )**가 빠른걸 확인할 수 있다.


---


## Reference

* [더 자바, Java 8](https://www.inflearn.com/course/the-java-java8)

* [Java 8 Arrays parallelSort() method with Examples](https://www.geeksforgeeks.org/java-8-arrays-parallelsort-method-with-examples/)