---
layout: post
title:  " Spring Rest 클라이언트(Client) : RestTemplate과 WebClient "
categories: Spring
author: goodGid
---
* content
{:toc}

## RestClient

* Spring에서 제공하는 Http 통신에 사용할 수 있는 템플릿이다.

  쉽게 말하자면 **Http 통신을 할 수 있는 Rest한 Client**라고 생각하면 된다.



---

### RestTemplate

* Blocking I/O 기반의 Synchronous API이다.

  그렇기 때문에 절차 지향처럼 각 코드 라인이 끝나야 다음 라인으로 넘어간다.

> Controller

``` java
@Slf4j
@RestController
public class GoodGidController {

    @GetMapping("first")
    public String first() throws InterruptedException {
        Thread.sleep(5000l);
        return "first";
    }

    @GetMapping("second")
    public String second() throws InterruptedException {
        Thread.sleep(3000l);
        return "second";
    }
}
```

> RestTemplateBuilder

``` java
@Component
public class RestRunner implements ApplicationRunner {

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        RestTemplate restTemplate = restTemplateBuilder.build();
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        ResponseEntity<String> first = 
              restTemplate.getForEntity("http://localhost:8080/first", String.class);
        System.out.println(first.getBody());

        ResponseEntity<String> second = 
              estTemplate.getForEntity("http://localhost:8080/second", String.class);
        System.out.println(second.getBody());

        stopWatch.stop();
        System.out.println(stopWatch.prettyPrint());

    }
}
```


> Output

``` js
first
second
StopWatch '': running time = 8117241066 ns
---------------------------------------------
ns         %     Task name
---------------------------------------------
8117241066  100%  
```

* first를 먼저 호출하고 second를 호출했다.

  그런데 RestTemplate는 Sync이기 때문에

  first 요청 처리 -> second 요청 처리를 하게 된다.

  그러므로 총 8초에 시간이 걸린다.

  ( first의 5초 + second의 3초 )


---


### WebClient

* Non-Blocking I/O 기반의 Asynchronous API이다.

  Async하기 때문에 Sync보다 빠르다.

> pom.xml

``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```

* WebClient는 Java 5 Spring Webflux에 추가된 RestClient 중 하나다.

  그리고 사용하기 위해서는 의존성을 추가해줘야한다.


> Controller

``` java
@Slf4j
@RestController
public class GoodGidController {

    @GetMapping("first")
    public String first() throws InterruptedException {
        Thread.sleep(5000l);
        return "first";
    }

    @GetMapping("second")
    public String second() throws InterruptedException {
        Thread.sleep(3000l);
        return "second";
    }
}
```


> WebClient

``` java
@Component
public class RestRunner implements ApplicationRunner {

    @Autowired
    private WebClient.Builder builder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        WebClient webClient = builder.build();
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        Mono<String> first = webClient.get().uri("http://localhost:8080/first")
                                      .retrieve()
                                      .bodyToMono(String.class);
        first.subscribe(s -> {
            System.out.println(s);

            if (stopWatch.isRunning()) {
                stopWatch.stop();
            }

            System.out.println(stopWatch.prettyPrint());
            stopWatch.start();
        });

        Mono<String> second = webClient.get().uri("http://localhost:8080/second")
                                       .retrieve()
                                       .bodyToMono(String.class);
        second.subscribe(s -> {
            System.out.println(s);

            if (stopWatch.isRunning()) {
                stopWatch.stop();
            }

            System.out.println(stopWatch.prettyPrint());
            stopWatch.start();
        });
    }
}
```

``` js
second
StopWatch '': running time = 3382216699 ns
---------------------------------------------
ns         %     Task name
---------------------------------------------
3382216699  100%  

first
StopWatch '': running time = 5325946316 ns
---------------------------------------------
ns         %     Task name
---------------------------------------------
3382216699  064%  
1943729617  036%  
```

* RestClient와 동일하게 first를 먼저 호출하고 second를 호출했다.

  하지만 총 걸린 시간은 5초이다.

  RestClient보다 3초가 빠르다.

  왜냐하면 3초에 second 요청에 대한 응답을 처리했고

  5초에 first 요청에 대한 응답을 처리했기 때문에

  총 걸린 시간은 5초이다.


--- 

## Summary

* Sync와 Async는 큰 차이를 가져온다.

  상황에 맞게 사용하는 게 중요하지만

  가능하다면 Async가 좋지 않을까 생각한다.


---

## Reference

* [스프링 부트 개념과 활용 : 4부 스프링 부트 활용 - REST 클라이언트 : RestTemplate과 WebClient](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)

* [RestTemplate (정의, 특징, URLConnection, HttpClient, 동작원리, 사용법, connection pool 적용)](https://sjh836.tistory.com/141)