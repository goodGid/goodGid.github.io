---
layout: post
title:  " Spring 프레임워크 핵심 기술 - 프록시 AOP "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

* 이전에 작성한 [스프링 AOP : 적용하기]({{site.url}}/Spring-Framework-Apply-AOP/)글과 [스프링 AOP : 개념 소개]({{site.url}}/Spring-Framework-AOP-Concept/)글 이후에 작성된 글이다.





![](/assets/img/spring/spring_framework_proxy_aop_1.png)

> Interface

``` java
@Service
public interface EventService {
    void createEvent();

    void publishEvent();

    void deleteEvent();
}
```


> Real Subject

``` java
@Service
public class RealEventService implements EventService {
    @Override
    public void createEvent() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Creat Event");
    }

    @Override
    public void publishEvent() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Publish Event");
    }

    @Override
    public void deleteEvent() {

    }
}
```

> Client(= AppRuner)

``` java
@Component
public class AppRuner implements ApplicationRunner {

    @Autowired
    EventService eventService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        eventService.createEvent();
        eventService.publishEvent();
    }
}
```

---

## 기능 추가

* 위와 같은 상황에서 

* 선별적으로 메소드들의 시간을 측정하는 기능을 추가해보자. 

* Real Subject에

* 시간 측정 코드를 추가하는 방법이 있다.

``` java
@Override
public void createEvent() {
    long begin = System.currentTimeMillis();
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    System.out.println("Creat Event");
    System.out.println(System.currentTimeMillis() - begin);
}
```

> 최선의 선택일까?

* 원하는 목표는 이뤘지만

* Real Subject 메소드에 시간을 측정하는 코드를 추가하는게 최선의 선택일까?

<br>

* 메소드의 실질적인 기능이 아닌 

* 시간을 측정하기 위한 수단의 코드를 

* 메소드에 담는것은 좋아보이는 구조가 아니다.

<br>

* 또한 측정하고자하는 메서드마다 

* 시간을 측정하기 위해 

* 중복된 코드를 추가해야하므로 

* 생산성 측면에서도 굉장히 비효율적이다.

---

## Code Refactoring

* 코드를 Refactoring해보자.

* Real Subject 메소드에 

* 시간을 측정하기 위해 추가했던 코드를 제거하자.

``` java
@Override
public void createEvent() {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    System.out.println("Creat Event");
}
```

* 시간 측정을 하는 가장 이상적인 방법은

* 클라이언트 코드를 건드리지 않으며

* 동시에 Real Subject 코드도 건드리지 않고

* 메서드의 시간을 측정하는 것이다.


---

## 프록시(Proxy) 방법

* 이상적인 방법을 구현하기 위한

* 여러 방법 중 하나로 **프록시 패턴**을 적용시켜보자.

* Real Subject를 감싸는 프록시 서비스를 만들자.

> ProxyRealEventService

* Real Subject를 감싸는 프록시 서비스이다.

``` java
@Primary // [1] : 같은 타입 빈이 여러개 존재시 우선 순위를 통해 선택받게 하는 방식
@Service
public class ProxyRealEventService implements EventService{

    /*
    [2] 방식과 같은 결과를 보여준다.
    @Autowired                      // 선언한 타입은 Real Subject가 아니지만
    EventService realEventService;  // 이름으로 Real Subject 주입을 받을 수 있다. 
    */

    @Autowired
    RealEventService realEventService; // [2] : Real Subject를 주입 받는다.

    @Override
    public void createEvent() {
        long begin = System.currentTimeMillis(); // [3]
        realEventService.createEvent();
        System.out.println(System.currentTimeMillis() - begin); // [4]
    }

    @Override
    public void publishEvent() {
        long begin = System.currentTimeMillis(); // [3]
        realEventService.publishEvent();
        System.out.println(System.currentTimeMillis() - begin); // [4]
    }

    @Override
    public void deleteEvent() {  // [5]

    }
}
```

* 프록시 서비스가 Real Subject를 갖고 있고 (= [2] )

* 그 프록시 서비스에서

* **realEventService.createEvent()**와 같은 코드로 

* Real Subject에게 기능을 위임하고

* 부가적인 기능(= [3], [4] )을 추가했다.

* 또한 측정을 원하지 않는 메소드(= [5] )를 제외하고

* 원하는 메소드만 선별적으로 시간을 측정할 수 있게 되었다. 

<br>

* 그리고 @Primary(= [1] ) 어노테이션을 선언하여

* Client 코드에서 

* EventService 타입을 참조 시 

``` java
@Autowired
EventService eventService;
```

* EventService 타입의 여러 Bean들 중 

* 프록시 서비스 객체를 주입받도록 설정하였다.


--- 

## Mission Success ???

* 모든것이 해결되었다.

* 라고 생각할 수 있겠지만 

* 이 방법 또한 문제가 있다.

* 프록시 서비스에도 중복되는 코드가 나타난다.

``` java
@Override
public void createEvent() {
    long begin = System.currentTimeMillis(); // [3]
    realEventService.createEvent();
    System.out.println(System.currentTimeMillis() - begin); // [4]
}

@Override
public void publishEvent() {
    long begin = System.currentTimeMillis(); // [3]
    realEventService.publishEvent();
    System.out.println(System.currentTimeMillis() - begin); // [4]
}
```

* 어떻게 더 깔끔하게 

* 시간을 측정할 수 있을까?

* [스프링 AOP]({{site.url}}/Spring-Framework-Spring-AOP/)글을 읽어보자.

---

## Reference

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

