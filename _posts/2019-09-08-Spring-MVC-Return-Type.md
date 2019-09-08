---
layout: post
title:  " Spring MVC - Handler Methods : Return Type Values "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Return Type

``` 
The post describes the supported controller method return values. 
```

* Handler Method가 다루는 Return Type은

* 주로 **응답** 또는 **모델을 랜더링할 뷰에 대한 정보**를 제공하는데 사용한다.

* docs.spring.io에서 [Return Values](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-return-types)에서 다양한 종류의 Return Values를 볼 수 있다.

















### ResponseEntity

> ResponseEntity = 응답으로 보낼 데이터(Body, Header) + Http Status Code

```
The return value that specifies the full response (including HTTP headers and body) is to be converted through HttpMessageConverter implementations and written to the response.
```

* 다양한 형태의 **생성자 구조**를 갖는다.

1. HttpStatus만 설정

2. HttpStatus와 Body를 설정

3. HttpStatus와 Body와 headers를 설정

``` java
public class ResponseEntity<T> extends HttpEntity<T> {
    private final Object statusCode;

    public ResponseEntity(HttpStatus status) {
        this((Object)null, (MultiValueMap)null, (HttpStatus)status);
    }

    public ResponseEntity(T body, HttpStatus status) {
        this(body, (MultiValueMap)null, (HttpStatus)status);
    }

    public ResponseEntity(MultiValueMap<String, String> headers, HttpStatus status) {
        this((Object)null, headers, (HttpStatus)status);
    }

    public ResponseEntity(T body, MultiValueMap<String, String> headers, HttpStatus status) {
        super(body, headers);
        Assert.notNull(status, "HttpStatus must not be null");
        this.statusCode = status;
    }

    private ResponseEntity(T body, MultiValueMap<String, String> headers, Object statusCode) {
        super(body, headers);
        this.statusCode = statusCode;
    }

    ...

}
```

* 즉 ResponseEntity는 

* 개발자가 직접 결과 데이터와 HTTP 상태 코드를 

* 직접 제어할 수 있는 클래스로
 
* 요청에 대한 Response를 

* 디테일하게 제어할 수 있다.


---

### String

``` 
A view name to be resolved with ViewResolver implementations and used together with the implicit model — determined through command objects and @ModelAttribute methods. 
The handler method can also programmatically enrich the model by declaring a Model argument
```

* ViewResolver를 사용해서 View를 찾을 때 

* 사용할 View 이름의 타입이다.

* 즉 핸들러가 리턴하는 문자열은

* 해당 핸들러가 요청에 결과로 보여주려는 

* View를 찾아가는 단서가 된다.

<br>

* 하지만 상황에 따라 다르게 해석될 수 있다.

* 아래 코드와 같이 

* **@ResponseBody**가 선언이 되어 있다면

* Response Body에 응답을 쓰라는 뜻으로 해석된다.

``` java
@GetMapping("/events")
@ResponseBody
public String hello() {
    return "hello";
}
```

* **@ResponseBody**가 선언이 되어있지 않다면

* ViewResolver를 통해서 

* *hello* 라는 파일을 찾게 된다.

* 그 이유는 *hello* 라는 String을 리턴했기 때문이다.

``` java
@GetMapping("/events")
public String hello() {
    return "hello";
}
```

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

* [REST API - ResponseEntity 오브젝트](https://heeestorys.tistory.com/566)


