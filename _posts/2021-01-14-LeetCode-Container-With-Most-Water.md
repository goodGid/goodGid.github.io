---
layout: post
title:  " LeetCode : 11. Container With Most Water "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

### Problem

```
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.
Notice that you may not slant the container.
```





---

### Example

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

---

### [1] Code (21. 01. 14)

``` java
class Solution {
    public int maxArea(int[] height) {
        int ans = 0;
        int i = 0;
        int j = height.length - 1;

        while (i != j) {
            ans = Math.max(ans, (j - i) * Math.min(height[i], height[j]));
            if (height[i] > height[j]) {
                j--;
            } else {
                i++;
            }
        }
        return ans;
    }
}
```

* 문제의 아이디어를 도출해낸 과정을 정리해봤다.

```
1. 연속되어야한다.
2. 히스토그램 문제와 비슷하다.
3. O(n)에 처리해야한다.
```

* i와 j 값을 이동시키는 조건은 

  height가 작은 값을 기준으로 넓이를 구하므로

  큰 값을 옮기는 건 의미가 없다.

  그러므로 작은 값을 옮기면서 지속적으로 넓이를 구해준다.

```
1,5 -> 1 높이를 기준으로 넓이를 구함
1,4 -> 1 높이를 기준으로 넓이를 구함
```

---

### [2] Code (21. 11. 13)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

> Review

* 아이디어를 떠올리지 못했다. 


---

## Reference

* [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)