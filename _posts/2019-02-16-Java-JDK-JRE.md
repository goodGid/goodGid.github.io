---
layout: post
title:  " JDK와 JRE의 차이점 "
categories: Java
author: goodGid
---
* content
{:toc}

* 자바를 시작하면서 JDK와 JRE 키워드 개념이 헷갈렸다.

* 굉장히 간단하다.

* 요약하자면 다음과 같다.

* **JDK = JRE + @** 이며

* **JRE는 읽기** 전용, **JDK 읽기 / 쓰기** 전용이라 생각할 수 있다.





---

## JVM

> JVM : Java Virtual Machine

* JRE와 JDK 개념을 알아보기전에 JVM에 대해 먼저 알아보자.

* JVM은 자바 소스코드로부터 만들어지는 자바 바이트 코드를 실행할 수 있다. 

* 또한 JVM은 플랫폼에 의존적이다. 

* 즉 리눅스의 JVM과 윈도우즈의 JVM은 다르다. 

* 단 컴파일된 바이코드는 어떤 JVM에서도 동작시킬 수 있다.

* JVM은 역할은 다음과 같다.

    - 바이코드를 읽는다.

    - 바이코드를 검증한다.

    - 바이코드를 실행한다.

    - 실행환경(Runtime Environment)의 규격을 제공한다. (필요한 라이브러리 및 기타파일)



---

## JRE 개념

> JRE(Java Runtime Enviroment) : 컴파일된 자바 프로그램을 실행시킬 수 있는 자바 환경

* JRE는 JVM이 자바 프로그램을 동작시킬 때 필요한 라이브러리 파일들과 기타 파일들을 가지고 있다. 

* JRE는 JVM의 실행환경을 구현했다고 할 수 있다.

* 자바 프로그램을 **실행**시키기 위해선 JRE를 반드시 설치해야한다.

* 하지만 **자바 프로그래밍 도구**는 포함되어있지 않기 때문에 **자바 프로그래밍**을 하기 위해선 JDK가 필요하다.



![](/assets/img/java/java_jdk_jre_1.png)


---

## JDK 개념

> JDK(Java Development kit) : 자바 프로그래밍시 필요한 컴파일러 등 포함

* JDK는 개발을 위해 필요한 도구(javac, java등)들을 포함한다.

* JDK를 설치하면 JRE도 같이 설치가 된다.

* 즉 **JDK = JRE + @** 라고 생각하면 된다.

![](/assets/img/java/java_jdk_jre_2.png)


---

## Reference

* [JVM, JRE, JDK의 차이](https://wikidocs.net/257)

* [JDK와 JRE의 차이점](https://bvc12.tistory.com/116)