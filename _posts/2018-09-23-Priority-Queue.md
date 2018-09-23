---
layout: post
title:  " 우선순위 큐 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## To Do

* 우선순위 큐가 어떤식으로 돌아가는지 알아보자.











``` cpp
    priority_queue<pair<int,int>> q;
    
    q.push({1,1});
    // front : 1,1

    q.push({1,2});
    // front : 1,2
    
    q.push({2,2});
    // front : 2,2
```

---

## Review

* 1st 값으로 최대 값을 선정한 후 같을 시 2st 값으로 선정한다.

* 어디 사용할 수 있을까?

* (1,1) -> (n,m)로 최단으로 가야하는 문제가 있을 시 <br> 우선 순위는 x값이 증가된 상태이고 그 다음이 y값이 증가된 상태일 것이다.

* 이럴 때 (x,y)구조로 priority_queue에 넣게 되면 x값이 큰거부터 pop을 하게 되고 그 다음이 x값은 같고 y값이 큰 값을 pop할 수 있게 된다.

* [알고스팟]({{site.url}}/BOJ-1261/)이라는 문제를 푸는데 이러한 방식으로 [풀이](http://wookje.dance/2017/03/14/boj-1261-%EC%95%8C%EA%B3%A0%EC%8A%A4%ED%8C%9F/)를 진행한 코드가 있다.