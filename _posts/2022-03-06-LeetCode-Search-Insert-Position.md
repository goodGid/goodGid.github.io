---
layout: post
title:  " LeetCode : 35. Search Insert Position "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)

### Problem

```
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
You must write an algorithm with O(log n) runtime complexity.
```


---

### Example

```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

---

### [1] Code (22. 03. 06) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 44 MB
// Ref : https://leetcode.com/submissions/detail/654547353
class Solution {
    public int searchInsert(int[] nums, int target) {
        int idx = Arrays.binarySearch(nums, target);

        if (idx >= 0) {
            return idx;
        }

        int ans = nums.length;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > target) {
                ans = i;
                break;
            }
        }
        return ans;
    }
}
```

---

> Check Point

* You must write an algorithm with O(log n) runtime complexity.

---

> Algorithm Description

* BinarySearch로 값이 있는지 체크한다.

  없으면 insert 할 위치를 찾는다.

---

> Review

* 10분 소요

---

### [2] Code (22. 03. 29) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 41.6 MB
// Ref : https://leetcode.com/submissions/detail/669684158
class Solution {
    public int searchInsert(int[] nums, int target) {
        if (target > nums[nums.length - 1]) {
            return nums.length;
        }
        int pos = -1;

        int l = 0;
        int r = nums.length;
        int m;

        while (l <= r) {
            m = (l + r) / 2;
            if (nums[m] == target) {
                pos = m;
                break;
            }

            if (nums[m] > target) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }

        if (pos == -1) {
            pos = l;
        }

        return pos;
    }
}
```

* Reference Code는 매우 깔끔한데

  내가 짠 코드는 깔끔한 느낌이 안 든다. ㅠ ㅠ

---

> Reference Code

``` java
// Ref : https://leetcode.com/problems/search-insert-position/discuss/15080/My-8-line-Java-solution
class Solution {
    public int searchInsert(int[] A, int target) {
        int low = 0, high = A.length-1;
        while(low<=high){
            int mid = (low+high)/2;
            if(A[mid] == target) return mid;
            else if(A[mid] > target) high = mid-1;
            else low = mid+1;
        }
        return low;
    }
}
```

* 왜 low를 return 하는지 궁금하다면 [댓글](https://leetcode.com/problems/search-insert-position/discuss/15080/My-8-line-Java-solution/156972)을 읽어보자.


---

## Reference

* [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)