---
layout: post
title:  " [Effective Java] 6. 불필요한 객체 생성을 피하라 "
categories: Effective Java
author: goodGid
---
* content
{:toc}

> 기존 책 내용을 필자가 생각하기에 이해하기 쉽게 조금 변형하였습니다.

## 불변 객체

* 생성 비용이 아주 **비싼 객체**가 

  반복해서 필요하다면 **캐싱**하여 재사용하는게 좋다.





### Example

``` java
Boolean goodgid1 = new Boolean(true);
Boolean goodgid2 = new Boolean(true);
Boolean goodgid3 = new Boolean(true);

Boolean goodgid4 = Boolean.valueOf(true);
Boolean goodgid5 = Boolean.valueOf(true);
Boolean goodgid6 = Boolean.valueOf(true);
```

> 주소값

![](/assets/img/java/Effective-Java-Item-6_1.png)

* goodgid 1~3의 주소 값은 각각 다르다.

  왜냐하면 항상 새로운 인스턴스를 생성하였기 때문이다.

* 반면 goodgid 4~5의 주소 값은 같다.

  즉 불변 객체를 Return하였기 때문에 **동일한 인스턴스**를 사용한다.


---

## Summary

* 어떤 객체가 반복적으로 필요하다면 

  새로운 인스턴스를 매번 만드는 **생성자 방식**(ex. new Boolean( ))보단
  
  불변 객체를 Return하는 **팩터리 메소드**(ex. Boolean.valueOf( ))를 사용하는 것이 좋다.




---

## Reference

* [이펙티브 자바](https://book.naver.com/bookdb/book_detail.nhn?bid=14097515)

* [Item 6. 불필요한 객체 생성을 피하라](https://happy-playboy.tistory.com/entry/Item-6-%EB%B6%88%ED%95%84%EC%9A%94%ED%95%9C-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1%EC%9D%84-%ED%94%BC%ED%95%98%EB%9D%BC)