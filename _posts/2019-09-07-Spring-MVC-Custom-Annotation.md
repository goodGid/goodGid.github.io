---
layout: post
title:  " Spring MVC - 커스텀 애노테이션(Custom Annotation) "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.


## 조합(Composed) 애노테이션

* 한개 혹은 여러 **[메타 애노테이션]({{site.url}}/Spring-MVC-Custom-Annotation/#메타meta-애노테이션)**을 조합해서 만든 애노테이션이다.

* 그리고 그런 애노테이션을 조합(Composed) 애노테이션이라 한다.

### 장점

* 코드를 간결하게 줄일 수 있다.

* 보다 구체적인 의미를 부여할 수 있다.

---

## 메타(Meta) 애노테이션

* 애노테이션 위에 사용하는 애노테이션을 **메타 애노테이션**이라고 한다.

* PostMapping 애노테이션을 보자.

``` java
package org.springframework.web.bind.annotation;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@RequestMapping(
    method = {RequestMethod.POST}
)
public @interface PostMapping {
    @AliasFor(
        annotation = RequestMapping.class
    )
    String name() default "";   
    ...
}
```

* 여기서 해당 부분이 **메타 애노테이션**이다.

``` java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@RequestMapping(
    method = {RequestMethod.POST}
)
```

* @Target 애노테이션에 관해서는 [Target 애노테이션]({{site.url}}/Spring-MVC-Target-Annotation/) 글을 참고하자.

* @Documented 애노테이션에 관해서는 [Documented 애노테이션]({{site.url}}/Spring-MVC-Documented-Annotation/) 글을 참고하자.

* @Retention 애노테이션에 대한 개념은 [Retention 애노테이션]({{site.url}}/Spring-MVC-Retention-Annotation/) 글을 참고하자.

---

## 커스텀 애노테이션(Custom Annotation) 사용하기

* 커스텀 애노테이션을 만들어보자.

* @GetHelloAnnotation는 

* GET 메소드로 */hello* 라는 URI값을 처리하는 애노테이션이다.

``` java
@RequestMapping(method = RequestMethod.GET, value = "/hello")
public @interface GetHelloAnnotation {
}
```

* 커스텀 애노테이션(= @GetHelloAnnotation)을 사용한다.

``` java
@Controller
@RequestMapping
public class SampleController {

    @GetHelloAnnotation
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
```

* 그리고 TC를 실행해보자.

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/hello"))
            .andDo(print())
            .andExpect(status().isOk());
}
```

* 404가 에러가 발생하면서 Test가 실패한다.

``` java
MockHttpServletResponse:
           Status = 404
    Error message = null
          Headers = []
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status 
Expected :200
Actual   :404
```

* TC가 실패하는 이유가 뭘까?

* 런타임시에 @GetHelloAnnotation 애노테이션이 사라지기 때문이다.

* 사라지는 이유를 알기 위해선 애노테이션의 속성인 **[@Retention]({{site.url}}/Spring-MVC-Retention-Annotation)**에 대해 알아야한다.


---


## 문제 해결

> @Retention 글을 읽고 와야 원인을 제대로 이해하고 문제를 해결 할 수 있다.

* @Retention 애노테이션에 대해 알아봤으니 다시 TC가 실패한 이유에 대해 알아보자.

``` java
@RequestMapping(method = RequestMethod.GET, value = "/hello")
public @interface GetHelloAnnotation {
}
```

* @Retention의 기본값은 **클래스**이다.

* 컴파일 시점에 @GetHelloAnnotation은 .class에 포함된다.

* 그런데 클래스를 로딩하는 시점에 해당 애노테이션이 사라진다.

* 즉 SampleController를 바이트 코드로 컴파일 하고

* 클래스 로더가 해당 바이트 코드를 로드할 때 

* @GetHelloAnnotation는 사라지게 되는 것이다.

* 그런데 스프링은 런타임때 @GetHelloAnnotation를 참고해야한다.

* 그러므로 @GetHelloAnnotation를 런타임시점까지 유지하라는 옵션을 명시해줘야 원하는 동작을 하게 된다.

<br>

``` java
@Retention(RetentionPolicy.RUNTIME)
@RequestMapping(method = RequestMethod.GET, value = "/hello")
public @interface GetHelloAnnotation {
}
```

* @Retention 옵션을 런타임으로 수정하고 다시 TC를 실행하자.

* 어플리케이션이 구동될 때까지 @GetHelloAnnotation 애노테이션이 유지되고

* @GetHelloAnnotation안에 있는 메타 애노테이션을 활용하여

* 사용자의 요청을 스프링 MVC가 정상적으로 처리할 수 있게 된다.


---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

