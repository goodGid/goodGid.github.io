---
layout: post
title:  " HTTP Keep Alive 기능 "
categories: Network
tags: Network
author: goodGid
---
* content
{:toc}

## HTTP 구조

* HTTP는 Connectionless 방식으로 연결을 매번 끊고 새로 생성하는 구조이다. 

* 이는 Network 비용 측면에서 많은 비용을 소비하는 구조이다. <br> ( 최초 연결하기 위한 준비과정을 의미함 ) 

* 그래서 HTTP 1.1부터는 Keep-Alive라는 기능을 지원한다.







---

## Keep Alive란?

* HTTP/1.1부터 지원하는 기능으로 TCP 연결을 재사용하는 기능이다. 

* 즉 Handshake 과정이 생략되므로 성능 향상을 기대 할 수 있다.

* 단 모든 TCP 세션을 무한정 유지할 수는 없으므로 Timeout 및 Max 설정을 통해 관리되어야 한다. 
    - Keep Alive Timeout : 요청에 대한 응답을 보낸 후 Timeout을 위한 timer가 동작하기 시작한다.
    - 최근에는 N/W 환경이 개선되면서 Keep Alive Timeout이 점점 줄어드는 추세이다.
    - Event-driven 구조여서 non-blocking을 사용하는 Nginx 등은 <br> Keep Alive를 하면서도 Thread를 점유하지 않기 때문에 동시 처리에 유리하다.

<br>

* Keep Alive란 연결된 Socket에 In/Out의 Access가 마지막으로 종료된 시점부터 <br> 정의된 시간까지 Access가 없더라도 세션을 유지하는 구조이다. 

* 즉 정의된 시간내에 Access가 이루어진다면 계속 연결된 상태를 유지할 수 있게 된다.

> Q. Keep Alive Timeout 설정은 왜 필요한가?

* 서버 자원은 무한정이 아니기에 이러한 접속을 계속 유지하는 것은 Server에 손실을 발생시킨다.

* 즉 서버와의 연결을 맺을 수 있는 Socket은 한정되어 있고 <br> 연결이 오래 지속되면 다른 사람들이 연결을 못하게되는 상황이 닥친다.

* 하지만 사람들이 적게 접속한다면 소수의 사람이 빠르게 인터넷을 사용 할 수 있다는 장점이 있다.

* Why? Request 요청을 하기 위한 작업이 생략되므로 속도는 빨라진다.

<br>

* 정적 자원(HTML, 이미지 파일 등)으로만 구성된 웹 서버에 Keep Alive을 사용할 경우 약 50%의 성능 향상을 보인다고 한다.

* 단 이와 같은 성능 향상을 보이려면 서버가 바쁘지 않아야 하는데 <br> 바쁜 서버 환경에서 Keep Alive 기능을 사용할 경우 <br> 모든 요청 마다 연결을 유지해야 하기 때문에 프로세스 수가 기하급수적으로 늘어나 MaxClient값을 초과하게 된다.

* 따라서 메모리를 많이 사용하게 되며 이는 곧 성능 저하의 원인이 된다.

* 즉 대량 접속 시 효율이 떨어지게 된다.


---


## HTTP에서 Keep Alive란?

* HTTP는 Connectionless 방식이라 매번 Socket(port)를 열어야 하고 <br> 이는 비용적인 측면에서 비효율적인 구조이다. 

* 그래서 Keep Alive Timeout내에 Client에서 **Request를 재요청**하면 <br> 새로운 세션을 생성하는 게 아닌 **기존에 세션**을 사용해 전송하는 구조이다.

* 예를 들면 Image를 4개를 보여주는 구조에서 Client는 동시에 2개의 Image만 얻어 올수 있고 <br> 1개의 Image는 얻는데 2초 걸리고 Port를 여는데 1초가 걸린다고 가정해보자.


```
Keep Alive : False 
처음 Server에 2개의 Port를 열고 Image를 얻고 Client Socket의 닫고 ( 3초 ) 
다시 Server에 2개의 Port를 열고 Image를 얻고 Client Socket의 닫고 ( 3초 ) 
총 6초가 걸림.

Keep Alive : True
처음 Server에 2개의 Port를 열고 Image를 얻고 ( 3초 ) 
재요청 시 기존에 열어 둔 Port로 2개의 Image를 얻음 ( 2초 )
총 5초가 걸림.
Keep Alive Time Out이 되었을 때 
Client의 Socket이 닫히거나 Browser가 더이상 얻어 올 것이 없으면 자동으로 닫힘.
```


---


## ThreadPool 과 Keep Alive

* 웹 서버만 놓고 볼 때 웹 서버 역시 ThreadPool을 사용하는 방식으로 설정 할 수 있다.

* 이때 ThreadPool은 사용자 수와 관련이 있는데, <br> 동시 사용자가 500명이라면 최소한 500개 이상으로 ThreadPool을 설정해야 한다.

* 하나의 웹 페이지 호출 시 사용자는 동시에 여러 Connection을 생성할 수 있다. 

* 만약 특정 웹 페이지 하나를 구성하는데 많은 자원이 필요하다면 ThreadPool은 그에 비례하여 증가시켜야 한다.

* 이때 Keep Alive까지 적용되어 있다면 Idle Thread까지 고려하여 ThreadPool 설정을 해야 한다.

---


## Keep Alive를 그럼 어떻게 쓸수 있을까?

* 개발자 영역에서 할 부분은 전혀 없다.

```
Client(Browser)는 http 1.1을 준수하고 이해 할 수 있다고
Request에 Connection: Keep-Alive를 넣어서 Server에 전송한다.

Request를 받는 Server는 
Kepp Alive 기능을 활성화하고 
Keep Alive Timeout을 설정한다.
```

* 예를 통해 살펴보자. <br> 아래의 예는 [HTTP 1.1 Keep-Alive 기능에 대해](http://b.pungjoo.com/entry/HTTP-11-Keep-Alive-%EA%B8%B0%EB%8A%A5%EC%97%90-%EB%8C%80%ED%95%B4)글에서 발췌했다.


```
$ telnet pungjoo.com 80
Trying 121.124.124.74...
Connected topungjoo.com.
Escape character is '^]'.

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

* Telnet(연결)은 한 번만 이뤄졌고 GET Method는 2번([1],[2]) 요청했다.

* 즉 이렇게 할 수 있는 이유는 Keep Alive기능 때문이다.

* [2] : **Keep-Alive: timeout=5, max=99** 부분에서 max가 감소를 하는 것을 볼 수 있는데 <br> 이는 최초 연결된 Port에 대해서 기존엔 max=100이였지만 <br> 현재 1번의 요청을 받았으니 추가적으로 99번에 Request가 가능하단 뜻이다.

* [3] : **Connection to pungjoo.com closed by foreign host.** 메시지는 바로 나오는 것이 아니라 <br> timeout(=5초) 후에 나오게 된다.

* 즉 Server/Client의 연결이 5초간 유지되었음을 알 수 있다.

* 그렇다면 HTTP 1.0으로 통신을 해보자.

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

* 이번 경우는 Response가 날라 오고 바로 <br> **Connection to pungjoo.com closed by foreign host.** 메시지가 나온다.

* 즉 바로 Server/Client 연결이 종료된다.


---


## 참고

* [HTTP 1.1 Keep-Alive 기능에 대해](http://b.pungjoo.com/entry/HTTP-11-Keep-Alive-%EA%B8%B0%EB%8A%A5%EC%97%90-%EB%8C%80%ED%95%B4)

* [Keepalive란?](https://sarc.io/index.php/miscellaneous/998-keepalive)

* [Keep Alive 정리.](https://weicomes.tistory.com/1)

* [[Web Server] 아파치 2.4와 Nginx 특징 및 비교](http://victorydntmd.tistory.com/231)