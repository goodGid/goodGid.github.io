---
layout: post
title:  " [Effective Java] 5. 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라 "
categories: EffectiveJava
author: goodGid
---
* content
{:toc}

> 기존 책 내용을 필자가 생각하기에 이해하기 쉽게 조금 변형하였습니다.

## 의존 객체 주입

* 사용하는 자원에 따라

  동작이 달라지는 클래스에는

  **정적 유틸리티 클래스**나 **싱글턴 방식**이 적합하지 않다.

* 오히려 의존 객체 주입 패턴을 사용하는게 훨씬 좋다.

  즉 인스턴스 생성 시 생성자에 **필요한 자원**을 넘겨준다.

* 잘 이해가 되지 않을테니 Example을 통해 이해해보자.


---


### Example

* 맞춤법 검사를 하고 싶다는 요구 사항이 있고

  요구 사항을 충족시키기 위해
  
  맞춤법 검사를 하는 클래스를 구현해보자.

* 위 요구 사항을 충족시키는 클래스를 만들어야 한다면

  필자라면 다음과 같이 2가지 방법을 생각했을 것이다.

---

<blockquote>
  <p>1 정적 유틸리티 클래스</p>
</blockquote>

``` java
public class SpellChecker {
    
    private static final Dictionary dic = ...;
    
    private SpellChecker() {} // 객체 생성 방지
    
    public static boolean isVaild(String word) { 
        return true || false;
    }
}

// 사용법 : SpellChecker.isVaild("goodGid")
```

---

<blockquote>
  <p>2. 인스턴스를 중복으로 생성할 필요가 없으므로 싱글턴 클래스 생성</p>
</blockquote>

``` java
public class SpellChecker {
    
    private final Dictionary dic = ...;
    
    private SpellChecker() {} // 객체 생성 방지

    public static SpellChecker INSTANCE = new SpellChecker(...);
    
    public static boolean isVaild(String word) {
        return true || false;
    }
}

// 사용법 : SpellChecker.INSTANCE.isVaild("goodGid")
```

#### Problem

* 기능상 문제는 없다.

  하지만 요구 사항이 변경되면 문제가 발생한다.

* 만약 요구 사항이 1개의 Dictionary를 사용하는 게 아니라

  유저마다 사용하고자 하는 Dictionary를 사용하도록 변경해야 한다면

  현재는 하드 코딩으로 Dictionary를 선언하였기 때문에

  사용자가 원하는 Dictionary로 변경할 수 없다.


---


#### Solution


``` java
public class SpellChecker {

    private final Dictionary dic;
    
    // 의존성 주입
    public SpellChecker(Dictionary dictionary){
    	this.dic = dictionary
    }
    
    public static boolean isVaild(String word) {
        return true || false;
    }
}
```

* 의존 객체 주입하는 방식으로 

  클래스를 수정하였기 때문에

  Dictionary가 몇 개든 요구 사항을 충족시킬 수 있게 된다.


---


## Summary

* 가장 처음에 언급했던 문장을 다시 보면 다음처럼 해석할 수 있다.

  *사용하는 자원에 따라* = 사용자가 원하는 Dictionary

  *동작이 달라지는 클래스에는* = 사용자가 원하는 Dictionary로 맞춤법을 검사한다.

  *정적 유틸리티 클래스나 싱글턴 방식이 적합하지 않다.* = 정적 클래스 혹은 싱글턴은 변경할 수 없다.

* 즉 클래스가 내부적으로 하나 이상의 자원에 의존하고

  그 자원이 클래스 동작에 영향을 준다면

  **싱글턴**과 **정적 유틸리티 클래스**는 사용하지 않는 것이 좋다.

* 이 자원들을 클래스가 직접 만들게 해서도 안 된다.

  대신 필요한 자원을 생성자를 통해 넘겨주자.

* **의존 객체 주입**이라 하는 이 기법은

  클래스의 유연성, 재사용성, 테스트 용이성을 개선해준다.


---

## Reference

* [이펙티브 자바](https://book.naver.com/bookdb/book_detail.nhn?bid=14097515)

* [[아이템 5] 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라](https://velog.io/@ajufresh/%EC%95%84%EC%9D%B4%ED%85%9C-5-%EC%9E%90%EC%9B%90%EC%9D%84-%EC%A7%81%EC%A0%91-%EB%AA%85%EC%8B%9C%ED%95%98%EC%A7%80-%EB%A7%90%EA%B3%A0-%EC%9D%98%EC%A1%B4-%EA%B0%9D%EC%B2%B4-%EC%A3%BC%EC%9E%85%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%9D%BC-rv280ch8)