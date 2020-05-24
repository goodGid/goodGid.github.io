---
layout: post
title:  " Spring MVC - @SessionAttribute 애노테이션 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @SessionAttribute

* @SessionAttribute은

* [@SessionAttributes]({{site.url}}/Spring-MVC-SessionAttributes)과 비슷하지만

* 엄연히 다른 애노테이션이다.

---

## Example Code

* 해당 서버에 처음으로 방문한 시간을

* Http Session에 저장하는 작업을 해보자.








<br>

* Interceptor를 생성하고

* 그 Interceptor에서 HttpSession에 

* 방문 시간을 저장시키는 코드를 추가한다.

> Interceptor

``` java
public class VisitTimeInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        HttpSession httpSession = request.getSession();
        if (httpSession.getAttribute("visitTime") == null) {
            httpSession.setAttribute("visitTime", LocalDateTime.now());
        }
        return true; // true를 return해야 
                     // 다음 핸들러 혹은 인터셉터까지 요청 처리가 된다.
    }
}
```

* Configuration에 Interceptor를 등록하고

> Configuration

``` java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new VisitTimeInterceptor());
    }
}
```

* Controller에서는

* Http Session에 있는 방문 시간을 출력한다.

> Controller

``` java
@Controller
@RequestMapping
public class SampleController {

    @GetMapping("/events")
    @ResponseBody
    public String hello(Model model, @SessionAttribute LocalDateTime visitTime) {
        System.out.println(visitTime);
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
            .andExpect(status().isOk());
}
```

> Result

``` java
2019-09-14T11:19:00.320
```


---

## HttpSession와 차이점

* HttpSession으로도 

* 방문 시간을 출력할 수 있다.

<br>

* 하지만 **httpSession.getAttribute()**은 

* Object Type을 Return하므로

``` java
public Object getAttribute(String name) {
        this.assertIsValid();
        Assert.notNull(name, "Attribute name must not be null");
        return this.attributes.get(name);
    }
```

* Type Conversion이 필요하다.

> Controller

``` java
@GetMapping("/events")
@ResponseBody
public String hello(Model model, HttpSession httpSession) {
    LocalDateTime visitTime = (LocalDateTime) httpSession.getAttribute("visitTime");
    System.out.println(visitTime);
    return "hello";
}
```

* 그렇기 때문에 

* **Type Conversion**을 자동 지원하는 

* SessionAttribute를 사용하면

* Http Session에 있는 값을 

* 보다 편리하게 사용할 수 있다.


---

## SessionAttributes와 차이점

* 자세히 보면 같다고 볼 수 있는

* [@SessionAttributes]({{site.url}}/Spring-MVC-SessionAttributes) 애노테이션이 있다.

* 엄연히 다른 애노테이션이기 때문에

* 한번쯤 차이점에 대해 학습해 보면 좋을듯 싶다.

* [@SessionAttributes 애노테이션]({{site.url}}/Spring-MVC-SessionAttributes/)


---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

