---
layout: post
title:  " [데이터 중심 애플리케이션 설계] 3장. 저장소와 검색 : 6. 컬럼 지향 저장소 "
categories: SystemDesign
author: goodGid
---
* content
{:toc}

> 이 글은 [책](https://book.naver.com/bookdb/book_detail.nhn?bid=13483879) 내용을 토대로 작성하였습니다.

## 목차

1. [DB를 강력하게 만드는 데이터 구조]({{site.url}}/SD-Repository-and-Search-Data-Structures-that-Make-the-DB-powerful)

2. [SS테이블과 LSM 트리]({{site.url}}/SD-Repository-and-Search-SS-table-and-LSM-tree)

3. [B 트리]({{site.url}}/SD-Repository-and-Search-B-Tree)

4. [B 트리와 LSM 트리 비교]({{site.url}}/SD-Repository-and-Search-Comparison-of-B-tree-and-LSM-tree)

5. [기타 색인 구조]({{site.url}}/SD-Repository-and-Search-Other-Index-Structures)

6. [컬럼 지향 저장소]({{site.url}}/SD-Repository-and-Search-Column-Oriented-Storage)


---

## 컬럼 지향 저장소

* 대부분의 OLTP 디비는 로우(Row) 지향 방식으로 데이터를 배치한다.

  로우 지향 방식의 테이블에서 한 로우의 모든 값은 서로 인접하게 저장된다.

  이점은 Document DB와 비슷하다.

  // Document DB는 보통 하나의 연속된 바이트 열로 저장이 되어있다.

![](/assets/img/sd/SD-Repository-and-Search-Column-Oriented-Storage_1.png)

* fact_sales.date_key, fact_sales.product_sk 에 인덱스가 잡혀있다고 가정을 해보자.

* 로우 지향 저장소 엔진이 위 쿼리를 처리하기 위해서는

  디스크로부터 모든 로우를 메모리로 적재 후 
  
  조건에 충족하는 로우만 필터링을 해야 한다.

---

### 개념

> 모든 값을 하나의 로우에 함께 저장하지 않는 대신 **각 컬럼별로 모든 값을 함께 저장한다.**

![](/assets/img/sd/SD-Repository-and-Search-Column-Oriented-Storage_2.png)

* 각 컬럼을 개별 파일에 저장하면

  쿼리에 사용되는 컬럼만 읽으면 되므로 작업량이 많이 줄어든다.

* 또한 컬럼 파일에 포함된 로우가 모두 같은 순서이다.

  그러므로 만약 n번째 로우의 값을 모아서 보고 싶다면

  각 개별 컬럼 파일의 n번째 값들을 모으면 된다.


---

### 컬럼 압축

* 쿼리에서 사용하는 컬럼을 디스크에서 읽어 적재하는 작업 외에도

  데이터를 압축하면 디스크 처리량을 더 줄일 수 있다.

  그래서 컬럼 지향 저장소는 **압축**에 적합하다.

![](/assets/img/sd/SD-Repository-and-Search-Column-Oriented-Storage_2.png)

* 위 그림에서 각 컬럼 값들을 보면

  중복된 값을 많이 볼 수 있으므로 압축을 하기에 굉장히 좋은 데이터 구조이다.

---

#### 비트맵 부호화

![](/assets/img/sd/SD-Repository-and-Search-Column-Oriented-Storage_3.png)

* 컬럼을 압축하는 다양한 기법 중

  데이터 웨어하우스에서 가장 효과적인 **비트맵 부호화(Bitmap Endocing)**에 대해 알아보자.

* 보통 컬럼에서 고유 값의 수는 로우 수에 비해 적다.
  
  그러므로 n개의 고유 값을 가진 컬럼을 가져와

  n개의 개별 비트맵으로 변환할 수 있다.

  (ex. 소매 업체는 수십억 개의 판매 거래가 있지만 고유 제품은 10,000개이다.)

---

### 컬럼 저장소의 순서 정렬

* 컬럼 저장소에서 로우가 저장되는 순서가 반드시 중요하지 않다.

  그러므로 각 컬럼 파일에 덧붙여 추가하는 방식을 사용할 수 있다.

  그리고 그 방법이 가장 편리하기도 하다.

* 하지만 이전의 [SS테이블]({{site.url}}/SD-Repository-and-Search-SS-table-and-LSM-tree/#ss테이블과-lsm-트리)에서 했던 것처럼 

  **순서**를 도입해 성능을 향상 시킬 수 있다.

* 각 컬럼을 독립적으로 정렬하면

  컬럼의 어떤 항목이 동일한 로우에 속하는지 알 수 없으므로 

  컬럼별로 저장이 되어있어도 한번에 전체 로우를 정렬해야 한다.

* 디비 관리자는 공통 쿼리에 대한 지식을 사용해 

  테이블에서 정렬해야 하는 컬럼을 선택할 수 있다.

> Example

```
쿼리가 지난 달(last month)처럼 시간 범위를 목표로 한다면
1차 정렬 키를 date_key로 하는 게 좋다.
그러면 쿼리 최적화기는 모든 로우를 스캔하지 않고
지난달에 해당하는 로우만 스캔할 수 있어 훨씬 빠르다.

만약 1차 정렬을 한 결과물 중에
같은 값을 가진 로우들을 대상으로
추가로 정렬을 하고 싶다면 
2차 정렬 키값을 지정하면 된다.
```

* 컬럼을 순서대로 정렬하였을 경우의 **컬럼 압축**에 도움이 되고

  이런 효과는 1차 정렬 키에서 가장 강력하다.

  2,3차 정렬 키는 그보다 뒤섞여 있어 반복된 값이 그렇게 길지 않다.

---

## 컬럼 지향 저장소에 쓰기

* 컬럼 지향 저장소, 압축, 정렬은 

  Read는 빠르게 하지만 Write는 어렵게 한다는 단점이 있다.

* 예를 들어 B 트리와 같이 

  제자리 갱신(Update-in-Place) 접근 방식은 압축된 컬럼에서 불가능하다.

  왜냐하면 정렬된 테이블의 중간에 있는 로우에 데이터를 삽입하려면
  
  모든 컬럼 파일을 재작성해야 하기 때문이다.

* 그래야지 각 컬럼의 n번째를 데이터를 모으면 
  
  n번째 로우를 만들 수 있다는 전제를 무너뜨리지 않을 수 있다.

* 위 문제를 해결할 수 있는 방법의 하나는 [LSM 트리]({{site.url}}/SD-Repository-and-Search-Comparison-of-B-tree-and-LSM-tree/#b-트리와-lsm-트리-비교)이다.

  모든 쓰기는 인메모리 저장소로 이동해

  정렬된 구조에 추가하고 디스크에 쓸 준비를 한다.

  인메모리 저장소가 디스크에 쓸 데이터를 충분히 모았으면

  디스크의 컬럼 파일에 병합하고 대량으로 새로운 파일에 기록한다.


---

## Refernece

* [데이터 중심 애플리케이션 설계](https://book.naver.com/bookdb/book_detail.nhn?bid=13483879)

