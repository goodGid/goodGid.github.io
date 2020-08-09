---
layout: post
title:  " HTTP 완벽 가이드 요약본 : 7장 캐시 "
categories: HTTP
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## Prologue

* [HTTP 완벽 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=8509980) 책을 보면서 

* 포스팅 하기엔 너무 가볍지만 

* 내가 알지 못했던 부분들을 정리하기 위해 작성하는 글이다.


## Concept


### 문서 만료

* Cache-Control와 Expires 헤더를 이용하여 

* 서버는 각 문서에 유효기간 설정이 가능하다.

---

#### Cache-Control : max-age

* HTTP/1.1

* max-age 값은 문서의 최대 나이를 정의한다.

* 최대 나이는 문서가 처음 생성된 이후부터 유효한 기간을 뜻한다.

* ex) Cache-Control: max-age=123456

---

#### Expires

* HTTP/1.0 +

* 절대 유효기간을 명시한다.

* 유효기간이 경과했다면 그 문서는 더이상 사용하면 안된다.

* ex) Expires: Fri, 16 Aug 1992, 08:00:00 GMT

---

### 재검사(Revalidation)

* 서버에게 보내는 GET 요청에 **이 헤더를 추가**하면 

* 캐시된 시간 이후 변경된 경우에만 사본을 보내달라는 의미가 된다.

* HTTP는 캐시된 객체를 재확인하기 위한 도구를 제공한다.

* 대표적으로 **If-Modified-Since**와 **If-None-Match** 헤더이다.

---

#### If-Modified-Since: date

* 축약해서 **IMS**라고도 불린다.

* 만약 문서가 주어진 날짜(= date 값) 이후로 수정되었다면 요청 메서드를 처리한다.

* 서버는 Last-Modified 헤더와 함께 응답한다.

---

#### If-None-Match: tags

* date 값으로 캐시의 유효성을 판단하는 If-Modified-Since와 달리

* If-None-Match는 **태그 값**으로 캐시의 유효성을 판단한다.

* 태그 값을 사용하여 캐시의 유효성을 판단하기 때문에

* 다음과 같은 경우에 대해 **If-Modified-Since** 보다 유용하게 대처가 가능해진다.

```
1. 내용에는 아무런 변화가 없는데 주기적으로 업데이트가 되어야하는 경우
2. 단순하게 주석을 수정하였을 경우
3. 1초보다 작은 간격으로 수정이 이뤄지는 경우
```

* 이럴 경우 단순히 원본의 값을 수정하고 태그를 유지한다면

* 캐시 서버는 통신을 하여 캐시된 데이터를 변경할 필요가 없어진다.

---

> Example : If-None-Match

* 캐시 서버가 v1.1 버전의 캐시 사본을 갖고 있다.

* 이 경우에 If-None-Match: v1.1로 API 서버에 요청을 하였을 시 

* API 서버의 데이터에는 v2.0으로 수정 되어있다면 

* 새로 업데이트된 데이터를 반환한다.

* 만약 API 서버의 데이터도 v1.1일 경우엔 데이터를 반환하지 않는다.

---


###  캐시 제어

* HTTP는 응답 헤더를 통해 캐시된 문서의 유효성을 설정할 수 있다.

* 그 방법들은 다음 우선 순위대로 적용이된다.

```
1. Cache-Control: no-store 헤더를 응답에 첨부할 수 있다.
2. Cache-Control: no-cache 헤더를 응답에 첨부할 수 있다.
3. Cache-Control: must-revalidate 헤더를 응답에 첨부할 수 있다.
4. Cache-Control: max-age 헤더를 응답에 첨부할 수 있다.
5. Expires 날짜 헤더를 응답에 첨부할 수 있다.
6. 아무 만료 정보도 주지 않고 캐시 스스로 휴리스틱 방법으로 결정한다.
```

* 위 중 no-cache와 no-store에 대해서만 알아본다.

* 나머지는 책을 참고하자.


---


#### no-cache와 no-store

* no-cache와 no-store 헤더는 캐시 서버가 

* 검증되지 않은 상태의 캐시된 객체 사용을 금지한다.

```
Cache-Control: no-store
Cache-Control: no-cache
Pragma: no-cache
```

---


##### no-store

* **no-store**가 표시된 응답은 캐시 서버가 그 응답의 사본을 만드는 것을 금지한다.

---

##### no-cache

* **no-cache**로 표시된 응답은 먼저 서버와 재검사를 하지 않고서는 

* 캐시 서버에서 캐싱한 데이터를 클라이언트에 제공할 수 없다.

* **Do Not Serve From Cache Without Revalidation** 

---

##### Pragma: no-cache

* Pragma: no-cache 헤더는 

* HTTP/1.0+와의 하위 호환성을 위해 HTTP/1.1에 포함되어 있다.

* HTTP/1.1 어플리케이션은 

* Pragma: no-cache만 이해할 수 있는 HTTP/1.0 어플리케이션에 대응해야 하는 경우가 아니라면

* Cache-Control: no-cache를 사용해야 한다.





---

## Reference

* [HTTP 완벽 가이드](https://book.naver.com/bookdb/book_detail.nhn?bid=8509980)
