---
layout: post
title:  " Priority Queue "
date:   2018-02-15
excerpt: "  Priority Queue "
cate : "algorithm"
tag:
- Key Point
---


## Related Problem
Problem URL : **[최대 힙](https://www.acmicpc.net/problem/11279)**
Problem URL : **[최소 힙](https://www.acmicpc.net/problem/1927)**

---

{% highlight cpp %}

// Root is Max Value
priority_queue<int> pq;
priority_queue<int,vector<int>,less<int> > pq;

// Root is Min Value
priority_queue<int,vector<int>,greater<int> > pq;
 
{% endhighlight %}




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

## Related Resource

* 참고 Blog

1. [Blog 1](http://koosaga.com/9)

