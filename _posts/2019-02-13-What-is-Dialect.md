---
layout: post
title:  " Dialect(방언)이란? "
categories: Java
author: goodGid
---
* content
{:toc}

## Dialect(방언)이란? 

* SQL은 다음과 같이 표준 SQL인 ANSI SQL이 있으며 ANSI SQL 이외에 각 DBMS Vendor(벤더, 공급업체)인 MS-SQL, Oracle, MySQL, PostgreSQL 에서 자신만의 기능을 추가한 SQL이 있다.

* **ANSI SQL**이 모든 DBMS에서 **공통적으로 사용가능한 핵심 표준 SQL**이지만 

* 여러 제품의 DBMS에서는 자신만의 독자적인 기능을 위해서 추가적인 SQL을 만들었다.

![](/assets/img/java/what_is_dialect_1.png)

* 예를 들어 MS-SQL의 T-SQL 그리고 Oracle의 PL/SQL이 대표적이다. 

* 또한 기본키를 할당하는 방법에도 MySQL의 경우는 AUTO_INCREMENT라는 기능과 오라클 DB에는 시퀀스라는 기능이 있다. 

* 이것은 마치 대한민국의 수도인 서울에서 사용하는 표준어가 있고 충청, 강원, 경상, 전라, 제주 등의 여러 지방에서 사용하는 방언이 있는것이라 볼 수 있다.










---

## Dialect(방언)

* JPA는 어플리케이션이 직접 JDBC 레벨에서 SQL을 작성하는 것이 아닌 JPA가 직접 SQL을 작성하고 실행하는 형태이다. 

* 그런데 DBMS 종류별로 사용하는 SQL 언어가 조금씩 다르다면 다른 부분에 대한 대처가 필요할 것이다. 

* 예를 들어 JPA로 게시판을 개발할 때 DBMS마다 다른 페이징 방법을 처리할 필요가 생기게된다.

* 또한 각각 DBMS 벤더별로 다른 모듈을 개발해 주어야 한다. 

* 만약 고객의 요구에 따라 오라클 DB를 기준으로 작성했던 게시판 프로그램을 MS-SQL에 맞게 추가적으로 개발하려면 엄청난 비용이 들어갈 것이다.

* 그러나 개발자는 JPA를 이용하게 되면 쿼리를 작성할 필요도 없고 JPA를 사용하더라도 각 DBMS별로 조금씩 다른 SQL 방언을 걱정할 필요도 없어진다.

* JPA에서는 이를 **Dialect**라는 **추상화된 방언 클래스**를 제공하고 각 벤더에 맞는 구현체를 제공한다.

![](/assets/img/java/what_is_dialect_2.png)

* JPA에서는 설정을 통해 원하는 **Dialect만 설정해주면 해당 Dialect를 참고하여 그에 맞는 쿼리를 생성**한다. 

* 따라서 개발시에는 Oracle DB에 맞게 설정하고 어플리케이션을 개발하다가 실제 고객의 환경이 SQL SERVER를 사용중이라면 설정만 SQLServerDialect로 변경해 줌으로써 불필요한 변경에 대한 자원 소모를 줄일 수 있다.

---

## 하이버네이트 Dialect 설정과 종류

* 설정은 하이버네이트의 경우에는 설정파일인 persistence.xml의 hibernate.dialect 설정값을 바꾸어 주면된다. 

* 예를들어 대표적으로 MySQL InnoDB의 Dialect 설정코드이다.

``` java
<property name="hibernate.dialect" value="org.hibernate.dialect.MySQL5InnoDBDialect" />
```

* 방언의 종류에 대해서는 JPA 구현체마다 다를 수 있는데 하이버네이트의 경우에는 5.2 버전을 기준으로 DBMS별로 다음과 같은 방언(Dialect)을 제공하고 있다.




---

## Reference

* [[JPA - Hibernate] Dialect(방언)이란? 하이버네이트 Dialect 종류](https://dololak.tistory.com/465)