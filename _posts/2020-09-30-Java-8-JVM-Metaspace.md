---
layout: post
title:  " Java 8에서 JVM의 변화 : PermGen이 사라지고 Metaspace가 등장하다. "
categories: Java
author: goodGid
---
* content
{:toc}

> 해당 글은 책과 강의를 바탕으로 작성하였습니다.

## Prologue

* Java 8가 나오면서 JVM 영역에서 변화가 있었다.

  JVM의 여러 메모리 영역 중에 
  
  Permanent Generation 메모리 영역이 없어지고 Metaspace 영역이 생겼다.



---

## Permanent Generation

* [Permanent Generation]({{site.url}}/Java-Garbage-Collection-(1)/#jvm-메모리-구조)은 Class 혹은 Method Code가 저장되는 영역이다.

* [PermGen은 Heap 영역에 속한다.](https://dzone.com/articles/permgen-and-metaspace#:~:text=PermGen%20is%20an%20abbreviation%20for,Metaspace%20%2D%20with%20some%20subtle%20differences.)

* Default로 제한된 크기를 갖고 있다.

![](/assets/img/java/Java-8-JVM-Metaspace_1.png)

> JVM Argument

```
-XX:PermSize=N      --> PermGen Default Size 설정
-XX:MaxPermSize=N   --> PermGen Max Size 설정
```

---

## Metaspace

* Metaspace는 Java의 Classloader가 

  현재까지 로드한 Class들의 Metadata가 저장되는 공간이다.

* 중요한 건 Heap 영역이 아니라 **Native 메모리 영역**에 위치한다.

* Default로 제한된 크기를 가지고 있지 않다. 

  그래서 필요한 만큼 계속 늘어난다.

* Java 8부터는 PermGen 관련 JVM 옵션은 무시한다.

> JVM Argument

```
-XX:MetaspaceSize=N    --> Metaspace Default Size 설정
-XX:MaxMetaspaceSize=N --> Metaspace Max Size 설정
```

---

### Java 메모리 구조

![](/assets/img/java/Java-8-JVM-Metaspace_2.jpg)

* 우선 위 그림을 보면 JVM Option이 어떤 영역을 제어하는지 알 수 있다.

* 그런데 여기서 주목해야 하는 부분은 **Heap**과 **Metaspace**이다.

* 참고로 다음 키워드는 Metaspace와 같다.
  
  (= Native Area, Native Memory, Off-Heap, Non-heap, Direct Memory 등 )

  그리고 이 영역을 **시스템의 기본 메모리**라고 생각하면 된다.

---

### Java 메모리 설정

* Java 어플리케이션은 크게 Heap과 Metaspace 두 공간을 활용하여 동작한다.

  그러므로 어플리케이션 메모리를 결정하기 위해서는

  단순히 Xmx(Heap 메모리 최대치를 결정하는 Java 옵션) 값만 생각하면 OOME에 빠지기 쉽다. 

* 실제로는 Xmx에 MaxMetaspace 값을 더하고

  추가로 프로그램에서 NIO(Non-blocking I/O)를 통해 
  
  Native Memory를 직접 할당받는 로직을 고려해서 
  
  **Heap + Metaspace** 사용량을 할당해야 비교적 정확하다. 

---

### Monitoring

* JVM 메모리 모니터링 방법 관련해서는 

  [Java Memory Profiling에 대하여 – ② 메모리 모니터링과 원인분석](https://m.post.naver.com/viewer/postView.nhn?volumeNo=24042502&memberNo=36733075) 글을 참고하자.


---

## Summary

* Metaspace는 Java 개발자에게 있어서 중요한 개념이라고 생각이 든다.

  그런 의미로 더 Deep하게 공부해봐야겠다.


---

## Reference

* [더 자바, Java 8](https://www.inflearn.com/course/the-java-java8)

* [PermGen and Metaspace](https://dzone.com/articles/permgen-and-metaspace)

* [Java Memory Profiling에 대하여 – ① JVM 메모리 이해와 케이스 스터디](https://m.post.naver.com/viewer/postView.nhn?volumeNo=23726161&memberNo=36733075)

* [Java Memory Profiling에 대하여 – ② 메모리 모니터링과 원인분석](https://m.post.naver.com/viewer/postView.nhn?volumeNo=24042502&memberNo=36733075)