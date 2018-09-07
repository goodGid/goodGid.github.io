---
layout: post
title:  " OLAP란 무엇인가? "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## OLAP란 무엇인가?

* OLAP(Online Analytical Processing)은 대용량 업무 데이터베이스를 구성하고 BI(Business Intelligence)를 지원하기 위해 사용되는 기술

* **데이터 웨어하우스**나 **데이터 마트**와 같은 대규모 데이터에 대해 최종 사용자가 정보에 **직접 접근**하여 **대화식**으로 정보를 분석하고 의사결정에 활용할 수 있는 실시간 분석처리









---

## OLAP 특징

| 특징 | 주요 개념 |
|:------: |:-------:|
| 다차원성   | 사용자들이 실제적인 차원에서 정보를 분석 <br> (Multidimensional View of Data)   |
| 직접 접근   | 최종사용자들이 전산부서와 같은 정보 매개자를 거치지 않고 자신이 원하는 정보에 직접 접근   |
| 대화식 분석   | 시스템과 상호작용을 통해 정보를 분석하고 <br> 원하는 정보를 얻을 때까지 계속해서 분석을 수행함(Drilling)   |
| 의사 결정용  | 기업의 전략적 방향설정 및 의사결정에 활용   |
|----

---


## OLAP 기능


| 다차원 데이터 분석 | 다양한 데이터에 접근 |
|:------: |:-------:|
| 다차원으로 구성된 데이터를 분석 <br> (기간/제품/매장의 연계분석)   | 트랜잭션 상세데이터 + DW요약데이터 관련 <br> Drill down and up|
| 다양한 계산/통계, Pivot table, 3차원 큐브 등의 기능 필요   | 신속한 질의와 응답  |
|      | 대규모 DB 지원  |
|----

---

## OLAP 분석 방법

* 여러 차원들을 따라 측정치들에 대한 빠른 접근과 강력한 계산 기능 필요

* Drill Down
    - 특정한 주제 영역에서 큰(요약된) 범위에서 작은(상세) 범위로 단계적 접근하는 분석 방법을 말한다.<br> (광역 -> 시도 -> 구 -> 동 -> 번지)
    - 분석할 항목에 대해 한 차원의 계층 구조를 따라 <br> 단계적으로 요약된 형태의 데이터 수준 -> 보다 구체적인 내용의 상세 데이터로 접근하는 기능

<br>

*  Roll Up
    - Drill Down과 반대 방향(작은 범위 -> 큰 범위)의 단계적 접근 분석 방법을 말한다. <br> (번지 -> 동 -> 구 -> 시도 -> 광역)
    - 분석할 항목에 대해 한 차원의 계층 구조를 따라 <br> 단계적으로 구체적인 내용의 상세 데이터로 -> 요약된 형태의 데이터로 접근하는 기능

<br>

* Pivot/Rotating
    - 보고서의 행, 열, 페이지 차원을 무작위로 바꾸어 볼 수 있는 기능
    - 분석 테이터의 축을 바꾸는 것.
    - T-SQL문에서 Pivot/Unpivot과 동일한 의미.

<br>

*  Slicing/Dicing
    - 주요 비즈니스 항목들을 다양한 각도에서 조회하고 자유롭게 비교하는 기능
        - Slice
            - 한 차원의 멤버나 그 이상의 멤버를 가지고 한 값을 선택했을 때 나타나는 그 부분 집합을 말한다.
            - 제품 당당자가 특정 제품에 대해서 선택할 때 나타나는 지역과 기간에 대한 집합
        - Dice
            - 특정 항목에 대해 Rotation이나 Drill down, Roll up 등을 이용하여 대화식으로 화면을 디스플레이 해가며 분석하는 프로세스를 말한다.


---

## 참고

* [OLAP(Online Analytical Processing) :: 인생극장](http://azurecourse.tistory.com/406)

* [(dBNuri) OLAP 개요](http://dbrang.tistory.com/416)

* [OLAP, 데이터 마이닝, 정보 검색](http://middleware.tistory.com/entry/OLAP-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%A7%88%EC%9D%B4%EB%8B%9D-%EC%A0%95%EB%B3%B4-%EA%B2%80%EC%83%89)