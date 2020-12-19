---
layout: post
title:  " LeetCode : 69. Sqrt(x) "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [69. Sqrt(x)](https://leetcode.com/problems/sqrtx/)

### Problem

```
Given a non-negative integer x, compute and return the square root of x.
Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.
```





---

### Example

```
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.
```

---

### [1] Code (20. 12. 19)

``` java
class Solution {
    public int mySqrt(int x) {

        long pivot = 1;

        while (true) {
            if (pivot * pivot > x) {
                return (int) pivot - 1;
            }
            pivot ++;
        }
    }
}
```

* 시간이 오래 걸리지만 맞았다.

  조심해야하는 부분은 int 형으로 하면 범위를 벗어날 수 있으므로

  long 타입으로 계산하였다.


---


### [2] Code (20. 12. 19)

``` java
class Solution {
    public int mySqrt(int x) {
        if (x == 0) { return 0; }

        int lo = 1, hi = x;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2; // [1]

            if (mid <= x / mid && (mid + 1) > x / (mid + 1)) { // [2]
                return mid;
            } else if (mid <= x / mid) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return lo;
    }
}
```

* Binary Search로 풀 수 있다.

* 위 코드에 몇 가지 중요한 포인트가 있다.

> [1] Point

``` java
lo + (hi - lo) / 2
= (lo + hi) / 2
```
 
* 왜 저렇게 표현했을까를 보면

  (lo +hi)를 하면 **Overflow**가 발생할 수 있다.

  그러므로 연산자 우선 순위에 의해
  
  (hi - lo) / 2를 계산하고

  lo 값을 더해줘서 mid 값을 구한다.

``` 
lo = 3
hi = 7
--> lo + (hi - lo) / 2 =    3 + ( (7-3)/2 ) = 3 + 2 = 5
--> (lo + hi) / 2      =    10 / 2                  = 5
```

---

> [2] Point

``` java
if (mid <= x / mid && (mid + 1) > x / (mid + 1))
= if ( mid * mid <= x ) && if ( (mid + 1) * (mid + 1) > x )
```

* 왜 저렇게 표현했을까를 보면 

  *mid * mid* 를 하면 **Overflow**가 발생할 수 있다.

  그러므로 Overflow를 방지하기 위해 양변을 mid로 나눠준 **Skill**이다.



---

## Reference

* [69. Sqrt(x)](https://leetcode.com/problems/sqrtx/)