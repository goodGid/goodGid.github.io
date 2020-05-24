---
layout: post
title:  " Spring 프레임워크 핵심 기술 - Bean 설정 방법 : @SpringBootApplication 애노테이션 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## 개요

* Application에 Baen 설정 파일을 어떻게 설정하는지 

* 여러 가지 방법을 통해 알아보자.

* 글의 순서는 큰 상관은 없지만 

* 가능하다면 순서로대 보는걸 추천한다.

1. [XML 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Bean)

2. [XML 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Component-Scan)

3. [Java 설정 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Bean)

4. [Java 설정 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Component-Scan)

5. [@SpringBootApplication]({{site.url}}/Spring-Framework-ApplicationContext-SpringBootApplication-Annotation)

---

## 머릿말

* 앞선 글들은

* 프로그래머가 설정을 해줘야했다면

* @SpringBootApplication 애노테이션은 

* 스프링 부트 자체적으로 기본적인 설정을 다 해주게 된다.










---

## @SpringBootApplication 

* 기존에 Application.java의 코드는 다음과 같다.

``` java
public class Application {

    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);
        String[] beans = context.getBeanDefinitionNames();
        System.out.println(Arrays.toString(beans));
        BookService bookService = (BookService) context.getBean("bookService");
        System.out.println(bookService.bookRepository != null);
    }
}
```

* Component Scan을 하기 위해서

* 기존엔

* Config 파일 혹은 xml 파일이 필요했다.

<br>

* 하지만 스프링 부트를 환경에서

* @SpringBootApplication 애노테이션을 사용하게 되면

* 그러한 파일들이 불필요해진다.

``` java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
    }
}
```

* @SpringBootApplication의 정의를 보자.

``` java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {
    ...
}
```

> ComponentScan

* **[메타 애노테이션]({{site.url}}/Spring-MVC-Custom-Annotation/#메타meta-애노테이션)**에서 

* @ComponentScan를 볼 수 있다.

* 즉 기존에 Component Scan을 위해 

* Config 파일 혹은 XML 파일이 필요했지만

* @SpringBootApplication 애노테이션에 이미 

* 포함되어 있기 때문에 

* Config 파일 혹은 XML 파일을 생성하지 않아도 된다.

> Configuration 

* @ComponentScan과 마찬가지로

* **[메타 애노테이션]({{site.url}}/Spring-MVC-Custom-Annotation/#메타meta-애노테이션)**에서

* @Configuration 애노테이션 선언이 되어있다.

* @SpringBootConfiguration의 정의를 보면 다음과 같다.

``` java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
public @interface SpringBootConfiguration {
}
```

* 즉 @SpringBootConfiguration 애노테이션안에

* @Configuration 애노테이션이 달려 있기 때문에

* ComponentScan과 마찬가지로

* Config 파일 혹은 XML 파일을 생성하지 않아도 된다.

---

## Example Code

### Business Code

> BookRepository

``` java
@Repository
public class BookRepository {
}
```

> BookService

``` java
@Service
public class BookService {
    BookRepository bookRepository;

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
}
```

---


### Component Scan 설정 파일

> ApplicationConfig.java

* Java 설정 파일을 사용할 경우

``` java
@Configuration // Bean 설정파일이다를 알려주기 위해서
//@ComponentScan(basePackages = "goodgid.study.spring") // Type Safe 하지 않다.
@ComponentScan(basePackageClasses = Application.class) // Type Safe 하다.
public class ApplicationConfig {
}
```

> Application.xml

* XML 설정 파일을 사용할 경우

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
  <context:component-scan base-package="goodgid.study.spring"/>
</beans>
```

<br>

* @SpringBootApplication 애노테이션 사용하게 되면

* Component Scan을 위한 설정 파일들이 불필요해진다.

---

### Application.java

``` java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
    }
}
```

* 위와 같은 환경에서 

* Application을 실행시켜도

* 정상적으로 동작하는것을 확인 할 수 있다.

---

## Summary

* Business Code와 

* Application.java 파일만 있으면

* Application이 정상적으로 동작하는 것을 확인할 수 있다.

* 즉 @SpringBootApplication 애노테이션을 사용하기 때문에

* Config 파일 혹은 XML 파일들이 불필요해진다.

---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

