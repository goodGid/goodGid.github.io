---
layout: post
title:  " HTTP 인증 : 기본 인증 "
categories: HTTP
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 인증 프로토콜

* HTTP에는 **기본 인증**과 **다이제스트 인증**이라는 2가지 공식적인 인증 프로토콜이 있다.

* 이 글에서는 기본 인증에 대해서 알아본다.

* 다이제스트 인증은 다른 자료를 참고하도록 하자.





---

## 배경 지식

* 기본 인증을 이해하기 위해서

* 2가지 개념에 대한 선행 학습이 필요하다.


---

### 보안 영역(=realm)

* HTTP가 리소스마다 다른 접근 조건을 다루는지 살펴본다.

* 웹 서버는 기밀 문서를 **보안 영역(realm)**그룹으로 나눈다.

* 보안 영역은 저마다 다른 사용자 권한을 요구한다.


> Example

![](/assets/img/http/HTTP-Default-Authenticate_1.png)

```
웹 서버가 2개의 보안 영역을 갖고 있다.
1. 회사의 재정 정보
2. 개인의 가족 문서

사용자마다 서로 다른 영역에 접근한다.
if CEO
    회사 재정 정보 접근 권한 O
    개인의 가족 문서 접근 권한 X

if 직원
    회사 재정 정보 접근 권한 X
    개인의 가족 문서 접근 권한 O
```

* 위와 같은 상황에서 누군가 재정 정보 리소스에 접근하려고 하면 

* 웹 서버는 다음과 같은 Reponse를 응답한다.

```
HTTP/1.0 401 Unauthorized
WWW-Authenticate : Basic realm="Corporate Financials"
```

* 위 응답을 받은 클라이언트는

* realm의 값을 보고 사용자는 어떤 ID/PW를 입력해야하는지 이해할 수 있게 된다.

---

### Base-64 인코딩

* HTTP 기본 인증은 사용자 이름과 비밀번호를 콜론으로 이어서 합치고 base-64 인코딩을 한다.

* 여기서는 자세한 알고리즘은 알 필요 없이 인코딩이 된다는 점을 기억하자.

> Example

![](/assets/img/http/HTTP-Default-Authenticate_2.png)

```
사용자 이름 : brian-totty
비밀번호 : Ow!
```

* 브라우저는 사용자 이름과 비밀번호를 콜론으로 합친다.

　　--> brian-totty:Ow!

* 그리고 이 문자열을 base-64로 인코딩해서 길고 복잡한 값을 생성한다. 


---


## HTTP 기본 인증 흐름

　　1.　클라이언트가 요청을 한다.

```
GET /family/jeff.jpg HTTP/1.0
```

　　2.　서버가 클라이언트에게 인증을 요구한다.

```
HTTP/1.0 401 Authorization Required
WWW-Authenticate : Basic realm="Family"
```

　　3.　클라이언트는 사용자로부터 ID/PW를 입력받은 후 **base-64 인코딩**을 하여 재요청을 한다.

```
GET /family/jeff.jpg HTTP/1.0
Authorization : Basic YnJw53KDhdhc13dk
```

　　4.　서버는 인증 체크 후 정상적일 경우 응답을 내려보낸다.

```
HTTP/1.0 200 OK
Content-type : imgae/jpeg
...
```





---


## HTTP 기본 인증 헤더

### WWW-Authenticate

* *서버 -> 클라이언트* 로 인증을 요구하는 헤더이다.

* realm은 요청 받은 문서 집합의 이름을 따옴표로 감싼 것으로 

* 사용자는 이 정보를 보고 알맞은 비밀번호를 사용해야한다.

```
WWW-Authenticate : Basic realm = 따옴표("")로 감싼 문서 집합 정보
```



### Authorization

* *클라이언트 -> 서버* 로 응답 값을 담는 헤더이다.

* 사용자 이름과 비밀번호는 콜론으로 연결된다.

* 그 값을 base-64로 인코딩한다.

```
Authorization : Basic base-64로 인코딩한 사용자 이름과 비밀번호
```



## Summary

* HTTP가 사용하는 기본 인증에 대해 알아봤다.

---

1. 기본 인증 흐름

2. 기본 인증 시 사용되는 헤더

3. 그 과정 속에서 필요했던 2가지 배경 지식
    
    - 보안 영역 (= realm)
    
    - Base-64 인코딩

---

* 이 글의 목적은 기본 적인 개념을 학습하는데 있다.

* 만약 HTTP 기본 인증에 대해 좀 더 깊은 내용을 알고 싶다면 다른 글을 통해 학습하도록 하자 ! 




---

## Reference

* [HTTP 완벽 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=8509980)
