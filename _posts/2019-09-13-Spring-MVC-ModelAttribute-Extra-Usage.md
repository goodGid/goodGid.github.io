---
layout: post
title:  " Spring MVC - @ModelAttribute 애노테이션의 또 다른 사용법 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Model Attribute

* @Controller를 사용한 클래스에서 

* Model 정보를 초기화 할 때 사용한다.

---

## Example Code

* 2가지 예시 상황을 통해 

* ModelAttribute 속성에 대해 알아보자.

1. Key 세팅 순서에 따른 결과

2. Key 값의 대소문자 구분 유무










 
---

### 순서에 따른 결과

> Controller 

``` java
@Controller
@RequestMapping
public class SampleController {

    @ModelAttribute
    public void setCategories(Model model){
        System.out.println("Call setCategories()");
        model.addAttribute("categories", List.of("db","network","algorithm"));
        model.addAttribute("Language", List.of("java","c++"));
    }

    @ModelAttribute("Language")
    public List<String> setLanguage(Model model){
        System.out.println("Call setLanguage()");
        return List.of("java","c++","python");
    }

    @ModelAttribute("writer")
    public List<String> setWriter(Model model){
        System.out.println("Call setWriter");
        return List.of("goodgid","gid","kiyong");
    }

    @GetMapping("/events")
    public String hello(){
        return "hello";
    }
}
```

> Result 

``` java
Call setCategories()
Call setWriter

...

ModelAndView:
View name = hello
        View = null
Attribute = categories
    value = db,network,algorithm
Attribute = Language
    value = java,c++
Attribute = writer
    value = goodgid,gid,kiyong
```

* setLanguage()함수는

* 기존에 *Language* 라는 Key 값이 설정되어 있기 때문에

* setLanguage()자체가 실행되지 않는다.

---

> Controller

``` java
@Controller
@RequestMapping
public class SampleController {

    @ModelAttribute("Language")
    public List<String> setLanguage(Model model){
        System.out.println("Call setLanguage()");
        return List.of("java","c++","python");
    }

    @ModelAttribute
    public void setCategories(Model model){
        System.out.println("Call setCategories()");
        model.addAttribute("categories", List.of("db","network","algorithm"));
        model.addAttribute("Language", List.of("java","c++"));
    }

    @ModelAttribute("writer")
    public List<String> setWriter(Model model){
        System.out.println("Call setWriter");
        return List.of("goodgid","gid","kiyong");
    }

    @GetMapping("/events")
    public String hello(){
        return "hello";
    }
}
```

> Result

``` java
Call setLanguage()
Call setCategories()
Call setWriter

...

ModelAndView:
View name = hello
        View = null
Attribute = Language
    value = java,c++
Attribute = categories
    value = db,network,algorithm
Attribute = writer
    value = goodgid,gid,kiyong
```


* setLanguage(), setCategories(), setWriter() 순서로

* 메소드가 실행된다.

* 그리고 **Language**라는 

* 같은 Key에 대해 

* 중복하여 세팅을 할 경우엔

* (= setLanguage() -> setCategories() 순서로 호출 )

* 나중에 세팅된 값으로 

* 세팅이 되는 결과를 확인할 수 있다.

``` java
Attribute = Language
    value = java,c++
```

---

### 대소문자 구분 유무

> Controller

``` java
@Controller
@RequestMapping
public class SampleController {

    @ModelAttribute
    public void setCategories(Model model){
        System.out.println("Call setCategories()");
        model.addAttribute("categories", List.of("db","network","algorithm"));
        model.addAttribute("Language", List.of("java","c++"));
    }

    @ModelAttribute("language") // 대소문자 구분한다.
    public List<String> setLanguage(Model model){
        System.out.println("Call setLanguage()");
        return List.of("java","c++","python");
    }

    @ModelAttribute("writer")
    public List<String> setWriter(Model model){
        System.out.println("Call setWriter");
        return List.of("goodgid","gid","kiyong");
    }

    @GetMapping("/events")
    public String hello(){
        return "hello";
    }
}
```

> Result

``` java
Call setCategories()
Call setLanguage()
Call setWriter

...

ModelAndView:
View name = hello
        View = null
Attribute = categories
    value = db,network,algorithm
Attribute = Language
    value = java,c++
Attribute = language
    value = java,c++,python
Attribute = writer
    value = goodgid,gid,kiyong
```

* setCategories(), setLanguage(), setWriter() 순서로

* Print가 된 것을 확인할 수 있다.

* 또한 *Language* 와 *language* 

* 각각 Key 값으로 

* Value가 설정되어 있음을 확인할 수 있다.

* 즉 **대소문자**를 구분하여 

* model에 값을 관리한다.


---

## Test Code

> Test Code

``` java
@RunWith(SpringRunner.class)
@WebMvcTest
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/events"))
               .andDo(print())
               .andExpect(model().attributeExists("categories"))
               .andExpect(model().attributeExists("Language"))
               .andExpect(model().attributeExists("writer"))
               .andExpect(status().isOk());
    }
}
```

* model안에 

* 특정 attribute 값이 존재하는지 확인하고 싶다면

* **model().attributeExists(" 찾고자 하는 Key 값 ")** 메소드를 사용하면 된다.

---

## 주의 사항

* 일반적으로

* 핸들러를 생성할 때

* View를 렌더링 할 목적의 핸들러가 아니라면

* 핸들러에 @ResponseBody를 사용하여

* 핸들러의 Return Type이 String일 경우에

* 그 Return Value가 View Name이 아니라

* Response Body에 담겨질 값임을 명시해준다.

<br>

* 그렇기 때문에

* 우리가 테스트하고자 상황

* (= Model에 Attrubute가 제대로 담겨져 있는가)를 

* 갖추기 위해서는 

* 핸들러에 @ResponseBody 애노테이션을

* 제거해줘야한다.

``` java
@ResponseBody 
```

* 그렇지 않으면 TC 자체가 실패를 하게 된다.



---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

