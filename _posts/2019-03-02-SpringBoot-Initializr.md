---
layout: post
title:  " Intellij로 Spring Boot 프로젝트 생성하기 "
categories: Spring
author: goodGid
---
* content
{:toc}

* Intellij로 스프링 프로젝트를 만들 때 Ultimate일 경우 *Spring Initializr* 로 손쉽게 스프링 프로젝트 생성이 가능하다.

![](/assets/img/java/springboot_initializr_1.png)

* 하지만 Community일 경우엔 원하는 빌드로(Mavean, Gradle)로 프로젝트를 생성하고 세팅을 해줘야한다.

* 해당 글에서는 Ultimate와 같은 환경을 직접 셋팅하는 방법에 대해 알아보자.








---

## 프로젝트 생성하기

![](/assets/img/java/springboot_initializr_2.png)

* 위와 같이 원하는 빌드를 선택 --> 프로젝트 생성 경로 지정까지 하면 프로젝트가 생성된다.

* 그러면 우측 하단에 다음과 같은 안내창이 뜬다.

![](/assets/img/java/springboot_initializr_3.png)

* 여기서 Enable Auto-Import를 클릭해준다.

* 이 기능은 pop.xml에 의존성을 추가하면 자동으로 Import해주는 기능이다.

* 프로젝트 생성은 여기서 끝이다. 

* 이제 Spring Boot를 실행시키기 위한 세팅을 진행하자.

---

## 프로젝트 환경 설정

### pop.xml 수정

* [스프링 공식 사이트](https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/htmlsingle/#getting-started-maven-installation)에서 Maven Installation을 위한 코드를 자신의 pop.xml에 Copy & Paste 한다.

``` java
  	<!-- Inherit defaults from Spring Boot -->
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.1.3.RELEASE</version>
	</parent>

	<!-- Add typical dependencies for a web application -->
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
	</dependencies>

	<!-- Package as an executable jar -->
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
```

---

### Package 및 Java 파일 생성

![](/assets/img/java/springboot_initializr_4.png)

* 아마 처음에 위와 같은 구조일 것이다.

* 여기서 Package와 Java 파일을 생성한다. <br> *이 때 Package와 Java 파일명은 원하는 네이밍으로 해도된다.*

![](/assets/img/java/springboot_initializr_5.png)

---

### Java Code 추가

> 1단계 

* @SpringBootApplication를 클래스명 위에 추가한다.

``` java
@SpringBootApplication
public class Application
```


> 2단계

* **psvm**라는 텍스트를 입력 후 엔터를 치면 자동으로 다음과 같은 형태가 생성된다.

``` java
public static void main(String[] args) {
}
```



> 3단계

* main 메소드안에 *SpringApplication.run(Application.class, args);* 코드를 추가해준다.

* 최종적인 구조와 파일 내용은 다음과 같다.

![](/assets/img/java/springboot_initializr_6.png)
 
> 4단계 

* Spring Boot 서버를 실행시켜보자 !!!

![](/assets/img/java/springboot_initializr_7.png)

* `>` 모양의 버튼을 누르고 Run을 누르면 서버가 실행되면서 로그가 출력된다.

![](/assets/img/java/springboot_initializr_8.png)

---

## 정리

* Ultimate일 경우 손쉽게 *Spring Initializr* 를 통해 스프링 프로젝트 생성이 가능하다.

* 하지만 원하는 빌드 툴로 프로젝트 생성 및 셋팅을 하여 직접 스프링 서버를 실행시키는 방법도 숙지하도록 하자! 

---

## Reference

* [스프링 부트 개념과 활용 - 스프링 부트 소개](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8/))
