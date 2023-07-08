---
layout: post
title: " LeetCode : 724. Find Pivot Index "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [724. Find Pivot Index](https://leetcode.com/problems/find-pivot-index)

### Problem

```
Given an array of integers nums, calculate the pivot index of this array.
The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.
If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.
Return the leftmost pivot index. If no such index exists, return -1.
```


---

### Example

```
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11
```

---

### [1] Code (23. 07. 08) (x)

``` java
// Runtime: 1 ms
// Memory Usage: 43.8 MB
// Ref : https://leetcode.com/submissions/detail/989300018
class Solution {
    public int pivotIndex(int[] nums) {
        
        int n = nums.length;
        int[] dp = new int[n+2];
        
        for (int i=0; i<n; i++) {
            dp[i+1] = nums[i] + dp[i];
        }

        int ans = -1;
        for (int i=1; i<=n; i++) { 
            if (dp[i-1] == dp[n] - dp[i]) {
                return i-1;
            }
        }
        
        return -1;
    }
}
```

* 10분 소요

---

> Review

* 재밌게 풀었던 문제 !

---

## Reference

* [724. Find Pivot Index](https://leetcode.com/problems/find-pivot-index)