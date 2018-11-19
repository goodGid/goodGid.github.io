---
layout: post
title:  " Strict 모드 "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

## Strict 개념

* strict 모드는 **코드에 더 나은 오류 검사**를 적용하는 방법이다.

* 예를 들어 strict 모드를 사용하면 암시적으로 선언한 변수를 사용하거나 

* 읽기 전용 속성에 값을 할당 or 확장할 수 없는 개체에 속성을 추가할 수 없다.

* 제한은 이 항목 뒷부분의 [코드에 적용되는 strict 모드의 제한](https://msdn.microsoft.com/ko-kr/library/br230269(v=vs.94).aspx#rest)을 참고하자.

* strict 모드에 대한 추가 정보는 [ECMAScript 언어 사양(5번째 버전)](http://www.ecma-international.org/publications/standards/Ecma-262.htm)을 참고하자.

* strict 모드는 Internet Explorer 10 이전의 Internet Explorer 버전에서 지원되지 않는다.










---

## Strict 선언

* 파일, 프로그램 또는 함수의 시작 부분에 `"use strict";`를 추가하여 

* strict 모드를 선언할 수 있다.

* 이 종류의 선언을 **지시문 프롤로그**라고 한다.

<br>

* strict 모드 **선언 범위는 컨텍스트**에 따라 달라진다.

* 전역 컨텍스트(함수 범위 밖)에서 선언되는 경우 프로그램의 모든 코드에 strict 모드가 적용된다.

* 함수 내에서 선언되는 경우 함수의 모든 코드에 strict 모드가 적용된다.

* 예를 들어 다음 예제에서는 모든 코드에 strict 모드가 적용되며 

* 함수 밖의 변수 선언 시 "strict 모드에서 변수가 정의되지 않았습니다" 구문 오류가 발생한다.



``` js
"use strict";
function testFunction(){
    var testvar = 4;
    return testvar;
}

// This causes a syntax error.
testvar = 5;
```

<br>

* 다음 예제에서는 testFunction 내 코드에만 strict 모드가 적용된다.

* 함수 밖 변수 선언의 경우 구문 오류가 발생하지 않지만 함수 내 선언의 경우 구문 오류가 발생한다.



``` js
function testFunction(){
    "use strict";
    // This causes a syntax error.
    testvar = 4;
    return testvar;
}
testvar = 5;
```



---

## Strict 사용 예제

> strict 모드 사용 O

``` js
function foo() {
  console.log('this is', this)
}

foo() // this is undefined
```

---


> strict 모드 사용 X

![](/assets/img/javascript/js_strict_mode_1.png)

<br>

* Strict 모드를 사용하면 this 객체가 null 또는 undefined일 때 전역 객체로 자동 변환되지 않는다. 

* 만약 Strict 모드를 사용하지 않았다면 undefined 대신 Window가 출력된다.

* 추가적으로 **this**와 관련된 개념 학습은 [JS-This 글]({{site.url}}/JS-This)을 참고 하자.







---

## 참고

* [자바스크립트의 this가 가리키는 것](https://rhostem.github.io/posts/2018-07-20-this-in-javascript/)

* [Strict 모드(JavaScript)](https://msdn.microsoft.com/ko-kr/library/br230269(v=vs.94).aspxㄴ)

