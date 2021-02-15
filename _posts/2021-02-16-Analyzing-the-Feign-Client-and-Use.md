---
layout: post
title:  " Feign 클라이언트 분석 및 직접 사용해보기 with Code "
categories: Feign
author: goodGid
---
* content
{:toc}

## Prologue

* Feign 이라는 Client를 사용하여 Http 통신을 할 수 있다.

  Feign에 대한 기본적인 개념은 이 글에서 다루지 않을 것이며

  혹시라도 기본 개념을 모른다면 [Spring Cloud Openfeign](https://brunch.co.kr/@springboot/202) 글을 추천한다.

* 우선 이 글을 작성하는 이유는 다음과 같다.

  Feign을 실제로 Code 레벨에서 어떻게 사용하는지 찾아보았는데

  입맛에 맞는 자료를 찾을 수 없었고

  그래서 직접 코드를 가다듬어서 만들기로 하였다.

  그리고 그 내용들을 공유하면 좋겠다 싶어서 작성하게 되었다.

---


## Feign Client 사용하기

* 우선 Feign Client를 사용하기 위해선 2가지 절차가 필요하다.

1. @EnableFeignClients 선언

2. Dependency 추가


---

### @EnableFeignClients 선언

* 아래와 같이 원하는 위치에 

  **@EnableFeignClients**를 선언해주면 된다. 

> Example 

``` java
@EnableFeignClients
@SpringBootApplication
public class GoodgidApplication {

    public static void main(String[] args) {
        SpringApplication.run(GoodgidApplication.class, args);
    }

}
```

---

### Dependency 추가

* Feign과 관련된 Dependency를 추가해준다.

  참고로 Spring Boot 버전에 따라 springCloudVersion 값이 다르므로 반드시 확인이 필요하다.

> build.gradle

``` java
ext {
    /**
     * Spring Boot and springCloudVersion must be compatible.
     * 2.4.x == 2020.0.x
     * ref : https://spring.io/projects/spring-cloud
     */
    // Feign
    set('springCloudVersion', '2020.0.1')
}

dependencyManagement {
    imports {
        mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
    }
}

dependencies {
    // Feign
    implementation 'org.springframework.cloud:spring-cloud-starter-openfeign'
    ...
}
```

---


## Feature

* 필자가 만들어놓은 Demo 프로젝트에 어떤 Feature가 있는지 알아보자.


### Profile 설정

> Set Default Profile when an inappropriate profile value is entered

``` java
public class YamlEnvironmentPostProcessor implements EnvironmentPostProcessor {

  private static final String[] acceptsProfiles = { "local", "beta", "real" };

  @Override
  public void postProcessEnvironment(ConfigurableEnvironment environment, 
                                     SpringApplication application) {

        // Set Default Profile
        boolean isValidProfileActive = environment.acceptsProfiles(Profiles.of(acceptsProfiles));

        if (!isValidProfileActive) {
            environment.setActiveProfiles("local");
            Resource path = new ClassPathResource("config/application.yml");
            try {
                environment.getPropertySources().addLast(
                        new PropertiesPropertySourceLoader().load("application", path).get(0));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
      ...
  }
}
```

* 실제 운영을 위한 프로젝트라면 Multi Profile 환경은 필수이다.

  그리고 argument를 통해 사용하려는 Profile을 지정하는데 

  만약 유효하지 않은 argument가 input으로 들어오면 default profile이 설정되도록 하였다.

> Example

* VM 옵션으로 profile에 이상한 값을 주고

  environement 값을 보면 다음과 같다.

```
VM option : -Dspring.profiles.active=goodGid
environement : StandardServletEnvironment {activeProfiles=[goodGid] ... }
```

* environement의 activeProfiles 값이 goodGid으로 들어옴

  -> *environment.acceptsProfiles(Profiles.of(acceptsProfiles))* 값은 false를 return

  -> 유효하지 않은 profile 값이라 판단

  -> 강제로 local profile로 설정

> [YamlEnvironmentPostProcessor.class](https://github.com/goodGid/Feign_Demo_Project/blob/main/src/main/java/dev/be/goodgid/common/property/YamlEnvironmentPostProcessor.java) 등록

* 이렇게 생성한 YamlEnvironmentPostProcessor.class를 

  Spring이 알아서 인식해주면 좋겠지만 그렇진 않다.

* 그러므로 Spring이 해당 class를 사용할 수 있는 설정이 필요하다.

  관련된 설정 파일은 **반드시** META-INF/spring.factories에 위치해야 한다.

> META-INF/spring.factories

```
org.springframework.boot.env.EnvironmentPostProcessor=\
  dev.be.goodgid.common.property.YamlEnvironmentPostProcessor
```

* 이유는 모르겠으나 EnvironmentPostProcessor.class에 그렇게 적혀있다.

> EnvironmentPostProcessor.class

```
EnvironmentPostProcessor implementations have to be registered in META-INF/spring.factories, 
using the fully qualified name of this class as the key.
```


---

### Custom *.yml 사용

> We can use custom *.yml property

* Custom 하게 생성한 yml 파일에 대해서는

  Spring이 사용하기 위해선 추가로 설정이 필요하다.

> Example

![](/assets/img/feign/Analyzing-the-Feign-Client-and-Use_1.png)

> [YamlEnvironmentPostProcessor.class](https://github.com/goodGid/Feign_Demo_Project/blob/main/src/main/java/dev/be/goodgid/common/property/YamlEnvironmentPostProcessor.java)

``` java
public class YamlEnvironmentPostProcessor implements EnvironmentPostProcessor {

    private static final String[] propertyUris = { "classpath*:config/custom/*.yml" };
  
    private final YamlPropertySourceLoader loader = new YamlPropertySourceLoader();
    private final ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, 
                                       SpringApplication application) {
        try {
            List<Resource> resourceList = new ArrayList<>();
            for (String propertyUri : propertyUris) {
                resourceList.addAll(List.of(resourcePatternResolver.getResources(propertyUri)));
            }

            resourceList.stream().map(this::loadYaml).forEach(them -> {
                if (them != null) {
                    for (PropertySource<?> it : them) {
                        environment.getPropertySources().addLast(it);
                    }
                }
            });
        } catch (Exception e) {
            throw new BeanCreationException(e.getMessage(), e);
        }
    }

    private List<PropertySource<?>> loadYaml(Resource resource) {
        if (!resource.exists()) {
            throw new IllegalArgumentException("Resource " + resource + " does not exist");
        }
        try {
            return loader.load(resource.getURL().toString(), resource);
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to load yaml configuration from " + resource, ex);
        }
    }
}
```

* 위 코드는 다음과 같은 역할을 한다.

* propertyUris에 위치한 *.yml 파일 load

  -> 각 yml 파일을 property로 추가

* 실제로 resourceList에는 *url.yml* 1개가 담겨있고

  Application이 *url.yml* 에 있는 값을 사용할 수 있게 된다.

---

### ErrorDecoder 사용

> We can use ErrorDecoder for Feign

* 특정 Error Code Handling이 가능하다.

  사용법은 @FeignClient의 configuration 속성에 

  설정한 Config 파일을 지정해주면 된다.


> [DemoFeignClient](https://github.com/goodGid/Feign_Demo_Project/blob/main/src/main/java/dev/be/goodgid/feign/client/DemoFeignClient.java)

``` java
@FeignClient(
        name = "demo-name",
        url = "${feign.api.demo.url}",
        configuration = DemoFeignConfig.class)
public interface DemoFeignClient {
  ...
}
```

> [DemoFeignConfig.class](https://github.com/goodGid/Feign_Demo_Project/blob/main/src/main/java/dev/be/goodgid/feign/config/DemoFeignConfig.java)

``` java
public class DemoFeignConfig {
    @Bean
    public DemoFeignErrorDecoder DemoErrorDecoder() {
        return new DemoFeignErrorDecoder();
    }
}
```

> [DemoFeignErrorDecoder](https://github.com/goodGid/Feign_Demo_Project/blob/main/src/main/java/dev/be/goodgid/feign/decoder/DemoFeignErrorDecoder.java)

``` java
public final class DemoFeignErrorDecoder implements ErrorDecoder {
    private final ErrorDecoder errorDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        final HttpStatus httpStatus = HttpStatus.resolve(response.status());

        // Handle Custom Error Status Code
        // The rest is delegated to the default error decoder
        if (httpStatus == HttpStatus.NOT_FOUND) {
            log.warn("Handle Custom Error Status. httpStatus : {}", httpStatus);
            throw new CustomException();
        }
        return errorDecoder.decode(methodKey, response);
    }
}
```


---

### Connection/Read Timeout 설정 

> We can use Custom Timeout Property while using feign client

* 사용하려는 Client마다 Connection/Read Timeout 설정이 가능하다.

> [DemoFeignClient](https://github.com/goodGid/Feign_Demo_Project/blob/main/src/main/java/dev/be/goodgid/feign/client/DemoFeignClient.java)

``` java
@FeignClient(
        name = "demo-name",
        url = "${feign.api.demo.url}",
        configuration = DemoFeignConfig.class)
public interface DemoFeignClient {
  ...
}
```

> application-{profile}.yml

``` java
feign:
  client:
    config:
      default:
        connectTimeout: 1000
        readTimeout: 5000
        loggerLevel: NONE
      demo-name:
        connectTimeout: 1000
        readTimeout: 4000
        loggerLevel: BASIC
```

* DemoFeignClient의 Timeout property 값은 

  application.yml에 feign.client.config.demo-name 값을 찾게 된다.

  // prefix : feign.client.config

* 만약 Client에 선언한 name에 해당하는 값이 

  application.yml에 없을 경우엔 default 값을 따르게 된다.

> DefaultFeignClient

``` java
@FeignClient(
        name = "default-client",
        url = "${feign.api.default.url}",
        configuration = DefaultFeignConfig.class)
public interface DefaultFeignClient {
  ...
}
// Connection Timeout : 1000ms
// Read Timeout : 5000ms
```



---

## Trouble Shooting

* 프로젝트를 Build Up하면서 겪었던 Trouble Shooting을 정리해본다.

### Version 호환

* Spring Boot version에 따라 Feign의 version이 달랐다.

  반드시 호환되는 [Spring Cloud version](https://spring.io/projects/spring-cloud)을 사용하자.



---

## Retrospective

* 직접 Build Up을 해보니

  몰랐던 부분을 명확하게 알 수 있었던 좋은 시간이였다.

* 역시 코딩은 눈이 아니라 손으로 해야 제맛이다. ㅎㅎ

---

## Summary

* Feign 사용법과 프로젝트에 녹아있는 Feature에 대해 알아보았다.

  누군가에겐 꼭 도움이 되었으면 좋겠다. ㅎㅎ

* 전체 소스 코드는 [github](https://github.com/goodGid/Feign_Demo_Project)에 올려놓았다.

  사용해보고 싶은 분은 직접 다운을 받아보자 !

* 그리고 수정할 부분 혹은 피드백이 있다면

  자유롭게 의견 주시면 이른 시일 안에 반영하도록 하겠습니다 !

* 끝으로 긴 글 읽어주셔서 감사합니다.

  다 읽지 않았어도 감사합니다.

  그냥 감사합니다.

  모두 행복하세요 ㅎㅎ

  :wq

---

## Reference

* [Spring Cloud Openfeign](https://brunch.co.kr/@springboot/202)

* [EnvironmentPostProcessor 를 통한 프라퍼티 값 후처리](https://kwonnam.pe.kr/wiki/springframework/springboot/properties#environmentpostprocessor_%EB%A5%BC_%ED%86%B5%ED%95%9C_%ED%94%84%EB%9D%BC%ED%8D%BC%ED%8B%B0_%EA%B0%92_%ED%9B%84%EC%B2%98%EB%A6%AC)