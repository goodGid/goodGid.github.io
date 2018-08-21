---
layout: post
title:  " m-원 탐색 트리 "
categories: 파일처리
tags: 파일처리
author: goodGid
---
* content
{:toc}


# m-원 탐색 트리

* 이원 탐색 트리보다 분기율을 높이면 : m개 서브트리

* 장점 <br> 트리의 높이가 감소 (특정 노드의 탐색시간 감소)

* 단점 <br> 삽입,삭제 시 트리의 균형 유지 위해 복잡한 연산 필요

---

# m-원 탐색 트리의 성질

{% capture images %}
    /assets/img/file_processing/m_search_tree_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


<br>

---

# m-원 탐색 트리의 분석

* m-원 탐색 트리 탐색시간 : `탐색 경로 길이(높이)`에 비례

    * 각 레벨에서는 한 개의 노드만 탐색

    * 분기율(m)을 최대로 하면 트리의 높이가 낮아짐

* Point가 m개 <br> Key는 m-1개

