---
layout: post
title:  " Spring 프레임워크 핵심 기술 - 데이터 바인딩 추상화/ PropertyEditor "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## 데이터 바인딩이란?

* 사용자가 입력한 값이

* 어플리케이션 도메인 객체에 

* 동적으로 할당되는 과정을 뜻한다.

* 그리고 데이터 바인딩 개념은

* 스프링뿐만 아니라 다른 곳에서도 사용되는 개념이다.

> 동적 할당이 필요한 이유는? 

* 사용자는 주로 **문자열**을 입력하고

* 어플리케이션 도메인에는

* 다양하나 타압들의 객체들이 존재한다.

<br>

* 그러므로 

* 사용자가 입력한 문자열을

* 객체가 갖고있는 

* 다양한 타입으로 변환을 시켜야하기 때문에 

* 동적 할당이 필요하다.

<br>

* 그런 변환해주는 과정을 

* **데이터 바인딩**이라 부르고

* 스프링에서는 **데이터 바인딩 기능**을 제공한다. 

* [org.springframework.validation.DataBinder](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/validation/DataBinder.html)












---

## [PropertyEditor](https://docs.oracle.com/javase/7/docs/api/java/beans/PropertyEditor.html)

* 스프링 3.0 이전까지 

* DataBinder가 변환 작업에 사용하던 인터페이스이다.

<br>

* 하지만 **State Full**하다는 특징 때문에 

* 치명적인 단점이 존재하게 된다.

<br>

* 또한 **String <-> Object 변환**만 가능하기 때문에 

* 자유롭지 못하다는 단점도 존재한다.

* 단점과 관련해서는 

* [PropertyEditor의 단점]({{site.url}}/Spring-Framework-Core-Technology-Data-Bindgin-PropertyEditor/#propertyeditor의-단점) 부분을 참고하자.

---

## Code를 통한 실습

> Controller

``` java
@RestController
public class EventController {

    @GetMapping("/event/{event}")
    public String getEvent(@PathVariable Event event){
        System.out.println(event);
        return event.getId().toString();
    }
}
```

> Object


``` java
public class Event {

    private Integer id;

    private String name;

    public Event(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```


> TC

``` java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/event/1"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("1"));
    }
}
```

> TC Result : Fail

* 1이라는 프로퍼티를 

* Event라는 도메인 객체로 변환할 수 없기 때문에 

* 테스트는 실패한다.

``` java
2019-09-02 09:19:14.877  WARN 27076 --- [           main] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.method.annotation.MethodArgumentConversionNotSupportedException: Failed to convert value of type 'java.lang.String' to required type 'goodgid.study.spring.Event'; nested exception is java.lang.IllegalStateException: Cannot convert value of type 'java.lang.String' to required type 'goodgid.study.spring.Event': no matching editors or conversion strategy found]

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /event/1
       Parameters = {}
          Headers = []
             Body = <no character encoding set>
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 500
    Error message = null
          Headers = []
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status 
Expected :200
Actual   :500
```

> Editor 

* 사용자가 요청한 값을 

* 해당 도메인 객체로 변환할 수 있는 Editor를 생성해보자.

* **PropertyEditorSupport**를 상속받아 

* 필요한 메소드만 Override한다.

``` java
public class EventEditor extends PropertyEditorSupport {

    @Override
    public String getAsText() { // Return Type인 String으로 변환한다.
        return super.getAsText();
    }

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        setValue(new Event(Integer.parseInt(text))); // 입력받은 String을 Object로 변환한다.
    }
}
```

* 그리고 다시 TC를 돌리면 성공하는 것을 확인할 수 있다.

``` java
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /event/1
       Parameters = {}
          Headers = []
             Body = <no character encoding set>
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"text/plain;charset=UTF-8", Content-Length:"1"]
     Content type = text/plain;charset=UTF-8
             Body = 1
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

## PropertyEditor의 단점

### String <-> Ojbect 변환

* 위 코드에서 보면 알 수 있듯이 

* PropertyEditor는 **String <-> Object 변환**만 가능하다.

* 그렇기 때문에 

* `A Object <-> B Object`와 같은 변환은 불가능하다.

### State Full 

* 위에서 언급했듯이 

* PropertyEditor는 

* **State Full**하다는 특징으로 인해 

* 치명적인 단점이 발생한다.

<br>

* 상태 정보를 저장하고 있기 때문에 

* 싱글톤 빈으로 등록하여 사용하였을 경우에

* 다음과 같은 상황이 발생할 수 있다.

```
A유저가 setValue()를 호출하였는데
PropertyEditor가
B유저에게 setValue() 할 수 있다.

A유저가 getValue()를 호출하였는데
PropertyEditor가
B유저 정보를 Return 할 수 있다.
```

* 즉 **Thread Safe** 하지 않다.

* 그렇기 때문에 

* 서로 다른 Thread에게 공유가 된다.

* 그러므로 PropertyEditor의 구현체는 

* 여러 Thread에서 공유해서 사용하면 안된다.

<br>

* 다시말해 Bean으로 등록해서 사용하면 안된다.

* 이런 단점을 보완하고자 스프링에서는 3.0 이후부터

* 데이터 바인딩과 관련해 

* **Converter**와 **Formater**와 같은 기능들이 추가되었다.

* 이와 관련해서는 

* [Spring 프레임워크 핵심 기술 - Converter와 Formatter 1부]({{site.url}}/Spring-Framework-Core-Technology-Converter-Formatter-Part-1/)을 참고하자.

<br>

* 그럼에도 PropertyEditor를 사용해야한다면 

* 그냥 싱글톤 빈이 아니라 

* **Thread Scope**의 Bean으로 등록하여 사용해야 한다.

* 그렇게 등록을 하면 

* 한 Thread 내에서만 유효하다.

<br>

* 하지만 빈 등록을 하여

* PropertyEditor를 사용하기보다는

* 다른 방법으로 사용하는걸 추천한다.

<br>

* **@InitBinder**라는 어노테이션을 사용하여 

* Editor를 Global하게 사용하는게 아니라 

* 해당 컨트롤러에서 

* 특정 Editor를 지정하여 사용하는 것이 안전한다.

``` java
@RestController
public class EventController {

    @InitBinder
    public void init(WebDataBinder webDataBinder) {
        webDataBinder.registerCustomEditor(Event.class, new EventEditor());
    }

    @GetMapping("/event/{event}")
    public String getEvent(@PathVariable Event event) {
        System.out.println(event);
        return event.getId().toString();
    }
}
```


---

## Reference

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

