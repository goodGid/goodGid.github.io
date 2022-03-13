---
layout: post
title:  " LeetCode : 146. LRU Cache "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [146. LRU Cache](https://leetcode.com/problems/lru-cache/)

## Problem

* Need to Retry

```
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Could you do get and put in O(1) time complexity?
```





---

### Example

```
Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

---

### [1] Code (21. 03. 14)

``` java
class LRUCache {
    private final Map<Integer, Integer> map;
    private final int capacity;

    public LRUCache(int capacity) {
        map = new LinkedHashMap<>(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return map.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        map.put(key, value);

        if (map.size() > capacity) {
            int leastUsedKey = map.keySet().iterator().next();
            map.remove(leastUsedKey);
        }
    }
}
```

> Check Point

* LRU Cache를 구현한다.

---

> Algorithm Description

* 직접 구현하는 방법이 있겠지만

  Java에서 제공하는 Method를 사용하는 방식이다.

  나중엔 직접 구현해서 다시 풀어도 좋을 듯싶다.

---

### [2] Code (22. 03. 13)

*Need to Retry -> 1시간 넘게 시간을 투자했는데 실패했다. 어렵다.*

``` java
// 1. Ref : https://leetcode.com/submissions/detail/658986643 ( Runtime Error )
// 2. Ref : https://leetcode.com/submissions/detail/658988042 ( Wrong Answer )
// 3. Ref : https://leetcode.com/submissions/detail/658991959 ( Time Limit Exceeded )
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 13 ms
// Memory Usage: 47.2 MB
// Ref : https://leetcode.com/submissions/detail/466215845
class LRUCache {
    private final Map<Integer, Integer> map;
    private final int capacity;

    public LRUCache(int capacity) {
        map = new LinkedHashMap<>(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return map.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        map.put(key, value);

        if (map.size() > capacity) {
            int leastUsedKey = map.keySet().iterator().next();
            map.remove(leastUsedKey);
        }
    }
}
```

* **LinkedHashMap**는 순서를 보장해준다.

  그래서 만약 1,2,3,4 순서로 값이 들어가 있는 상태에서

  *map.keySet( ).iterator( ).next( )* 를 호출하면

  가장 앞에 있는 "1" 값이 Return 된다.

---

> Review

* 어렵다는 말밖에...

  이런 구현류의 문제가 많이 약함을 또 느꼈다.

* 그래도 쉽게 포기하지 않고 계속 붙잡고 지칠 때까지 도전하다 결국 정답 코드를 확인했다.

---

## Reference

* [146. LRU Cache](https://leetcode.com/problems/lru-cache/)