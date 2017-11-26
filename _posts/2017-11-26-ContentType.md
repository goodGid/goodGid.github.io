---
layout: post
title:  " Content Type "
date:   2017-11-26
excerpt: " Content Type "
cate : "post"
tag:
- Node.js
---

## Contetn Type ?

* HTTP Header에 쓰이는 Content Type이란 무엇일까?

	- request에 실어 보내는 데이터(body)의 type의 정보를 표현한다.

	- Text type으로는 text/css, text/javascript, text/html, text/plain등이 있다.

	- Html문서에 type을 명시할 땐 text/javascript, text/css등이 있다.

	- File을 실어보내기 위한 type으로는 multipart/formed-data등이 있다.

	- Application type으로 application/json, application/x-www-form-urlencode가 있다.

결론은 Content Type은 Request에 실어 보내는 data의 type에 따라 적절하게 선택을 해주면 된다.

더 자세하게 내용을 알고싶다면 [W3의 페이지](http://www.w3.org/Protocols/rfc1341/4_Content-Type.html)를 참고하자. 



---


