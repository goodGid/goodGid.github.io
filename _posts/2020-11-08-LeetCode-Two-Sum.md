---
layout: post
title:  " LeetCode : 1. Two Sum "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [Two Sum (Easy)](https://leetcode.com/problems/two-sum/)

### Problem

```
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.
```
 
---

### Example

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
```

---

### Code (20. 11. 08)

``` java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    throw new IllegalArgumentException("No two sum solution");
}
```

---

## Summary

* 정말 오랜만에 Algorithm을 푸려니까 머리가 돌아가지 않는다.

  꾸준히 풀어줘야겠다.

---

## Reference

* [1. Two Sum](https://leetcode.com/problems/two-sum/)