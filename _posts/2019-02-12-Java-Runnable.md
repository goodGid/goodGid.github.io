---
layout: post
title:  " Runnable Docs 읽어보기 "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

* Runnable Interface의 Oracle Docs를 해석해보자.

* English Reading 능력의 중요성을 다시한번 느끼게됐다.






---

## Interface Runnable

> public interface Runnable

```
The Runnable interface should be implemented by any class whose instances are intended to be executed by a thread. 
// Runnable 인터페이스는 어떤 클랙스에 의해 구현 되어야만 한다.
// 어떤 클래스? 
// thread에 의해 인스턴스가 실행되는 모든 클래스

The class must define a method of no arguments called run.
// 클래스는 run이라는 arguments가 없는 메소드를 정의해야한다.

This interface is designed to provide a common protocol for objects that wish to execute code while they are active. 
// 이 인터페이스는 객체에 대한 공통적인 프로토콜을 제공하기위해 설계되었다.
// 어떤 객체?
// 활성화 된 상태에서 코드를 실행하려는 객체

For example, Runnable is implemented by class Thread. 
Being active simply means that a thread has been started and has not yet been stopped.
// 예를 들어 Runnable는 Thread 클래스에 의해 구현된다. 
// 활성화되는 것은 단순히 Thread가 시작되었고 아직 멈추지 않았음을 의미한다.

In addition, Runnable provides the means for a class to be active while not subclassing Thread. 
// 게다가 Runnable는 클래스의 수단을 제공합니다.

A class that implements Runnable can run without subclassing Thread by instantiating a Thread instance and passing itself in as the target. 
// Runnable를 구현 한 클래스는 Thread를 서브클래싱하지 않고 실행할 수 있다.
// 어떤 Thread?
// Thread 인스턴스를 인스턴스화하고 자신을 대상으로 전달하는 Thread

In most cases, the Runnable interface should be used if you are only planning to override the run() method and no other Thread methods. 
// 대부분의 경우 Runnable 인터페이스를 사용할 필요가 있다.
// 언제?
// run() 메소드와 다른 Thread 메소드를 오버라이드(override)할 계획인 경우


This is important because classes should not be subclassed unless the programmer intends on modifying or enhancing the fundamental behavior of the class.
// 클래스가 서브 클래싱되지 않아야하기 때문에 이것은 중요하다.
// 프로그래머가 클래스의 기본 동작을 수정하거나 향상시키려는 경우가 아니라면
```

---

## Method Detail

> void run()

```
When an object implementing interface Runnable is used to create a thread, 
// Thread를 생성하기 위해 Runnable 인터페이스를 구현하는 객체가 사용되는 경우

starting the thread causes the object's run method to be called in that separately executing thread.
// 스레드를 시작하면 객체의 run 메소드가 발생한다.
// 별도로 Thread를 실행시키는 run 메소드


The general contract of the method run is that it may take any action whatsoever.
// 메소드 실행의 일반적인 계약은 어떤 조치도 취할 수 있다는 것이다.

See Also:
Thread.run()
```


---

## 참고

* [Interface Runnable](https://docs.oracle.com/javase/7/docs/api/java/lang/Runnable.html)