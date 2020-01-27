---
layout: post
title:  " Spring MVC - @ModelAttribute 애노테이션 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @ModelAttribute 개념

* 단일 데이터를 각각 받아와 

* 객체를 생성하지 않고

``` java
@GetMapping("/events")
@ResponseBody
public Event hello(@RequestParam String name, @RequestParam Integer limit){
    Event event = new Event();
    event.setName(name);
    event.setLimit(limit);
    return event;
}
```

* 복합 타입 객체로 입력을 받을 수 있게 된다.

``` java
@GetMapping("/events")
@ResponseBody
public Event hello(Event event){
    return event;
}
```

* 또한 **@ModelAttribute**는 생략 가능하다.

``` java
public Event hello(@ModelAttribute Event event)
= public Event hello(Event event)
```









---

## Binding 실패

* Binding 과정에서 

* 여러 이유로 

* Binding 실패가 일어날 수 있다.

* 이럴 경우 **BindingResult**를 통해

* Error를 확인할 수 있다.

> Controller

``` java
@GetMapping("/events")
@ResponseBody
public Event hello(@ModelAttribute Event event, BindingResult bindingResult){
    // Error를 확인할 수 있다.
    if(bindingResult.hasErrors()){
        bindingResult.getAllErrors().forEach(c ->{
            System.out.println(c);
        });
    }
    return event;
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/events")
                            .param("name", "goodGid")
                            .param("limit", "test"))
            .andDo(print())
            .andExpect(status().isOk());
}
```

> Result

``` java
Field error in object 'event' on field 'limit': rejected value [test]; codes [typeMismatch.event.limit,typeMismatch.limit,typeMismatch.java.lang.Integer,typeMismatch]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [event.limit,limit]; arguments []; default message [limit]]; default message [Failed to convert property value of type 'java.lang.String' to required type 'java.lang.Integer' for property 'limit'; nested exception is java.lang.NumberFormatException: For input string: "test"]

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json;charset=UTF-8"]
     Content type = application/json;charset=UTF-8
             Body = {"id":null,"name":"goodGid","limit":null}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

* TC 자체는 성공을 하지만

* (= Status = 200 )

* Body를 보면

* *name* 에는

* 요청시 입력한 **goodGid**가 들어갔지만

* *limit* 에는 null이 담겨져 있음을 확인할 수 있다.


---


## BindingResult 위치

* BindingResult은

* Binding하고자 하는 

* Argument의 

* 바로 **오른쪽**에 위치해야 한다.

* 아래와 같은 코드는 

* 실패하게 된다.

``` java
@GetMapping("/events")
@ResponseBody
public Event hello( @ModelAttribute Event event,
                    String test,
                    BindingResult bindingResult) { // 잘못된 위치
    if (bindingResult.hasErrors()) {
        bindingResult.getAllErrors().forEach(c -> {
            System.out.println(c);
        });
    }
    return event;
}
```

---

## Binding 이후 검증

* 단순히 Binding의 성공 유무가 아닌

* 특정 조건을 만족하는 값으로 

* Binding이 되었는지 확인하기 위해서

* **[@Valid]({{site.url}}/Spring-MVC-Valid-And-Validated/#valid)** or **[@Validated]({{site.url}}/Spring-MVC-Valid-And-Validated/#validated)** 애노테이션을 사용할 수 있다.

<br>

* Binding 자체는 성공하였지만

* **로직** 관점에서는 실패할 수 있다.

<br>

* 예를 들어 

* *limit* 의 값은 

* MAX가 10인데

* 요청을 10보다 큰 값으로 하게 될 경우

* Binding은 성공하겠지만

* Error 로그를 볼 수 있다.

> Domain

``` java
public class Event {

    private Integer id;

    private String name;

    @Max(10)
    private Integer limit;

    ...
    
}
```

> TC Result

``` java
Field error in object 'event' on field 'limit': rejected value [11]; codes [Max.event.limit,Max.limit,Max.java.lang.Integer,Max]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [event.limit,limit]; arguments []; default message [limit],10]; default message [must be less than or equal to 10]

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json;charset=UTF-8"]
     Content type = application/json;charset=UTF-8
             Body = {"id":null,"name":"goodGid","limit":11}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```



## Summary

* Model Attribute 개념에 대해 학습하였다.

* 굉장히 중요한 개념이기 때문에 

* 다른 자료를 참고해서 

* 추가 학습이 필요하다.

<br>

* 그리고 

* 실제로 @ModelAttribute Annotation을 사용하는

* 예제를 통해 이해도를 높혀보도록 하자.

* [Spring Controller에서 사용하는 Annotation 분석하기 : @ModelAttribute]({{site.url}}/Spring-Controller-Annotation-Analytics-Model-Attribute/)


---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

