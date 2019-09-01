---
layout: post
title:  " 토비의 스프링 3.1 간략한 정리 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

> 토비의 스프링 3.1을 간략하게 정리해보자 !


----


## 2장 테스트

```
## 테스트의 효율적인 수행과 결과 관리 (p157)
JUnit은 프레임워크다.
프레임워크는 개발자가 만든 클래스에 대한 제어 권한을 넘겨받아서 
주도적으로 애플리케이션의 흐름을 제어한다.
개발자가 만든 클래스의 오브젝트를 생성하고 실행하는 일은
프레임워크에 의해 진행된다.
```

```
## 포괄적인 테스트 (p170)
JUnit은 특정한 테스트 메소드의 실행 순서를 보장해주지 않는다.
테스트의 결과가 테스트 실행 순서에 영향을 받는다면 테스트를 잘못 만든 것이다.
```

---


## 3장 템플릿

```
## 메소드 추출(p217)
자주 바뀌는 부분을 메소드로 독립시켰는데
당장 봐서는 별 이득이 없어 보인다.
왜냐하면 보통 메소드 추출 리팩토링을 적용하는 경우에는
분리시킨 메소드를 다른 곳에서 재사용할 수 있어야 하는데,
이건 반대로 분리시키고 남은 메소드가
재사용이 필요한 부분이고,
분리된 메소드는 DAO 로직마다 확장돼야 하는 부분이기 때문이다.
뭔가 반대로 됐다.
```

``` java
public void methodExtracted(){
        Connection c = null;
        PreparedStatement ps = null;
        try {
            c = db.getConnection();

            /*
            변하는 부분(= "A")을 메소드로 추출하고
            변하지 않는 부분(=나머지 코드)에서 호출하도록 설계
            */
            ps = makeStatement(c); // "A"

            ps.executeUpdate();
        } 
    }

    private PreparedStatement makeStatement(Connection c){
        PreparedStatement ps;
        ps = c.prepareStatement("method");
        return ps;
    }
```


---

## 참고

* 토비의 스프링 3.1 Vol.1 스프링의 이해와 원리

