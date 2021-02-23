---
layout: post
title:  " Spring Boot @Async 동작 원리 : @Async를 선언했는데 왜 Async로 동작하지 않을까? "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## Prologue

* 이번 글에서는 

  @Async로 method를 선언했지만
  
  Async로 동작하지 않는 이유에 대해 알아본다.


---

## @Async

> AsyncCaller

``` java
@Component
@EnableAsync
public class AsyncCaller {

    @Autowired
    AsyncMailTrigger asyncMailTrigger;

    public void rightWayToCall() {
        System.out.println("[rightWayToCall] Thread Name :: " + Thread.currentThread().getName());
        asyncMailTrigger.sendMail();
    }

    public void wrongWayToCall() {
        System.out.println("[wrongWayToCall] Thread Name :: " + Thread.currentThread().getName());
        AsyncMailTrigger asyncMailTriggerObject = new AsyncMailTrigger(); // [1]
        asyncMailTriggerObject.sendMail();
    }
}
```

> AsyncMailTrigger

``` java
@Component
public class AsyncMailTrigger {
    @Async
    public void sendMail() {
        System.out.println("[sendMail] Thread Name :: " + Thread.currentThread().getName());
    }
}
```


> Output

``` java
// rightWayToCall( ) 호출 시
[rightWayToCall] Thread Name :: http-nio-8080-exec-2
[sendMail]       Thread Name :: task-2

// wrongWayToCall( ) 호출 시
[wrongWayToCall] Thread Name :: http-nio-8080-exec-2
[sendMail]       Thread Name :: http-nio-8080-exec-2
```

* rightWayToCall( ) method는 **다른** Thread가 처리하지만

  wrongWayToCall( ) method는 **동일한** Thread가 처리한다.

* 그 [이유](https://dzone.com/articles/effective-advice-on-spring-async-part-1)는 다음과 같다.

```
Here I created two methods 
rightWayToCall( ) used the @Autowired version of AsyncMailtrigger 
which will be picked by @ComponentScan

but in a wrongWayToCall( )
I create the object in local (= [1])
so it will not be picked up by @ComponentScan
it will not spawn a new thread 
and will be executed inside the main thread.
```





---

## 같은 클래스에서 @Async 호출하기

> AsyncCallers

``` java
@Component
@EnableAsync
public class AsyncCaller {

    public void wrongWayToCallInSameClass() {
        System.out.println("[wrongWayToCallInSameClass] Thread Name :: " + Thread.currentThread().getName());
        sendMailInSameClass();
    }

    @Async
    public void sendMailInSameClass() {
        System.out.println("[sendMailInSameClass] Thread Name :: " + Thread.currentThread().getName());
    }
}
```

> Output

``` java
[wrongWayToCallInSameClass] Thread Name :: http-nio-8080-exec-1
[sendMailInSameClass]       Thread Name :: http-nio-8080-exec-1
```

* 같은 클래스에서 @Async method를 호출하면

  Async 하게 동작하기를 기대했지만 그렇지 않다.

* 그 [이유](https://dzone.com/articles/effective-advice-on-spring-async-part-1)는 다음과 같다.

```
Never write an Async method in the same class 
where the caller method invokes the same Async methodAsync method 
in the same class where the caller method invokes the same Async method. 

So, always remember that 
when using this reference
Async does not work.

Because although it creates a proxy
the call bypasses the proxy 
and directly call the method 
so that Thread will not be spawned. 

This will prevent the developer from having the wrong assumption 
that it will work in an Async fashion. 

Most developers carelessly implement Async in this way, 
so be very careful when writing the Async caller method. 

It should be in different class when calling the Async method.
```

![](/assets/img/spring/SpringBoot-Why-doesn't-it-work-with-Async_1.png)

* 위 답변과 필자가 알고 있는 개념을 통해 정리하자면 다음과 같다.

  ( 참고로 틀릴 수 있습니다. )

  ( 그러니 잘못된 부분이 있으면 꼭 피드백 부탁드립니다 ! )

* 기본적으로 Async하게 동작하기 위해선 Spring의 도움이 필요하다.

* 만약 Async하게 동작하기를 희망하는 요청이 있다면

  그 요청을 처리할 수 있는 Bean을

  Spring이 중간에 Proxy 객체로 Wrapping 하여 Async로 동작할 수 있게 도와준다.

* 하지만 Spring Container에 있는 Bean을 사용하지 않거나

  (= new AsyncMailTrigger( ) )

  Direct로 접근하게 되면

  (= sendMailInSameClass( ) )

  Spring의 도움을 받을 수 없으므로 Async하게도 동작할 수 없게 된다.

```
Because although it creates a proxy
the call bypasses the proxy 
and directly call the method 
so that Thread will not be spawned. 
```


---

## Summary

> Q. 같은 클래스에서 호출하면 왜 Async 하게 동작하지 않는가?

* Spring이 생성해주는 **Proxy** 를 사용하지 않기 때문이다. 라고 대답할 수 있겠다.

---

## Reference

* [Effective Advice on Spring Async: Part 1](https://dzone.com/articles/effective-advice-on-spring-async-part-1)

* [How does @Async work? @Async를 지금까지 잘 못 쓰고 있었습니다(@Async 사용할 때 주의해야 할 것, 사용법)](https://jeong-pro.tistory.com/187)