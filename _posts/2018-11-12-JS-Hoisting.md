---
layout: post
title:  " 호이스팅(Hoisting) "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

## 호이스팅(Hoisting)

* JS는 **변수 선언**과 **함수 선언**을 위로 끌어 올린다.

* 코드 전반에 걸쳐 선언된 부분을 위로 끌어 올리는 작업을 **호이스팅**이라 한다.








* 이런 성질을 모르는 상태에서 다음 사진을 보면 오류가 발생된다고 생각할 수 있다.

![](/assets/img/javascript/js_hoisting_1.png)

* 하지만 실제로는 호이스팅에 의해 다음과 같이 코드가 재배치된 것 처럼 동작한다.

![](/assets/img/javascript/js_hoisting_2.png)

* 주의할점은 **할당**은 호이스팅에 해당 사항이 아니다.

``` js
b = function bb(){
    return 'bb';
}

c = function (){
    return 'c';
}
```
* 반면 함수 선언인 function a()는 호이스팅에 의해 위로 끌어올려진다.

``` js
function a(){
    return 'a';
}
```

