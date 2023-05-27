---
layout: post
title: " LeetCode : 367. Valid Perfect Square "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [367. Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square)

### Problem

```
Given a positive integer num, return true if num is a perfect square or false otherwise.
A perfect square is an integer that is the square of an integer. In other words, it is the product of some integer with itself.
You must not use any built-in library function, such as sqrt.
```


---

### Example

```
Input: num = 16
Output: true
Explanation: We return true because 4 * 4 = 16 and 4 is an integer.
```

---

### [1] Code (23. 05. 27)

*Need to Retry -> Reference Code를 보자 !!!*

``` java
// Runtime: 0 ms
// Memory Usage: 39.8 MB
// Ref : https://leetcode.com/submissions/detail/958224524
class Solution {
    public boolean isPerfectSquare(int num) {
        int l = 0;
        int r = num;
        int m;
        boolean ans = false;

        while (l <= r) {
            m = l + (r - l) / 2;
            long sq = (long) m * m; // [1]
            if (num == sq) {
                ans = true;
                break;
            } else if (num < sq) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
        return ans;
    }
}
```

* [1] : 그냥 m*m을 하면 [틀린다.](https://leetcode.com/submissions/detail/958221192)

---

> Reference Code

**Code 1**

``` java
// Runtime: 1 ms
// Memory Usage: 39.8 MB
// Ref : https://leetcode.com/submissions/detail/958223372
class Solution {
    public boolean isPerfectSquare(int num) {
        int i = 1;
        while (num > 0) {
            num -= i;
            i += 2;
        }
        return num == 0;
    }
}
```

* 너무나도 신기했던 풀이

  수학적인 사고로 접근했던 풀이

  ref : [Java Detailed Explaination with Full trace for both perfect and non perfect square , beats 100%](https://leetcode.com/problems/valid-perfect-square/discuss/3333620/Java-Detailed-Explaination-with-Full-trace-for-both-perfect-and-non-perfect-square-beats-100)

```
Notice this pattern : 1,3,5,7,9,11,13,15,17 => series of odd numbers is only goin to give you a square in every operation , for example :

1+3 = 4
4+5 = 9
9+7 = 16
16+9 = 25
25+11 = 36
36+13 = 49
49+15 = 64
64+17 = 81

So, when we subtract keep subtracting our number with the series of odd numbers then one situation will occur either our number gets reduced to negative number or it gets reduced to 0 and if our number get reduced to 0 then 100% our number is a Perfect square otherwise it is not .
```

---

> Review

* Reference Code에 적은 내용을 기억하자 !


---

## Reference

* [367. Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square)