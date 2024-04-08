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

### [2] Code (24. 04. 08)

``` java
// Runtime: 11 ms
// Memory Usage: 46.7 MB
// Ref : https://leetcode.com/submissions/detail/1226711390
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0])); // [1]

        Stack<int[]> st = new Stack<>();

        for (int[] item : intervals) {
            if (st.isEmpty()) {
                st.add(item);
            } else {
                int[] pop = st.pop();
                if (pop[1] >= item[0]) {
                    st.add(new int[] { pop[0], Math.max(pop[1], item[1]) });
                } else {
                    st.add(pop);
                    st.add(item);
                }
            }
        }

        int size = st.size();
        int[][] ans = new int[size][2];

        for (int i = size - 1; i >= 0; i--) {
            int[] pop = st.pop();
            ans[i][0] = pop[0];
            ans[i][1] = pop[1];
        }
        return ans;
    }
}
```

* 10분 소요

  보자마자 아이디어가 떠올랐고 무난하게 풀었다.

* [1] : int[]에서 int[0] 번째 값으로 정렬하는 방법을 몰라서 찾아봤다.

---

## Reference

* [56. Merge Intervals](https://leetcode.com/problems/merge-intervals)