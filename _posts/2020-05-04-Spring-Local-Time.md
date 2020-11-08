---
layout: post
title:  " Spring Boot Local Time 설정 : UTC에서 변경이 되지 않는다. "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## Situation

* Spring 서버를 배포하고 Log를 보는데 KST가 아닌 UTC로 로그가 남았다.



---


## Troubleshooting

* 처음엔 Ubuntu에 들어가서 [심볼릭 링크 방법]({{site.url}}/Ubuntu-Change-Local-Time/#1st-method)으로 해결을 하려했다.

* 그런데 Shell 환경에서는 정상적으로 KST로 변경되었는데 

  Spring 서버에서는 여전히 UTC였다.

* 그래서 그 다음으로 프로젝트 다음 코드를 추가하였다.

``` java
@SpringBootApplication
public class OdotApplication {

    @PostConstruct
    void started() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }

    public static void main(String[] args) {
        SpringApplication.run(OdotApplication.class, args);
    }

}
```

* 하지만 여전히 Spring 서버의 Time Zone은 UTC였다.

* 그래서 다음으로 [Dpkg-reconfigure 방법](({{site.url}}/Ubuntu-Change-Local-Time/#2st-method))으로 Time Zone을 변경해주니 KST로 변경되었다.

![](/assets/img/spring/Spring-Local-Time_1.png)

## Summary

* 정확히 어떤 원이이 있었고 

  왜 해결되었는지 모르겠어서 찝찝해서 열심히 구글링을 해봤지만 여전히 의문이다.