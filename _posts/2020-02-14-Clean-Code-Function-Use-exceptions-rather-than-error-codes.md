---
layout: post
title:  " [Clean Code] 함수 (Function) : 오류 코드보다 예외를 사용하라 ! "
categories: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 오류 코드보다 예외를 사용하라 !

* 명령 함수에서 오류 코드를 반환하는 방식은

* 명령 / 조회 분리 규칙을 

* 미묘하게 위반한다. 

* ref : [[Clean Code] 함수 (Function) : 명령과 조회를 분리하라 !]({{site.url}}/Clean-Code-Function-Separate-Commands-and-Inquiries/)

<br>

* if 문에서 명령을 표현식으로 사용하기 쉽기 때문이다.

``` java
if (deletePage(page) == OK)
```

* 위 코드는 여러 단계로 중첩되는 코드를 야기한다.

* 오류 코드를 반환하면 

* 호출자는 오류 코드를 곧바로 처리해야한다는 문제에 부딪힌다.

``` java
if (deletePage(page) == OK) {
    if (registry.deleteReference(page.name) == OK) {
        if (configKeys.deleteKey(page.name.makeKey()) == OK) {
            logger.log("page deleted");
        } else {
            logger.log("configKey nott deleted");
        }
    } else {
        logger.log("deleteReference from registry failed");
    }
} else {
    logger.log("delete failed");
    return E_ERROR;
}
``` 

* 오류 코드 대신

* 예외를 사용하면 

* 오류 처리 코드가 

* 원래 코드에서 분리되어 코드가 깔끔해진다.

``` java
try {
    deletePage(page);
    registry.deleteReference(page.name);
    configKyes.deleteKey(page.name.makeKey());
} catch (Exception e) {
    logger.log(e.getMessage());
}
```

---

## Reference

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)