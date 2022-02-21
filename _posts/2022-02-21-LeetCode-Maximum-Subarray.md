---
layout: post
title:  " LeetCode : 53. Maximum Subarray "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

### Problem

```
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
A subarray is a contiguous part of an array
```


---

### Example

```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

---

### [1] Code (22. 02. 21) (x)

``` java
// Runtime: 1 ms
// Memory Usage: 51.6 MB
// Ref : https://leetcode.com/submissions/detail/645962717/
class Solution {
    public int maxSubArray(int[] nums) {
        int sum = 0;
        int cur = 0;
        int ans = nums[0];
        
        for (int i : nums) {
            cur = i;
            if (sum + cur < 0) {
                ans = Math.max(ans, cur);
                sum = cur < 0 ? 0 : cur;
            } else {
                sum += cur;
                ans = Math.max(ans, sum);
            }
        }
        
        return ans;
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 2 ms
// Memory Usage: 89.7 MB
// Ref : https://leetcode.com/submissions/detail/611484077/
class Solution {
    public int maxSubArray(int[] nums) {
        int n = nums.length;
        int max = Integer.MIN_VALUE, sum = 0;

        for (int i = 0; i < n; i++) {
            sum += nums[i];
            max = Math.max(sum, max);

            if (sum < 0) {sum = 0;}
        }

        return max;
    }
}
```

---

> Review

* 20분 소요

  어렵지 않게 풀었다.

---

## Reference

* [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)