---
layout: post
title:  " Spring MVC - Handler Methods : Argument "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Argument 

```
The post describes the supported controller method arguments. 
```

* Handler Method가 다루는 Argument는 

* 주로 **요청 그 자체** 또는 **요청에 들어있는 정보**를 받아오는데 사용한다.

* docs.spring.io에서 [Method Arguments](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-arguments)에서 다양한 종류의 Argument를 볼 수 있다.










---

### Servlet API

* 요청 또는 응답 자체에 접근 가능한 API

> Controller

``` java
@GetMapping("/events")
@ResponseBody
public String hello(HttpServletRequest request, HttpServletResponse response) {
    return "hello";
}
```

> Request

![](/assets/img/spring/spring_mvc_argument_1.png)

> Response

![](/assets/img/spring/spring_mvc_argument_2.png)



---

### InputStream & OutputStream

> InputStream

* 요청의 본문을 읽어올 수 있다.

* 즉 사용자가 **Request Body**에 담아 보낸 값을 확인할 수 있다.

* InputStream  <br> = request.getInputStream() <br>  = request.getReader() <br> = Reader

> OutputStream

* 데이터를 응답 본문에 쓸 수 있다.

* 즉 사용자에게 전달될 **Response Body**에 

* 원하는 데이터를 입력할 수 있다.

* InputStream <br> = response.getWriter() <br> = Writer

``` java
@GetMapping("/events")
@ResponseBody
public String hello(
    HttpServletRequest request,
    HttpServletResponse response,
    InputStream requestBody,
    OutputStream responseBody,
    Reader reader,
    Writer writer) throws IOException {

    request.getInputStream();
    request.getReader();
    response.getWriter().println();


    return "hello";
}
```

---


### PushBuilder

![](/assets/img/spring/spring_mvc_argument_3.png)

* 스프링 5 혹은 HTTP/2에서 사용 가능하다. 

* 핸들러로 들어온 요청에 대해 

* 추가적으로 필요한 리소스를 

* 서버가 능등적으로 처리를 해줄 수 있다.

* 예를 들어보자.

> PushBuilder 사용 X

```
브라우저가 View를 보여줘야하는 작업을 할 때
브라우저는 서버에게 View를 달라는 요청을 하고
서버는 해당 View를 리턴을 해주게 된다.

View를 받은 브라우저는
View에서 필요한 리소스를
서버에게 다시 요청을 하게 된다.
```

> PushBuilder 사용 O

```
브라우저가 View를 보여줘야하는 작업을 할 때
브라우저는 서버에게 View를 달라는 요청을 하고
서버는 해당 View를 리턴을 해주게 된다.

이 때 PushBuilder를 사용하여
해당 View에 필요한 리소스를 같이 보내준다.

그렇게 되면
브라우저는 리소스를 요청하는 추가 작업이 불필요해진다.
```

---

### HttpMethod

> HttpMethod

``` java
package org.springframework.http;

import java.util.HashMap;
import java.util.Map;
import org.springframework.lang.Nullable;

public enum HttpMethod {
    GET,
    HEAD,
    POST,
    PUT,
    PATCH,
    DELETE,
    OPTIONS,
    TRACE;

    private static final Map<String, HttpMethod> mappings = new HashMap(16);

    private HttpMethod() {
    }

    @Nullable
    public static HttpMethod resolve(@Nullable String method) {
        return method != null ? (HttpMethod)mappings.get(method) : null;
    }

    public boolean matches(String method) {
        return this == resolve(method);
    }

    static {
        HttpMethod[] var0 = values();
        int var1 = var0.length;

        for(int var2 = 0; var2 < var1; ++var2) {
            HttpMethod httpMethod = var0[var2];
            mappings.put(httpMethod.name(), httpMethod);
        }

    }
}
```

![](/assets/img/spring/spring_mvc_argument_4.png)

* HttpMethod를 사용하여 

* 해당 요청이 어떤 Http Method 인지 알 수 있다.

<br>

* 예를 들면

* 특정 Http Method를 지정하지 않은 

* @RequestMapping를 사용하는 상황에서 

* Http Method에 따라 분기처리를 하고 싶다면

* **HttpMethod**를 사용하면 된다.

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/events"))
            .andDo(print())
            .andExpect(status().isOk());
}
```

> Controller

``` java
@RequestMapping("/events")
@ResponseBody
public String hello(HttpMethod httpMethod){
    System.out.println(httpMethod.matches("GET")); // true
    System.out.println(httpMethod.matches("Get")); // false
    System.out.println(httpMethod.matches("get")); // false

    if (httpMethod.matches("GET")) {
        // write code for GET Method
        System.out.println("GET 요청"); // 출력 
    } else if (httpMethod.matches("POST")) {
        // write code for POST Method
        System.out.println("POST 요청");
    }
    return "hello";
}
```

---

### Locale, TimeZone, ZoneId

``` java
@GetMapping("/events")
@ResponseBody
public String hello(Locale locale, TimeZone timeZone, ZoneId zoneId) {
    return "hello";
}
```

* LocaleResolver가 분석한 요청의 Locale 정보를

* 스프링 MVC가 매개변수에 담아서 핸들러에 넘겨준다.



---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

