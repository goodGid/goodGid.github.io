---
layout: post
title:  " Spring Boot SQL Option 알아보기 :: show_sql, format_sql, use_sql_comments, org.hibernate.type.descriptor.sql "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## SQL Option

### SQL 보기

* Hibernate가 DB에 날리는 모든 Query를 보여준다.

* 해당 옵션과 관련해서는 **반드시** 알아야 할 부분이 있다.

  그 부분에 대해서는 [Spring Boot SQL Option : 'show_sql' Option Deep 하게 알아보기]({{site.url}}/Spring-Boot-SQL-Option-Show-SQL) 글을 참고하자.

> application.yml

``` java
spring:
  jpa:
    properties:
      hibernate:
        show_sql: true
```

> application.properties

```java
spring.jpa.properties.hibernate.show_sql = true
```

> Output

``` java
Hibernate: select testentity0_.id as id1_8_0_ from test_entity testentity0_ where testentity0_.id=?
Hibernate: insert into test_entity (id) values (?)
```



---

### SQL Formatting

* 보이는 Query를 가독성 좋게 해준다.

  만약 show_sql = false라면 해당 옵션은 무의미해진다.

> application.yml

``` java
spring:
  jpa:
    properties:
      hibernate:
        format_sql: true
```

> application.properties

```java
spring.jpa.properties.hibernate.format_sql = true
```

> Output

``` java
Hibernate: 
    select
        testentity0_.id as id1_8_0_ 
    from
        test_entity testentity0_ 
    where
        testentity0_.id=?
Hibernate: 
    insert 
    into
        test_entity
        (id) 
    values
        (?)
```

---


### SQL Comment

* 해당 옵션을 설정하면 
  
  /* */로 열고 닫힌 주석이 추가된다.

> application.yml

``` java
spring:
  jpa:
    properties:
      hibernate:
        use_sql_comments: true
```

> application.properties

```java
spring.jpa.properties.hibernate.use_sql_comments = true
```

> Output

``` java
Hibernate: 
    /* load dev.be.goodgid.domain.entity.test.TestEntity */ select
        testentity0_.id as id1_8_0_ 
    from
        test_entity testentity0_ 
    where
        testentity0_.id=?
Hibernate: 
    /* insert dev.be.goodgid.domain.entity.test.TestEntity
        */ insert 
        into
            test_entity
            (id) 
        values
            (?)
```

---

### Parameter Binding

* Hibernate가 보여주는 Log에 있는 

  **?**에 어떤 값이 Binding 되는지 확인할 수 있다.

> application.yml

``` java
logging:
  level:
    org.hibernate.type.descriptor.sql: trace
```

> application.properties

```java
logging.level.org.hibernate.type.descriptor.sql = trace
```

> Output

``` java
Hibernate: 
    /* load dev.be.goodgid.domain.entity.test.TestEntity */ select
        testentity0_.id as id1_8_0_ 
    from
        test_entity testentity0_ 
    where
        testentity0_.id=?
2020-11-08 10:13:01.022 TRACE 94227 --- [nio-8080-exec-1] o.h.type.descriptor.sql.BasicBinder      : binding parameter [1] as [VARCHAR] - [AAAAA]
Hibernate: 
    /* insert dev.be.goodgid.domain.entity.test.TestEntity
        */ insert 
        into
            test_entity
            (id) 
        values
            (?)
2020-11-08 10:13:01.025 TRACE 94227 --- [nio-8080-exec-1] o.h.type.descriptor.sql.BasicBinder      : binding parameter [1] as [VARCHAR] - [AAAAA]
```


---

## Summary

* 위에서 언급한 Option을 모두 적용하면 다음과 같다.

> application.yml

``` java
spring:
  jpa:
    properties:
      hibernate:
        show_sql: true
        format_sql: true
        use_sql_comments: true

logging:
  level:
    org.hibernate.type.descriptor.sql: trace
```

---

## Reference

* [Spring Boot SQL 보기 옵션 총 정리](https://lannstark.tistory.com/14)

* [스프링 부트 Auto-configuration과 JPA(하이버네이트) SQL문 로깅](https://www.popit.kr/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B6%80%ED%8A%B8-auto-configuration%EA%B3%BC-jpa%ED%95%98%EC%9D%B4%EB%B2%84%EB%84%A4%EC%9D%B4%ED%8A%B8-sql%EB%AC%B8-%EB%A1%9C%EA%B9%85/)