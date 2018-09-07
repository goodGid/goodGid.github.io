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

## 참고

* [OLAP(Online Analytical Processing) :: 인생극장](http://azurecourse.tistory.com/406)