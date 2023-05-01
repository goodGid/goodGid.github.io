---
layout: post
title:  " Gradle에서 compileOnly와 implementation 차이에 대해 아시나요? "
categories: Gradle
author: goodGid
---
* content
{:toc}

## Question

* Gradle에서 compileOnly와 implementation 차이에 대해 아시나요?


---

## 개념 정의

* compileOnly와 implementation은 Gradle 프로젝트에서 의존성을 정의할 때 사용되는 키워드이다.


### compileOnly

* compileOnly는 **컴파일 타임**에만 필요한 의존성을 정의하는 데 사용한다.

* 즉 해당 라이브러리의 클래스와 메소드를 사용하기 위해 
  
  사용하려는 라이브러리가 
  
  컴파일 타임에만 필요하고 런타임에는 필요하지 않을 때 사용한다.

  그러므로 compileOnly 키워드로 정의한 의존성은 JAR 파일에 포함되지 않는다.

> Example

``` java
dependencies {
    compileOnly 'javax.servlet:servlet-api:2.5'
}
```

* 위 의존성은 서블릿 API에 대한 인터페이스 및 클래스를 제공하는 라이브러리이다. 

* 그런데 compileOnly로 선언을 해도 되는 이유는

  서블릿 컨테이너에서 제공하는 라이브러리에 이미 포함이 되어 있으므로

  어플리케이션을 서블릿 컨테이너에 배치할 때

  서블릿 컨테이너가 제공하는 servlet-api.jar를 사용하여 
  
  서블릿 API에 대한 인터페이스 및 클래스에 액세스 할 수 있다.

  그 결과 런타임 환경에서도 문제없이 사용할 수 있다.

---

### implementation

* implementation은 **컴파일 타임**과 **런타임**에 모두 사용한다.

* 즉 해당 라이브러리의 클래스와 메소드를 사용하기 위해 
  
  사용하려는 라이브러리가 
  
  컴파일 타임에 필요하고 런타임에도 필요할 경우 사용한다. 
  
  그러므로 implementation 키워드로 정의한 의존성은 JAR 파일에 포함된다.


---

### 같이 알아두면 좋을 개념

```
- implementation: 의존 라이브러리 수정 시 본 모듈까지만 재빌드
- api: 의존 라이브러리 수정 시 본 모듈을 의존하는 모듈들도 재빌드
- compileOnly: compile 시에만 빌드하고 빌드 결과물에는 포함하지 않음
- runtime 시 필요 없는 라이브러리인 경우 (runtime 환경에 이미 라이브러리가 제공되고 있는가 하는 등의 경우)
```