---
layout: post
title:  " LeetCode : 221. Maximal Square "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [221. Maximal Square](https://leetcode.com/problems/maximal-square)

### Problem

```
Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
```


---

### Example

```
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4
```

---

### [1] Code (22. 03. 27)

*Need to Retry*

``` java
// Runtime: 770 ms
// Memory Usage: 395.2 MB
// Ref : https://leetcode.com/submissions/detail/668119376
class Solution {
    public int maximalSquare(char[][] matrix) {
        char ZERO = '0';
        char ONE = '1';

        int ans = 0;
        int n = matrix.length;
        int m = matrix[0].length;
        int maxSize = Math.min(n, m);
        int[][][] dp = new int[n][m][maxSize + 1];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                ans = Math.max(ans, 1);
                if (matrix[i][j] == ZERO) {
                    dp[i][j][1] = ZERO;
                } else {
                    dp[i][j][1] = ONE;
                }
            }
        }

        for (int s = 2; s <= maxSize; s++) {
            for (int i = s - 1; i < n; i++) {
                for (int j = s - 1; j < m; j++) {

                    if (matrix[i][j] == ZERO) {
                        dp[i][j][s] = ZERO;
                        continue;
                    }

                    if (dp[i - 1][j][s - 1] == ONE
                        && dp[i][j - 1][s - 1] == ONE
                        && dp[i - 1][j - 1][s - 1] == ONE) {
                        ans = Math.max(ans, s * s);
                        dp[i][j][s] = ONE;
                    } else {
                        dp[i][j][s] = ZERO;
                    }
                }
            }
        }
        return ans;
    }
}
```

* 풀고 보니 비효율적인 코딩이었다.

---

> Reference Code

``` java
// Runtime: 4 ms
// Memory Usage: 54.3 MB
// Ref : https://leetcode.com/submissions/detail/668126085
class Solution {
    public int maximalSquare(char[][] matrix) {
        int rows = matrix.length;
        int cols = rows > 0 ? matrix[0].length : 0;
        int[][] dp = new int[rows + 1][cols + 1];
        int res = 0;

        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                if (matrix[i - 1][j - 1] == '1') {
                    dp[i][j] = Math.min(Math.min(dp[i][j - 1], dp[i - 1][j]), dp[i - 1][j - 1]) + 1;
                    res = Math.max(res, dp[i][j]);
                }
            }
        }
        return res * res;
    }
}
```

---

> Review

* 문제를 보고 DP 구나라는 생각이 들었지만

  거기서 쉬운 길이 아닌 어려운 길을 선택한 느낌이다.

---

## Reference

* [221. Maximal Square](https://leetcode.com/problems/maximal-square)