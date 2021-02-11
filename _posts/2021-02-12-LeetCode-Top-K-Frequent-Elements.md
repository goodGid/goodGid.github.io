---
layout: post
title:  " LeetCode : 347. Top K Frequent Elements "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

### Problem

```
Given a non-empty array of integers, return the k most frequent elements.
```





---

### Example

```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

---

### [1] Code (21. 02. 12)

``` java
class Solution {
    public int[] topKFrequent(int[] nums, int k) {

        HashMap<Integer, Integer> map = new HashMap<>();

        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }

        PriorityQueue<int[]> pQueue = new PriorityQueue<>(
                (newItem, oldItem) -> Integer.compare(oldItem[1], newItem[1]));

        for (Map.Entry<Integer, Integer> entries : map.entrySet()) {
            pQueue.add(new int[] { // [1]
                    entries.getKey(),
                    entries.getValue()
            });
        }

        int[] ans = new int[k];
        for (int i = 0; i < k; i++) {
            ans[i] = pQueue.poll()[0];
        }
        return ans;
    }
}
```

> Check Point

1. 주어진 배열에서 k번째까지 많이 나온 값을 출력

2. 시간 복잡도는 O(nlogn)

3. 정답 배열의 순서는 상관없다.

---

> Algorithm Description

* Map에 input으로 들어온 모든 값을 넣는다.

  그리고 해당 값을 이용해 k번째까지 많이 나온 값을 뽑아내면 된다.

* [1] : pQueue에 넣을 때 Object를 만들어야 하나 고민했는데

  굳이 그럴 필요 없이 int[] 형식으로 넣었다.

  은근한 꿀 팁이지 않을까 싶다.

---

> Review

* Map에 넣는 거까지는 쉬웠는데

  Map에 있는 값들을 sort 하는 부분에 대한 고민이 생겼다.

* 위 고민에 대한 해답으로는 Heap 자료구조를 사용하였다.

---

## Reference

* [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)