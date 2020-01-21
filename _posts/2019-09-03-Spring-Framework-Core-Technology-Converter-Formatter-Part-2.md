---
layout: post
title:  " Spring 프레임워크 핵심 기술 - Converter와 Formatter 2부 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

* [Spring 프레임워크 핵심 기술 - 데이터 바인딩 추상화/ PropertyEditor]({{site.url}}/Spring-Framework-Core-Technology-Data-Bindgin-PropertyEditor/)글과 

* [Spring 프레임워크 핵심 기술 - Converter와 Formatter 1부]({{site.url}}/Spring-Framework-Core-Technology-Converter-Formatter-Part-1)을 이어 알아보자.

<br>

* PropertyEditor를 사용하면 

* DataBinder 인터페이스를 통해 **데이터 바인딩**이 이뤄진다.

<br>

* Converter와 Formatter를 사용하면 

* **ConversionService** 인터페이스를 사용하여 **데이터 바인딩**이 이뤄진다.

<br>

* 만약 Converter와 Formatter를 Config에 등록하여 사용한다면

* ConversionService 인터페이스를 사용한다고 할 수 있다.




## DefaultFormattingConversionService

> Spring MVC 기준 

* DefaultFormattingConversionService는

* ConversionService 타입의 대표적인 빈 클래스로 사용된다.

<br>

* DefaultFormattingConversionService에는 기본적으로

* **FormatterRegistry**와 **ConversionService**를 구현했다.

<br>

* 추가적으로 

* 기본적인 Converter와 Formatter 또한 등록되어 있다.

<br>

* DefaultFormattingConversionService의 구조는 다음과 같다.

![](/assets/img/spring/spring_framwework_core_tech_converter_formatter_part_2_1.png)


* 위 그림에서 알 수 있듯이 

* DefaultFormattingConversionService는 FormatterRegistry를 상속

* FormatterRegistry는 ConverterRegistry를 상속하는 관계를 갖는다.

<br>

* 실제로 FormatterRegistry 소스코드를 보면 

* ConverterRegistry를 상속하는 것을 볼 수 있다.

``` java
public interface FormatterRegistry extends ConverterRegistry {
    void addFormatter(Formatter<?> var1);

    void addFormatterForFieldType(Class<?> var1, Formatter<?> var2);

    void addFormatterForFieldType(Class<?> var1, Printer<?> var2, Parser<?> var3);

    void addFormatterForFieldAnnotation(AnnotationFormatterFactory<? extends Annotation> var1);
}
```

* 그렇기 때문에 

* FormatterRegistry에 Converter 등록이 가능하다.

``` java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
       registry.addConverter(new StringToEventConverter());
    }
}
```

> AppRuner를 통해 실제로 conversionService 출력해보자.

``` java
@Component
public class AppRuner implements ApplicationRunner {

    @Autowired
    private ConversionService conversionService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("[1] : " + conversionService);
        System.out.println("[2] : " + conversionService.getClass().toGenericString());
        System.out.println("[3] : " + conversionService.getClass().toString());
    }
}
```

> 출력 결과

``` java
[1] : ConversionService converters =
	@org.springframework.format.annotation.DateTimeFormat java.lang.Long -> java.lang.String: org.springframework.format.datetime.DateTimeFormatAnnotationFormatterFactory@bae47a0,@org.springframework.format.annotation.NumberFormat java.lang.Long -> java.lang.String: org.springframework.format.number.NumberFormatAnnotationFormatterFactory@3b65e559
    ...
    org.springframework.core.convert.support.StringToArrayConverter@61e3a1fd
	org.springframework.core.convert.support.StringToCollectionConverter@315df4bb

// WebConversionService 출력
[2] : public class org.springframework.boot.autoconfigure.web.format.WebConversionService

// WebConversionService 출력
[3] : class org.springframework.boot.autoconfigure.web.format.WebConversionService
```

* 그런데 기대했던 *DefaultFormattingConversionService* 가 아닌 

* *WebConversionService* Class가 나온다.

<br>

* 이유가 뭘까?

* 코드를 다시 보자.

``` java
public class WebConversionService extends DefaultFormattingConversionService {
    private static final boolean JSR_354_PRESENT = ClassUtils.isPresent("javax.money.MonetaryAmount", WebConversionService.class.getClassLoader());
    private static final boolean JODA_TIME_PRESENT = ClassUtils.isPresent("org.joda.time.LocalDate", WebConversionService.class.getClassLoader());
    private final String dateFormat;

    public WebConversionService(String dateFormat) {
        super(false);
        this.dateFormat = StringUtils.hasText(dateFormat) ? dateFormat : null;
        if (this.dateFormat != null) {
            this.addFormatters();
        } else {
            addDefaultFormatters(this);
        }

    }

    private void addFormatters() {
        this.addFormatterForFieldAnnotation(new NumberFormatAnnotationFormatterFactory());
        if (JSR_354_PRESENT) {
            this.addFormatter(new CurrencyUnitFormatter());
            this.addFormatter(new MonetaryAmountFormatter());
            this.addFormatterForFieldAnnotation(new Jsr354NumberFormatAnnotationFormatterFactory());
        }

        this.registerJsr310();
        if (JODA_TIME_PRESENT) {
            this.registerJodaTime();
        }

        this.registerJavaDate();
    }

    ...

    private void registerJavaDate() {
        DateFormatterRegistrar dateFormatterRegistrar = new DateFormatterRegistrar();
        if (this.dateFormat != null) {
            DateFormatter dateFormatter = new DateFormatter(this.dateFormat);
            dateFormatterRegistrar.setFormatter(dateFormatter);
        }

        dateFormatterRegistrar.registerFormatters(this);
    }
}
```

* Spring Boot에서는

* DefaultFormattingConversionService를 상속하여 만든 

* WebConversionService를 제공한다.

* WebConversionService = DefaultFormattingConversionService + 추가 기능 


---


## Spring Boot일 경우

* Spring MVC환경에서는 

* Config에 

* Formatter와 Converter를 직접 등록하여 사용했다.

<br>

* 하지만 Spring Boot 경우엔

* 해당 Formatter와 Converter를 

* Bean으로 등록하면 자동으로 찾아 등록해 준다.

* 이와 관련해서는 

* [Spring Boot에서 WebMvcAutoConfiguration 클래스가 하는 역할 :: Converter / Formatter]({{site.url}}/Spring-Boot-WebMvcAutoConfiguration-Converter-Formatter/) 글을 참고하자.

<br>

* Formatter와 Converter를 

* 직접등록하는 코드를 제거하고

``` java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
    //    registry.addConverter(new StringToEventConverter());
    //    registry.addFormatter(new EventFormatter());
    }
}
```

* Formatter와 Converter를 

* @Component 선언을 통해 

* Bean으로 등록한 후 

* TC를 돌려도 성공하는 것을 확인 할 수 있다.
 
``` java
public class EventConverter {
    
    @Component
    public static class StringToEventConverter implements Converter<String, Event> {
        @Override
        public Event convert(String s) {
            return new Event(Integer.parseInt(s));
        }
    }

    @Component
    public static class EventToStringConvert implements Converter<Event, String> {
        @Override
        public String convert(Event event) {
            return event.getId().toString();
        }
    }
}
```


---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

