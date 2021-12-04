---
layout: post
title:  " LeetCode : 200. Number of Islands "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)

### Problem

```
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
```


---

### Example

```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

---

### [1] Code (21. 12. 05) (x)

``` java
class Solution {
    int[] dx = new int[] { 0, 0, 1, -1 };
    int[] dy = new int[] { 1, -1, 0, 0 };

    public int numIslands(char[][] grid) {
        int r = grid.length;
        int c = grid[0].length;
        int[][] visit = new int[r][c];

        Queue<Node> q = new LinkedList<>();
        int ans = 0;

        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (grid[i][j] == '0') {continue;}
                if (visit[i][j] == 1) {continue;}
                ans++;

                q.add(new Node(i, j));
                visit[i][j] = 1;

                while (!q.isEmpty()) {
                    Node node = q.poll();

                    for (int k = 0; k < 4; k++) {
                        int nx = node.x + dx[k];
                        int ny = node.y + dy[k];

                        if (nx < 0 || nx >= r || ny < 0 || ny >= c) {continue;}

                        if (grid[nx][ny] != '0' && visit[nx][ny] != 1) {
                            visit[nx][ny] = 1;
                            q.add(new Node(nx, ny));

                        }
                    }
                }

            }
        }
        return ans;
    }

    class Node {
        int x;
        int y;

        public Node(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
}
```

---

> Review

* 단순 구현 + BFS 풀이



---

## Reference

* [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)