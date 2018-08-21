---
layout: post
title:  " app.use() vs app.get() "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}



## Concept

* Express는 자체적인 최소한의 기능을 갖춘 라우팅 및 미들웨어 웹 프레임워크이며, Express 애플리케이션은 기본적으로 일련의 미들웨어 함수 호출입니다.

---

## Key Point

* app.use() 와 app.get()의 차이점에 의문점을 가졌다.

* 다음과 같은 답을 찾았다. 

```
Simply app.use means “Run this on ALL requests” 
app.get means “Run this on a GET request, for the given URL”
```

```
app.get is called when the HTTP method is set to GET, 
whereas app.use is called regardless of the HTTP method
```

* 정리하자면 app.use()는 모든 요청을 받아들이고 <br> app.get()은 Only get 요청만 처리한다 ! 

* 보다 정규화된 문서가 보고 싶다면 [Click](http://expressjs.com/ko/guide/using-middleware.html)

