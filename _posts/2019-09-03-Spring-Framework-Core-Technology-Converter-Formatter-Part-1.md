---
layout: post
title:  " Spring 프레임워크 핵심 기술 - Converter와 Formatter 1부 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

* [Spring 프레임워크 핵심 기술 - 데이터 바인딩 추상화/ PropertyEditor]({{site.url}}/Spring-Framework-Core-Technology-Data-Bindgin-PropertyEditor/)글을 이어 알아보자.

* 스프링 3.0 이후 부터의 새롭게 추가된 **데이터 바인딩 기술**에 대해 알아보자.

* 혹시 [Property Editor의 단점]({{site.url}}/Spring-Framework-Core-Technology-Data-Bindgin-PropertyEditor/#propertyeditor의-단점)이 생각나지 않는다면 관련 글을 다시 한 번 읽고 이 글로 돌아오도록 하자.

## Converter

* 제네릭 타입으로 Source / Target을 입력받는다.

* 상태정보가 없다 

* = **Stateless**

* = **Thread Safe**하다.

* = Property Editor의 단점을 보완했다.

* 그러므로 Bean으로 등록하여 사용해도 된다.

> Converter

* 생성한 Converter 사용법은 

* ConverterRegistry에 등록하여 사용하면된다.

* = Config같은 파일에 등록하여 사용하면 된다. 

* 바로 아래 *Config* 부분을 참고하자.

``` java
public class EventConverter {

    public static class StringToEventConverter implements Converter<String, Event> {
        @Override
        public Event convert(String s) {
            return new Event(Integer.parseInt(s));
        }
    }

    public static class EventToStringConvert implements Converter<Event, String> {
        @Override
        public String convert(Event event) {
            return event.getId().toString();
        }
    }
}
```

> Config

``` java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        // 여기서 Converter를 등록하면 된다.
        registry.addConverter(new StringToEventConverter());
    }
}
```














---


## Formatter

* Formatter = PropertyEditor + Locale 정보 + **Thread Safe**

### PropertyEditor와 공통점

* String <-> Object 라는 특징은 PropertyEditor와 동일하다.

### PropertyEditor와 차이점

* Converter와 마찬가지로 

* **Thread Safe**하기 때문에 

* Bean으로 등록하여 사용해도 된다.

* 여기서 Locale 정보와 

* MessageSource를 사용하여 

* 원하는 언어로 변경할 수 있다.


``` java
public class EventFormatter implements Formatter<Event> {

    @Autowired
    private MessageSource messageSource; // Bean으로 등록하였기 때문에 다른 Bean 주입이 가능하다 !

    @Override
    public Event parse(String s, Locale locale) throws ParseException {
        return new Event(Integer.parseInt(s));
    }

    @Override
    public String print(Event event, Locale locale) {
        String afterString = messageSource.getMessage(event.getName(),locale);
        return afterString;
    }
}
```

> Config

* Formatter를 등록하여 사용하는 방법은 Converter와 동일하다.

``` java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
    //    registry.addConverter(new StringToEventConverter());
       registry.addFormatter(new EventFormatter());
    }
}
```

---


## PropertyEditor와 Converter 동시 존재

* 만약 PropertyEditor와 Converter가 동시에 존재한다면 어떻게될까? 라는 궁금증이 발생했다.

> Converter Code

``` java
public static class StringToEventConverter implements Converter<String, Event> {
        @Override
        public Event convert(String s) {
            return new Event(Integer.parseInt(s));
        }
    }
```

> @InitBinder Code

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

### Case 1. @InitBinder 존재 O

* PropertyEditor와 Converter 2개가 다 있는 상황에서

* 컨트롤러의 @InitBinder를 살려놓고 TC를 실행시키면 

* 순서는 다음과 같았다.

```
1. Converter를 등록하는 코드 실행 
2. @InitBinder 실행
3. EventEditor의 setAsText() 실행 
4. 컨트롤러로 이동
```

### Case 2. @InitBinder 존재 X

* 컨트롤러의 @InitBinder를 주석처리하고 TC를 실행시키면 

```
1. Converter를 등록하는 코드 실행 
2. Converter 실행
3. 컨트롤러로 이동
```

> 정리

* Converter를 등록하는 과정은 동일하다. 

* 어차피 이 부분은 Config를 등록하는 과정이기 때문에 동일하다고 생각된다.

<br>

* 그 다음에 컨트롤러에 

* @InitBinder가 존재하면 **PropertyEditor**

* @InitBinder가 존재하지 않으면 

* **Converter**가 동작하는 것을 확인할 수 있었다.

<br>

* 사실 왜 저렇게 동작하는지

* 정확한 이유는 모른다.

* 혹시 아는 분이 있다면

* 댓글 혹은 메일로 공유해주시면 

* 너무나도 감사하겠습니다 !!!

---

## Reference

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

