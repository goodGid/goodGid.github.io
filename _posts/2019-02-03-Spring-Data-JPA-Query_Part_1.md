---
layout: post
title:  " Spring Data JPA Query 사용 - 1편"
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

* Spring Data JPA의 CrudRepository만을 이용해 단순 CRUD 작업이 가능하다.

* 하지만 좀 더 다양한 기능을 마음대로 사용하기 위해선 추가적인 학습이 필요하다.

* 다양한 조건을 실행하는 쿼리를 작성하는 방법에 대해 알아보자.

1. *[쿼리 메소드]({{site.url}}/Spring-Data-JPA-Query_Part_1/#쿼리-메소드-이용하기)라는 **메소드의 이름**만으로 원하는 SQL을 실행하는 방법* 

2. *[페이징과 정렬]({{site.url}}/Spring-Data-JPA-Query_Part_1/#페이징-처리와-정렬)에 대한 처리*

3. [@Query를 이용한 좀 더 구체화된 JPQL 처리]({{site.url}}/Spring-Data-JPA-Query_Part_2)







---

## 쿼리 연습을 위한 준비

* JPA에서는 각 DB에 맞는 **Dialect**가 별도의 SQL에 대한 처리를 자동으로 처리해준다.

* 하지만 복잡한 쿼리를 작성하기 위해서는 DB를 대상으로 하는 SQL이 아니라 

* JPA에서 사용하는 **Named Query**, **JPQL(Java Persistence Query Language)**, **Query dsl**이라는 것을 학습해야 한다.

* Spring Data JPA는 이러한 번거로운 과정을 조금이라도 줄여줄 수 있다.

* 그 방법 중 하나가 **쿼리 메소드**라는 기능이다.

* **쿼리 메소드**는 메소드의 이름만으로 필요한 쿼리를 만들어 내는 기능이다.

---

## 쿼리 메소드 이용하기

* Spring Data JPA는 메소드의 이름만으로 원하는 **질의(query)**를 실행할 수 있는 방법을 제공한다.

* 이때 쿼리라는 용어는 *select* 에만 해당한다는 점을 주의하자.

* 예를 들어 *find...By* 로 쿼리 메소드를 작성한다면 'find' 뒤에 **엔티티 타입**을 지정한다.

* 그리고 리턴 타입으로는 Collection< T >으로 설계하면 된다.

* 또한 'By'의 뒤쪽에는 **컬럼**명을 이용한다.

* 쿼리 메소드의 **리턴 타입**은 *Page< T >*, *Slice< T >*, *List< T >*와 같은 **Collection< T >** 형태가 된다.

* 쿼리 메소드를 작성하는 자세한 방법은 [Spring Data JPA 문서](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation)를 참고하자.

![](/assets/img/java/spring_data_jpa_query_part_1_1.png)

<br>

* 빈도가 높은 쿼리 메소드에 대해 알아보자.

> Collection< T > findBy + 속성 이름(속성 타입)

* 만약 게시물에서 특정 글쓴이가 작성한 글을 찾고자 한다면 다음과 같이 쿼리를 작성하면 된다.

``` sql
public Collection<Board> findByWriter(String writer);
```

---

> LIKE 구문

* LIKE에 대한 처리는 4가지 형태를 사용한다.

1. 단순 like : Like

2. 키워드 + '%' : StartingWith

3. '%' + 키워드 : EndingWith

4. '%' + 키워드 + '%' : Containing

``` sql
--  작성자 이름에 "text"라는 문자가 들어있는 게시글을 검색하고 싶은 경우
public Collection<Board> findByWriterLike(String text);
public Collection<Board> findByWriterStartingWith(String text);
public Collection<Board> findByWriterEndingWith(String text);
public Collection<Board> findByWriterContaining(String text);
```



---

> 조건 : and 혹은 or 

* 예를 들어 게시글의 title과 content 속성에 특정한 문자열이 들어있는 게시물을 검색하려면 

* 'findBy' + 'TitleContaining' + 'Or' + 'ContentContaining'과 같은 형태가 된다.

``` sql
public Collection<Board> findBy TitleContainingOrContentContaining(String title, String content);
```


---

> 부등호

* **>** : GreaterThan

* **<** : LessThan

* 예를 들어 게시물의 title에 특정 문자가 포함되어 있고(=And)

* bno가 특정 숫자 초과(=GreaterThan)인 데이터를 조회한다면 다음과 같다.

``` sql
public Collection<Board> findByTitleContainingAndBnoGreaterThan(String keywoard, Long num);
```

---


> order by

* 'OrderBy' + 속성 + 'Asc or Desc'

* 예를 들어 게시물의 bno가 특정 번호보다 큰 게시물을 bno 값의 역순(=Desc)으로 조회하고 싶다면 다음과 같다.

``` sql
public Collection<Board> findByBnoGreaterThanOrderByBnoDesc(Long bno);
```


---

## 페이징 처리와 정렬 

* 쿼리 메소드들에는 마지막 파라미터로 페이지 처리를 할 수 있는 **Pageable** 인터페이스와 정렬을 처리하는 **Sort** 인터페이스를 사용할 수 있다.

* Pageable 인터페이스는 여러 메소드가 존재하기 때문에 이를 구현하기보다는 **PageRequest** 클래스를 이용하는 것이 편리하다.


| of()   | 설명 |
|:-------:|:-------:|
| PageRequest.of(int page, int size) | 페이지 번호(0부터 시작), 페이지당 데이터의 수|
| ----
| PageRequest.of(int page, int size, <br> Sort.Direction direction, String... props) | 페이지 번호, 페이지당 데이터의 수, <br> 정렬 방향, 속성(컬럼)들|
| ----
| PageRequest.of(int page, int size, Sort sort) | 페이지 번호, 페이지당 데이터의 수, 정렬 방향|
|=====


<br>

> 페이징 처리

* Pageable 인터페이스는 말 그대로 페이징 처리에 필요한 정보를 제공한다.

* 예를 들어 *findByBnoGreaterThanOrderByBnoDesc* 메소드에 Pageable을 적용하면 다음과 같다.

``` sql
public List<Board> findByBnoGreaterThanOrderByBnoDesc(Long bno, Pageable paging);
```

* 코드는 기존과 동일하지만 파라미터에 Pageable이 적용되어 있고

* 리턴 타입으로 Collection< > 대신 List< >를 적용한 것이 달라졌다.

* 이에 대한 테스트 코드는 다음과 같다.

``` java
@Test
public void testBnoOrderByPaging() {
    //Pageable paging = new PageRequest(0, 10);
    //spring boot 2.0.0
    Pageable paging = PageRequest.of(0, 10);

    Collection<Board> results = repo.findByBnoGreaterThanOrderByBnoDesc(0L, paging);
    results.forEach(board -> System.out.println(board));
}
```

---

> 정렬 

* 정렬은 쿼리 메소드에서 *OrderBy* 로 처리해도 되지만

* Sort를 이용하면 원하는 방향을 파라미터로 결정할 수 있다는 장점이 있다.

* 쿼리 메소드에 정렬 부분을 지정하지 않은 메소드를 정렬해보자.

``` sql
public List<Board> findByBnoGreaterThan(Long bno, Pageable paging);
```

``` java
@Test
public void testBnoPagingSort() {
    Pageable paging = new PageRequest(0, 10, Sort.Direction.ASC, "bno");

    Collection<Board> results = repo.findByBnoGreaterThan(0L, paging);
    results.forEach(board -> System.out.println(board));
}
```

---

## Page< T > 타입 

* Page< T > 타입을 이용하면 Sprig MVC와 연동할 때 편리함을 제공한다.

``` sql
public Page<Board> findByBnoGreaterThan(Long bno, Pageable paging);
```

``` java
@Test
public void testBnoPagingSort() {
    //Pageable paging = new PageRequest(0, 10, Sort.Direction.ASC, "bno");
    
    //spring boot 2.0.0
    Pageable paging = PageRequest.of(0, 10, Sort.Direction.ASC, "bno");
    Page<Board> result = repo.findByBnoGreaterThan(0L, paging);
    
    System.out.println("PAGE SIZE: " + result.getSize());
    System.out.println("TOTAL PAGES: " + result.getTotalPages());
    System.out.println("TOTAL COUNT: " + result.getTotalElements());
    System.out.println("NEXT: " + result.nextPageable());
    
    List<Board> list = result.getContent();

    list.forEach(board -> System.out.println(board));	
}
```

* Page< Board >는 단순 데이터만을 추출하는 용도가 아니라

* 웹에서 필요한 데이터들을 추가적으로 처리해준다. 

![](/assets/img/java/spring_data_jpa_query_part_1_2.png)

``` java
Hibernate: select board0_.bno as bno1_0_, board0_.content as content2_0_, board0_.regdate as regdate3_0_, board0_.title as title4_0_, board0_.updatedate as updateda5_0_, board0_.writer as writer6_0_ from tbl_boards board0_ where board0_.bno>? order by board0_.bno asc limit ?

Hibernate: select count(board0_.bno) as col_0_0_ from tbl_boards board0_ where board0_.bno>?
```

* 주목할점은 테스트 코드를 실행하면 실제로 SQL문이 **2번 실행**된다.

* 첫번째 SQL : 데이터를 추출

* 두번째 SQL : 데이터의 개수를 파악하기 위해 *SELECT COUNT(...)* 실행

* 정리하자면 리턴 타입을 Page< T >로 하게 되면 웹 페이징에서 필요한 데이터를 한 번에 처리할 수 있기 때문에 

* **데이터를 위한 SQL**과 **개수를 파악하기 위한 SQL**을 매번 작성하는 불편함을 줄일 수 있다.


---

## 참고

* [스타트 스프링 부트 초급 개발자들을 위한 가볍고 넓은 스프링 부트](https://book.naver.com/bookdb/book_detail.nhn?bid=12247655)