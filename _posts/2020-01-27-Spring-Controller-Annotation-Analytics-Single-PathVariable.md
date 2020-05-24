---
layout: post
title:  " Spring Controller에서 사용하는 Annotation 분석하기 : Single @PathVariable "
categories: Spring
author: goodGid
---
* content
{:toc}

## Prologue

* @PathVariable Annotation을 사용하는

* 다양한 경우로 테스트를 진행하였다.

* 이 글에서는 @PathVariable를 1개만 사용하였을 경우를 살펴보고

* @PathVariable를 2개 이상 사용하는 경우에 대해서는

* [Spring Controller에서 사용하는 Annotation 분석하기 : Multi @PathVariable]({{site.url}}/Spring-Controller-Annotation-Analytics-Multi-PathVariable/)에서 알아본다.

<br>

* 각 테스트마다의 연관성은 낮다.

* 하지만 순서대로 보는걸 추천한다.

<br>

* 또한 각 테스트마다

* 어떤 이유로 

* 그러한 결과가 나왔는지 

* 반드시 이해하고

* 이해가 가지 않는다면 직접 테스트해보길 추천한다.

<br>

* 필자는 다양한 경우에 대해

* 경우의 수를 생각하면서

* 테스트를 진행하였고

* 그 내용을 정리하여 공유하고 싶은 마음에

* 오랜 시간을 할애하여 글을 작성하였다.

* 누군가에겐 도움이 되길 바란다.










## Domain

> Person1

``` java
@Getter
@Setter
public class Person1 {
    private Long age1_Long; // Age를 뜻하는 필드

    private String name;

    private Boolean isConvert;
}
```


> Person2

``` java
@Getter
@Setter
public class Person2 {
    private Long age2_Long; // Age를 뜻하는 필드

    private String name;

    private Boolean isConvert;
}
```

* Person1과 Person2의 차이
    
    - Age를 뜻하는 필드의

    - Type은 같지만 필드명이 다름


> Person3

``` java
@Getter
@Setter
public class Person3 {
    private String age3_String; // Age를 뜻하는 필드

    private String name;

    private Boolean isConvert;
}
```


> Person4

``` java
@Getter
@Setter
public class Person4 {
    private String age4_String; // Age를 뜻하는 필드

    private String name;

    private Boolean isConvert;
}
```

* Person3과 Person4의 차이

    - Age를 뜻하는 필드의

    - Type은 같지만 필드명이 다름


> Person5

``` java
@Getter
@Setter
public class Person5 {
    private Long age1_Long;

    private String nickName;

    private Boolean isConvert;
}
```

* Person5는 

* 다른 Person 도메인과 다르게

* 2가지 차이가 있다.

1. Person1에서 Age를 뜻하는 필드와 **동일한 필드명** 사용

2. name이 아닌 **nickName**을 사용

* 2가지 차이를 둔 이유에 대해서는

* 아래 Example을 통해 알아본다.




> Domain Summary

* (Person1, Person2)과 (Person3, Person4)의 차이

    - Age를 뜻하는 필드의 Type

    - Person1, Person2 ==> Long

    - Person3, Person4 ==> String



## Converter

> Person1 Converter

``` java
public class Person1Converter {

    @Component
    public static class StringToPersonConverter implements Converter<String, Person1> {
        @Override
        public Person1 convert(String s) {
            System.out.println("[Person`1` Converter] StringToPersonConverter Working");
            Person1 person1 = new Person1();
            person1.setIsConvert(true); // Converter 호출했음을 표기하기 위한 값 설정
            return person1;
        }
    }
}
```









## Example

### Case 1

#### Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/path/variable/{name}")
    public Person1 pathVariable_Name(@PathVariable("name") Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }
}
```

#### Test Code

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
    public void pathVariable_Name() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/path/variable/goodgid"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```

#### Log

``` java
[Person`1` Converter] StringToPersonConverter Working
Person1.Age : null
Person1.Name : null
Person1.IsConvert : true

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /path/variable/goodgid
       Parameters = {}
          Headers = []
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json"]
     Content type = application/json
             Body = {"age1_Long":null,"name":null,"isConvert":true}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

#### Comment

* Log를 통해 

* Converter가 동작함을 확인 할 수 있다.

``` java
[Person`1` Converter] StringToPersonConverter Working
Person1.IsConvert : true
```

* 그런데 

* Converter에서 값을 세팅해주지 않았기 때문에

* age1_Long과 name에는 null이 담겨온다.

<br>

* 이걸로 알 수 있는 점은

* Converter를 사용한다면

* Converter 안에서 

* 객체의 필드 값을 세팅해주는 작업이 필요하다는 점이다.

<br>

* 하지만 Converter같은 경우엔

* 1개의 Type만을 받을 수 있다.

``` java
@FunctionalInterface
public interface Converter<S, T> {

	/**
	 * Convert the source object of type {@code S} to target type {@code T}.
	 * @param source the source object to convert, which must be an instance of {@code S} (never {@code null})
	 * @return the converted object, which must be an instance of {@code T} (potentially {@code null})
	 * @throws IllegalArgumentException if the source cannot be converted to the desired target type
	 */
	@Nullable
	T convert(S source);

}
```

``` java
/***
* StringToPersonConverter 같은 경우엔 
* String Type만 받는다.
*/
@Component
public static class StringToPersonConverter implements Converter<String, Person1> {
    @Override
    public Person1 convert(String s) {
        ...
        return person1;
    }
}
```

* 그렇기 때문에

* 다양한 Type으로 

* 객체를 생성할 필요가 있다면 

* Converter가 아닌

* [@ModelAttribute Annotation]({{site.url}}/Spring-MVC-ModelAttribute/)을 사용해야한다.














### Case 2


#### Controller

``` java
@RestController
public class SpringController {

    /**
     * Case 1
     */
    @GetMapping("/path/variable/{name}")
    public Person1 pathVariable_Name(@PathVariable("name") Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }

    /**
     * Case 2
     * @PathVariable 어노테이션 선언 삭제
     */
    @GetMapping("/path/variable/{name}/model/attribute")
    public Person1 pathVariable_Name_Model_Attribute(Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }
}
```

* Case 1과 같은 조건에서

* @PathVariable을 삭제해보자.


#### Test Code

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
    public void pathVariable_Name_Model_Attribute() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/path/variable/goodgid/model/attribute"))
           .andDo(print())
           .andExpect(status().isOk());
    }
}
```

#### Log

``` java
Person1.Age : null
Person1.Name : goodgid
Person1.IsConvert : null

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /path/variable/goodgid/model/attribute
       Parameters = {}
          Headers = []
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json"]
     Content type = application/json
             Body = {"age1_Long":null,"name":"goodgid","isConvert":null}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

#### Comment

* 이번 경우엔 

* Person1 Converter가 사용되지 않았다.

<br>

* 대신에 ModelAttribute에 의해서

* Person1 객체에 Data Binding이 이뤄졌다.

* URL Path에 {name}를 사용하였고

```java
"/path/variable/{name}/model/attribute"
```

* Person1 클래스에 

* name이라는 필드가 있기 때문에

``` java
private String name;
```

* Data Binding이 되었다.

<br>

* 여기서 알 수 있는 점은

* @PathVariable를 사용해야 

* Converter가 호출된다는 점이다.




### Case 3

#### Controller

``` java
@RestController
public class SpringController {

    /**
     * Case 1
     */
    @GetMapping("/path/variable/{name}")
    public Person1 pathVariable_Name(@PathVariable("name") Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }

    @GetMapping("/path/variable/2/{name2}")
    public Person1 pathVariable_Name2(@PathVariable("name2") Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }
}
```

* Case 1과 같은 환경에서

* 변수명만 변경하여 테스트를 진행한다.

* name -> name2



#### Test Code

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
    public void pathVariable_Name2() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/path/variable/2/goodgid"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```

#### Log

``` java
[Person`1` Converter] StringToPersonConverter Working
Person1.Age : null
Person1.Name : null
Person1.IsConvert : true

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /path/variable/2/goodgid
       Parameters = {}
          Headers = []
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json"]
     Content type = application/json
             Body = {"age1_Long":null,"name":null,"isConvert":true}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

#### Comment

* Case 1과 마찬가지로

* Log를 보면 Converter 호출이 되었음을 알 수 있다.

``` java
[Person`1` Converter] StringToPersonConverter Working
Person1.IsConvert : true
```

<br>

* 또한 Case 1과 동일하게 

* Converter에서 Data Binding 작업이 이뤄지지 않았기 때문에

* Person1 객체에는

* Data Binding은 되지 않았다.

``` java
Body = {"age1_Long":null,"name":null,"isConvert":true}
```

<br>

* 이 테스트를 통해 확인하고 싶었던 점은

* **URL Path에 있는 값**과 

* ( = name2 )

``` java
@GetMapping("/path/variable/2/{name2}") // {name2}
```

* Handelr Argument에 있는 

* **@PathVariable Annotation의 Key값**과

* ( = @PathVariable("name2") --> 여기서 Key 값으로 지정한 "name2" )

``` java
@PathVariable("name2")
```

* **Arguemnts에 Object**의 관계를 알고 싶었다.

``` java
Person1 person1
```
<br>

* 그 결과는 다음과 같다.

* URL Path에 있는 값과 

* @PathVarialbe의 Key 값은 상관 관계가 있다.

<br>

* URL Path와 Key 값이 같았기 때문에 

* Converter가 호출되었다.

* 만약 Controller를 다음과 같이 수정 후 

``` java
@GetMapping("/path/variable/2/{name2}")
public Person1 pathVariable_Name2(@PathVariable("name3") Person1 person1) {
```

* 다시 Test Code를 실행할 경우

* 다음과 같은 Error Log를 볼 수 있다.

``` java
2020-01-27 15:26:48.761  WARN 34819 --- [        main] .w.s.m.s.DefaultHandlerExceptionResolver : 
Resolved [org.springframework.web.bind.MissingPathVariableException: 
Missing URI template variable 'name3' for method parameter of type Person1]
```

<br>

* 그리고 다음으로 알 수 있었던 점은

* **Handler Argument**의 Type은 

* (= Handler Argument = Person1)

* **URL Path**와 **@PathVariable의 Key 값**과

* 관련이 없음을 알 수 있었다.

<br>

* Case 3를 정리해보자.

* Case 3의 Controller에서는

* @PathVariable Annotation을 사용하였기 때문에

* Model Attribute 방법으로 Data Binding이 이뤄지지 않았고

* 대신에 Converter가 호출되었다.

<br>

* 그리고 

* URL Path / @PathVariable의 Key 값 / Handler Argument Type 간의

* 상관 관계에 대해서도 알아보았다.







### Case 4


#### Controller

``` java
@RestController
public class SpringController {

    /**
     * Case 3
     */
    @GetMapping("/path/variable/2/{name2}")
    public Person1 pathVariable_Name2(@PathVariable("name2") Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }

    /**
     * Case 4
     */
    @GetMapping("/path/variable/2/{name2}/model/attribute")
    public Person1 pathVariable_Name2_Model_Attribute(Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }
}
```

* Case 3과 같은 조건에서

* @PathVariable을 삭제해보자.


#### Test Code

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
    public void pathVariable_Name2_Model_Attribute() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/path/variable/2/goodgid/model/attribute"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```

#### Log

``` java
Person1.Age : null
Person1.Name : null
Person1.IsConvert : null

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /path/variable/2/goodgid/model/attribute
       Parameters = {}
          Headers = []
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json"]
     Content type = application/json
             Body = {"age1_Long":null,"name":null,"isConvert":null}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

#### Comment

* 우선 Case 4에서는

* @PathVariable Annotation을 사용하지 않았기 때문에

* Spring은 @ModelAttribute 방식으로 

* Data Binding을 시도하였다.

<br>

* 하지만 Person1 객체에는

* name2라는 필드가 없기 때문에

* Person1 객체에는 

* 어떠한 Data Binding이 이뤄지지 않았다.

* 이와 관련해서는 [Case 2]({{site.url}}/Spring-Controller-Annotation-Analytics-PathVariable/#comment-1)와 비교하여 살펴보자.

<br>

* 다음으로 알 수 있었던 점은

* @ModelAttribute 방식으로 

* Data Binding을 하였기 때문에

* Converter는 호출되지 않았다.

<br>

* 또한 이번 테스트를 통해 

* 알 수 있었던 흥미로웠던 점은

* Case 2와 같은 상황에서

* URL Path에

* name을 사용하느냐

* name2를 사용하느냐 차이에 따른 결과이다.

``` java
/**
* Case 2
*/
@GetMapping("/path/variable/{name}/model/attribute")
public Person1 pathVariable_Name_Model_Attribute(Person1 person1) {
    System.out.println("Person1.Age : " + person1.getAge1_Long());
    System.out.println("Person1.Name : " + person1.getName());
    System.out.println("Person1.IsConvert : " + person1.getIsConvert());
    return person1;
}

/**
* Case 4
*/
@GetMapping("/path/variable/2/{name2}/model/attribute")
public Person1 pathVariable_Name2_Model_Attribute(Person1 person1) {
    System.out.println("Person1.Age : " + person1.getAge1_Long());
    System.out.println("Person1.Name : " + person1.getName());
    System.out.println("Person1.IsConvert : " + person1.getIsConvert());
    return person1;
}
```

* 그리고 그 차이는

* Person1 객체에

* 정확히 일치하는 필드명이 있느냐의 유무에 따라

* Person1 객체에 Data Binding 결과에도 영향을 끼쳤다.

> 일치할 경우 : Person1 객체에 Data Binding 발생 O

> 일치하지 않을 경우 : Person1 객체에 Data Binding 발생 X

---

## Summary

* 이 글에서는 

* @PathVariable을 1개만 사용하는 경우에 대해서 알아보았다.

* 그리고 @PathVariable 유무에 따른

* Spring의 Data Binding 방법의 차이에 대해 알아보았다.

<br>

* 각 Test를 

* 꼼꼼히 살펴보면서

* 확실하게 이해하고

* 부족한 개념에 대해서는

* 추가적인 학습을 통해

* 보충하도록 하자.