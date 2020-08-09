---
layout: post
title:  " HTTP Connection 성능 향상 기술 : 병렬(Parallel)/지속(Persistent) Connection "
categories: HTTP
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.


## 병렬(Parallel) Connection

* 여러 개의 TCP Connection을 통한 동시 HTTP 요청을 한다.

* HTTP는 클라이언트가 여러 개의 Connection을 맺음으로써 

* 여러개의 HTTP 트랜잭션을 병렬로 처리할 수 있게 한다.

![](/assets/img/http/HTTP-Connection-Tech_1.png)

* 위 사진은 

* 4개의 이미지를 

* 각 TCP Connection에서 병렬로 내려받고 있는 상태를 나타내는 이미지이다.


### 병렬 Connection 장점

1. 각 Connection의 지연 시간을 겹치게 하면 **총 지연 시간**을 줄일 수 있다.

2. 클라이언트의 인터넷 대역폭을 <br> 한 개의 Connection이 다 사용하지 않는다면 <br> 나머지 요청을 내려받는 데 남은 대역폭을 사용할 수 있다.

> Example

* 상황 : HTML을 그리는데 3개의 이미지가 필요하다.

![](/assets/img/http/HTTP-Connection-Tech_2.png)

1. *Connection-1* 로 HTML 페이지를 먼저 내려받는다.

2. 3개의 트랜잭션이 각각 별도의 Connection에서 동시에 처리된다.

---

* 이미지들을 병렬로 내려받기 때문에 

* Connection 지연이 겹쳐지고 **총 지연시간**이 줄어든다.

> 총 지연시간

```
Connection 생성 시간 : 1초
처리 시간 : 1초
Connection 끊는 시간 : 1초
```

* 위와 같은 상황에서

* 만약 순차적으로 Connection을 맺는다면

* 3번의 요청이 필요하므로 총 9초가 필요하다. 

* 하지만 병렬로 하게 되면 3초만에 원하는 요청이 끝나게 된다.

* (*지연시간이라는 개념에 대한 이해의 편의를 위한 예시이므로 100% 정확한 설명은 아닐 수 있다.*)




### 병렬 Connection의 단점

1. 각 트랜잭션마다 새로운 Connection을 맺고 끊기 때문에 시간과 대역폭이 소요

2. 각 새로운 Connection은 TCP의 [슬로우 스타트(Slow Start)]({{site.url}}/Error-Flow-Control/#슬로우-스타트slow-start) 로 인한 성능 저하

3. 실제로 연결할 수 있는 병렬 Connection의 수는 유한정








### 벙렬 Connection의 현실

1. 브라우저는 실제로 병렬 Connection을 **적은 수**로만 사용한다.

2. 다수의 Connection은 **메모리를 많이 소모**하고 성능 문제를 야기한다.

3. 네트워크 대역폭이 좁다면 <br> 병렬 Connection을 **순차적 Connection**처럼 사용하기 때문에 <br> 사실상 병렬 Connection의 성능상의 장점은 거의 없어질 수 있다.








## 지속(Persistent) Connection

* Connection을 맺고 끊는 데서 발생하는 지연을 제거하기 위해

* 처리가 완료된 후 연결을 끊지 않고 계속 연결된 상태의 Connection을 유지시킨다.

* 그로인해 해당 서버는 이미 맺어져 있는 지속 Connection을 재사용함으로써 다음과 같은 이점을 누리게 된다.

---

1. Connection을 맺기 위한 준비작업 시간 절약

2. 이미 맺어져 있는 Connection은 <br> TCP의 [슬로우 스타트(Slow Start)]({{site.url}}/Error-Flow-Control/#슬로우-스타트slow-start)으로 인한 지연을 피함으로써 더 빠른 데이터 전송 가능

### 지속 Connection 종류

* HTTP/1.0+ : **Keep-Alive** Connection

* HTTP/1.1 : **지속** Connection

* 2가지 개념은 각 글을 참고하자.




## 병렬 vs 지속 Connection

* 지속 Connection은 병렬 Connection에 비해 몇 가지 장점이 있다.

---

1. Connection 수 감소

2. 튜닝된 Connection을 유지

3. Connection을 맺기 위한 사전 작업과 지연 시간 단축

---

> 튜닝된 Connection이란?

* 슬로우 스타트(Slow Start) 과정을 겪으면서 

* 한 번에 다수의 패킷을 전송할 수 있는 권한을 얻은 상태의 Connection을 뜻한다.

---

* 그렇다면 무조건적으로 지속 Connection이 좋을까?

* 그렇지 않다.

* 지속 Connection만 사용하게 되면 

* 계속 연결된 상태로 있는 수많은 Connection이 쌓이게 된다.

* 이는 **로컬의 리소스** / **클라이언트와 서버의 리소스**에 불필요한 소모를 발생시킨다.

---

* 그렇기 때문에 

* 지속 Connection과 병렬 Connection을 함께 사용할 때 가장 효과적이다.

* 실제로 많은 애플리케이션은 적은 수의 병렬 Connection만을 맺고 그것을 유지한다.



---

## Reference

* [HTTP 완벽 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=8509980)
