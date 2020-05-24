---
layout: post
title:  " Spring Controller에서 사용하는 Annotation 분석하기 : @RequestBody, @ResponseBody "
categories: Spring
author: goodGid
---
* content
{:toc}

## [@RequestBody]({{site.url}}/Spring-MVC-RequestBody/)와 @ResponseBody

* 요청 데이터의 본문을 읽어오거나 

* (= @RequestBody)

* 응답 데이터의 본문에 작성하고 싶은 경우

* (= @ResponseBody)

* 사용할 수 있는 Annotation이다.

<br>

* [@RequestBody]({{site.url}}/Spring-MVC-RequestBody/), @ResponseBody Annotation을 사용할 경우

* HttpMessageConvert가 

* Data를 Conversion 작업을 해주게 된다.






## Example

### Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/request/body")
    public Person1 requestBody(@RequestBody Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }
}
```

### Test Code

``` java
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class SpringControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    public void requestBody_GetPerson() throws Exception {
        Person1 person1 = new Person1();
        person1.setAge1_Long(1L);
        person1.setName("goodgid");


        /***
        * Person1 객체를
        * ObjectMapper를 사용하여
        * String으로 변환한다.
        *
        * Why?
        * 요청을 Object 혹은 JSON으로 보낼 순 없다.
        * Http 통신을 하기 때문에
        * 문자열로 보내야한다.
        */
        String jsonString = objectMapper.writeValueAsString(person1);

        mockMvc.perform(MockMvcRequestBuilders.get("/request/body")
                                              .contentType(MediaType.APPLICATION_JSON_UTF8)
                                              .accept(MediaType.APPLICATION_JSON_UTF8)
                                              .content(jsonString))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string(jsonString));
    }
}
```

### Log

``` java
Person1.Age : 1
Person1.Name : goodgid
Person1.IsConvert : null

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/body
       Parameters = {}
          Headers = [Content-Type:"application/json;charset=UTF-8", Accept:"application/json;charset=UTF-8", Content-Length:"49"]
            // Person1 객체를 String으로 변환하여 전송한다.
             Body = {"age1_Long":1,"name":"goodgid","isConvert":null}
    Session Attrs = {}

...


MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json;charset=UTF-8"]
     Content type = application/json;charset=UTF-8
             Body = {"age1_Long":1,"name":"goodgid","isConvert":null}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

### Comment

* 요청 Body는 String으로 요청을 보냈는데

* (= content(jsonString) )

* Controller에서는 Person1 객체로 받았다.

<br>

* 그 이유는 

* @RequestBody를 사용하면

* 요청 본문에 들어있는 메시지를

* **HttpMessageConverter**을 사용해서

* Conversion 해주기 때문이다.

<br>

* 그리고 Controller에 

* @RestController Annotation을 선언해주었기 때문에

* 자동으로 @ResponseBody Annotation이 선언되어있는 것과 같이 동작하게 되며 

* @ResponseBody Annotation에 의해

* 메소드의 Return Value를 

* 응답 본문(=Body)에 저장하게 된다.

<br>

* 응답 본문에 저장하는 과정은 

* @RequsetBody와 마찬가지로

* **HttpMessageConverter**를 사용하여

* 문자열로 Conversion 후

* 응답 본문(=Body)에 Write한다.

<br>

* 정리하자면

* HttpMessageConverter의 Conversion 작업에 의해

* Method Handler에 

* Return Type을 Person1 객체로 설정해주었지만

* Response Body에 문자열을 받을 수 있게 되는 것이다.

<br>

* 만약 @RestController가 아닌

* @Controller로 선언을 하고

* @ReponseBody Annotation 선언을 하지 않았다면

* TC는 실패하며

* Response는 다음과 같이 

* 빈 값의 Body가 오게된다.

``` java
MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Language:"en"]
     Content type = null
             Body = 
    Forwarded URL = request/body
   Redirected URL = null
          Cookies = []
```


## Summary

* @RequestBody, @ResponseBody

* 2가지 Annotation을 사용해봤다.

* 그리고 요청 본문을 읽어오거나

* 응답 본문을 작성할 때

* HttpMessageConverter에 의한

* Conversion이 이뤄짐을 알 수 있었다.