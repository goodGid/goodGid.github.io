---
layout: post
title:  " Spring 프레임워크 핵심 기술 - Bean 설정 방법 : Java 설정 파일에 Component Scan 방식 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## 개요

* Application에 Baen 설정 파일을 어떻게 설정하는지 

  여러 가지 방법을 통해 알아보자.

* 글의 순서는 큰 상관은 없지만 

  가능하다면 순서로대 보는걸 추천한다.

1. [XML 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Bean)

2. [XML 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Component-Scan)

3. [Java 설정 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Bean)

4. [Java 설정 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Component-Scan)

5. [@SpringBootApplication]({{site.url}}/Spring-Framework-ApplicationContext-SpringBootApplication-Annotation)

---

## 머릿말

* [앞선 글 : Java 설정 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Bean)에서 

  [Java 설정 파일에 직접 Bean 등록 시 단점]({{site.url}}/Spring-Framework-ApplicationContext-Java-Bean/#java-설정-파일에-직접-bean-등록의-단점)에 대해 알아봤다.

  이젠 이 단점을 보완하기 위해 나온 방법인

  Java 설정 파일에 Component Scan 방법에 대해 알아보자.








---

## Java 파일에 Component Scan 방식

* 기본적인 코드 구성은 다음과 같다.

---

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

### Java 설정 파일

> ApplicationConfig.java

``` java
@Configuration // Bean 설정파일이다를 알려주기 위해서
//@ComponentScan(basePackages = "goodgid.study.spring") // Type Safe 하지 않다.
@ComponentScan(basePackageClasses = Application.class) // Type Safe 하다.
public class ApplicationConfig {
}
```

* 가능하다면 Type Safe하게

  *basePackages* 가 아니라

  **basePackageClasses**를 사용하자.

---

* 필자의 디렉토리 구조는 다음과 같다.

![](/assets/img/spring/spring_framework_applicationcontext_java_component_scan_1.png)


---

### Application의 Bean 설정 

``` java
public class Application {

    public static void main(String[] args) {
        // Java 파일로 ApplicationContext를 생성하기 때문에
        // AnnotationConfigApplicationContext 클래스를 사용한다.
        ApplicationContext context = 
        new AnnotationConfigApplicationContext(ApplicationConfig.class);

        // ApplicationContext 안에 등록된 Bean들을 출력해본다.
        String[] beans = context.getBeanDefinitionNames();
        System.out.println(Arrays.toString(beans));

        // context.getBean()을 호출하면 Object 타입이 Return되기 때문에
        // 타입 캐스팅을 해줘야한다.
        BookService bookService = (BookService) context.getBean("bookService");

        // 정상적으로 주입이 되었는지 체크해본다.
        System.out.println(bookService.bookRepository != null);
    }
}
```

> Result

``` java
[bookService, bookRepository_id]
true
```

* Component Scan 방식으로 

  Bean을 등록하였고

  Application을 실행시켰을 때

  정상적으로 돌아가는 것을 확인할 수 있다.

---

## 맺음말

* Bean 설정을 하는 여거 가지 방법에 대해 알아봤다.

* 아무래도 최근에 생성되는 

  Spring 프로젝트는

  Java 설정 파일에 Component Scan 방식이 

  가장 흔하게 사용되지 않을까 생각한다.

* 하지만 기존에 어떤 방법이 있었고

  어떤 히스토리가 있었는지 아는게 중요하다 생각이 들어

  여러가지 방법으로 Bean을 설정하는 글을 작성하였다.

  누군가에겐 도움이 되었으면 좋겠다 !

* 추가적으로 

  Spring Boot를 사용한다면

  [@SpringBootApplication]({{site.url}}/Spring-Framework-ApplicationContext-SpringBootApplication-Annotation)라는 강력한 애노테이션이 있다.

* @SpringBootApplication는 자체적으로

  Component Scan과 Config + @ 기능을 해준다.

* Spring Boot로 프로젝트를 진행한다면

  보다 편리하게 설정이 가능해진다.

---

## Reference

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

