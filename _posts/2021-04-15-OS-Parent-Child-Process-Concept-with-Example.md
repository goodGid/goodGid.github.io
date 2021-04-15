---
layout: post
title:  " [OS] 부모/자식 프로세스 개념 및 사용법 알아보기 (feat. 다양한 예제) "
categories: OS
author: goodGid
---
* content
{:toc}

> 이 글은 [운영체제 공룡책](https://bit.ly/3myTXlX) 강의를 듣고 정리한 내용입니다.

## 부모 / 자식 프로세스

![](/assets/img/os/OS-Parent-Child-Process-Concept-with-Example_1.png)

* **fork( )** 시스템 콜 명령어를 사용하여

  부모 프로세스로부터 자식 프로세스를 생성한다.

> 공통점

* 부모와 자식은 같은 instruction을 실시한다.

> 차이점

* 부모 프로세스의 pid != 0

  자식 프로세스의 pid == 0 


---

### Example

#### Case 1

![](/assets/img/os/OS-Parent-Child-Process-Concept-with-Example_2.png)

* 5가 출력된다.

  자식 프로세스는 20을 갖게 되지만

  부모 프로세스는 5를 출력한다.
 
* 즉 자식 프로세스의 값은 부모 프로세스에 영향을 끼치지 못한다.

---

#### Case 2

![](/assets/img/os/OS-Parent-Child-Process-Concept-with-Example_3.png)

* 몇 개의 프로세스가 메모리에 존재하게 될까?

  ==> 8개 (= 2^3)

> Step 1.

![](/assets/img/os/OS-Parent-Child-Process-Concept-with-Example_4.png)

> Step 2.

![](/assets/img/os/OS-Parent-Child-Process-Concept-with-Example_5.png)

> Step 3.

![](/assets/img/os/OS-Parent-Child-Process-Concept-with-Example_6.png)

---

#### Case 3

![](/assets/img/os/OS-Parent-Child-Process-Concept-with-Example_7.png)

* 몇 개의 프로세스가 메모리에 존재하게 될까?

  ==> 16개 (= 2^4)


---

## Summary

1. 부모/자식 프로세스 개념 및 특징

2. fork( ) 명령어를 사용하여 부모 프로세스로부터 자식 프로세스를 생성하는 방법

3. (예제를 통한) fork( ) 시 메모리에 프로세스 할당 방식

* 간단하지만 기본이 되는 개념이니 잘 알아두자 !

---

## Reference

* [운영체제 공룡책 강의](https://bit.ly/3myTXlX)
