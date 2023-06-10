---
layout: post
title: " LeetCode : 209. Minimum Size Subarray Sum "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum)

### Problem

```
Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.
```


---

### Example

```
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
```

---

### [1] Code (23. 06. 10)

*Need to Retry -> Sliding Window*

``` java
// Runtime: 1 ms
// Memory Usage: 56.2 MB
// Ref : https://leetcode.com/submissions/detail/967977519
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0, right = 0, sumOfCurrentWindow = 0;
        int res = Integer.MAX_VALUE;

        for (right = 0; right < nums.length; right++) {
            sumOfCurrentWindow += nums[right];

            while (sumOfCurrentWindow >= target) {
                res = Math.min(res, right - left + 1);
                sumOfCurrentWindow -= nums[left++];
            }
        }

        return res == Integer.MAX_VALUE ? 0 : res;
    }
}
```

---

> Review

* 굉장히 재밌었던 문제 !!!


---

## Reference

* [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum)