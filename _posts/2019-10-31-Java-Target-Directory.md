---
layout: post
title:  " Target 디렉토리(Directory)는 언제 생성될까? "
categories: Java
author: goodGid
---
* content
{:toc}

## Question

* Java를 프로젝트를 생성하고 

* 작업을 하다보면 좌측에 

* 코드 디렉토리에 **target** 폴더가 생성된다.

* *이 디렉토리는 언제 생성될까?*

* 라는 궁금증이 생겼다.





---

## Create

* 처음 프로젝트를 생성하면 일반적으론 다음과 같은 구조를 보인다.

![](/assets/img/java/Java-Target-Directory_1.png)

* 그리고 열심히 코딩을 한 후 

* 빌드 버튼을 눌러보면 

![](/assets/img/java/Java-Target-Directory_2.png)

* 좌측 디렉토리에 약간의 변화가 생긴다.

* 바로 target 폴더가 생성된다.

![](/assets/img/java/Java-Target-Directory_3.png)

* 그리고 resources 폴더 하위에 

* 파일을 추가하게 한 후 

![](/assets/img/java/Java-Target-Directory_4.png)

* 다시 빌드 버튼을 누르게 되면

* Target 폴더에

* resources 폴더에 추가한

* *text.txt* 라는 파일이 추가된다.

![](/assets/img/java/Java-Target-Directory_5.png)

---

## Summary

* 정리하자면

* 코드를 빌드하면

* Target 디렉토리가 생성되고

* 그 디렉토리 하위에 resource가 생성된다.