---
layout: post
title:  " Stable Sort "
categories: Algorithm
tags: sort
author: goodGid
---
* content
{:toc}

## Stable Sort란?

* 정렬 후 기존의 순서가 유지되는 정렬을 Stable Sort라고 한다.





---


## Stable Sort

* 버블 정렬, 삽입 정렬은 Stable하다.

### 머지(Merge) 정렬

* 다음과 같이 초기값이 있다고 가정하자.

![](/assets/img/algorithm/stable_sort_1.png)

* 머지 정렬은 분할을 통해 정렬을 하는 것을 뜻한다.

* 자세한 분할 과정은 생략하고 알아보자.

* 왼쪽에 1과 오른쪽에 2(2)값을 비교하여 작은 값을 

* 새로운 배열에 넣어준다.

![](/assets/img/algorithm/stable_sort_2.png)

![](/assets/img/algorithm/stable_sort_3.png)

![](/assets/img/algorithm/stable_sort_4.png)

![](/assets/img/algorithm/stable_sort_5.png)

* 위와 같은 작업을 반복하게되면 정렬된 상태를 볼 수 있다.

* 이 때 초기에 2(1)과 2(2)의 **순서**는 **유지**되는 것을 알 수 있다.

* 그렇기 때문에 **머지(Merge) 정렬**은 **Stable Sort**이다.


---


## Unstable Sort

* 선택 정렬은 Unstable하다.

### 퀵(Quick) 정렬

![](/assets/img/algorithm/stable_sort_6.png)

* Pivot의 오른쪽에 Pivot보다 작은 값이 있기 때문에

* Pivot과 Right를 Swap시켜준다.

* 그렇게 되면 정렬이 끝나게 되는데

* 2(1)과 2(2)의 순서는 뒤바뀐 것을 확인 할 수 있다.

* 그렇기 때문에 **퀵(Quick) 정렬**은 **Unstable Sort**이다.

---


### 힙(Heap) 정렬

* 최소힙을 만들기 위해 1,2,3,2 순서로 데이터를 넣은 후 정렬을 해보자.

* 트리로 구성하면 다음과 같이 만들어진다.

![](/assets/img/algorithm/stable_sort_7.png)

* 이 상태에서 최소값을 Pop하게 되면

* 처음 1이 출력되고 

* 그 다음엔 2(1)가 아닌 2(2)가 출력된다.

* 그렇기 때문에 **힙(Heap) 정렬**은 **Unstable Sort**이다.

---

## 참고

* [stable & unstable sort 에 대하여](http://blog.naver.com/zephyehu/150013176075)