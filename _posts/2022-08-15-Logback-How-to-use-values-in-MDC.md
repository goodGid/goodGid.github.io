---
layout: post
title: " [Logback] MDC에 있는 값을 Logback에서 사용하는 방법 (feat. %X{KEY}) "
categories: Logback
author: goodGid
---
* content
{:toc}

## Logback에서 MDC에 있는 값을 사용하는 방법

* **%X{KEY}** 문법을 사용하면 

  logback에서 MDC에 넣은 Key에 접근할 수 있다.




---

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


> MdcController

``` java
package dev.be.logback.controller;

import org.slf4j.MDC;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MdcController {

    @GetMapping("/mdc")
    public String mdc() {

        MDC.put("job", "dev");
        log.info("log --> INFO");
        MDC.clear();

        return "mdc";
    }
}
```

> [logback-spring-prod.xml](https://github.com/goodGid/Spring-Boot-2.7.3-Logback-Template/blob/main/src/main/resources/logback-spring-prod.xml)

``` xml
<appender name="MDC" class="ch.qos.logback.core.rolling.RollingFileAppender">
<file>logs/mdc.log</file>
<rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
    <fileNamePattern>${LOG_DIR}/archive/mdc.%d{yyyy-MM-dd}_%i.log</fileNamePattern>
    <maxFileSize>1KB</maxFileSize>
    <maxHistory>30</maxHistory>
</rollingPolicy>
<encoder>
    <pattern>[MDC] %X{job}%n</pattern>
    <outputPatternAsHeader>true</outputPatternAsHeader>
</encoder>
</appender>

...

<root level="INFO">
    <appender-ref ref="MDC" />
</root>
```

* logs/mdc.log 파일에 log를 남긴다.

  참고로 logs 폴더가 없어도 자동으로 생성해준다.

---

## Summary

* MdcController에 요청을 날리면

  (= curl localhost:8080/mdc)

  logs/mdc.log 파일에 **MDC Appender**에 선언한 pattern대로 log가 쌓임을 볼 수 있다.

  ``` xml
  <pattern>[MDC] %X{job}%n</pattern>
  ```

> logs/mdc.log

![](/assets/img/logback/Logback-How-to-use-values-in-MDC_2.png)