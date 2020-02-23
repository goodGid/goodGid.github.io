---
layout: post
title:  " 클래스 로더(Class Loader) "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

![](/assets/img/java/Java-Class-Loader_1.png)

* 크게 보면 로딩 -> 링크 -> 초기화 순서로 진행된다.

## 로딩 (Loading)

* 클래스 로더가 **.class** 파일을 읽고 

* 그 내용에 따라 적절한 바이너리 데이터를 만들고

* [Method 영역]({{site.url}}/Java-JVM/#메서드-영역)에 저장한다.

> Method 영역에 저장하는 데이터

1. Type 정보 (클래스, 인터페이스, Enum)

2. 메소드와 변수

3. FQCN (Fully Qualified Class Name)

``` java
package goodgid.gidhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GidhubApplication {
    public static void main(String[] args) {
        // FQCN 사용
        org.springframework.boot.SpringApplication.run(GidhubApplication.class, args);

        // FQCN 사용 X
        SpringApplication.run(GidhubApplication.class, args);
    }
}
```







<br>

* 로딩이 끝나면

* 해당 Class Type의 **Class 객체**를 생성하여

* **힙 영역**에 저장한다.
 
<br>

### 로딩 순서

* 3가지의 클래스 로더가 있다.

1. Bootstrap

2. Extension

3. Application

<br>

* Bootstrap -> Extension -> Application 순서로 찾게 된다.

* Bootstrap에 존재하는지 

* 없다면 Extension에 존재하는지

* 없다면 Application에 존재하는지

* 일반적으로 99%는 Application에 존재한다.

<br>

> Q. 만약 찾지못한다면?

* **ClassNotFoundException** 발생하게 된다.


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

* *classLoader.getParent().getParent()* 는 native로 되어있기 때문에

* java 코드로는 확인이 불가능하다.





## 링크 (Linking)

* 링크 작업은 3단계로 이뤄진다.

* Verify -> Prepare -> Resolve



### Verify 

* 혹시라도 바이트 코드를 수정했을 수 있기 때문에

* **.class 파일** 형식이 유효한지 체크한다.



### Prepare

* 클래스 변수(static 변수)와 기본값에 필요한 **메모리**를 준비하는 과정이다.



### Resolve

* Optional이다.

* 사용하는 환경에 따라 동작 유무가 정해진다.

<br>

* 심볼릭 메모리 레퍼런스를 

* 메소드 영역에 있는 **실제 레퍼런스**로 교체한다.



``` java
public class GidhubApplication {
    HelloGid helloGid = new HelloGid();

    public static void main(String[] args) {
        SpringApplication.run(GidhubApplication.class, args);
    }
} 
```

* HelloGid helloGid = new HelloGid()에서 

* new HelloGid() 부분은

* 실제 레퍼런스를 가리키진 않는다.

* 그렇기 때문에 

* 실제 힙에 들어있는 인스턴스를 가리키는 작업을 

* Resolve 시점에 해주게 된다.





## 초기화 (Initialization)

* 링크에서 Prepare 단계에서 확보한 메모리 영역에

* 클래스의 static 값들을 할당한다. 


## Summary

* Class Loader에 대해 간략하게 알아봤다.

* Class Loader와 관련해서

* [JVM의 구조]({{site.url}}/Java-JVM)에 대해서도 학습해보자.


---

## 참고

* [더 자바, 코드를 조작하는 다양한 방법](https://www.inflearn.com/course/the-java-code-manipulation#)
