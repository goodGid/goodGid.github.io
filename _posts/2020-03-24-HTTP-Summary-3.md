---
layout: post
title:  " HTTP 완벽 가이드 요약본 : 3장 HTTP 메시지 "
categories: HTTP
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## Prologue

* [HTTP 완벽 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=8509980) 책을 보면서 

* 포스팅 하기엔 너무 가볍지만 

* 내가 알지 못했던 부분들을 정리하기 위해 작성하는 글이다.


## Concept

### CRLF

![](/assets/img/http/http_summary_3_1.png)

* HTTP 헤더 영역은

* *이름, 콜론(:), 선택적인 공백, 값, CRLF* 가 순서대로 나타나는 *0개 이상*의 헤더들로 구성되어있다.

* 그리고 구성의 마지막 요소인 CRLF는 **캐리지 리턴(CR)** + **개행 문자(LF)** 구조로 이루어져 있다.

    * Carriage Return(CR) : 커서를 현재 행의 맨 좌측으로 이동한다.

    * Line Feed(LF) : 커서를 현재 행의 다음 행으로 이동한다.


### HTTP 버전

> HTTP / <메이저>,<마이너>


* HTTP의 버전을 명시하는 부분을 보면

* 앞자리를 **메이저** 

* 뒷자리르 **마이너**라고 부른다.

* 만약 http/2.0에서의

* 메이저는 2 / 마이너는 0이다.


### HTTP 버전 번호

* 버전 번호는 HTTP/x,y 형식으로 용청 / 응답 메시지 양쪽 모두에 기술된다.

* 이것은 HTTP 어플리케이션들이 자신이 따르는 프로토콜의 버전을

* 상대방에게 말해주기 위한 수단이 된다.

---

* 버전 번호는 HTTP로 대화하는 어플리케이션들에게

* **대화 상대의 능력**과 **메시지의 형식**에 대한 단서를 제공해주기 위한 것이다.

* HTTP/1.1 어플리케이션과 

* HTTP/1.2 어플리케이션은 

* **1.2 버전의 새로운 기능을 사용할 수 없다**는 것을 알아야한다.

* 1.1 버전 어플리케이션은 아마도 1.2 버전의 기능을 구현하지 않았을 것이기 때문이다.


---

* 버전 번호는 어떤 어플리케이션이 **지원하는 가장 높은 HTTP 버전**을 가리킨다.

* 때로 이는 어플리케이션 간에 혼란을 유발시킨다.

* HTTP/1.0 어플리케이션이 

* 버전 번호가 HTTP/1.1로 된 응답을 받았을 때

* 이를 HTTP/1.1 메시지라고 해석할 수 있다.

* 응답의 프로토콜 버전이 HTTP/1.1이라는 것은

* 사실 응답을 보낸 어플리케이션이 

* HTTP/1.1까지 이해할 수 있음을 의미하는 것이다.

* 그렇기 때문에 주의해야 한다.


---


* 버전 번호는 **분수**로 다루어지지 않음에 주의하라.

* 버전의 각 숫자는 **각각 분리된 숫자**로 다루어진다.

* 따라서 어느 쪽이 큰 HTTP 버전을 비교할 때 

* 각 숫자는 반드시 따로 비교해야한다.

* 예를 들어 HTTP/2.22는 HTTP/2.3보다 크다.

* 왜냐하면 22는 3보다 큰 숫자이기 때문이다.



### 헤더를 여러 줄로 나누기

* 긴 헤더 줄은 그들을 여러 줄로 쪼개서 가독성을 높힐 수 있다.

* 이 경우 앞에는 최소

* **하나의 스페이스** 혹은 **탭 문자**가 와야한다.


```
HTTP/1.0 200 OK
Content-Type : image/gif
Content-Length : 8971
Server : Test Server
    Version 1.0
```


* 위 예에서 응답 메시지는

* 여러 줄로 값이 쪼개진 Server 헤더를 나타낸다.

* 그 헤더의 완전한 값은 "Test Server Version 1.0"이다.


---

## Reference

* [HTTP 완벽 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=8509980)

* [WEB-HTTP(RequestMessage & ResponseMessage)](https://eunhyejung.github.io/network,server/2018/09/19/Http-Concept.html)


* [CRLF는 도대체 무엇인가?](https://velog.io/@koseungbin/CRLF%EB%8A%94-%EB%8F%84%EB%8C%80%EC%B2%B4-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)