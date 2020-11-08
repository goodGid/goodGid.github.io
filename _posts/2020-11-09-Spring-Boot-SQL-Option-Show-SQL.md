---
layout: post
title:  " Spring Boot SQL Option : 'show_sql' Option Deep 하게 알아보기 "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## Prologue

* 이 글을 시작하기에 앞서

  해당 글에서 사용하는 SQL Option을 모르겠다면 

  [Spring Boot SQL Option 알아보기]({{site.url}}/Spring-Boot-SQL-Option/) 글을 참고하자.



---

## SQL Option : show_sql

* [Docs](https://docs.jboss.org/hibernate/orm/5.2/userguide/html_single/Hibernate_User_Guide.html#_sql_statement_logging)에서 show_sql은 다음과 같이 정의되어 있다.

```
hibernate.show_sql (e.g. true or false (default value)) 
Write all SQL statements to the console. 
This is an alternative to setting the log category org.hibernate.SQL to debug. 

ex) 
logging:
  level:
    org.hibernate.SQL: debug
```

* 즉 Spring Boot 설정 파일인 application.properties에 

  *spring.jpa.properties.hibernate.show_sql = true* 로 설정한다는 것은 
  
  *logging.level.org.hibernate.SQL = debug* 와 같다.

### vs hibernate.SQL

* 여기서 **차이점**이 있다면

  spring.jpa.properties.hibernate.show_sql은 **System.Out**에 Log가 출력된다.

  반면 logging.level.org.hibernate.SQL = debug는 **logger**에 Log를 출력한다.

  그러므로 logging.level.org.hibernate.SQL를 사용하는 게 좋다.


---

### Example

* 출력되는 결과를 보면 다름을 확인할 수 있다.

---

> application.yml

``` java
spring:
  jpa:
    properties:
      hibernate:
        show_sql: true # to System Out
        format_sql: true

logging:
  level:
    org.hibernate.SQL: debug # to logger
```

---

> logging.level.org.hibernate.SQL

``` java
2020-11-08 10:25:23.714 DEBUG 94983 --- [nio-8080-exec-1] org.hibernate.SQL: 
    select
        testentity0_.id as id1_8_0_ 
    from
        test_entity testentity0_ 
    where
        testentity0_.id=?
2020-11-08 10:25:23.717 DEBUG 94983 --- [nio-8080-exec-1] org.hibernate.SQL: 
    insert 
    into
        test_entity
        (id) 
    values
        (?)
```

---

> spring.jpa.properties.hibernate.show_sql

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

## Summary

* 결론적으로 

  spring.jpa.properties.hibernate.show_sql 사용은 **지양**하고

  logging.level.org.hibernate.SQL = debug 사용을 **지향**해야 한다.

---

## Reference

* [스프링 부트 Auto-configuration과 JPA(하이버네이트) SQL문 로깅](https://www.popit.kr/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B6%80%ED%8A%B8-auto-configuration%EA%B3%BC-jpa%ED%95%98%EC%9D%B4%EB%B2%84%EB%84%A4%EC%9D%B4%ED%8A%B8-sql%EB%AC%B8-%EB%A1%9C%EA%B9%85/)