---
layout: post
title: " LeetCode : 665. Non-decreasing Array "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [665. Non-decreasing Array](https://leetcode.com/problems/non-decreasing-array/)

### Problem

```
Given an array nums with n integers, your task is to check if it could become non-decreasing by modifying at most one element.
We define an array is non-decreasing if nums[i] <= nums[i + 1] holds for every i (0-based) such that (0 <= i <= n - 2).
```


---

### Example

```
Input: nums = [4,2,3]
Output: true
Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
```

---

### [1] Code (23. 01. 22)

*Need to Retry -> 아이디어를 떠올리지 못함*

``` java
// Ref : https://leetcode.com/submissions/detail/882879404/
// 틀린 코드
class Solution {
    public boolean checkPossibility(int[] nums) {
        
        int count = 1;
        int max = nums[0];
        
        for (int i=1; i<nums.length; i++) {
            if (nums[i] >= max) {
                max = nums[i];
            } else if (count == 0) {
                return false;
            } else {
                max = nums[i];
                count--;
            }
        }
        return true;
    }
}
```

* i 값을 보는 시점에

  nums[i-1]를 변경해야 할 지

  nums[i]를 변경해야 할 지에 대한 판단을 내리지 못했다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 1 ms
// Memory Usage: 43.5 MB
// ref : https://leetcode.com/submissions/detail/882964756
class Solution {
    public boolean checkPossibility(int[] nums) {
	for (int i=1, modified=0; i<nums.length; i++) {
		if (nums[i-1] > nums[i]) {
			if (modified++ == 1) return false;
			if (i<2 || nums[i-2] <= nums[i]) nums[i-1] = nums[i];
			else nums[i] = nums[i-1];
		}
	}
	return true;
    }
}
```

* nums[i-2]를 보면서 nums[i-1] 과 nums[i] 값 중 어떤 값을 수정할지 정한다.

---

> Review

* 쉬운 듯싶었으나 어려웠던 문제


---

## Reference

* [665. Non-decreasing Array](https://leetcode.com/problems/non-decreasing-array/)