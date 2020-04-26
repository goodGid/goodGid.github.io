---
layout: post
title:  " [Ubuntu] Ubuntu에서 JSP 프로젝트 실행하기 : JSP 환경 변수 설치 "
categories: Linux
author: goodGid
---
* content
{:toc}

## Concept

### APT

* Advanced Packaging Tool

```
1. Ubuntu에 내장 된 프로그램을 이용하여 필요 프로그램을 설치/삭제
```

---

### JRE

* Java Runtime Environment 

```
1. 컴파일된 자바 프로그램을 실행시킬 수 있는 자바 환경을 뜻한다.
2. 자바 프로그램을 실행시키려면 JRE를 반드시 설치해야 한다.
3. JRE 안에 자바 프로그래밍 도구는 없다.
   자바 프로그래밍을 하기 위해서는 위의 JDK를 받아야 한다.
```

---

### JDK

* Java Development Kit

```
1. 자바 개발 도구이다.
2. 자바 프로그래밍을 할 때 필요한 컴파일러 등이 있다.
3. JDK를 설치했다면 JRE도 같이 설치된다.
4. JDK = JRE + 개발툴
```




---

## Install

1. APT 목록 업데이트

2. JRE 설치

3. JDK 설치

4. Apache Tomcat 설치

---


### APT

* 패키지 목록 갱신 

``` shell
apt-get update
```

* 설치 되어있는 프로그램을 최신 버전으로 Upgrade

``` shell
apt-get upgrade
```

### JRE

* JRE 설치

``` shell
apt-get install openjdk-8-jre-headless
```

* JRE 버전 체크

``` shell
java -version
```


### JDK

* JDK 설치

``` shell
apt-get install openjdk-8-jdk
```


* JDK 버전 체크

``` shell
javac -version
```



### Apache Tomcat

* Tomcat 설치 

``` shell
apt-get install tomcat8
```

* Tomcat 버전 체크 

``` shell
/usr/share/tomcat8/bin/version.sh
```


---



## Start JSP Project

> OS : Ubuntu Server 16.04 LTS

* URL : http:// localhost:8080

* /var/lib/tomcat8/webapps/ROOT에 index.jsp을 두고 실행시키면 된다. 



---



## Feed Back

* Tomcat은 설치되면 자동으로 실행이 된다.

* 일부러 Tomcat을 Stop시켰는데 Restart가 안되는 이슈가 발생했다.

  그래서 Tomcat을 삭제하고 다시 설치했다. 
  
  가능하면 Stop시키지 말자 !














