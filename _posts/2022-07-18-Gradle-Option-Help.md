---
layout: post
title:  " [Gradle] Gradle에 어떤 옵션이 있는지 보는 방법 (feat. -?, -h, --help) "
categories: Gradle
author: goodGid
---
* content
{:toc}

## [Gradle Debugging options](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:command_line_debugging)

![](/assets/img/gradle/Gradle-Option-Help_1.png)

* [Docs](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:command_line_debugging)를 보면 다음과 같이 정의가 되어있다.

  **-?, -h, --help**

  **Shows a help message with all available CLI options.**



---

### Usage

> 사진이 잘 안 보이신다면 "사진 우클릭 --> 새 탭으로 열기"를 눌러보세요 !

``` gradle
./gradlew --help
```

![](/assets/img/gradle/Gradle-Option-Help_2.png)

* [1] : Gradle의 특정 버전을 사용한다면 

  위 명령어를 입력하면 사진을 보면 알 수 있듯이 해당 버전의 Gradle을 다운받게 된다.

* [2] : Gradle과 함께 사용할 수 있는 명령어들을 확인할 수 있다.


---

## Summary

* 글의 제목이자 질문이었던 **Gradle에 어떤 옵션이 있는지 보는 방법**에 대해 답을 해보자면

  [Gradle](https://docs.gradle.org/current/userguide/command_line_interface.html) 홈페이지를 참조하거나

  **-?, -h, --help** 중 원하는 옵션을 사용하면

  Gradle 빌드 시 사용할 수 있는 다양한 옵션을 확인할 수 있다.