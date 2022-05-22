---
layout: post
title:  " LeetCode : 1260. Shift 2D Grid "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1260. Shift 2D Grid](https://leetcode.com/problems/shift-2d-grid)

### Problem

```
Given a 2D grid of size m x n and an integer k. You need to shift the grid k times.

In one shift operation:

Element at grid[i][j] moves to grid[i][j + 1].
Element at grid[i][n - 1] moves to grid[i + 1][0].
Element at grid[m - 1][n - 1] moves to grid[0][0].
Return the 2D grid after applying shift operation k times.
```


---

### Example

```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[9,1,2],[3,4,5],[6,7,8]]
```

---

### [1] Code (22. 05. 23)

*Need to Retry -> 단순 구현이 아닌 수학적 접근을 필요로 한다.*

``` java
// Runtime: 23 ms
// Memory Usage: 55.1 MB
// Ref : https://leetcode.com/submissions/detail/704872905
class Solution {
    public List<List<Integer>> shiftGrid(int[][] grid, int k) {
        List<List<Integer>> ans = new ArrayList<>();

        int xl = grid.length;
        int yl = grid[0].length;
        int[][] list = new int[xl][yl];

        while (k-- > 0) {
            for (int i = 0; i < xl; i++) {
                for (int j = 0; j < yl; j++) {
                    int val = grid[i][j];
                    if (isRange(grid, i, j + 1)) {
                        list[i][j + 1] = val;
                    } else if (i + 1 < xl) {
                        list[i + 1][0] = val;
                    } else {
                        list[0][0] = val;
                    }
                }
            }

            copy(grid, list);
        }

        for (int i = 0; i < xl; i++) {
            ans.add(new ArrayList<>());
            for (int j = 0; j < yl; j++) {
                ans.get(i).add(grid[i][j]);
            }
        }

        return ans;
    }

    private boolean isRange(int[][] grid, int x, int y) {
        if (x < 0 || x >= grid.length) {
            return false;
        }

        if (y < 0 || y >= grid[0].length) {
            return false;
        }
        return true;
    }

    private void copy(int[][] grid, int[][] list) {
        int xl = grid.length;
        int yl = grid[0].length;

        for (int i = 0; i < xl; i++) {
            for (int j = 0; j < yl; j++) {
                grid[i][j] = list[i][j];
            }
        }
    }

    private void print(int[][] grid) {
        int xl = grid.length;
        int yl = grid[0].length;

        for (int i = 0; i < xl; i++) {
            for (int j = 0; j < yl; j++) {
                int val = grid[i][j];
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}
```

---

> Review

* 직관적으로 풀 수 있었으나 효율성이 좋지 않은 코드를 작성했다.

  정답 코드를 보니 수학적인 접근으로 푸는 게 문제의 요구사항이었던 거 같다.

---

## Reference

* [1260. Shift 2D Grid](https://leetcode.com/problems/shift-2d-grid)