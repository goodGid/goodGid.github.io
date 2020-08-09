---
layout: post
title:  " [Clean Code] 에러 처리 (Error Handling) : Null 반환 Method "
categories: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## Null 반환

* null이 반환될 수 있는 Method는 좋지 못하다.

* 왜냐하면 null 여부를 체크하기 위한

* 불필요한 코드가 추가되기 때문이다.

<br>

> Example

``` java
public void registerItem(Item item) {
    ItemRegistry registry = peristentStore.getItemRegistry(); // [1]
    if (registry != null) {
        boolean isExist = registry.getItem(item.getID()); // [2]
        if (isExist != null && isExist) {
            // Do Something...
        }
    }
}
```

* 위 코드에는 

* null 여부를 판단하는 

* 2가지 if 문이 있다.

<br>

* 즉 Method가 null을 return 할 수 있기 때문에

* 어쩔 수 없이 null 여부를 체크하는 

* if 조건문이 추가된 것이다.

<br>

> Q. if 조건문이 registerItem() Method의 기능을 위해 반드시 필요한 코드일까?

* 그렇지 않다.












### Solution


> Null Return이 가능한 Method

``` java
[1] peristentStore.getItemRegistry();
[2] registry.getItem(item.getID());
```

* 만약 위 Method가 

* null을 **return 하지 않음**을 보장한다면

* null 여부를 체크하기 위한 

* if 문은 필요가 없어진다.

<br>

* 어떻게 하면 registerItem() Method 안에서 

* 불필요한 if 조건 문을 제거 할 수 있을까?

<br>

* 다양한 방법이 있겠지만

* null을 return 하는게 아니라 

* **Emtpy 객체**를 return한다.



### Refactiong Code

``` java
[1] peristentStore.getItemRegistry();
[2] registry.getItem(item.getID());
```

* 2개의 Method가 null을 return하지 않음을 **보장**한다고 가정해보자.

<br>

* 그러면 registerItem() Method는 다음과 같이 수정할 수 있다.

``` java
public void registerItem(Item item) {
    ItemRegistry registry = peristentStore.getItemRegistry(); // [1]
    boolean isExist = registry.getItem(item.getID()); // [2]
    if (isExist) {
        // Do Something...
        }
    }
}
```

* 어떠한 경우에도 null은 return 되지 않는다.

* 그렇기 때문에 

* null 여부를 체크하는 코드는 불필요해지고

* 핵심적인 코드만 남게되고

* 코드는 보다 간결해진다.


## Summary

* 서비스를 운영하면서 

* 가장 주의해야하는 부분은 

* **null** 체크라 생각한다.

<br>

* 이런 주의점을 사전에 방지할 수 있는

* 방법을 많이 생각해보고 적용시켜보도록 하자.

<br>

> 한줄평

* **Clean Code는 읽기도 좋아야 하지만 안정성도 높아야한다.**

---

## Reference

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)