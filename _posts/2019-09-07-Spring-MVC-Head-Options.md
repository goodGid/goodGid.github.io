---
layout: post
title:  " Spring MVC - HEAD와 OPTIONS 메소드 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.


## 스프링 MVC의 HTTP 메소드 지원

* Http 메소드 중 **HEAD**와 **OPTIONS**는 스프링 MVC가 지원을 해준다.

* HEAD와 OPTIONS 메소드로 요청을 보내면 

* 해당 URI와 동일한 Get 요청으로 처리를 한다.

* 그런데 Get 메소드가 없을 경우엔 어떻게 될까?

* 그 경우에 대해서도 알아보자.

---

## HEAD

* HEAD 메소드로 요청을 보내게 되면 

* 해당 URI와 같은 Get 메소드가 처리를 한다.

<br>

* Get 메소드 처리와의 차이점은

* Response가 다르다.

* = 응답에 본문을 제외한다.

* = 응답 헤더만 보낸다.

* = Body가 없다.

```
9.4 HEAD
The HEAD method is identical to GET except that the server MUST NOT 
return a message-body in the response. 
```












<br>

* 그 이유는 HEAD 메서드의 목적은 

* 간략한 정보만 확인하는 것이기 때문이다.

* 자세한 내용은 공식 Docs 문서인 [9 Method Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)를 참고하자.

> Controller

``` java
@Controller
@RequestMapping
public class SampleController {

    @GetMapping(value = "/hello")
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(head("/hello"))
            .andDo(print())
            .andExpect(status().isOk());
}
```

> Result

``` java
MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"text/plain;charset=UTF-8", Content-Length:"5"]
     Content type = text/plain;charset=UTF-8
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

> 만약 Get 메소드를 처리하는 핸들러가 없다면 ?

* **405 : Request method 'HEAD' not supported**가 발생한다.


> Controller 

``` java
@Controller
@RequestMapping
public class SampleController {
    
    @PostMapping(value = "/hello")
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(head("/hello"))
            .andDo(print())
            .andExpect(status().isOk());
}
```

> Result

``` java
MockHttpServletResponse:
           Status = 405
    Error message = Request method 'HEAD' not supported
          Headers = [Allow:"POST", Content-Length:"0"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status 
Expected :200
Actual   :405
<Click to see difference>
```

---

## OPTIONS

* OPTIONS로 요청을 하게 되면 해당 URI를 처리할 수 있는 메소드 정보를 알 수 있다.

> Controller

``` java
@Controller
@RequestMapping
public class SampleController {

    @GetMapping(value = "/hello")
    @ResponseBody
    public String hello() {
        return "hello";
    }

    @PostMapping(value = "/hello")
    @ResponseBody
    public String hello2() {
        return "hello";
    }
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(options("/hello"))
            .andDo(print())
            .andExpect(status().isOk());
}
```

> Result

``` java
MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Allow:"POST,GET,HEAD,OPTIONS"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

> 만약 Get 메소드를 처리하는 핸들러가 없다면 ?

* **HEAD**와는 다르게 에러가 발생하지 않는다.

* 다만 Allow Headers에 Get 메소드가 포함되지 않은 Response를 받게된다.

> Controller 

``` java
@Controller
@RequestMapping
public class SampleController {
    
    @PostMapping(value = "/hello")
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(options("/hello"))
            .andDo(print())
            .andExpect(status().isOk());
}
```

> Result

``` java
MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Allow:"POST,OPTIONS"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```


---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

