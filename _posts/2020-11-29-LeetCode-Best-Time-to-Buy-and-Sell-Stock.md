---
layout: post
title:  " LeetCode : 121. Best Time to Buy and Sell Stock "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

### Problem

```
Say you have an array for which the ith element is the price of a given stock on day i.
If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
Note that you cannot sell a stock before you buy one.
```

---

### Example

```
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.
```



---

### [1] Code (20. 11. 29)

``` java
class Solution {

    // [1] : O(n)
    public int maxProfit(int[] prices) {
        int min_value = Integer.MAX_VALUE;
        int max_value = 0;

        for (int price : prices) {
            min_value = Math.min(min_value, price); // 1-1
            max_value = Math.max(max_value, price - min_value); // 1-2
        }

        return max_value;
    }

    // [2] : 2 for-loop
    public int maxProfit2(int[] prices) {
        int ans = 0;
        for (int i = 0; i < prices.length; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                if (prices[i] < prices[j]) {
                    ans = Math.max(ans, prices[j] - prices[i]);
                }
            }
        }
        return ans;
    }
}
```

* 보자마자 든 생각은 2 for-loop이다.

  하지만 더 효율적인 코드가 반드시 있을 거로 생각했고 다른 코드들을 참고했다.

  그렇게 나온 코드가 [1] 코드이다.

  [1] 알고리즘에 관해 설명하자면 다음과 같다.

```
maxProfit을 구하기 위해서는 최소와 최대를 구해야 한다.
다만 시간을 고려해서 선택해야 한다.
반드시 최소가 최대보다 먼저 선택되어야 한다.

알고리즘의 아이디어는 다음과 같다.
for loop에서 i가 가리키는 값을 최대라고 가정 후 
[0 ~ (i-1)] 값들과 비교하면 maxProfit을 구할 수 있다.
그런데 굳이 다 비교할 필요없이
[0 ~ (i-1)]에서 최솟값이랑만 비교를 하면 된다.

그러므로 for loop을 돌면서
계속해서 최솟값을 구해준다. (= [1-1])
min( i번째 값 - ( [0 ~ (i-1)] 중 최솟값 ), 기존의 최솟값 )을 비교해주면 된다.(= [1-2])

그렇게 for loop을 다 돌면 maxProfit을 구할 수 있다.
```

---

### [2] Code (21. 11. 14)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

> Review

* [1] 문제 풀이코드를 참고하면 될 듯싶다.

  자세한 설명도 있으니 한 번에 이해가 되었다.

* 아이디어를 다방면으로 접근할 수 있는 안목을 기르고 싶다.

  하나의 관점에 꽂히면 다른 관점이 쉽게 떠올려지지 않는다 ㅠㅠ 



---

## Reference

* [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)