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
    - SingleSession = false 설정
    - OPEN SESSION IN VIEW는 안티패턴(Anti-Pattern)인가? 
    - OPEN SESSION IN VIEW를 사용하라 

* 토비의 스프링 3.1 Vol. 1 스프링의 이해와 원리
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

    - 5장 서비스 추상화	
        - 5.1 사용자 레벨 관리 기능 추가
	    - 5.2 트랜잭션 서비스 추상화
	    - 5.3 서비스 추상화와 단일 책임 원칙
	    - 5.4 메일 서비스 추상화
	    - 5.5 정리

    - 6장 AOP	
        - 6.1 트랜잭션 코드의 분리
	    - 6.2 고립된 단위 테스트
	    - 6.3 다이내믹 프록시와 팩토리 빈
	    - 6.4 스프링의 프록시 팩토리 빈
	    - 6.5 스프링 AOP
	    - 6.6 트랜잭션 속성
	    - 6.7 애노테이션 트랜잭션 속성과 포인트컷
	    - 6.8 트랜잭션 지원 테스트
	    - 6.9 정리

    - 7장 스프링 핵심 기술의 응용	
        - 7.1 SQL과 DAO의 분리
	    - 7.2 인터페이스의 분리와 자기 참조 빈
	    - 7.3 서비스 추상화 적용
	    - 7.4 인터페이스 상속을 통한 안전한 기능확장
	    - 7.5 DI를 이용해 다양한 구현 방법 적용하기
	    - 7.6 스프링 3.1의 DI
	    - 7.7 정리

    - 8장 스프링이란 무엇인가?	
        - 8.1 스프링의 정의
	    - 8.2 스프링의 목적
	    - 8.3 POJO 프로그래밍
	    - 8.4 스프링의 기술
	    - 8.5 정리

    - 9장 스프링 프로젝트 시작하기	
        - 9.1 자바 엔터프라이즈 플랫폼과 스프링 애플리케이션
	    - 9.2 개발도구와 환경
	    - 9.3 애플리케이션 아키텍처
	    - 9.4 정리

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

* **Spring 프레임워크 핵심 기술** 강의 시청
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
        - 클래스의 생성자에서 @Autowired 어노테이션이 없어도 Bean 주입이 되는 이유 
    - AOP 소개
    - AOP 적용 예제
        - Repository안에 메소드는 기본적으로 @Transactional 어노테이션이 선언되어있다.
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


## September

## October

## November

## December
