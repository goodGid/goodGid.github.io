---
layout: post
title:  " Spock Docs - Sequences of Values : method 호출 시 매번 다른 값으로 Mocking 하기 "
categories: Spock
author: goodGid
---
* content
{:toc}

## Spock

* [Spock Framework](http://spockframework.org/spock/docs/1.3/all_in_one.html)는 Test Code 작성을 위한 Framework이다.

* 사용하기 위해선 의존성 추가가 필요하다.

> Dependency

``` xml
<!-- https://mvnrepository.com/artifact/org.spockframework/spock-core -->
<dependency>
    <groupId>org.spockframework</groupId>
    <artifactId>spock-core</artifactId>
    <version>2.0-M3-groovy-3.0</version>
    <scope>test</scope>
</dependency>
```

---




## [Returning Sequences of Values](http://spockframework.org/spock/docs/1.1/all_in_one.html#_returning_sequences_of_values)

* Test Code 작성 시 

  동일한 method를 여러 번 호출하는 경우

  다른 값을 Retun 해야 할 경우가 있다.

  (= Call Sequences Method)
  
  그럴 경우 <strong>triple-right-shift (&gt;&gt;&gt;) operator</strong>를 사용하면 된다.

```
subscriber.receive(_) >>> ["ok", "error", "error", "ok"]

1번째 method 호출 시 : ok
2번째 method 호출 시 : error
3번째 method 호출 시 : error
4번째 method 호출 시 : ok
```

* 비슷한 개념으로 [Chaining Method Responses](http://spockframework.org/spock/docs/1.1/all_in_one.html#_chaining_method_responses)가 있다.

  사용해본 느낌으로는 사용법만 조금 다를 뿐 같은 기능을 한다.


---

## Example

### Service

``` java
@Service
public class SpockServiceImpl implements SpockService {

    @Autowired
    private CheckTokenService checkTokenService;

    @Override
    public boolean validateToken(String token) throws Exception {

        boolean isValid = checkTokenService.checkToken(token);

        if (isValid) {
            return true;
        }

        // Make new Token
        token = "new Token";

        // Put token to Cache
        Cache cache = new Cache();
        String cacheKey = "Key";
        cache.put(cacheKey, token);

        // Check whether tokens are normally entered in the cache
        isValid = checkTokenService.checkToken(token);

        if (isValid) {
            return true;
        }

        throw new Exception();
    }
}
```

### Test Code

``` java
import spock.lang.Specification

class SpockServiceImplMockTest extends Specification {

    def service = new SpockServiceImpl()
    def checkTokenService = Mock(CheckTokenService.class)

    def "setup"() {
        service.checkTokenService = checkTokenService
    }

    def "validateToken"() {
        given:
        def token = "token";

        // Stubbing
        // Sequences of Values
        checkTokenService.checkToken(_) >>> [false, true]

        // Chaining Method Responses
        checkTokenService.checkToken(_) >> false >> true

        // Sequences of Values + Chaining Method Responses
        checkTokenService.checkToken(_) >>> [false] >> true

        // 2번째 호출 시 Exception 발생
        checkTokenService.checkToken(_) >>> [false] >> { throw new InternalError() }

        // 2번째 호출 시 Exception 발생 && 3번째 호출 시 true를 return
        checkTokenService.checkToken(_) >>> [false] >> { throw new InternalError() } >> true

        when:
        def result = service.validateToken(token)

        then:
        result == true
    }
}
```

* 주의할 점은 Sequences of Values 방법으로 Mocking을 하기 위해선

  반드시 <strong>triple-right-shift (&gt;&gt;&gt;) operator</strong>를 사용해야 한다.

  만약 <strong>double-right-shift (&gt;&gt;) operator</strong>를 사용하면 처음에 명시한 값으로 Mocking이 된다.

```
ex) checkTokenService.checkToken(_) >> [false, true] --> false만 return
```


---

## Reference

* [Spock Framework Docs](http://spockframework.org/spock/docs/1.3/all_in_one.html)