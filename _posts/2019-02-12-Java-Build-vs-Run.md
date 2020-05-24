---
layout: post
title:  " Build와 Run의 차이 "
categories: Java
author: goodGid
---
* content
{:toc}

* 프로젝트를 실행시킬 때 사용하는 Build와 Run의 차이에 대해 알아보자.






---

## 차이점

> Q. What's the difference between build and run?

![](/assets/img/java/java_build_vs_run_1.png)



<br>

> Q. What is the difference between build, run and compile?

```
Compile technically means translating one formal language into another. For programming languages it often means translating source code into machine instructions. However notice that Java is compiled into Java bytecode (the instruction set of the JVM) and some compilers compile to some other language. 
CFront (the original C++ compiler) compiled C++ to C.
The key to compiling is language translation.

The term Build is used to refer to a series of steps that put together some software deliverable. For example it usually includes compile as a single step and may then link components and previously compiled code libraries as well as bringing together other resources, assets and data into a distributable package.

Run is the process of executing a program.
Build usually includes one or more compile steps and once an application has been built it can be run.
```





---

## 참고

* [What's the difference between build and run?](https://teamtreehouse.com/community/whats-the-difference-between-build-and-run)

* [What is the difference between build, run and compile?](https://www.quora.com/What-is-the-difference-between-build-run-and-compile)