---
layout: post
title:  " SpringBoot 테스트 : @SpringBootTest - 통합 테스트하다. "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## Prologue

* SpringBoot에서 테스트 시 사용되는 대표적인 방법들에 대해 알아보자.

---

## Index

1. [@SpringBootTest + WebEnvironment.MOCK + MockMvc]({{site.url}}/Spring/#webenvironmentmock--mockmvc)

2. [@SpringBootTest + WebEnvironment.RANDOM_PORT + RestTemplate]({{site.url}}/Spring/#webenvironmentrandom_port--resttemplate)

3. [@SpringBootTest + WebEnvironment.RANDOM_PORT + WebTestClient]({{site.url}}/Spring/#webenvironmentrandom_port--webtestclient)

* 위 순서로 3가지 방법에 대해 알아본다.



---

## Common

> Controller

``` java
@RestController
public class GoodGidController {

    @Autowired
    private GoodGidService goodGidService;

    @GetMapping("/")
    public String goodGid(){
        return "Hello " + goodGidService.getName();
    }
}
```

> Service

``` java
@Service
public class GoodGidService {

    public String getName(){
        return "goodGid";
    }
}
```

* 공통으로 사용되는 Controller와 Service이다.


---

## Controller Test

* Controller Test를 시작하기에 앞서

  @SpringBootTest 어노테이션을 선언하면 어떤 일이 일어나는지 알아보자.

* @SpringBootTest 어노테이션을 선언하면

  @SpringBootApplication를 찾아서 그 기준으로 Bean들을 등록시켜준다.

  그렇기 때문에 자동으로 Bean 주입이 가능해진다.

  물론 주입되는 Bean을 Mocking도 가능하다.

---

### WebEnvironment.MOCK + MockMvc

> GoodGidControllerTest

``` java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.MOCK) // [1]
@AutoConfigureMockMvc // [2]
public class GoodGidControllerTest_Mock {

    @Autowired
    MockMvc mockMvc; // [3]

    @Test
    public void goodGid() throws Exception {
        mockMvc.perform(get("/"))
               .andExpect(status().isOk())
               .andExpect(content().string("Hello goodGid"));
    }
}
```

* [1] : @SpringBootTest 어노테이션의 webEnvironment 기본값은 **WebEnvironment.MOCK**이다.

``` java
public @interface SpringBootTest {
    SpringBootTest.WebEnvironment webEnvironment() default SpringBootTest.WebEnvironment.MOCK;
}
```

* 그리고 webEnvironment를 Mock으로 설정하게 되면

  Servlet Container를 실제로 띄우지 않고 Mocking 하여 띄운다.

  그러므로 Mocking 된 Servlet Container와 
  
  Interaction를 하기 위해선 **MockMvc**(=[3]) 클라이언트를 사용해야 한다.

* [2] : @AutoConfigureMockMvc를 선언하면 MockMvc를 주입받을 수 있다.


    


---

### WebEnvironment.RANDOM_PORT + RestTemplate

> GoodGidControllerTest

``` java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT) // [1]
public class GoodGidControllerTest_Random_Port {

    @Autowired
    TestRestTemplate testRestTemplate; // [2]

    @MockBean // [3]
    GoodGidService mockGoodGidService;

    @Test
    public void goodGid() throws Exception {
        when(mockGoodGidService.getName()).thenReturn("mock goodGid");

        String result = testRestTemplate.getForObject("/", String.class);
        Assertions.assertThat(result).isEqualTo("Hello mock goodGid");
    }
}
```


* [1] : WebEnvironment.RANDOM_PORT를 사용하면 실제로 **내장 톰캣**이 뜬다.

  그래서 mockMvc가 아니라
  
  RestTemplate(=[2])을 사용하여 내장 톰캣과 Interaction 이 가능하다.

* [3] : 만약 해당 클래스의 목적이 Controller로 요청과 응답을 보기 위함이라면

  @MockBean 어노테이션을 사용하여 

  해당 Controller에서 사용하는 Bean을 Mocking 할 수 있다.


---


### WebEnvironment.RANDOM_PORT + WebTestClient


> GoodGidControllerTest

``` java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class GoodGidControllerTest_WebTestClient {

    @Autowired
    WebTestClient webTestClient; // [1]

    @MockBean
    GoodGidService mockGoodGidService;

    @Test
    public void goodGid() throws Exception {
        when(mockGoodGidService.getName()).thenReturn("mock goodGid");

        webTestClient.get().uri("/").exchange()
                     .expectStatus().isOk()
                     .expectBody(String.class).isEqualTo("Hello mock goodGid");
    }
}
```

* [1] : WebTestClient는 Java 5 Spring Webflux에 추가된 RestClient 중 하나다.

  Async라서 기존에 Sync로 동작하는 RestClient보다 성능적으로 좋다고 볼 수 있다.

* 사용하기 위해선 xml 혹은 gradle에 의존성을 추가해야한다.

``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```



---

## Summary

* @SpringBootTest를 사용한 테스트 방법에 대해 알아봤다.

* 정리하자면 @SpringBootTest 테스트는

  모든 Controller / Service 등등 
  
  특정 Layer를 구분 짓지 않고 Bean 주입을 하는 **통합 테스트**이다.

  그렇기 때문에 @SpringBootTest는 굉장히 **Cost**가 큰 테스트이다.

* 만약 특정 Layer만 테스트하는게 목표라면 

  테스트 Scpoe을 제한하는 **[슬라이싱 테스트]({{site.url}}/Spring-Test-Slice-Test/)**를 통해

  @SpringBootTest보다 효율적으로 테스트를 진행하는게 좋다.

* 추가적으로 RestTemplate과 WebClient로 동일한 요청을 하였을 경우

  어떤 차이를 보이는지 알고 싶다면 [Spring Rest 클라이언트(Client) : RestTemplate과 WebClient]({{site.url}}/Spring-Rest-Client-RestTemplate-And-WebClient) 글을 참고하자.

  
  
---

## Reference

* [스프링 부트 개념과 활용 : 4부 스프링 부트 활용 - 테스트](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)