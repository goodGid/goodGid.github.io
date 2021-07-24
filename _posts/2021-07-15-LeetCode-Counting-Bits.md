---
layout: post
title:  " LeetCode : 338. Counting Bits "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [338. Counting Bits](https://leetcode.com/problems/counting-bits/)

### Problem

* Need to Retry

  -> $O(N log_2 N)$가 아닌 $O(N)$ 방법으로 다시 풀어보자.

```
Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

It is very easy to come up with a solution with a runtime of O(n log n). Can you do it in linear time O(n) and possibly in a single pass?
```





---

### Example

```
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
```

---

## [1] Code (21. 07. 14)

``` java
class Solution {
    public int[] countBits(int n) {
        
        int[] ansArray = new int[n+1];
        
        for (int i=0; i<=n; i++){
            ansArray[i] = getBitsCountBy(i);
        }
        return ansArray;
    }
    
    public int getBitsCountBy(int n){
        
        int cnt = 0;
        while (n != 0){
            cnt = n % 2 == 0 ? cnt : cnt + 1;
            n /= 2;
        }
        return cnt;
    }
}
```

> Check Point

* $O(N)$으로 풀었어야 했지만 아이디어가 떠오르지 않아 $O(N log_2 N)$으로 풀었다.

---

> Algorithm Description

* n 값을 2진수로 표현 시 1의 수가 몇 개 있는지 Counting 한다.

---

> Review

* 정말 다양한 풀이가 있었다.


> Code 1

``` java
public int[] countBits(int n) {
    int[] ans = new int[n + 1];
    for (int i = 0; i < ans.length; i++) {
        String a = Integer.toString(i, 2);
        int x = 0;
        for (char c : a.toCharArray()) {
            if (c == '1') {
                x++;
            }
        }
        ans[i] = x;
    }
    return ans;
}
```

* **Integer.toString(i, 2)** 2진수로 표현된 String 값을 구하고

  '1'이라는 문자열의 수를 Counting 한다.

> Code 2

``` java
public int[] countBits(int n) {
    int[] arr = new int[n + 1];
    for (int i = 0; i <= n; i++) {
        arr[i] = Integer.bitCount(i);
    }
    return arr;
}
```

* **Integer.bitCount(i)** 메소드를 사용해서 i 값의 bit count를 얻는다.

> Code 3

``` java
public int[] countBits(int n) {
    int[] dp = new int[n + 1];
    dp[0] = 0;
    if (n == 0) {
        return dp;
    }
    dp[1] = 1;
    if (n == 1) {
        return dp;
    }
    dp[2] = 1;
    for (int i = 3; i <= n; i++) {
        if (i % 2 == 0) { // 짝수
            dp[i] = dp[i / 2];
        } else { // 홀수
            dp[i] = dp[i / 2] + 1;
        }
    }
    return dp;
}
```

---

## Reference

* [338. Counting Bits](https://leetcode.com/problems/counting-bits/)