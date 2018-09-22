---
layout: post
title:  " 레드 블랙(Red Black) 트리 "
categories: Algorithm
tags: Algorithm
author: goodGid
---
* content
{:toc}

## 레드 블랙(Red Black) 트리란?

* 레드 블랙 트리는 이진트리이자, 균형을 갖춘 트리이다.

* C++의 **map**이 레드 블랙 트리 기반이다.












---

## 규칙

1. 모든 노드는 Red나 Black의 색깔을 갖는다.
2. Root 노드는 항상 Black이다.
3. 모든 Leaf 노드는 **센티넬 노드(Sentinel Node)**로서 Black이다. 
4. Red 노드의 자식은 모두 Black이다. 
5. Black 노드의 자식은 Black/Red 모두 가능
6. 루트(Root)에서 Leaf로의 경로를 생각할 때, 모든 경로에 대해서 Black의 숫자는 같다. <br> 이것을 **Black Height**라고 한다.


![](/assets/img/algorithm/red_black_tree_algorithm_16.png)

* 3번 규칙은 특정 값의 딸려있는 좌우값이 Black이라는 뜻이다. 헷갈리지 않도록 하자 !

<br>

* 역시 말 보단 그림을 통해 이해를 해보자.

* 그전에 **Restructuring**과 **Recoloring** 작업에 대해서만 알아보도록 하자.

* 두 개의 차이는 삼촌 노드의 색에 유무에 따라 달라진다.

* 자기,부모 노드가 Red일 때 <br> 삼촌이 Black이면 **Restructuring** <br> 삼촌이 Red이면 **Recoloring** 

* 이것만 인지하고 예시를 통해 레드 블랙 트리를 구성해보자.

![](/assets/img/algorithm/red_black_tree_algorithm_17.png)

![](/assets/img/algorithm/red_black_tree_algorithm_18.png)


---

## 동작 과정

> 다음 값으로 레드 블랙 트리를 구성해 보자. <br> 100 150 200 300 175 180 190 160

* 예제가 이해가 안된다면 레드 블랙 트리에 값을 넣으며 어떤식으로 동작하는지 시각적으로 볼 수 있는 [시뮬레이터 사이트](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)를 통해 이해해보도록 하자.


![](/assets/img/algorithm/red_black_tree_algorithm_1.png)

* 100이 추가되면서 루트가 검정색이 된다.




![](/assets/img/algorithm/red_black_tree_algorithm_2.png)

* 삽입되는 노드는 빨간색이므로 150은 루트보다 값이 크기에 우측에 위치한다.




![](/assets/img/algorithm/red_black_tree_algorithm_3.png)

* 200이 추가 되면서 Doble Red 현상이 발생되고 Restructuring 작업이 이뤄졌다.



![](/assets/img/algorithm/red_black_tree_algorithm_4.png)

* 300이 추가 되면서 또다시 Doble Red 현상이 발생되고 이 때는 Recoloring 작업이 이뤄졌다.



![](/assets/img/algorithm/red_black_tree_algorithm_5.png)

* 175는 단순 삽입을 하는 과정을 거친다.



![](/assets/img/algorithm/red_black_tree_algorithm_6.png)

* 180이 추가되면 Recoloring 작업이 이뤄진다.



![](/assets/img/algorithm/red_black_tree_algorithm_7.png)

* 190이 추가되면 Restructuring 작업이 이뤄진다.

* 그래서 175 180 190을 **오름 차순**으로 정렬 한 후 **가운데 : 검정**, **나머지 : 빨강 색**으로 칠한다.




![](/assets/img/algorithm/red_black_tree_algorithm_8.png)

* 대망의 160 삽입이다. 

* **Restructuring**과 **Recoloring** 작업이 **연쇄적**으로 이뤄지게된다.

* 우선 Recoloring 작업이 이뤄진다. 

* 175 190은 검정으로

* 180은 빨간색으로 바뀌게 된다.





![](/assets/img/algorithm/red_black_tree_algorithm_9.png)


* 바뀐 후 엔 180과 200이 Doble Red이므로 Restructuring 작업이 이뤄진다. 

* Why? 180의 삼촌 노드이면서 200의 형제 노드인 100이 검정이기 때문이다.




![](/assets/img/algorithm/red_black_tree_algorithm_10.png)

* 150 180 200을 **오름 차순**으로 정렬 한 후 **가운데 : 검정**, **나머지 : 빨강 색**으로 칠한다.


![](/assets/img/algorithm/red_black_tree_algorithm_11.png)

* 완성된 Red Black Tree를 볼 수 있다. 

* 여기까지 이해했다면 Red Black Tree를 구성하는데 **Restructuring**과 **Recoloring** 작업 과정을 이해했다 볼 수 있다. 

* 매우 매우 축하한다 !


---

## Red Black vs AVL Tree

1. AVL trees provide faster lookups than Red Black Trees because they are more strictly balanced.

2. Red Black Trees provide faster insertion and removal operations than AVL trees as fewer rotations are done due to relatively relaxed balancing.

3. AVL trees store balance factors or heights for each node, thus requires O(N) extra space whereas Red Black Tree requires only 1 bit of information per node, thus require O(1) extra space.

4. Red Black Trees are used in most of the language libraries like map, multimap, multiset in C++ whereas AVL trees are used in databases where faster retrievals are required.




---

## 추가 정리


> Case 1. 조상이 루트일시


![](/assets/img/algorithm/red_black_tree_algorithm_12.png)



* 위 상황에서 4가 들어온다면 Recoloring 작업이 이뤄진다.

* 이 때 규칙을 따르면 <br> 1,3은 검정색으로 <br> 2는 빨간색으로 바뀌어야 하지만 <br> 그렇게 되면 루트는 검정이라는 조건에 위배되기 때문에 <br> 루트를 다시 빨 -> 검으로 색을 칠한다.
    
![](/assets/img/algorithm/red_black_tree_algorithm_13.png)


> Case 2. 조상이 루트가 아닐 시


![](/assets/img/algorithm/red_black_tree_algorithm_14.png)


* 위 상황에서 18이 들어온다면 Recoloring 작업이 이뤄진다.

* 이 때는 조상이 루트가 아니기 때문에 <br> 11과 17은 검정색으로 <br> 15는 빨간색으로 Recoloring을 하게 된다.


![](/assets/img/algorithm/red_black_tree_algorithm_15.png)


---

## 참고

* [Red Black Tree vs AVL Tree](https://www.geeksforgeeks.org/red-black-tree-vs-avl-tree/)

* [레드블랙트리 (red-black tree) 삽입](http://hamait.tistory.com/412)

* [알고리즘 ) Red-Black Tree](https://zeddios.tistory.com/237)
