---
layout: post
title:  " JUnit의 동작 방식 "
categories: Spring
author: goodGid
---
* content
{:toc}

## JUnit의 동작 방식

* JUnit이 테스트를 수행하는 방식은 다음과 같다.

> Step 1.

* 다음 조건의 클래스를 읽어 온다.

* Annotation : **@Test** 애노테이션 존재 O

  Access Level : **public**

  Return Type : **void**

  Parameter : **Parameter** 존재 X

> Step 2.

* 테스트 클래스의 **오브젝트**를 하나 만든다.

> Step 3.

* **@Before**가 붙은 메소드가 있으면 실행한다.

> Step 4.

* **@Test**가 붙은 메소드를 하나 호출하고 테스트 결과를 저장해둔다.

> Step 5.

* **@After**가 붙은 메소드가 있으면 실행한다.

> Step 6.

* 나머지 테스트 메소드에 대해 *2~5번* 을 반복한다.

> Step 7.

* 모든 테스트의 결과를 종합해서 돌려준다.











---

## @Before와 @After

* JUnit은 테스트 메소드를 실행할 때마다 

  @Before와 @After가 붙은 메소드를 실행한다.

* @Before 혹은 @After 메소드를 테스트 메소드에서 직접 호출하지 않기 때문에 

  서로 주고받을 정보나 오브젝트가 있다면 **인스턴스 변수**를 이용해야 한다.

``` java
public class GoodgidTest {
    private Goodgid goodgid; // 인스턴스 변수 선언

    @Before
    public void setUp(){
        this.goodgid = new Goodgid();
    }
    @After
    public void tearDown(){
        this.goodgid = new DeleteGoodGid();
    }
}
```

---

## Test Class Object

* 각 테스트 메소드를 실행할 때마다 **테스트 클래스의 오브젝트**를 새로 만든다.

* 한 번 만들어진 테스트 클래스의 오브젝트는 하나의 테스트 메소드를 사용하고 나면 버려진다.

* 테스트 클래스가 @Test 테스트 메소드를 2개 갖고 있다면 

  테스트가 실행되는 중에 JUnit은 이 클래스의 오브젝트를 2번 만든다.

![](/assets/img/java/how_junit_works_1.png)


> Q. 테스트 메소드를 실행할 때마다 새로운 오브젝트를 만드는 것일까?

* JUnit은 각 테스트가 서로 영향을 주지 않고 

  **독립적**으로 실행 됨을 보장해주기 위해 매번 새로운 오브젝트를 만든다.


---

## 픽스처(Fixture)

* 테스트를 수행하는 데 필요한 정보나 오브젝트를 **픽스처(Fixture)**라고 한다.

* 일반적으로 픽스처는 

  여러 테스트에서 반복적으로 사용되기 때문에 
  
  @Before 메소드를 이용해 생성해두면 편리하다.

---

## Reference

* 토비의 스프링 3.1 Vol.1 스프링의 이해와 원리
