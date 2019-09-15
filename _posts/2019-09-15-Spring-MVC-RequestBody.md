---
layout: post
title:  " Spring MVC - @RequestBody 애노테이션 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @RequestBody

* 요청 Body에 있는 값을

* **HttpMessageConveter**를 이용하여

* 바디안에 있는 데이터를

* 해당 타입으로 변환을 시켜준다.


## How ?

* 어떻게 가능할까?

* WebConfig 파일에서 

> WebConfig

``` java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    ...
}
```

* @EnableWebMvc를 선언한다.

* 그리고 

* @EnableWebMvc를 보면

> EnableWebMvc

``` java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@Import({DelegatingWebMvcConfiguration.class})
public @interface EnableWebMvc {
}
```

* DelegatingWebMvcConfiguration를 

* Import하는 것을 볼 수 있다.

* 여기서 DelegatingWebMvcConfiguration의 내부는 다음과 같다.

> DelegatingWebMvcConfiguration

``` java
@Configuration
public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport {
    private final WebMvcConfigurerComposite configurers = new WebMvcConfigurerComposite();

    public DelegatingWebMvcConfiguration() {
    }
    ...
}
```

* DelegatingWebMvcConfiguration는

* WebMvcConfigurationSupport를 **확장(= extends)**하는 것을 볼 수 있다.

* 여기서 WebMvcConfigurationSupport의 내부는 다음과 같다.

> WebMvcConfigurationSupport

``` java
public class WebMvcConfigurationSupport implements ApplicationContextAware, ServletContextAware {
    private static boolean romePresent = ClassUtils.isPresent("com.rometools.rome.feed.WireFeed", WebMvcConfigurationSupport.class.getClassLoader());
    private static final boolean jaxb2Present = ClassUtils.isPresent("javax.xml.bind.Binder", WebMvcConfigurationSupport.class.getClassLoader());
    private static final boolean jackson2Present = ClassUtils.isPresent("com.fasterxml.jackson.databind.ObjectMapper", WebMvcConfigurationSupport.class.getClassLoader()) && ClassUtils.isPresent("com.fasterxml.jackson.core.JsonGenerator", WebMvcConfigurationSupport.class.getClassLoader());
    private static final boolean jackson2XmlPresent = ClassUtils.isPresent("com.fasterxml.jackson.dataformat.xml.XmlMapper", WebMvcConfigurationSupport.class.getClassLoader());
    ...
}
```

* 그리고 WebMvcConfigurationSupport 내부에는

* 기본 Converter가 등록되는 메소드가 있다.

* (= **addDefaultHttpMessageConverters** )

> WebMvcConfigurationSupport.addDefaultHttpMessageConverters( )

``` java
protected final void addDefaultHttpMessageConverters(List<HttpMessageConverter<?>> messageConverters) {
        StringHttpMessageConverter stringConverter = new StringHttpMessageConverter();
        stringConverter.setWriteAcceptCharset(false);
        messageConverters.add(new ByteArrayHttpMessageConverter());
        messageConverters.add(stringConverter);
        messageConverters.add(new ResourceHttpMessageConverter());
        messageConverters.add(new SourceHttpMessageConverter());
        messageConverters.add(new AllEncompassingFormHttpMessageConverter());
        if (romePresent) {
            messageConverters.add(new AtomFeedHttpMessageConverter());
            messageConverters.add(new RssChannelHttpMessageConverter());
        }

        ObjectMapper objectMapper;
        if (jackson2XmlPresent) {
            objectMapper = Jackson2ObjectMapperBuilder.xml().applicationContext(this.applicationContext).build();
            messageConverters.add(new MappingJackson2XmlHttpMessageConverter(objectMapper));
        } else if (jaxb2Present) {
            messageConverters.add(new Jaxb2RootElementHttpMessageConverter());
        }

        if (jackson2Present) {
            objectMapper = Jackson2ObjectMapperBuilder.json().applicationContext(this.applicationContext).build();
            messageConverters.add(new MappingJackson2HttpMessageConverter(objectMapper));
        } else if (gsonPresent) {
            messageConverters.add(new GsonHttpMessageConverter());
        }

    }
```

* 그리고 마침내 **addDefaultHttpMessageConverters** 메서드안에서

* messageConverter를 등록한다.

---

## Who use it ?

* 그렇다면 이 messgaeConverts를 누가 사용할까?

* Handler Mapping ? 

* Handler Adapter ?

* View Resolver ? 

* 정답은 **Handler Adapter**가 사용한다.

* 등록되어 있는 메시지 Converter들을

* Handler Adapter가 사용해서

* Argument들을 Resolving할 때 사용한다.

<br>

* 즉 메소드 Argument를 Resolving 할 때

* Handler Adapter에 등록되어 있는

* 여러 HttpMessageConveter 중에

* 현재 이 요청에 들어있는 본문을 

* Converting 할 수 있는

* Converter를 선택을해서

* Conversion을 한다

<br>

* 예를 들어

* Json으로 들어오면

* 요청 헤더에

* 컨텐츠 타입을 알려줘야한다.

* 그런데 일반적으로

* 내가 보내는 본문의 타입이 Json이다 처럼

* 컨텐츠 타입을 알려준다.

* 그러면 그 컨텐츠 타입을 보고

* Json을 Converting을 할 수 있는

* 등록되어 있는 Converter들 중에서 

* Json을 처리할 수 있는 Converter를 찾아서

* Json 문자열을 해당 도메인 객체로 변경해준다.


---

## Example Code


> TC

``` java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MockMvc mockMvc;

    @Test
    public void createEvent() throws Exception {
        Event event = new Event();
        event.setName("goodGid");
        event.setLimit(10);

        String json = objectMapper.writeValueAsString(event);

        mockMvc.perform(post("/api/events")
                                .contentType(MediaType.APPLICATION_JSON_UTF8)
                                .content(json)) // = 요청 내용 = Body 
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(jsonPath("name").value("goodGid"));
    }
```

> Result

``` java
MockHttpServletRequest:
      HTTP Method = POST
      Request URI = /api/events
       Parameters = {}
          Headers = [Content-Type:"application/json;charset=UTF-8"]
             Body = {"id":null,"name":"goodGid","limit":10}
    Session Attrs = {}
```

---

## @RequestBody 한계

* **Header 정보**에는 접근을 할 수 없다.

* 단순히 본문에 있는 정보에만 접근이 가능하다.

* 비슷한 기능을 하지만

* Header 정보까지 접근이 가능한

* [HttpEntity]({{site.url}}/Spring-MVC-HttpEntity)도 같이 알아보자.

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

