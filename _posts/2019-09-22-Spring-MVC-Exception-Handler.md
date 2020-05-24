---
layout: post
title:  " Spring MVC - @ExceptionHandler 애노테이션 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @ExceptionHandler 

* 특정 Exception 발생 시

* 해당 Exception를 

* 컨트롤하여 요청에 대한 응답으로 

* 내보내고 싶을 때 사용한다.







---

## Example Code

### Global 

``` java
@Controller
public class EventController {

    @ExceptionHandler
    public String handleException(Exception e){
        // To do something for e of Exception
        System.out.println("Exception : " + e);
        return "error";
    }
}
```

* 모든 Exception에 대해

* **공통적인 작업**을

* 적용시킬 수 있다.

---

### Specific

``` java
@Controller
public class EventController {

    @ExceptionHandler({EventException.class,RuntimeException.class})
    public String handleExceptionForSpecificException(Exception e){
        System.out.println( "Exception : " + e);
        return "error";
    }
}
```

* 특정 Exception에 대해서

* 다른 Exception과는 다른 작업을 하고 싶다면

* @ExceptionHandler 애노테이션의 

* value로 Exception을 지정해줄 수 있다.


---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

