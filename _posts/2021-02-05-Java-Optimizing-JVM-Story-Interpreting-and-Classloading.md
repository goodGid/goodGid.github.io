---
layout: post
title:  " [Java Optimizing] 2. JVM 이야기 : Interpreting과 Class Loading "
categories: JavaOptimizing
author: goodGid
---
* content
{:toc}

> 이 글은 [자바 최적화 (Optimizing Java,가장 빠른 성능을 구현하는 검증된 10가지 기법)](https://book.naver.com/bookdb/book_detail.nhn?bid=14796595) 책을 학습한 내용을 토대로 작성되었습니다.

## Prologue

* JVM에서 Interpreting과 Class Loading 작업이 어떻게 동작하는지에 대해 학습해보자.

---

## Interpreting

* JVM은 스택 기반의 해석 머신이다.

  일부 결과를 실행 스택에 보관하며

  이 스택의 맨 위에 쌓인 값을 가져와 계산한다.

* JVM Interpreter의 기본 로직은

  평가 스택을 이용해 중간값들을 담아두고

  가장 마지막에 실행된 명령어와 
  
  독립적으로 프로그램을 구성하는 Opcode를 하나씩 순서대로 처리하는

  *while문 안의 switch* 문이다.

  // Opcode(Operation Code) : 기계어 일부로서 수행할 명령어를 나타내는 부호

---

## Class Loading

```
java HelloWorld 명령을 입력하면
Java Application이 실행되고
OS는 JVM을 구동시킨다.

JVM이 구성되고
스택 머신이 초기화된 다음
실제로 유저가 작성한 HelloWorld 클래스 파일이 실행된다.

그리고 HelloWorld.class에 있는 main( ) 메서드가 
Application의 진입점이므로

제어권을 이 클래스로 넘기려면
JVM이 실행되기 전에 
해당 클래스를 Load 해야 한다.
```

* 이 시점에 Java의 **Class Loading** 매커니즘이 관여한다.

* 자바 프로세스가 새로 초기화되면

  사슬처럼 줄지어 연결된 클래스로더가 차례차례 작동한다.

![](/assets/img/java/Java-Class-Loader_1.png)

* 제일 먼저 

  **Bootstrap 클래스**가

  자바 런타임 코어 클래스를 로드한다.

* Bootstrap 클래스로더의 주 임무는

  다른 클래스로더가 필요로 하는 **최소한**의 **필수 클래스**만 로드하는 것이다.

  ex) java.lang.Object, Class, Classloader

<br>

* 그다음 **Extension 클래스로더**가 생긴다.

  Bootstrap 클래스로더를 자기 부모로 설정하고

  필요 시 클래스로딩 작업을 부모에게 넘긴다.

  // Extension.class *extends* Bootstrap.class

<br>

* 끝으로 **Application 클래스로더**가 생성되고

  지정된 클래스패스에 위치한 유저 클래스를 로드한다.

  일반적으로 99%는 Application에 존재한다.


<br>

* 자바는 프로그램 실행 중 

  처음보는 새 클래스를 **디펜던시(의존체)**에 로드한다.

* 클래스를 찾지 못한 클래스로더는

  기본적으로 자신의 부모 클래스로더에게 **룩업(LookUp)** 요청을 한다.

  이렇게 부모의 부모로 거슬러 올라가 결국 Bootstrap도 룩업하지 못하면
  
  ClassNotFoundException 예외가 발생한다.

> Application -> Extension -> Bootstrap -> ClassNotFoundException
  

### Example

> GidhubApplication

``` java
@SpringBootApplication
public class GidhubApplication {
    public static void main(String[] args) {
        ClassLoader classLoader = GidhubApplication.class.getClassLoader();
        System.out.println(classLoader.getParent().getParent());
        System.out.println(classLoader.getParent());
        System.out.println(classLoader);   
    }
}
```

> Output

``` java
classLoader.getParent().getParent() : null
classLoader.getParent()             : sun.misc.Launcher$ExtClassLoader@31d3619b
classLoader                         : sun.misc.Launcher$AppClassLoader@18b4aac2
```

---

## Summary

* Interpreting과 Class Loading 개념에 대해 알아보았다.

* 추가로 클래스 로더와 관련해서 기존에 작성했던 글이 있는데 함께 읽어보는 걸 추천한다.

  [클래스 로더(Class Loader)]({{site.url}}/Java-Class-Loader/#%EB%A1%9C%EB%94%A9-loading)



---

## Reference

* [자바 최적화 (Optimizing Java,가장 빠른 성능을 구현하는 검증된 10가지 기법)](https://book.naver.com/bookdb/book_detail.nhn?bid=14796595)