---
layout: post
title:  " [데이터 중심 애플리케이션 설계] 3장. 저장소와 검색 : 3. B 트리 "
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

## B 트리

### 설계 철학

* B 트리는 SS테이블과 같이 

  키로 정렬된 키-값 쌍을 유지하므로 키-값 검색과 범위 질의에 효율적이다.

* 하지만 이 점을 제외하곤 B 트리와 SS테이블의 비슷한 점은 없으며

  B 트리는 SS테이블과 **설계 철학**이 매우 다르다.

* 로그 구조화 인덱싱 방법은 

  DB를 세그먼트로 나누고 항상 순차적으로 세그먼트를 기록한다.

* 반면 B 트리는 

  고정 크기 블록으로 배열된 디스크에

  전통적으로 4KB의 고정 크기의 페이지로 나누고
  
  한 번에 하나의 페이지에 R/W 작업을 하므로

  근본적으로 H/W와 밀접한 관련이 있다.

---

### 찾고자 하는 키-값이 존재하는 페이지 식별 방법

![](/assets/img/sd/SD-Repository-and-Search-B-Tree_1.png)

* 각 페이지는 주소나 위치를 이용해 식별할 수 있다.

  이 방식으로 하나의 페이지가 다른 페이지를 참조할 수 있다.

* 그러한 페이지 중 한 페이지는 B 트리의 루트(root)로 지정되고

  여러 키와 하위 페이지의 주소 값을 포함한다.

* 그래서 특정 키를 찾으려면 루트에서 검색을 시작해

  최종적으로는 개별 키를 포함하는 페이지에 도달하여

  찾고자하는 값의 유무를 알 수 있다.
  
  추가로 B 트리와 관련한 내용은 [B-트리]({{site.url}}/FP-B-Tree) 글을 참고하자.

---

### 신뢰할 수 있는 B 트리 만들기

* B 트리의 기본적인 쓰기 동작은 

  새로운 데이터를 디스크 상의 페이지에 덮어쓴다.

* 이 동작은 덮어쓰기가 페이지 위치를 변경하지 않는다고 가정한다.

  즉 페이지를 덮어쓰더라도 페이지를 가리키는 모든 참조는 유지된다.

* LSM 트리와 같은 로그 구조화 인덱싱과는 아주 대조적인 점이다.

  (= LSM 트리는 파일에 추가만 할 뿐 같은 위치의 파일은 변경하지 않는다.)

  (= 또한 합병과 컴팩션 과정을 거치면서 특정 키의 주소가 지속해서 변경될 수 있다. )


---

### B 트리 & DB 복구 상황

* DB가 고장 난 상황에서 스스로 복구할 수 있게 만들려면

  일반적으로 디스크 상에 **쓰기 전 로그(Write-ahead log, WAL)**라고 하는 
  
  데이터 구조를 추가해 B 트리를 구현한다.

  *( WAL를 Redo Log라고도 부른다. )*

* WAL는 트리 페이지에 변경된 내용을 **적용하기 전**에

  모든 B 트리의 변경 사항을 기록하는 **추가 전용 파일**이다.

  그래서 DB가 고장 이후 복구 시 일관성 있는 B 트리로 복원하는 데 사용한다.

> 복구 시 주의 사항

* 같은 자리의 페이지를 갱신하는 작업은 쉽지 않다.

  특히 **다중 스레드** 접근이 가능하다면 **동시성 제어**까지 해야 한다.

  그렇지 않으면 일관성이 깨진 상태의 데이터를 가진 B 트리에 접근할 수 있다.

* 그래서 동시성 제어는 
  
  보통 **래치(Latch, 가벼운 잠금)**로 데이터 구조를 보호한다.

* 이런 상황에서 로그 구조화 접근 방식은 훨씬 간단하다.

  유입 질의의 간섭 없이 백그라운드에서 모든 병합을 수행 후

  새로운 세그먼트를 이전 세그먼트로 바꾸면 되기 때문이다.


---

## Refernece

* [데이터 중심 애플리케이션 설계](https://book.naver.com/bookdb/book_detail.nhn?bid=13483879)




