---
layout: post
title:  " Spring 프레임워크 핵심 기술 - ResourceLoader "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

##  ResourceLoader

* Resource를 읽어오는 인터페이스이다.

> AppRunner

``` java
@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ResourceLoader resourceLoader;

    @Autowired
    ApplicationContext applicationContext;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource resource = resourceLoader.getResource("classpath:text.txt");
        System.out.println(resource.exists());

        resource = applicationContext.getResource("classpath:text.txt");
        System.out.println(resource.exists());
    }
}
```

* resources 디렉토리 하위에 

* *text.txt* 파일이 있으면 

* resource.exists()는 True

* 그렇지 않다면 False를 출력한다.

![](/assets/img/spring/Spring-Framework-ResourceLoader_1.png)











<br>

* 추가적으로

* ResourceLoader가 아닌

* ApplicationContext을 사용해도 된다. 

* 왜냐하면 ApplicationContext가 ResourceLoader를 상속하기 때문이다.

> ApplicationContext

``` java
public interface ApplicationContext extends EnvironmentCapable, ListableBeanFactory, HierarchicalBeanFactory, MessageSource, ApplicationEventPublisher, ResourcePatternResolver {
    ...
}
```

> ResourcePatternResolver

``` java
public interface ResourcePatternResolver extends ResourceLoader {
    String CLASSPATH_ALL_URL_PREFIX = "classpath*:";

    Resource[] getResources(String var1) throws IOException;
}
```

* 하지만 직관적으로 테스트하기 위해 

* 직접 ResourceLoader를 주입받는다.

<br>

* 또한 Resource에는 다양한 함수가 있다.

![](/assets/img/spring/Spring-Framework-ResourceLoader_2.png)


---

## Summary

* ApplicationContext가 상속하는 

* ResourceLoader에 대해 알아보았다.

<br>

* 이 글을 작성하면서 궁금증이 생겼다.

* Q1. **classpath** 접두어는 어느 디렉토리를 가리키는가?

* ex) resourceLoader.getResource("classpath:text.txt")

* Q2. 그리고 그 디렉토리는 언제 생성되는가?

* Q3. 그리고 어느 시점에 해당 디렉토리에 resource가 생성되는가?

<br>

* A1. **target/classes** 를 가리킨다.

* A2. 생성 시점은 코드를 빌드하면 생성된다.

* A3. A2와 마찬가지로 코드를 빌드하면 생성된다.

<br>

* 끝으로

* Target 디렉토리에 대해 글을 가볍게 작성해봤다.

* [Target 디렉토리(Directory)는 언제 생성될까?]({{site.url}}/Java-Target-Directory/)

---

## Reference

* [스프링 프레임워크 핵심 기술](https://www.inflearn.com/course/spring-framework_core)

