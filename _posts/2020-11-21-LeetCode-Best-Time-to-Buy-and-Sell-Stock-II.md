---
layout: post
title:  " LeetCode : 122. Best Time to Buy and Sell Stock II "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

### Problem

```
Say you have an array prices for which the ith element is the price of a given stock on day i.
Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).
Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).
```

---

### Example

```
Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
```



---

### Code (20. 11. 21)

``` java
class Solution {
    public int maxProfit(int[] prices) {
        return dfs(0, prices);
    }

    private int dfs(int st_idx, int[] prices) {
        int ans = 0;
        for (int i = st_idx; i < prices.length; i++) {
            int max_value = 0;
            for (int j = i + 1; j < prices.length; j++) {
                if (prices[i] < prices[j]) {
                    int value_1 = prices[j] - prices[i];
                    int value_2 = dfs(j + 1, prices);
                    max_value = Math.max(max_value, value_1 + value_2);
                }
            }
            ans = Math.max(ans, max_value);
        }
        return ans;
    }
}
```


* Brute Force 방식이다.

  참고로 위 코드로 제출하면 TLE가 발생한다.

  Accept 코드는 Feed Back을 참고하자.

* 위 문제의 시간 복잡도는 **O(n^n)**이다. 

  증명하는데 있어서 **가등**님과 **재밌는FE**님이 많은 도움을 주었다.

```
dfs() 호출 시 -> n^n
dfs()에서 재귀 호출 시 --> (n-1)^(n-1)
dfs()에서 재귀 호출에서 재귀 호출 시 --> (n-2)^(n-2)
...
마지막 --> 1^1

=> (n)^(n) * (n-1)^(n-1) * ... * 1^1
 = (n)^(n) *   (n)^(n)   * ... * 1^1

즉 O(n^n)이다.
```

---

### Feed Back

> Case 1

``` java
class Solution {
    public int maxProfit(int[] prices) {
        int maxprofit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1])
                maxprofit += prices[i] - prices[i - 1];
        }
        return maxprofit;
    }
}
```

* 아이디어가 떠오르지 않아서 풀지 못했다.

---

## Reference

* [122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
