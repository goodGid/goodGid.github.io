---
layout: post
title:  " [Clean Code] 함수 (Function) : Try/Catch 블록 뽑아내기 "
categories: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## Try/Catch 블록 뽑아내기

* Try/Catch 블록을 

* **별도 함수**로 뽑아내면

* 코드가 깔끔해진다.

> Before

``` java
public void delete(Page page) {
    try {
        deletePage(page);
        registry.deleteReference(page.name);
        configKyes.deleteKey(page.name.makeKey());
    } catch (Exception e) {
        logger.log(e.getMessage());
    }
}
```

> After

``` java
public void delete(Page page) {
    try {
        deletePageAndAllReferences(page);
    } catch (Exception e) {
        logError(e);
    }
}
```

``` java
private void deletePageAndAllReferences(Page page) throws Exception {
    deletePage(page);
    registry.deleteReference(page.name);
    configKyes.deleteKey(page.name.makeKey());
}

private void logError(Exception e) {
    logger.log(e.getMessage());
}
```

* 실제로 페이지를 제거하는 함수는 **deletePageAndAllReferences**이다.

* deletePageAndAllReferences 함수는 예외를 처리하지 않는다.

* 예외 처리는 **logError** 함수가 담당한다.

<br>

* 이렇게 **정상 동작**과 **오류 처리 동작**을 분리하면

* 코드를 이해하고 수정하기 쉬워진다.

---

## 참고

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)