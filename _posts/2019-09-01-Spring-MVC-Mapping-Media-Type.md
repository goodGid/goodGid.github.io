---
layout: post
title:  " Spring MVC - 미디어 타입 매핑하기 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Consumes

* 특정 타입의 데이터를 담고 있는 요청만 

* 처리하는 핸들러 지정이 가능하다.

* ex) @RequestMapping(consumes=MediaType.APPLICATION_JSON_UTF8_VALUE)

<br>
    
* Content-Type 헤더로 필터링을 한다. 

* = 핸들러에 **consumes** 조건을 추가하여 요청을 필터링한다.

<br>

* 매치 되는 않는 경우엔 [415 : Unsupported Media Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415) 응답한다.

* 핸들러에 **consumes**라는 키워드를 사용하여 

* 어떤 미디어 타입을 허용할 것인지 핸들러에게 명시해준다.



``` java
@Controller
@RequestMapping
public class SampleController {
    // String을 Return하는 것들은 끝에 VALUE가 붙는다.
    // 아래 사진 참고 
    @GetMapping(value = "/hello", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
```

![](/assets/img/spring/spring_mvc_mapping_media_type_1.png)

* 위 핸들러를 해석해면

* HTTP 헤더 중 

* Content-Type이라는 HTTP 헤더에 

* **application/json;charset=UTF-8"** 

* **(=MediaType.APPLICATION_JSON_UTF8_VALUE)**라는 값이 있는 경우에만 처리를 한다. 

* 라고 위 핸들러를 해석할 수 있다.

<br>

* 즉 HTTP 요청 시 

* 그 HTTP 요청에 들어가는 본문의 타입을 

* 서버에 알려주는 기능을 한다.

* 그리고 서버는 조건에 맞는 요청만 처리를 한다.











<br>

* 다음과 같이 Headers가 없는 상태로 요청을 해보자.

``` java
    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
               .andDo(print())
               .andExpect(status().isOk());
    }
```

* 다음과 같은 결과를 볼 수 있다.

* HTTP Status Code값으로는 

* [415 : Unsupported Media Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415)를 받게 된다.

> The HTTP 415 Unsupported Media Type client error response code indicates that the server refuses to accept the request because the payload format is in an unsupported format.


```
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [] // Headers가 없는 상태로 요청을 했다.
             Body = <no character encoding set>
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 415
    Error message = null
          Headers = [Accept:"application/json;charset=UTF-8"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status 
Expected :200
Actual   :415
```

* Content Type을 담아서 요청을 해보자.

* TC가 성공하는 것을 확인할 수 있다.

``` java
    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello")
                        .contentType(MediaType.APPLICATION_JSON_UTF8))
               .andDo(print())
               .andExpect(status().isOk());
    }
```


``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [Content-Type:"application/json;charset=UTF-8"]
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"text/plain;charset=UTF-8", Content-Length:"5"]
     Content type = text/plain;charset=UTF-8
             Body = hello
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```


---


## Accept 헤더

* 만약 요청을 하는데 특정 타입의 응답을 원한다면 **Accept 헤더**를 사용하면 된다.

``` java
    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .accept(MediaType.APPLICATION_JSON_UTF8))
               .andDo(print())
               .andExpect(status().isOk());
    }
```

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [Content-Type:"application/json;charset=UTF-8", Accept:"application/json;charset=UTF-8"]
             Body = null
    Session Attrs = {}
```

* Headers에 

* **Accept:"application/json;charset=UTF-8"**가 추가되는 것을 볼 수 있다.

---

## Produces

* produces 조건을 추가하여 요청에 대한 필터링을 할 수 있다.


``` java
    @GetMapping(value = "/hello",
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    @ResponseBody
    public String hello() {
        return "hello";
    }
```

> Test Success

``` java
    // 요청하는 consumes과 produces의 타입이
    // 핸들러가 처리하는 consumes과 produces의 타입과 동일하다.
    @Test
    public void helloTest_Success() throws Exception {
        mockMvc.perform(get("/hello")
                                .contentType(MediaType.APPLICATION_JSON_UTF8)
                                .accept(MediaType.TEXT_PLAIN_VALUE))
               .andDo(print())
               .andExpect(status().isOk());
    }
```

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [Content-Type:"application/json;charset=UTF-8", Accept:"text/plain"]
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"text/plain;charset=UTF-8", Content-Length:"5"]
     Content type = text/plain;charset=UTF-8
             Body = hello
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```


> Test Fail

``` java
    // 요청하는 consumes과 produces의 타입이
    // 핸들러가 처리하는 consumes과 produces의 타입과 다르다.
    @Test
    public void helloTest_Fail() throws Exception {
        mockMvc.perform(get("/hello")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .accept(MediaType.APPLICATION_JSON_UTF8))
               .andDo(print())
               .andExpect(status().isOk());
    }
```

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [Content-Type:"application/json;charset=UTF-8", Accept:"application/json;charset=UTF-8"]
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 406
    Error message = null
          Headers = []
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status 
Expected :200
Actual   :406
```

* HTTP Status Code값으로는 

* [406 : Not Acceptable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406)를 받게 된다.

> The HyperText Transfer Protocol (HTTP) 406 Not Acceptable client error response code indicates that the server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers, and that the server is unwilling to supply a default representation.


---

## Reference

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

