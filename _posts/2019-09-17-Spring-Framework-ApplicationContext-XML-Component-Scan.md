---
layout: post
title:  " Spring 프레임워크 핵심 기술 - Bean 설정 방법 : XML 파일에 Component Scan 방식 "
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

* 이전 글에 이어서 Bean 설정 방법에 대해 알아보자.

* [이전 글 : XML 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Bean)에서는 

  Bean 등록을 하나씩 직접해줬다.

* 그러므로 Bean을 등록하는 과정은 

  굉장히 번거롭고 유지 보수 또한 힘들었다.

* 그래서 나온 방식이

  **Component Scan** 방식이다.








---

## XML 파일에 Component Scan 방식

* Component Scan으로 Bean을 등록하는 방법은 다음과 같다.

* 우선 application.xml을 수정한다.

> application.xm

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

  <context:component-scan base-package="goodgid.study.spring"/>

</beans>
```
* 위 코드를 해석하자면

  나는 **goodgid.study.spring** 이 패키지 부터

  Scan을 해서 Bean을 등록하겠다. 

  라고 해석할 수 있다.

---

> Bean Scan

* Bean Sacn 시

  기본적으로 @Component 애노테이션을 사용하여 Bean으로 등록한다.

---

* 직접적인 @Component 명시가 아니더라도 괜찮다.

  다만 @Component를 포함하는 Annotation이면 된다.

---

* 예를 들면

  @Service라는 애노테이션이 있다.

  @Service 애노테이션의 정의를 보면 다음과 같다.

``` java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Service {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";
}
```

* **[메타 애노테이션]({{site.url}}/Spring-MVC-Custom-Annotation/#메타meta-애노테이션)**에

  @Component를 사용하고 있다.

  그러므로 Bean으로 등록이 된다.

  같은 원리로 @Repository도 Bean으로 등록이 된다.

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

    public void setBookRepository_XML(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
}
```

* Repository와 Service에

  각각 @Repository와 @Service 애노테이션을 사용였기 때문에

  Component Scan이 이뤄지면 Bean으로 등록된다.

* 하지만 BookService에서 사용하는 

  bookRepository의 의존성 주입은 되지 않는다.

  여기서 bookRepository의 의존성 주입을 시키기 위해선 

  @Autowired 애노테이션을 사용한다.

* BookService의 코드를 수정해보자.

> BookService

``` java
@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;

    public void setBookRepository_XML(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
}
```

---

### Application의 Bean 설정

* 실제로 Application을 실행하여

  Component Scan이 정상적으로 이뤄지는지 확인해보자.

``` java
public class Application {

    public static void main(String[] args) {
        // xml 파일로 ApplicationContext를 생성하기 때문에
        // ClassPathXmlApplicationContext 클래스를 사용한다.
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");

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

* application.xml에서 

  Component Scan 방식으로 

  Bean 등록을 하도록 설정하였으며

  Component Scan이 끝난 후 

  bookService의 bookRepository에 주입이 

  정상적으로 되었음을 확인 할 수 있다.

---

## XML 설정 방법이 답인가?

* Bean 설정 파일을

  xml이 아니라 Java로 만들 수 없을까?

  해서 등장한게 Java 설정 파일 방법이다.

* Java 설정 파일과 관련해서 2가지 글을 참고하자.

1.  [Java 설정 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Bean)

2. [Java 설정 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Component-Scan)

---

## Reference

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

