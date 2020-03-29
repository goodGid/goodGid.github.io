---
layout: post
title:  " HTTP Connection 헤더 쉽게 알아보기 "
categories: HTTP
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## HTTP 통신 과정

* HTTP는 클라이언트와 서버 사이에

* 프록시 서버, 캐시 서버 등과 같은 **중개 서버**가 놓이는 것을 허락한다.

* HTTP 메시지는 클라이언트에서 서버까지 **중개 서버들**을 하나하나 거치면서 전달된다.





## Connection 헤더 특징

* HTTP Connection 헤더 필드의 값은 **쉼표(,)**로 구분한다.

* Connection 헤더에 있는 **모든 헤더 필드**는

* 메시지를 다른 곳으로 전달하는 시점에 **삭제**하여 

* 다음 커넥션에 전달시키지 않아야한다.

---

* Connection 헤더에는 **홉별(hop-by-hop)** 헤더 명을 기술하는데

* Connection 헤더에 명시된 헤더들이 

* 다른 커넥션에 전달되는 것을 방지하기 때문에

* 이것을 **헤더 보호기**라 한다.

> Hop-by-Hop

* 홉(Hop)은 **각 서버**를 의미한다.

* 홉별은 특정 두 서버 간에만 영향을 미치고 

* 다른 서버 간에는 영향을 미치지 않음을 뜻한다.



## Connection 헤더 적용

* HTTP 어플리키에션이 

* **Connection 헤더**와 함께 **메시지**를 받으면

* 수신자는 송신자에게서 온 요청에 기술되어 있는 **모든 옵션**을 적용한다.

* 그리고 다음 홉에 메시지를 전달하기 전에

* 위에서 말했듯이 

* Connection 헤더에 기술되어 있던 모든 헤더를 삭제한 후 다음 커넥션 요청을 실시한다.

> Example

```
서버 ----------> 클라이언트 혹은 프록시

HTTP/1.1 200 OK
Connection : meter, close, bill-my-credit-card
...
```

* 서버가 Response에 위와 같이 보낸다면 다음처럼 해석할 수 있다.

1. Connection 헤더는 meter 헤더를 다른 커넥션으로 전달 X

1. 해당 트랜잭션이 끝나면 커넥션을 종료

1. bill-my-credit-card 옵션을 적용



## Summary

* 정말 간략하게 HTTP 헤더 특징에 대해 알아보았다.

* 이 글에서 핵심이 되는 부분은

* Connection에 담겨있는 헤더 값들은 

* 다음 커넥션에 영향을 끼쳐선 안되기 때문에

* 현재 커넥션에 있는 헤더 값들을 모두 삭제 한 후 

* 다음 커넥션 요청을 진행해야 한다는 점이다.



---

## 참고

* [HTTP 완벽 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=8509980)
