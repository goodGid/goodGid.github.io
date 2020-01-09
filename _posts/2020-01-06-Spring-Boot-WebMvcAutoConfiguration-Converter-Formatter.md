---
layout: post
title:  " Spring Boot에서 WebMvcAutoConfiguration 클래스가 하는 역할 :: Converter / Formatter "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## 글의 목표

* 스프링 부트 환경에서

* WebMvcAutoConfiguration 클래스가 

* 하는 여러가지 역할 중에서

* Convert와 Formatter를

* 등록하는 역할에 대해 

* 포커스를 두고 알아보자.


## 글의 순서

> 1) 동작 과정

* WebMvcAutoConfiguration 클래스에서

* Converter / Formatter를 등록하는 과정을 이해해보자.

> 2) Convert와 Formatter 등록

* 실제로 Converter / Formatter를 등록해보자.









## 1. 동작 과정

* WebMvcAutoConfiguration 클래스에서 

* Convert와 Formatter를

* 어떻게 등록하는지 알아보자.

> WebMvcAutoConfigurationAdapter#addFormatters

``` java
public void addFormatters(FormatterRegistry registry) {
    // Step into addBeans()
    ApplicationConversionService.addBeans(registry, this.beanFactory);
}
```

> ApplicationConversionService#addBeans

``` java
public static void addBeans(FormatterRegistry registry, ListableBeanFactory beanFactory) {
    Set<Object> beans = new LinkedHashSet<>();
    beans.addAll(beanFactory.getBeansOfType(GenericConverter.class).values());
    beans.addAll(beanFactory.getBeansOfType(Converter.class).values());
    beans.addAll(beanFactory.getBeansOfType(Printer.class).values());
    beans.addAll(beanFactory.getBeansOfType(Parser.class).values());
    for (Object bean : beans) {
        if (bean instanceof GenericConverter) {
            registry.addConverter((GenericConverter) bean);
        }
        else if (bean instanceof Converter) {
            registry.addConverter((Converter<?, ?>) bean);
        }
        else if (bean instanceof Formatter) {
            registry.addFormatter((Formatter<?>) bean);
        }
        else if (bean instanceof Printer) {
            registry.addPrinter((Printer<?>) bean);
        }
        else if (bean instanceof Parser) {
            registry.addParser((Parser<?>) bean);
        }
    }
}
```

* addBeans() 메소드를 보면

* GenericConverter / Converter / Printer / Parser 타입의 빈을 

* 등록해주는 것을 볼 수 있다.

> Q. 그런데 Formatter는 어떻게 등록되는거지?

* addBeans() 메소드안에서

* 등록되는 4개의 타입에

* 내가 원했던 

* Formatter는 보이지 않는다.

``` java
beans.addAll(beanFactory.getBeansOfType(GenericConverter.class).values());
beans.addAll(beanFactory.getBeansOfType(Converter.class).values());
beans.addAll(beanFactory.getBeansOfType(Printer.class).values());
beans.addAll(beanFactory.getBeansOfType(Parser.class).values());
```

* 그래서 하나하나 상속 구조를 살펴보니

* Printer와 Parser 클래스를 

* Formatter가 상속하는 구조였다.

``` java
public interface Formatter<T> extends Printer<T>, Parser<T> {
}
```

> Printer

* 객체를 문자열로 어떻게 보여줄지 명시

> Parser

* 문자열을 객체로 어떻게 변환 활 것인가를 명시






## 2. Convert와 Formatter 등록

* 실제로 

* Convert와 Formatter를 등록해보자.

<br>

* Converter / Formatter 클래스를 만들고

* Bean으로만 선언 해주면

* 알아서 등록이 된다.

* 즉 WebConfig와 같은

* Configuration에 Bean을 

* 등록하는 과정이 생략된다.





### Example Code

> Person

``` java
@Getter
@Setter
@ToString
public class Person {
    private String name;
}
```


> PersonConverter

``` java
public class PersonConverter  {
    @Component
    public static class StringToPersonConverter implements Converter<String, Person> {
        @Override
        public Person convert(String s) {
            Person person = new Person();
            person.setName(s);
            return person;
        }
    }

    @Component
    public static class PersonToStringConvert implements Converter<Person, String> {
        @Override
        public String convert(Person person) {
            return person.getName();
        }
    }
}
```

> 주의 사항

* **static** 키워드를 반드시 붙혀줘야한다.

* 그렇지 않으면 등록이 되지 않는다.

    - **등록 X** : public class PersonToStringConvert

    - **등록 O** : public *static* class PersonToStringConvert

> PersonFormatter

``` java
@Component
public class PersonFormatter implements Formatter<Person> {

    @Override
    public Person parse(String s, Locale locale) throws ParseException {
        Person person = new Person();
        person.setName(s);
        return person;
    }

    @Override
    public String print(Person person, Locale locale) {
        return person.toString();
    }
}
```


### Test

* 실제로 요청을 통해 

* 등록이 잘 되는지 확인해보자.

> WebConfig

``` java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        // registry.addFormatter(new PersonFormatter());
        // registry.addConverter(new PersonConverter.StringToPersonConverter());
        // registry.addConverter(new PersonConverter.PersonToStringConvert());
    }
}
```

* WebConfig에서

* Converter / Formatter를 등록하는 코드를 주석처리한다.


> EventController

``` java
@RestController
public class EventController {
    @GetMapping("/hello/{name}")
    public String events(@PathVariable("name") Person person){
        return "hello " + person.getName();
    }
}
```


> EventControllerTest

``` java
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class EventControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    public void hello() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.get("/hello/goodgid"))
                .andDo(print())
                .andExpect(content().string("hello goodgid"));
    }
}
```

* TC를 실행시키고

* ApplicationConversionService에 

* Break Point를 걸고

* Debug를 해보자.

> ApplicationConversionService#addBeans

``` java
public static void addBeans(FormatterRegistry registry, ListableBeanFactory beanFactory) {
    Set<Object> beans = new LinkedHashSet<>();
    beans.addAll(beanFactory.getBeansOfType(GenericConverter.class).values());
    beans.addAll(beanFactory.getBeansOfType(Converter.class).values());
    beans.addAll(beanFactory.getBeansOfType(Printer.class).values());
    beans.addAll(beanFactory.getBeansOfType(Parser.class).values());
    for (Object bean : beans) {
        if (bean instanceof GenericConverter) {
            registry.addConverter((GenericConverter) bean);
        }
        else if (bean instanceof Converter) {
            registry.addConverter((Converter<?, ?>) bean);
        }
        else if (bean instanceof Formatter) {
            registry.addFormatter((Formatter<?>) bean);
        }
        else if (bean instanceof Printer) {
            registry.addPrinter((Printer<?>) bean);
        }
        else if (bean instanceof Parser) {
            registry.addParser((Parser<?>) bean);
        }
    }
}
```

![](/assets/img/spring/Spring-Boot-WebMvcAutoConfiguration-Converter-Formatter_2.png)

* [158] : beans.addAll(beanFactory.getBeansOfType(Converter.class).values()) 코드를 지나면

* 2개가 등록된다.

![](/assets/img/spring/Spring-Boot-WebMvcAutoConfiguration-Converter-Formatter_3.png)

* [159] : beans.addAll(beanFactory.getBeansOfType(Printer.class).values()) 코드를 지나면

* 1개가 등록된다.

![](/assets/img/spring/Spring-Boot-WebMvcAutoConfiguration-Converter-Formatter_1.png)

* 그래서 최종적으로는

* 3개가 등록되는 것을 확인할 수 있다.



## Summary

* 스프링 부트 환경에서

* 우리는 Converter와 Formatter를 

* Bean 선언만 하여도

* 자동적으로 등록이 되는 원리에 대해 알아봤다.

* 끝으로 **동영상**을 보면서 

* 이번글을 복습해보자.

* [WebMvcAutoConfiguration가 Converter와 Formatter를 등록하는 과정](https://github.com/goodGid/goodGid.github.io/blob/master/assets/img/spring/Spring-Boot-WebMvcAutoConfiguration-Converter-Formatter_1.mp4)

<br>

* 추가적으로 

* 사실 WebMvcAutoConfiguration 클래스는

* 스프링 부트 환경에서

* @SpringBootApplication 어노테이션과 밀접한 관련이 있다.

* 그것과 관련된 내용은 다음 글을 참고하자.

* [@EnableAutoConfiguration 어노테이션을 선언하면 내부적으로 어떤 일이 일어날까?]({{site.url}}/Spring-Boot-EnableAutoConfiguration/)


---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)