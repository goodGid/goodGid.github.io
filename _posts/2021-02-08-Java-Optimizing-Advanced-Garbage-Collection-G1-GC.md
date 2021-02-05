---
layout: post
title:  " [Java Optimizing] 7. 가비지 수집 고급 : G1 GC "
categories: Java_Optimizing
author: goodGid
---
* content
{:toc}

> 이 글은 [자바 최적화 (Optimizing Java,가장 빠른 성능을 구현하는 검증된 10가지 기법)](https://book.naver.com/bookdb/book_detail.nhn?bid=14796595) 책을 학습한 내용을 토대로 작성되었습니다.

## Prologue

* G1 GC에 대해 알아본다.


---

## G1 GC

* G1 GC는 Java9 부터 Default GC이다.

---

### G1 Region

![](/assets/img/java_optimizing/Java-Optimizing-Advanced-Garbage-Collection-G1_1.png)

* G1 힙은 리전(Region)으로 구성되어 있다.

* 여러 리전 중 **Humongous**라는 리전이 있다.

  해당 리전은 영역을 절반 이상을 점유한 객체는 

  거대 영역(Humongous Region)이라는 별도 공간에 바로 할당이 된다.

  그리고 이 영역은 **Old 영역**으로 간주된다.

---

### G1 힙 레이아웃 및 영역

* G1 알고리즘에서는 

  영역의 기본값은 1MB이다.

  1,2,4,8,16,32,64 MB 크기의 영역을 사용할 수 있으며

  기본적으로 힙에는 2,048 ~ 4,095개의 영역이 있고

  이 개수에 따라 영역 크기도 조정된다.

```
* 영역 크기 = <힙 크기> / 2048
--> 허용된 영역 크기 값에 가장 가까운 수치로 반올림

* 영역 개수 = <힙 크기> / <영역 크기>
```

---

### Remember Set (RSet)

* G1 GC가 생겨난 배경에는 다음과 같은 가정이 있었다.

  "Old 객체가 Young 객체를 참조하는 일은 거의 없다."

  그리고 참조하는 케이스에 대해서는 
  
  병렬/CMS 알고리즘에서는 **카드 테이블**이라는 장치를 활용했다.

  위 문장이 이해가 가지 않는다면 [가비지 컬렉션(Garbage Collection) 2편]({{site.url}}/Java-Garbage-Collection-(2)/) 글을 참고하자.

* G1 GC에서도 카드 테이블과 비슷한 개념으로

  **RSet(Remember Set) 장치**를 사용한다.

* RSet은 영역별로 하나씩

  외부에서 힙 영역 내부를 참조하는 **레퍼런스**를 관리하기 위한 장치이다.

* 덕분에 G1은 영역 내부를 바라보는 레퍼런스를 찾으려고 

  전체 힙을 다 뒤질 필요 없이 RSet만 꺼내 보면 된다.


#### Example

> Case 1.

![](/assets/img/java_optimizing/Java-Optimizing-Advanced-Garbage-Collection-G1_2.png)

* 각 Region은 복수의 카드로 분할되어있다.

  *여기서 말하는 카드는 그림 상 Region에서 직사각형 모양을 가리킨다.*

<br>

* **녹색** 부분 카드는 

  다른 카드 객체에 대한 **참조**가 있음을 나타내며

  이 참조 관계는 **파란색** 실선으로 표시된다.

  *위 그림에서 표현하는 색이 그렇다는 거지 실제로 구현이 그렇게 되어있다는 뜻은 아니다.*

<br>

* RSet을 구현하는 데 사용한 자료구조는 **HashTable**이다.

* 위 그림에서 Region2에 속해있는 2개의 카드를 다른 Region에서 참조하고 있다.

  그러면 어떤 Region이 Region2의 카드를 참조하는지 마킹하기 위해 
  
  Region2의 RSet에 **Key**는 다른 Region의 **시작 주소**를 담고
  
  **Value**에는 해당 Region에서 **카드의 Index**를 저장하게 된다.

> Case 2.

![](/assets/img/java_optimizing/Java-Optimizing-Advanced-Garbage-Collection-G1_3.png)

```
There are three Regions in the above picture. 
Each Region is divided into multiple Cards. 
Cards in different Regions will refer to each other. 
Objects in Card in Region1 refer to objects in Card in Region2. 
Blue solid lines indicate It is the relationship of points-out, 
and in the RSet of Region2, the Card of Region1 is recorded, 
that is, the relationship represented by the red dotted line, which is points-into.
```

* *ref : [Some key technologies of Java Hotspot G1 GC --> RSet](https://www.programmersought.com/article/54314098742/)*

> Comment

```
In general
this RSet is actually a Hash Table 
Key is the starting address of other Regions, Value is a set
and the elements inside are the Index of Card Table.
```

* *ref : [Some key technologies of Java Hotspot G1 GC --> RSet](https://www.programmersought.com/article/54314098742/)*

```
Each RSet keeps track of outside references into its "owning" region
```

* *ref : [Garbage First Garbage Collector (G1 GC): Current and Future Adaptability and Ergonomics. --> 7page](https://www.slideshare.net/MonicaBeckwith/con5497)*



---

### G1 기본 JVM 플래그

> -XX:UseG1GC

* Java8 이전까지는 다음 스위치로 G1을 작동시켰다.

  Java9 이상부터는 default로 동작한다.

> -XX:MaxGCPauseMillis=n

* default 중단 시간(=n)을 설정할 수 있다. (단위 : ms)

  n의 default 값은 200ms이다.

> -XX:G1HeapRegionSize=n

* n은 1~64까지 2의 제곱수 값이다. (단위 : mb)

---

## Summary

* 요즘엔 JVM을 사용한다면 

  아마도 G1 GC를 사용하는 게 일반적이지 않을까 생각이 든다.

  그만큼 G1 GC에 대해서는 잘 알고 있어야 하는 게 중요하다는 생각이 든다.


---

## Reference

* [자바 최적화 (Optimizing Java,가장 빠른 성능을 구현하는 검증된 10가지 기법)](https://book.naver.com/bookdb/book_detail.nhn?bid=14796595)

* [Detailed G1 garbage collector](https://www.codetd.com/en/article/8877593)

* [Garbage First Garbage Collector (G1 GC): Current and Future Adaptability and Ergonomics.](https://www.slideshare.net/MonicaBeckwith/con5497)

* [Some key technologies of Java Hotspot G1 GC](https://www.programmersought.com/article/54314098742/)