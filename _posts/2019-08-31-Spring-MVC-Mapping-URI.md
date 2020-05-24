---
layout: post
title:  " Spring MVC - URI 패턴 맵핑하기 "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

* @RequestMapping은 다음의 패턴을 지원한다.

```
- ? : 한 글자 (“/author/???” => “/author/123”)
- * : 여러 글자 (“/author/*” => “/author/goodgid)
- ** : 여러 패스 (“/author/** => “/author/goodgid/book”)
```















## ? : 한글 자

* **?**는 랜덤한 한 글자를 허용한다.

* 0글자도 아니고 2글자도 아니고

* **Only 1글자만** 허용한다.


``` java
@GetMapping("/hello?")
@ResponseBody
public String hello() {
    return "hello";
}
```


``` java
public class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;

    // Test Fail
    // MockHttpServletResponse:
    // Status = 404
    // --> 핸들러는 hello1 or hello2와 같은 매핑을 원하는데
    // --> hello라는 요청은 조건에 부합하지 않기 때문에 에러가 발생한다.
    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }
    
    // Test Success
    // MockHttpServletResponse:
    // Status = 200
    // hello + ? 라는 조건을 만족하기 때문에 
    // 요청이 성공한다.
    @Test
    public void helloTest_1() throws Exception {
        mockMvc.perform(get("/hello1"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }

    // Test Success
    // MockHttpServletResponse:
    // Status = 404
    // hello + ? 라는 조건은 한 글자만 허용하기 때문에 테스트는 실패한다.
    @Test
    public void helloTest_2() throws Exception {
        mockMvc.perform(get("/hello1234567890"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }
    
}
```


* 만약 핸들러를 다음과 같이 수정한다면 

``` java
@GetMapping("/hello/?")
@ResponseBody
public String hello() {
    return "hello";
}
```

* **helloTest_1()**는 실패를 하게 된다.


``` java
    // Test Fail
    // MockHttpServletResponse:
    // Status = 404
    // --> hello/1 와같은 Format으로 요청을 해야한다.
    @Test
    public void helloTest_1() throws Exception {
        mockMvc.perform(get("/hello1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("hello"));
    }

    // Test Success
    // MockHttpServletResponse:
    // Status = 200
    @Test
    public void helloTest_2() throws Exception {
        mockMvc.perform(get("/hello/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("hello"));
    }    
```






---

## * : 여러 글자

* 애스터리스크(ASTERISK) = `*`는 여러 글자를 허용한다는 뜻이다.

* 여러 글자라는건 **무조건적인 허용**이라고 생각하면 된다.

* 1글자만 있어도 되고 

* 2글자 이상 있어도 되고 <

* 없어도 된다.

``` java
@GetMapping("/hello*")
@ResponseBody
public String hello() {
    return "hello";
}
```

``` java
    // Test Success
    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }

    // Test Success
    @Test
    public void helloTest_1() throws Exception {
        mockMvc.perform(get("/hello1"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }

    // Test Success
    @Test
    public void helloTest_2() throws Exception {
        mockMvc.perform(get("/hello1234567890"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }

```


---

## ** : 여러 패스

* 연결된 패스를 허용한다.

``` java
@GetMapping("/hello/**")
@ResponseBody
public String hello() {
    return "hello";
}
```


``` java
    // Test Success
    // '/hello/**'에서 
    // 우선 '/hello'라는 조건을 충족했고
    // 그다음엔 있어도 되고 없어도 되기 때문에 테스트는 성공한다.
    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }

    // Test Fail
    // '/hello1'이라는 URI 요청을 했기 때문에
    // '/hello'라는 조건을 충족시키지 못했다.
    // 그러므로 테스트는 실패한다.
    @Test
    public void helloTest_1() throws Exception {
        mockMvc.perform(get("/hello1"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }

    // Test Success
    // '/hello/**'에서 
    // 우선 '/hello'라는 조건을 충족했고
    // 그다음엔 있어도 되고 없어도 되는데 
    // 있기 때문에 테스트는 성공한다.
    @Test
    public void helloTest_2() throws Exception {
        mockMvc.perform(get("/hello/1234567890/0987654321"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }


    // Test Success
    // '/hello/**'에서 
    // 우선 '/hello'라는 조건을 충족했고
    // 그다음엔 있어도 되고 없어도 되는데 
    // 있기 때문에 테스트는 성공한다.
    // 이 때 Path는 여러 개 허용하기 때문에
    // helloTest_2()와 같이 테스트는 성공한다.
    @Test
    public void helloTest_3() throws Exception {
        mockMvc.perform(get("/hello/1234567890/0987654321/1234567890"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }
```

---

## @RequestMapping의 조합

* 클래스에 선언한 @RequestMapping과 <br> 핸들러에서 선언한 @RequestMapping를 조합하여 사용할 수 있다.


``` java
@Controller
@RequestMapping(method = RequestMethod.GET, value = "/goodgid")
public class SampleController {

    @GetMapping("/hello/**")
    @ResponseBody
    public String hello() {
        return "hello";
    }
}
```

* TC(=Test Code)에 대한 자세한 설명은 생략한다.

* 위에 예시를 보면 충분히 이해할 수 있다고 생각한다.

``` java
    // Test Success
    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/goodgid/hello"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }

    // Test Fail
    @Test
    public void helloTest_1() throws Exception {
        mockMvc.perform(get("/goodgid/hello1"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }

    // Test Success
    @Test
    public void helloTest_2() throws Exception {
        mockMvc.perform(get("/goodgid/hello/1234567890/0987654321"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }

    // Test Success
    @Test
    public void helloTest_3() throws Exception {
        mockMvc.perform(get("/goodgid/hello/1234567890/0987654321/1234567890"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello"));
    }
```




---


## 정규표현식 매핑

* 정규표현식을 사용하여 매핑이 가능하다.

``` java
    @GetMapping("/{name:[a-z]+}")
    @ResponseBody
    public String hello(@PathVariable String name) {
        return "hello " + name;
    }
```

* @GetMapping("/{name:[a-z]+}") 라는 정규표현식이기 때문에

* 요청하는 URI에 a-z가 아닌 문자가 들어갈 경우 실패를 한다.
    
``` java
    // Test Succss
    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/gid"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello gid"));
    }

    // Test Fail
    @Test
    public void helloTest_1() throws Exception {
        mockMvc.perform(get("/gid123"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello gid123"));
    }

    // Test Fail
    @Test
    public void helloTest_2() throws Exception {
        mockMvc.perform(get("/123"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello 123"));
    }

    // Test Fail
    @Test
    public void helloTest_3() throws Exception {
        mockMvc.perform(get("/gid1"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello gid1"));
    }

```


---


## 패턴이 중복되는 경우

* 패턴이 중복이 되는 경우 더 정확한 패턴에 매핑이 된다.

``` java
@Controller
@RequestMapping("/hello")
public class SampleController {

    @GetMapping("/gid")
    @ResponseBody
    public String hello() {
        return "hello from hello()";
    }

    @GetMapping("/**")
    @ResponseBody
    public String hello2() {
        return "hello from hello2()";
    }
}
```

``` java
    // Test Success
    @Test
    public void helloTest() throws Exception {
        mockMvc.perform(get("/hello/gid"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello from hello()"));
    }

    // Test Fail
    @Test
    public void helloTest_1() throws Exception {
        mockMvc.perform(get("/hello/gid"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(content().string("hello from hello2()"));
    }
```

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

