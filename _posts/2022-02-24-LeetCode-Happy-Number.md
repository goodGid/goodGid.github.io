---
layout: post
title:  " LeetCode : 202. Happy Number "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [202. Happy Number](https://leetcode.com/problems/happy-number/)

### Problem

```
Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.

Return true if n is a happy number, and false if not.
```


---

### Example

```
Input: n = 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

---

### [1] Code (22. 02. 24) (x)

``` java
// Runtime: 1 ms
// Memory Usage: 39.3 MB
// Ref : https://leetcode.com/submissions/detail/647355526/
class Solution {
    public boolean isHappy(int n) {

        Set<Integer> set = new HashSet<>();

        while (true) {
            if (n == 1) {
                return true;
            }

            if (set.contains(n)) {
                break;
            }
            set.add(n);
            n = getNextValue(n);
        }

        return false;
    }

    private int getNextValue(int n) {
        int sum = 0;

        while (n > 0) {
            int temp = n % 10;
            sum = sum + (temp * temp);
            n /= 10;
        }
        return sum;
    }
}
```

* 문제 조건에 따라 계산을 하다 싸이클이 발생하면 종료를 한다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 2 ms
// Memory Usage: 42 MB
// Ref : https://leetcode.com/problems/happy-number/discuss/1791427/Java-Solution-Two-approaches
class Solution {
    public boolean isHappy(int n) {
        int fast = n;
        int slow = n;
        do {
            fast = findSquaredSum(findSquaredSum(fast));
            slow = findSquaredSum(slow);
        } while (fast != slow);
        return slow == 1;
    }

    private int findSquaredSum(int n) {
        int squaredSum = 0;
        while (n != 0) {
            int r = n % 10;
            squaredSum += (int) Math.pow(r, 2);
            n /= 10;
        }
        return squaredSum;
    }
}
```

* [토끼와 거북이](https://blog.naver.com/occidere/222260962156) 풀이 방법으로도 접근할 수 있다.

---

> Review

* 20정도 소요

  싸이클이 있는지 보는 문제는 [토끼와 거북이](https://blog.naver.com/occidere/222260962156) 아이디어를 떠올리자 !

---

## Reference

* [202. Happy Number](https://leetcode.com/problems/happy-number/)