---
layout: post
title:  " LeetCode : 322. Coin Change "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [322. Coin Change](https://leetcode.com/problems/coin-change/)

### Problem

* Need to Retry

```
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
You may assume that you have an infinite number of each kind of coin.
```





---

### Example

```
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

---

### [1] Code (21. 02. 11)

``` java
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) { // [1]
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] == amount + 1 ? -1 : dp[amount];
    }
}
```

> Check Point

1. amount를 만들기 위한 최소의 coin을 사용

2. 각 coin의 수는 무제한

3. 만들 수 없다면 -1을 return

4. coins값과 amount를 보면 int형으로 cover 가능

5. amount가 0이면 0을 return

---

> Algorithm Description

* dp[n]의 정의는 다음과 같다.

  -> *n이라는 amount를 만드는데 최소한의 count*

* 10이라는 amount를 만들기 위해서 

  coin[0], coin[1], ... , coin[n]을 사용한다.

  그러면 다음과 같은 식으로 도출해 낼 수 있다.
  
  dp[10] = Min(dp[10-coin[0]], dp[10-coin[1]], ... , dp[10-coin[n]]) + 1 // 여기서 '1'은 내가 사용한 coin을 뜻함

---

> Mistake

* AS-IS : Arrays.fill(dp, Integer.MAX_VALUE)

  TO-BE : Arrays.fill(dp, amount+1)

* Integer.MAX_VALUE를 사용하여 초깃값 설정을 해줬는데

  이러면 { coin=2, amount=3 }으로 input이 들어오면

  dp[3] = dp[3-2] + 1 이 되면서 Overflow가 발생한다.

  그래서 이상한 값이 출력되고 문제를 틀렸다.

* 아무 생각 없이 Integer.MAX_VALUE 사용을 했는데

  반드시 Overflow를 주의하자.


---

> Review

* 이건 DP로 풀어야 하고 knapsack 문제랑 비슷하겠구나 생각이 들었다.

  그런데 풀지는 못했다. 

  나중에 다시 풀어봐야겠다.

* Youtube에 문제 해결 풀이가 있는데 

  영어지만 들을 만했다. 
  
  나중에 다시 풀 때 또 문제를 못 푼다면 다시 들어보자.
  
  [The Change Making Problem - Fewest Coins To Make Change Dynamic Programming](https://www.youtube.com/watch?v=jgiZlGzXMBw)


---

### [2] Code (22. 04. 08) (x)

``` java
// Runtime: 17 ms
// Memory Usage: 45.3 MB
// Ref : https://leetcode.com/submissions/detail/675789289
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];

        // dp[0] = 1
        // dp[1 ~ amount] = MAX_VALUE
        int MAX_VALUE = (int) Math.pow(2, 31) - 1;
        for (int i = 1; i <= amount; i++) {
            dp[i] = MAX_VALUE;
        }

        for (int i = 0; i < coins.length; i++) {
            for (int j = coins[i]; j <= amount; j++) {
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
            }
        }
        return dp[amount] == MAX_VALUE ? -1 : dp[amount];
    }
}
```

---

> Review

* 15분 소요

* 아이디어가 바로 떠올랐다. 

  굳이 다시 풀 필요는 없어 보인다.

---

### [3] Code (24. 02. 18) (x)

``` java
// Runtime: 10 ms
// Memory Usage: 44 MB
// Ref : https://leetcode.com/submissions/detail/1178358915
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount+1];
        Arrays.fill(dp, 10000+1);
        dp[0] = 0;
        
        for (int coin : coins) {
            for (int i=coin; i<=amount; i++) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
        
        if (dp[amount] == 10000+1) {
            return -1;
        }
        return dp[amount];
    }
}
```

---

> Review

* 10분 소요

* 아이디어가 바로 떠올랐다. 

  굳이 다시 풀 필요는 없어 보인다.

---

## Reference

* [322. Coin Change](https://leetcode.com/problems/coin-change/)