---
layout: post
title:  " LeetCode : 463. Island Perimeter "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [463. Island Perimeter](https://leetcode.com/problems/island-perimeter)

### Problem

```
You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.
```


---

### Example

```
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
```

---

### [1] Code (22. 06. 20) (x)

``` java
// Runtime: 34 ms
// Memory Usage: 68 MB
// Ref : https://leetcode.com/submissions/detail/726505159
class Solution {
    public int islandPerimeter(int[][] grid) {
        Queue<Node> q = new LinkedList<>();
        int ans = 0;
        int row = grid.length;
        int col = grid[0].length;
        int[][] visit = new int[row][col];

        int[] dx = new int[] { 1, -1, 0, 0 };
        int[] dy = new int[] { 0, 0, 1, -1 };

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (grid[i][j] == 1) {
                    q.add(new Node(i, j));
                    visit[i][j] = 1;
                    break;
                }
            }
        }

        while (!q.isEmpty()) {
            Node node = q.poll();
            for (int i = 0; i < 4; i++) {
                int nx = dx[i] + node.x;
                int ny = dy[i] + node.y;

                if (!isRange(grid, nx, ny)) {
                    ans++;
                } else if (grid[nx][ny] == 0) {
                    ans++;
                } else if (grid[nx][ny] == 1 && visit[nx][ny] == 0) {
                    visit[nx][ny] = 1;
                    q.add(new Node(nx, ny));
                }
            }
        }
        return ans;
    }

    private boolean isRange(int[][] grid, int x, int y) {
        int row = grid.length;
        int col = grid[0].length;

        if (x < 0 || x >= row) {
            return false;
        }
        if (y < 0 || y >= col) {
            return false;
        }
        return true;
    }

    public class Node {
        int x;
        int y;

        public Node(int _x, int _y) {
            x = _x;
            y = _y;
        }
    }
}
```

---

> Reference Code

``` java
// Runtime: 12 ms
// Memory Usage: 61.7 MB
// Ref : https://leetcode.com/submissions/detail/726513554
class Solution {
    public int islandPerimeter(int[][] grid) {
        int perimeter = 0;

        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) {
                    if (i - 1 == -1 || grid[i - 1][j] == 0) {
                        perimeter++;
                    }
                    if (i + 1 == grid.length || grid[i + 1][j] == 0) {
                        perimeter++;
                    }
                    if (j - 1 == -1 || grid[i][j - 1] == 0) {
                        perimeter++;
                    }
                    if (j + 1 == grid[0].length || grid[i][j + 1] == 0) {
                        perimeter++;
                    }
                }
            }
        }
        return perimeter;
    }
}
```

* 직관적으로 계산을 한다.

---

> Review

* 20분 소요


---

## Reference

* [463. Island Perimeter](https://leetcode.com/problems/island-perimeter)