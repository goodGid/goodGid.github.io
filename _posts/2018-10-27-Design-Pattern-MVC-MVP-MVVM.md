---
layout: post
title:  " MVC / MVP / MVVM "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## 프레임워크 패턴

> 공통점은 화면에 보여주는 로직과 실제 데이터가 처리 되는 로직을 분리한다.









---

## MVC


![](/assets/img/posts/design_pattern_mvc_mvp_mvvm_1.png)


> Model

* 프로그램에서 사용되는 실제 데이터 및 데이터 조작 로직을 처리하는 부분이다.



> View

* 사용자에게 제공되어 보여지는 UI 부분이다.

* 실제 사용자가 눈으로 보고 있는 화면이라고 생각하면 된다.

* 웹이라면 웹페이지, 모바일 어플의 화면이 View에 해당한다.



> Controller

* 사용자의 입력을 받고 처리하는 부분이다.




> Summary

1. Controller로 사용자의 입력이 들어온다.

2. Controller는 Model에 Update 및 Get 요청을 한다.

3. Model은 해당 데이터를 보여줄 View를 선택해서 화면에 보여준다.

<br>

* MVC는 **단점**이 있다. 

* View와 Model이 **서로 의존적**이라는 점이다.

* 각각의 서로 **의존성**은 최대한 줄여야한다.

* 그런 노력에서 나온 프레임 워크가 **MVP 패턴**이다.

<small> (이해가 안된다면 MVVM에 있는 예시를 읽어보자) </small>



---

## MVP

![](/assets/img/posts/design_pattern_mvc_mvp_mvvm_2.png)

> Presenter

* View에서 요청한 정보를 Model로 부터 가공해서 View로 전달하는 부분이다.

* Model과 View는 MVC와 동일하다.

* 하지만 사용자의 입력은 View에서 받는다.

* 그리고 Model과 View는 각각 Presenter와 상호 동작을 하게된다.

* 즉 항상 Presenter을 거쳐서 동작을 한다.

* 그러므로 View와 Model은 서로에 대해 알 필요가 없다. <br> 단지 Presenter만 알면 된다.

* 그래서 MVC의 단점인 View와 Model의 의존성이 없어지게 된다.

> Summary

1. View로 사용자의 입력이 들어온다.

2. View는 Presenter에 작업 요청을 한다.

3. Presenter에서 필요한 데이터를 Model에 요청한다.

4. Model은 Presenter에 필요한 데이터를 응답한다.

5. Presenter는 View에 데이터를 응답한다.

6. View는 Presenter로부터 받은 데이터로 화면에 보여주게 된다.

<br> 

* 이런 MVP도 **단점**이 있다. 

* View와 Model은 의존성이 없는 대신 <br> View와 Presenter가 **1:1로 강한 의존성**을 가지게 된다.

* 이런 단점을 해결하기 위해 **MVVM이라는 패턴**이 등장한다.




---

## MVVM

![](/assets/img/posts/design_pattern_mvc_mvp_mvvm_3.png)

* MVVM은 WPF나 SilverLight에서 많이 사용되는 프레임워크 패턴이다.

> View Model

* View를 표현하기 위해 만들어진 View를 위한 Model이다.

* MVVM은 **두가지 디자인 패턴**을 사용한다. 

* **Command 패턴**과 **Data Binding 패턴**이다.

* 이 두가지 패턴으로 인해 View와 ViewModel은 **의존성**이 완전히 사라지게 된다.

* MVP와 마찬가지로 **View에서 입력**이 들어온다.

* 입력이 들어오면 **Command 패턴**을 통해 **View Model**에 명령을 내리게 된다.

* 그리고 Data Binding으로 인해 View Model의 값이 변화하면 **바로 View의 정보**가 바뀌게 된다.

* 여기서 Data Binding은 VM의 어떤 값이 바뀌면 <br> 그것과 Binding되어 있는 View의 속성도 동시에 바뀌게 된다로 이해하면 된다.

```
View의 A라는 속성과
View Model의 B라는 속성을 
Biding 시킨 상태라고 하면
B의 속성을 변경 시
A의 속성은 자동으로 Binding되어 있기 때문에 
동시에 변경이 된다.
```

* MVVM의 이해를 높이기 위한 예를 들어보자.

```
주소를 서울에서 인천으로 수정할 경우

텍스트박스에서 주소를 수정하고 저장을 누르면 
인천으로 저장되어야 한다. 

그리고 그 과정은 UI에서 저장을 누르면 
UI는 변경된 텍스트값을 알고있는 상황이다.

하지만 현재까지 vm이나 m(data 처리 객체)은 변경된 값을 모른다. 
이런 경우 MVC에서는 
컨트롤러가 이미 뷰와 모델을 모두 참조로 가지고 있기 때문에 
컨트롤러에서 텍스트박스의 값을 직접 m으로 넘겨줘서 저장하도록 한다. 

컨트롤러에는 
string addr = view.toString(); 
model.save(addr); 이런식의 코드가 존재하게 된다.

그런데
만약 view가 변경되어서 
텍스트박스의 이름이 바뀌거나 없어지면 어떻게 될까?

컨트롤러 내부 코드중 view.toString()이라는 부분은
명시적으로 view에 의존하기 때문에 문제가 발생한다.

MVVM패턴에서는 vm이 view에 의존하지 않도록 한다.
view에서는 어차피 주소를 출력하려면 vm을 접근해야한다.

이 때 주소를 변경할 경우
view가 직접 vm의 속성인 주소값을 변경해 주고 
(vm의 속성을 변경시키는 작업은 Command 패턴을 이용해 이뤄진다.)
vm은 그저 자신의 속성인 주소 값을 
model.save(this.주소) 이런식으로 처리를 시키면 된다.
```


> Summary

1. View에 입력이 들어오면 Command 패턴으로 View Model에 명령을 내린다.

2. View Model은 필요한 데이터를 Model에 요청한다.

3. Model은 View Model에 필요한 데이터를 응답한다.

4. View Model은 응답 받은 데이터를 가공해서 저장한다.

5. View는 View Model과의 Data Binding으로 인해 자동으로 갱신된다.

<br>

* Command를 통하여 Behavior를 View의 특정한 ViewAction(Event)와 연결시킨다.

* 특정 View의 속성을 View Model의 속성과 **Binding**시켜 <br> **View Model 속성**이 변경 시 View를 업데이트 시켜준다.

* 역시나 MVVM에도 **단점**이 있다. 

* 단순하지만 결정적인 단점. 

* 바로 구현하기가 어렵다는 단점이 있다.


---

## 참고

* [MVC, MVP, MVVM 비교](https://magi82.github.io/android-mvc-mvp-mvvm/)

* [[WPF] MVC, MVP, MVVM 차이점](http://hackersstudy.tistory.com/71)

* [MVVM 패턴에 대해서...](https://blog.outsider.ne.kr/672)

* [MVC, MVP, MVVM 디자인 패턴이란](http://plzhoney.tistory.com/7)