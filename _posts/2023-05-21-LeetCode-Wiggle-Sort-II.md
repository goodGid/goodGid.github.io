---
layout: post
title: " LeetCode : 324. Wiggle Sort II "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [324. Wiggle Sort II](https://leetcode.com/problems/wiggle-sort-ii)

### Problem

```
Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....
You may assume the input array always has a valid answer.
```


---

### Example

```
Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
Explanation: [1,4,1,5,1,6] is also accepted.
```

---

### [1] Code (23. 05. 21)

*Need to Retry -> 아이디어 떠올리다 정답 체크*


> Reference Code

**Code 1**

``` java
// Runtime: 5 ms
// Memory Usage: 47.4 MB
// Ref : https://leetcode.com/submissions/detail/954282190

class Solution {
    public void wiggleSort(int[] nums) {
       int n=nums.length-1;
        //copy values to new array
       int[] newarr=Arrays.copyOf(nums,nums.length);
        //sort new array
       Arrays.sort(newarr);
        //old arr=1,5,1,1,6,4
        //new arr=1,1,1,4,5,6
        //now lets apply odd position and even position
        //odd position
        for(int i=1;i<nums.length;i+=2)
            nums[i]=newarr[n--];
        //even position
        for(int i=0;i<nums.length;i+=2)
            nums[i]=newarr[n--];
    }
}
```

* 설명이 필요없는 깔끔한 코드 ! 

---

**Code 2**

``` java
// Runtime: 5 ms
// Memory Usage: 47 MB
// Ref : https://leetcode.com/submissions/detail/954282986

class Solution {
    public void wiggleSort(int[] nums) {
        Arrays.sort(nums);
        int[] res = new int[nums.length];
        int j = nums.length - 1;
        int i = 1;
        while (j >= 0) {
            if (i > nums.length - 1) { // [1]
                i = 0;
            }
            res[i++] = nums[j--];
            i++;
        }
        for (i = 0; i < res.length; i++) {
            nums[i] = res[i];
        }
    }
}
```

* [1] : if문을 사용하여 Code 1과 같게 동작시킨다.

  i = 1로 두고 
  
  while 동작 시 i 값을 +=2 해준다.

  이렇게 함으로써 for 2개를 while 1개로 대체할 수 있게 된다.

---

> Review

* 아이디어 굉장히 재밌었다.

---

## Reference

* [324. Wiggle Sort II](https://leetcode.com/problems/wiggle-sort-ii)