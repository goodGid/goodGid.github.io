---
layout: post
title:  " [Clean Code] 함수 (Function) : 명령과 조회를 분리하라 ! "
categories: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 명령과 조회를 분리하라 ! 

* 함수는 뭔가를 수행하거나 

* 뭔가에 답하거나 

* 둘 중에 하나만 해야한다.

``` java
public boolean set(String attribute, String value);
```

* 이 함수는 이름이 attribute인 속성을 찾아

* 값을 value로 설정한 후 

* 성공하면 true를 반환 

* 실패하면 flase를 반환한다.

<br>

* 그래서 다음과 같은 괴상한 코드가 나온다.

``` java
if (set("userName", "goodGid"))
```

* 위 코드는 다양한 해석이 가능하다.

1. userName이 goodGid으로 설정되어 있는지 확인하는 코드인가?

2. userName을 goodGid로 설정하는 코드인가?

* 함수를 호출하는 코드만 봐서는 의미가 모호하다.


## Refactoring

``` java
if (attributeExists("userName")){
    setAttribute("userName", "goodGid");
}
```

* 명령과 조회를 분리한다.


---

## 참고

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)