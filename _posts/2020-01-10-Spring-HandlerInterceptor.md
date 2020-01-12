---
layout: post
title:  " Spring에서 Handler Interceptor 개념 및 구현해보기 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.


## 개념

* Interceptor는 

* 쉽게 말하면

* 2가지 역할을 해준다.

1. Handler에 요청을 전달하기 전/후로 **추가적인 작업**이 가능하다.

2. View 렌더링이 된 후 클라이언트에게 Reponse를 전달하기 전에 **추가적인 작업**이 가능하다.


## Servlet Filter와의 차이점

* Spring에는 Filter라는 개념이 존재한다.

* Filter 또한 Interceptor와 비슷한 역할을 한다.

<br>

* 이게 정답이다라고 할 순 없지만

* 필자가 생각하기에 

* 다음과 같은 차이가 있다 생각한다.


> 영향 범위 : Filter > Interceptor

![](/assets/img/spring/Spring-HandlerInterceptor_1.png)

* Filter가

* Handler Interceptor보다 

* 클라이언트의 요청을 

* 먼저 받아들인다.

<br>

* 그리고 Spring의 핵심 Servlet인

* DispactcherServlet으로 가게 된다.

<br>

* 그렇기 때문에

* Spring에 관련된 작업이 아닌

* Web과 관련된

* 전반적인 작업이 필요하다면
 
* Servlet Filter에 구현하는게 적합하다 생각한다.

### Example

> Questioon

* 만약 XSS 요청에 대한 

* Validate 작업을 진행한다면

* Interceptor와 Filter 중

* 어느 곳에 Validate를 진행할 것인가?

> Answer

* 특정 Handler에 대한 전처리 작업이라기 보다는

* Web에 대한 전반적인 부분에 대해

* Validate가 필요하기 때문에

* Filter에서 Validation을 진행한다.



## Handler Interceptor 동작 순서 

* Interceptor의 Process에 대해 알아보자.

```
1. preHandler
2. 요청 처리 
3. postHandler
4. View 렌더링
5. afterCompletion
``` 

> Step 1

* 요청을 처리할 Handler에 가기전에

* Interceptor의 preHandelr() 메소드가 호출된다.

> Step 2

* 요청을 처리할 수 있는 Handler가 

* 요청을 처리하고 

* retrun을 하게 되면

* Interceptor의 postHandler() 메소드가 호출된다.

> Step 3

* Interceptor의 posetHandler() 메소드에

* 정의된 모든 작업이 끝나면

* View를 렌더링한다.

> Step 4

* View 렌더링이 끝나면

* Interceptor의 afterCompletion() 메소드가 호출된다.

> Step 5

* Interceptor의 afterCompletion() 메소드에

* 정의된 모든 작업이 끝나면

* 클라이언트에게 최종적으로 

* Response를 전달한다.


### 2개 이상의 Interceptor일 경우

* 2개 이상의 Interceptor가 

* 등록이 되어있다는 가정하에 

* 요청이 들어오면 

* 어떤 순서로 

* Interceptor가 동작하는지 알아보자.

```
1-1. preHandler 1 
1-2. preHandler 2
2.   요청 처리 
3-1. postHandler 2
3-2. postHandler 1
4.   View 렌더링
5-1. afterCompletion 2
5-2. afterCompletion 1
```

* 전체적인 Process는 

* Interceptor가 1개일 경우와 동일하다.

<br>

* 차이점은 

* 각 Interceptor의 

* preHandler / postHandelr / afterCompletion 메소드가 호출되는 

* 타이밍이 다르다는 점이다.

<br>

* preHandler가 먼저 호출되면

* postHandelr / afterCompletion 메소드는 나중에 호출된다.



## Example Code

* 실제로 코드를 통해

* 위에서 학습한 개념을 확인해보자.

### Interceptor Code

* preHandler / postHandelr / afterCompletion 메소드마다

* Parameter가 다르다.

> GreetingInterceptor

``` java
public class GreetingInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Object handler) throws Exception {
        System.out.println("[1] GreetingInterceptor preHandle");
        return true;
    }

    @Override
    public void postHandle(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Object handler, 
        ModelAndView modelAndView) throws Exception {
            /***
            * View를 렌더링하기 전에 
            * postHandle 메소드가 호출된다.
            * 그렇기 때문에 
            * modelAndView 정보를 알 수 있다.
            * 특정 View에 modelAndView 값을 수정해야할 필요가 있다면
            * postHandle 메소드에서 작업이 이뤄지면 된다.
            */
        System.out.println("[1] GreetingInterceptor postHandle");
    }

    @Override
    public void afterCompletion(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Object handler,
        Exception ex) throws Exception {
            /***
            * 클라이언트에게 
            * 최종적으로 Response를 전달하기 전에
            * 호출되는 afterCompletion 메소드에는
            * Exception 정보가 담겨온다.
            * 그렇기 때문에 
            * afterCompletion 메소드에서는
            * response의 값을 Control 하거나
            * Exception 값에 따른 핸들링을 하면 된다.
            */
        System.out.println("[1] GreetingInterceptor afterCompletion");
    }
}
```

> GoodByeInterceptor

``` java
public class GoodByeInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Object handler) throws Exception {
        System.out.println("[2] GoodByeInterceptor preHandle");
        return true;
    }

    @Override
    public void postHandle(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Object handler,
        ModelAndView modelAndView) throws Exception {
        System.out.println("[2] GoodByeInterceptor postHandle");
    }

    @Override
    public void afterCompletion(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Object handler,
        Exception ex) throws Exception {
        System.out.println("[2] GoodByeInterceptor afterCompletion");
    }
}
```

### Controller

> SimpleController

``` java
@RestController
public class SimpleController {

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }
}
```

### Test Code

> SimpleControllerTest

``` java
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class SimpleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void hello() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.get("/hello"))
                .andDo(print())
                .andExpect(content().string("hello"));
    }
}
```


### Config

> WebConfig

``` java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        /**
         * 1. 등록된 순서대로 실행
         */
        registry.addInterceptor(new GreetingInterceptor());
        registry.addInterceptor(new GoodByeInterceptor());

        /***
         * ## Output
         * [1] GreetingInterceptor preHandle
         * [2] GoodByeInterceptor preHandle
         * [2] GoodByeInterceptor postHandle
         * [1] GreetingInterceptor postHandle
         * [2] GoodByeInterceptor afterCompletion
         * [1] GreetingInterceptor afterCompletion
         */

        /***
         * 2. Order 설정
         * order의 값이 낮을수록
         * 우선 순위가 높아진다.
         * = 먼저 호출된다.
         */
        registry.addInterceptor(new GreetingInterceptor()).order(0);
        registry.addInterceptor(new GoodByeInterceptor()).order(-1);

        /**
         * ## Output
         * [2] GoodByeInterceptor preHandle
         * [1] GreetingInterceptor preHandle
         * [1] GreetingInterceptor postHandle
         * [2] GoodByeInterceptor postHandle
         * [1] GreetingInterceptor afterCompletion
         * [2] GoodByeInterceptor afterCompletion
         */

        /***
         * 3. Pattern 명시
         */
        registry.addInterceptor(new GreetingInterceptor()).order(0);
        registry.addInterceptor(new GoodByeInterceptor())
                .addPathPatterns("/hi")
                .order(-1);
        /***
         * ## Output
         * [1] GreetingInterceptor preHandle
         * [1] GreetingInterceptor postHandle
         * [1] GreetingInterceptor afterCompletion
         */

    }
}
```

* Test Code를 실행시키면

* Interceptor가 실제로 

* 학습한대로 동작하는지 확인할 수 있다.


## Summary

* Interceptor의 개념을 알아봤다.

* 그리고 2개의 Interceptor를 등록한 후

* 실제로 TC를 실행시켜

* 어떤 순서로 동작하는지 알아봤다.

<br>

* 이 글에서는 

* preHandler / postHandelr / afterCompletion 메소드의

* 각 역할에 대해

* 깊게 다루진 않았다.

* 다른 자료를 참고해서 개념을 익혀두기로 하자.

<br>

* Interceptor와 Filter의 차이에 대해서도 

* 아주 간략하게 언급을 하고 지나쳤다.

* 이 부분에 대해서도

* 다른 자료를 참고해서 개념을 익혀두기로 하자.

---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

* [SPRING MVC REQUEST LIFE CYCLE](https://justforchangesake.wordpress.com/2014/05/07/spring-mvc-request-life-cycle/)