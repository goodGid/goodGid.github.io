---
layout: post
title: " LeetCode : 706. Design HashMap "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [706. Design HashMap](https://leetcode.com/problems/design-hashmap)

### Problem

```
Design a HashMap without using any built-in hash table libraries.
```


---

### Example

```
n/a
```

---

### [1] Code (23. 11. 12)

*Retry -> Map 자료 구조를 사용해서 풀었는데 다양한 아이디어 정리를 위해 기록*

``` java
// Runtime: 17 ms
// Memory Usage: 46.1 MB
// Ref : https://leetcode.com/submissions/detail/1096912531
class MyHashMap {
    private Map<Integer, Integer> map;

    public MyHashMap() {
        map = new HashMap<>();
    }
    
    public void put(int key, int value) {
        map.put(key,value);
    }
    
    public int get(int key) {
        return map.getOrDefault(key, -1);
    }
    
    public void remove(int key) {
        map.remove(key);
    }
}
```

* Map 자료구조를 사용했다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 32 ms
// Memory Usage: 54.4 MB
// Ref : https://leetcode.com/submissions/detail/1096915116
class MyHashMap {
    int[] mapArr;

    public MyHashMap() {
        mapArr = new int[1000001];
        Arrays.fill(mapArr, -1);
    }

    public void put(int key, int value) {
        mapArr[key] = value;
    }

    public int get(int key) {
        return mapArr[key];
    }

    public void remove(int key) {
        mapArr[key] = -1;
    }
}
```

* Map 자료 구조를 사용하지 않고

  Map의 시간복잡도를 구현하는 방법

  대신 n 값의 제한이 있어서 가능

---

> Review

* 실제로 HashMap의 내부 구현 코드가 궁금해졌다.

  $O(1)$를 충족시키는 코드는 어떻게 되어 있을까?

---

## Reference

* [706. Design HashMap](https://leetcode.com/problems/design-hashmap)