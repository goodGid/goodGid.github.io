---
layout: post
title: " LeetCode : 304. Range Sum Query 2D - Immutable "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [304. Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/)

### Problem

```
Given a 2D matrix matrix, handle multiple queries of the following type:

Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
Implement the NumMatrix class:

NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.
int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
You must design an algorithm where sumRegion works on O(1) time complexity.
```


---

### Example

```
Input
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output
[null, 8, 11, 12]
```

---

### [1] Code (23. 02. 05)

*Need to Retry -> 누적합 아이디어를 아예 떠올리지 못했다.*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 123 ms
// Memory Usage: 65.8 MB
// Ref : https://leetcode.com/submissions/detail/891677611
class NumMatrix {
    private int[][] sums;

    public NumMatrix(int[][] matrix) {
        int n = matrix.length;
        int m = matrix[0].length;
        sums = new int[n + 1][m + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                sums[i][j] = sums[i - 1][j] + sums[i][j - 1] + matrix[i - 1][j - 1] - sums[i - 1][j - 1];
            }
        }
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        int RED_RECTANGLE = sums[row2 + 1][col2 + 1];
        int PURPLE_RECTANGLES = sums[row1][col2 + 1] + sums[row2 + 1][col1];
        int BLUE_RECTANGLE = sums[row1][col1];
        return RED_RECTANGLE - PURPLE_RECTANGLES + BLUE_RECTANGLE;
    }
}
```

* 알고리즘에 대한 설명은 [DP Visualised + Interview Tips](https://leetcode.com/problems/range-sum-query-2d-immutable/discuss/2104317/DP-Visualised-%2B-Interview-Tips)글 을 참고하자 !!!

---

> Review

* 누적합이라는 개념을 못 떠올렸다.

  알고리즘 심폐소생이 많이 필요하다.


---

## Reference

* [304. Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/)