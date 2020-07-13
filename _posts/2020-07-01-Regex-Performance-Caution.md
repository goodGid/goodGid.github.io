---
layout: post
title:  " [3분컷] 정규 표현식(Regex) 사용 시 성능을 고려한 코딩 "
categories: Technology
author: goodGid
---
* content
{:toc}

## Prologue

* 정규 표현식(Regex)사용 시 

  무심코 사용하면 성능상 이슈가 발생할 수 있다.

  어떤 경우인지 알아보고 어떻게 개선하는 게 좋을지 알아보자.



---


## Regex 사용하기

* 숫자 혹은 알파벳인지 검사하는 정규표현식을 짜보자.

> isNumberOrAlphabet()

``` java
boolean isNumberOrAlphabet(String s){
  return s.matches("[0-9a-zA-Z]");
}
```

* 기능 관점에서 보면 문제가 없다.

  하지만 성능 관점에서 보면 개선할 포인트가 있다.

---

> Q. 어느 부분을 개선할 수 있을까?

* 이 방식의 문제는 String.matches 메서드를 사용한다는 데 있다.

* String.matches는 성능이 중요한 상황에서 반복해 사용하기엔 적합하지 않다.

* 왜냐하면 String.matches() 메서드 내부에서 만드는 

  정규표현식용 Pattern 인스턴스는 
  
  1번 사용되고 버려져서 곧바로 GC의 대상이 되기 때문이다.

* 즉 **비효율적**이다.

---

### So What?

* 어떻게 하면 성능을 개선할 수 있을까?

* 방법은 매우 단순하다.

* 필요한 정규표현식을 표현하는 **불변 객체** Pattern 인스턴스를

  클래스 초기화 과정에서 생성해두고 나중에 재활용하면 된다.

---

> regex.class

``` java
public class regex {
    private static final Pattern isNumberOrAlphabet = Pattern.compile("[0-9a-zA-Z]");

    boolean validateString(String s) {
        return isNumberOrAlphabet.matcher(s).matches();
    }
}
```

---

## Summary

* 코딩하면서 정규표현식을 많이 사용하는데

  앞으로는 성능을 고려한 코딩을 하도록 하자.

* 그리고 단순히 *기능이 동작하니까 됐다.* 는 자세가 아닌

  이런 디테일까지 고려하는 자세가 쌓이면 코딩을 하는 데 있어 큰 차이를 만든다고 생각한다.

---

## Reference

* [이펙티브 자바](https://book.naver.com/bookdb/book_detail.nhn?bid=14097515)
