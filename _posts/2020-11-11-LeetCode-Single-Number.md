---
layout: post
title:  " LeetCode : 136. Single Number "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [Single Number](https://leetcode.com/problems/single-number/)

### Problem

```
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
Follow up: Could you implement a solution with a linear runtime complexity and without using extra memory?
```
 
---

### Example

```
Input: nums = [2,2,1]
Output: 1
```

---

### [1] Code (20. 11. 11)

``` java
public int singleNumber(int[] nums) {

    HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();

    for (int i = 0; i < nums.length; i++) {
        Integer value = map.getOrDefault(nums[i], 0);
        map.put(nums[i], value + 1);
    }

    int ans = 0;
    for (int i = 0; i < nums.length; i++) {
        if (map.get(nums[i]) == 1) {
            ans = nums[i];
            break;
        }
    }

    return ans;
}
```

* 문제 의도와는 다르게 막 풀었다.

  사실 XOR로 푸는게 정확한 답이다.

---

> Feed Back

**Case 1**

``` java
public int singleNumber(int[] nums) {
    int ans = 0;
    for (int i = 0; i < nums.length; i++) {
        ans ^= nums[i];
    }
    return ans;
}
```

* XOR은 같으면 0 

  다르면 1이다.

---

### [2] Code (21. 10. 02)

``` java
public int singleNumber(int[] nums) {
    int ans = 0;
    for (int i = 0; i < nums.length; i++) {
        ans ^= nums[i];
    }
    return ans;
}
```

* XOR 풀이 방법

---

## Reference

* [136. Single Number](https://leetcode.com/problems/single-number/)
