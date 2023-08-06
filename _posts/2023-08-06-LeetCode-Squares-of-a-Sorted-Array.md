---
layout: post
title: " LeetCode : 977. Squares of a Sorted Array "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [977. Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array)

### Problem

```
Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.
```


---

### Example

```
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
```

---

### [1] Code (23. 08. 06)

*Need to Retry -> 정렬이 되어있다는 점을 활용하자*

``` java
// TLE 발생
class Solution {
    public int[] sortedSquares(int[] nums) {
        List<Integer> list = new LinkedList<>();

        int plusIdx = nums.length;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] >= 0) {
                plusIdx = Math.min(plusIdx, i);
                list.add(nums[i] * nums[i]);
            }
        }

        int listSize = list.size();
        for (int i = 0; i < nums.length - listSize; i++) {
            int val = nums[i] * nums[i];

            int insertIdx = 0;
            for (int j = 0; j < list.size(); j++) {
                if (list.get(j) > val) {
                    insertIdx = j;
                    break;
                }
                insertIdx = j;
            }
            list.add(insertIdx, val);
        }

        int[] ans = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            ans[i] = list.get(i);
        }

        return ans;
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Ref : https://leetcode.com/problems/squares-of-a-sorted-array/discuss/3855119/Concise-Java-Solution-using-Pointer
class Solution {
    public int[] sortedSquares(int[] nums) {
        int i = 0, j = nums.length;
        int[] sorted = new int[j--];
        int count = j;
        while (i <= j) {
            sorted[count--] =(nums[i] * nums[i] > nums[j] * nums[j]) ? nums[i] * nums[i++] : nums[j] * nums[j--];
        }
        return sorted;
    }
}
```

* 이렇게 간단명료한 풀이로 해결할 수 있다니...

  정렬이 되어있다는 점을 활용한 풀이라는 생각이 들었다.

---

> Review

* EASY 문제였는데

  HARD처럼 풀려고 했네...


---

## Reference

* [977. Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array)