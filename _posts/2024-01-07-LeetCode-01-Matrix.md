---
layout: post
title: " LeetCode : 542. 01 Matrix "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [542. 01 Matrix](https://leetcode.com/problems/01-matrix)

### Problem

```
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
The distance between two adjacent cells is 1.
```


---

### Example

```
Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
```

---

### [1] Code (24. 01. 07)

``` java
// Runtime: 14 ms
// Memory Usage: 46.1 MB
// Ref : https://leetcode.com/submissions/detail/1139015783
class Solution {
    public int[][] updateMatrix(int[][] mat) {
        int[] dx = { 1, -1, 0, 0 };
        int[] dy = { 0, 0, 1, -1 };

        int n = mat.length;
        int m = mat[0].length;
        Queue<Pair<Integer, Integer>> q = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 1) {
                    mat[i][j] = -1;
                } else {
                    q.add(new Pair(i, j));
                }
            }
        }

        while (!q.isEmpty()) {
            Pair<Integer, Integer> node = q.poll();
            int x = node.getKey();
            int y = node.getValue();

            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i];
                int ny = y + dy[i];
                if (!isRange(n, m, nx, ny)) {
                    continue;
                }
                if (mat[nx][ny] == -1) {
                    mat[nx][ny] = mat[x][y] + 1;
                    q.add(new Pair(nx, ny));
                }
            }
        }

        return mat;
    }

    private boolean isRange(int n, int m, int x, int y) {
        if (x < 0 || x >= n || y < 0 || y >= m) {
            return false;
        }
        return true;
    }
}
```

* 30분 타이머 키고 풀었는데

  30분이 되자마자 딱 제출했다.

* 처음엔 접근을 1 값으로 시작해야지 했는데

  만약 4방향이 전부다 0이 아니라면 문제가 복잡해지기 시작했다.

* 그래서 방향을 바꿔 0에서 BFS를 돌려야겠다 생각했고

  중복해서 방문하는 걸 방지하기 위해 visit 배열을 선언하는 게 아니라

  mat 배열 자체를 바꿔버리면 되겠다 생각했다.

  어차피 -1이라면 가장 최초에 접근하는 순간이

  the distance of the nearest라고 생각했기 때문이다.

---

> Review

* BFS 아이디어는 보자마자 떠올렸는데 

  구현 방향성을 세우면서 시간을 많이 허비했다.

---

## Reference

* [542. 01 Matrix](https://leetcode.com/problems/01-matrix)