---
layout: post
title:  " HTTP Method :: Idempotent, Options, Head, Trace, Connect "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## Safe Methods

* **리소스를 수정하지 않는 메소드들(OPTIONS, GET, HEAD 등)**을 **Safe**하다고 말한다. 

* 대부분의 경우 **Idempotent하면 Safe**하다. 

* 물론 **예외**도 있는데 **DELETE**는 Idempotent 하지만 리소스를 변경하므로 Safe하지 않다. 

* *HEAD* 는 Response-Body 없이 Header만 얻기 위해 사용한다.

* *OPTIONS* 는 해당 리소스에 대해 **가능한 Operation**이 무엇인지 응답을 얻기 위해 사용한다.

* 만약 OPTIONS에 대한 응답이 온다면 *response Allow* 에 가능한 Operation을 사용해야한다.













* RFC2616 에는 다음과 같이 나와있다.

```
The OPTIONS method represents a request for information about the communication options available on the request/response chain identified by the Request-URI. 
This method allows the client to determine the options and/or requirements associated with a resource, or the capabilities of a server, without implying a resource action or initiating a resource retrieval. 

Responses to this method are not cacheable.
```

<small>[번역](https://translate.google.co.kr/?hl=ko&#en/ko/The%20OPTIONS%20method%20represents%20a%20request%20for%20information%20about%20the%20communication%20options%20available%20on%20the%20request%2Fresponse%20chain%20identified%20by%20the%20Request-URI.%20%0AThis%20method%20allows%20the%20client%20to%20determine%20the%20options%20and%2For%20requirements%20associated%20with%20a%20resource%2C%20or%20the%20capabilities%20of%20a%20server%2C%20without%20implying%20a%20resource%20action%20or%20initiating%20a%20resource%20retrieval.%20%0A%0A%0AResponses%20to%20this%20method%20are%20not%20cacheable.) </small>


---

## Cacheable Methods

* 왜 OPTIONS 메소드에 대한 응답은 캐시가 불가능한걸까? 

* Stack Overflow에서 관련된 질문 [HTTP OPTIONS - Not Cacheable?](https://stackoverflow.com/questions/13073313/http-options-not-cacheable) 답변을 발췌했다.


```
The OPTIONS HTTP request returns the available methods which can be performed on a resource. (The objects methods)

I can not say for certain why you can not cache the response, but its most likely a precaution. Caching would have little value for the OPTIONS http method.

A Resource is “any information that can be given a name”, that name is its URI. 
the response from the OPTIONs request is only a list of methods that can be requested on this resource (e.g. “GET PUT POST” maybe the response). 
To actually get at the information stored, you must use the GET method.

History, more than anything; OPTIONS was defined that way to start with. 
The underlying reason is that HTTP caches are defined in terms of representations, which means the way you get something out of the cache is GET. 
This is why OPTIONS, PROPFIND, etc. caching are problematic.
```

<small>[번역](https://translate.google.co.kr/?hl=ko&#en/ko/The%20OPTIONS%20HTTP%20request%20returns%20the%20available%20methods%20which%20can%20be%20performed%20on%20a%20resource.%20(The%20objects%20methods)%0A%0AI%20can%20not%20say%20for%20certain%20why%20you%20can%20not%20cache%20the%20response%2C%20but%20its%20most%20likely%20a%20precaution.%20Caching%20would%20have%20little%20value%20for%20the%20OPTIONS%20http%20method.%0A%0AA%20Resource%20is%20%E2%80%9Cany%20information%20that%20can%20be%20given%20a%20name%E2%80%9D%2C%20that%20name%20is%20its%20URI.%20the%20response%20from%20the%20OPTIONs%20request%20is%20only%20a%20list%20of%20methods%20that%20can%20be%20requested%20on%20this%20resource%20(e.g.%20%E2%80%9CGET%20PUT%20POST%E2%80%9D%20maybe%20the%20response).%20To%20actually%20get%20at%20the%20information%20stored%2C%20you%20must%20use%20the%20GET%20method.%0A%0AHistory%2C%20more%20than%20anything%3B%20OPTIONS%20was%20defined%20that%20way%20to%20start%20with.%20The%20underlying%20reason%20is%20that%20HTTP%20caches%20are%20defined%20in%20terms%20of%20representations%2C%20which%20means%20the%20way%20you%20get%20something%20out%20of%20the%20cache%20is%20GET.%20This%20is%20why%20OPTIONS%2C%20PROPFIND%2C%20etc.%20caching%20are%20problematic.) </small>

* 즉 **리소스는 주어진 URI에 대한 정보**인데 OPTIONS는 정보를 가지고 오는 것이 아니다.

* OPTIONS는 그 **URL에 대해 어떤 연산이 가능**한지를 알려준다.

* **HTTP에서 이뤄지는 캐싱**은 **정보**에 대해 이뤄진다.

* 그렇기 때문에 GET이나 HEAD 같이 **정보를 돌려주는 연산에만 캐싱**할 수 있다.




---

## Trace, Connect

* TRACE는 **클라이언트가 방금 보낸 요청**을 다시 달라고 서버에게 요청하는 것이다.

* CONNECT는 **HTTP 터널링**을 할때 쓰인다. 

* 중간의 프록시 서버를 위해서는 CONNECT로 요청하고 <br> 마지막 프록시에서 end-point로는 GET 또는 CONNECT를 날린다. 

* **HTTPS**라면 CONNECT를 <br> **HTTP**라면 둘 중 아무거나 써도 상관 없다.

```
CONNECT: This method could allow a client to use the web server as a proxy.
```

<small>[번역](https://translate.google.co.kr/?hl=ko&#en/ko/CONNECT%3A%20This%20method%20could%20allow%20a%20client%20to%20use%20the%20web%20server%20as%20a%20proxy.) </small>


<br> 

```
TRACE: This method simply echoes back to the client whatever string has been sent to the server, and is used mainly for debugging purposes. 
This method, originally assumed harmless, can be used to mount an attack known as Cross Site Tracing, which has been discovered by Jeremiah Grossman 
```

<small>[번역](https://translate.google.co.kr/?hl=ko&#en/ko/TRACE%3A%20This%20method%20simply%20echoes%20back%20to%20the%20client%20whatever%20string%20has%20been%20sent%20to%20the%20server%2C%20and%20is%20used%20mainly%20for%20debugging%20purposes.%20This%20method%2C%20originally%20assumed%20harmless%2C%20can%20be%20used%20to%20mount%20an%20attack%20known%20as%20Cross%20Site%20Tracing%2C%20which%20has%20been%20discovered%20by%20Jeremiah%20Grossman) </small>





---

## 참고

* [REST API: PUT VS POST](https://1ambda.github.io/javascripts/rest-api-put-vs-post/)
