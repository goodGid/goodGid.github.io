---
layout: post
title: " LeetCode : 52. N-Queens II "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [52. N-Queens II](https://leetcode.com/problems/n-queens-ii/)

### Problem

```
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
Given an integer n, return the number of distinct solutions to the n-queens puzzle.
```


---

### Example

```
Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
```

---

### [1] Code (23. 01. 29)

*Need to Retry*

``` java
// Runtime: 2 ms
// Memory Usage: 39 MB
// Ref : https://leetcode.com/submissions/detail/887367174/
class Solution {
    private int ans = 0;
    private int[][] visit;

    public int totalNQueens(int n) {
        visit = new int[n][n];
        dfs(n, 0, 0);
        return ans;
    }

    private void dfs(int n, int stLine, int cnt) {
        if (cnt == n) {
            ans++;
            return;
        }

        for (int i = 0; i < n; i++) {
            if (visit[stLine][i] == 0) {
                visit(n, stLine, i);
                cnt++;
                dfs(n, stLine + 1, cnt);
                unVisit(n, stLine, i);
                cnt--;
            }
        }
    }

    private void visit(int n, int x, int y) {
        visit[x][y]--;
        for (int i = 0; i < n; i++) {
            visit[x][i]++;
        }

        for (int i = 0; i < n; i++) {
            visit[i][y]++;
        }

        for (int i = 1; i < n; i++) {
            if (x + i >= n || y + i >= n) {
                break;
            }
            visit[x + i][y + i]++;
        }

        for (int i = 1; i < n; i++) {
            if (x - i < 0 || y - i < 0) {
                break;
            }
            visit[x - i][y - i]++;
        }

        for (int i = 1; i < n; i++) {
            if (x + i >= n || y - i < 0) {
                break;
            }
            visit[x + i][y - i]++;
        }

        for (int i = 1; i < n; i++) {
            if (x - i < 0 || y + i >= n) {
                break;
            }
            visit[x - i][y + i]++;
        }
    }

    private void unVisit(int n, int x, int y) {
        visit[x][y]++;
        for (int i = 0; i < n; i++) {
            visit[x][i]--;
        }

        for (int i = 0; i < n; i++) {
            visit[i][y]--;
        }

        for (int i = 1; i < n; i++) {
            if (x + i >= n || y + i >= n) {
                break;
            }
            visit[x + i][y + i]--;
        }

        for (int i = 1; i < n; i++) {
            if (x - i < 0 || y - i < 0) {
                break;
            }
            visit[x - i][y - i]--;
        }

        for (int i = 1; i < n; i++) {
            if (x + i >= n || y - i < 0) {
                break;
            }
            visit[x + i][y - i]--;
        }

        for (int i = 1; i < n; i++) {
            if (x - i < 0 || y + i >= n) {
                break;
            }
            visit[x - i][y + i]--;
        }
    }

    private void print(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(visit[i][j] + "");
            }
            System.out.println();
        }
        System.out.println();
    }
}
```

* 52분 소요

* 방향 체크 로직 구현하면서 이게 최선은 아닐텐데 라는 생각이 강력하게 듬

---

## Reference

* [52. N-Queens II](https://leetcode.com/problems/n-queens-ii/)