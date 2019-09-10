---
layout: post
title:  " Spring 프레임워크 핵심 기술 - 스프링 @AOP "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

* 이전에 작성한 [프록시 AOP]({{site.url}}/Spring-Framework-Proxy-AOP)글 이후에 작성된 글이다.

## Spring AOP

* 스프링 AOP를 사용하기위해선 

* 의존성을 추가해줘야한다.

* 필자는 메이븐 빌드 툴을 사용하기 때문에

* **pom.xml**에 의존성을 추가하였다.

``` java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

## Aspect 정의

``` java
@Component
@Aspect
public class PerfAspect {
    ...
}
```

* @Aspect 어노테이션 선언을 통해 

* 해당 클래스는 Aspect로 사용됨을 명시해준다.

* 그리고 스프링에서 제공해주는

* 스프링 IoC를 사용하여

* 컴포넌트 스캔 시 Bean 등록을 시키기 위해

* @Component 어노테이션도 붙혀준다.











<br>

* Aspect는 *Advice* 와 *PointCut* 을 갖고있어야 하기 때문에

* [Advice]({{site.url}}/Spring-Framework-AOP-Concept/#advice)와 [PointCut]({{site.url}}/Spring-Framework-AOP-Concept/#pointcut)를 추가하자.

* AOP와 관련된 개념은 [스프링 AOP : 개념 소개]({{site.url}}/Spring-Framework-AOP-Concept)글을 참고하자.


### Advice 정의

``` java
public Object logPerf(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    long begin = System.currentTimeMillis();
    Object retVal = proceedingJoinPoint.proceed();
    System.out.println(System.currentTimeMillis() - begin);
    return retVal;
}
```

### Advice 사용 방법

* Advice는 3가지 방법으로 적용시킬 수 있다.

#### Before

* @Before를 사용하면 

* 해당 어드바이스는 메소드가 실행되기 전에 동작한다.

#### After

* @After를 사용하면

* 해당 어드바이스는 메소드가 실행된 후 동작한다.

#### Around

* Around는 Before + After 개념이다.

* 즉 메소드가 실행되기 전과 후에 작업을 진행할 수 있다.


---


### PointCut 정의

* 위에서 정의한 Advice를 

* 어디에 적용시킬 것인가를 정의하자.

* 2가지 방법이 있다.

#### Bean 이름을 통한 적용

``` java
@Around("bean(realEventService)")
public Object logPerf_Bean(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    System.out.println("Call logPerf_Bean()");
    long begin = System.currentTimeMillis();
    Object retVal = proceedingJoinPoint.proceed();
    System.out.println(System.currentTimeMillis() - begin);
    return retVal;
}
```

#### Annotation을 사용한 적용

* 우선 Annotation를 정의한다.

> Annotation 

``` java
@Retention(RetentionPolicy.CLASS)
@Target(ElementType.METHOD)
public @interface PerfLogging {
}
```

* 그리고 Aspect의 Advice에 

* PointCut 방법으로 

* Annotation을 사용할 것임을 명시해준다.

``` java
@Around("@annotation(PerfLogging)")
public Object logPerf_Annotation (ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    System.out.println("Call logPerf_Annotation()");
    Object retVal = proceedingJoinPoint.proceed();
    return retVal;
}
```

> Real Subject

* Real Subject에서 

* AOP를 적용시킬 메소드에

* 생성한 Annotation을 추가해준다.

``` java
@Service
public class RealEventService implements EventService {

    @PerfLogging
    @Override
    public void createEvent() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Creat Event");
    }

    ...

}
```



## 마무리

* Advice를 적용키기 위한 3가지 방법과

* PointCut을 명시하는 2가지 방법을 사용하여

* Aspect를 정의하고

* TC를 통해 각각 방법들의 결과를 확인해보자.


> Spring AOP

``` java
@Component
@Aspect
public class PerfAspect {

    @Around("@annotation(PerfLogging)")
    public Object logPerf_Annotation (ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("Call logPerf_Annotation()");
        Object retVal = proceedingJoinPoint.proceed();
        return retVal;
    }

    @Around("bean(realEventService)")
    public Object logPerf_Bean(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("Call logPerf_Bean()");
        long begin = System.currentTimeMillis();
        Object retVal = proceedingJoinPoint.proceed();
        System.out.println(System.currentTimeMillis() - begin);
        return retVal;
    }

    @Before("bean(realEventService)")
    public void hello(){
        System.out.println("Call hello()");
    }

    @After("bean(realEventService)")
    public void goodBye(){
        System.out.println("Call goodBye()");
    }
}
```

> Real Subject

``` java
@Service
public class RealEventService implements EventService {

    @PerfLogging
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
}
```

> Result

``` java
Call logPerf_Annotation()
Call logPerf_Bean()
Call hello()
Creat Event
1003
Call goodBye()

Call logPerf_Bean()
Call hello()
Publish Event
2002
Call goodBye()
```

---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

