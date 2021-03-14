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

## Example

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

## [1] Code (21. 03. 14)

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

## Reference

* [146. LRU Cache](https://leetcode.com/problems/lru-cache/)