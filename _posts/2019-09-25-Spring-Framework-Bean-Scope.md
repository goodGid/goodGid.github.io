---
layout: post
title:  " Spring 프레임워크 핵심 기술 - Bean의 Scope "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Bean의 Scope

### Singleton Type

* Singleton이란

* Application 전반에 걸쳐

* 해당 Bean의 Instance가 

* 1개 뿐인 상태를 말한다.




> Bean

``` java
@Component
public class Single {

    @Autowired
    private Proto proto;

    public Proto getProto() {
        return proto;
    }
}
```

``` java
@Component
public class Proto {
}
```

> AppRunner

``` java
@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    Single single;

    @Autowired
    Proto proto;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println(proto);
        System.out.println(single.getProto());
    }
}
```

> Result

``` java
goodgid.study.spring.Proto@3ecedf21
goodgid.study.spring.Proto@3ecedf21
```

* 출력 결과를 보면

* 주소값이 같음을 알 수 있다.


---

### ProtoType

* 생성할 때마다

* 새로운 Instance를 사용하고 싶다면

* ProtoType의 Bean을 사용하면 된다.


``` java
@Component @Scope("prototype")
public class Proto {
}
```

* **@Scope("prototype")**를 추가해주면

* 이렇게 설정을 하면

* 항상 새로운 Instance를 생성한다.


``` java
@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ApplicationContext ctx;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("Prototype");
        System.out.println(ctx.getBean(Proto.class));
        System.out.println(ctx.getBean(Proto.class));
        System.out.println(ctx.getBean(Proto.class));

        System.out.println("Singleton");
        System.out.println(ctx.getBean(Single.class));
        System.out.println(ctx.getBean(Single.class));
        System.out.println(ctx.getBean(Single.class));
    }
}
```

> Result

``` java
Prototype
goodgid.study.spring.Proto@5fa05212
goodgid.study.spring.Proto@3e681bc
goodgid.study.spring.Proto@5c09d180

Singleton
goodgid.study.spring.Single@23aae55
goodgid.study.spring.Single@23aae55
goodgid.study.spring.Single@23aae55
```

* ProtoType의 Bean을 가져올때

* 주소값이 매번 달라지는 것을 확인할 수 있다.


---

## Type간의 참조

### Proto-> Singleton 참조

* ProtoType이 Singleton Bean을 참조한다면?

* 문제가 되지 않는다.

<br>

> Why?

* Singleton을 참조한다는건

* 그 자체로 1개의 인스턴스만을 사용하겠다는 뜻이기 때문이다.

---

### Singleton --> Proto 참조

* Singleton Type이 ProtoType의 Bean을 참조한다면

* Singleton은 Instance가 1개만 만들어지기 때문에

* Instance를 생성하는 타이밍에

* ProtoType의 Bean이 세팅이 된다.

* = ProtoType의 Bean을 직접 참조한다.

* 그렇기 때문에

* ProtoType의 Bean이 변경되지 않는다.


``` java
@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ApplicationContext ctx;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("Prototype by Singleton");
        System.out.println(ctx.getBean(Single.class).getProto());
        System.out.println(ctx.getBean(Single.class).getProto());
        System.out.println(ctx.getBean(Single.class).getProto());
    }
}
```

> Result

``` java
Prototype by Singleton
goodgid.study.spring.Proto@55b5e331
goodgid.study.spring.Proto@55b5e331
goodgid.study.spring.Proto@55b5e331
```

* 출력 결과를 보면

* 같은 주소값이 출력되는 것을 확인할 수 있다.

<br>

* 하지만 ProtoType을 선언한다는건

* ProtoType을 생성할 때마다

* 새로운 인스턴스를 원하는 상황이다.

* 그렇기 때문에

* 의도한대로

* 동작시키기 위해선

* 추가적인 설정이 필요하다.


---

## Type간의 참조 문제 해결

* [Singleton --> Proto 참조]({{site.url}}/Spring-Framework-Bean-Scope/#singleton--proto-참조)인 경우에 

* 의도한대로 동작하지 않는 상황이다.

* 어떻게해야 다른 값을 참고할 수 있을까?


---


### Provider 방법

* Provider 방법은

* POJO 객체 코드에 

* Spring 코드가 들어간다.

* (= ObjectProvider)

``` java
@Component
public class Single {

    @Autowired
    private ObjectProvider<Proto> proto; // Proto -> ObjectProvider

    public Proto getProto() {
        return proto.getIfAvailable(); // Add `getIfAvailable()` method
    }
}
```

---

### Scoped Proxy 방법

* @Scope 애노테이션에

* **ProxyMode**를 명시해준다.

``` java
@Component @Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Proto {
}
```

* 이 방법은 **Proxy 객체**를 사용한 방법이다.

* = Proxy를 사용한다.

* = Proxy로 감싸라.

<br>

* Proxy로 Proto Bean을 감싸면

* 다른 Bean들이 ProtoType의 Bean을 참조할 경우

* Proxy Bean을 사용하게된다.

<br>

> Why Proxy? 

* 왜 Proxy로 감싸야할까?

* Singleton이 ProtoType의 Bean을 

* **직접 참조**하지 못하게 하기 위해서이다.

<br>

* Singleton에 선언된

* ProtoType의 Bean에 직접 참조를 한다면

* Bean Instance를

* 바꿔 줄 수가 없기 때문이다.

* 그래서 Proxy로 감싼 객체를 

* 참조하게끔 해주는거다.

---

#### Proxy 생성 방법

* 해당 글을 참고하자.

* [Proxy 객체를 만드는 방법]({{site.url}}/Spring-Framework-Make-Proxy-Bean)

---

## Example

* 코드를 보며

* Bean Scope 개념을 정리한다.

> AppRunner

``` java
@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ApplicationContext ctx;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("Prototype by Singleton");
        System.out.println(ctx.getBean(Single.class).getProto());
        System.out.println(ctx.getBean(Single.class).getProto());
        System.out.println(ctx.getBean(Single.class).getProto());
    }
}
```

> Result

``` java
Prototype by Singleton
goodgid.study.spring.Proto@2aa27288
goodgid.study.spring.Proto@7f34a967
goodgid.study.spring.Proto@77e80a5e
```
* Application을 실행시켜보면

* 2가지 방법 모두다

* (Provider, Scoped Proxy)

* Instance의 주소값이 달라짐을 

* 확인할 수 있다.


---

## Summary

* Bean의 Scope에 대해 알아봤다.

* 크게 Singleton과 ProtoType이 존재하며

* 각각의 특징에 대해 알아봤다.

<br>

* 또한 ProtoType을 갖고 있는

* Singleton일 경우

* 참조 문제를 해결하는 방법에 대해 알아봤다.

<br>

* 그리고 그 방법에는 Proxy라는 개념이 필요했으며

* Java에서 Proxy 객체를 만드는 

* [2가지 방법]({{site.url}}/Spring-Framework-Make-Proxy-Bean)에 대해서도 알아봤다.

---

## 참고

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

