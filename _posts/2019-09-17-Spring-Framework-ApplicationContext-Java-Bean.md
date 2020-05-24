---
layout: post
title:  " Spring 프레임워크 핵심 기술 - Bean 설정 방법 : Java 설정 파일에 직접 Bean 등록 방식 "
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

* 앞선 글에서 

* XML을 사용하여 

* 직접 Bean을 등록하거나

* Component Scan을 통해 Bean을 등록하는 방법에 대해 살펴봤다.

<br>

* 이번에는 Java 설정 파일을 통한 

* Bean을 등록하는 방법에 대해 알아보자.

* 2가지 방법이 존재하는데

* 이번 글에서는 **Java 설정 파일에 직접 Bean을 등록하는 방법**에 대해 알아보자.

* 다른 방법으로는 [Java 설정 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Component-Scan)이 있다.







---

## Java 파일에 직접 Bean 등록 방식

* 기본적인 코드 구성은 다음과 같다.

---

### Business Code

> BookRepository

``` java
public class BookRepository {
}
```

> BookService

``` java
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
@Configuration // Bean 설정 파일임을 알려주기 위한 애노테이션
public class ApplicationConfig {

    @Bean
    public BookRepository bookRepository(){
        return new BookRepository();
    }

    // [1]
    // Setter 방식의 Bean 주입 방식
    @Bean
    public BookService bookService(){
        BookService bookService = new BookService();
        bookService.setBookRepository(bookRepository()); // Setter 방식의 의존성 주입
        return bookService;
    }

    // [2]
    // 메소드 파라미터로 의존성 주입
    @Bean
    public BookService bookService(BookRepository bookRepository){
        BookService bookService = new BookService();
        bookService.setBookRepository(bookRepository);
        return bookService;
    }
}
```

* [1]과 [2] 둘 중 편한 방법을 사용하면 된다.

* 여기에선 

* 사용법을 보여주기위해

* 2가지 방법을 사용하였다.

---

### Application의 Bean 설정 

``` java
public class Application {

    public static void main(String[] args) {
        // Java 파일로 ApplicationContext를 생성하기 때문에
        // AnnotationConfigApplicationContext 클래스를 사용한다.
        ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);

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

---

## Java 설정 파일에 직접 Bean 등록의 단점

* [XML 직접 Bean 등록의 단점]({{site.url}}/Spring-Framework-ApplicationContext-XML-Bean/#xml-직접-bean-등록의-단점)과 마찬가지로 

* 하나하나 Bean으로 등록을 해줘야한다.

* 그래서 나온 개념이

* Component Scan 방식이다.

* [Java 설정 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Component-Scan)

---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

