---
layout: post
title:  " SpringBoot 테스트 : 슬라이스(Slice) 테스트 - Scpoe을 제한하다. "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## Prologue

* SpringBoot에서 특정 Layer를 타켓으로 테스트가 가능하다.

* 특정 Layer만 테스트하기 때문에

  [@SpringBootTest]({{site.url}}/Spring-Test-SpringBootTest-Annotation/) 보다 효율적인 테스트가 가능하다.

---

## 슬라이스(Slice) 테스트

* 슬라이스(Slice) 테스트를 한다는 건

  특정 Layer를 타켓으로 테스트를 한다는 뜻이다.

  ex) Controller Layer, Service Layer

* 이 글에서는 Controller Layer를 타켓으로 

  슬라이스(Slice) 테스트하는 방법에 대해 알아본다.


---

## Controller를 테스트하다.

* Controller 테스트는 Service Layer 테스트와 다르다.

* Servce Layer 테스트는

  크게 3가지를 고려해서 진행하면 된다고 생각한다.

  Input / Output / Logic

* 하지만 Controller는 좀 더 고려해야 할 변수가 많다.

* Spring에서는 사용자의 요청이 

  Controller에 도달하기까지 매우 많은 작업이 이뤄진다.

  (Interceptor, Filter, Converter 등)

* 그러므로 Input / Output / Logic뿐만 아니라

  그 외에 작업들도 고려해야 한다.

* 즉 이런 작업들까지 다 적용이 되어야지 

  제대로 된 Controller 테스트라고 할 수 있다.

* 만약 Controller의 순수 코드만 테스트하는 건 
  
  Coverage를 채우기 위한 테스트이지

  테스트 본질과는 어긋나는 행위라고 생각한다.

* 그러므로 Controller를 제대로 테스트하고자 한다면

  Interceptor, Filter, Converter 등

  실제로 사용자의 요청이 Controller까지 들어오는 환경과 동일해야하며

  그 환경을 제공하는 **@WebMvcTest**를 사용해야 한다.

---

## @WebMvcTest

* @WebMvcTest를 선언하면 **Web과 관련된 Bean만** 주입이 된다.

> GoodGidControllerTest_WebMvc

``` java
@RunWith(SpringRunner.class)
@WebMvcTest(controllers = GoodGidController.class) // [1]
public class GoodGidControllerTest_WebMvc {

    @MockBean
    GoodGidService mockGoodGidService;

    @Autowired
    MockMvc mockMvc;

    @Test
    public void goodGid() throws Exception {
        when(mockGoodGidService.getName()).thenReturn("mock goodGid");

        mockMvc.perform(get("/"))
               .andExpect(status().isOk())
               .andExpect(content().string("Hello goodGid"));
    }
}
```

* [1] : @WebMvcTest에 타켓 Controller를 명시하였다.

  그리고 @WebMvcTest를 선언하였기 때문에 Web과 관련된 Bean만 등록된다.

* 그러므로 사용하는 의존성이 있다면 Mocking을 해줘야 한다.

  ex) Service, Repository

---

## Summary

* 이 글을 한마디로 정리하자면 다음과 같다.

* 만약 Controller를 테스트해야 한다면 @WebMvcTest를 사용하자.

---

## Reference

* [스프링 부트 개념과 활용 : 4부 스프링 부트 활용 - 테스트](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)