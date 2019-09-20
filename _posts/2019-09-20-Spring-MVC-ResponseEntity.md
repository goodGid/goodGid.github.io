---
layout: post
title:  " Spring MVC - ResponseEntity "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## ResponseEntity

* [@ResponseBody]({{site.url}}/Spring-MVC-ResponseBody)와 마찬가지로

* 응답 본문을 제어하는 기능을 하지만

* @ResponseBody보다 응답 값을 

* 디테일하게 설정이 가능하다.

---

## ResponseEntity 설정값

* 총 3가지 설정이 가능하다.

1. Body

2. Headers

3. HttpStatus Code

![](/assets/img/spring/spring_mvc_response_entity_1.png)

``` java
ResponseEntity responseEntity_1 = new ResponseEntity(HttpStatus.MULTI_STATUS);
ResponseEntity responseEntity_2 = new ResponseEntity(event, HttpStatus.CREATED);
```





---

## Example Code

* 핸들러에서 

* 정상적인 요청이라면 성공 응답을

* 그게 아니라면 잘못된 응답 값을 원한다면

* 다음과 같이 

* ResponseEntity를 사용하여 

* 요청에 대한 응답을 설정할 수 있다.

``` java
@PostMapping
public ResponseEntity createEvent() {
    try {
        // ...
        return ResponseEntity.ok().build();
    } catch (Exception e) {
        // ...
        return ResponseEntity.badRequest().build();
    }
}
```



---

## 참고

* [스프링 웹 MVC](https://www.inflearn.com/course/%EC%9B%B9-mvc)

