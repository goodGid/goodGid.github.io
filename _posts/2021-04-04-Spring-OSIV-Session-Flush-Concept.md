---
layout: post
title:  " OSIV 패턴(Open Session in View Pattern) : Session의 Flush 개념에 대해 알아보자. "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 게시물은 [원글](http://aeternum.egloos.com/2798098)을 읽고 정리한 글이며 원글을 읽어보는 걸 강력하게 추천드립니다 !

## Hibernate의 Flush 타이밍

* 일반적으로 Transaction이 Commit될 때

  Session의 모든 변경사항이 DB로 Flush가 이뤄진다.

* 하지만 영속성 컨텍스트의 Flush 시점 역시 **커스터 마이징**이 가능하다.

* 기본적으로 Hibernate는 다음과 같은 경우에 Session을 DB에 Flush 한다.


1. session.flush( )를 명시적으로 호출하는 경우

1. Hibernate Transaction이 Commit 되는 경우

1. 쿼리를 실행하기 전에 영속성 컨텍스트의 상태가 쿼리 결과에 영향을 미친다고 판단되는 경우 




---

## Session.setFlushMode( )

* Session.setFlushMode( ) 메소드를 사용하면 

  Hibernate의 기본 Flush 규칙을 변경할 수 있다. 
  
* Hibernate의 Session Flush 모드는 **4가지**이다.

  기본값은 **FlushMode.AUTO**로 위에서 설명한 3가지 경우에 영속성 컨텍스트를 Flush 한다.



### FlushMode.ALWAYS

* 모든 쿼리를 실행하기 전에 영속성 컨텍스트를 Flush 한다.

---

### FlushMode.AUTO

* 기본 Flush 모드로 위에서 

  설명한 3가지 경우에 영속성 컨텍스트를 Flush 한다.

```
session.flush( )를 명시적으로 호출하는 경우                              --> O
Hibernate Transaction이 Commit 되는 경우                             --> O
쿼리를 실행하기 전에 영속성 컨텍스트의 상태가 쿼리 결과에 영향을 미친다고 판단되는 경우 --> O
```

---

### FlushMode.COMMIT

* 쿼리를 실행하기 전에는 Flush하지 않는다.

```
session.flush( )를 명시적으로 호출하는 경우                              --> O
Hibernate Transaction이 Commit 되는 경우                             --> O
쿼리를 실행하기 전에 영속성 컨텍스트의 상태가 쿼리 결과에 영향을 미친다고 판단되는 경우 --> X
```

---

### FlushMode.MANUAL

* 명시적으로 flush( )를 호출할 때만 영속성 컨텍스트를 Flush 한다. 

```
session.flush( )를 명시적으로 호출하는 경우                              --> O
Hibernate Transaction이 Commit 되는 경우                             --> X
쿼리를 실행하기 전에 영속성 컨텍스트의 상태가 쿼리 결과에 영향을 미친다고 판단되는 경우 --> X
```


---

## Summary

* 글의 서두에도 언급했지만

  반드시 [Open Session in View Pattern](http://aeternum.egloos.com/2798098)글을 읽어보는 걸 강력하게 추천한다.

  정말 너무나도 좋은 글이라서 읽어보는 걸 권하고 싶다 !


---

## Reference

* [Open Session in View Pattern](http://aeternum.egloos.com/2798098)