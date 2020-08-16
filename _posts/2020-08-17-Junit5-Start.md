---
layout: post
title:  " Junit5 - 기본 Annotation : Junit4에서 바뀐 Annotation "
categories: Junit5
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Junit5와 Spring Boot

* 스프링 부트 2.2+ 버전부터는 기본적으로 Junit5 의존성으로 추가되어있다.




---

## Junit5와 Junit4

---

|Junit4 | Junit5 |
| @Test | @Test | 
| @BeforeAll | @BeforeClass |
| @AfterAll | @AfterClass |
| @BeforeEach | @Before |
| @AfterEach | @After |
| @Disabled | @Ignored |

---

* @Test Annotation은 
 
  Junit5와 Junit4에서 동일한 Annotation을 사용한다.

  다만 다른 package를 참조한다.

  Junit4 : import org.junit.Test;

  Junit5 : import org.junit.jupiter.api.Test;


---


## Summary

* Junit5를 사용하기 위해서

  Junit4로 작성된 코드를 바꿀 필요는 없다.

  왜냐하면 Junit5에서도 지원하기 때문이다.


---

## Reference

* [더 자바, 애플리케이션을 테스트하는 다양한 방법 : JUnit 5 시작하기](https://www.inflearn.com/course/the-java-application-test)