---
layout: post
title:  " LeetCode : 1029. Two City Scheduling "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1029. Two City Scheduling](https://leetcode.com/problems/two-city-scheduling)

### Problem

```
A company is planning to interview 2n people. Given the array costs where costs[i] = [aCosti, bCosti], the cost of flying the ith person to city a is aCosti, and the cost of flying the ith person to city b is bCosti.
Return the minimum cost to fly every person to a city such that exactly n people arrive in each city.
```


---

### Example

```
Input: costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110
```

---

### [1] Code (22. 04. 23)

*Need to Retry -> 문제 해석 못함 + 아이디어 떠올리지 못함.*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 2 ms
// Memory Usage: 42.9 MB
// Ref : https://leetcode.com/submissions/detail/685736231
class Solution {
    public int twoCitySchedCost(int[][] costs) {
        int minSumB = 0;
        for (int i = 0; i < costs.length; i++) {
            minSumB += costs[i][1];
        }

        PriorityQueue<Integer> abDiff = new PriorityQueue<>();

        for (int i = 0; i < costs.length; i++) {
            abDiff.add(costs[i][0] - costs[i][1]);
        }

        for (int i = 0; i < costs.length / 2; i++) {
            minSumB += abDiff.poll();
        }
        return minSumB;
    }
}
```

---

> Review

* 처음에 문제 해석이 안됐다.

  문제를 이해한 후 아이디어가 떠오르지 않았다.





---

## Reference

* [1029. Two City Scheduling](https://leetcode.com/problems/two-city-scheduling)