---
layout: post
title:  " Spring MVC - @ControllerAdvice 애노테이션 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @ControllerAdvice

* 예외 처리 ( @ExceptionHandler ), 

* 바인딩 설정( @InitBinder ), 

* 모델 객체( @ModelAttributes )를 

* 모든 Controller 전반에 걸쳐

* 적용하고 싶을때 사용한다.

<br>

* 즉 A Controller에서만 사용하는게 아니라

* B, C, D 등등 여러 Controller에

* 공통적으로 사용하고 싶을 경우 사용하면 된다.





---

## ControllerAdvice 설정

* 순수하게 @ControllerAdvice를 사용하면

* 모든 Controller에 적용이 된다.

<br>

* 모든 Controller가 아닌 

* 특정 Controller들에만 적용하고 싶을 경우

* 원하는 ControllerAdvice의 옵션을 사용하면 된다.

> ControllerAdvice

``` java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface ControllerAdvice {
    @AliasFor("basePackages")
    String[] value() default {};

    @AliasFor("value")
    String[] basePackages() default {};

    Class<?>[] basePackageClasses() default {};

    Class<?>[] assignableTypes() default {};

    Class<? extends Annotation>[] annotations() default {};
}
```

* 예제에서는 *assignableTypes* 를 사용하여

* EventController.class에만

* 해당 ControllerAdvice를 적용시킨다.

``` java
@ControllerAdvice(assignableTypes = {EventController.class})
public class AdviceController {

    @ExceptionHandler
    public String handleException(Exception e){
        System.out.println("Exception 발생");
        return "error";
    }

    @ExceptionHandler({EventException.class,RuntimeException.class})
    public String handleExceptionForSpecificException(Exception e){
        System.out.println( "Exception : " + e);
        return "error";
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder){
        webDataBinder.addValidators(new EventValidator());
    }
}
```

* ControllerAdvice의에 대한 

* 보다 자세한 정보는

* [spring.io](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-controller-advice)를 참고하자.

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

