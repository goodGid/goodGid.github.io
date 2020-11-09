---
layout: post
title:  " 링크(Link) 저장용 : Store for links "
categories: Technology
author: goodGid
---
* content
{:toc}




## Test Code

* [Mockito @Mock @MockBean @Spy @SpyBean 차이점 정리](https://cobbybb.tistory.com/16)


---


## Java

### Generic

> [JAVA/Generic](https://cla9.tistory.com/category/JAVA/Generic)

* Summary

```
이거 무조건 읽어보자.
진짜 글이 너무 좋다.
총 7개 글이 있는데
글마다 2번씩 읽었다.
```


* [Wildcard with extends(상위 경계)](https://cla9.tistory.com/46?category=814455)

  = Upper bounded wildcard

  = <? extends T>

* [Wildcard with super(하위 경계)](https://cla9.tistory.com/48?category=814455) 

  = Lower bounded wildcard

  = <? super T>

* Summary

```
다음과 같은 관계라고 가정을 해보자.
[ Object ⊂ Number ⊂ Integer ]
 
그리고 다음과 같은 속성을 갖고 있다고 가정을 해보자.
Object has a
Number has a,b

그러면 다음처럼 생각할 수 있다.
- Object에서 어떤 Write를 하더라도 Number는 Care가 가능하다.
- 하지만 Object에서 Read는 Number의 b는 읽을 수 없기 때문에 다소 위험하다.
```

* 그러므로 다음처럼 정리할 수 있다.

```
if you want to `Write` operation
--> Use <? super T>

if you want to `Read` operation
--> Use <? extends T>
```

* 이와 관련된 예제는 [Wildcard with super(하위 경계)](https://cla9.tistory.com/48?category=814455) 글에서 "Get and Put Principle" 부분을 참고하자.


---

> [자바 제네릭 이해하기 Part 1](https://yaboong.github.io/java/2019/01/19/java-generics-1/)

* Summary

```
전체적으로는 알고있던 내용들이였다.
다만 아래 2가지는 다시 봐도 괜찮을 듯 

1. 제네릭을 사용할 수 없는 경우
2. static 메서드 with 제네릭 주의사항
  "static 메서드에서 제네릭을 사용하려면 아래처럼 제네릭 메서드로 정의해야 한다." --> 왜 그래야하는지 이유를 알면 된다.
```

---

> [[Java] Java의 Generics](https://medium.com/@joongwon/java-java%EC%9D%98-generics-604b562530b3)

* 매우 좋은 글이다. 

  Generics 개념이 모호하면 다시 읽어보자 !

* Summary

```
실 타입 매개변수(Actual type parameter) : 꺾쇠 괄호<>안에 있는 String을 뜻한다.
형식 타입 매개변수(Formal type parameter) : List 인터페이스에 선언되어 있는 List<E>의 E를 뜻한다.
바운드 타입 매개변수(Bounded type parameter) : 특정 타입으로 제한한다는 의미이다.

바운드 와일드카드 타입(Bounded wildcard type) :  Upper bounded wildcard와 Lower bounded wildcard가 있다.  
언바운드 와일드카드 타입(Unbounded wildcard type) : List<?>와 같은 타입이다.
```

* 바운드 와일드카드 타입(Bounded wildcard type)

  예시는 블로그를 참고하자.

```
- Upper bounded wildcard 
  공변(covariant)
  ex) Collection 계열 클래스들의 소스코드를 살펴보면 자주 볼 수 있는 <? extends T>

- Lower bounded wildcard
  반공변(contravariance)
  ex) <? super T>

- 공변 (covariant)
  구체적인 방향으로 타입 변환을 허용하는 것 
  (자기 자신과 자식 객체만 허용)
  ex) <? extends T>

- 반공변 (contravariant)
  추상적인 방향으로의 타입 변환을 허용하는 것
  (자기 자신과 부모 객체만 허용) 
  ex) <? super T>

- 무공변(invariant)
  오로지 자기 타입만 허용하는 것 
  ex) <T>
```

* 제네릭 메소드

```
제네릭 메소드의 타입 매개변수를 선언할 때 
타입 매개변수의 위치는 
메소드의 접근 지시자와 반환 타입 사이이다.
```




---

### TypeReference

> [Super Type Tokens in Java Generics](https://www.baeldung.com/java-super-type-tokens)

* Summary

```
TypeReference를 왜 사용하는지에 대한 질문에 대한 답이라고 생각되는 글이다.
```

* Example

``` java
TypeReference<Map<String, Integer>> token = new TypeReference<Map<String, Integer>>() {};
Type type = token.getType();
 
assertEquals("java.util.Map<java.lang.String, java.lang.Integer>", type.getTypeName());
 
Type[] typeArguments = ((ParameterizedType) type).getActualTypeArguments();
assertEquals("java.lang.String", typeArguments[0].getTypeName());
assertEquals("java.lang.Integer", typeArguments[1].getTypeName());
```


---

### JVM

* [Why do JVM arguments start with “-D”?](https://stackoverflow.com/questions/44745261/why-do-jvm-arguments-start-with-d)

![](/assets/img/tech/Store-For-Links-JVM_1.png)


* [Understanding Java Garbage Collection Logging: What Are GC Logs and How To Analyze Them](https://sematext.com/blog/java-garbage-collection-logs/#toc-gc-logging-options-in-java-9-and-newer-7)

![](/assets/img/tech/Store-For-Links-JVM_2.png)

---

## Spring

### Batch

* [StepExecution](https://docs.spring.io/spring-batch/docs/current/reference/html/domain.html#stepexecution)

* [Configuring and Running a Job](https://docs.spring.io/spring-batch/docs/current/reference/html/job.html#configureJob)

* [Meta-Data Schema](https://docs.spring.io/spring-batch/docs/3.0.x/reference/html/metaDataSchema.html)


---


## Cache

## Ehcache

* [Using Ehcache 3 in Spring Boot](https://springframework.guru/using-ehcache-3-in-spring-boot/)

![](/assets/img/tech/Store-For-Links-Spring_Cache_1.png)

* [EHCache를 이용한 캐시 구현](https://javacan.tistory.com/entry/133)

---

## Build Automation Tool

### Gradle

* [What's the difference between implementation and compile in Gradle?](https://stackoverflow.com/questions/44493378/whats-the-difference-between-implementation-and-compile-in-gradle)

---

## Hibernate

### First Level
* [Hibernate First Level Cache example using Spring Boot](https://www.netsurfingzone.com/hibernate/hibernate-first-level-cache-example-using-spring-boot/#Basic_points_about_Hibernate_First_Level_Cache)


### Second Level

* [Hibernate Second-Level Cache](https://www.baeldung.com/hibernate-second-level-cache)

* [How Hibernate Second Level Cache Works?](https://howtodoinjava.com/hibernate/how-hibernate-second-level-cache-works/)


---

## Jenkins

* [How to Install Jenkins on CentOS 7](https://linuxize.com/post/how-to-install-jenkins-on-centos-7/)

* [Install Jenkins In 5 Simple Steps | Jenkins Installation | Edureka](https://www.edureka.co/blog/install-jenkins/)

  - wget http://updates.jenkins-ci.org/download/war/2.7.3/jenkins.war


---

## JDBC

* [Introduction to JDBC](https://www.baeldung.com/java-jdbc)


---

## Fork/Join Framework

> [Guide to the Fork/Join Framework in Java](https://www.baeldung.com/java-fork-join)

* Keyword

```
- Java 7/8에서 사용법 
- RecursiveAction
- RecursiveTask
```

* Thread 실행 방법 3가지

``` java
// Case 1 : execute & join
forkJoinPool.execute(customRecursiveTask);
int result = customRecursiveTask.join();

// Case 2 : invoke
int result = forkJoinPool.invoke(customRecursiveTask);

// Case 3 : fork & join
customRecursiveTaskFirst.fork(); // The fork() method submits a task to a pool
result = customRecursiveTaskLast.join();
```

---


> [Java Tip: When to use ForkJoinPool vs ExecutorService](https://www.infoworld.com/article/2078440/java-tip-when-to-use-forkjoinpool-vs-executorservice.html)

* Summary

```
테스트하고 성능 비교 정도의 글이네

개념을 익히는 부분에 있어서는 큰 도움 X
다시 볼 필요 없을 듯

Web Crawlers를 예시로 
ForkJoinPool와 ExecutorService를 설명한다.

Java 6 => ExecutorService 
Java 7 => ForkJoinPool.
```

* Fork/Join's logic

```
(1) separate (fork) each large task into smaller tasks
(2) process each task in a separate thread (separating those into even smaller tasks if necessary)
(3) join the results.
```



---


## JPA

> [An Overview of Identifiers in Hibernate/JPA](https://www.baeldung.com/hibernate-identifiers)

* Keyword

```
- @GeneratedValue

- AUTO, IDENTITY, SEQUENCE, TABLE

- Custom Generator

- Composite Identifiers
    @EmbeddedId
    @IdClass

- Derived Identifiers
    @MapsId
```