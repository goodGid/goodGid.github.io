---
layout: post
title:  " Spring Controller에서 사용하는 Annotation 분석하기 : @RequestParam "
categories: Spring
author: goodGid
---
* content
{:toc}

## Prologue

* @RequestParam을 사용하는 예제를 

* 다양한 경우의 수를 통해

* 분석해보고 이해해보자.










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

* @RequestParam을 사용하는 

* 다양한 Exapmle을 통해 

* 사용법을 분석해본다.

### Case 1

#### Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/request/param/age")
    public Person1 requestParam_Age(@RequestParam("age") Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }
}
```

#### 1. Test Code

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
    public void requestParam_Age___Param_Contains_age() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/request/param/age")
                                              .param("name", "goodgid")
                                              .param("age", "1"))
               .andDo(print())
               .andExpect(status().isOk());
    }  
}
```

#### 1. Log

``` java
[Person`1` Converter] StringToPersonConverter Working
Person1.Age : null
Person1.Name : null
Person1.IsConvert : true

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/param/age
       Parameters = {name=[goodgid], age=[1]}
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

#### 1. Comment

* Handler Argument에

* @RequestParam("age")가 선언이 되어있고

* 클라이언트 요청 param에

* **age**가 있기 때문에

* Converter가 동작한다.

<br>

* 그런데 흥미로운 점은

* Person1 객체에는

* **age**라는 필드는 없지만

* Converter가 호출된다는 점이다.

<br>

* 여기서 알 수 있는건

* Argument Type Class에 

* 필드값 존재 유무가 중요한게 아니라

* @RequestParam Annotation에서 

* 선언한 Key값과

* (= @RequestParam("age")에서 Key는 age)

* 클라이언트 요청에 담긴

* Param의 Key값이

* 일치한다면 

* Converter를 호출한다는 점이다.









#### 2. Test Code

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
    public void requestParam_Age___Param_Contains_age1_Long() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/request/param/age")
                                              .param("name", "goodgid")
                                              .param("age1_Long", "1"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```


#### 2. Log

``` java
2020-01-27 20:36:46.113  WARN 46660 --- [     main] .w.s.m.s.DefaultHandlerExceptionResolver : 
Resolved [org.springframework.web.bind.MissingServletRequestParameterException: 
Required Person1 parameter 'age' is not present]

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/param/age
       Parameters = {name=[goodgid], age1_Long=[1]}
          Headers = []
             Body = null
    Session Attrs = {}
...

MockHttpServletResponse:
           Status = 400
    Error message = Required Person1 parameter 'age' is not present
          Headers = []
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status expected:<200> but was:<400>
Expected :200
Actual   :400
```

#### 2. Comment

* Handler에서는 

* age라는 Key값의 

* Param을 기대한다.

<br>

* 하지만 

* age라는 key값이 없는 상태로

* 클라이언트는 요청을 한다.

<br>

* 그렇기 때문에 Exception이 발생한다.

* 그리고 이유가 발생하는 이유는 다음과 같다.

``` java
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequestParam {

	/**
	 * Whether the parameter is required.
	 * <p>Defaults to {@code true}, leading to an exception being thrown
	 * if the parameter is missing in the request. Switch this to
	 * {@code false} if you prefer a {@code null} value if the parameter is
	 * not present in the request.
	 * <p>Alternatively, provide a {@link #defaultValue}, which implicitly
	 * sets this flag to {@code false}.
	 */
	boolean required() default true;

}
```

* 기본적으로 required가 true이기 때문에

* Exception이 발생한다.

<br>

* 만약 required를 false로 

* 명시적 선언을 해준다면

* Exception은 발생하지 않는다.

``` java
public Person1 requestParam_Age(@RequestParam(value = "age", required = false) Person1 person1) {
```

* 하지만 person1에는 어떠한 값도

* Binding되어 있지 않기 때문에

* null인 상태가 된다.

![](/assets/img/spring/Spring-Controller-Annotation-Analytics-RequestParam_1.png)














### Case 2

#### Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/request/param/age1_Long")
    public Person1 requestParam_Age1_Long(@RequestParam("age1_Long") Person1 person1) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());
        return person1;
    }
}
```

#### 1. Test Code

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
    public void requestParam_Age1_Long___Param_Contains_age() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/request/param/age1_Long")
                                              .param("name", "goodgid")
                                              .param("age", "1"))
               .andDo(print())
               .andExpect(status().isOk());
    }

}
```

#### 1. Log

``` java
2020-02-02 20:37:27.964  WARN 19790 --- [      main] .w.s.m.s.DefaultHandlerExceptionResolver : 
Resolved [org.springframework.web.bind.MissingServletRequestParameterException: 
Required Person1 parameter 'age1_Long' is not present]

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/param/age1_Long
       Parameters = {name=[goodgid], age=[1]}
          Headers = []
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 400
    Error message = Required Person1 parameter 'age1_Long' is not present
          Headers = []
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []


java.lang.AssertionError: Status expected:<200> but was:<400>
Expected :200
Actual   :400
<Click to see difference>
```

#### 1. Comment

* [Case 1 -> Test Case 2st]({{site.url}}/Spring-Controller-Annotation-Analytics-RequestParam/#2-test-code)과 같은 원리로 

* 동일한 결과를 확인할 수 있다.

<br>

* Handler에서는 

* age1_Long라는 Key값의 

* Param을 기대한다.

<br>

* 하지만 

* age1_Long라는 key값이 없는 상태로

* 클라이언트는 요청을 한다.

* 그렇기 때문에 Exception이 발생한다.




#### 2. Test Code

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
    public void requestParam_Age1_Long___Param_Contains_age1_Long() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/request/param/age1_Long")
                                              .param("name", "goodgid")
                                              .param("age1_Long", "1"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```

#### 2. Log

``` java
[Person`1` Converter] StringToPersonConverter Working
Person1.Age : null
Person1.Name : null
Person1.IsConvert : true

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/param/age1_Long
       Parameters = {name=[goodgid], age1_Long=[1]}
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

#### 2. Comment

* Hnadler Argument에서

* age1_Long 값을 기대하고

* 클라이언트 요청에서

* Key값이 

* age1_Long인 

* Param을 보내기 때문에

* 테스트는 성공한다.













### Case 3

#### Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/request/param/age/not/converter")
    public Person3 requestParam_Age_Not_Converter(@RequestParam("age") Person3 person3) {
        System.out.println("Person3.Age : " + person3.getAge3_String());
        System.out.println("Person3.Name : " + person3.getName());
        System.out.println("Person3.IsConvert : " + person3.getIsConvert());
        return person3;
    }
}
```

* Argument Type의 변화가 있다.

* Person1 -> Person3

<br>

* 그런데 Person3을 

* Conversion할 수 있는

* Converter가 없는 상황이다.

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
    public void requestParam_Age_Not_Converter___Param_Contains_age() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/request/param/age/not/converter")
                                              .param("name", "goodgid")
                                              .param("age", "1"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```

#### Log

``` java
2020-02-02 20:54:09.601  WARN 20322 --- [      main] .w.s.m.s.DefaultHandlerExceptionResolver : 
Resolved [org.springframework.web.method.annotation.MethodArgumentConversionNotSupportedException:
Failed to convert value of type 'java.lang.String' to required type 'goodgid.gidhub.Person3'; 
nested exception is java.lang.IllegalStateException: 
Cannot convert value of type 'java.lang.String' to required type 'goodgid.gidhub.Person3': 
no matching editors or conversion strategy found]

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/param/age/not/converter
       Parameters = {name=[goodgid], age=[1]}
          Headers = []
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 500
    Error message = null
          Headers = []
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status expected:<200> but was:<500>
Expected :200
Actual   :500
<Click to see difference>
```

#### Comment

* Person3 Type으로

* Conversion 할 수 있는

* Converter가 없기 때문에

* Exception이 발생한다.

<br>

* 그리고 이 경우엔

* 클라이언트의 잘못이 아닌

* 서버의 잘못이기 때문에

* Response Status는 

* 500 서버 Error가 된다.
 















### Case 4

#### Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/request/param/age3_String/not/converter")
    public Person3 requestParam_Age1_Long_Not_Converter(@RequestParam("age3_String") Person3 person3) {
        System.out.println("Person3.Age : " + person3.getAge3_String());
        System.out.println("Person3.Name : " + person3.getName());
        System.out.println("Person3.IsConvert : " + person3.getIsConvert());
        return person3;
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
    public void requestParam_Age_Not_Converter___Param_Contains_age3_String() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/request/param/age1_Long/not/converter")
                                              .param("name", "goodgid")
                                              .param("age3_String", "3"))
               .andDo(print())
               .andExpect(status().isOk());
    }

}
```

#### Log

``` java
2020-02-02 21:12:45.971  WARN 20892 --- [        main] .w.s.m.s.DefaultHandlerExceptionResolver : 
Resolved [org.springframework.web.method.annotation.MethodArgumentConversionNotSupportedException:
Failed to convert value of type 'java.lang.String' to required type 'goodgid.gidhub.Person3';
nested exception is java.lang.IllegalStateException: 
Cannot convert value of type 'java.lang.String' to required type 'goodgid.gidhub.Person3': 
no matching editors or conversion strategy found]

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/param/age1_Long/not/converter
       Parameters = {name=[goodgid], age3_String=[3]}
          Headers = []
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 500
    Error message = null
          Headers = []
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

java.lang.AssertionError: Status expected:<200> but was:<500>
Expected :200
Actual   :500
<Click to see difference>
```

#### Comment

* 결과를 보면 

* [Case 3]({{site.url}}/Spring-Controller-Annotation-Analytics-RequestParam/#case-3)과 같다.

<br>

* Case 4에서 확인해 보고 싶었던 부분은

* Person3 Class에서 필드명과

* (= **private String age3_String** )

* 클라이언트 요청 Param의 Key값이 동일하다면

* [Case 3]({{site.url}}/Spring-Controller-Annotation-Analytics-RequestParam/#case-3)과 다른 결과가 나오지 않을까?란 궁금증이였다.

<br>

* 하지만 Case 4를 통해

* @RequestParam Annotation의 Key와

* (= **@RequestParam("age3_String"** )

* Argument Type Class에 필드명과의

* (= **private String age3_String** )

* 상관 관계는 없다는 점이다.







### Case 5

#### Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/request/param/not/request/param/annotation")
    public Person1 requestParam_Not_Request_Param_Annotation(Person1 person1) {
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
    public void requestParam_Not_Request_Param_Annotation___Param_Contains_ALL() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/request/param/not/request/param/annotation")
                                              .param("name", "goodgid")
                                              .param("age1_Long", "1")
                                              .param("age2_Long", "2")
                                              .param("age3_String", "3")
                                              .param("age4_String", "4"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```

#### Log

``` java
Person1.Age : 1
Person1.Name : goodgid
Person1.IsConvert : null

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/param/not/request/param/annotation
       Parameters = {name=[goodgid], age1_Long=[1], age2_Long=[2], age3_String=[3], age4_String=[4]}
          Headers = []
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json"]
     Content type = application/json
             Body = {"age1_Long":1,"name":"goodgid","isConvert":null}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

#### Comment

* @RequestParam Annotation이 없는 상황이다.

* 그렇기 때문에

* ModelAttribute 방법으로 

* Data Binding이 이뤄졌다.









### Case 6

#### Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/request/param/age1_Long/name")
    public Person1 requestParam_Age1_Long_Name(@RequestParam("age1_Long") Person1 person1,
                                               @RequestParam("name") Person1 person1_2,
                                               @RequestParam("name") Person2 person2,
                                               Person2 person2_2) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());

        System.out.println("Person1_2.Age : " + person1_2.getAge1_Long());
        System.out.println("Person1_2.Name : " + person1_2.getName());
        System.out.println("Person1_2.IsConvert : " + person1_2.getIsConvert());

        System.out.println("Person2.Age : " + person2.getAge2_Long());
        System.out.println("Person2.Name : " + person2.getName());
        System.out.println("Person2.IsConvert : " + person2.getIsConvert());

        System.out.println("Person2_2.Age : " + person2_2.getAge2_Long());
        System.out.println("Person2_2.Name : " + person2_2.getName());
        System.out.println("Person2_2.IsConvert : " + person2_2.getIsConvert());
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
    public void requestParam_Age_Not_Converter___Param_Contains_age1_Long() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/request/param/age1_Long/not/converter")
                                              .param("name", "goodgid")
                                              .param("age1_Long", "1"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```

#### Log

``` java
[Person`1` Converter] StringToPersonConverter Working
[Person`1` Converter] StringToPersonConverter Working
[Person`2` Converter] StringToPersonConverter Working
Person1.Age : null
Person1.Name : null
Person1.IsConvert : true
Person1_2.Age : null
Person1_2.Name : null
Person1_2.IsConvert : true
Person2.Age : null
Person2.Name : null
Person2.IsConvert : true
Person2_2.Age : 2
Person2_2.Name : goodgid
Person2_2.IsConvert : null

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/param/age1_Long/name
       Parameters = {name=[goodgid], age1_Long=[1], age2_Long=[2]}
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

``` java
public Person1 requestParam_Age1_Long_Name(@RequestParam("age1_Long") Person1 person1,
                                           @RequestParam("name") Person1 person1_2,
                                           @RequestParam("name") Person2 person2,
                                            Person2 person2_2) {
```

* Handler를 보면 

* 3개의 @RequestParam Annotation을 사용한 Arguments와

* @RequestParam Annotation을 사용하지 않은 Argument가 있다.

<br>

* 그리고 @RequestParam의 Key값은

* name과 age1_Long이다.

<br>

* 클라이언트 요청에 담겨있는

* Param에있는 Key값 또한

* name과 age1_Long이다.

<br>

* 그렇기 때문에

* 결과적으로 

* 3번의 Converter 호출이 이뤄진다.

* Person1 : 2번 / Person2 : 1번

<br>

* 그리고 @RequestParam Annotation을 사용하지 않은

* 4st Argument는 

* ModelAttribute 방식으로 

* Data Binding이 이뤄진다.

<br>

* 그렇기 때문에

* Log를 보면 

* Person2_2에 대해서는

* Age와 Name 값이 존재한다.

* 물론 Converter와 관련이 없기 때문에

* IsConvert 값은 null이다.

``` java
[Person`1` Converter] StringToPersonConverter Working
[Person`1` Converter] StringToPersonConverter Working
[Person`2` Converter] StringToPersonConverter Working
Person1.Age : null
Person1.Name : null
Person1.IsConvert : true
Person1_2.Age : null
Person1_2.Name : null
Person1_2.IsConvert : true
Person2.Age : null
Person2.Name : null
Person2.IsConvert : true
Person2_2.Age : 2
Person2_2.Name : goodgid
Person2_2.IsConvert : null
```






















### Case 7

#### Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/request/param/age1_Long/name/binding/result")
    public Person1 requestParam_Age1_Long_Name_Binding_Result(
                            @RequestParam("age1_Long") Person1 person1,
                            @RequestParam("name") Person2 person2,
                            @RequestParam("name") Person3 person3,
                            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(c -> {
                System.out.println(c);
            });
        }
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());

        System.out.println("Person2.Age : " + person2.getAge2_Long());
        System.out.println("Person2.Name : " + person2.getName());
        System.out.println("Person2.IsConvert : " + person2.getIsConvert());

        System.out.println("Person3.Age : " + person3.getAge3_String());
        System.out.println("Person3.Name : " + person3.getName());
        System.out.println("Person3.IsConvert : " + person3.getIsConvert());

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
    public void requestParam_Not_Request_Param_Annotation___Param_Contains_ALL() 
    throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/request/param/not/request/param/annotation")
                                              .param("name", "goodgid")
                                              .param("age1_Long", "1")
                                              .param("age2_Long", "2")
                                              .param("age3_String", "3")
                                              .param("age4_String", "4"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```

#### Log

``` java
[Person`1` Converter] StringToPersonConverter Working
[Person`2` Converter] StringToPersonConverter Working

2020-02-02 22:35:24.992  WARN 23513 --- [    main] .w.s.m.s.DefaultHandlerExceptionResolver : 
Resolved [org.springframework.web.method.annotation.MethodArgumentConversionNotSupportedException:
Failed to convert value of type 'java.lang.String' to required type 'goodgid.gidhub.Person3'; 
nested exception is java.lang.IllegalStateException: 
Cannot convert value of type 'java.lang.String' to required type 'goodgid.gidhub.Person3': 
no matching editors or conversion strategy found]

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /request/param/age1_Long/name/binding/result
       Parameters = {name=[goodgid], age1_Long=[1], age2_Long=[2]}
          Headers = []
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 500
    Error message = null
          Headers = []
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []


java.lang.AssertionError: Status expected:<200> but was:<500>
Expected :200
Actual   :500
<Click to see difference>
```

#### Comment

* **BindingResult bindingResult**을 선언하였고

* bindingResult에 Error가 담기지 않을까하는 궁금증으로

* 테스트를 진행하였다.

<br>

* 결과는 다음과 같았다.

* Log를 보면

* Person1과 Person2 Converter가 호출된 후 

* Person3 Converter를 호출하려고하는데

* 등록된 Converter가 없어

* Exception이 발생한다.

<br>

* 즉 bindingResult에 담기지 않았고

* Exception을 Throw하였다.



---

## Summary

* @RequestParam을 사용하는

* 다양한 예제를 통해 이해도를 높혔다.

<br>

* 추가적으로 더 궁금한 점이 있다면

* 반드시 학습을 하도록하자.

<br>

* 혹시 필자의 글이 틀리거나

* 궁금증이 있다면

* 연락을 주었으면 좋겠다.

<br>

* 끝으로

* 한 번에 다 보고 이해하기엔

* 다소 부담스러운 양이라고 생각한다.

<br>

* 그렇기 때문에

* 충분한 여유를 갖고 

* 글을 읽고

* 이해하며 확실하게 

* 학습하도록 하자.

