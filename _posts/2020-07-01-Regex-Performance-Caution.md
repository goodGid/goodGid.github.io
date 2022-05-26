---
layout: post
title:  " 정규 표현식(Regex) 사용 시 성능을 고려한 코딩을 해보자 "
categories: Regex
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
  
  1번 사용되고 버려져서 곧바로 GC의 대상이 되므로 **비효율적**이다.

---

### So What?

* 어떻게 하면 성능을 개선할 수 있을까?

* 방법은 매우 단순하다.

* 정규표현식을 표현하는 **불변 객체**인

  Pattern 인스턴스를 클래스 초기화 과정에서 생성해두고 나중에 재활용하면 된다.

* 실제로 Oracle Docs를 보면 다음과 같은 문구가 있다.

  [If a pattern is to be used multiple times, compiling it once and reusing it will be more efficient than invoking this method each time.](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html#matches(java.lang.String,%20java.lang.CharSequence))

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

  성능적으로 개선 포인트가 없는지 살펴보면서 코딩을 해보면 좋지 않을까 싶다.

* 단순히 *기능이 동작하니까 됐다.* 는 자세보단

  디테일함까지 고려해보는 자세가 쌓이면 코딩을 하는 데 있어 큰 차이를 만든다고 생각한다.

---

## Reference

* [이펙티브 자바](https://book.naver.com/bookdb/book_detail.nhn?bid=14097515)
