---
layout: post
title:  " 2019 Dev History "
categories: Retrospective
tags: Retrospective
author: goodGid
---
* content
{:toc}

> 2019년 **Dev History**











## Develop

> [Open Session In View Pattern](http://egloos.zum.com/aeternum/v/2798098) 원문

- 레이어 아키텍처(Layered Architecture)
- 예제 애플리케이션 
- 무대 뒤에서 
- 영속성 컨텍스트, 트랜잭션, 그리고 커넥션 
- 뷰 렌더링에 필요한 객체 그래프 로드 
- POJO FACADE 패턴 
- OPEN SESSION IN VIEW 패턴 
- SPRING의 OpenSessionInViewFilter 
- OpenSessionInViewFilter와 영속성 컨텍스트
- SingleSession = false 설정
- OPEN SESSION IN VIEW는 안티패턴(Anti-Pattern)인가? 
- OPEN SESSION IN VIEW를 사용하라 

> 토비의 스프링 3.1 Vol. 1 스프링의 이해와 원리

- 1장 오브젝트와 의존관계
    - 1.1 초난감 DAO
    - 1.2 DAO의 분리
    - 1.3 DAO의 확장
    - 1.4 제어의 역전(IoC)
    - 1.5 스프링의 IoC
    - 1.6 싱글톤 레지스트리와 오브젝트 스코프
    - 1.7 의존관계 주입(DI)
    - 1.8 XML을 이용한 설정
    - 1.9 정리

- 2장 테스트
    - 2.1 UserDaoTest 다시 보기
    - 2.2 UserDaoTest 개선
    - 2.3 개발자를 위한 테스팅 프레임워크 JUnit
    - 2.4 스프링 테스트 적용
    - 2.5 학습 테스트로 배우는 스프링
    - 2.6 정리

- 3장 템플릿 
    - 3.1 다시 보는 초난감 DAO
    - 3.2 변하는 것과 변하지 않는 것
    - 3.3 JDBC 전략 패턴의 최적화
    - 3.4 컨텍스트와 DI
    - 3.5 템플릿과 콜백
    - 3.6 스프링의 JdbcTemplate
    - 3.7 정리

- 4장 예외	
    - 4.1 사라진 SQLException
    - 4.2 예외 전환
    - 4.3 정리


> 스프링 웹 MVC

* 스프링 MVC 활용 소개
* [요청 맵핑하기 1부 HTTP Method]({{site.url}}/Spring-MVC-Mapping-HTTP-Method)
* [요청 맵핑하기 2부 URI 패턴]({{site.url}}/Spring-MVC-Mapping-URI)
* [요청 맵핑하기 3부 미디어 타입]({{site.url}}/Spring-MVC-Mapping-Media-Type)
* [요청 맵핑하기 4부 헤더와 매개변수]({{site.url}}/Spring-MVC-Mapping-Header-Parameter)
* [요청 맵핑하기 5부 HEAD와 OPTIONS]({{site.url}}/Spring-MVC-Head-Options/)
* [요청 맵핑하기 6부 커스텀 애노테이션(Custom Annotation)]({{site.url}}/Spring-MVC-Custom-Annotation)
* [요청 맵핑하기 6부 Retention 애노테이션]({{site.url}}/Spring-MVC-Retention-Annotation/)
* [요청 맵핑하기 6부 Documented 애노테이션]({{site.url}}/Spring-MVC-Documented-Annotation/)
* [요청 맵핑하기 6부 Target 애노테이션]({{site.url}}/Spring-MVC-Target-Annotation/)
* 요청 맵핑하기 7부 연습 문제
* [핸들러 메소드 1부 Handler Methods : Return Type Values]({{site.url}}/Spring-MVC-Return-Type/)
* [핸들러 메소드 1부 Handler Methods : Argument]({{site.url}}/Spring-MVC-Argument/)
* 핸들러 메소드 2부 URI 패턴
* 핸들러 메소드 3부 요청 매개변수 (단순 타입)
* 핸들러 메소드 4부 폼 서브밋
* [핸들러 메소드 5부 @ModelAttribute]({{site.url}}/Spring-MVC-ModelAttribute)
* [핸들러 메소드 6부 @Valid와 @Validated 애노테이션]({{site.url}}/Spring-MVC-Valid-And-Validated)
* 핸들러 메소드 7부 폼 서브밋 에러 처리
* [핸들러 메소드 8부 @SessionAttributes 애노테이션]({{site.url}}/Spring-MVC-SessionAttributes/)
* 핸들러 메소드 9부 멀티 폼 서브밋
* [핸들러 메소드 10부 @SessionAttribute 애노테이션]({{site.url}}/Spring-MVC-SessionAttribute/)
* 핸들러 메소드 11부 @RedirectAttributes 애노테이션
* 핸들러 메소드 12부 @FlashAttributes 애노테이션
* 핸들러 메소드 13부 MultipartFile
* 핸들러 메소드 14부 파일 다운로드
* [핸들러 메소드 15부 @RequestBody 애노테이션]({{site.url}}/Spring-MVC-RequestBody)
* [핸들러 메소드 15부 HttpEntity]({{site.url}}/Spring-MVC-HttpEntity)
* [핸들러 메소드 15부 HttpMessageConverter 설정하기]({{site.url}}/Spring-MVC-Http-Message-Converter-Setting)
* [핸들러 메소드 16부 @ResponseBody]({{site.url}}/Spring-MVC-Responsebody)
* [핸들러 메소드 16부 ResponseEntity]({{site.url}}/Spring-MVC-ResponseEntity)
* 핸들러 메소드 17부 정리 및 과제
* [@ModelAttribute 또 다른 사용법]({{site.url}}/Spring-MVC-ModelAttribute-Extra-Usage/)
* [데이터 바인더 @InitBinder]({{site.url}}/Spring-MVC-InitBinder)
* [예외 처리 핸들러 @ExceptionHandler]({{site.url}}/Spring-MVC-Exception-Handler)
* [전역 컨트롤러 @ControllerAdvice]({{site.url}}/Spring-MVC-Controller-Advice)
* 스프링 MVC 강좌 마무리


> 스프링 프레임워크 핵심 기술

* IoC 컨테이너 1부/ 스프링 IoC 컨테이너와 빈
* [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : XML 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Bean/)
* [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : XML 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Component-Scan/)
* [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : Java 설정 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Bean/)
* [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : Java 설정 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Component-Scan/)
* [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : @SpringBootApplication]({{site.url}}/Spring-Framework-ApplicationContext-SpringBootApplication-Annotation)
* [IoC 컨테이너 3부/ @Autowire]({{site.url}}/Spring-Framework-Autowired/)
* [IoC 컨테이너 4부/ @Component와 컴포넌트 스캔]({{site.url}}/Spring-Framework-Component-Scan/)
* [IoC 컨테이너 5부/ 빈의 스코프]({{site.url}}/Spring-Framework-Bean-Scope/)
* [IoC 컨테이너 5부/ Proxy 객체를 만드는 방법]({{site.url}}/Spring-Framework-Make-Proxy-Bean)
* [IoC 컨테이너 6부/ Environment 1부. 프로파일]({{site.url}}/Spring-Framework-Environment-Profile)

* [Spring 프레임워크 핵심 기술 - 데이터 바인딩 추상화/ PropertyEditor]({{site.url}}/Spring-Framework-Core-Technology-Data-Bindgin-PropertyEditor)
* [Spring 프레임워크 핵심 기술  - Converter와 Formatter 1부]({{site.url}}/Spring-Framework-Core-Technology-Converter-Formatter-Part-1/)
* [Spring 프레임워크 핵심 기술  - Converter와 Formatter 2부]({{site.url}}/Spring-Framework-Core-Technology-Converter-Formatter-Part-2/)
* [Spring 프레임워크 핵심 기술 - SpEL (스프링 Expression Language)]({{site.url}}/Spring-Framework-Core-Technology-SpEL/)
* [Spring 프레임워크 핵심 기술 - 스프링 AOP : 개념 소개]({{site.url}}/Spring-Framework-AOP-Concept)
* [Spring 프레임워크 핵심 기술 - 스프링 AOP : 적용하기]({{site.url}}/Spring-Framework-Apply-AOP/)
* [Spring 프레임워크 핵심 기술 - 스프링 AOP : 프록시 기반 AOP]({{site.url}}/Spring-Framework-Proxy-AOP/)
* [Spring 프레임워크 핵심 기술 - 스프링 @AOP]({{site.url}}/Spring-Framework-Spring-AOP/)
* Spring 프레임워크 핵심 기술 - Null-Safety
* Spring 프레임워크 핵심 기술 - Outro








---

## January

* LINE 연수로 한달이 지나갔다.

* 2주 공통연수 + 3주 개발연수 

---

## February

> 190211 ~ 190217

* LINE OJT 교육

* **Spring 프레임워크 핵심 기술** 강의 시청
    - 스프링 AOP: 개념 소개
    - 스프링 AOP: 프록시 기반 AOP
    - 스프링 AOP: @AOP
    - Null-Safety
    - Outro

* **Spring 프레임워크 입문** 강의 시청
    - IoC 소개
    - IoC (Inversion of Control) 컨테이너
    - 빈(Bean)
    - 의존성 주입 (Dependency Injection)
        - @Repository 선언이 없는데 Bean 등록이 되는 이유
        - 클래스의 생성자에서 @Autowired 애노테이션이 없어도 Bean 주입이 되는 이유 
    - AOP 소개
    - AOP 적용 예제
        - Repository안에 메소드는 기본적으로 @Transactional 애노테이션이 선언되어있다.
        - 만약 @Transactional(readOnly = true)라고 명시했다면 Override한다는 뜻이다.
    - PSA 소개
    - 스프링 트랜잭션
    - 캐시
    - 웹 MVC
    - 강의 마무리

* **Spring 웹 MVC** 강의 시청
    - 스프링 MVC 소개
    - 서블릿 소개
    - 서블릿 애플리케이션 개발
        - [Servlet의 Life Cycle]({{site.url}}/Java-Servlet-Life-Cycle)
        - Tomcat Deploy 설정시 War와 War Exploded의 차이
            - War : 압축 형태로 톰캣에 배포
            - War Exploded : 압축 해제 형태로 톰캣에 배포
    - 서블릿 리스너와 필터

> 190218 ~ 1902124

* [@Retention Annotation]({{site.url}}/Java-Retention)개념 학습

* [Kerberos](https://ko.wikipedia.org/wiki/%EC%BB%A4%EB%B2%A0%EB%A1%9C%EC%8A%A4)개념 학습

> 190318 ~ 190324

* **스프링 부트 개념과 활용** 강의 시청
    - 스프링 웹 MVC 1부 소개
    - [스프링 웹 MVC 2부 HttpMessageConverters]({{site.url}}/HttpMessageConverts/)
    - 스프링 웹 MVC 3부 ViewResolve
    - [스프링 웹 MVC 4부 정적 리소스 자원]({{site.url}}/How-to-control-Static-Resource/)
    - 스프링 웹 MVC 5부 웹JAR
    - 스프링 웹 MVC 6부 index 페이지와 파비콘

## May

> 190506 ~ 190512

* **스프링 웹 MVC** 강의 시청
    - 스프링 MVC 소개
    - 서블릿 소개
    - 서블릿 애플리케이션 개발
        - [Servlet의 Life Cycle]({{site.url}}/Java-Servlet-Life-Cycle)
        - Tomcat Deploy 설정시 War와 War Exploded의 차이
            - War : 압축 형태로 톰캣에 배포
            - War Exploded : 압축 해제 형태로 톰캣에 배포
    - 서블릿 리스너와 필터

## June

> 190624 ~ 190630

* [Open Session In View Pattern](http://egloos.zum.com/aeternum/v/2798098) 원문
    - 레이어 아키텍처(Layered Architecture)
    - 예제 애플리케이션
    - 무대 뒤에서
    - 영속성 컨텍스트, 트랜잭션, 그리고 커넥션
    - 뷰 렌더링에 필요한 객체 그래프 로드
    - POJO FACADE 패턴
    - OPEN SESSION IN VIEW 패턴
    - SPRING의 OpenSessionInViewFilter
    - OpenSessionInViewFilter와 영속성 컨텍스트

* 토비의 스프링 3.1 Vol. 1 스프링의 이해와 원리
    - 1장 오브젝트와 의존관계
        - 1.1 초난감 DAO
        - 1.2 DAO의 분리


## July

> 190701 ~ 180707

* [Open Session In View Pattern](http://egloos.zum.com/aeternum/v/2798098) 원문


> 190715 ~ 190721

* 토비의 스프링 3.1 Vol. 1 스프링의 이해와 원리
    - 2장 테스트
        - 2.1 UserDaoTest 다시보기
        - 2.2 UserDaoTest 개선
        - 2.3 개발자를 위한 테스팅 프레임워크 JUnit
            - [JUnit의 예외(Exception) 테스트 작성하기]({{site.url}}/Spring-JUnit-Exception-Test/)
            - [JUnit의 동작 방식]({{site.url}}/How-JUnit-Works/)

> 190722 ~ 190728

* 토비의 스프링 3.1 Vol. 1 스프링의 이해와 원리
    - 2장 테스트
        - 2.4 스프링 테스트 적용
        - 2.5 학습 테스트로 배우는 스프링
    - 3장 템플릿
        - 3.1 다시 보는 초난감 DAO
        - 3.2 변하는 것과 변하지 않는 것
        - 3.3 ~ 3.7 Skip


## August

> 190729 ~ 190804

* Mybatis Lazy Loading 개념
    - [MyBatis의 Association과 Collection 알아보기 - Artist, Album]({{site.url}}/Mybatis-Association-Collection-Part-1)
    - [MyBatis의 Association과 Collection 알아보기 - Song]({{site.url}}/Mybatis-Association-Collection-Part-2)

> 190819 ~ 190825

* 토비의 스프링 3.1 Vol. 1 스프링의 이해와 원리
    - 4장 예외	
        - 4.1 사라진 SQLException
	    - 4.2 예외 전환
	    - 4.3 정리

> 190826 ~ 190901

* **스프링 웹 MVC** 강의
    - 스프링 MVC 활용 소개
    - [요청 맵핑하기 1부 HTTP Method]({{site.url}}/Spring-MVC-Mapping-HTTP-Method)
    - [요청 맵핑하기 2부 URI 패턴]({{site.url}}/Spring-MVC-Mapping-URI)
    - [요청 맵핑하기 3부 미디어 타입]({{site.url}}/Spring-MVC-Mapping-Media-Type)
    - [요청 맵핑하기 4부 헤더와 매개변수]({{site.url}}/Spring-MVC-Mapping-Header-Parameter)
    

## September

> 190902 ~ 190908

* **스프링 웹 MVC** 강의
    - [요청 맵핑하기 5부 HEAD와 OPTIONS]({{site.url}}/Spring-MVC-Head-Options/)
    - [요청 맵핑하기 6부 커스텀 애노테이션(Custom Annotation)]({{site.url}}/Spring-MVC-Custom-Annotation)
    - [요청 맵핑하기 6부 Retention 애노테이션]({{site.url}}/Spring-MVC-Retention-Annotation/)
    - [요청 맵핑하기 6부 Documented 애노테이션]({{site.url}}/Spring-MVC-Documented-Annotation/)
    - [요청 맵핑하기 6부 Target 애노테이션]({{site.url}}/Spring-MVC-Target-Annotation/)
    - 요청 맵핑하기 7부 연습 문제
    - [핸들러 메소드 1부 Handler Methods : Return Type Values]({{site.url}}/Spring-MVC-Return-Type/)
    - [핸들러 메소드 1부 Handler Methods : Argument]({{site.url}}/Spring-MVC-Argument/)

* **스프링 프레임워크 핵심 기술** 강의
    - [Spring 프레임워크 핵심 기술 - 데이터 바인딩 추상화/ PropertyEditor]({{site.url}}/Spring-Framework-Core-Technology-Data-Bindgin-PropertyEditor)
    - [Spring 프레임워크 핵심 기술  - Converter와 Formatter 1부]({{site.url}}/Spring-Framework-Core-Technology-Converter-Formatter-Part-1/)
    - [Spring 프레임워크 핵심 기술  - Converter와 Formatter 2부]({{site.url}}/Spring-Framework-Core-Technology-Converter-Formatter-Part-2/)
    - [Spring 프레임워크 핵심 기술 - SpEL (스프링 Expression Language)]({{site.url}}/Spring-Framework-Core-Technology-SpEL/)
    - [Spring 프레임워크 핵심 기술 - 스프링 AOP : 개념 소개]({{site.url}}/Spring-Framework-AOP-Concept)
    - [Spring 프레임워크 핵심 기술 - 스프링 AOP : 적용하기]({{site.url}}/Spring-Framework-Apply-AOP/)

> 190909 ~ 190915

* **스프링 웹 MVC** 강의
    - 핸들러 메소드 2부 URI 패턴
    - 핸들러 메소드 3부 요청 매개변수 (단순 타입)
    - 핸들러 메소드 4부 폼 서브밋
    - [핸들러 메소드 5부 @ModelAttribute]({{site.url}}/Spring-MVC-ModelAttribute)
    - [핸들러 메소드 6부 @Valid와 @Validated 애노테이션]({{site.url}}/Spring-MVC-Valid-And-Validated)
    - 핸들러 메소드 7부 폼 서브밋 에러 처리
    - [핸들러 메소드 8부 @SessionAttributes 애노테이션]({{site.url}}/Spring-MVC-SessionAttributes/)
    - 핸들러 메소드 9부 멀티 폼 서브밋
    - [핸들러 메소드 10부 @SessionAttribute 애노테이션]({{site.url}}/Spring-MVC-SessionAttribute/)
    - 핸들러 메소드 11부 @RedirectAttributes 애노테이션
    - 핸들러 메소드 12부 @FlashAttributes 애노테이션
    - 핸들러 메소드 13부 MultipartFile
    - 핸들러 메소드 14부 파일 다운로드
    - [핸들러 메소드 15부 @RequestBody 애노테이션]({{site.url}}/Spring-MVC-RequestBody)
    - [핸들러 메소드 15부 HttpEntity]({{site.url}}/Spring-MVC-HttpEntity)
    - [핸들러 메소드 15부 HttpMessageConverter 설정하기]({{site.url}}/Spring-MVC-Http-Message-Converter-Setting)
    - [@ModelAttribute 또 다른 사용법]({{site.url}}/Spring-MVC-ModelAttribute-Extra-Usage/)


* **스프링 프레임워크 핵심 기술** 강의
    - Spring 프레임워크 핵심 기술 - 스프링 IoC 컨테이너와 빈
    - [Spring 프레임워크 핵심 기술 - 스프링 AOP : 프록시 기반 AOP]({{site.url}}/Spring-Framework-Proxy-AOP/)
    - [Spring 프레임워크 핵심 기술 - 스프링 @AOP]({{site.url}}/Spring-Framework-Spring-AOP/)
    - Spring 프레임워크 핵심 기술 - Null-Safety
    - Spring 프레임워크 핵심 기술 - Outro

> 190916 ~ 190922

* **스프링 웹 MVC** 강의
    - [핸들러 메소드 16부 @ResponseBody]({{site.url}}/Spring-MVC-Responsebody)
    - [핸들러 메소드 16부 ResponseEntity]({{site.url}}/Spring-MVC-ResponseEntity)
    - 핸들러 메소드 17부 정리 및 과제
    - [@ModelAttribute 또 다른 사용법]({{site.url}}/Spring-MVC-ModelAttribute-Extra-Usage/)
    - [데이터 바인더 @InitBinder]({{site.url}}/Spring-MVC-InitBinder)
    - [예외 처리 핸들러 @ExceptionHandler]({{site.url}}/Spring-MVC-Exception-Handler)
    - 스프링 MVC 강좌 마무리

* **스프링 프레임워크 핵심 기술** 강의
    - [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : XML 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Bean/)
    - [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : XML 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-XML-Component-Scan/)
    - [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : Java 설정 파일에 직접 Bean 등록 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Bean/)
    - [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : Java 설정 파일에 Component Scan 방식]({{site.url}}/Spring-Framework-ApplicationContext-Java-Component-Scan/)
    - [IoC 컨테이너 2부/ ApplicationContext와 다양한 빈 설정 방법 : @SpringBootApplication]({{site.url}}/Spring-Framework-ApplicationContext-SpringBootApplication-Annotation)
    - [IoC 컨테이너 3부/ @Autowire]({{site.url}}/Spring-Framework-Autowired/)

> 190923 ~ 190929

* **스프링 웹 MVC** 강의
    - [전역 컨트롤러 @ControllerAdvice]({{site.url}}/Spring-MVC-Controller-Advice)

* **스프링 프레임워크 핵심 기술** 강의
    - [IoC 컨테이너 4부/ @Component와 컴포넌트 스캔]({{site.url}}/Spring-Framework-Component-Scan/)

## October

> 190930 ~ 191006

* **스프링 프레임워크 핵심 기술** 강의
    - [IoC 컨테이너 5부/ 빈의 스코프]({{site.url}}/Spring-Framework-Bean-Scope/)
    - [IoC 컨테이너 5부/ Proxy 객체를 만드는 방법]({{site.url}}/Spring-Framework-Make-Proxy-Bean)
    - [IoC 컨테이너 6부/ Environment 1부. 프로파일]({{site.url}}/Spring-Framework-Environment-Profile)

* WebFlux Study 발표 준비

> 191007 ~ 191027

* Refresh

> 191028 ~ 191103



## November

## December
