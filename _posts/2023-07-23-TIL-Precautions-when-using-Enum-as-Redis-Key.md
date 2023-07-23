---
layout: post
title:  " Enum은 싱글톤이니 Redis Key로 사용해도 문제 없겠지? "
categories: TIL
author: goodGid
---
* content
{:toc}

## Background

* 회사에서 Enum을 사용하여 Redis Key를 생성하여 저장하는 로직을 구현하였다.

  그런데 똑같은 Data로 Key를 생성하여 조회하는데

  Redis에서 조회하지 못하는 이슈가 발생했다.

* 뭐가 문제였고 어떤 부분을 주의해야 하는지 알아보자.


---

## Enum is Singleton

* Enum은 싱글톤이다.

  즉 인스턴스가 1번 생성되면 해당 인스턴스는 바뀌지 않는다.

  다시 말해 인스턴스의 주소값은 1번 할당되면 바뀌지 않는다는 뜻이다.

* 이러한 이유로 Redis Key 생성 시
  
  Enum을 사용해도 문제가 없겠단 판단을 내렸다.

---

## Problem Code

* (대략적인 흐름만 담긴) 코드는 다음과 같았다.

> Service for Business

``` java
@Service
@AllArgsConstructor
public class UserService {

    private final RedisService redisService;

    public void demo() {
        final RedisKey redisKey = new RedisKey("goodGid", OsEnum.MAC);
        redisService.addRedis(redisKey);
        redisService.getRedis(redisKey);
    }
}
```

> Service for Redis

``` java
@Service
class RedisService {
    public void addRedis(RedisKey key) {
        String redisKey = key.getStrHash();
        // Add key to Redis
    }

    public void getRedis(RedisKey key) {
        String redisKey = key.getStrHash();
        // Get data from Redis
    }
}
```

> RedisKey Obejct 

``` java
@Setter
class RedisKey {
    private String userKey;
    private OsEnum osEnum;

    RedisKey(String userKey, OsEnum osEnum) {
        this.userKey = userKey;
        this.osEnum = osEnum;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {return true;}
        if (o == null || getClass() != o.getClass()) {return false;}
        final RedisKey redisKey = (RedisKey) o;
        return Objects.equals(userKey, redisKey.userKey) && osEnum == redisKey.osEnum;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userKey, osEnum);
    }

    public String getStrHash() {
        return String.valueOf(hashCode());
    }
}
```

> Enum

``` java
enum OsEnum {
    MAC,
    WINDOW,
    LINUX;
}
```

* Redis에 값을 저장하기 위한 RedisKey 객체를 정의하고

  RedisKey객체의 HashCode 값을 Redis의 Key 값으로 사용한다.

* 여기까지만 보고 뭐가 문제가 될지 맞춰보자.

---

## 테스트계 배포 후 QA

* 위 코드로 배포를 하고 

  몇 주 동안 클라와 QA 테스트를 열심히 진행하였다.

  문제가 없이 수월하게 진행이 되었는데

  갑자기 **"조회가 안 돼요."**라는 이야기가 들려왔다.

* 그래서 엥? 하고 로그를 막 뒤져보았는데

  정말로 같은 값을 요청했는데 값이 없다고 나오는 것이었다.

  ~~이 때 약간 멘탈이 흔들렸다.~~

* 만약 문제가 되었다면 배포하고 바로 문제가 되었어야 하는데

  몇 주가 지난 후에 갑자기 안된다고 !!??

* "에이 타이밍 이슈일 거야 혹은 레디스 문제일거야" 라는 

  자기 합리화를 하였지만

  늘 그렇듯이 컴퓨터는 정직했고 나는 틀렸음을 깨달았다.

* 그렇다면 지금부터 뭐가 문제였는지 알아보자.

---

## Enum Reference is Mutable

* Enum 자체는 Singleton이다.

  그런데 Enum 인스턴스의 주소값은 항상 고정이라고 볼 수 있을까?

* Enum의 주소값(=Reference)는 서버 인스턴스를 실행시킬 때마다

  새로운 주소값을 할당받게 된다.

![](/assets/img/til/TIL-Precautions-when-using-Enum-as-Redis-Key_1.png)

* **JVM을 재시작하면 모든 인스턴스들이 다시 초기화되므로 이전의 주소값과는 상관없이 새로운 인스턴스들이 할당됩니다.**

  이 부분 때문에 조회가 되지 않았고 문제가 되었던 코드는 다음과 같다.

``` java
@Override
  public int hashCode() {
      return Objects.hash(userKey, osEnum);
  }
```

* 위 코드에서 osEnum은 인스턴스 자체의 hashCode 값을 사용하여 Redis에 저장한다.

  그러므로 만약 jvm을 재실행시켰을 경우엔

  새로운 주소값을 할당받으므로

  아무리 같은 userKey와 osEnum 값을 세팅하더라도 찾을 수가 없게 된다.

---

## Fixed Code

> RedisKey Obejct 

``` java
@Setter
class RedisKey {
    private String userKey;
    private OsEnum osEnum;

    RedisKey(String userKey, OsEnum osEnum) {
        this.userKey = userKey;
        this.osEnum = osEnum;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {return true;}
        if (o == null || getClass() != o.getClass()) {return false;}
        final RedisKey redisKey = (RedisKey) o;
        return Objects.equals(userKey, redisKey.userKey) && osEnum == redisKey.osEnum;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userKey, osEnum.name()); // [1]
    }

    public String getStrHash() {
        return String.valueOf(hashCode());
    }
}
```

* [1] : osEnum 인스턴스가 아니라 osEnum의 값에 대해서 hasCode를 구하도록 수정한다.

  osEnum의 값은 String이므로 jvm을 재실행시켜도 같은 값을 보장한다.

---

## 문제가 뒤늦게 발생된 이유?

* 이렇게 잘못된 코드가 배포되었는데 왜 뒤늦게 발견되었을까?

* 그 이유에 대해 생각해 보면 

  일반적으로 테스트계에 배포를 하고 테스트를 진행하면

  클라와 QA 분들이 빠른 시간 내에 본인이 테스트하고자 하는 플로우를 진행한다.

* 그렇게 빠르게 진행하므로 

  현재 배포된 서버에서만 테스트가 진행되고 
  
  같은 환경에서는 문제가 없이 동작하게 된다.

* 그런데 만약 "서버 배포 -> 테스트 진행하다 멈춤 -> 서버 재배포 -> 이어서 테스트 진행" 이런 식으로 했다면

  서버가 재배포되면서 Redis에서 값을 조회할 수 없는 상황이 벌어지는 것이다.

* 다행히도 운영에 나가기 전에 발견되어서 정말 다행이었지

  만약 운영에 나간 후 이런 장애가 발생했다면 

  정말 너무나도 난감했을 상황이었다.

* 실제로 조회가 안된다는 이야기를 들었을 때

  팀 동료도 같이 살폈는데도 

  인스턴스의 주소값이 달라진다는 부분을 쉽게 떠올리지 못해

  문제를 파악하는데 상당히 애를 먹었다.

---

## Summary

* 흥미로웠던 경험이었다.

* 이 글을 본 여러분들도 "Enum은 싱글톤이다."라는 키워드에 빠져서

  나와 같은 실수를 하지 않았으면 하는 바람으로 글을 작성하였다.