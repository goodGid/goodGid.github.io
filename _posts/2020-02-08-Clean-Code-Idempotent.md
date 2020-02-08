---
layout: post
title:  " CleanCode : Property를 Set하고 넘길까? 넘겨서 Set할까? "
categories: CleanCode
tags: CleanCode
author: goodGid
---
* content
{:toc}

## Prologue

* 회사에서 

* Code Reivew를 하는데

* 받았던 Feed Back이였는데

* 기록해두고 싶은 생각이 들었다.









## Situation

* 특정 값을 Update를 해줘야하는 상황이다.

* = runner()가 update()를 호출하는 구조이다.


## Example

* 실제 Product Project는 

* Code Line도 많고 복잡하지만

* Example은 심플하게 구성하였다.

> Before

* 다음과 같이 Coding 후 Pull Request를 요청했다.

``` java
public void X_runner(){
    Person person = new Person();
    X_updatePerson(person);
}

public void X_updatePerson(Person person){
    Person p = getPersonFromDB(person.getPk());
    p.setName(Person.writer);
    updatePersonToDB(p);
    person.setName(Person.writer);
}

@Getter
@Setter
public static class Person{
    public static String writer = "goodGid";
    public int pk;
    public String name;
}

public Person getPersonFromDB(int pk){
    // get From Person Object to DB using pk value
    return new Person();
}

public void updatePersonToDB(Person person){
    // update Person to DB
}
```

* X_runner()에서 person 객체를 넘기고

* X_updatePerson()에서 DB Update 후

* 입력받은 person 객체에 값을 set해준다.


> After

* PR Reivew 후 수정한 Code이다.

``` java
public void O_runner(){
    Person person = new Person();
    person.setName(Person.writer);
    O_updatePerson(person);
}

public void O_updatePerson(Person person){
    Person p = getPersonFromDB(person.getPk());
    p.setName(person.getName());
    updatePersonToDB(p);
}

@Getter
@Setter
public static class Person{
    public static String writer = "goodGid";
    public int pk;
    public String name;
}

public Person getPersonFromDB(int pk){
    // get From Person Object to DB using pk value
    return new Person();
}

public void updatePersonToDB(Person person){
    // update Person to DB
}
```

* runner()에서 값을 set 해준 후 

* person 객체를 update()에 넘겨줬다.

* 그리고 update()에서는

* update만 해주게 된다.


## So What

* 사실 동작에 있어서 차이는 없다.

* 또한 위 코드만 봤을때

* 2가지 방법다 굉장히 심플하고 이해하기 명료하다.

<br>

* 하지만

* Before과 같이 Coding을 하였다면

* 몇가지 고려해볼법한 Point들이 있었고

* 실제로 다음과 같은 Review를 받았다.

```
// 전제 
// Example Code처럼 Code Line이 적은게 아니라 
// 실제 Product 환경 속에서 
// 엄청나게 방대한 양의 Code가 있는 상황이다.

기용님은 직접 작업을 하셨기 때문에 

update()안에서 어떤 동작을 하는지 알지만

다른이가 runner()를 봤을 때

name값이 null 인지 

어디선가 setting이 되는지 모르는 상황이에요.

그걸 알기 위해선 

update()안에 들어가서 확인을 해봐야해요.



만약 update()를 보지않고 

넘어가게 된다면 

문제가 될 수 있는 Point가 될 수 있어요.



누군가가 update() 이후에 

name값이 없으니 set을 해줘야겠다 생각하고

임의의 다른 값으로 set을 해버리면

문제가 될 수 있죠.


그렇기 때문에

update()를 호출하기전에 

명시적으로 name을 set해주는게

좋을 수도 있다고 생각해요.
```

<br>

* Coding Style은 정답이 없기 때문에

* 무엇이 맞고 틀리다는건 없다고 생각한다.

<br>

* 하지만 

* 이 Reiview를 받고나서

* 전적으로 동의를 하였다.

<br>

* 협업을 하는 입장에서

* 다른 사람을 배려하는 Coding Style은 굉장히 바람직하다 생각이 든다.

<br>

* 또한 문제가 될 수 있는 Point들은 

* 최대한 사전에 제거하는게 좋다 생각한다.


## Summary

* 별거 아니지만

* 별거아닌 것들이

* 큰 차이를 만든다. 

<br>

* 단순히 기능 동작에 포커스를 맞추는게 아니라

* 그 이상을 바라보고 생각하고 배려하는 자세를 기르는게

* 진짜 일을 잘하는 사람이 아닐까? 란 생각이 들었다.

<br>

* 몰라서 모르고 못했던 것들을

* Code Review를 통해 깨닫을 수 있어서 감사하다.

<br>

* 깨달음을 주었던 

* 팀원분들에게 너무나 감사하다.

<br>

* 이글을 보진 않겠지만

* 기억을 하기 위해서 기록해두고 싶다.

* Thank you to **mookie**, **lucky.donggyu** ! 

