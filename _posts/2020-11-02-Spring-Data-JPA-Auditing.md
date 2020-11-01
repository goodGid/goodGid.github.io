---
layout: post
title:  " Spring Data JPA : Auditing with @CreatedDate, @LastModifiedDate, @CreatedBy, @LastModifiedBy "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Prologue

* 개발을 하다 보면 

  다음과 같은 Column들이 필요하다.

---

1. 언제 생성되었는가?

2. 언제 수정되었는가?

3. 누가 생성하였는가?

4. 누가 수정하였는가?

---

* 위와 같은 Needs를 Spring에서는 추상화시켜놓았다.

* 이 글에서는 2가지 방식으로 해당 기능 사용법을 알아본다.

1. 순수 JPA를 사용하는 방식

2. Spring Data JPA를 사용하는 방식



---

## 순수 JPA 방식

``` java
@MappedSuperclass
public class JpaBaseEntity {

    @Column(updatable = false)
    private LocalDateTime createdData;

    private LocalDateTime updatedDated;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        createdData = now;
        updatedDated = now;
    }

    @PreUpdate
    public void preUpdate() {
        updatedDated = LocalDateTime.now();
    }
}
```

* 따로 설명이 필요 없을 정도로 깔끔한 코드이다.

---

## Spring Data JPA 방식

* 이 글에서 다루는 기능을 사용하려면 **@EnableJpaAuditing**을 선언해줘야 한다.

> GoodgidApplication

``` java
@EnableJpaAuditing // [1]
@SpringBootApplication
public class GoodgidApplication {
    public static void main(String[] args) {
        SpringApplication.run(GoodgidApplication.class, args);
    }
}
```

---

### @CreatedDate, @LastModifiedDate

* 그리고 Entity를 다음과 같이 생성해준다.

> BaseEntity

``` java
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class) // [1]
public class BaseEntity {

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifedDate;

}
```

* [1] : EntityListeners 선언을 해줘야 한다.

  그러면 createdDate와 lastModifedDate 값은 Spring Data JPA가 알아서 세팅해준다.

---

<h4> Example </h4>

* 실제로 DB에 데이터를 insert 해주면 다음과 같은 결과를 볼 수 있다.

> Account

``` java
@Entity
@Getter
@Setter
public class Account extends BaseEntity {

    @Id 
    @Column(name = "acct_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
```

![](/assets/img/spring/Spring-Data-JPA-Auditing_1.png)




---

### @CreatedBy, @LastModifiedBy

* 이번에는 Time이 아닌 Who에 대해 초점을 맞춰보자.

* 다음과 같이 Entity를 생성한다.

> BaseTimeEntity

``` java
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseTimeEntity extends BaseEntity {

    @CreatedBy
    @Column(updatable = false)
    private String createdBy; // [1]

    @LastModifiedBy
    private String lastModifiedBy; // [2]
}
```

* [1], [2]

  LocalDateTime 타입은 자동으로 세팅되지만

  String 타입의 값 세팅은 **Bean 등록**이 필요하다.


> AuditorAware<T>

``` java
@Bean
public AuditorAware<String> auditorProvider() {
    return () -> Optional.of(UUID.randomUUID().toString());
}
```

* 위처럼 Bean을 등록하면 

  createdBy, lastModifiedBy 에 Random 한 값을 세팅해준다.

* 만약 실무라면 사용자의 ID와 같은 의미 있는 값으로 세팅해주면 된다.


---

<h4> Example </h4>

* 실제로 DB에 데이터를 insert 해주면 다음과 같은 결과를 볼 수 있다.

> Account

``` java
@Entity
@Getter
@Setter
public class Account extends BaseTimeEntity {

    @Id 
    @Column(name = "acct_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

}
```

* 그리고 DB에 insert를 하면 다음과 같은 DB 결괏값을 볼 수 있다.


![](/assets/img/spring/Spring-Data-JPA-Auditing_2.png)


---

## Summary

* Spring Data JPA에서 개발자가 필요한 Needs를 잘 추상화시켜놓았다.

  유용한 기능을 잘 활용하여 개발 효율성을 높여보자.

---

## Reference

* [실전! 스프링 데이터 JPA](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%8D%B0%EC%9D%B4%ED%84%B0-JPA-%EC%8B%A4%EC%A0%84/dashboard)

* [Spring Data JPA : Auditing with @CreatedBy, @CreatedDate, @LastModifiedBy and @LastModifiedDate](https://springbootdev.com/2018/03/13/spring-data-jpa-auditing-with-createdby-createddate-lastmodifiedby-and-lastmodifieddate/)