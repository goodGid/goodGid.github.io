---
layout: post
title:  " Let's write a scenario test using the Karate Framework ! "
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

* Karate framework is an open source capable of BDD-based Test Automation.

  There are each feature that defines the action from the user's point of view

  You can check the desired result by calling the feature as **independent** or **continuously**.

> Example

```
## independent
- The user registers as a member.

## continuous
- The user registers as a member.
-> Write a post after successful membership registration.
-> Delete the post after writing.
-> After deleting the post, cancel the membership.
-> When trying to find an ID with the same ID, it is not exposed.
```




## Setup for Karate

* In order to use Karate Framework, several additions are required to **build.gradle**.

  The configuration is slightly different depending on the Spring or Junit version.

  At the time of writing, it was updated based on Junit5.

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

* You can easily use Karate Framework by adding the above settings.

---

## Source Code

* Let's write a test using the Karate Framework.

  For reference, Karate Framework creates a file in **.feature* format.

### Common

> [Controller](https://bit.ly/3b8wNyn)

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_2.png)

> [Service](https://bit.ly/3xQLxeS)

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_3.png)

---

### get.feature

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_4.png)

* **#5**: Refers to the *baseUrl* value defined in karate-config.

  **#28**: Specifies the API to be requested by the combination of baseUrl + uri.

> karate-config.js

``` js
function fn() {
    var config = {
        baseUrl : 'http://localhost:8080'
    };
    return config;
}
```

* **#10, #15**: There must be a structure expected as a response of the API

  The specific value here varies from request to request,
  
  so check the response value using [Fuzzy Matching](https://github.com/intuit/karate#fuzzy-matching) provided by Karate.

* **#24**: You can execute the scenario defined in @GetValue alone in the current file (=get.feature),

  It can also be executed by using @GetValue Tag in an external feature.

* In the latter case, the parameter value must be changed **dynamically**.

  If the param variable is undefined

  Use a predefined value (=definedParam)

  If not, the param received from the outside was used.

  *def param = typeof param =='undefined'? definedParam: param*

* The reason for doing the above is to make the test successful 

  even if it is executed independently or continuously.

``` java
if (only use definedParam)
  It is not possible to use a parameter passed from an external feature.
else if (only use parameters to be passed from external feature)
  When running the test independently, the test fails because there is no param.
```
  
* **#29**: Specifies the parameter of the API.

  < key > = < value > structure.

* **#34** : [$ == response](https://github.com/intuit/karate#response)




---

### post.feature

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_5.png)

* **#8, #9**: Two ways of declaring data in JSON structure

* **#19**: Expression using [Fuzzy Matching](https://github.com/intuit/karate#fuzzy-matching) and a fixed value


![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_6.png)

* **#45**: Expect success, so declare 200

* **#67**: Expect failure, so declare 400

* **#69, #70**: [match contains](https://github.com/intuit/karate#match-contains) was used.

   The important point here is **'==' != contains**.

   *==* must match exactly 
   
   but *contains* only needs to include the variable declared on the right.

* Therefore 

  the response is a structure that **includes** failExpected

  so **contains** should be used.

---

## Usage

* Once the desired scenario has been defined 

  execute **periodically** using a tool such as Jenkins.

  It is necessary to check whether the development of a new feature has a side effect on the existing spec.

  The required function at this time is the [Command Line](https://github.com/intuit/karate#command-line) command.

* In this article, I summarized the command line as [Based on the project](https://github.com/goodGid/Karate-Framework-Demo-Project).


### Run only specify scenario

> Command

``` java
./gradlew test --tests DemoRunner -Dkarate.options=classpath:karate/demo/get.feature
./gradlew test --tests DemoRunner -Dkarate.options=classpath:karate/demo/post.feature
./gradlew test --tests DemoRunner -Dkarate.options="--tags ~@CreateValue classpath:karate/demo/post.feature"
```

* I defined 2 methods in [DemoRunner.java](https://github.com/goodGid/Karate-Framework-Demo-Project/blob/main/src/test/java/karate/demo/DemoRunner.java)

  I just wrote it because I wanted to tell you that there are **two ways** to do it.

  In reality, let's leave only one and delete the rest according to your style.

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

* The above command executes [KarateTests.java](https://github.com/goodGid/Karate-Framework-Demo-Project/blob/main/src/test/java/karate/KarateTests.java).

  Then all the methods in that file are called.
  
* Currently, only *testScenarioAll( )* exists, so only this method is called.

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

* [1] : Search the classpath package defined in Runner.path( ).

* [2] : Only scenarios that satisfy the conditions specified in tags( ) are executed.

  *Note: Frequently used expressions for tags( )*

``` java
"~"   = tags("~@ignore")
"OR"  = tags("@customer, @smoke")
"AND" = tags("@customer","@smoke")
```

* [3] : If there are many scenarios to be executed, you can set the parallel( ) value to shorten the time.

* [4] : Use the results value to verify the expected result value.

---

> [classpath:karate/scenario/KarateTests.java](https://github.com/goodGid/Karate-Framework-Demo-Project/blob/main/src/test/java/karate/KarateTests.java)

![](/assets/img/tech/Karate-Scenario-Test-Automation-Framework_1.png)

* If you actually run *testScenarioAll( )*

  Only the scenario that declared @RegressionTest is executed (= #27)

  Scenarios with other tags internally are not executed.

* So to tell you how i actually used it

  @RegressionTest was declared and executed only in the scenario containing a series of flows.

  In other words, it was confirmed through the test results whether the development of a new feature has a side effect on the existing feature.

```
After deploying a new feature in the dev environment
When you run Karate Scenario
In the code environment with new features
Existing feature tests can be performed.
```


---

## Summary

* Learned the concept and usage of the Karate Framework.

* As it's a framework that I'm new to seeing, there must be a Learing Curve

  I also had awkward and difficult memories at first

  I hope it helps someone a little

  I've put together the text and put detailed comments on the code as well.

* If there is a need for Integration Test

  Let's apply Karate Framework by referring to the article and [Project Code](https://github.com/goodGid/Karate-Framework-Demo-Project)!

---

## Reference

* [Karate official Github](https://github.com/intuit/karate)

* [hello-karate](https://github.com/Sdaas/hello-karate)