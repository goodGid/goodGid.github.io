---
layout: post
title:  " Spring MVC - 헤더와 매개변수 매핑하기 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## 헤더 및 매개변수 

* **헤더(=header)**와 **매개변수(=param)** 사용법은 동일하다.

* Controller에서 사용 시 ~s를 붙히고 <br> TC에서는 ~s를 붙히지 않는다.

```
## Controller
@GetMapping(value = "/hello", headers = HttpHeaders.FROM)
or
@GetMapping(value = "/hello", params = HttpHeaders.FROM)

## Test Code
.header(HttpHeaders.FROM, "localhost"))
.param(HttpHeaders.FROM, "localhost"))
```


### 특정 키 존재 O

* ex) @RequestMapping(headers = “key”)

* ex) @RequestMapping(params = “a”)

> Controller

``` java
@GetMapping(value = "/hello", headers = HttpHeaders.FROM)
@ResponseBody
public String hello() {
    return "hello";
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/hello")
                            .header(HttpHeaders.FROM, "localhost")) // Case : Success
                            .header(HttpHeaders.HOST, "localhost")) // Case : Fail
            .andDo(print())
            .andExpect(status().isOk());
}
```

> TC Result : Suceess

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [From:"localhost"]
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















> TC Result : Fail

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [Host:"localhost"]
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 404
    Error message = null
          Headers = [Vary:"Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

### 특정 키 존재 X

* ex) @RequestMapping(headers = “!key”)

* ex) @RequestMapping(params = “!a”)

> Controller

``` java
@GetMapping(value = "/hello", headers = "!" + HttpHeaders.FROM)
@ResponseBody
public String hello() {
    return "hello";
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/hello")
                            .header(HttpHeaders.HOST, "localhost")) // Case : Success
                            .header(HttpHeaders.FROM, "localhost")) // Case : Fail
            .andDo(print())
            .andExpect(status().isOk());
}
```

> TC Result : Success

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [Host:"localhost"]
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

> TC Result : Fail

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [From:"localhost"]
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 404
    Error message = null
          Headers = [Vary:"Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status 
Expected :200
Actual   :404
```



### 특정 키/값 존재

* ex) @RequestMapping(headers = “key=value”)

* ex) @RequestMapping(params = “a=b”)


> Controller

``` java
@GetMapping(value = "/hello", headers = HttpHeaders.FROM + "=" + "123")
@ResponseBody
public String hello() {
    return "hello";
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/hello")
                            .header(HttpHeaders.FROM, "123"))   // Case : Success
                            .header(HttpHeaders.FROM, "1234"))  // Case : Fail
            .andDo(print())
            .andExpect(status().isOk());
}
```

> TC Result : Success

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [From:"123"]
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


> TC Result : Fail

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [From:"1234"]
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 404
    Error message = null
          Headers = [Vary:"Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status 
Expected :200
Actual   :404
```

---

## Reference

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

