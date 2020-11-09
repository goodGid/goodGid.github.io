---
layout: post
title:  " LeetCode : 7. Reverse Integer "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [Reverse Integer (Easy)](https://leetcode.com/problems/reverse-integer/)

### Problem

```
Given a 32-bit signed integer, reverse digits of an integer.

Note:
Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. 
For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.
```
 
---

### Example

```
Input: x = 123
Output: 321
```

---

### Code (20. 11. 08)

``` java
public int reverse(int x) {
    if (x == 0) {
        return 0;
    }

    while (true) {
        if (x % 10 == 0) {
            x /= 10;
        } else {
            break;
        }
    }

    StringBuilder answer = new StringBuilder();
    if (x < 0) {
        answer.append("-");
        x *= -1;
    }

    while (x != 0) {
        answer.append(x % 10);
        x /= 10;
    }

    int ans;
    try {
        ans = Integer.parseInt(answer.toString());
    } catch (Exception e){
        return 0;
    }
    return ans;
}
```

---

### Feed Back

> Case 1.

``` java
class Solution {
    public int reverse(int x) {
        long num = 0;
        while (x != 0) {
            num = num * 10 + x % 10;
            x = x / 10;
        }

        if (num != (int) num) {
            return 0;
        }
        return (int) num;
    }
}
```

* long으로 계산하고 int로 변환한다는 **아이디어**가 좋았다.

---


> Case 2.

``` java
Integer.valueOf(0123)
--> 123
```

* Integer.valueOf 메소드가 0으로 시작하면 알아서 Trim 처리를 해준다.

---

## Summary

* 역시 다른 사람 코드를 보고 공부하는 게 큰 도움이 되는 걸 다시 한 번 깨달았다.

---

## Reference

* [Reverse Integer)](https://leetcode.com/problems/reverse-integer/)
