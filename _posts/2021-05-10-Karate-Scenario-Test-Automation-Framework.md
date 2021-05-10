---
layout: post
title:  " Karate Framework을 사용해 시나리오 테스트(Scenario Test)를 작성해보자 ! "
categories: Karate
author: goodGid
---
* content
{:toc}

## [Karate Framework](https://github.com/intuit/karate)

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_7.png)

> Test Automation Made Simple.

```
Karate is the only open-source tool to combine API test-automation, mocks, performance-testing 
and even UI automation into a single, unified framework. 
The BDD syntax popularized by Cucumber is language-neutral, 
and easy for even non-programmers. 
Assertions and HTML reports are built-in, and you can run tests in parallel for speed.
```

* Karate 프레임워크는 BDD 기반의 Test Automation이 가능한 오픈 소스이다.

  유저 입장에서의 Action을 정의해놓은 각 feature가 있고

  해당 feature를 **독립적** 혹은 **연속적**으로 호출하여 원하는 결과를 확인할 수 있다.

> Example

```
## 독립적 
- 유저가 회원가입을 한다.

## 연속적
- 유저가 회원가입을 한다.
-> 회원 가입 성공 후 글을 작성한다.
-> 글 작성 후 글을 삭제한다.
-> 글 삭제 후 회원 탈퇴를 한다.
-> 동일 ID로 ID 찾기 시도 시 노출되지 않는다.
```




## Setup for Karate

* Karate Framework를 사용하기 위해선 build.gradle에 몇 가지 추가가 필요하다.

  해당 설정은 Spring 혹은 Junit 버전에 따라 조금씩 달라진다.

  글을 쓰는 시점에는 Junit5 기준으로 Update 되었다.

### build.gradle

``` java
ext {
    karateVersion = '1.0.0'
}

dependencies {
    testCompile "com.intuit.karate:karate-junit5:${karateVersion}"
}

test {
    // pull karate options into the runtime
    systemProperty "karate.options", System.properties.getProperty("karate.options")
    // pull karate env into the runtime
    systemProperty "karate.env", System.properties.getProperty("karate.env")
    // ensure tests are always run
    outputs.upToDateWhen { false }
}

sourceSets {
    test {
        resources {
            srcDir file('src/test/java')
            exclude '**/*.java'
        }
    }
}
```

* 위 설정만 추가하면 손쉽게 Karate Framework를 사용할 수 있다.

---

## Source Code

* 본격적으로 Karate Framework를 사용한 Test를 작성해보자.

  참고로 Karate Framework에서는 **.feature* format으로 파일을 생성한다.

### Common

> [Controller](https://bit.ly/3b8wNyn)

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_2.png)

> [Service](https://bit.ly/3xQLxeS)

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_3.png)

---

### get.feature

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_4.png)

* **#5** : karate-config에 정의된 baseUrl 값을 참조한다.

  **#28** : baseUrl + uri 조합으로 요청할 API를 명시한다.

> karate-config.js

``` js
function fn() {
    var config = {
        baseUrl : 'http://localhost:8080'
    };
    return config;
}
```

* **#10, #15** : API의 reponse로 기대하는 구조가 있을 텐데

  여기서 특정 값은 요청마다 달라지므로 
  
  Karate에서 제공하는 [Fuzzy Matching](https://github.com/intuit/karate#fuzzy-matching)을 사용하여 응답 값을 체크한다.

* **#24** : 현재 파일(=get.feature)에서 단독적으로 

  @GetValue에 정의한 scenario를 실행할 수도 있고

  외부 feature에서 @GetValue Tag를 사용하여 실행시킬 수도 있다.

* 후자일 경우 **동적**으로 parameter 값이 변경되어야 하므로

  param 변수가 undefined라면
  
  사전에 정의한 값(=definedParam)을 사용하도록 하고

  그게 아니라면 외부에서 넘겨받은 param을 사용하도록 하였다.

  *def param = typeof param == 'undefined' ? definedParam : param*

* 위처럼 하는 이유는 독립적 혹은 연속적으로 실행하더라도 테스트를 성공하게 시키기 위함이다.

``` java
if ( definedParam만 사용 )
  외부 feature에서 넘어오는 parameter를 사용 X
else if ( 외부 feature에서 넘겨받을 parameter만 사용 )
  독립적으로 테스트 실행 시 param이 없어서 테스트 실패
```
  
* **#29** : API의 parameter를 지정해준다.

  < key > = < value > 구조이다.

* **#34** : [$ == response](https://github.com/intuit/karate#response)




---

### post.feature

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_5.png)

* **#8, #9** : JSON 구조의 data를 선언하는 2가지 방식

* **#19** : [Fuzzy Matching](https://github.com/intuit/karate#fuzzy-matching)과 고정된 값을 사용한 표현식


![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_6.png)

* **#45** : 성공을 예상하므로 200 선언

* **#67** : 실패를 예상하므로 400 선언

* **#69, #70** : [match contains](https://github.com/intuit/karate#match-contains)를 사용하였다.

  여기서 중요한 포인트는 **'==' != contains** 이다.

  == 는 완전히 일치해야 하지만

  contains는 우측에 선언한 변수를 **포함**하고만 있어도 된다.

* 그러므로 response는 failExpected를 **포함**하는 구조이므로 **contains**를 사용해야 한다.

---

## Usage

* 원하는 Scenario를 정의하였다면 Jenkins와 같은 툴을 이용하여 **주기적**으로 실행하여

  신규 feature에 대한 개발이 기존 Spec에 Side Effect을 끼치는 치 체크해봐야한다.

  이때 필요한 기능이 [Command Line](https://github.com/intuit/karate#command-line) 명령어다.

* 이 글에서는 [해당 프로젝트 기준](https://github.com/goodGid/Karate-Framework-Demo-Project)으로 Command Line을 정리해봤다.


### Run only specify scenario

> Command

``` java
./gradlew test --tests DemoRunner -Dkarate.options=classpath:karate/demo/get.feature
./gradlew test --tests DemoRunner -Dkarate.options=classpath:karate/demo/post.feature
./gradlew test --tests DemoRunner -Dkarate.options="--tags ~@CreateValue classpath:karate/demo/post.feature"
```

* [DemoRunner.java](https://github.com/goodGid/Karate-Framework-Demo-Project/blob/main/src/test/java/karate/demo/DemoRunner.java)에 2개의 method를 정의했는데

  단순히 2가지 방법이 있음을 알려주고 싶어서 작성한 거니

  실제로는 자신의 스타일에 맞게 1개만 남기고 나머지는 삭제하도록 하자.

``` java
class DemoRunner {
    @Karate.Test
    Karate testAutoAll() {
        // It executes features that exist `only` in the package area.
        // ex) karate/deom/*.feature
        return Karate.run().relativeTo(getClass());
    }

    @Test
    void testManuallyAll() {
        // Explicitly informs the package of features to be executed.
        Results results = Runner.path("classpath:karate/demo")
                                .tags("~@CreateValue")
                                .parallel(5);
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}
```


---

### @RegressionTest & Parallel

> Command

``` java
./gradlew test --tests KarateTests
```

* 위 명령어는 [KarateTests.java](https://github.com/goodGid/Karate-Framework-Demo-Project/blob/main/src/test/java/karate/KarateTests.java)를 실행시킨다.

  그러면 해당 파일에 있는 모든 메소드를 호출한다.
  
* 현재는 *testScenarioAll( )* 만 존재하므로 이 메소드만 호출이 된다.

---

> [KarateTests.java](https://github.com/goodGid/Karate-Framework-Demo-Project/blob/main/src/test/java/karate/KarateTests.java)

``` java
@Test
void testScenarioAll() {
    Results results = Runner.path("classpath:karate/scenario") // [1]
                            .tags("@RegressionTest") // [2]
                            .parallel(5); // [3]
    assertEquals(0, results.getFailCount(), results.getErrorMessages()); // [4]
}
```

* [1] : Runner.path( )에 정의된 classpath package를 찾는다.

* [2] : tags( )에 명시한 조건을 충족시키는 Scenario만 실행된다.

  *참고 : tags( )에 자주 사용할 수 있는 표현식*

``` java
"~"   = tags("~@ignore")
"OR"  = tags("@customer, @smoke")
"AND" = tags("@customer","@smoke")
```

* [3] : 만약 실행해야 하는 Scenario가 많다면 시간 단축을 위해 parallel( ) 값을 설정할 수 있다.

* [4] : results 값을 사용하여 기대한 결괏값을 검증한다.

---

> [classpath:karate/scenario/KarateTests.java](https://github.com/goodGid/Karate-Framework-Demo-Project/blob/main/src/test/java/karate/KarateTests.java)

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_1.png)

* *testScenarioAll( )* 를 실제로 실행시키면 

  @RegressionTest를 선언한 Scenario만 실행된다 (= #27)

  내부적으로 다른 tag를 가진 Scenario는 실행되지 않는다.

* 그래서 실제로 업무에 어떻게 사용했는지 공유하자면

  일련의 흐름을 담고 있는 Scenario에만 @RegressionTest를 선언하여 실행시켰다.

  즉 신규 feature에 대한 개발이 기존 feature에 Side Effect을 끼치는지 테스트 결과를 통해 확인할 수 있었다.

```
dev 환경에 신규 feature를 배포 후
Karate Scenario를 실행하면
신규 feature가 들어간 코드 환경에서 
기존 feature 테스트를 진행할 수 있다.
```


---

## Summary

* Karate Framework 개념 및 사용법에 대해 알아봤다.

* 아무래도 처음 접하는 Framework다 보니 Learing Curve가 있을 테고

  필자 또한 처음엔 어색하고 어려웠던 기억이 있어서

  누군가에게 조금이나마 도움이 되었으면 하는 바람으로

  글로 정리해보고 코드에도 상세한 주석을 달아놓았다.

* 만약 Integration Test에 대한 Need가 생긴다면

  해당 글과 [프로젝트 코드](https://github.com/goodGid/Karate-Framework-Demo-Project)를 참고하여 Karate Framework를 적용해보도록 하자 !

---

## Reference

* [Karate official Github](https://github.com/intuit/karate)

* [hello-karate](https://github.com/Sdaas/hello-karate)