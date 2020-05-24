---
layout: post
title:  " Spring 프레임워크 핵심 기술 - @Autowired 애노테이션 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @Autowired

* @Autowired은

* Constructor, Setter, Field에 

* 사용하여

* 해당 Bean을 주입시켜주는 

* 애노테이션이다.





---

## Example

### 문제 상황

* @Autowired을 사용하여

* Bean을 주입시키려고 하는데

* 해당 타입의 Bean이 

* 여러개 존재하는 상황이다.

* 이때 4가지 방법을 사용하여 

* 상황을 해결해본다.

1. @Primary

2. @Qualifier

3. 해당 타입의 모든 Bean 주입 받기

4. Name으로 주입받기

---

### Code

* BookRepository를 주입받으려고 하는데

* BookRepository 인터페이스의 구현체가 2개가 있다.

* (goodgidRepository, kiyongRepository)

* 이런 상황에서 

* BookRepository에게 

* 원하는 Repository를 주입시켜보자.

> Application

``` java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
```

> AppRunner

``` java
@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    private BookService bookService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        bookService.printBookRepository();
    }
}
```

> BookRepository

``` java
public interface BookRepository {
}
```

> Repository

``` java
@Repository
@Primary
public class goodgidRepository implements BookRepository {
}
```

* **@Primary**를 사용하여

* BookRepository 타입의 Bean을 

* 다른 곳에서 Autowired할 경우

* 우선적으로 goodgidRepository를 주입받도록 하였다.


``` java
@Repository
public class kiyongRepository implements BookRepository {
}
```

* 다른 곳에서 Autowired를 할 경우

* 특정 조건을 명시하지 않는 이상

* goodgidRepository에게 우선순위가 밀려

* (= goodgidRepository는 @Primary 선언을 하였기 때문에)

* **kiyongRepository**는 주입받지 못하게 된다.

* 그렇기 때문에

* @Qualifier를 사용하여 

* 해당 Bean(=kiyongRepository)을 주입받을 수 있게 해줘야한다.

* 하지만 @Qualifier 방식은 Type Safe하지 않다.

* ex) @Qualifier(value = "kiyongRepository")

> Case 1. BookService

``` java
@Service
public class BookService {

    // [1]
    @Autowired
    BookRepository bookRepository_primary;

    // [2]
    @Autowired
    @Qualifier(value = "kiyongRepository") // Type safe 하지 않다.
    BookRepository bookRepository_qualifier;

    // [3]
    @Autowired
    List<BookRepository> bookRepositoryList;

    public void printBookRepository(){
        System.out.println("===== 애노테이션 사용 =====");
        System.out.println("bookRepository_primary.getClass() : " + bookRepository_primary.getClass());
        System.out.println("bookRepository_qualifier.getClass() : " + bookRepository_qualifier.getClass());
        System.out.println();

        System.out.println("===== 해당 타입의 Bean 모두 주입 받기 =====");
        bookRepositoryList.forEach(s -> System.out.println("bookRepositoryList.getClass() : " + s.getClass()));
    }
}
```

> Result

``` java
===== 애노테이션 사용 =====
bookRepository_primary.getClass() : class goodgid.study.spring.goodgidRepository
bookRepository_qualifier.getClass() : class goodgid.study.spring.kiyongRepository

===== 해당 타입의 Bean 모두 주입 받기 =====
bookRepositoryList.getClass() : class goodgid.study.spring.goodgidRepository
bookRepositoryList.getClass() : class goodgid.study.spring.kiyongRepository
```

* [1]은 @Primary를 사용한 Bean을 주입받는다.

* [2]는 주입받을 Bean을 명시한 Bean을 주입받는다. 

* [3]는 해당 타입(= BookRepository)의 모든 Bean을 주입받는다.

> Case 2. BookService

``` java
@Service
public class BookService {

    // [1]
    @Autowired
    BookRepository kiyongRepository;

    public void printBookRepository(){
        System.out.println("===== Bean 이름 사용 =====");
        System.out.println("kiyongRepository.getClass() : " + kiyongRepository.getClass());
    }
}
```

> Result

``` java
===== Bean 이름 사용 =====
kiyongRepository.getClass() : class goodgid.study.spring.goodgidRepository
```

* [1]은 좀 특수한 상황이다.

* 해당 타입의 Bean이 중복되어 있을 경우

* 주입받고자 하는 Bean의 Name을 사용하면 

* 해당 Name의 Bean을 주입받게 된다.

* 하지만 goodgidRepository의 @Primary 애노테이션이 있으면

* @Primary 애노테이션을 사용한 빈을 주입받게 된다.

* 그렇기 때문에 

* @Primary 애노테이션을 goodgidRepository에서 제거한 후 

* Application을 실행시켜야 

* kiyongRepository 빈을 주입받을 수 있다.

``` java
// Before 
@Repository
@Primary
public class goodgidRepository implements BookRepository {
}
```

``` java
// After
@Repository
public class goodgidRepository implements BookRepository {
}
```


---

## Summary

* 총 4가지 방법으로 

* @Autowired를 사용하여

* Bean을 주입받는 방법을 알아봤다.

* 상황에 맞게 @Autowired 애노테이션을 사용하자 !

<br>

* 그리고 Example Code를 실행시킨

* Code Directory는 다음과 같다.

![](/assets/img/spring/spring_framework_autowired_1.png)

---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

