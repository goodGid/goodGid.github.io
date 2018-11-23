---
layout: post
title:  " next()와 nextLine() 비교 "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}


* String 클래스에 Scanner를 사용하여 입력시 next와 nextLine에 차이에 대해 알아보자.




## next()

* 문자 또는 문자열을 공백을 기준으로 한 단어 또는 한 문자씩 입력 받는다.

* 개행문자, 공백은 무시하고 문자를 입력받는다.


 
![](/assets/img/java/java_next_vs_nextline_1.png)

``` java
Scanner s = new Scanner("\n\ntest\nhoho\n");

while (s.hasNext()) {
    System.out.println("출력: " + s.next());
}
// <결과>
// 출력: test
// 출력: hoho
```


---


## nextLine()

* 문자 또는 문장 한라인 전체를 입력받는다.

* 한 줄 단위로 입력받기 때문에 개행문자도 한 줄로 인식한다.



![](/assets/img/java/java_next_vs_nextline_2.png)

``` java
// nextLine()
Scanner s = new Scanner("\n\ntest\nhoho\n");

while (s.hasNext()) {
    System.out.println("출력: " + s.nextLine());
}
// <결과>
// 출력:
// 출력:
// 출력: test
// 출력:
// 출력: hoho
// 출력:
```


---






---

## 참고

* [JAVA String 입력 시 next()와 nextLine()의 차이](http://enter.tistory.com/105)

* [자바 기초. next(), nextLine() 차이점.](https://jicjjang.github.io/2015/08/28/java-foundation1/)