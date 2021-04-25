---
layout: post
title:  " Spring Boot + QueryDSL + Gradle 6 + Multi Moudle 적용하기 "
categories: Spring
author: goodGid
---
* content
{:toc}

## Prologue

* QueryDSL을 적용하는 방법에 대해 알아보자.

* 특히 QueryDSL에서 가장 큰 골칫덩이는 Gradle과의 호환성 문제이다.

  그러므로 이 글에서는 Gradle 6.x.x으로 구현해본다.



---

## Source Code

* 우선 이 글에서 다루는 모든 코드는 [Github](https://github.com/goodGid/Spring-Multi-Module-QueryDSL-Template)을 참고하도록 하자 !

* QueryDSL을 사용하기 위한 핵심은 **build.gradle** 파일이다.

  설정을 잡아주기만 하면 사실 사용하는 곳에서는 크게 어려움 없이 사용할 수 있다.


### build.gradle

```
buildscript {
    ext {
        ...
        // for QueryDSL
        queryDslVersion = '4.4.0'
        querydslPluginVersion = '1.0.10'
    }
    repositories {
        ...
        // for QueryDSL
        maven { url "https://plugins.gradle.org/m2/" }
    }
    dependencies {
        ...
        // for QueryDSL
        classpath "gradle.plugin.com.ewerk.gradle.plugins:querydsl-plugin:${querydslPluginVersion}"
    }
}

subprojects {

    ...

    dependencies {
        ...
        // for QueryDSL
        implementation "com.querydsl:querydsl-core:${queryDslVersion}"
        implementation "com.querydsl:querydsl-jpa:${queryDslVersion}"
        annotationProcessor "com.querydsl:querydsl-apt:${queryDslVersion}:jpa"
        annotationProcessor "jakarta.persistence:jakarta.persistence-api"
        annotationProcessor "jakarta.annotation:jakarta.annotation-api"
    }
}

// for QueryDSL
task cleanGeneatedDir(type: Delete) {
    delete file('src/main/generated')
}
```

* **// for QueryDSL**가 적혀있는 코드만 추가하면 된다.

  자세한 건 [예제 프로젝트](https://github.com/goodGid/Spring-Multi-Module-QueryDSL-Template)를 참고하자.


---

### Service Code

``` java
@Slf4j
@Service
@RequiredArgsConstructor
public class TestService {

    private final MemberRepository memberRepository;
    private final JPAQueryFactory jpaQueryFactory;

    public String checkDB() {

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(member.id.eq(1L));
        builder.or(member.id.eq(2L));

        // use QueryDSL
        List<Member> memberList = jpaQueryFactory.selectFrom(member)
                                                 .where(builder)
                                                 .fetch();

        log.info("memberList.size() : {}", memberList.size());

        // use CrudRepository interface
        memberRepository.save(Member.builder()
                                    .name("goodGid")
                                    .build());
        return memberRepository.findAll().size() + "";
    }
}
```

* QueryDSL를 사용하거나 CrudRepository를 사용해서 DB와의 통신이 가능하다.

---

## Summary

* 처음에 QueryDSL를 사용하려고 했을 때

  이런 저런 문서를 보면서 이해할 수 없는 Gradle 문법 + 버전 호환 문제로 인해 좌절을 맛봤다.

* 그렇게 돌고 돌아서 QueryDSL 적용에 성공했고

  나와 같은 삽질로 인해 시간 낭비를 하지 않았으면 하는 마음에 글로 정리해봤다.

  누군가에겐 도움이 되는 자료가 되었으면 좋겠다 !

* 그리고 필자가 만든 [예제 프로젝트](https://github.com/goodGid/Spring-Multi-Module-QueryDSL-Template)는

  Multi Module에 QueryDSL을 추가한 구조인데

  만약 Multi Module 구조에 대해 익숙하지 않았다면 다소 어색함을 느낄 수 있다.

* 하지만 실무에선 Multi Module 구조는 매우 중요하니

  이번 기회에 잘 분석해서 이해할 수 있도록 해보자.

* 그런데도 어려움을 느낀다면 편하게 댓글 남겨주시면 도와드리겠습니다 !

---

## Reference

* [[Github] Spring-Multi-Module-QueryDSL-Template](https://github.com/goodGid/Spring-Multi-Module-QueryDSL-Template)