---
layout: post
title:  " DispatcherServlet가 WebApplicationContext를 생성하는 2가지 방법 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

## DispatcherServlet 등록하기

* Spring의 핵심 개념인

* DispatcherServlet가 

* WebApplicationContext를 생성하는

* 2가지 방법에 대해 알아보자.









## 시작하기 앞서

> DispatcherServlet 생성 주최 

* DispatcherServlet는 1개만 생성하면 된다.

* 이 글에서는

* XML 혹은 Java로 생성하는 법을 배운다.

* 그렇기 때문에 

* 만약 XML으로 DispatcherServlet를 생성한다면

* WebApplication.java 파일(= Java 방법)은 삭제해도 된다.

* 만약 Java로 DispatcherServlet를 생성한다면

* web.xml 파일(= XML 방법)은 삭제해도 된다.


> Interface WebApplicationContext

* [WebApplicationContext Interface](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/context/WebApplicationContext.html)를

* 구현하는 다양한 구현체가 있다.

* 그 중에 [AnnotationConfigWebApplicationContext](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/context/support/AnnotationConfigWebApplicationContext.html) 구현체를 사용한다.

* 그 이유는 

* 최근에 Spring 프로젝트의 대부분은

* Annotation을 기반으로 진행되기 때문이다.



> Directory

* goodgid의 프로젝트 Directory 구조는 다음과 같다.

![](/assets/img/spring/Spring-DispactcherServlet_1.png)




> Source Code

* 전체 코드는 Github Repo를 참고하자.

* Github : [goodGid/Inflearn-Web-MVC](https://github.com/goodGid/Inflearn-Web-MVC/tree/11-%EC%8A%A4%ED%94%84%EB%A7%81-MVC-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC-%EB%A7%88%EB%AC%B4%EB%A6%AC)



##  XML을 사용한 방법

1. *web.xml* 생성

2. DispatcherServlet가 사용할 Config 지정

3. DispatcherServlet가 처리할 요청 패턴 명시

> web.xml

``` xml
<!DOCTYPE web-app PUBLIC
  "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
  "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Web Application</display-name>

  <servlet>
    <servlet-name>app</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- 
      최근엔 Annotation 기반의 
      Spring 프로젝트 개발을 하기 때문에
      DispatcherServlet가 생성할 
      WebApplicationContext의 구현체로
      AnnotationConfigWebApplicationContext 구현체를 사용한다.
     -->
    <init-param>
      <param-name>contextClass</param-name>
      <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
    </init-param>

    <!-- Config 지정 -->
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>be.goodgid.WebConfig</param-value>
    </init-param>
  </servlet>

  <!-- 
    * 요청 처리 
    * addMapping()의 값으로 `/*`을 지정하면 안된다.
    * 자세한건 다음 글을 참고하자.
    * https://www.baeldung.com/spring-mvc-404-error
  -->
  <servlet-mapping>
    <servlet-name>app</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>

</web-app>
```

> WebConfig.java

``` java
@Configuration
@ComponentScan
public class WebConfig {
    /** 
     * 특별한 설정은 없다.
     * 핸들러가 view name을 Return 시
     * Prefix / Suffix를 위한
     * viewResolver만 Bean으로 추가
     *
     * 즉 아래 코드가 없어도 무방한다.
     */
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
        internalResourceViewResolver.setPrefix("/WEB-INF/");
        internalResourceViewResolver.setSuffix(".jsp");
        return internalResourceViewResolver;
    }
}
```

* 좀 더 Live 하게 보고 싶다면

* 첨부한 동영상 파일을 다운받아 보자.

* [XML 사용 동영상](https://github.com/goodGid/goodGid.github.io/blob/master/assets/img/spring/Spring-DispatcherServlet_1.mp4)

    
## Java를 사용한 방법
    
1. *WebApplicationInitializer* 를 구현한다.

> WebApplication.java

``` java
public class WebApplication implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        /**
         * AnnotationConfigWebApplicationContext를 인스턴스를 생성한다.
         */
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();

        /**
         * Config를 등록하는데 2가지 방법이 있다.
         * 1. context.setConfigLocation()
         * 2. context.register()
         * 어느것을 사용해도 상관없다.
         */
        // context.setConfigLocation("be.goodgid.WebConfig");
        context.register(WebConfig.class);
        context.refresh();

        /**
         * 위에서 생성한 AnnotationConfigWebApplicationContext 인스턴스를
         * DispatcherServlet.webApplicationContext의 값으로 세팅해준다.
         * 
         * Reference : org.springframework.web.servlet.FrameworkServlet#FrameworkServlet
         *             (org.springframework.web.context.WebApplicationContext)
         */
        DispatcherServlet dispatcherServlet = new DispatcherServlet(context);
        ServletRegistration.Dynamic app = servletContext.addServlet("dispatcher", dispatcherServlet);

        /**
         * addMapping()의 값으로 `/*`을 지정하면 안된다.
         * 자세한건 다음 글을 참고하자.
         * https://www.baeldung.com/spring-mvc-404-error
         */
        // app.addMapping("/*");
        app.addMapping("/");
    }
}
```

> WebConfig.java

``` java
@Configuration
@ComponentScan
public class WebConfig {
    /** 
     * 특별한 설정은 없다.
     * 핸들러가 view name을 Return 시
     * Prefix / Suffix를 위한
     * viewResolver만 Bean으로 추가
     *
     * 즉 아래 코드가 없어도 무방한다.
     */
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
        internalResourceViewResolver.setPrefix("/WEB-INF/");
        internalResourceViewResolver.setSuffix(".jsp");
        return internalResourceViewResolver;
    }
}
```

* 좀 더 Live 하게 보고 싶다면

* 첨부한 동영상 파일을 다운받아 보자.

* [Java 사용 동영상](https://github.com/goodGid/goodGid.github.io/blob/master/assets/img/spring/Spring-DispatcherServlet_2.mov)



## Trouble Shooting

``` java
AS-IS : servletContext.addServlet("app", dispatcherServlet);
TO-BE : servletContext.addServlet("dispatcher", dispatcherServlet);
CODE : 
ServletRegistration.Dynamic app = servletContext.addServlet("app", dispatcherServlet);
app.addMapping("/");
```

* servletContext에 Servlet을 등록하는 코드이다.

* 그런데 "app"이란 키워드로 

* 등록을 하려했다가 NPE가 발생했다.

<br>

* 그 이유는 

* **[servletContext.addServlet](https://docs.oracle.com/javaee/6/api/javax/servlet/ServletContext.html#addServlet(java.lang.String,%20javax.servlet.Servlet))** 메소드는

* Servlet key에 해당하는 값이  

* 이미 존재하면 

* null을 return하기 때문에

* **app.addMapping("/");** 에서 NPE가 발생했다.

* 그래서 servletContext에 등록되어있는 

* "app"란 Key를 사용하면 안된다.

![](/assets/img/spring/Spring-DispactcherServlet_2.png)

![](/assets/img/spring/Spring-DispactcherServlet_3.png)

![](/assets/img/spring/Spring-DispactcherServlet_4.png)






## Summary

* DispatcherServlet가 

* WebApplicationContext를 생성하는 방법으로 

* 2가지 방법을 Code를 통해 알아봤다.

  - **XML 사용**

  - **Java 사용**

* 필요한 상황에 따라

* 적절하게 사용을 하자.


