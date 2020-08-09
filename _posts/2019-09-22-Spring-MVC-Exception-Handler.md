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

  해당 Exception을 Custom하게 Control이 가능하다.



---

## Example

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

  **공통적인 작업**을 적용할 수 있다.

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

* Exception마다 Custom 하게 Control하고

  @ExceptionHandler 애노테이션의 

  value로 다루고 싶은 Exception을 명시해주면 된다.


---

## Reference

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

