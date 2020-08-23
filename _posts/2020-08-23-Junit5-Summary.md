---
layout: post
title:  " Junit5 : 요약 "
categories: Junit5
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Prologue

* 하나의 글로 작성하기엔 부족하지만 

  그렇다고 그냥 넘어가기엔 아까운 주제들을 정리하기 위한 글이다.





---

## JUnit 5 테스트 반복하기 1부

### [@RepeatedTest](https://www.baeldung.com/junit-5-repeated-test)

``` java
// @RepeatedTest(10)
// @RepeatedTest(value = 10, name = RepeatedTest.LONG_DISPLAY_NAME)
@RepeatedTest(value = 10, name = "{displayName} | {currentRepetition} | {totalRepetitions}")
@DisplayName("RepeatedTest 테스트")
public void repeatedTest(RepetitionInfo repetitionInfo) {
    System.out.println(repetitionInfo.getCurrentRepetition() 
                        + "/"
                        + repetitionInfo.getTotalRepetitions());
}
```

---

### [@ParameterizedTest](https://www.baeldung.com/parameterized-tests-junit-5)

``` java
@DisplayName("ParameterizedTest 테스트")
@ParameterizedTest(name = "[{index}]  {displayName} : {arguments} == {0}")
@ValueSource(strings = {"good", "gid", "gidhub"})
public void parameterizedTest(String message) {
    System.out.println(message);
}
```


---

## Reference

* [더 자바, 애플리케이션을 테스트하는 다양한 방법](https://www.inflearn.com/course/the-java-application-test)
