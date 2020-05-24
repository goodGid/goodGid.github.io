---
layout: post
title:  " Spring Controller에서 사용하는 Annotation 분석하기 : @ModelAttribute "
categories: Spring
author: goodGid
---
* content
{:toc}

## [@ModelAttribute 개념]({{site.url}}/Spring-MVC-ModelAttribute/)

* Data Binding이 되는 

* 일련의 과정을 이해하기 위해서는

* 스프링이 제공해주는 

* [ModelAttribute 개념]({{site.url}}/Spring-MVC-ModelAttribute/)에 대해 이해해야한다.

* 여기서는 ModelAttribute 개념을 숙지했다는 전제하에 글을 이어나간다.








## Domain

> Person1

``` java
@Getter
@Setter
public class Person1 {
    private Long age1_Long; // Age를 뜻하는 필드

    private String name;
}
```


> Person2

``` java
@Getter
@Setter
public class Person2 {
    private Long age2_Long; // Age를 뜻하는 필드

    private String name;
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
}
```


> Person4

``` java
@Getter
@Setter
public class Person4 {
    private String age4_String; // Age를 뜻하는 필드

    private String name;
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
}
```

* Person5는 

* 다른 Person 도메인과 다르게

* 2가지 차이가 있다.

1. Person1에서 Age를 뜻하는 필드와 **동일한 필드명** 사용

2. name이 아닌 **nickName**을 사용

* 2가지 차이를 둔 이유에 대해서는

* 아래 Example을 통해 알아본다.


## Controller

``` java
@RestController
public class SpringController {

    @GetMapping("/model/attribute")
    public Person1 modelAttribute(Person1 person1,
                                  Person2 person2,
                                  Person3 person3,
                                  Person4 person4,
                                  Person5 person5) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());

        System.out.println("Person2.Age : " + person2.getAge2_Long());
        System.out.println("Person2.Name : " + person2.getName());

        System.out.println("Person3.Age : " + person3.getAge3_String());
        System.out.println("Person3.Name : " + person3.getName());

        System.out.println("Person4.Age : " + person4.getAge4_String());
        System.out.println("Person4.Name : " + person4.getName());

        /**
         * 요청 Param에
         * 'age1_Long' 값이 있기 때문에
         * Model Attribute에 의해
         * 자동으로 Data Binding이 이뤄진다.
         */
        System.out.println("Person5.Age : " + person5.getAge1_Long()); 
        System.out.println("Person5.NickName : " + person5.getNickName());

        return person1;
    }
}
```

## Example


### Case 1

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
    public void modelAttribute_QueryString() throws Exception {
        Person1 person1 = new Person1();
        person1.setAge1_Long(1L);
        person1.setName("goodgid");
        String jsonString = objectMapper.writeValueAsString(person1);

        mockMvc.perform(MockMvcRequestBuilders.get(
                "/model/attribute?name=goodgid&age1_Long=1&age2_Long=2")
                                              .contentType(MediaType.APPLICATION_JSON_UTF8)
                                              .accept(MediaType.APPLICATION_JSON_UTF8))
                                              // .content(jsonString) --> Body 보내지 않는다.
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string(jsonString));
    }
}
```

* content(jsonString) 코드를 사용하지 않는다.

* 즉 요청 본문에 데이터를 담아 보내는게 아니라 

* ModelAttribute 개념을 사용해 

* 요청한 데이터를 토대로 

* Person 객체를 생성하는 것을 확인하기 위해서이다.


#### Log

``` java
Person1.Age : 1
Person1.Name : goodgid

Person2.Age : 2
Person2.Name : goodgid

Person3.Age : null
Person3.Name : goodgid

Person4.Age : null
Person4.Name : goodgid

Person5.Age : 1
Person5.NickName : null

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /model/attribute

      // Body가 아닌 Parameters에 담겨서 요청이 전송된다.
       Parameters = {name=[goodgid], age1_Long=[1], age2_Long=[2]}

          Headers = [Content-Type:"application/json;charset=UTF-8", Accept:"application/json;charset=UTF-8"]
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json;charset=UTF-8"]
     Content type = application/json;charset=UTF-8
             Body = {"age1_Long":1,"name":"goodgid"}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```

#### Comment

* URL : **/model/attribute?name=goodgid&age1_Long=1&age2_Long=2**

* 요청을 보낼 때 

* Query String으로 Parameter을 지정하였다.

``` java
name = goodgid
age1_Long = 1
age2_Long = 2
```

* name은 Person 1~4에 해당하는 필드명

* age1_Long는 Person1의 필드명

* age2_Long은 Person2의 필드명

<br>

* 그렇기 때문에 

* Log를 보면

* name 필드명을 갖고 있는 

* Person 1~4 객체는 

* Data Binding이 되어 출력이 되고 

* Person5는 name 필드명이 아닌

* nickName 필드명을 갖고 있기 때문에

* 출력이 되지 않는다.

``` java
Person5.NickName : null
```

<br>

* 그리고

* age1_Long 필드명을 갖고 있는

* **Person1**과 **Person5**는 

* Age 출력이 되고

<br>

* age2_Long 필드명을 갖고 있는

* **Person2**도 

* Age 값 출력이 된다.







### Case 2

* Case 1에서

* Test Code는

* 요청 URL에 Query String으로 

* Parameter를 명시해줬다면

* Case 2에서는

* *.param( 'key', 'value' )* 방법으로 

* Test를 진행한다.

<br>

* 그런데 결과적으로는 같은 요청이다.

* *.param( 'key', 'value' )* 으로 설정을 해줘도

* 실제 요청 시에는 

* 그 값들이 Query String 처럼

* URL에서 **?** 뒤에 붙어서 요청이 가기 때문이다.

<br>

* 그럼에도 Case 2를 작성하는 이유는

* 이런식으로도 

* Test Code를 작성할 수 있음을 공유하고 싶었기 때문이다.

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
    public void modelAttribute_Param() throws Exception {
        Person1 person1 = new Person1();
        person1.setAge1_Long(1L);
        person1.setName("goodgid");
        String jsonString = objectMapper.writeValueAsString(person1);

        mockMvc.perform(MockMvcRequestBuilders.get("/model/attribute")
                                              .param("name", "goodgid")
                                              .param("age1_Long", "1")
                                              .param("age2_Long", "2")
                                              .param("age3_String", "3")
                                              .param("age4_String", "4")
                                              .contentType(MediaType.APPLICATION_JSON_UTF8)
                                              .accept(MediaType.APPLICATION_JSON_UTF8))
                                              // .content(jsonString) --> Body 보내지 않는다.
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string(jsonString));
    }
}
```

* Case 1 예제와 마찬가지로

* 요청 본문(=Body)에 데이터를 담지 않는다.


#### Log

``` java
Person1.Age : 1
Person1.Name : goodgid

Person2.Age : 2
Person2.Name : goodgid

Person3.Age : 3
Person3.Name : goodgid

Person4.Age : 4
Person4.Name : goodgid

Person5.Age : 1
Person5.NickName : null

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /model/attribute

      // Body가 아닌 Parameters에 담겨서 요청이 전송된다.
       Parameters = {name=[goodgid], age1_Long=[1], 
                     age2_Long=[2], age3_String=[3], age4_String=[4]}

          Headers = [Content-Type:"application/json;charset=UTF-8", Accept:"application/json;charset=UTF-8"]
             Body = null
    Session Attrs = {}

...

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = [Content-Type:"application/json;charset=UTF-8"]
     Content type = application/json;charset=UTF-8
             Body = {"age1_Long":1,"name":"goodgid"}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```



#### Comment

``` java
.param("name", "goodgid")
.param("age1_Long", "1")
.param("age2_Long", "2")
.param("age3_String", "3")
.param("age4_String", "4")
```

* Person 1~4의 Age에 해당하는 

* 각 필드들에 대한 값을 전달해주고 있다.

* // [Domain]({{site.url}}/Spring-Controller-Annotation-Analytics-Model-Attribute/#domain) 참고

* 그렇기 때문에 

* Log를 보면

* 모든 Age 값들이 출력된다.

<br>

* Case 1에서는

* Person1과 Perrson5에 해당하는 age1_Long과

* Person2에 해당하는 age2_Long Age 값만 넘겨줬다.

<br>

* 그리고 Person5를 제외한

* Person 1~4는

* name 필드를 갖고 있기 때문에

* 자동으로 Data가 Binding되어 

* 출력되는 것을 확인할 수 있다.






## Summary

* ModelAttribute 개념은

* Controller 클래스 안에서

* Handler에 정의되어 있는

* Arguments들에 대해서 

``` java
ex)
Person1 person1
Person2 person2
Person3 person3
Person4 person4
Person5 person5
```

* 요청으로 받은 Key 값과

``` java
ex) .param("name", "goodgid")
```

* 동일한 필드명을 갖고 있는

* 객체에 대해서는 

* 자동으로 Data를 Binding 해주는 것을 알 수 있었다.

