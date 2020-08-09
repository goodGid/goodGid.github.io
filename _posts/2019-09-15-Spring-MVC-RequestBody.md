---
layout: post
title:  " Spring MVC - @RequestBody 애노테이션 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## @RequestBody

* 요청 Body에 있는 값을

  **HttpMessageConveter**를 이용하여

  특정 객체 타입으로 변환시킬 수 있다.

  또한 [@Valid]({{site.url}}/Spring-MVC-Valid-And-Validated/#valid)와 [@Validated]({{site.url}}/Spring-MVC-Valid-And-Validated/#validated)를 사용하여 값을 검증할 수 있다.




---

## How?

* 어떻게 가능할까?

  WebConfig 파일에서 

> WebConfig

``` java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    ...
}
```

* @EnableWebMvc를 선언한다.

> EnableWebMvc

``` java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@Import({DelegatingWebMvcConfiguration.class})
public @interface EnableWebMvc {
}
```

* 그러면 DelegatingWebMvcConfiguration를 Import 하는 것을 볼 수 있다.

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

* 그리고 DelegatingWebMvcConfiguration는 

  다시 또 WebMvcConfigurationSupport를 **확장(= extends)**한다.

* 그리고 WebMvcConfigurationSupport 내부에 있는

  **addDefaultHttpMessageConverters** 메소드에서 messageConverter를 등록해주는 코드를 찾을 수 있다.

> WebMvcConfigurationSupport.addDefaultHttpMessageConverters( )

``` java
public class WebMvcConfigurationSupport implements ApplicationContextAware, ServletContextAware {
    
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
}
```

---

## Who use it?

* 그렇다면 이 messgaeConverts를 누가 사용할까?

  Handler Mapping ? 

  Handler Adapter ?

  View Resolver ? 

  정답은 **Handler Adapter**가 사용한다.

---

* 등록된 메시지 Converter들을

  Handler Adapter가 사용해서 Argument Resolving에 사용한다.

---

* 즉 메소드 Argument를 Resolving 할 때

  Handler Adapter에 등록된 
  
  여러 HttpMessageConveter 중에

  이 요청에 들어있는 본문을 Converting 할 수 있는 Converter를 찾아서 Conversion을 한다.

---

* 예를 들어

  Json 요청을 한다면 

  요청 헤더에 Content Type으로 Json임을 명시해줘야 한다.

* 그러면 그 Content Type을 보고 

  등록되어 있는 Converter들 중에서 
  
  Json Convert가 가능한 것을 찾아 

  Json 문자열을 해당 도메인 객체로 변경해준다.

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

## 한계

* @RequestBody Annotation은

  **Header 정보**에는 접근을 할 수 없다.

  단순히 Body에 있는 **정보만** 접근이 가능하다.

* 그래서 그 대체재로 생각해 볼 수 있는 개념으로는 

  Header와 Body까지 접근이 가능한 [HttpEntity]({{site.url}}/Spring-MVC-HttpEntity)가 있다.

---

## Summary

* 기본적으로 **HttpMessageConveter**에 

  특정 객체 타입으로 변환하는 Converter가 등록되어 있다.

* 만약 **HttpMessageConveter**과 관련하여 

  설정하는 방법이 궁금하다면 [HttpMessageConverter 설정하기]({{site.url}}/Spring-MVC-Http-Message-Converter-Setting)글을 참고하자.

---

## Reference

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

