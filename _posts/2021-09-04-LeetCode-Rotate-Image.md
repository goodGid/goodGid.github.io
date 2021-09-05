---
layout: post
title:  " LeetCode : 48. Rotate Image "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [48. Rotate Image](https://leetcode.com/problems/rotate-image/)

### Problem

```
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
```


---

### Example

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

---

### [1] Code (21. 09. 04)

*Need to Retry*

``` java
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        transpose(matrix, n);
        reflect(matrix, n);
    }

    public void transpose(int[][] arr, int n) {
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = arr[i][j];
                arr[i][j] = arr[j][i];
                arr[j][i] = temp;
            }
        }
    }

    public void reflect(int[][] arr, int n) {
        for (int i = 0; i < n; i++) {
            for (int j = n - 1; j >= n / 2; j--) {
                int temp = arr[i][j];
                arr[i][j] = arr[i][n - j - 1];
                arr[i][n - j - 1] = temp;
            }
        }
    }
}
```

> FeedBack

* 시계 방향으로 회전시킨다.

> Reference Code

``` java
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < n; i++) {
            for (int j = n - 1; j >= 0; j--) {
                stack.push(matrix[i][j]);
            }
        }
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int x = stack.pop();
                matrix[j][i] = x;
            }
        }
    }
}  
```

* **Stack**을 활용한 [풀이 방법](https://leetcode.com/problems/rotate-image/discuss/491853/using-stack-java)도 참고하자.

> Review

* transpose/reflect 방법은 너무 참신했다.

* 추가로 위 알고리즘에 대한 설명은 [Solution](https://leetcode.com/problems/rotate-image/solution/)에 너무 자세하게 나와 있다.



---

## Reference

* [48. Rotate Image](https://leetcode.com/problems/rotate-image/)