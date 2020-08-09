---
layout: post
title:  " Spring MVC - HttpEntity "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## HttpEntity

* 요청 Body에 있는 값을

* **HttpMessageConveter**를 이용하여

* 특정 객체 타입으로 변환시킬 수 있다.




---

## Example Code

> Controller

``` java
@RestController
@RequestMapping("/api/events")
public class EventApi {

    @Autowired
    private ObjectMapper objectMapper;
    
    @PostMapping
    public Event createEvent(HttpEntity<Event> requset){
        Event body = requset.getBody(); // 요청의 본문이다. = RequestBody
        try {
            System.out.println(objectMapper.writeValueAsString(body));  // ObjectMapper로 
                                                                        // Object를 Json으로 Parsing
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        MediaType contentType = requset.getHeaders().getContentType();
        System.out.println(contentType);
        return body;
    }
}
```

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

        // Object를 String으로 Parsing한다.
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
{"id":null,"name":"goodGid","limit":10}
application/json;charset=UTF-8

...

MockHttpServletRequest:
      HTTP Method = POST
      Request URI = /api/events
       Parameters = {}
          Headers = [Content-Type:"application/json;charset=UTF-8"]
             Body = {"id":null,"name":"goodGid","limit":10}
    Session Attrs = {}
```

---

## @RequestBody와 차이점

* @RequestBody는 Body 정보만 접근이 가능하다.

* HttpEntity는 Body 정보 + Header 정보까지 접근이 가능하다.

* 보다 자세한 **@RequestBody**에 대한 내용은

* [@RequestBody 애노테이션]({{site.url}}/Spring-MVC-RequestBody)글을 참고하자.

---

## 맺음말

* 기본적으로 **HttpMessageConveter**에 

* 특정 객체 타입으로 변환하는 Converter가 등록되어 있다.

* 만약 **HttpMessageConveter**과 관련하여 

* 설정하는 방법이 궁금하다면 

* [HttpMessageConverter 설정하기]({{site.url}}/Spring-MVC-Http-Message-Converter-Setting)글을 참고하자.

---

## Reference

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

