---
layout: post
title:  " Spring MVC - @SessionAttributes Annotation "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @SessionAttributes

* Model 정보를 

  **HttpSession**에 저장시켜주는 애노테이션이다.

<br>

* 예를 들어

  여러 화면에서

  배송 정보를 입력받아야 하는 화면이라면

  HttpSession에 

  각 화면마다 필요한 정보를 저장하고

  최종적으로 저장한 값들을 가져다 사용할 수 있다.

<br>

* HttpSession에 값을 저장시키는 방법은

  아래 코드처럼 HttpSession을 가져와 직접 저장할 수 있지만 

``` java
@Controller
@RequestMapping
public class SampleController {

    @GetMapping("/events")
    @ResponseBody
    public String hello(Model model, HttpSession httpSession) { // HttpSession을 가져온다.
        Event event = new Event();
        event.setName("goodGid");
        model.addAttribute("event", event);
        httpSession.setAttribute("event", event); // HttpSession 직접 저장
        return "hello";
    }
}
```

---

* @SessionAttributes 애노테이션을 사용하면

  보다 편리하게 저장할 수 있다.

* 만약 해당 클래스내에서 

  SessionAttributes 애노테이션에 정의되 Key와 
  
  동일한 Key로 Model에 값을 Set해주는 행위가 있을 시 **자동**으로 Session에도 저장시켜준다.

<br>

* 예를 들어 다음 코드에서는 

  SessionAttributes의 Key는 **event**이고

  model에 저장하는 Key 값도 **event**이기 때문에

  자동으로 Session에도 저장이된다.

> Controller

``` java
@Controller
@RequestMapping
@SessionAttributes("event")
public class SampleController {

    @GetMapping("/events")
    @ResponseBody
    public String hello(Model model) {
        Event event = new Event();
        event.setName("goodGid");
        model.addAttribute("event", event); // @SessionAttributes("event") 코드에 의해 
                                            // 동시에 HttpSession에도 저장된다.
        return "hello";
    }
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/events"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(request().sessionAttribute("event", notNullValue()));
}
```

* @SessionAttributes("event") 코드에 의해 

  Model에 저장하는 동시에

  HttpSession에도 저장이 되기 때문에

  Test Code는 성공한다.

---

* 참고로 TC에서 사용한 

  **request()** 메소드의 FQCN (Fully Qualified Class Name)는 다음과 같다.

  *org.springframework.test.web.servlet.result.MockMvcResultMatchers.request*

---

## @SessionAttributes 한계

* **@SessionAttributes**를 선언한 클래스 내에서만

  선언시 명시한 이름에 해당하는

  Model을 Session에 넣어줄 뿐

  여러 Controller에 걸쳐서는 적용이 안된다.

* 예를 들면 

``` java
@SessionAttributes("event")
public class A_Controller {
    model.addAttribute("event", event);
    ...
}


public class B_Controller {
    model.addAttribute("event", event);
    ...
}
```

* 이런 구조의 Controller가 있다면

* A_Controller에서는 

  *event* 라는 Key와 Value가 

  Model과 HttpSession에 저장이 되지만

  B_Controller에서는 적용이 되지 않는다.

  뿐만 아니라 Interceptor 혹은 Filter에도 적용이 안된다.

---

* 만약 Controller 밖(Interceptor 혹은 Filter 등)에서 

  (= HttpSession 전반에 걸쳐 )

  만들어 준 Session 데이터에 접근하고자 한다면

  @SessionAttributes가 아닌

  [@SessionAttribute]({{site.url}}/Spring-MVC-SessionAttribute)를 사용하면 된다.

  끝에 **s**가 붙지 않음을 주의하자.


---

## Session Clear

* HttpSession을 초기화 시키고 싶을 경우엔

  **SessionStatus**를 사용해 Session을 초기화 시킬 수 있다.

> Controller 

``` java
@GetMapping("/events")
@ResponseBody
public String hello(Model model, SessionStatus sessionStatus) {
    Event event = new Event();
    event.setName("goodGid");
    sessionStatus.isComplete(); // false
    sessionStatus.setComplete();
    sessionStatus.isComplete(); // true
    return "hello";
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/events"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(request().sessionAttribute("event", notNullValue()));
}
```

> Result

``` java
java.lang.AssertionError: Session attribute 'event'
Expected: not null
     but: was null
Expected :not null
Actual   :null
```

* Session을 초기화 하였기 때문에

  Test Code는 실패한다.


---

## Reference

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

