---
layout: post
title:  " LeetCode : 34. Find First and Last Position of Element in Sorted Array "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

### Problem

```
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.
If target is not found in the array, return [-1, -1].
Follow up: Could you write an algorithm with O(log n) runtime complexity?
```





---

### Example

```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

---

### [1] Code (21. 02. 09)

``` java
class Solution {
    public int[] searchRange(int[] nums, int target) {

        int lo = 0;
        int hi = nums.length - 1;
        int pos = -1;
        int lo_idx = -1;
        int hi_idx = -1;

        while (lo <= hi) { // [4] : 이진 탐색
            int mid = lo + (hi - lo) / 2; // [5] : 범위 초과 방지

            if (nums[mid] == target) {
                pos = mid;
                break;
            } else if (nums[mid] > target) {
                hi = mid - 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            }
        }

        lo_idx = pos;
        hi_idx = pos;

        if (pos != -1) {
            // find low index
            for (int i = pos - 1; i >= 0; i--) {
                if (nums[i] == target) {
                    lo_idx = i;
                } else {
                    break;
                }
            }

            // find hi index
            for (int i = pos + 1; i < nums.length; i++) {
                if (nums[i] == target) {
                    hi_idx = i;
                } else {
                    break;
                }
            }
        }
        return new int[] { lo_idx, hi_idx };
    }
}
```

> Check Point

1. 오름차순 정렬 배열

2. 시작 / 끝의 위치를 찾는다.

3. target이 없다면 [-1,-1]을 return

4. O(log n) 시간에 탐색

5. nums, target 값의 범위는 pow(10,9) 이므로 int형으로 커버 가능

---

* 4번 조건을 보고 **이진 탐색**을 떠올렸다.

  그리고 target 값의 위치 1개만 찾는 게 아니라 

  좌/우로도 찾아야 하므로

  좌/우 index를 찾는 for loop를 돌려서 찾아주었다.

* [5] : 이 문제에는 해당 사항이 없지만

  혹시라도 (hi + lo) / 2 처럼 하였을 경우

  hi + lo가 int의 범위를 초과할 수 있으므로

  lo + (hi - lo) / 2로 mid 값을 찾았다.



---

## Reference

* [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)