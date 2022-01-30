---
layout: post
title:  " LeetCode : 33. Search in Rotated Sorted Array "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

### Problem

```
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
```


---

### Example

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

---

### [1] Code (22. 01. 30)

*Need to Retry -> 맞긴 맞았으나 아이디어를 떠올리는 데 몇 시간 걸렸다.*

``` java
// Runtime: 0 ms
// Memory Usage: 42 MB
// Ref : https://leetcode.com/submissions/detail/630092109
class Solution {
    public int search(int[] n, int target) {

        int l = 0;
        int r = n.length - 1;
        int m;

        while (l <= r) {
            m = (l + r) / 2;

            if (n[l] == target) {
                return l;
            } else if (n[m] == target) {
                return m;
            } else if (n[r] == target) {
                return r;
            }

            // 정렬된 상태인지 체크
            if (n[l] <= n[m]) {
                if (n[l] <= target && target <= n[m]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            } else {
                if (n[l] <= target || target <= n[m]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }
        return -1;
    }
}
```

---

> Check Point

* You must write an algorithm with **$O(log_2 N)$** runtime complexity.

---

> Review

* 포기하려고 할 때 한 번 더 생각해 봤다.

  그리고 아이디어를 떠올렸고 다행히 1번에 맞췄다.


---

## Reference

* [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)