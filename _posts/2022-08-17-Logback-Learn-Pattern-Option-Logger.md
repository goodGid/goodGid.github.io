---
layout: post
title: " [Logback] Logback Pattern에서 사용하는 옵션 알아보기 :: %logger{n} "
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

### %logger{n}

* log를 기록하는 logger에 대한 정보를 기록한다.

---

#### %logger{0}

* 패키지를 제외하고 해당 **클래스 명만** 기록한다.

> DemoController

``` java
1  package dev.be.logback.controller;
2
3  import org.springframework.web.bind.annotation.GetMapping;
4  import org.springframework.web.bind.annotation.RestController;
5
6  import lombok.extern.slf4j.Slf4j;
7
8  @Slf4j
9  @RestController
10 public class DemoController {
11
12  @GetMapping("/demo")
13  public String demo() {
14      log.trace("log --> TRACE");
15      log.debug("log --> DEBUG");
16      log.info("log --> INFO");
17      log.warn("log --> WARN");
18      log.error("log --> ERROR");
19      return "Hello";
20    }
21 }
```

> [logback-spring-local.xml](https://github.com/goodGid/Spring-Boot-2.7.3-Logback-Template/blob/main/src/main/resources/logback-spring-local.xml)

``` xml
<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
  <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
    <level>INFO</level> <!-- [1] -->
  </filter>
  <layout>
    <pattern>
      [%-5level] %d{yyyy-MM-dd HH:mm:ss} [%thread] [%logger{0}:%line] - %msg%n
    </pattern>
  </layout>
</appender>

...

<root level="DEBUG"> <!-- [2] -->
  <appender-ref ref="CONSOLE" />
</root>
```

> Output

```
[INFO ] 2022-08-12 20:49:26 [http-nio-8080-exec-4] [DemoController:16] - log --> INFO
[WARN ] 2022-08-12 20:49:26 [http-nio-8080-exec-4] [DemoController:17] - log --> WARN
[ERROR] 2022-08-12 20:49:26 [http-nio-8080-exec-4] [DemoController:18] - log --> ERROR
```

* [%logger{0}:%line]에 해당하는 실제 기록값은 "[DemoController:16]" 이다.

  우리는 logger 옵션값으로 0을 설정했으므로

  패키지를 제외하고 해당 클래스만 기록하게 된다.

* 참고로 root level은 DEBUG이지만 (= [2])

  CONSOLE Appender는 INFO level 이상만 기록하므로 (= [1])

  DemoController에서 TRACE와 DEBUG로 log를 기록하더라도 노출되지 않는다.






---

#### %logger{n} (n > 0)

* n 자리 이하까지 패키지를 포함하여 기록한다.

  그런데 기록되는 방법을 유심히 살펴봐야 한다.

> DemoController

``` java
1  package dev.be.logback.controller;
2
3  import org.springframework.web.bind.annotation.GetMapping;
4  import org.springframework.web.bind.annotation.RestController;
5
6  import lombok.extern.slf4j.Slf4j;
7
8  @Slf4j
9  @RestController
10 public class DemoController {
11
12  @GetMapping("/demo")
13  public String demo() {
14      log.trace("log --> TRACE");
15      log.debug("log --> DEBUG");
16      log.info("log --> INFO");
17      log.warn("log --> WARN");
18      log.error("log --> ERROR");
19      return "Hello";
20    }
21 }
```

> [logback-spring-local.xml](https://github.com/goodGid/Spring-Boot-2.7.3-Logback-Template/blob/main/src/main/resources/logback-spring-local.xml)

``` xml
<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
  <layout>
    <pattern>
      [%-5level] %d{yyyy-MM-dd HH:mm:ss} [%thread] [%logger{40}:%line] - %msg%n
    </pattern>
  </layout>
</appender>
...
<root level="DEBUG">
  <appender-ref ref="CONSOLE" />
</root>
```

* n에 다양한 값을 넣어 테스트를 해보면 
  
  %logger{n}에 기록되는 결과는 다음과 같다.


``` xml
[참고]
logback : 7글자
controller : 10글자
DemoController : 14글자
d.be.logback.controller.DemoController : 38글자
dev.be.logback.controller.DemoController : 40글자

[출력되는 결과]
 0 : DemoController
30 : d.b.l.c.DemoController
35 : d.b.l.controller.DemoController
36 : d.b.l.controller.DemoController
37 : d.b.logback.controller.DemoController
38 : d.be.logback.controller.DemoController
39 : d.be.logback.controller.DemoController
40 : dev.be.logback.controller.DemoController
```

* 테스트 결과를 통해 n 값에 따라 어떻게 기록되는지 살펴보면

  %logger{38} 혹은 %logger{39}로 설정하면

  가장 앞에 dev를 포함하기엔 글자 수가 부족하다.

  그러므로 dev에서 d만 기록한다.

  즉 최소한의 패키지명은 기록한다.

* 그런데 %logger{40}으로 설정하면

  이제는 모든 패키지의 Path를 Full로 기록이 가능하므로

  "dev.be.logback.controller.DemoController"를 기록한다.

---

## Summary

* **%logger{n}** 옵션에 대해 살펴봤다.

  logback을 사용한다면 반드시 사용하는 옵션이니 정확하게 이해하고 사용하도록 하자.