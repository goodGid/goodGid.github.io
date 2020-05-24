---
layout: post
title:  " Spring MVC - @ResponseBody 애노테이션 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @ResponseBody

* @ResponseBody의 기능은

* [@RequestBody]({{site.url}}/Spring-MVC-RequestBody)와 마찬가지로

* **HttpMessageConveter**를 이용하여

* 응답값을 응답 본문(=ResponseBody)에 담아준다.








<br>

* 또한 리턴 타입을 정할때는

* 기본적으로 요청에 Accept 헤더를 참고한다.

* 만약 브라우저가 요청을 한다면

* 브라우저 자체적으로 

* JSON or HTML을 요청한다.

``` java
@RequestMapping("/api/events")
public class EventApi {

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    @ResponseBody // @ResponseBody 선언
    public Event createEvent(HttpEntity<Event> requset){
        Event body = requset.getBody();
        try {
            System.out.println(objectMapper.writeValueAsString(body));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        MediaType contentType = requset.getHeaders().getContentType();
        System.out.println(contentType);
        return body;
    }
}
```

---

## 맺음말

* 만약 @RestController 애노테이션을 사용한다면 

* @ResponseBody 애노테이션을 생략해도 된다.

* Why? 

* @RestController의 정의를 보자.

``` java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Controller
@ResponseBody
public @interface RestController {
    @AliasFor(
        annotation = Controller.class
    )
    String value() default "";
}
```

* @RestController 애노테이션에는

* 이미 @ResponseBody가 선언되어있기 때문이다.

* 그렇기 때문에

* 만약 @RestController를 사용했다면

* 위 예시 코드는 다음과 같이 변경해도 된다.

``` java
@RestController
@RequestMapping("/api/events")
public class EventApi {

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    // @ResponseBody // 생략 가능 
    public Event createEvent(HttpEntity<Event> requset){
        Event body = requset.getBody();
        try {
            System.out.println(objectMapper.writeValueAsString(body));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        MediaType contentType = requset.getHeaders().getContentType();
        System.out.println(contentType);
        return body;
    }

}
```


---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

