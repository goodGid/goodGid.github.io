---
layout: post
title:  " Java 8 Stream을 Debug 해보자 : peek( ) "
categories: Java
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 책 내용을 토대로 작성하였습니다.

## Prologue

* Java 8에서는 stream 기능을 제공해준다.

  굉장히 좋은 기능이지만

  Debug를 하는데 있어서는 다소 불편한 점이 있다.

  그래서 stream을 Debug 하는 방법에 대해 알아보자.


---

## [peek( )](https://www.baeldung.com/java-streams-peek-api)

### Normal Usage

``` java
public void printEven() {
    List<Integer> numbers = Arrays.asList(2, 3, 4, 5);

    numbers.stream()
            .map(x -> x + 17)
            .filter(x -> x % 2 == 0)
            .limit(3)
            .forEach(System.out::println);
}
```

> Output

```
20
22
```

* 중간 결괏값을 확인할 수 없고

  단순히 결괏값만 확인할 수 있어서 불편함이 있다.

---


### For Debug

``` java
public void printEvenWithDebug() {
    List<Integer> numbers = Arrays.asList(2, 3, 4, 5);

    numbers.stream()
            .peek(x -> System.out.println("\nStart Debug"))
            .peek(x -> System.out.println("from stream : " + x))
            .map(x -> x + 17)
            .peek(x -> System.out.println("after stream : " + x))
            .filter(x -> x % 2 == 0)
            .peek(x -> System.out.println("after filter : " + x))
            .limit(3)
            .peek(x -> System.out.println("after limit : " + x))
            .forEach(System.out::println);
}
```

> Output

```
Start Debug
from stream : 2
after stream : 19

Start Debug
from stream : 3
after stream : 20
after filter : 20
after limit : 20
20

Start Debug
from stream : 4
after stream : 21

Start Debug
from stream : 5
after stream : 22
after filter : 22
after limit : 22
22
```

* **peek( )** 메소드를 사용하여 

  가시적으로 값을 확인해볼 수 있었다.

---

## Summary

* 이제는 stream 기능을 사용하더라도

  peek( )를 사용하여 

  중간마다 값이 어떻게 변하는지 확인할 수 있게 되었다.

* 위 코드는 [Gist](https://gist.github.com/goodGid/f971fa5225238281a930c3d8d1c78437)에 첨부해놓았다.

---

## Reference

* [모던 자바 인 액션](https://book.naver.com/bookdb/book_detail.nhn?bid=15261103)