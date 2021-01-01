---
layout: post
title:  " String, StringBuffer, StringBuilder의 특징 및 비교 "
categories: Java
author: goodGid
---
* content
{:toc}

## Java에서의 String

> String, StringBuffer, StringBuilder의 장단점 및 차이점

* 이들의 공통점은 모두 **String(문자열)을 저장하고 관리하는 클래스들**이다.

* 어떤 차이점이 있을까?

* String과 (StringBuffer, StringBuilder)의 차이점은

  String은 **immutable(불변)**하고 
  
  StringBuffer, StringBuilder는 **mutable(가변)**하다는 점이다.



---

## String Class

* String은 **new 연산을 통해 생성되면 그 인스턴스의 메모리 공간은 절대 변하**지 않는다.

  그래서 `+` 연산이나 concat을 이용해서 문자열에 변화를 줘도 **메모리 공간이 변하**는 것이 아니라 

  새로운 String 객체를 **new로 만들어서 새로운 메모리 공간**을 만드는 것이다.

* 이렇게 새로운 문자열이 만들어지면 

  **기존의 문자열은 가비지 콜렉터에 의해 제거돼야 하는 단점**(언제 제거될지 모름)이 있다.

  또한 이러한 **문자열 연산이 많아질 때 계속해서 객체를 만드는 오버헤드가 발생**하므로 성능이 떨어질 수밖에 없는 단점이 있다. 

* 대신 String 클래스의 객체는 불변하므로

  **단순 조회 연산에서는 타 클래스보다 빠르게 읽을 수 있는 장점**이 있다.

  또한 불변하므로 **Multi Thread 환경에서 동기화**를 신경 쓸 필요가 없다는 장점이 있다.

> Conclusion

* 문자열 연산 적음 && 조회 많음 && Multi Thread 환경 --> String

---

## StringBuffer와 StringBuilder

* StringBuffer와 StringBuilder 클래스는 String과 다르게 **mutable(가변)**하다.

* 즉 문자열 연산에서 클래스를 **한 번만 만들고(new)**

  연산이 필요할 때 **크기를 변경**시켜서 문자열을 변경한다.

* 그러므로 **문자열 연산이 자주 있을 때** 사용하면 성능이 좋다.

  심지어 StringBuffer와 StringBuilder **클래스의 Method들이 같으므로 호환**이 가능하다.

---

### 차이점

* StringBuffer는 Multi Thread 환경에서 **synchronized 키워드가 가능하므로 동기화**가 가능하다.

  즉 **thread-safe**하다.

* 반면 StringBuilder는 **동기화를 지원하지 않기** 때문에 Multi Thread 환경에서는 적합하지 않다.

* 대신 StringBuilder는 동기화를 고려하지 않으므로 

  **Single Thread 환경에서 StringBuffer에 비해 연산 처리**가 빠르다.

> Conclusion

* 문자열 연산 많음 && Multi Thread 환경 --> StringBuffer 

* Single Thread 또는 Thread를 신경 쓰지 않아도 되는 환경 --> StringBuilder

---

## Summary

* **String 클래스**는 불변 객체이므로 

  문자열 연산이 많은 프로그래밍에서는 지속해서 인스턴스를 생성하므로 성능이 떨어지지만

  조회가 많은 환경과 Multi Thread 환경에서 성능적으로 유리하다.

* **StringBuffer 클래스**와 **StringBuilder 클래스**는 

  문자열 연산이 자주 발생할 때 문자열이 변경 가능한 객체이므로 성능적으로 유리하다.

* StringBuffer와 StringBuilder의 차이점은 

  **동기화 지원의 여부**이다.

  동기화를 고려하지 않는 환경에선 StringBuilder가 성능이 더 좋고

  동기화가 필요한 Multi Thread 환경에서는 StringBuffer를 사용하는 것이 유리하다.

* 따라서 문자열 연산이 많지만 엄청나게 일어나지 않는 환경이라면 

  StringBuffer를 사용해서 thread-safe 한 것이 좋다고 볼 수 있다.

* JDK 1.5 이상부터 String에서 `+` 연산으로 작성하더라도 

  StringBuilder로 Compile 하게 만들어 놨지만

  여전히 String 클래스의 객체 생성하는 부분을 같으므로 

  StringBuffer, StringBuilder 사용이 필요하다.


---

## Reference

* [JAVA String, StringBuffer, StringBuilder 차이점](http://jeong-pro.tistory.com/85)