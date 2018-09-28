---
layout: post
title:  " 우선순위 큐(Priority Queue) "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## To Do

``` cpp
// Root is Max Value
priority_queue<int> pq;
priority_queue<int,vector<int>,less<int> > pq;

// Root is Min Value
#include <functional>
priority_queue<int,vector<int>,greater<int> > pq;
 
```








---

## 활용

``` cpp
    priority_queue<pair<int,int>> q;
    
    q.push({1,1});
    // front : 1,1

    q.push({1,2});
    // front : 1,2
    
    q.push({2,2});
    // front : 2,2
```

* 1st 값으로 최대 값을 선정한 후 같을 시 2st 값으로 선정한다.

* 어디 사용할 수 있을까?

* (1,1) -> (n,m)로 최단으로 가야하는 문제가 있을 시 <br> 우선 순위는 x값이 증가된 상태이고 그 다음이 y값이 증가된 상태일 것이다.

* 이럴 때 (x,y)구조로 priority_queue에 넣게 되면 값이 큰 x값부터 pop을 하게 되고 그 다음이 x값은 같고 y값이 큰 값을 pop을 하게 된다.

* 즉 아래로 쭉 간 후 오른쪾으로 쭉 진행 할 수 있게 된다.

* [알고스팟]({{site.url}}/BOJ-1261/)이라는 문제를 푸는데 이러한 방식으로 [풀이](http://wookje.dance/2017/03/14/boj-1261-%EC%95%8C%EA%B3%A0%EC%8A%A4%ED%8C%9F/)를 진행한 코드가 있다.


---


## Review

* `우선순위 큐`는 실제로는 <br> priority_queue<자료형, 구현체, 비교 연산자>로 정의하는 것을 알 수 있다.

 * 자료형은 int, double, 선언한 클래스 등등..

 * 구현체는 기본적으로 vector<자료형>으로 정의된다. 
    * 이말인 즉슨 우리가 쓰는 priority_queue가 실제로는 vector 위에서 돌아가고 있다는 것이다. 
 
 * vector가 아니더라도 deque<자료형> 등을 넣어도 잘 돌아간다. 
 
 * STL에서 힙을 구현하기에 충분한 자료구조면 다 된다. <br> 근데 굳이 deque 쓸 이유는 없을 거 같으니 기본값인 vector로 쓰자. 

 * 비교 연산자는 기본적으로 less<자료형>으로 정의된다. 
    * less<자료형>은 비교 연산자 클래스인데 Max Value부터 나온다.
    * greater<자료형>은 비교 연산자 클래스인데 Min Value부터 나온다.


---

## 문제

Problem URL : **[최대 힙](https://www.acmicpc.net/problem/11279)**

Problem URL : **[최소 힙](https://www.acmicpc.net/problem/1927)**

---

## 참고

* [STL priority queue 활용법](http://koosaga.com/9)

