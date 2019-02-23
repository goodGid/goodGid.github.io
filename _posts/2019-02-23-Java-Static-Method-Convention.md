---
layout: post
title:  " 자주 사용하는 정적(Static) 메소드 컨벤션 "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

## 정적 메소드 컨벤션 

* from : 하나의 매개변수로 해당 타입의 인스턴스를 반환 <br> ex) Date.from(instance)

* of : 여러개의 매개변수로 적합한 인스턴스를 반환  <br> ex) EnumSet.of(A,B,C)

* instatnce or getInstance : 매개변수로 명시한 인스턴스를 반환하지만, 같은 인스턴스임을 보장하지 않음  <br> ex) StackWalker.getInstance(options)

* create or newInstance : 매번 새로운 인스턴스를 반환하는 것을 보장 <br>  ex) Array.newInstance(callObject, arrayList)

* getType : getInstance와 같으나, 생성한 클래스가 아닌 다른 클래스에 [팩터리 메서드](https://ko.wikipedia.org/wiki/%ED%8C%A9%ED%86%A0%EB%A6%AC_%EB%A9%94%EC%84%9C%EB%93%9C_%ED%8C%A8%ED%84%B4)를 정의할 때 사용 <br> ex) Files.getFileStore(path)

* newType : newInstatnce와 같으나, 생성할 클래스가 아닌 다른 클랙스에 [팩터리 메서드](https://ko.wikipedia.org/wiki/%ED%8C%A9%ED%86%A0%EB%A6%AC_%EB%A9%94%EC%84%9C%EB%93%9C_%ED%8C%A8%ED%84%B4)를 정의할 때 사용 <br> ex) Files.newBufferedRader(path)

* type : getType과 newType의 간결한 버전 <br>  ex) Collections.list(someList)

