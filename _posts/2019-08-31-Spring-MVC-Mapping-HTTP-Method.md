---
layout: post
title:  " Spring MVC - HTTP Method 매핑하기 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.


* 누군가에겐 너무나도 당연한 기초일 수 있지만 

* 누군가에겐 이 또한 새로울 수 있다.

* 기초를 다지자 !

## HTTP Method 

``` java
@Controller
public class SampleController {

    @RequestMapping("/hello")
    @ResponseBody
    public String hello(){
        return "hello";
    }
    
    @RequestMapping("/Return_View_Name")
    public String Return_View_Name(){
        /*
        view Name이 'hello'인 view를 찾아간다.
         */
        return "hello";
    }

    @RequestMapping("/Return_data_in_Response_Body")
    @ResponseBody
    public String Return_data_in_Response_Body(){
        /*
        문자열 그대로 Return 하고 싶다면
        @ResponseBody를 추가해준다.
         */
        return "hello";
    }
}
```











* 위 코드에 해당하는 Test Code를 작성해보자.

``` java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc; // @WebMvcTest를 선언했기 때문에 사용이 가능하다.

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }
}
```

* **.andDo(print())** 코드가 있었기 때문에 print()가 출력되고

* 출력 결과는 다음과 같다.


``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = []
             Body = <no character encoding set>
    Session Attrs = {}

Handler:
             Type = goodgid.spring.study.SampleController
           Method = public java.lang.String goodgid.spring.study.SampleController.hello()

Async:
    Async started = false
     Async result = null

Resolved Exception:
             Type = null

ModelAndView:
        View name = null
             View = null
            Model = null

FlashMap:
       Attributes = null

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

* HTTP Method를 Mapping하는 다양한 방식으로 수정해보자.

* 기존의 핸들러는 다음과 같았다.

``` java
@RequestMapping("/hello")
@ResponseBody
public String hello(){
    return "hello";
}
```

* 해당 코드를 다음과 같이 변경해도 된다.

* 변경된 코드는 보다 직관적이며 그 뜻은 다음과 같다.

* Get 요청으로 **/hello**라는 URI를 받는다.

``` java
@RequestMapping(value = "/hello", method = RequestMethod.GET)
@ResponseBody
public String hello(){
    return "hello";
}
```

* 코드를 더 줄이고 싶다면 다음과 같이 수정한다.

* **@GetMapping**를 사용하여 코드를 변경하였다.

``` java
@GetMapping("/hello") // 바뀐 부분
@ResponseBody
public String hello(){
    return "hello";
}
```


* 만약 HTTP Method를 2개 이상 허용하고 싶다면 다음과 같이 코드를 수정하면 된다.

``` java
@RequestMapping(value = "/hello", method = { RequestMethod.GET, RequestMethod.PUT })
@ResponseBody
public String hello() {
    return "hello";
}
```

* 배열이기 때문에 **[ ]**라고 생각했지만 **{ }**이다.

* 마지막으로 클래스 레벨에서 HTTP Method를 컨트롤해보자.

``` java
@Controller
/*
클래스 레벨에서도 처리가 가능하다.
그럴 경우엔 모든 핸들러에서 HTTP GET Method만 처리한다.
 */
@RequestMapping(method = RequestMethod.GET)
public class SampleController {
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
```

---

## HTTP Method 종류

### GET

* 클라이언트가 서버의 리소스를 요청할 때 사용한다.

* 캐싱 할 수 있다. (조건적인 GET으로 바뀔 수 있다.)

* 브라우저 기록에 남는다.

* 북마크 할 수 있다.

* 민감한 데이터를 보낼 때 사용하지 말 것. (URL에 다 보이니까)

* [Idempotent]({{site.url}}/HTTP-Method-Post-vs-Put-vs-Patch/#idempotent) : O

---

### POST

* 클라이언트가 서버의 리소스를 수정하거나 새로 만들 때 사용한다.

* 서버에 보내는 데이터를 POST 요청 본문에 담는다.

* 캐시할 수 없다.

* 브라우저 기록에 남지 않는다.

* 북마크 할 수 없다.

* 데이터 길이 제한이 없다.

* [Idempotent]({{site.url}}/HTTP-Method-Post-vs-Put-vs-Patch/#idempotent) : X

---

### PUT

* URI에 해당하는 데이터를 새로 만들거나 수정할 때 사용한다.

* POST와 다른 점은 **URI**에 대한 의미가 다르다.

    - POST의 URI는 보내는 데이터를 처리할 리소스를 지칭하며

    - PUT의 URI는 보내는 데이터에 해당하는 리소스를 지칭한다.
 
* [Idempotent]({{site.url}}/HTTP-Method-Post-vs-Put-vs-Patch/#idempotent) : O

---

### PATCH

* PUT과 비슷하지만, 기존 엔티티와 새 데이터의 차이점만 보낸다는 차이가 있다.

* [Idempotent]({{site.url}}/HTTP-Method-Post-vs-Put-vs-Patch/#idempotent) : O

---

### DELETE

* URI에 해당하는 리소스를 삭제할 때 사용한다.

* [Idempotent]({{site.url}}/HTTP-Method-Post-vs-Put-vs-Patch/#idempotent) : O

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)