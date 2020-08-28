---
layout: post
title:  " Optional 클래스 메소드 정리 "
categories: Java
author: goodGid
---
* content
{:toc}

## Optional 클래스 메소드

### empty 

```
빈 Optional 인스턴스 반환
```



### get

```
값 존재 O : Optional이 감싸고 있는 값을 반환
값 존재 X : NoSuchElemnetException 발생
```



### map

```
값 존재 O : 값이 존재하면 제공된 **매핑 함수**를 적용
```






### stream

```
값 존재 O : 존재하는 값만 포함하는 스트림 반환
값 존재 X : 빈 스트림 반환
```


### filter 

```
값 존재 O && 프레디케이트 일치 O : 값을 포함하는 Optional 반환 
값 존재 X || 프레디케이트 일치 X : 빈 Optional 반환
```


### flatMap

```
값 존재 O : 인수로 제공된 함수를 적용한 결과 Optional 반환
값 존재 X : 빈 Optional을 반환
```




---

### Prefix : if

#### ifPresent

```
값 존재 O : 지정된 Consumer를 실행
값 존재 X : 아무일도 발생 X
```

#### ifPresentOrElse

```
값 존재 O : 지정된 Consumer를 실행
값 존재 X : 아무일도 발생 X
```

#### isPresent

```
값 존재 O : true를 반환
값 존재 X : false를 반환
```

---

### Prefix : of 


#### of

```
값 존재 O : 값을 감싸는 Optional을 반환
값 존재 X : NPE 
```


#### ofNullable

```
값 존재 O : 값을 감싸는 Optional 반환
값 존재 X : 빈 Optional 반환
```

---


### Prefix : or 

#### or

```
값 존재 O : 같은 Optional 반환
값 존재 X : Supplier에서 만든 Optional 반환
```



#### orElse

```
값 존재 O : 값 반환
값 존재 X : 기본값 반환
```



#### orElseGet

```
값 존재 O : 값 반환
값 존재 X : Supplier에서 생성한 값을 반환
```


#### orElseThrow

```
값 존재 O : 값 반환
값 존재 X : Supplier에서 생성한 예외를 발생
```

