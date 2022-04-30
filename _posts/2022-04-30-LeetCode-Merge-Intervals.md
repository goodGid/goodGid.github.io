---
layout: post
title:  " LeetCode : 56. Merge Intervals "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [56. Merge Intervals](https://leetcode.com/problems/merge-intervals)

### Problem

```
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
```


---

### Example

```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
```

---

### [1] Code (22. 04. 30)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 19 ms
// Memory Usage: 55.2 MB
// Ref : https://leetcode.com/submissions/detail/690093220
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        LinkedList<int[]> merged = new LinkedList<>();
        for (int[] interval : intervals) {
            // if the list of merged intervals is empty or if the current
            // interval does not overlap with the previous, simply append it.
            if (merged.isEmpty() || merged.getLast()[1] < interval[0]) {
                merged.add(interval);
            }
            // otherwise, there is overlap, so we merge the current and previous
            // intervals.
            else {
                merged.getLast()[1] = Math.max(merged.getLast()[1], interval[1]); // [1]
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}
```

* [1] : **merged.getLast()[1] = interval[1]** 

  이렇게해도 되지 않을까? 라는 생각이 들었지만

  기존 값이 새로운 범위를 포함할 경우 잘못된 merge를 하게 된다.

``` java
Input:
[[1,4],[2,3]]
Output:
[[1,3]]
Expected:
[[1,4]]
```

---

> Review

* 문제 아이디어가 떠오르지 않았다.


---

## Reference

* [56. Merge Intervals](https://leetcode.com/problems/merge-intervals)