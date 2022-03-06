---
layout: post
title:  " LeetCode : 35. Search Insert Position "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)

### Problem

```
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
You must write an algorithm with O(log n) runtime complexity.
```


---

### Example

```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

---

### [1] Code (22. 03. 06) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 44 MB
// Ref : https://leetcode.com/submissions/detail/654547353
class Solution {
    public int searchInsert(int[] nums, int target) {
        int idx = Arrays.binarySearch(nums, target);

        if (idx >= 0) {
            return idx;
        }

        int ans = nums.length;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > target) {
                ans = i;
                break;
            }
        }
        return ans;
    }
}
```

---

> Check Point

* You must write an algorithm with O(log n) runtime complexity.

---

> Algorithm Description

* BinarySearch로 값이 있는지 체크한다.

  없으면 insert 할 위치를 찾는다.

---

> Review

* 10분 소요

---

## Reference

* [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)