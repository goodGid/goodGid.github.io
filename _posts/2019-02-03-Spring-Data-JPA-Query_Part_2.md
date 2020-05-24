---
layout: post
title:  " Spring Data JPA Query 사용 - 2편"
categories: Spring
author: goodGid
---
* content
{:toc}

* Spring Data JPA의 CrudRepository만을 이용해 단순 CRUD 작업이 가능하다.

* 하지만 좀 더 다양한 기능을 마음대로 사용하기 위해선 추가적인 학습이 필요하다.

* 다양한 조건을 실행하는 쿼리를 작성하는 방법에 대해 알아보자.

1. [쿼리 메소드라는 메소드의 이름만으로 원하는 SQL을 실행하는 방법]({{site.url}}/Spring-Data-JPA-Query_Part_1)

2. [페이징과 정렬에 대한 처리]({{site.url}}/Spring-Data-JPA-Query_Part_1)

3. *@Query를 이용한 좀 더 구체화된 JPQL 처리*






---

## @Query 개념

* 좀 더 구체적인 조건 등을 지정하기 위해서 Spring Data JPA는 쿼리 메소드 대신에 **@Query(쿼리 어노테이션)**을 이용한다.

* 이때 쿼리는 **JPQL(객체 쿼리)이라는 JPA에서 사용하는 쿼리 문법**을 이용하거나

* **순수한 DB에 맞는 SQL**을 사용할 수 있다.

* JPQL을 사용시 JPA의 구현체에서 이를 해석하고 실행한다.


---

## @Query 작성

* JPQL의 가장 기본적인 형태는 *테이블* 대신에 **엔티티 타입**을 이용한다는 점과

* *컬럼명* 대신에 **엔티티의 속성**을 이용한다.

> @Query 기본 

* 게시물에서 제목에 대한 검색 기능을 Query를 작성해보면 다음과 같다.

``` java
@Query("SELECT b FROM Board b WHERE b.title like %?1% and b.bno > 0 ORDER BY b.bno desc")
    public List<Board> findByTitle(String title);
```

* @Query의 내용물에서 **`%?1%`%**을 보면

* '?'는 JDBC상에서 PreparedStatement에서 사용한 것과 동일하다 생각하면 된다.

* '?1'은 첫 번째로 전달되는 파라미터이다.

> @Query - @Param

``` java
@Query("SELECT b from Board b WHERE b.content like %:content%  and b.bno > 0 order by b.bno desc")
	public List<Board> findByContent(@Param("content") String content);
```

* 기존의 검색 처리 Query와 달리 **`%:content%`**와 같이 처리되는 것을 볼 수 있다.

> @Query - #{#entityName}

``` java
@Query("SELECT b FROM #{#entityName} b WHERE b.writer LIKE %?1% AND b.bno > 0")
	public List<Board> findByWriter(String content);
```

* 현재 Repository의 **엔티티 타입**을 **자동**으로 사용하는 Query다.

* #{#entityName}은 Repository 인터페이스를 정의할 때 *<엔티티 타입, PK 타입>*에서 **엔티티 타입**을 **자동**으로 참고한다.

* 유사한 상속 구조의 Repository 인터페이스를 여러 개 생성하는 경우라면 유용하게 사용할 수 있다.

---

## @Query 활용

* @Query를 활용하면 얻을 수 있는 장점들에 대해 알아보자.

<h5>1. 리턴 값이 반드시 엔티티 타입이 아니라 필요한 몇 개의 컬럼 값들만 추출할 수 있다.</h5>
    
- 엔티티 타입의 경우 테이블의 **모든 컬럼**을 조회한다.
    
- 하지만 JPQL을 이용하면 **필요한 컬럼들만**을 조회한다.

``` java
@Query("select board.bno, board.title, board.writer, board.regdate "
+ " from Board board where board.title like %?1% and board.bno > 0 order by board.bno desc")
public List<Object[]> findByTitle2(String title);
```
* 주의할 점은 리턴 타입이 엔티티 타입이 아니라 **Object[]**의 리스트 형태이다.

* 실행 후 출력 값을 확인해 보면 배열로 출력되는 것을 확인할 수 있다.

<br>

<h5>2. nativeQuery 속성을 지정해서 DB에 사용하는 SQL을 그대로 사용할 수 있다.</h5>

- SQL자체를 그대로 사용하고 싶거나 별도의 SQL 튜닝이 이루어진 경우 유용하게 사용할 수 있다.

``` java
@Query(value="SELECT bno, title FROM tbl_boards WHERE title LIKE CONCAT('%', ?1, '%')", nativeQuery=true)
public List<Object[]> findByTitle3(String title);
```

* nativeQuery 속성을 'true'로 지정하면 메소드 실행 시 @Query의 value 값을 그대로 실행한다.


<br>

<h5>3. Repository에 지정된 엔티티 타입 뿐 아니라 필요한 엔티티 타입을 다양하게 사용할 수 있다.</h5>

- JPQL의 경우 여러 엔티티 타입을 조회할 수 있기 때문에

- 한 번에 여러 엔티티 타입을 조회하는 경우에 유용하게 사용할 수 있다.

---

## Query와 Paging 처리/정렬

* @Query를 이용하더라도 페이징 처리를 하는 Pageable 인터페이스는 그대로 활용 가능하다.

* 만일 메소드의 파라미터에 Pageable 타입을 사용하게 되면 **@Query로 작성한 내용 + 페이징 처리**의 형태가 된다.

``` java
@Query("select board from Board board where board.bno > 0 order by board.bno desc")
public List<Board> findBypage(Pageable pageable);
```

``` java
@Test
public void testByPaging() {
    Pageable pageable = new PageRequest(0, 10);
    repo.findBypage(pageable).forEach(board -> System.out.println(board));
}
```

* 실행 결과로는 10개의 데이터가 bno으로 내림 차순된 결과를 볼 수 있다.


---

## 참고

* [스타트 스프링 부트 초급 개발자들을 위한 가볍고 넓은 스프링 부트](https://book.naver.com/bookdb/book_detail.nhn?bid=12247655)
