---
layout: post
title:  " LeetCode : 54. Spiral Matrix "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

### Problem

```
Given an m x n matrix, return all elements of the matrix in spiral order.
```





---

### Example

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

---

### [1] Code (21. 02. 16)

``` java
class Solution {

    int[] dx = { 0, 1, 0, -1 };
    int[] dy = { 1, 0, -1, 0 };

    public List<Integer> spiralOrder(int[][] matrix) {

        List<Integer> answer = new LinkedList<>();
        boolean[][] isVisit = new boolean[matrix.length][matrix[0].length];

        return solve(answer, matrix, isVisit, 0, 0, 0);
    }

    private List<Integer> solve(List<Integer> answer, int[][] matrix, boolean[][] isVisit,
                                int dir, int x, int y) {

        isVisit[x][y] = true;
        answer.add(matrix[x][y]);

        int nx = x + dx[dir];
        int ny = y + dy[dir];

        int nextDir = getNextDirection(dir + 1);
        int nx2 = x + dx[nextDir];
        int ny2 = y + dy[nextDir];

        if (isInRange(matrix, nx, ny)
            && isVisit[nx][ny] == false) {
            solve(answer, matrix, isVisit, dir, nx, ny);

        } else if (isInRange(matrix, nx2, ny2)
                   && isVisit[nx2][ny2] == false) {
            solve(answer, matrix, isVisit, nextDir, nx2, ny2);
        }

        return answer;

    }

    private int getNextDirection(int dir) {
        return dir % 4;
    }

    private boolean isInRange(int[][] matrix, int x, int y) {
        return x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
    }
}
```

> Check Point

1. 달팽이 모양으로 순회하면서 인자 값 출력

2. input 값에 대해서는 고려하지 않아도 됨

3. 코너 케이스는 따로 없어 보임

---

> Algorithm Description

* 단순 구현문제


---

## Reference

* [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)