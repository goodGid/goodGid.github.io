---
layout: post
title:  " @EnableWebMvc 어노테이션을 선언하면 무엇이 달라질까? "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## 글의 목표

* @EnableWebMvc 어노테이션 사용 이유와

* 선언 유무가 어떤 차이를 만드는지에 대해 알아보자.




## Q & A

### Question

* 많은 프로젝트에서

  @EnableWebMvc 어노테이션을 많이 사용한다.

  왜 사용하는걸까?


### @EnableWebMvc

* 다음 순서로 코드를 살펴보자.

* @EnableWebMvc -> DelegatingWebMvcConfiguration -> WebMvcConfigurationSupport



> EnableWebMvc

``` java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@Import({DelegatingWebMvcConfiguration.class})
public @interface EnableWebMvc {
}
```

> DelegatingWebMvcConfiguration

``` java
public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport {
  ...
}
```

> WebMvcConfigurationSupport.class -> requestMappingHandlerMapping( )

``` java

public class WebMvcConfigurationSupport implements ApplicationContextAware, ServletContextAware {
  ...

  @Bean
  public RequestMappingHandlerMapping requestMappingHandlerMapping(
    @Qualifier("mvcContentNegotiationManager") ContentNegotiationManager contentNegotiationManager, 
    @Qualifier("mvcConversionService") FormattingConversionService conversionService, 
    @Qualifier("mvcResourceUrlProvider") ResourceUrlProvider resourceUrlProvider) {
      RequestMappingHandlerMapping mapping = this.createRequestMappingHandlerMapping();
      mapping.setOrder(0);

      // [Important] See : getInterceptors()
      mapping.setInterceptors(this.getInterceptors(conversionService, resourceUrlProvider));

      mapping.setContentNegotiationManager(contentNegotiationManager);
      mapping.setCorsConfigurations(this.getCorsConfigurations());
      ...
      return mapping;
      }
  ...
}
```

> getInterceptors( )

``` java
protected final Object[] getInterceptors(
  FormattingConversionService mvcConversionService, 
  ResourceUrlProvider mvcResourceUrlProvider) {
    if (this.interceptors == null) {
      InterceptorRegistry registry = new InterceptorRegistry();
      this.addInterceptors(registry);
      registry.addInterceptor(new ConversionServiceExposingInterceptor(mvcConversionService));
      registry.addInterceptor(new ResourceUrlProviderExposingInterceptor(mvcResourceUrlProvider));
      this.interceptors = registry.getInterceptors();
      }
  return this.interceptors.toArray();
}
```

* getInterceptors( ) 메소드 안에서 

  2개의 Interceptor가 등록되는 것을 확인할 수 있다.

  new ConversionServiceExposingInterceptor( ), new ResourceUrlProviderExposingInterceptor( )



### Answer

* @EnableWebMvc 어노테이션을 사용하면

  Spring Framework에서 

  여러 Config 값을 알아서 세팅해준다.

  이런 편리함 때문에 @EnableWebMvc 어노테이션을 사용한다.

---

## Code Example

> WebConfig.java

``` java
@Configuration
@ComponentScan
@EnableWebMvc
public class WebConfig {
  ...
}
```

* 일반적으로 @EnableWebMvc은 

  WebConfig와 같은 Config 파일에서 사용된다.

* 여기서 WebConfig 파일의 존재 목적은 다음과 같다.

* DispactcherServlet을 생성할 때

  생성자 인자로 WebApplicationContext을 전달한다.

* 그런데 WebApplicationContext은

  어떤 Config 파일을 사용할 지 명시해줘야 하는데

  그 Config 값으로 일반적으로는 WebConfig를 지정한다.

* 만약 위 문장이 이해가 가지 않는다면

  반드시 [DispatcherServlet가 WebApplicationContext를 생성하는 2가지 방법]({{site.url}}/Spring-DispatcherServlet/) 글을 읽어보자.



### @EnableWebMvc 설정 X

* @EnableWebMvc을 사용하지 않은 상태로

  Application을 실행시키고

  DispatcherServlet.class의 doService( )에 Break Point를 걸어보자.

  // ref : org.springframework.web.servlet.DispatcherServlet#doService

![](/assets/img/spring/Spring-Enable-MVC-Annotation_1.png)

* 등록된 Interceptors가 없다.



### @EnableWebMvc 설정 O

* 이번에는 @EnableWebMvc을 사용해보자.

* 위와 마찬가지로

  DispatcherServlet.class의 doService( )에  Break Point를 걸어보자.

  // ref : org.springframework.web.servlet.DispatcherServlet#doService

![](/assets/img/spring/Spring-Enable-MVC-Annotation_2.png)

* @EnableWebMvc을 하였기 때문에 Interceptors가 등록되어있다.

* 그리고 등록되어 있는

  2개의 Interceptors는 

  **ConversionServiceExposingInterceptor**와 

  **ResourceUrlProviderExposingInterceptor**다.

<br>

* 이 2개의 Interceptors는 어디서 왔을까?

* 위에서 살펴봤던 getInterceptors( )함수에서

  **ConversionServiceExposingInterceptor**와 

  **ResourceUrlProviderExposingInterceptor**를 등록시켜주고 있다.


> getInterceptors( )

``` java
protected final Object[] getInterceptors(
  FormattingConversionService mvcConversionService, 
  ResourceUrlProvider mvcResourceUrlProvider) {
    if (this.interceptors == null) {
      InterceptorRegistry registry = new InterceptorRegistry();
      this.addInterceptors(registry);
      registry.addInterceptor(new ConversionServiceExposingInterceptor(mvcConversionService));
      registry.addInterceptor(new ResourceUrlProviderExposingInterceptor(mvcResourceUrlProvider));
      ...
      }
}
```


## Summary

* @EnableWebMvc 어노테이션 사용 유무에 따른 차이에 대해 알아봤다.

<br>

* 이 글에서는

  Interceptors 필드만 살펴봤지만

  사실 엄청나게 많은 Config 값이 세팅된다.

<br>

* 어떤 값이 세팅되는지

  모두 아는건 가능하지도 않고 그럴 필요도 없다.

<br>

* 다만 @EnableWebMvc 어노테이션을 사용하면

  Spring 내부적으로 어떤 프로세스로 인해 

  어떻게 동작하는가에 대한 느낌이라도 알아야 하지 않을까? 라는 생각을 해본다.

---

## Reference

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

