---
layout: post
title: " LeetCode : 1220. Count Vowels Permutation "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1220. Count Vowels Permutation](https://leetcode.com/problems/count-vowels-permutation/)

### Problem

```
Given an integer n, your task is to count how many strings of length n can be formed under the following rules:

Each character is a lower case vowel ('a', 'e', 'i', 'o', 'u')
Each vowel 'a' may only be followed by an 'e'.
Each vowel 'e' may only be followed by an 'a' or an 'i'.
Each vowel 'i' may not be followed by another 'i'.
Each vowel 'o' may only be followed by an 'i' or a 'u'.
Each vowel 'u' may only be followed by an 'a'.
Since the answer may be too large, return it modulo 10^9 + 7.
```


---

### Example

```
Input: n = 2
Output: 10
Explanation: All possible strings are: "ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" and "ua".
```

---

### [1] Code (23. 01. 22)

*Need to Retry -> 아이디어 떠올리지 못함*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 60 ms
// Memory Usage: 65.4 MB
// Ref : https://leetcode.com/submissions/detail/882971406/
class Solution {
    int MOD = 1000000007;
    int A = 0, E = 1, I = 2, O = 3, U = 4;
    int[][] dp = new int[20001][5];

    public int countVowelPermutation(int n) {
        for (int i = 0; i < 5; i++) {dp[1][i] = 1;}

        for (int i = 2; i <= n; i++) {
            dp[i][A] = mod(mod(dp[i - 1][E] + dp[i - 1][U]) + dp[i - 1][I]);
            dp[i][E] = mod(dp[i - 1][A] + dp[i - 1][I]);
            dp[i][I] = mod(dp[i - 1][E] + dp[i - 1][O]);
            dp[i][O] = dp[i - 1][I];
            dp[i][U] = mod(dp[i - 1][O] + dp[i - 1][I]);
        }
        return mod(mod(mod(dp[n][A] + dp[n][E]) + mod(dp[n][I] + dp[n][O])) + dp[n][U]);
    }

    int mod(int val) {
        return val % MOD;
    }
}
```

* 위 코드는 [쿠케캬캬 개발 기록 -> LeetCode 1220 : Count Vowels Permutation](https://kukekyakya.tistory.com/642)글을 참고하였다.

* 2차원 배열을 보면 dp[n][A] 같은 경우엔

  n자리를 뜻하는데 n 자리의 값은 A로 끝나는 경우를 본다.

---

> Review

* DP 느낌이 확 들었지만

  점화식을 세우지 못했다.


---

## Reference

* [1220. Count Vowels Permutation](https://leetcode.com/problems/count-vowels-permutation/)