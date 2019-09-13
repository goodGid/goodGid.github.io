---
layout: post
title:  " @Valid와 @Validated "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @Valid

> Java에서 제공해주는 애노테이션이다.

``` java
package javax.validation;

/**
 * Marks a property, method parameter or method return type for validation cascading.
 * <p>
 * Constraints defined on the object and its properties are be validated when the
 * property, method parameter or method return type is validated.
 * <p>
 * This behavior is applied recursively.
 *
 * @author Emmanuel Bernard
 * @author Hardy Ferentschik
 */
@Target({ METHOD, FIELD, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
@Documented
public @interface Valid {
}
```
* Java가 제공해주는 

* @Valid 애노테이션에는 

* 특정 Validation 그룹으로 

* 검증을 시킬 수 있는 기능이 없다.









---

## @Validated

>  Spring에서 제공해주는 애노테이션이다.

``` java
package org.springframework.validation.annotation;

@Target({ElementType.TYPE, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Validated {
    Class<?>[] value() default {};
}
```

* 특정 Validation 그룹으로

* 검증 할 수 있는

* @Validated 애노테이션을 제공한다.


---

## Example Code

> Domain

``` java
public class Event {

    interface ValidateLimit {};
    interface ValidateName {};
    
    private Integer id;

    @NotBlank(groups = ValidateName.class)
    private String name;

    @Max(value = 10, groups = ValidateLimit.class)
    private Integer limit;
    
    ...

}
```

---

### ValidateLimit.Class

> Controller 

``` java
@Controller
@RequestMapping
public class SampleController {

    @GetMapping("/events")
    @ResponseBody
    public Event hello(@Validated(Event.ValidateLimit.class) @ModelAttribute Event event,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(c -> {
                System.out.println(c);
            });
        }
        return event;
    }
}
```

* 특정 그룹으로 

* (= **@Validated(Event.ValidateLimit.class)** )

* Validate 하겠다를 명시했다.

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/events")
                            .param("name", "goodGid")
                            .param("limit", "11"))
            .andDo(print())
            .andExpect(status().isOk());
}
```

> Result

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




---

### ValidateName.Class

> Controller 

``` java
@Controller
@RequestMapping
public class SampleController {

    @GetMapping("/events")
    @ResponseBody
    public Event hello(@Validated(Event.ValidateName.class) @ModelAttribute Event event,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(c -> {
                System.out.println(c);
            });
        }
        return event;
    }
}
```

> TC

``` java
@Test
public void helloTest() throws Exception {
    mockMvc.perform(get("/events")
                            .param("name", "goodGid")
                            .param("limit", "11"))
            .andDo(print())
            .andExpect(status().isOk());
}
```

> Result 

``` java
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

* **Event.ValidateName.class** 그룹으로 

* Validate를 하였기 때문에 

* **Event.ValidateLimit.class** 그룹으로

* Validate 하였을 때 

* 출력되었던 다음과 같은 로그가 출력되지 않는다.

``` java
Field error in object 'event' on field 'limit': rejected value [11]; codes [Max.event.limit,Max.limit,Max.java.lang.Integer,Max]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [event.limit,limit]; arguments []; default message [limit],10]; default message [must be less than or equal to 10]
```

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

