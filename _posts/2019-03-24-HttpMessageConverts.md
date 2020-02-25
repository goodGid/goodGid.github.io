---
layout: post
title:  " HttpMessageConverts 알아보기 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}


``` java
@RestController
public class UserController {
    @PostMapping("/user")
    public @ResponseBody User create(@RequestBody User user){
        return null;
    }
```

* 위 상황에서 HttpMessageConverters가 사용된다.

* HttpMessageConverters에는 여러 종류가 있다.

* 그 중 우리가 어떤 요청을 받았는지 또는 어떤 응답을 보내야하는지에 따라 사용하는 HttpMessageConverters가 달라진다.









```
예를 들어 JSON 요청이고 JSON 본문이 들어왔다. 
ContentType이 JSON이고 본문도 JSON이다.
그러면 JSONMessageConverts가 사용되고 JSON 메세지를 User라는 객체로 Converting 해준다.
User라는 객체 자체를 Response로 내보낼 순 없다.(Http는 다 문자이기 때문에...)
```



* 일반적으로 User처럼 Composition Type일 경우엔 JSONMessageConverts가 사용된다.

* Composition Type이라는것은 그 안에 여러가지 프로퍼티를 갖을 수 있는 것을 뜻한다.

``` java
package com.journaldev.composition;

public class Job {
    private String role;
    private long salary;
    private int id;
        
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public long getSalary() {
        return salary;
    }
    public void setSalary(long salary) {
        this.salary = salary;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    } 
}
```

* 참고로 @RestController가 붙어있으면 @ResponseBody 어노테이션 생략이 가능하다.

``` java
@RestController
public class UserController {
    @PostMapping("/user")
    public User create(@RequestBody User user){
        return null;
    }
```


* @RestController안에 이미 @ResponseBody가 존재하기 때문이다.

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

* 그러나 @RestController가 아닌 **@Controller**를 사용할 경우엔 @ResponseBody를 명시해야한다.

``` java
@Controller
public class UserController {
    @PostMapping("/user")
    public @ResponseBody User create(@RequestBody User user){
        return null;
    }
```

* 그렇지 않으면 ViewNameResolver가 사용되어 그 이름에 해당하는 View를 찾으려고하기 때문이다.

* 추가적으로 만약 Return Type이 String일 경우엔 HttpMessageConverters가 아닌 **StringMessageConverts**가 사용된다.


---

## 참고

* [스프링 부트 개념과 활용 : 스프링 웹 MVC 2부 HttpMessageConverters](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8/)

* [Composition in Java Example](https://www.journaldev.com/1325/composition-in-java-example)