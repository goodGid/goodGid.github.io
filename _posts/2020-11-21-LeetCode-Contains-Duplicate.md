---
layout: post
title:  " LeetCode : 217. Contains Duplicate "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [217. Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

### Problem

```
Given an array of integers, find if the array contains any duplicates.
Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
```

---

### Example

```
Input: [1,2,3,1]
Output: true
```



---

### Code (20. 11. 21)

* 직관적으로 풀기

``` java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);

        for (int i = 1; i < nums.length; i++) {
            if (nums[i - 1] == nums[i]) {
                return true;
            }
        }
        return false;
    }
}
```


* Stream()을 이용한 풀이 

``` java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);

        for (int i = 1; i < nums.length; i++) {
            if (nums[i - 1] == nums[i]) {
                return true;
            }
        }
        return false;
    }
}
```


---

## Reference

* [217. Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

