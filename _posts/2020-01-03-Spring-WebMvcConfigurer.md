---
layout: post
title:  " WebMvcConfigurer을 상속하면 무엇이 달라질까? "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## 글의 목표

* WebMvcConfigurer을

* 왜 구현하고

* 구현하면 어떤 점이 좋아지는지에 대해 알아보자.







## Qeustion

* 많은 프로젝트에서

* WebMvcConfigurer를 구현하는 경우를 많이 본다.

* 왜 구현하는걸까?

* 그 이유가 뭘까?

* 단순히 사람들이 사용하니까

* 나도 써야지 자세가 아닌

* 왜 사용하는건지 제대로 알고 사용해보자.


## WebMvcConfigurer

* [@EnableWebMvc]({{site.url}}/Spring-Enable-MVC-Annotation/)를 사용하면

* ViewResolver 값이 자동으로 등록된다.

* 등록된 세팅을 A라고 하자.

<br>

* 이 상황에서 A 값에 

* 추가적인 세팅을 더 하고 싶다.

* 하지만

* @EnableWebMvc만 사용하는 경우에는 불가능하다.

<br>

* 만약 추가적인 세팅이 필요하다면

* A 세팅과 똑같은 Bean을 구현하고

* 거기에 원하는 추가적인 세팅을 해서

* customViewResolver()과 같은

* Bean을 직접 정의해야한다.

``` java
@Bean
public ViewResolver customViewResolver() {
    InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
    internalResourceViewResolver.setPrefix("/WEB-INF/");
    internalResourceViewResolver.setSuffix(".jsp");
    return internalResourceViewResolver;
}
```

<br>

* 매우 불편하다.

* 그래서

* WebMvcConfigurer를 사용한다.

<br>

* WebMvcConfigurer를 사용하면

* @EnableWebMvc가 세팅해주는 값에

* 추가적인 세팅들을 

* 추가할 수 있다.

* 즉 **Override**가 가능하다.

<br>

* 최종적으로 코드를 보면

* configureViewResolvers() 와 customViewResolver()는 같은 역할을 한다.

``` java
// configureViewResolvers() = @EnableWebMvc 세팅 값 + 사용자에 의한 추가 세팅
@Override
public void configureViewResolvers(ViewResolverRegistry registry) {
    registry.jsp("/WEB-INF/",".jsp");
}

// customViewResolver = @EnableWebMvc 세팅 값 직접 구현 + 사용자에 의한 추가 세팅
@Bean
public ViewResolver customViewResolver() {
    InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
    internalResourceViewResolver.setPrefix("/WEB-INF/");
    internalResourceViewResolver.setSuffix(".jsp");
    return internalResourceViewResolver;
}
```



## Answer

* Question에 대한 답을 내보자.

* WebMvcConfigurer를 구현하면

* @EnableWebMvc 어노테이션이

* 세팅해주는 여러가지의 Config 값에

* 사용자가 원하는 세팅을

* Override가 가능해진다.

* 그렇기 때문에

* WebMvcConfigurer를 구현하는 것이다.


## Code Example

> WebConfig.java

``` java
@Configuration
@ComponentScan
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

  // Case1. WebMvcConfigurer를 구현하였을 경우
  @Override
  public void configureViewResolvers(ViewResolverRegistry registry) {
    registry.jsp("/WEB-INF/",".jsp");
  }

  // Case2. WebMvcConfigurer를 구현하지 않고 직접 Bean을 정의하는 경우
  @Bean
  public ViewResolver customViewResolver() {
      InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
      internalResourceViewResolver.setPrefix("/WEB-INF/");
      internalResourceViewResolver.setSuffix(".jsp");
      return internalResourceViewResolver;
    }
}
```

* DispactcherServlet이 

* WebApplication을 사용하는데

* 사용하는 Configuration 파일이

* WebConfig인 상황이다.

* 위 문장이 이해가 가지 않는다면

* 반드시 [DispatcherServlet가 WebApplicationContext를 생성하는 2가지 방법]({{site.url}}/Spring-DispatcherServlet/)글을 읽길 바란다.

### WebMvcConfigurer 구현 X

* WebMvcConfigurer를 구현하지 않고

* 추가적인 세팅을 위해

* 새로운 Bean을 직접 정의하여 사용하는 경우를 알아보자.

<br>

* DispatcherServlet.class에서

* doService()에

* Break Point를 걸고 값을 체크해보자.

* Reference : org.springframework.web.servlet.DispatcherServlet#doService

![](/assets/img/spring/Spring-WebMvcConfigurer_1.png)

* viewResolver에 2개가 등록되어 있다.

* 우리가 정의했던 **InternalResourceViewResolver**와 

* [ViewResolverComposite](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/view/ViewResolverComposite.html)가 등록되어 있다.

<br>

* 그런데

* ViewResolverComposite는 어디서 등록되는 걸까?

<br>

* 다음 순서로 코드를 살펴보면

* 등록되는 위치를 알 수 있다.

* @EnableWebMvc -> DelegatingWebMvcConfiguration -> WebMvcConfigurationSupport

<br>

* 만약 위의 순서대로 살펴보는 이유가

* 이해가지 않는다면

* WebConf에서 

* @EnableWebMvc을 사용하고 있다는 점을 기억하며

* [@EnableWebMvc]({{site.url}}/Spring-Enable-MVC-Annotation/)글을 참고하자.

> WebMvcConfigurationSupport#mvcViewResolver()

``` java
@Bean
public ViewResolver mvcViewResolver(
  @Qualifier("mvcContentNegotiationManager") ContentNegotiationManager contentNegotiationManager) {
    ViewResolverRegistry registry = new ViewResolverRegistry(contentNegotiationManager, this.applicationContext);
    this.configureViewResolvers(registry);
    if (registry.getViewResolvers().isEmpty() && this.applicationContext != null) {
        String[] names = BeanFactoryUtils.beanNamesForTypeIncludingAncestors(this.applicationContext, ViewResolver.class, true, false);
        if (names.length == 1) {
            registry.getViewResolvers().add(new InternalResourceViewResolver());
        }
    }

    ViewResolverComposite composite = new ViewResolverComposite();
    composite.setOrder(registry.getOrder());
    composite.setViewResolvers(registry.getViewResolvers());
    if (this.applicationContext != null) {
        composite.setApplicationContext(this.applicationContext);
    }

    if (this.servletContext != null) {
        composite.setServletContext(this.servletContext);
    }

    return composite;
}
```






### WebMvcConfigurer 구현 O

* 이번에는 

* WebMvcConfigurer를 구현하여

* 추가적인 세팅값을

* Override하는 형식으로 진행해보자.

<br>

* 위와 마찬가지로

* DispatcherServlet.class에서

* doService()에

* Break Point를 걸고 값을 체크해보자.

* Reference : org.springframework.web.servlet.DispatcherServlet#doService

![](/assets/img/spring/Spring-WebMvcConfigurer_2.png)

* viewResolver에 1개만 등록되어 있다.

* 우리가 정의했던 **InternalResourceViewResolver**는 사라졌다.

> Why?

* WebMvcConfigurer를 상속하여

* 추가적인 세팅을 Override하였기 때문에

* 더이상 새롭게 Bean을 정의할 필요가 없어졌기 때문이다.

<br>

* 대신에 Override했던 값은

* [ViewResolverComposite](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/view/ViewResolverComposite.html)안에 

* viewResolvers에 담겨져있음을 확인할 수 있다.


## Summary

* WebMvcConfigurer을 상속하여 

* 구현함으로써

* 무엇이 달라졌는지 알아봤다.

<br>

* 주의할 점은

* 반드시 @EnableWebMvc 어노테이션과

* 함께 사용해야할 필요는 없다.

<br>

* 단지 필자의 프로젝트 구성에서

* @EnableWebMvc와 WebMvcConfigurer을 같이 사용하여서

* 예시로 들었을 뿐이다.

<br>

* 앞으로는 

* WebMvcConfigurer를 

* 왜 상속하는지

* 왜 Override하는지 등등

* 그 이유를 정확하게 인지하여

* 사용하도록 하자

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)