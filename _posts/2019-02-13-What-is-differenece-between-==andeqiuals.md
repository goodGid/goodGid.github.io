---
layout: post
title:  " '=='와 equals()의 차이 "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

* 개발을 하면서 **==**와 **equals()**의 차이점에 대해 궁금증이 생겼다.

* 그래서 차이점에 대해 공부해보자.

* 결론부터 말하자면 **==**는 주소값을 비교하는 것이고 **equals()**는 값을 비교하는 것이다.

* 이와 관련된 Stack Overflow에 질문에 답을 발췌했다.

* 꾸준히 영어 문서를 읽으면서 Reading 능력을 향상시켜야겠다.

* 그런 의미로 아래 영어 원문을 읽어보자 !






---


> Q. What is the difference between == and equals() in Java?

* A1

```
== -> is a reference comparison, i.e. both objects point to the same memory location
.equals() -> evaluates to the comparison of values in the objects
```

* A2

```
The equals() method compares the "value" inside String instances (on the heap) irrespective if the two object references refer to the same String instance or not. If any two object references of type String refer to the same String instance then great! If the two object references refer to two different String instances .. it doesn't make a difference. Its the "value" (that is: the contents of the character array) inside each String instance that is being compared.

On the other hand, the "==" operator compares the value of two object references to see whether they refer to the same String instance. If the value of both object references "refer to" the same String instance then the result of the boolean expression would be "true"..duh. If, on the other hand, the value of both object references "refer to" different String instances (even though both String instances have identical "values", that is, the contents of the character arrays of each String instance are the same) the result of the boolean expression would be "false".
```


* A3

```
.equals(...) will only compare what it is written to compare, no more, no less.

If a class does not override the equals method, then it defaults to the equals(Object o) method of the closest parent class that has overridden this method.
// 이 메소드를 오버라이드(override) 한 가장 가까운 부모 클래스의 equals (Object o) 메소드가 디폴트로 설정된다.

If no parent classes have provided an override, then it defaults to the method from the ultimate parent class, Object, and so you're left with the Object#equals(Object o) method. 
// 가장 루트의 부모 클래스인 Object에서 메소드가 기본값이므로 Object # equals (Object o) 메소드가 남게된다.

Per the Object API this is the same as == 
// Object API에 따라 이것은 ==와 동일하다.

that is, it returns true if and only if both variables refer to the same object, if their references are one and the same. 
// 두 변수가 동일한 객체를 참조하는 경우에만 해당 참조가 동일하고 동일한 경우 true를 반환한다.

Thus you will be testing for object equality and not functional equality.

Always remember to override hashCode if you override equals so as not to "break the contract". 
// 계약을 깨뜨리지 않도록 equals를 재정의하는 경우 항상 hashCode를 재정의해한다.
// "so as not to" :
// This is a more formal way to say "in order to avoid [-ing]" or "so I don't"/"so he doesnt"/etc. 

--> Example: 
1. I'm studying so as not to fail the exam. 
2. I'm studying to avoid failing the exam. 
3. I'm studying so I don't fail the exam. 

As per the API, 
// API마다, 

the result returned from the hashCode() method for two objects must be the same if their equals methods show that they are equivalent. 
// 2개 객체의 hashCode() 메소드로부터 돌려 주어진 결과는 같아야한다.
// equals 메소드가 등가 인 것을 나타내는 경우에

The converse is not necessarily true.
// 반대는 반드시 true일 필요는 없다.
```





---

## 참고

* [What is the difference between == and equals() in Java?](https://stackoverflow.com/questions/7520432/what-is-the-difference-between-and-equals-in-java/7520464#7520464)

* [so as not to은 무슨 뜻인가요?](https://hinative.com/ko/questions/3288005)