---
layout: post
title:  " [Gradle] Stacktrace 옵션을 선언하면 뭐가 달라질까? "
categories: Gradle
author: goodGid
---
* content
{:toc}

## [Gradle Debugging options](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:command_line_debugging)

![](/assets/img/gradle/Gradle-Option-Stacktrace_1.png)

* [Docs](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:command_line_debugging)를 보면 다음과 같이 정의가 되어있다.

  **Print out the stacktrace also for user exceptions (e.g. compile error). See also [logging options](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:command_line_logging).**

* 즉 exception이 발생했을 때 stacktrace를 출력시켜준다. 

  빌드 과정에서 발생한 에러에 대한 stacktrace는 
  
  문제를 해결하는 데 있어 굉장히 중요한 해결의 실마리가 된다.

  그러므로 일반적으로 Gradle로 프로젝트를 빌드 시 **stacktrace** 옵션을 준다.



---

### Usage

> 일반적인 프로젝트

``` gradle
./gradlew clean --stacktrace
```

* 일반적인 프로젝트일 경우엔 위 옵션으로 Gradle 빌드를 할 수 있다.

---

> Multi Module 구조

``` gradle
./gradlew clean :module-api:buildNeeded --stacktrace
```

* Multi Module 구조의 프로젝트일 경우엔

  어떤 Module을 Gradle로 Build 할지 정해야 한다.

---

### Example

> 사진이 잘 안 보이신다면 "사진 우클릭 --> 새 탭으로 보기"를 눌러보세요 !

#### stacktrace 옵션 사용 O

![](/assets/img/gradle/Gradle-Option-Stacktrace_2.png)

* 예외가 발생하면 stacktrace가 노출된다.

---

#### stacktrace 옵션 사용 X

![](/assets/img/gradle/Gradle-Option-Stacktrace_3.png)

* 예외가 발생하면 아주 단순하게 **BUILD FAILED**가 뜨면서 동작이 멈춘다.

* 만약 프로젝트가 무겁고 복잡하다면

  문제점을 찾기 위해 한 번 더 빌드를 하는 등 

  불필요한 시간을 더 써서 문제를 파악해야 한다.

---

## Summary

* 글의 제목이자 질문이었던 **Stacktrace 옵션을 선언하면 뭐가 달라질까?**에 대해 답을 해보자면

  stacktrace 옵션을 사용하면 exception에 대한 log를 볼 수 있다.

  매우 중요한 옵션이니 Gradle을 사용하여 프로젝트를 빌드한다면 반드시 사용하자 !