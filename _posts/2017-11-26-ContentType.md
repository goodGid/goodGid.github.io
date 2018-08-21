---
layout: post
title:  " Content Type "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}


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

## Qeustion

application/x-www-form-urlencoded를 사용할 때 body를 encoding 하는 것이 필수인가? <br> 그에 대한 답은 W3에 있는 문서에 나와 있다.
{: .notice}


* application/x-www-form-urlencoded <br> This is the default content type. Forms submitted with this content type must be encoded as follows: 

1. Control names and values are escaped. Space characters are replaced by +', and <br> then reserved characters are escaped as described in [RFC1738], section 2.2: Non-alphanumeric characters are replaced by%HH', a percent sign and two hexadecimal digits representing the ASCII code of the character. Line breaks are represented as "CR LF" pairs (i.e., `%0D%0A').

2. The control names/values are listed in the order they appear in the document. The name is separated from the value by =' and name/value pairs are separated from each other by&'

* encoding을 해야 한다고 나온다. 브라우저에서는 아마 대부분 기본적으로 해당 content-type에 대해 자동으로 encoding하도록 구현을 해놓았을 것이다.

* 따라서 우리가 주의해야 할 것은 하나다. <br> application logic에서 applcation/x-www-form-urlencoded를 사용할 경우 body 인코딩이 <br> 해당 framework 혹은 library에서 자동으로 되는지 확인 후 안되면 해줘야한다.



