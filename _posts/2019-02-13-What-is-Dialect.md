---
layout: post
title:  " JPA에서 말하는 Dialect(방언)이란? "
categories: Java
author: goodGid
---
* content
{:toc}

## Dialect(방언)이란? 

* SQL은 다음과 같이 표준 SQL인 ANSI SQL이 있으며 

  ANSI SQL 이외에 
  
  각 DBMS Vendor(벤더, 공급업체)인 MS-SQL, Oracle, MySQL, PostgreSQL 에서 자신만의 기능을 추가한 SQL이 있다.

* **ANSI SQL**이 모든 DBMS에서 **공통으로 사용 가능한 핵심 표준 SQL**이지만 

  여러 제품의 DBMS에서는 자신만의 **독자적인 기능**을 위해서 추가적인 SQL을 만들었다.

![](/assets/img/java/what_is_dialect_1.png)

* 예를 들어 MS-SQL의 T-SQL 그리고 Oracle의 PL/SQL이 대표적이다. 

  또한 기본 키를 할당하는 방법에도 
  
  MySQL의 경우는 AUTO_INCREMENT라는 기능과 
  
  Oracle에는 SEQUENCE라는 기능이 있다. 

* 이것은 마치 대한민국의 수도인 서울에서 사용하는 표준어가 있고 

  충청, 강원, 경상, 전라, 제주 등의 여러 지방에서 사용하는 방언이 있는 것이라 볼 수 있다.


> ANSI란?

* DBMS(Oracle, My-SQL, DB2 등등)들에서 각기 다른 SQL를 사용하므로 

  미국 표준 협회(American National Standards Institute)에서 이를 표준화하여 표준 SQL문을 정립시켜 놓은 것이다.


---

## Dialect(방언)

* JPA는 어플리케이션이 직접 JDBC 레벨에서 SQL을 작성하는 것이 아니라 

  JPA가 직접 SQL을 작성하고 실행하는 형태이다. 

* 그런데 DBMS 종류별로 사용하는 SQL 문법이 다르므로 종류에 맞게 사용할 필요가 있다.

* 예를 들어 JPA로 게시판을 개발 시 

  DBMS마다 다른 페이징 방법을 처리할 필요가 생기게 된다.

  또한 각각 DBMS 벤더별로 다른 모듈을 개발해 주어야 한다. 

* 만약 고객의 요구에 따라 Oracle DB를 기준으로 작성했던 게시판 프로그램을 

  MS-SQL에 맞게 추가로 개발하려면 엄청난 비용이 들어갈 것이다.

* 그러나 개발자는 JPA를 이용하게 되면 

  쿼리를 작성할 필요도 없고 
  
  JPA를 사용하더라도 DBMS별로 조금씩 다른 SQL 방언을 걱정할 필요도 없어진다.

* JPA에서는 이를 **Dialect**라는 

  **추상화된 방언 클래스**를 제공하고 각 벤더에 맞는 구현체를 제공한다.

![](/assets/img/java/what_is_dialect_2.png)

* JPA에선 설정을 통해 원하는 **Dialect만 설정해주면 해당 Dialect를 참고하여 그에 맞는 쿼리를 생성**한다. 

  따라서 개발 시에는 Oracle DB에 맞게 설정하고 어플리케이션을 개발하다
  
  실제 고객의 환경이 SQL SERVER를 사용 중이라면 
  
  설정만 SQLServerDialect로 변경해주면 된다.

---

## Hibernate Dialect 설정과 종류

* Hibernate의 경우엔 설정 파일인 persistence.xml에서 hibernate.dialect 설정값을 변경하면 된다.

* 예를 들어 대표적으로 MySQL InnoDB의 Dialect 설정코드이다.

``` java
<property name="hibernate.dialect" value="org.hibernate.dialect.MySQL5InnoDBDialect" />
```

---

## Reference

* [[JPA - Hibernate] Dialect(방언)이란? 하이버네이트 Dialect 종류](https://dololak.tistory.com/465)

* [ANSI SQL이란?](https://velog.io/@gillog/ANSI-SQL%EC%9D%B4%EB%9E%80)