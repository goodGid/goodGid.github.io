---
layout: post
title: " LeetCode : 343. Integer Break "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [343. Integer Break](https://leetcode.com/problems/integer-break/)

### Problem

```
Given an integer n, break it into the sum of k positive integers, where k >= 2, and maximize the product of those integers.
Return the maximum product you can get.
```


---

### Example

```
Input: n = 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.
```

---

### [1] Code (23. 10. 30)

*Retry -> 한 번에 풀었는데 다시 풀어보자*

``` java
// Runtime: 1 ms
// Memory Usage: 39.3 MB
// Ref : https://leetcode.com/submissions/detail/1087522968
class Solution {
    public int integerBreak(int n) {
        int[] dp = new int[59];
        
        dp[0] = 1;
        dp[1] = 1;
        
        for (int i=2; i<=n; i++) {
            int ans = -1;
            for (int j=i-1; j>=0; j--) {
                ans = Math.max(ans,Math.max(j*dp[i-j], j*(i-j)));
            }
            dp[i]=ans;
        }
        return dp[n];
    }
}
```

* 문제를 보자마자 DP를 떠올렸고

  쉽겠네 하고 접근했는데 한 번 더 고민을 했어야 했다.

```
- n : 6
6 = 5+1 -> 5*dp[1] = 5*1
6 = 4+2 -> 4*dp[2] = 4*1
6 = 3+3 -> 3*dp[3] = 3*2
6 = 2+4 -> 2*dp[4] = 2*4
6 = 1+5 -> 1*dp[5] = 1*6
```

* 실제로 dp[6]=9(3*3)이 나와야 하는데

  위 아이디어로 접근을 하면 dp[6]=8이라는 엉뚱한 값이 나온다.

* 여기서 어떻게 접근해야 하지 생각을 했고

  3*dp[6-3]의 결괏값과
  
  3*(6-3)의 결괏값을 비교하면 되겠다는 생각을 하게 되었다.

* dp[3]을 구할 땐 3을 그대로 사용할 수 없지만

  3보다 큰 n에서 3을 사용할 땐 "3"이라는 값을 그대로 사용할 수 있기 때문이다.

```
dp[3]은 "2+1, 1+2" 경우의 수만 포함하는데
dp[10]에서 7+dp[3]을 볼 땐
7+2+1, 7+1+2, "7+3" 과 같이 
3 그 자체로 값을 활용할 수 있다.
```

---

## Reference

* [343. Integer Break](https://leetcode.com/problems/integer-break/)