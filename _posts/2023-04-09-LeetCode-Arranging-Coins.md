---
layout: post
title: " LeetCode : 441. Arranging Coins "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [441. Arranging Coins](https://leetcode.com/problems/arranging-coins)

### Problem

```
You have n coins and you want to build a staircase with these coins. The staircase consists of k rows where the ith row has exactly i coins. The last row of the staircase may be incomplete.

Given the integer n, return the number of complete rows of the staircase you will build.
```


---

### Example

```
Input: n = 5
Output: 2
```

---

### [1] Code (23. 04. 09)

*Need to Retry -> Easy였지만 Easy하지 않았다.*

``` java
// Runtime: 3 ms
// Memory Usage: 41.7 MB
// Ref : https://leetcode.com/submissions/detail/719562692
class Solution {
  public int arrangeCoins(int n) {
    long left = 0, right = n;
    long k, curr;
    while (left <= right) {
      k = left + (right - left) / 2;
      curr = k * (k + 1) / 2;

      if (curr == n) return (int)k;

      if (n < curr) {
        right = k - 1;
      } else {
        left = k + 1;
      }
    }
    return (int)right;
  }
}
```

* 등차수열의 식은 가볍게 떠올렸는데 

  그다음 Binary Search를 접목시키는 아이디어를 떠올렸어야 했다.

---

## Reference

* [441. Arranging Coins](https://leetcode.com/problems/arranging-coins)