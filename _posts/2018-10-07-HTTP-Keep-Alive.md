---
layout: post
title:  " HTTP Keep Alive 알아보기 "
categories: HTTP
author: goodGid
---
* content
{:toc}

## HTTP 구조

* HTTP는 Connectionless 방식으로 연결을 매번 끊고 새로 생성하는 구조이다. 

* 이는 Network 비용 측면에서 최초 연결을 하기 위해 많은 비용을 소비하는 구조이다. 





## Keep Alive란?

* HTTP/1.1부터는 

* 이미 연결되어 있는 TCP 연결을 재사용하는 

* Keep-Alive라는 기능을 Default로 지원한다.

* 즉 Handshake 과정이 생략되므로 성능 향상을 기대 할 수 있다.

* 아래의 예는 [HTTP 1.1 Keep-Alive 기능에 대해](http://b.pungjoo.com/entry/HTTP-11-Keep-Alive-%EA%B8%B0%EB%8A%A5%EC%97%90-%EB%8C%80%ED%95%B4)글에서 발췌했다.

### Keep Alive 사용 X

```
$ telnet pungjoo.com 80
Trying 121.124.124.74...
Connected to pungjoo.com.
Escape character is '^]'.
GET / HTTP/1.0
Host: pungjoo.com
HTTP/1.1 302 Moved Temporarily
Date: Tue, 15 Jan 2008 01:33:56 GMT
Set-Cookie: JSESSIONID=B4329BFEDB1363BB90FCFA9568DDBF0B; Path=/
Location: http://pungjoo.com/servlet/com.pungjoo.blog2005.Action
Content-Type: text/html;charset=EUC-KR
Content-Length: 0
Connection: close

Connection to pungjoo.com closed by foreign host.
```

* Response 메시지와 함께

* **Connection to pungjoo.com closed by foreign host.** 메시지가 노출된다.

* 즉 Response 메시지와 함께 커넥션이 종료되었음을 알 수 있다.





### Keep Alive 사용 O

```
$ telnet pungjoo.com 80
Trying 121.124.124.74...
Connected topungjoo.com.

// [1]
GET / HTTP/1.1
Host: pungjoo.com
Connection: Keep-Alive
HTTP/1.1 302 Moved Temporarily
Date: Tue, 15 Jan 2008 01:36:26 GMT
Set-Cookie: JSESSIONID=2B3EE2FE56868BD9588A7B55C405974B; Path=/
Location: http://pungjoo.com/servlet/com.pungjoo.blog2005.Action
Content-Type: text/html;charset=EUC-KR
Content-Length: 0
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive

// [2]
GET / HTTP/1.1
Host: pungjoo.com
Connection: Keep-Alive
HTTP/1.1 302 Moved Temporarily
Date: Tue, 15 Jan 2008 01:36:35 GMT
Set-Cookie: JSESSIONID=E4E3D9B9CFE3693DC5AFC3D6ABDE5564; Path=/
Location: http://pungjoo.com/servlet/com.pungjoo.blog2005.Action
Content-Type: text/html;charset=EUC-KR
Content-Length: 0
Keep-Alive: timeout=5, max=99
Connection: Keep-Alive

// [3]
Connection to pungjoo.com closed by foreign host.
```

* Telnet(연결)은 한 번만 이뤄졌고 

* GET Method는 2번([1],[2]) 요청했다.

* 즉 이렇게 할 수 있는 이유는 **Keep Alive** 기능 때문이다.

---

* [2] : **Keep-Alive: timeout=5, max=99** 부분에서 max가 감소를 하는 것을 볼 수 있다.

* 이는 최초 연결된 Port에 대해서 기존엔 max=100이였지만

* 해당 시점에 1번의 요청이 더 이뤄졌기 때문에 추가적으로 99번에 Request가 가능하단 뜻이다.

---

* [3] : **Connection to pungjoo.com closed by foreign host.** 메시지

* 해당 메시지는 바로 나오는 것이 아니라

* 설정한 timeout(=5초)이 지난 후에 나오게 된다.

* 즉 Server/Client의 연결이 5초간 유지되었음을 알 수 있다.





## Keep Alive 특징

* Keep Alive의 유지 시간은 

* 연결된 Socket에 I/O Access가 마지막으로 종료된 시점부터 

* 정의된 시간까지 Access가 없더라도 세션을 유지하는 구조이다. 

* 즉 정의된 시간내에 Access가 이루어진다면 계속 연결된 상태를 유지할 수 있게 된다.

---

> Q. Keep Alive Timeout 설정은 왜 필요한가?

* 서버 자원은 무한정이 아니다.

* 그렇기 때문에 이러한 접속을 계속 유지하는 것은 Server에 손실을 발생시킨다.

* 즉 서버와 연결을 맺을 수 있는 Socket은 한정되어 있고 

* 연결이 오래 지속되면 다른 사람들이 연결을 못하게되는 상황이 닥친다.





## Keep Alive 성능 측면


### 장점 

![](/assets/img/http/HTTP-Keep-Alive_1.png)
*출처 : HTTP 완벽가이드 - 4.5.2 HTTP/1.0+의 Keep-Alive 커넥션*


* 위 이미지는 4개의 트랜잭션에 대해

* 연속적으로 4개의 커넥션을 생성하여 처리하는 방식과

* 하나의 지속 커넥션으로만 처리하는 방식을 비교한 이미지이다.

* 후자에서는 커넥션을 맺고 끊는 데 작업이 없어졌기 때문에 시간이 단축되었다.


### 단점

* 정적 자원(HTML, 이미지 파일 등)으로만 구성된 웹 서버에

* Keep Alive을 사용할 경우 약 50%의 성능 향상을 보인다고 한다.

---

* 위와 같은 성능 향상을 보이려면 

* 서버가 바쁘지 않아야 하는데 

* 바쁜 서버 환경에서 Keep Alive 기능을 사용할 경우 

* 모든 요청 마다 연결을 유지해야 하기 때문에 

* 프로세스 수가 기하급수적으로 늘어나 MaxClient값을 초과하게 된다.

* 따라서 메모리를 많이 사용하게 되며 이는 곧 성능 저하의 원인이 된다.

* 즉 대량 접속 시 효율이 떨어지게 된다.


## Keep Alive 문제점

* Keep-Alive 기능은 설계상 문제가 있었다.

* 그리고 그 설계상 문제를 100% 해결하지 못하였고

* 그렇기 때문에 HTTP/1.1 명세에서는 제외되었다.

* 하지만 한번 생성된 커넥션을 재사용한다는 개념은 유지되었다.





### 문제점

> 멍청한(Dumb) 프록시

* 일반적으로 HTTP는 클라이언트와 서버 사이에

* 프록시 서버, 캐시 서버 등과 같은 **중개 서버**가 놓이는 것을 허락한다.

* 그런데 여기서 프록시 서버가 멍청할 경우 문제가 발생한다.

* 멍청한 프록시는 Connection 헤더를 이해하지 못하고

* 해당 헤더들을 삭제하지 않고 요청 그대로를 다음 프록시에 전달한다.

* 예를 통해 알아보자.

![](/assets/img/http/HTTP-Keep-Alive_2.png)
*출처 : HTTP 완벽가이드 - 4.5.6 Keep-Alive와 멍청한(dumb) 프락시*




> Step 1

* 웹 클라이언트는 프록시에 Connection : Keep-Alive 헤더와 함께 메시지를 전송한다.

* 클라이언트는 커넥션을 유지하자는 요청에 대한 응답을 확인하기 위해 기다린다.




> Step 2

* 멍청한 프록시는 요청받은 HTTP의 Connection 헤더를 이해하지 못한다.

* 프록시는 Keep-Alive를 모르기 때문에 다음 서버에 메시지를 그대로 전달한다.

* 하지만 Connection 헤더는 [홉별(hop-by-hop)]({{site.url}}/HTTP-Connection-Header/#connection-헤더-특징) 헤더이다.

* 여기서 부터 **문제**가 시작된다.





> Step 3

* (b)에서 보이는 것처럼 전달된 HTTP 요청이 서버에 도착한다.

* 웹 서버가 프록시로부터 헤더를 받으면 

* 프록시가 커넥션을 유지하기를 원하는 걸로 잘못 판단하게 된다.

* 서버는 프록시와 커넥션을 유지하는 것에 동의를 하고 

* Connection : Keep-Alive 헤더를 포함하여 응답한다.

* 하지만 프록시는 그 헤더를 이해하지 못한다.




> Step 4

* 멍청한 프록시는 

* 서버로부터 받은 Connection : Keep-Alive 헤더를 포함하고 있는 응답 메시지를 클라이언트에게 전달한다.

* 클라이언트는 이 헤더를 통해

* 프록시가 커넥션을 유지하는 것에 동의했다고 생각한다.

* 하지만 Keep-Alive를 이해하지 못한 프록시는 그렇지 않다. 





> Step 5

* 멍청한 프록시는 서버로 받은 모든 데이터를 

* 클라이언트에게 전달 후 커넥션이 끊어지기를 기다린다.

* 하지만 서버는 프록시가 자신에게 커넥션을 유지하기를 요청한 것으로 알고 있기 때문에 커넥션을 끊지 않는다.

* 또한 클라이언트는 응답 메시지에 Keep-Alive가 있기 때문에

* 다음 요청을 보내기 시작할 때 커넥션이 유지되고 있는 프록시에 요청을 보낸다.

* 하지만 프록시는 같은 커넥션상에서 다른 요청이 오는 경우는 예상하지 못하기 때문에

* 그 요청은 프록시로부터 무시되고 브라우저는 응답 없이 대기를 하게 된다.

* 그래서 브라우저는 무한정 대기를 하다 타임아웃이 나서 커넥션이 끊기게 된다.




### 차선책

* 멍청한 프록시가 무조건 전달하는 문제를 해결하기 위해

* 개발자들은 Proxy-Connection이라는 헤더를 사용하는 차선잭을 제시하였다.

---

* 브라우저에서 일반적으로 전달하는 Connection 헤더 대신에

* 비표준인 Proxy-Connection 확장 헤더를 프록시에 전달한다.

---

* 프록시가 Proxy-Connection 헤더를 무조건 전달하더라도

* 웹 서버는 그것을 무시하기 때문에 문제가 되지 않는다.

---

* 하지만 Keep-Alive를 이해하는 프록시는 

* Proxy-Connection 헤더를 Connection 헤더로 변경하여 지속 커넥션을 유지할 수 있게 된다.

![](/assets/img/http/HTTP-Keep-Alive_3.png)
*출처 : HTTP 완벽가이드 - 4.5.7 Proxy-Connection 살펴보기*






#### 차선책의 한계

* 위 방식은 **클라이언트 <-> 서버** 사이에 

* 1개의 프록시만 있는 경우에만 동작한다.

* 만약 멍청한 프록시가 

* 똑똑한 프록시 옆에 존재한다면 똑같은 문제가 발생한다.

![](/assets/img/http/HTTP-Keep-Alive_4.png)
*출처 : HTTP 완벽가이드 - 4.5.7 Proxy-Connection 살펴보기*








## Keep Alive 사용법

### Version

#### HTTP/1.0+ 

```
Client(Browser)는 http 1.1을 준수하고 이해 할 수 있다고
Request에 Connection헤더에 Keep-Alive 값을 넣어 Server에 전송한다.
ex) Connection : Keep-Alive, ... 

Request를 받는 Server는 
Kepp Alive 기능을 활성화하고 
Keep Alive Timeout을 설정한다.
```

#### HTTP/1.1

* Default로 동작을 하므로 설정에 신경을 쓰지 않아도 된다.


#### HTTP/1.0+ vs HTTP/1.1

* 1.0+에서는 Keep-Alive를 사용하기 위해 설정을 해야했다면

* 1.1에서는 Keep-Alive를 끊기 위해 설정을 해야한다.

* 즉 설정의 목적이 사용하기 위함이냐 끊기 위함이냐로 생각하면 된다.




### 주의 사항

* 단 모든 TCP 세션을 무한정 유지할 수는 없으므로 Timeout 및 Max 설정을 통해 관리되어야 한다. 

    - Keep Alive Timeout : 요청에 대한 응답을 보낸 후 Timeout을 위한 timer가 동작한다.

    - 최근에는 N/W 환경이 개선되면서 Keep Alive Timeout이 점점 줄어드는 추세이다.

    - Event-driven 구조여서 non-blocking을 사용하는 Nginx 등은 <br> Keep Alive를 하면서도 Thread를 점유하지 않기 때문에 동시 처리에 유리하다.



## Keep Alive 예시

1. Image를 4개를 보여주어야 한다.

2. Client는 동시에 2개의 Image만 받아올 수 있다.

3. Image는 받아오는데 2초가 걸린다.

4. Port를 여는데 1초가 걸린다.

---

> Keep Alive : False 

```
처음 Server에 2개의 Port를 열고 Image를 받고 Client Socket의 닫는다. ( 3초 ) 
다시 Server에 2개의 Port를 열고 Image를 받고 Client Socket의 닫는다. ( 3초 ) 
총 6초가 걸린다.
```


> Keep Alive : True

```
처음 Server에 2개의 Port를 열고 Image를 받는다. ( 3초 ) 
재요청 시 기존에 열어 둔 Port로 Image를 받아온다. ( 2초 )
총 5초가 걸린다.
```


## Summary

* 2018.10.07 일에 처음으로 글을 작성하였고

* 2020.03.31 일에 내용을 추가하였다.

* 덕분에 글이 굉장히 길어졌다.

* 하지만 그만큼 퀄리티는 더 높아졌다 생각한다.

* 한 번에 읽기에 다소 부담스러울 수 있으니

* 충분히 나눠서 읽으면서 확실하게 이해를 하였으면 좋겠다.




---

## Reference

* [HTTP 1.1 Keep-Alive 기능에 대해](http://b.pungjoo.com/entry/HTTP-11-Keep-Alive-%EA%B8%B0%EB%8A%A5%EC%97%90-%EB%8C%80%ED%95%B4)

* [Keepalive란?](https://sarc.io/index.php/miscellaneous/998-keepalive)

* [Keep Alive 정리.](https://weicomes.tistory.com/1)

* [[Web Server] 아파치 2.4와 Nginx 특징 및 비교](http://victorydntmd.tistory.com/231)

* [HTTP 완벽가이드 - 4.5장 지속커넥션](https://book.naver.com/bookdb/book_detail.nhn?bid=8509980)