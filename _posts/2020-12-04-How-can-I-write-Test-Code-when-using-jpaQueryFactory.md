---
layout: post
title:  " jpaQueryFactory 사용 시 Test Code를 어떻게 작성할 수 있을까? "
categories: TIL
author: goodGid
---
* content
{:toc}

## Background

* Spring 프레임워크과 QueryDSL를 사용하는 환경에서

  **jpaQueryFactory**를 사용하여 DB로부터 값을 읽어오는 Code가 있다.

* 이 부분에 대해 Test Code를 작성하는데

  어떤식으로 Test Code를 작성해야할 지 고민이 되었다.

* 그래서 구글링을 하였고
  
  [Junit, Mockito and Querydsl (Mysema) for mocking JPAQueryFactory](https://stackoverflow.com/questions/50491750/ junit-mockito-and-querydsl-mysema-for-mocking-jpaqueryfactory) 라는 글을 찾았다.

* 윗글에서 해결의 실마리를 얻을 수 있었고

  필자는 JUnit이 아니라 Spock을 사용하므로 Spock 문법에 맞게 바꿔서 사용했다.




---

## Code

### Service

``` java
List<GoodGid> goodGidList = jpaQueryFactory.selectFrom(QGoodGid)
                                            .where(builder)
                                            .limit(limitSize)
                                            .fetch();
```

---

### Test Code

#### Spock

* Spock & Groovy 문법으로

  jpaQueryFactory를 Mocking하는 Test Code를 작성하였다.

``` java
JPAQuery step1 = Mock(JPAQuery)
JPAQuery step2 = Mock(JPAQuery)
JPAQuery step3 = Mock(JPAQuery)

def goodGid1 = new GoodGid()
def goodGid2 = new GoodGid()
def goodGidList = Lists.newArrayList(goodGid1, goodGid2)

jpaQueryFactory.selectFrom(QGoodGid) >> step1
step1.where(_) >> step2
step2.limit(_) >> step3
step3.fetch() >> goodGidList
```

---

#### JUnit

``` java
JPAQuery step1 = Mockito.mock(JPAQuery.class);
JPAQuery step2 = Mockito.mock(JPAQuery.class);
JPAQuery step3 = Mockito.mock(JPAQuery.class);

GoodGid goodGid1 = new GoodGid()
GoodGid goodGid2 = new GoodGid()

Mockito.when(jpaQueryFactory.selectFrom(QGoodGid)).thenReturn(step1);
Mockito.when(step1.where(builder)).thenReturn(step2);
Mockito.when(step2.limit(limitSize)).thenReturn(step3);
Mockito.when(step3.fetch()).thenReturn(Lists.newArrayList(goodGid1, goodGid2));
```

---

## Summary

* ( 나와 비슷한 고민을 가졌던 )

  누군가에겐 도움이 되는 글이 되었으면 좋겠다 !