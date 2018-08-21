---
layout: post
title:  " 함수 이해하기  "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}




## Understanding functions

자바스크립트에서 함수는 `일급 객체`다. 이 말은 함수 자체가 객체이기 때문에 객체로서 

조작, 또는 기본 Object 클래스에 함수를 추가하거나 프로퍼티를 확장하는 일이 가능하다는 뜻이다.




``` js
//1
function sayHello(){            
    console.log('Hello!);
}


//2 
var sayHello = function() {   
    console.log('Hello!);
}

```


위 예제에서 2가지 메소드는 거의 동일하다.

1.첫 번째 메소드는 함수를 정의하는 가장 흔한 방법으로, `기명 함수(Named Function)`라고 부른다.

2.두 번째는 `함수 표현(Function Expression)`이라고 하는데, 익명 함수의 참조를 변수에 저장하고 익명으로 유지한다. 

두 접근 방법의 차이점 중 가장 중요한 한 가지는 `자바스크립트 호이스팅(JavaScript Hoisting)`이라고하는 개념과 관련이 있다.

기본적으로 함수 표현 방법을 적용할 때 생기는 차이는, 함수가 그것이 속해 있는 Scope에서 함수 정의 부분이 실행되기 전까지는 접근이 불가능하다는 점이다.

기명 함수 방법을 사용한다면 정의하는 위치와 관계없이 다음 코드와 같이 그것이 속해 있는 Scope 어디에서나 접근 가능하다.




``` js
one(); // Hello를 출력
two(); // 정의 부분이 나오지 않았으므로 에러가 발생

function one(){            
    console.log('Hello!);
}


var two = function() {   
    console.log('Hello!);
}

two(); // Hello를 출력

```


위의 코드에서 함수 one은 부모 Scope 어디에서나 호출 가능하다.

그러나 함수 two는 그 표현식이 정의되기 전까지는 접근할 수 없다.


---

## What is JavaScript Hoisting ?

자바스크립트 인터프리터가 스크립트 실행 전에 함수와 변수의 정의를 그것이 속해 있는 Scope의 제일 상단으로 이동시키는 행동이다.

이전의 `기명 함수` 예제와 같이 `함수 정의`가 Scope 최상단으로 이동한다. 

그러나 `함수 표현 방법`의 경우 변수의 선언 부분만 Scope의 상단으로 이동되는 동시에 

해당 함수의 실행 부분에 다다르기 전까지는 Undefined 타입으로 설정된다.

---


## Resources 

* Node.js와 몽고DB로 웹 개발 시작하기 (p71)