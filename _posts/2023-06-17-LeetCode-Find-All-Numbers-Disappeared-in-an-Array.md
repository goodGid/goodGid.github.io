---
layout: post
title: " LeetCode : 448. Find All Numbers Disappeared in an Array "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [448. Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array)

### Problem

```
Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

Follow up: Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.
```


---

### Example

```
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
```

---

### [1] Code (23. 06. 17)

*Need to Retry -> Follow Up 충족시키는 풀이 아이디어 떠올리는 것이 중요 !*

``` java
n/a
```

* Follow Up 충족시키는 아이디어 떠올리지 못함.

---

> Reference Code

**Code 1**

``` java
// Runtime: 6 ms
// Memory Usage: 53.9 MB
// Ref : https://leetcode.com/submissions/detail/973093009
class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        List<Integer> list = new ArrayList<>();
        int idx = -1;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] < 0) {
                idx = nums[i] * -1 - 1;
            } else {
                idx = nums[i] - 1;
            }

            if (nums[idx] > 0) {
                nums[idx] = -nums[idx];
            }
        }

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                list.add(i + 1);
            }
        }
        return list;
    }
}
```

* 알고리즘 풀이

```
For each value in the array mark its presence by making the number negative at that place in array
eg. if you hae array [3,1,4,1] for 3, i will go to index 2 and make its value negative ie. now nums[2] becomes -4. present array: [3,1,-4,1]
for 1, i will go to index 0 and make its value negative ie. now nums[0] becomes -3. present array: [-3,1,-4,1]
for 4, (take abs value), i will go to index 3 and make its value negative ie. now nums[3] becomes -1. present array: [-3,1,-4,-1]
for 1 take abs value), i will go to index 0 as it is already -ve do nothing. present array: [-3,1,-4,-1]
At last I will have [-3,1,-4,-1]. now i will iterate over the array, whichever idx has positive value that number will not be in the array so as we have nums[1]>0 so 2 is not in the list.
```

---

> Review

* 너무 재밌었던 문제

* **$O(N)$ && without extra space** 조건을 충족시켜야 하는 문제에 대해서

  input 값을 수정 + index를 활용해야 한다는 가르침을 배웠다.


---

## Reference

* [448. Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array)