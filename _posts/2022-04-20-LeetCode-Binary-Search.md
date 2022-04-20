---
layout: post
title:  " LeetCode : 704. Binary Search "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [704. Binary Search](https://leetcode.com/problems/binary-search)

### Problem

```
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.
```


---

### Example

```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
```

---

### [1] Code (22. 04. 20) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 54.5 MB
// Ref : https://leetcode.com/submissions/detail/684156351
class Solution {
    public int search(int[] nums, int t) {
        int l = 0;
        int r = nums.length-1;
        
        int mid = - 1;
        while (l <= r) {
            mid = (l + r) / 2;
            
            if (nums[mid] == t) {
                break;
            } else if (nums[mid] < t) {
                l = mid +1;
            } else {
                r = mid -1;
            }
        }
        
        return nums[mid] == t ? mid : -1 ;
    }
}
```

---

> Review

* 10분 소요

  너무 Easy 하다.

---

## Reference

* [704. Binary Search](https://leetcode.com/problems/binary-search)