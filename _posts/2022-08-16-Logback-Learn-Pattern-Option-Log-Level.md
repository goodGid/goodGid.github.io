---
layout: post
title: " [Logback] Logback Pattern에서 사용하는 옵션 알아보기 :: %-{n}level "
categories: Logback
author: goodGid
---
* content
{:toc}

## Goal

* Logback Pattern에서 자주 사용하는 Option에 대해 학습해보자.



## Project Code

* 이 글에서 다루는 코드는 [Github Repository](https://github.com/goodGid/Spring-Boot-2.7.3-Logback-Template)에서 다운받을 수 있습니다.

* 만약 위 프로젝트를 사용한다면

  profile에 local 혹은 prod 값을 넣어줘야 정상적으로 서버가 뜨게 됩니다.

  ![](/assets/img/logback/Logback-How-to-use-values-in-MDC_1.png)

> Environment

* Java 11

* Spring Boot 2.7.3

* Gradle 7.5

* Logback 1.2.11

---

## Logback Pattern Options

### %-{n}level

* %-{n}level의 의미는 Log Level 기록 시 

  **최소 n 자리**는 무조건 기록하라는 뜻으로 해석할 수 있다.

* 만약 **%-5level** 설정을 하게 되면 다음과 같이 

  4글자의 Log Level은 공백을 포함하여 5글자를 맞추게 된다.

  ex) "INFO_" , "DEBUG"
  
> [logback-spring-local.xml](https://github.com/goodGid/Spring-Boot-2.7.3-Logback-Template/blob/main/src/main/resources/logback-spring-local.xml)

``` xml
<encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
  <pattern>[%-5level] %d{yyyy-MM-dd HH:mm:ss} [%thread] [%logger{0}:%line] - %msg%n</pattern>
  <outputPatternAsHeader>true</outputPatternAsHeader>
</encoder>

[INFO ] 2022-08-12 20:46:39 [http-nio-8080-exec-1] [DemoController:17] - log --> INFO
[WARN ] 2022-08-12 20:46:39 [http-nio-8080-exec-1] [DemoController:18] - log --> WARN
[ERROR] 2022-08-12 20:46:39 [http-nio-8080-exec-1] [DemoController:19] - log --> ERROR
```

---

* 만약 -5가 아니라 -3을 준다면 어떻게 될까?

``` xml
<encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
  <pattern>[%-3level] %d{yyyy-MM-dd HH:mm:ss} [%thread] [%logger{0}:%line] - %msg%n</pattern>
  <outputPatternAsHeader>true</outputPatternAsHeader>
</encoder>

[INFO] 2022-08-12 20:49:26 [http-nio-8080-exec-4] [DemoController:17] - log --> INFO
[WARN] 2022-08-12 20:49:26 [http-nio-8080-exec-4] [DemoController:18] - log --> WARN
[ERROR] 2022-08-12 20:49:26 [http-nio-8080-exec-4] [DemoController:19] - log --> ERROR
```

* 최소 3자리 이상 기록을 하면 되는데

  Log의 Level이 4글자, 5글자이므로

  INFO와 WARN은 4글자만 기록

  ERROR는 5글자를 기록하게 된다.

---

## Summary

* 일반적으로 회사에서는 5자리를 설정한다.

  그러므로 특별한 이유가 없다면 5자리로 설정을 하자 !