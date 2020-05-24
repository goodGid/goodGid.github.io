---
layout: post
title:  " Spring Controller에서 사용하는 Annotation 분석하기 : Multi @PathVariable "
categories: Spring
author: goodGid
---
* content
{:toc}

## Prologue

* @PathVariable Annotation을 사용하는

* 다양한 경우로 테스트를 진행하였다.

* 이 글에서는 @PathVariable를 2개 이상 사용하였을 경우를 살펴보고

* @PathVariable를 1개만 사용하는 경우는 

* [Spring Controller에서 사용하는 Annotation 분석하기 : Single @PathVariable]({{site.url}}/Spring-Controller-Annotation-Analytics-Single-PathVariable/)에서 알아본다.

<br>

* 각 테스트마다의 결합도는 낮다.

* 하지만 순서대로 보는걸 추천한다.

<br>

* 또한 각 테스트마다

* 어떤 이유로 

* 어떤 결과가 나왔는지 

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

> Person2 Converter

``` java
public class Person2Converter {

    @Component
    public static class StringToPersonConverter implements Converter<String, Person2> {
        @Override
        public Person2 convert(String s) {
            System.out.println("[Person`2` Converter] StringToPersonConverter Working");
            Person2 person2 = new Person2();
            person2.setIsConvert(true); // Converter 호출했음을 표기하기 위한 값 설정
            return person2;
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

    @GetMapping("/path/variable/{age}/{name}")
    public Person1 pathVariable_Age_Name(@PathVariable("age") Person1 person1,
                                         @PathVariable("name") Person1 person1_2) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());

        System.out.println("Person1_2.Age : " + person1_2.getAge1_Long());
        System.out.println("Person1_2.Name : " + person1_2.getName());
        System.out.println("Person1_2.IsConvert : " + person1_2.getIsConvert());
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
    public void pathVariable_Age_Name() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/path/variable/10/goodgid"))
               .andDo(print())
               .andExpect(status().isOk());
    }
}
```


#### Log

``` java
[Person`1` Converter] StringToPersonConverter Working
[Person`1` Converter] StringToPersonConverter Working
Person1.Age : null
Person1.Name : null
Person1.IsConvert : true
Person1_2.Age : null
Person1_2.Name : null
Person1_2.IsConvert : true

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /path/variable/10/goodgid
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

* Log를 보면 

* Person1 Converter가 2번 호출되었음을 알 수 있다.

``` java
[Person`1` Converter] StringToPersonConverter Working
[Person`1` Converter] StringToPersonConverter Working
Person1.IsConvert : true
Person1_2.IsConvert : true
```

* 그 이유에 대해 알아보자.

* Handler의 정의를 다시 보자.

``` java
@GetMapping("/path/variable/{age}/{name}")
public Person1 pathVariable_Age_Name(@PathVariable("age") Person1 person1,
                                     @PathVariable("name") Person1 person1_2)
```

* Person1 Type의

* Argument가 2번 선언되었다.

``` java
Person1 person1, Person1 person1_2
```

* 이렇게만 선언을 하였다고

* Converter가 호출되진 않는다.

* [Spring Controller에서 사용하는 Annotation 분석하기 : Single @PathVariable]({{site.url}}/Spring-Controller-Annotation-Analytics-Single-PathVariable/)글에서 

* [Case 3]({{site.url}}/Spring-Controller-Annotation-Analytics-Single-PathVariable/#case-3)을 이해했다면 이유를 알 수 있다.

<br>

* URL Path에 {age}가 

* @PathVariable의 Key값(="age")과 일치하기 때문에

* Spring은 Person1 객체로 

* 클라이언트의 요청 데이터를 

* Binding 하기 위해서 Converter를 호출하였다.

* name 또한 마찬가지로 Converter를 호출하게 된다.

* 그렇기 때문에

* 총 2번의 Person1 Converter가 호출되었다.






## Example

### Case 2

#### Controller

``` java
@RestController
public class SpringController {

   /**
    * Case 1
    */
    @GetMapping("/path/variable/{age}/{name}")
    public Person1 pathVariable_Age_Name(@PathVariable("age") Person1 person1,
                                         @PathVariable("name") Person1 person1_2) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());

        System.out.println("Person1_2.Age : " + person1_2.getAge1_Long());
        System.out.println("Person1_2.Name : " + person1_2.getName());
        System.out.println("Person1_2.IsConvert : " + person1_2.getIsConvert());
        return person1;
    }

    @GetMapping("/path/variable/{age}/{name}/model/attribute")
    public Person1 pathVariable_Age_Name_Model_Attribute(Person1 person1,
                                                         Person1 person1_2) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());

        System.out.println("Person1_2.Age : " + person1_2.getAge1_Long());
        System.out.println("Person1_2.Name : " + person1_2.getName());
        System.out.println("Person1_2.IsConvert : " + person1_2.getIsConvert());
        return person1;
    }
}
```

* Case 1과 같은 조건에서

* @PathVariable을 삭제해보자.

* 추가적으로 

* @PathVariable를 1개만 사용하였을 경우에 대해서도 살펴보자.

* 결과적으로는 1개나 2개나 같다.

* [Case : Single @PathVariable]({{site.url}}}}/Spring-Controller-Annotation-Analytics-Single-PathVariable/#case-2)


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
    public void pathVariable_Age_Name_Model_Attribute() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/path/variable/10/goodgid/model/attribute"))
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
Person1_2.Age : null
Person1_2.Name : goodgid
Person1_2.IsConvert : null

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /path/variable/10/goodgid/model/attribute
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

* Spring의 Data Binding 방식이

* Converter를 사용한 방법에서

* [@ModelAttribute]({{site.url}}/Spring-MVC-ModelAttribute/) 방법으로 변경되었다.

<br>

* 그 이유는 

* @PathVariable Annotation을 제거하였기 때문에

* Spring은 Default로 

* [@ModelAttribute]({{site.url}}/Spring-MVC-ModelAttribute/) 방법으로 

* Data Binding을 시도하기 때문이다.

<br>

* 그리고 이 경우엔

* URL Path로 들어온

* age와 name 값들을

* Person1 객체에서

* 동일한 필드명을 사용하는 경우

* Binding이 이뤄진다.

<br>

* 그런데 Person1 객체에는

* age라는 필드는 없기 때문에

* 요청으로 들어온 age 값은 사용이 되지 않고

* name 값은 Person1 객체에 필드명으로 사용되기 때문에

* name 값만 Binding이 된다.

<br>

* 그렇기 때문에 

* 다음과 같은 Log를 보게 되는 것이다.

``` java
Person1.Age : null
Person1.Name : goodgid
Person1.IsConvert : null
Person1_2.Age : null
Person1_2.Name : goodgid
Person1_2.IsConvert : null
```







## Example

### Case 3

#### Controller

``` java
@RestController
public class SpringController {

   /**
    * Case 2
    */
    @GetMapping("/path/variable/{age}/{name}/model/attribute")
    public Person1 pathVariable_Age_Name_Model_Attribute(Person1 person1,
                                                         Person1 person1_2) {
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());

        System.out.println("Person1_2.Age : " + person1_2.getAge1_Long());
        System.out.println("Person1_2.Name : " + person1_2.getName());
        System.out.println("Person1_2.IsConvert : " + person1_2.getIsConvert());
        return person1;
    }

    @GetMapping("/path/variable/{age1_Long}/{name}/model/attribute/2")
    public Person1 pathVariable_Age_Name_Model_Attribute(
                                                @PathVariable("age1_Long") Person1 person1,
                                                Person1 person1_2,
                                                Person2 person2) { // Person1에서 Person2로 변경
        System.out.println("Person1.Age : " + person1.getAge1_Long());
        System.out.println("Person1.Name : " + person1.getName());
        System.out.println("Person1.IsConvert : " + person1.getIsConvert());

        System.out.println("Person1_2.Age : " + person1_2.getAge1_Long());
        System.out.println("Person1_2.Name : " + person1_2.getName());
        System.out.println("Person1_2.IsConvert : " + person1_2.getIsConvert());

        System.out.println("Person2.Age : " + person2.getAge2_Long());
        System.out.println("Person2.Name : " + person2.getName());
        System.out.println("Person2.IsConvert : " + person2.getIsConvert());
        return person1;
    }
}
```

* Case 2와 같은 상황에서

* 3가지 변화를 주었다.

1. URL Path의 Key 값 변경 : age -> age1_Long

2. Handler의 1번째 Argument의 @PathVarable Annotation 추가

3. Handler의 3번째 Argument의 Type 변경 : Person1 -> Person2


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
    public void pathVariable_Age_Name_Model_Attribute_2() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/path/variable/10/goodgid/model/attribute/2"))
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
Person1_2.Age : 10
Person1_2.Name : goodgid
Person1_2.IsConvert : null
Person2.Age : null
Person2.Name : goodgid
Person2.IsConvert : null

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /path/variable/10/goodgid/model/attribute/2
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

* Case 2와 비교하여

* 3가지 변화를 주었다.

* 그 변화들로 인해 

* 각 Argument들이 

* 어떤 영향을 받았고

* 그로인해 어떤 결과가 나타났는지 알아보자.

<br>

> 1st Argument = @PathVariable("age1_Long") Person1 person1

* @PathVariable Annotation을 사용했기 때문에 

* Converter를 호출하게 된다.

<br>

* 그런데 Converter에서는 

* isConverter 값에 대해서만

* Data Binding이 이뤄지기 때문에

* 다른 필드에 대해서는 

* 클래스 필드의 Default 값으로 

* Handler에게 Return이 된다.

* 그렇기 때문에

* 다음과 같은 Log를 출력한다.

``` java
[Person`1` Converter] StringToPersonConverter Working
Person1.Age : null
Person1.Name : null
Person1.IsConvert : true
```

<br>

> 2st Argument = Person1 person1_2

* URL Path의 Key 값이 변경되면서

* @ModelAttribute 방법으로

* Data Binding이 이뤄질 때

* Key 값과 동일한 

* 필드명을 객체가 사용한다면

* 해당 필드의 값으로 Binding이 이뤄진다.

<br>

* age1_Long이라는 필드명을 사용하는 객체는 Person1이다.

* 그리고 Handler의 Arugment에서 

* Person1 객체 Type을 사용하는건 2개가 있다.

<br>

* 1번째 Argument에 대해 살펴보자.

* (= @PathVariable("age1_Long") Person1 person1)

<br>

* Handler의 1번째 Argument는 

* @PathVariable를 사용하였기 때문에

* Converter를 호출하게 된다.

<br>

* 그렇기 때문에

* @ModelAttribute 방법으로 

* Data Binding이 이뤄지지 않게 되며

* URL Path의 Key 값 변경에 대한 영향은 

* Converter를 통해 

* Data Binding을 하는 과정속에서는 무의미해진다.

<br>

* 2번째 Argument에 대해 살펴보자.

* (= Person1 person1_2)

<br>

* 2번째 Argument는 

* 순수하게 객체 Type 선언만 되어있다.

* 그렇기 때문에 

* @ModelAttribute 방법으로 

* Data Binding이 이뤄진다.

<br>

* 그리고 여기서 중요한 점은

* URL Path의 Key값과

* 동일한 필드명을 

* Argument의 Type이 사용을 해야하는데

<br>

* 2번째 Argument Type은 Person1이고

* 그 Person1에는

* age1_Long과 name이라는 

* 필드명을 사용하기 때문에

* Data Binding이 이뤄진다.

<br>

* 그렇기 때문에

* 다음과 같은 Log를 볼 수 있게 되는 것이다.

* 참고로 Converter를 호출하지 않았기 때문에

* isConverter 값은 null이다.

``` java
Person1_2.Age : 10
Person1_2.Name : goodgid
Person1_2.IsConvert : null
```

<br>

> 3st Argument = Person2 person2

* 2st Argumentv와의 차이점은

* 2st Argument Type은 Person1 이고

* 3st Argument Type은 Person2 이다.

<br>

* 2st Argument와 마찬가지로

* @ModelAttribute 방법으로

* Data Binding이 이뤄진다.

* 그러므로 URL Path의 Key값에 영향을 받게 된다.

<br>

* 그런데 Person2에는 

* name이라는 필드는 있지만

* age1_Long이라는 필드는 존재하지 않는다.

<br>

* 그렇기 때문에

* name 필드에 대해서만

* Data Binding이 이뤄지고

* 그 결과 다음과 같은 Log를 출력하게 된다.

``` java
Person2.Age : null
Person2.Name : goodgid
Person2.IsConvert : null
```

---

## Summary

* @PathVariable을 2개 이상 사용하는

* Example에 대해 알아봤다.

<br>

* 이정도의 예제와 Comment라면

* @PathVariable를 사용하는데 있어서

* 충분한 이해가 되지 않았을까 생각이 든다.

<br>

* 그럼에도 부족하다고 느끼거나

* 더 알고싶은 내용이 있다면

* 추가적으로 공부를 하거나

* 필자에게 물어봐주면 

* 대답을 주기 위해 글을 수정하도록 하겠다.


