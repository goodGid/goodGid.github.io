---
layout: post
title: " LeetCode : 658. Find K Closest Elements "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [658. Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements)

### Problem

```
Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:

|a - x| < |b - x|, or
|a - x| == |b - x| and a < b
```


---

### Example

```
Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]
```

---

### [1] Code (23. 06. 04)

*Need to Retry -> 재밌던 문제, 다시 풀어볼 땐 다른 아이디어 접근으로 해보자.*

``` java
// Runtime: 54 ms
// Memory Usage: 45 MB
// Ref : https://leetcode.com/submissions/detail/960008053
class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {

        PriorityQueue<int[]> pq = new PriorityQueue<>((o1, o2) -> {
            int compare = Integer.compare(Math.abs(o1[0]), Math.abs(o2[0]));

            // 첫 번째 값이 같은 경우, 두 번째 값으로 비교
            if (compare == 0) {
                return Integer.compare(o1[1], o2[1]);
            }
            return compare;
        });

        // 1 2 4 5 3
        for (int i = 0; i < arr.length; i++) {
            pq.add(new int[]{arr[i] - x, i});
        }


        List<Integer> ans = new ArrayList<>();
        while (k-- > 0) {
            ans.add(pq.poll()[0] + x);
        }
        Collections.sort(ans);
        return ans;
    }
}
```

---

> Review

* PriorityQueue 사용방법이 효율성 측면에서 좋지 않았다.

  PriorityQueue 말고 다른 방법으로도 풀어보도록 하자.

  이번에 풀 때 다른 코드를 공부하려 했으나 귀찮아서 패스...


---

## Reference

* [658. Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements)