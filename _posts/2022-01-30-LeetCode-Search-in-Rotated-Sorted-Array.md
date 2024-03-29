---
layout: post
title:  " LeetCode : 33. Search in Rotated Sorted Array "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

### Problem

```
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
```


---

### Example

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

---

### [1] Code (22. 01. 30)

*Need to Retry -> 맞긴 맞았으나 아이디어를 떠올리는 데 몇 시간 걸렸다.*

``` java
// Runtime: 0 ms
// Memory Usage: 42 MB
// Ref : https://leetcode.com/submissions/detail/630092109
class Solution {
    public int search(int[] n, int target) {

        int l = 0;
        int r = n.length - 1;
        int m;

        while (l <= r) {
            m = (l + r) / 2;

            if (n[l] == target) {
                return l;
            } else if (n[m] == target) {
                return m;
            } else if (n[r] == target) {
                return r;
            }

            // 정렬된 상태인지 체크
            if (n[l] <= n[m]) {
                if (n[l] <= target && target <= n[m]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            } else {
                if (n[l] <= target || target <= n[m]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }
        return -1;
    }
}
```

---

> Check Point

* You must write an algorithm with **$O(log_2 N)$** runtime complexity.

---

> Review

* 포기하려고 할 때 한 번 더 생각해 봤다.

  그리고 아이디어를 떠올렸고 다행히 1번에 맞췄다.

---

### [2] Code (22. 03. 20)

*Need to Retry -> 맞혔으나 다시 한 번 풀어보자.*

``` java
// Runtime: 1 ms
// Memory Usage: 42 MB
// Ref : https://leetcode.com/submissions/detail/663115137 
class Solution {
    public int search(int[] n, int target) {
        int l = 0;
        int r = n.length - 1;
        int m;

        while (l <= r) {
            m = (l + r) / 2;

            if (n[m] == target) {
                return m;
            }

            if (n[l] <= n[m]) {
                if (n[l] <= target && target <= n[m]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            } else {
                if (n[m] <= target && target <= n[r]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
        }
        return -1;
    }
}
```

---

> Review

* 25분 소요

* 정답 코드 템플릿이 어렴풋이 떠올랐다.

  그래도 디테일한 부분은 스스로 떠올렸다.

  그리고 이런 문제에서 부등호 여부를 판단하는 건 언제나 어려운 거 같다.

---

### [3] Code (24. 03. 09)

*Retry*

``` java
// Runtime: 0 ms
// Memory Usage: 42.1 MB
// Ref : https://leetcode.com/submissions/detail/1198110166
class Solution {
    public int search(int[] nums, int target) {
        return search(nums, 0, nums.length-1, target);
    }
    
    public int search(int[] nums, int l, int r, int target) {
        int mid = 0;
        
        while (l <= r) {
            mid = (l+r) / 2;
            
            if (nums[mid] == target) {
                return mid;
            }
            
            if (nums[l] <= nums[mid] && nums[mid] <= nums[r]) { // [1] : 정렬 되어있는 상태
                if (nums[mid] == target) {
                    return mid;
                } else if (nums[mid] < target) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            } else { // [2] : 정렬 안되어있는 상태
                int leftRangeAns = search(nums, l, mid-1, target);
                if (leftRangeAns != -1) {
                    return leftRangeAns;
                }
                
                int rightRangeAns = search(nums, mid+1, r, target);
                if (rightRangeAns != -1) {
                    return rightRangeAns;
                }
                return -1;
            }
        }
        return -1;
    }
}
```

* [1] : 정렬이 되어있다면 이분 탐색으로 진행

* [2] : 정렬이 안되어있다면 이런 저런 고민을 하다가 

  mid를 중심으로 좌우측으로 탐색을 돌리면 되지 않을까 생각이 들었다.

  한가지 걸렸던 게 문제 시간 복잡도가 조건으로 제시되어있었으나

  2 * $O(log_2 N)$는 어차피 $O(log_2 N)$ 이니까 괜찮겠다 생각했다.

  You must write an algorithm with **$O(log_2 N)$** runtime complexity.

---

> Review

* 1시간가량 걸렸다.

  포기하지 않고 푼 나 자신에게 박수를 보내지만

  코드 자체가 엄청 깔끔한 느낌은 아니라 찝찝함이 남아있다.


---

## Reference

* [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)