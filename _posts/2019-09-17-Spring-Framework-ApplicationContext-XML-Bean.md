---
layout: post
title:  " Spring 프레임워크 핵심 기술 - Bean 설정 방법 : XML 파일에 직접 Bean 등록 방식 "
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

## XML 파일에 직접 Bean 등록 방식

* XML 파일에 직접 Bean을 등록하여 Application의 Bean을 설정해보자.







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

    public void setBookRepository_XML(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
}
```

---


### Application.xml

* application.xml 파일은 

* resources 폴더 아래에 위치한다.

> Before : application.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="bookService" class="goodgid.study.spring.BookService" />
  <bean id="bookRepository_ID" class="goodgid.study.spring.BookRepository"/>

</beans>
```

* 이렇게만 설정을 하면 

* bookService에서 bookRepository를 주입받지 못한다

* 그렇기 때문에 

* xml을 수정해줘야한다.

> After : application.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="bookService" class="goodgid.study.spring.BookService">
    <property name="bookRepository_XML" ref="bookRepository_ID"/> // [1]
  </bean>

  <bean id="bookRepository_ID" class="goodgid.study.spring.BookRepository"/>

</beans>
```

* [1]처럼 **property** 키워드를 사용하여 

* bookRepository를 주입시켜준다.

* 위와 같은 방식이 가능한 이유는

* bookRepository 주입을 setter 방식으로 받기 때문이다.

``` java
BookRepository bookRepository;

public void setBookRepository_XML(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
}
```

* 그리고 property의 name속성에 오는 값은

* setter 함수의 **메서드 명**을 따른다.

* 일반적으로는 *setBookRepository* 로 사용하지만 

* 이 예제에서는 일부러

* 메서드명을 *setBookRepository_XML* 로 사용하였다.

<br>

* 그리고 property의 ref속성에 오는 값은

* 주입시킬 Bean의 id 값이다.

* 여기서는 bookRepository를 주입시켜야 하기 때문에

* bookRepository를 Bean으로 등록한 코드에서

* id값인 **bookRepository_ID**를 

* ref(= 주소값)의 값으로 넣어준다.

``` xml
<bean id="bookRepository_ID" class="goodgid.study.spring.BookRepository"/>
```

---

### Application의 Bean 설정 

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

* application.xml에 

* 직접 등록한 Bean의 이름들과

* bookService의 bookRepository에 주입이 

* 정상적으로 되었음을 확인 할 수 있다.

---

## XML 직접 Bean 등록의 단점

* 이 방법의 큰 단점은

* 하나하나 Bean으로 등록을 해줘야한다.

* 그래서 나온 개념이 

* **Component Scan** 방식이다.

* [XML 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Component-Scan)글을 읽어보자.


---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

