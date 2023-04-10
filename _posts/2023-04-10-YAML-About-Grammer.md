---
layout: post
title:  " YAML 파일에서 '>'와 '|'의 차이를 아시나요? "
categories: Technology
author: goodGid
---
* content
{:toc}

## Question

* YAML 파일에서 '>'와 '\|'의 차이를 아시나요? 


---


## Answer

* 구구절절 말하기보단 코드로 간결하게 알아보자.

> application.yaml

``` yaml
withGreater: >
  '>'를 사용하는
  예제 케이스

withPipe: |
  '|'를 사용하는
  예제 케이스
```

> Controller

``` java
@Slf4j
@RestController
public class DemoController {
    @Value("${withGreater}")
    private String withGreater;

    @Value("${withPipe}")
    private String withPipe;

    @GetMapping("/demo")
    public void demo() {
        log.info(withGreater);
        log.info(withPipe);
    }
}
```

> Output

![](/assets/img/tech/YAML-About-Grammer_1.png)


---

## Summary

* '>'를 사용하면 여러 줄의 문자열을 한 줄로 표현한다.

  즉 YAML 파서는 각 줄의 끝에 있는 개행 문자를 제거하여 하나의 문자열로 읽는다.

* '\|'를 사용하면 여러 줄의 문자열을 있는 그대로 유지한다.

  즉 YAML 파서는 개행 문자를 포함하여 원래의 문자열 그대로 읽는다.
