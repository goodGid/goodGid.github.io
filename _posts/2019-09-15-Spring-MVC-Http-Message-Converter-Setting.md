---
layout: post
title:  " Spring MVC - HttpMessageConverter 설정하기 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## HttpMessageConverter 설정

* 스프링 MVC 설정(**WebMvcConfigurer**)에서 설정할 수 있다.

### ConfigureMessageConverters

* 기본 Message Converter를 대체한다.

* 기본적인 Message Converter를 대체하기 때문에

* 사용하는데 주의가 필요하다.

### ExtendMessageConverters

* 기본 Message Converter에

* 등록하고자 하는 Message Converter를 추가한다.


``` java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new 자신이_정의한_Converter());
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new 자신이_정의한_Converter());
    }
}
```

---


## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

