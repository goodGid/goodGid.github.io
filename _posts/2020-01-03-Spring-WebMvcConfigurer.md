---
layout: post
title:  " WebMvcConfigurer을 상속하면 무엇이 달라질까? "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## 글의 목표

* WebMvcConfigurer을

* 왜 구현하고

* 구현하면 어떤 점이 좋아지는지에 대해 알아보자.






## Q & A

### Question

* 많은 프로젝트에서 WebMvcConfigurer를 구현한다.

* 왜 구현하는걸까?

* 단순히 사람들이 사용하니까

  나도 써야지 자세가 아닌
  
  왜 사용하는건지 제대로 알고 사용해보자.


### WebMvcConfigurer

* [@EnableWebMvc]({{site.url}}/Spring-Enable-MVC-Annotation/)를 사용하면

  ViewResolver 값이 자동으로 등록된다.

<br>

* 그렇게 등록된 세팅을 A라고 하자.

* 이 상황에서 A 값에 

  추가적인 세팅을 더 하고 싶다.
  
<br>

* 만약 추가적인 세팅이 필요하다면

  A 세팅과 똑같은 Bean을 구현하고

  거기에 원하는 추가적인 세팅을 해서

  customViewResolver()과 같은

  Bean을 직접 정의해야한다.

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

* 그래서 WebMvcConfigurer를 사용한다.

<br>

* WebMvcConfigurer를 사용하면

  @EnableWebMvc가 자동적으로 세팅해주는 설정에

  개발자가 원하는 설정을 추가할 수 있게 된다.

* 즉 **Override**가 가능하다.

<br>

* 최종적으로 코드를 보면

  configureViewResolvers() 와 customViewResolver()는 **같은 역할**을 한다.

``` java
// configureViewResolvers() = @EnableWebMvc에 의한 세팅 값 + 사용자에 의한 추가 세팅
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



### Answer

* Question에 대한 답을 생각해보자.

* WebMvcConfigurer를 구현하면

  @EnableWebMvc 어노테이션이 자동으로 설정해주는 세팅 값에

  사용자가 원하는 세팅을 **추가**할 수 있게 된다.

* 그렇기 때문에 WebMvcConfigurer를 구현하는 것이다.


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
}
```

``` java
@Configuration
@ComponentScan
@EnableWebMvc
public class WebConfig {

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

* viewResolver가 필요한 상황에서

  WebMvcConfigurer 구현 유무에 따른 WebConfig의 Code 차이를 볼 수 있다.

<br>

* 일반적으로 WebMvcConfigurer은 

  WebConfig와 같은 Config 파일에서 사용된다.

* 여기서 WebConfig 파일의 존재 목적은 다음과 같다.

* DispactcherServlet을 생성할 때

  생성자 인자로 WebApplicationContext을 전달한다.

* 그런데 WebApplicationContext은

  어떤 Config 파일을 사용할 지 명시해줘야 하는데

  그 Config 값으로 일반적으로는 WebConfig를 지정한다.

* 만약 위 문장이 이해가 가지 않는다면

  반드시 [DispatcherServlet가 WebApplicationContext를 생성하는 2가지 방법]({{site.url}}/Spring-DispatcherServlet/) 글을 읽길 바란다.





### WebMvcConfigurer 구현 X

* WebMvcConfigurer를 구현하지 않고

  추가적인 세팅을 위해

  새로운 Bean을 직접 정의하여 사용하는 경우를 알아보자.

<br>

* DispatcherServlet.class에서

  doService()에

  Break Point를 걸고 값을 체크해보자.

  Reference : org.springframework.web.servlet.DispatcherServlet#doService

![](/assets/img/spring/Spring-WebMvcConfigurer_1.png)

* viewResolver에 2개가 등록되어 있다.

* 우리가 정의했던 **InternalResourceViewResolver**와 

  [ViewResolverComposite](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/view/ViewResolverComposite.html)가 등록되어 있다.

<br>

* 그런데 ViewResolverComposite는 어디서 등록되는 걸까?

* 다음 순서로 코드를 살펴보면 

  등록되는 위치를 알 수 있다.

  @EnableWebMvc -> DelegatingWebMvcConfiguration -> WebMvcConfigurationSupport

> WebMvcConfigurationSupport.class -> mvcViewResolver()

``` java
@Bean
public ViewResolver mvcViewResolver() {
    ViewResolverRegistry registry = new ViewResolverRegistry();
    registry.setContentNegotiationManager(this.mvcContentNegotiationManager());
    registry.setApplicationContext(this.applicationContext);
    this.configureViewResolvers(registry);
    if (registry.getViewResolvers().isEmpty()) {
        String[] names = BeanFactoryUtils.beanNamesForTypeIncludingAncestors(this.applicationContext, ViewResolver.class, true, false);
        if (names.length == 1) {
            registry.getViewResolvers().add(new InternalResourceViewResolver());
        }
    }

    // ViewResolverComposite을 생성하여 return 한다.
    ViewResolverComposite composite = new ViewResolverComposite();
    composite.setOrder(registry.getOrder());
    composite.setViewResolvers(registry.getViewResolvers());
    composite.setApplicationContext(this.applicationContext);
    composite.setServletContext(this.servletContext);
    return composite;
}
```

<br>

* 만약 위의 순서대로 살펴봐야하는 이유를 모르겠다면

  WebConfig에서 

  @EnableWebMvc을 사용하고 있다는 점을 기억하며

  [@EnableWebMvc]({{site.url}}/Spring-Enable-MVC-Annotation/)글을 참고하자.




### WebMvcConfigurer 구현 O

* 이번에는 WebMvcConfigurer를 구현해보자.

<br>

* 위와 마찬가지로

  DispatcherServlet.class에서

  doService()에

  Break Point를 걸고 값을 체크해보자.

  Reference : org.springframework.web.servlet.DispatcherServlet#doService

![](/assets/img/spring/Spring-WebMvcConfigurer_2.png)

* viewResolver에 1개만 등록되어 있다.

* 우리가 정의했던 **InternalResourceViewResolver**는 사라졌다.

<br>

> Why?

* WebMvcConfigurer를 상속하여

  추가하고자 하는 설정을 Override하였기 때문에

  더이상 새롭게 Bean을 추가 할 필요가 없어졌기 때문이다.

<br>

* 대신에 Override했던 값은

  [ViewResolverComposite](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/view/ViewResolverComposite.html)안에 

  viewResolvers에 담겨져있음을 확인할 수 있다.




## Summary

* WebMvcConfigurer을 구현함으로써

  Application의 어떤 변화가 있는지 알아봤다.

<br>

* 주의할 점은

  반드시 @EnableWebMvc 어노테이션과

  함께 사용해야할 필요는 없다.

<br>

* 단지 필자의 프로젝트 구성에서

  @EnableWebMvc와 WebMvcConfigurer을 같이 사용하여서

  예시로 들었을 뿐이다.

<br>

* 끝으로

  WebMvcConfigurer를 

  왜 상속하는지

  왜 Override하는지 등등

  그 이유를 정확하게 인지하고 사용하도록 하자.

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)