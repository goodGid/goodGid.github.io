---
layout: post
title:  " 프림(Prim) 알고리즘 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}



## 신장 트리란?

* 신장 트리란 비중있는 그래프 상에서 정점과 정점 사이에 경로를 단일화한 트리를 말한다.

* 그리고 **최소 신장 트리(MST, Minimum Spanning Tree)**란 정점과 정점 사이의 경로의 합이 최소인 신장 트리를 말한다.

* 그래프에서 MST를 만드는 여러가지 방법 중 많이 알려진 방법으로는 **프림 알고리즘**과 **크루스칼 알고리즘**이 있다.

* **프림 알고리즘**은 **정점**을 추가하면서 트리를 확장하는 방법이고, <br> **크루스칼 알고리즘**은 **간선**을 추가하면서 최소 신장 트리를 만드는 방법이다.

* 그래프에서는 **트리**와 비슷하게 **노드(Node)**와 **엣지(Edge)**로 구성되어 있다. 

* 그래프에서는 **노드(Node)**를 **버텍스(Vertex)**, **엣지(Edge)**를 **아크(Arc)**라고 부른다.









---

## Prim Algorithm

* **프림(Prim) MST(Minimum Spanning Tree, 최소 신장 트리)**라고도 한다.

* **그리디(Greedy) 알고리즘**이다.

* 가중치가 있는 연결된 무향 그래프의 모든 꼭짓점을 포함하면서 각 변의 비용의 합이 최소가 되는 부분 그래프인 트리이다.

* 한 Vertex를 기준으로 가능한 작은 가중치의 Arc를 사용해서 모든 Vertex를 연결하는 트리를 만든다. <br> 즉, 최소의 Arc 값만 사용해서 모든 Vertex를 연결한다.


---


## Prim Algorithm Process

```
0. 어떤 점에서 시작하던 상관없다.
1. 그래프에서 임의의 하나의 정점을 선택한다.
2. 선택한 정점과 인접하는 정점들중 최소 비용의 간선이 존재하게되는 정점을 선택한다.
3. 1,2 과정을 반복 하여 모든 정점이 선택될까지 한다.
```

![](/assets/img/algorithm/prim_algorithm_1.png)

![](/assets/img/algorithm/prim_algorithm_2.png)

![](/assets/img/algorithm/prim_algorithm_3.png)

![](/assets/img/algorithm/prim_algorithm_4.png)

![](/assets/img/algorithm/prim_algorithm_5.png)

![](/assets/img/algorithm/prim_algorithm_6.png)





> Q. 최소 신장트리는 최단 경로인가?

* 답은 아니다. 

* 예를 들어보자.

![](/assets/img/algorithm/prim_algorithm_7.png)

* 최단 경로처럼 보이지만 `A->E`가는 길은 최소 신장 트리인 `ACDE`보다 `ACE`가 더 짧다.

* 최단 경로를 구하는 알고리즘은 [다익스트라 알고리즘]()을 사용한다.



---

## 참고 블로그

* [프림(Prim) MST(Minimum Spanning Tree 최소 신장 트리)](http://swlock.blogspot.com/2016/02/prim-mstminimum-spanning-tree.html)

* [최소 신장 트리(MST, minimum spanning tree)](https://www.zerocho.com/category/Algorithm/post/584bcd42580277001862f1a7)

