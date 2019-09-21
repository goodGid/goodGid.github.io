---
layout: post
title:  " Spring MVC - @InitBinder 애노테이션 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## InitBinder

* 해당 Controller로 들어오는 요청에 대해

* 추가적인 설정을 하고 싶을 때 사용할 수 있다.

* 또한 모든 요청전에 

* InitBinder를 선언한 메소드가 실행된다.

* 코드를 통해 InitBinder의 사용법을 익혀보자.




---

## Example Code

### InitBinding 기본 설정

* 해당 Controller로 들어오는 요청들에 대해

* Controller 레벨에서 

* 다양한 설정이 가능하다.

``` java
@InitBinder
public void initBinder(WebDataBinder webDataBinder){
    /*
    만약 들어오는 객체의 
    프로퍼티로 id라는 필드가 있는 경우
    id값이 설정되어 들어오는게 원치 않을 경우
    다음과 같이 설정을 해줄 수 있다.
    그러면 
    클라이언트가 id값을 설정하여 요청을 해도
    해당 코드에서 필터링이 되어진다.
    */
    webDataBinder.setDisallowedFields("id");

    /*
    setDisallowedFields()는 필터링을 하는 거라면
    setAllowedFields()는 허용되는 필드를 명시해준다.
    */
    webDataBinder.setAllowedFields("id");

    /*
    특정 Formatter를 등록
    */
    webDataBinder.addCustomFormatter();

    /*
    특정 CustomEditor 등록    
    */
    webDataBinder.registerCustomEditor(Date.class, new CustomDateEditor(new ISO8601DateFormat(), false));

    /*
    특정 Validator를 등록
    */
    webDataBinder.addValidators(new EventValidator());
}
```

> EventValidator

``` java
public class EventValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        // 어떤 도메인에 해당 validate를 지원할건지 명시해준다.
        return Event.class.isAssignableFrom(clazz);
        or
        return Event.class.equals(clazz);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Event event = (Event) o;
        if(event.getName() == "goodgid"){
            errors.rejectValue("name", event.getName() + " is wrongValue");
        }
    }
}
```

---

### 특정 객체에만 적용

* 해당 Controller에 들어오는 요청 중

* 특정 객체에만

* Binding 또는 Validate 등을 설정할 수 있다.

> EventController

``` java

@InitBinder("Event")
public void initBinderForEvent(WebDataBinder webDataBinder) { // The return type must be void.
    webDataBinder.addValidators(new EventValidator());
}
```

* **@InitBinder("Event")** 

* Evenet 객체에만 

* EventValidator()가 적용된다.

---

### Bean 사용

* Bean을 사용하여 

* Validate를 할 수 있다.

* Controller와 Validator 코드를 수정하자.

> EventController

``` java
@Controller
public class EventController {

    // EventValidatorBean을 주입받는다.
    @Autowired
    private EventValidatorBean eventValidatorBean;

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder){
        // 해당 코드를 삭제한다.
        // webDataBinder.addValidators(new EventValidator());
    }
    
    @PostMapping("/hello")
    public String hello(BindingResult bindingResult){
        Event event = new Event();
        // 주입받은 EventValidatorBean을 사용하여
        // Validate를 한다.
        eventValidatorBean.validate(event, bindingResult);
        return "hello";
    }
}
```

> EventValidatorBean

``` java
@Component
/*
implements Validator 코드를 삭제한다.
그렇기 때문에
Validator의 메소드를 구현할 필요가 없어진다.
*/
public class EventValidatorBean {
    public void validate(Event event, Errors errors) {
        if(event.getName() == "goodgid"){
            errors.rejectValue("name", event.getName() + " is wrongValue");
        }
    }
}
```


---

## Summary

* Controller 레벨에서 

* 들어오는 요청에 대해

* 추가적인 설정하는 법에 대해 알아봤다.

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

