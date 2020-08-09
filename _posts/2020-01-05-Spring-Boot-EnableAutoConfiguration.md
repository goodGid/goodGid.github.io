---
layout: post
title:  " @EnableAutoConfiguration 어노테이션을 선언하면 내부적으로 어떤 일이 일어날까? "
categories: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## 글의 목표

* @EnableAutoConfiguration 어노테이션을

  선언하면 어떤 일이나는지 알아보자.





## 사용처

* 우선 @EnableAutoConfiguration는 언제 사용될까?

* 가장 흔하게 볼 수 있는 환경은

  스프링부트 환경에서

  **@SpringBootApplication** 어노테이션

  내부에 메타 어노테이션에서 찾을 수 있다.


> GidhubApplication.java

``` java
@SpringBootApplication
public class GidhubApplication {
	public static void main(String[] args) {
		SpringApplication.run(GidhubApplication.class, args);
	}
}
```

> SpringBootApplication.java

``` java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration // @EnableAutoConfiguration 사용 !
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
        ...
}
```


---

## Dependency 추가

* @EnableAutoConfiguration 어노테이션을 사용하기 위한 dependency를 추가해보자.

> pom.xml

``` xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    ...
</dependencies>
```

* 다음과 같이 dependency를 추가한다.

<br>

* 그러면 자동적으로 

  Spring에 필요한 

  dependency들이 같이 import 된다.

![](/assets/img/spring/Spring-Boot-EnableAutoConfiguration_1.png)

* 많은 dependency 중에서

  spring-boot-autoconfigure-2.2.2.release.jar를 살펴보자.



### spring-boot-autoconfigure

* spring-boot-autoconfigure-2.2.2.release.jar의 구성은 다음과 같다.

![](/assets/img/spring/Spring-Boot-EnableAutoConfiguration_2.png)

<br>

#### spring.factories

* spring-boot-autoconfigure-2.2.2.release.jar / META-INF / spring.factories는 다음과 같다.

![](/assets/img/spring/Spring-Boot-EnableAutoConfiguration_3.png)

* Dependency를 추가하는

  일련의 과정을 영상으로 확인하고 싶다면

  아래 영상을 다운받아서 보자.

  [Dependency 영상](https://github.com/goodGid/goodGid.github.io/blob/master/assets/img/spring/Spring-Boot-EnableAutoConfiguration_1.mp4) 다운로드



## 동작 과정

* @EnableAutoConfiguration을 선언하면

  어떤 일이 발생하는지 알아보자.




> GidhubApplication.java

``` java
@SpringBootApplication
public class GidhubApplication {
    public static void main(String[] args) {
        // Step into SpringApplication !!!
        SpringApplication.run(GidhubApplication.class, args);
    }
}
```

> SpringApplication.class -> SpringApplication()

``` java
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
    this.resourceLoader = resourceLoader;
    Assert.notNull(primarySources, "PrimarySources must not be null");
    this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
    this.webApplicationType = WebApplicationType.deduceFromClasspath();

    // Step into getSpringFactoriesInstances() !!!
    setInitializers(
        (Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class)
    );

    setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
    this.mainApplicationClass = deduceMainApplicationClass();
}
```


> SpringApplication.class -> getSpringFactoriesInstances()

``` java
private <T> Collection<T> getSpringFactoriesInstances(
    Class<T> type, Class<?>[] parameterTypes, Object... args) {

    ClassLoader classLoader = getClassLoader();

    // Step into SpringFactoriesLoader.loadFactoryNames() !!!
    Set<String> names = 
    new LinkedHashSet<>(SpringFactoriesLoader.loadFactoryNames(type, classLoader));

    List<T> instances = createSpringFactoriesInstances(type, parameterTypes, classLoader, args, names);
    AnnotationAwareOrderComparator.sort(instances);
    return instances;
}
```



> SpringFactoriesLoader.class -> loadFactoryNames()

``` java
public static List<String> loadFactoryNames(
    Class<?> factoryType, 
    @Nullable ClassLoader classLoader) {
    String factoryTypeName = factoryType.getName();
    return loadSpringFactories(classLoader).getOrDefault(factoryTypeName, Collections.emptyList());
}

private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
    MultiValueMap<String, String> result = cache.get(classLoader);
    if (result != null) {
        return result;
    }

    try {
        Enumeration<URL> urls = (classLoader != null ?
                classLoader.getResources(FACTORIES_RESOURCE_LOCATION) :
                ClassLoader.getSystemResources(FACTORIES_RESOURCE_LOCATION));
        result = new LinkedMultiValueMap<>();
        while (urls.hasMoreElements()) {
            URL url = urls.nextElement();
            UrlResource resource = new UrlResource(url);
            Properties properties = PropertiesLoaderUtils.loadProperties(resource);
            for (Map.Entry<?, ?> entry : properties.entrySet()) {
                String factoryTypeName = ((String) entry.getKey()).trim();
                for (String factoryImplementationName : StringUtils.commaDelimitedListToStringArray((String) entry.getValue())) {
                    result.add(factoryTypeName, factoryImplementationName.trim());
                }
            }
        }
        cache.put(classLoader, result);
        return result;
    }
    catch (IOException ex) {
        throw new IllegalArgumentException("Unable to load factories from location [" +
                FACTORIES_RESOURCE_LOCATION + "]", ex);
    }
}
```

* loadSpringFactories() 메소드에

  Break Point를 걸고

  Debug를 하다보면

  다음과 같은 화면을 볼 수 있다.

![](/assets/img/spring/Spring-Boot-EnableAutoConfiguration_4.png)

* factoryTypeName =

  **org.springframework.boot.autoconfigure.EnableAutoConfiguration**

* factoryImplementationName =

  **org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration**

<br>

* 즉 **spring.factoires**에 명시되어 있는 

  무수히 많은 값들을

  while loop를 통해 읽어온다.

![](/assets/img/spring/Spring-Boot-EnableAutoConfiguration_5.png)

* 그리고 그 중에 

  org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration 클래스도

  읽어와 등록하게 된다.

![](/assets/img/spring/Spring-Boot-EnableAutoConfiguration_6.png)

<br>

* 등록이 되어지는 일련의 과정을

  영상을 통해 보고 싶다면 

  아래 링크에서 다운을 받아보자.
  
  [@EnableAutoConfiguration 선언 시 동작 과정](https://github.com/goodGid/goodGid.github.io/blob/master/assets/img/spring/Spring-Boot-EnableAutoConfiguration_2.mp4) 다운로드




## Summary

* Spring Boot 환경에서 

  @EnableAutoConfiguration을 사용하면

  자동으로 다양한 Config들이 설정되는 과정을 살펴봤다. 

* 그렇기 때문에 

  Spring Boot에서는 

  Spring MVC에 비해 특별한 설정이 없이 

  손쉽게 프로그래밍이 가능해짐을 알 수 있었다.
  


---

## Reference

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)