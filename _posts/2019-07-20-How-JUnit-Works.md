---
layout: post
title:  " JUnit의 동작 방식 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

## JUnit의 동작 방식

* JUnit이 하나의 테스트 클래스를 가져와 테스트를 수행하는 방식은 다음과 같다.

1. 테스트 클래스에서 **@Test**가 붙은 **public**이고 <br> **void**형이며 **파라미터**가 없는 테스트 메소드를 모두 찾는다.

2. 테스트 클래스의 **오브젝트**를 하나 만든다.

3. **@Before**가 붙은 메소드가 있으면 실행한다.

4. **@Test**가 붙은 메소드를 하나 호출하고 테스트 결과를 저장해둔다.

5. **@After**가 붙은 메소드가 있으면 실행한다.

6. 나머지 테스트 메소드에 대해 *2~5번* 을 반복한다.

7. 모든 테스트의 결과를 종합해서 돌려준다.











---

## @Before와 @After

* JUnit은 @Test가 붙은 메소드를 실행하기 전에 <br> **각각** @Before와 @After가 붙은 메소드를 자동으로 실행한다.

* @Before 혹은 @After 메소드를 테스트 메소드에서 직접 호출하지 않기 때문에 <br> 서로 주고받을 정보나 오브젝트가 있다면 **인스턴스 변수**를 이용해야 한다.

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

## 테스트 클래스 오브젝트

* 각 테스트 메소드를 실행할 때마다 **테스트 클래스의 오브젝트**를 새로 만든다.

* 한 번 만들어진 테스트 클래스의 오브젝트는 하나의 테스트 메소드를 사용하고 나면 버려진다.

* 테스트 클래스가 @Test 테스트 메소드를 2개 갖고 있다면 <br> 테스트가 실행되는 중에 JUnit은 이 클래스의 오브젝트를 2번 만든다.

![](/assets/img/java/how_junit_works_1.png)


> Why. 테스트 메소드를 실행할 때마다 새로운 오브젝트를 만드는 것일까?

* JUnit은 각 테스트가 서로 영향을 주지 않고 <br> **독립적**으로 실행됨을 확실히 보장해주기 위해 매번 새로운 오브젝트를 만든다.


---

## 픽스처(Fixture)

* 테스트를 수행하는 데 필요한 정보나 오브젝트를 **픽스처(Fixture)**라고 한다.

* 일반적으로 픽스처는 여러 테스트에서 반복적으로 사용되기 때문에 <br> @Before 메소드를 이용해 생성해두면 편리하다.



---

## 참고

* 토비의 스프링 3.1 Vol.1 스프링의 이해와 원리
