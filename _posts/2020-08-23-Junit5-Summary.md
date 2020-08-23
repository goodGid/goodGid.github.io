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


## JUnit 5 테스트 반복하기 2부

### @NullSource, @EmptySource, @NullAndEmptySource

``` java
@ParameterizedTest
@NullSource
@EmptySource
public void parameterizedTest(String message) {
    System.out.println(message);
}
```

``` java
@ParameterizedTest
@NullAndEmptySource
public void parameterizedTest(String message) {
    System.out.println(message);
}
```

* @NullAndEmptySource를

  @NullSource와 @EmptySource와 함께 사용하면 무의미하다.

* Null 2번 / Empty 2번이 아니라 

  Null 1번 / Empty 1번이다.

---


### @ConvertWith, SimpleArgumentConverter

``` java
@ParameterizedTest
@ValueSource(strings = { "10", "20", "30" })
public void convertWith(@ConvertWith(PersonConverter.class) Person person) {
    System.out.println(person.getAge());
}

static class PersonConverter extends SimpleArgumentConverter {

    @Override
    protected Object convert(Object source, Class<?> aClass) throws ArgumentConversionException {
        return new Person(Integer.parseInt(source.toString()));
    }
}
```

* SimpleArgumentConverter는 

  1개의 argumnet를 다룰 때 사용한다.

---


### @CsvSource, @AggregateWith, ArgumentsAggregator

``` java
@ParameterizedTest
@CsvSource({
        "10, 'goodgid'",
        "20, 'gid'"
})
public void aggregateWith(@AggregateWith(PersonAggregator.class) Person person) {
    System.out.println(person.getAge() + " " + person.getName());
}

static class PersonAggregator implements ArgumentsAggregator {

    @Override
    public Object aggregateArguments(ArgumentsAccessor argumentsAccessor,
                                      ParameterContext parameterContext) 
                                      throws ArgumentsAggregationException {
        Integer age = argumentsAccessor.getInteger(0);
        String name = argumentsAccessor.getString(1);

        return new Person(age, name);
    }
}
```

* ArgumentsAggregator는 반드시 static inner class로 사용되어야 한다. 


---

## JUnit 5 테스트 인스턴스

``` java
@TestInstance(Lifecycle.PER_CLASS)
class Junit5Test {

    int value = 1;

    @Test
    public void test1() {
        System.out.println(value++); // value : 1
    }

    @Test
    public void test2() {
        System.out.println(value++); // value : 2 
    }
}
```

* 기본적으로 Test는 독릭접으로 동작해야하기 때문에 

  Test Method당 Instance를 생성한다.

  하지만 상황에 따라서 1개의 Instance를 공유할 필요가 있다.
  
* @TestInstance를 사용하면 **1개의 Instance만** 생성한다.


---

## JUnit 5 테스트 순서

``` java
@TestInstance(Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class Junit5Test {

    int value = 1;

    @Test
    @Order(2)
    public void test1() {
        value += 1;
        System.out.println("value : " + value);
    }

    @Test
    @Order(1)
    public void test2() {
        value += 10;
        System.out.println("value : " + value);
    }
}

// Output
value : 11
value : 12
```

* 시나리오 테스트 작성 시 

  Method의 호출 순서를 제어하기 위해서 사용하면 좋다.

---



---

## Reference

* [더 자바, 애플리케이션을 테스트하는 다양한 방법](https://www.inflearn.com/course/the-java-application-test)
