---
layout: post
title:  " LeetCode : 120. Triangle "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [120. Triangle](https://leetcode.com/problems/triangle/)

### Problem

```
Given a triangle array, return the minimum path sum from top to bottom.
For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.
```


---

### Example

```
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
```

---

### [1] Code (22. 04. 02) (x)

``` java
// Runtime: 6 ms
// Memory Usage: 44.5 MB
// Ref : https://leetcode.com/submissions/detail/672007431
class Solution {
    public int minimumTotal(List<List<Integer>> t) {
        int ans = 10001;
        int size = t.size();
        int[][] dp = new int[size][size];

        for (int i = 0; i < t.size(); i++) {
            for (int j = 0; j < t.get(i).size(); j++) {
                dp[i][j] = 10001;
            }
        }

        dp[0][0] = t.get(0).get(0);

        for (int i = 1; i < size; i++) {
            int size2 = t.get(i).size();
            for (int j = 0; j < size2; j++) {
                if (isRange(i - 1, j - 1)) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1]);
                }
                if (isRange(i - 1, j)) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 1][j]);
                }
                dp[i][j] += t.get(i).get(j);
            }
        }

        for (int i = 0; i < size; i++) {
            ans = Math.min(ans, dp[size - 1][i]);
        }

        return ans;
    }

    private boolean isRange(int i, int j) {
        if (0 <= j && j <= i) {
            return true;
        }
        return false;
    }
}
```

---

> Check Point

* Could you do this using only O(n) extra space, where n is the total number of rows in the triangle?

---

> Algorithm Description

* 직관적으로 DP가 생각났다.

---

> Review

* 15분 소요

---

## Reference

* [120. Triangle](https://leetcode.com/problems/triangle/)