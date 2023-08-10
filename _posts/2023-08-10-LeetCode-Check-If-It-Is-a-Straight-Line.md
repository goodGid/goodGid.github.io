---
layout: post
title: " LeetCode : 1232. Check If It Is a Straight Line "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1232. Check If It Is a Straight Line](https://leetcode.com/problems/check-if-it-is-a-straight-line)

### Problem

```
You are given an array coordinates, coordinates[i] = [x, y], where [x, y] represents the coordinate of a point. Check if these points make a straight line in the XY plane.
```


---

### Example

```
Input: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
Output: true
```

---

### [1] Code (23. 08. 10)

*Need to Retry*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// Ref : https://leetcode.com/submissions/detail/964517010
class Solution {
    // Returns the delta Y.
    int getYDiff(int[] a, int[] b) {
        return a[1] - b[1];
    }
    
    // Returns the delta X.
    int getXDiff(int[] a, int[] b) {
        return a[0] - b[0];
    }
    
    public boolean checkStraightLine(int[][] coordinates) {
        int deltaY = getYDiff(coordinates[1], coordinates[0]);
        int deltaX = getXDiff(coordinates[1], coordinates[0]);
        
        for (int i = 2; i < coordinates.length; i++) {
            // Check if the slope between points 0 and i, is the same as between 0 and 1.
            if (deltaY * getXDiff(coordinates[i], coordinates[0])
                != deltaX * getYDiff(coordinates[i], coordinates[0])) {
                return false;
            }
        }
        return true;
    }
}
```

* 수학적인 기울기를 활용한 풀이

---

> Review

* 기울기를 구했던 수험생때가 생각났다.


---

## Reference

* [1232. Check If It Is a Straight Line](https://leetcode.com/problems/check-if-it-is-a-straight-line)