---
layout: post
title:  " SpringBoot 정적 리소스 자원 : 기본값 사용 및 Custom해서 사용하기 "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## Prologue

* Spring Boot에서 정적 리소스를 다루는 방법에 대해 알아본다.



---

## 정적 리소스

### 기본값

* 특별한 설정이 없다면

  Spring Boot는 기본적으로 설정된 위치에서 자동으로 파일을 찾는다.

* 여기서 기본값으로 설정된 위치는 총 **4곳**이다.

---

> 만약 4곳에 같은 리소스가 존재하면 뭐가 노출되지?

* 궁금증이 생겨서 테스트해본 결과

  4곳의 같은 리소스가 존재하면 **우선순위**가 적용되는 것을 확인했다.

  테스트 결과 우선순위는 다음과 같았다.

---

1. classpath:/META-INF/resources

2. classpath:/resources

3. classpath:/static

4. classpath:/public

> Directory

![](/assets/img/spring/Spring-Boot-Static-Resources_1.png)

> 요청 및 결과

![](/assets/img/spring/Spring-Boot-Static-Resources_2.jpg)

* 1순위인 /META-INF/resources에 있는 about.html이 노출되었다.


---


> about.html

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About</title>
</head>
<body>
[META-INF] Hello I'm goodGid !
</body>
</html>
```



---

### Custom

* 리소스 위치를 Custom하게 설정할 필요가 있다.

* 2가지 방법으로 설정을 해보자.

---

1. application.properties 값 정의

2. addResourceHandlers 재정의

---

> application.properties

![](/assets/img/spring/Spring-Boot-Static-Resources_5.jpg)

---

> addResourceHandlers

``` java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/goodgid/**")
                .addResourceLocations("classpath:/goodgid/"); // [1]
    }
}
```

* addResourceLocations에 명시한 Path에 새로운 File을 생성해준다.

![](/assets/img/spring/Spring-Boot-Static-Resources_3.png)

![](/assets/img/spring/Spring-Boot-Static-Resources_4.jpg)

---

* [1] : 주의할점이 있다.

  만약 끝에 "/"가 빠지면 해당 리소스를 찾지 못한다.

  ex) .addResourceLocations("classpath:/goodgid");

  반드시 끝에 "/"를 써줘야한다.

  ex) .addResourceLocations("classpath:/goodgid/");

---


## Summary

* 정적 리소스를 다루는 방법에 대해 알아봤다.

  특별한 설정을 하지 않는다면 4곳에 리소스를 위치하면 되고
  
  특별한 위치로 Custom을 하고 싶다면 
  
  2가지 방법이 있으나 추천하는 방법은 addResourceHandlers 메소드를 Override 하는 방법이다.

---

## Reference

* [스프링 부트 개념과 활용 : 4부 스프링 부트 활용 - 정적 리소스 자원](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)