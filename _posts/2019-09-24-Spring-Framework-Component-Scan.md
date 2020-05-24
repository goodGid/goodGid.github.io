---
layout: post
title:  " Spring 프레임워크 핵심 기술 - @Component와 Component Scan "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @Component 

* @Component 애노테이션을 사용하면 

* Component Scan시 

* 해당 클래스 혹은 객체를 

* Bean으로 등록시켜준다.

* 이 글에서는 

* Component Scan 시 

* 그 범위가 어떻게 되는지 알아보자.




---

## Component Scan 범위

* 스프링 부트인 상황에서 

* 서버를 구동시키기 위한

* 시작점은 일반적으로 다음과 같다.

``` java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
```

* 위와 같은 상황에서 

* 다른 패키지에 있는 Bean을 주입받으려고 시도한다면

* Application에 속한 패키지가 아닌 영역이기 때문에

* Bean 주입이 안된다.

``` java
@SpringBootApplication
public class Application {

    @Autowired
    private EventService eventService; // 다른 패키지의 Bean을 주입받으려고 시도

    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
```

![](/assets/img/spring/spring_framework_component_scan_1.png)

* 물론 코드에서는 사용이 가능하지만

* 다음과 같은 에러가 발생한다.

![](/assets/img/spring/spring_framework_component_scan_2.png)

* 즉 Component Scan은

* 해당 패지키에 속해있는 

* Bean만 주입받을 수 있다.

<br>

* 물론 Bean 등록을 따로하여 

* 다른 패키지에 Bean을 주입 받을 수 있다.

---

## Component Scan 옵션

* 다양한 옵션이 있지만

* 그중 **Filer**라는 옵션이 있다.

``` java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@Repeatable(ComponentScans.class)
public @interface ComponentScan {
    ...
    ComponentScan.Filter[] includeFilters() default {};
    ComponentScan.Filter[] excludeFilters() default {};
    ...
}
```

* **includeFilters**는 Component Scan 시 해당 타입을 포함시킨다.

* **excludeFilters**는 Component Scan 시 해당 타입을 제외시킨다.

<br>

* 실제로 @SpringBootApplication의 

* 메타 애노테이션을 보면 

* excludeFilters를 사용하는 것을 볼 수 있다.

``` java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {
        @Filter(type = FilterType.CUSTOM,classes = {TypeExcludeFilter.class}), 
        @Filter(type = FilterType.CUSTOM,classes = {AutoConfigurationExcludeFilter.class})
        }
)
public @interface SpringBootApplication {
    ...
}
```

---

## Summary

* Component Scan의 영향 범위를 

* 제대로 인지하고 있어야

* Bean 주입이 안되는 상황에

* 정확하게 원인을 파악할 수 있다.

---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

