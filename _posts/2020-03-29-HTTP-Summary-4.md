---
layout: post
title:  " HTTP 완벽 가이드 요약본 : 4장 커넥션 관리 "
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

### TCP 스트림은 세그먼트로 나뉘어 IP 패킷을 통해 전송된다.

![](/assets/img/http/http_summary_4_1.png)

* TCP는 **IP 패킷(혹은 IP 데이터그램)**이라고 불리는 작은 조각을 통해 데이터를 전송한다.

---

* HTTP가 메시지를 전송하고자 할 경우

* 현재 연결되어 있는 TCP 커넥션을 통해서

* 메시지 데이터의 내용을 **순서대로** 보낸다.

---

* TCP는 *세그먼트* 라는 단위로 데이터 스트림을 잘게 나누고

* 세그먼트를 *IP 패킷* 이라고 불리는 봉투에 담아서

* 인터넷을 통해 데이터를 전달한다.

---

* 각 TCP 세그먼트는 

* 하나의 IP 주소에서 다른 IP 주소로 IP 패킷에 담겨 전달된다.



### TCP 슬로우 스타트(Slow Start)

* TCP의 데이터 전송 속도는 

* TCP 커넥션이 생성되어 지속된 시간에 따라 달라질 수 있다.

---

* TCP 커넥션은 시간이 지나면서 자체적으로 **튜닝**되어

* 처음에는 커넥션의 최대 속도를 제한하고 

* 데이터가 성공적으로 전송됨에 따라서 속도 제한을 높힌다.

* 이렇게 조율하는 것을 [TCP 슬로우 스타트(Slow Start)]({{site.url}}/Error-Flow-Control/#슬로우-스타트slow-start)라 부른다.

* 이는 인터넷의 급작스러운 부하와 혼잡을 방지하는데 쓰인다.

---

* 이 혼잡제어 기능 때문에

* 새로운 커넥션은 

* 이미 어느 정도 데이터를 주고받은 튜닝된 커넥션보다 느리다.

* 튜닝된 커넥션은 더 빠르기 때문에

* HTTP에는 이미 **존재하는 커넥션을 재사용**하는 기능이 있다.





---

## 참고

* [HTTP 완벽 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=8509980)

* [[HTTP: The Definitive Guide] 14. 보안 HTTP](https://mkki.github.io/http/2018/02/09/http-the-definitive-guide-1-14.html)