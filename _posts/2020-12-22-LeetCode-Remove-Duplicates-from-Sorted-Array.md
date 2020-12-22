---
layout: post
title:  " LeetCode : 26. Remove Duplicates from Sorted Array "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

### Problem

```
Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.
```





---

### Example

```
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4]
```

---

### [1] Code (20. 12. 22)

``` java
class Solution {
    public int removeDuplicates(int[] nums) {

        int idx1 = 1;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[idx1-1]) {
                continue;
            }
            nums[idx1] = nums[i];
            idx1++;
        }

        return idx1;
    }
}
```

* 추가 메모리 사용하지 않고 2 포인터로 풀기

---

## Reference

* [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)