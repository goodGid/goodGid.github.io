---
layout: post
title: " LeetCode : 2830. Maximize the Profit as the Salesman "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [2830. Maximize the Profit as the Salesman](https://leetcode.com/problems/maximize-the-profit-as-the-salesman)

### Problem

```
You are given an integer n representing the number of houses on a number line, numbered from 0 to n - 1.
Additionally, you are given a 2D integer array offers where offers[i] = [starti, endi, goldi], indicating that ith buyer wants to buy all the houses from starti to endi for goldi amount of gold.
As a salesman, your goal is to maximize your earnings by strategically selecting and selling houses to buyers.
Return the maximum amount of gold you can earn.
Note that different buyers can't buy the same house, and some houses may remain unsold.
```


---

### Example

```
Input: n = 5, offers = [[0,0,1],[0,2,2],[1,3,2]]
Output: 3
```

---

### [1] Code (24. 02. 04)

*Retry -> 쉬운 듯 어려웠다.*

``` java
// Runtime: 160 ms
// Memory Usage: 104.7 MB
// Ref : https://leetcode.com/submissions/detail/1165580866
class Solution {
    int m;
    int[] dp;

    public int maximizeTheProfit(int n, List<List<Integer>> offers) {
        Collections.sort(offers, (a, b) -> a.get(0) - b.get(0));
        Collections.sort(offers, Comparator.comparing(a -> a.get(0)));

        m = offers.size();
        dp = new int[m];
        Arrays.fill(dp, -1);
        dfs(0, offers);
        return dp[0];
    }

    private int dfs(int idx, List<List<Integer>> offers) {
        if (idx == m) {
            return 0;
        }
        if (dp[idx] != -1) {
            return dp[idx];
        }

        // Pick X
        int sum1 = dfs(idx + 1, offers);

        // Pick O
        int nextIdx = findNextIdx(idx + 1, offers.get(idx).get(1), offers);
        int sum2 = offers.get(idx).get(2);
        if (nextIdx != -1) {
            sum2 += dfs(nextIdx, offers);
        }

        dp[idx] = Math.max(sum1, sum2);

        return dp[idx];
    }

    private int findNextIdx(int left, int target, List<List<Integer>> offers) {
        int l = left;
        int r = m - 1;
        int nextIdx = -1;
        while (l <= r) {
            int mid = r - (r - l) / 2;
            int mv = offers.get(mid).get(0);
            if (mv > target) {
                nextIdx = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return nextIdx;
    }
}
```

* 240131에 도전하고 실패했다가 정답을 보고 이해를 했다고 **단단히 착각**을 했다.

  그리고 240204일 1주일도 안되어서 다시 풀었는데 막혔다.

* 스스로에게 너무 답답하고 약간의 짜증이 났다.

  다시 정답을 보고 이해를 하고

  그 자리에서 다시 코딩을 하여서 맞췄다.

---

> Review

* 240131 문제를 도전했다가 

  Memory Limit Exceeded로 실패하고 정답을 봤다.

  내가 풀었던 코드 : [https://leetcode.com/submissions/detail/1162060200](https://leetcode.com/submissions/detail/1162060200)

* 전체적인 로직은 동일한데

  현재 idx를 pick 하였을 경우 다음에 접근하는 idx를 찾는 로직에서

  나는 for문으로 찾았고 정답 코드는 Parametric Search로 찾았다.

---

## Reference

* [2830. Maximize the Profit as the Salesman](https://leetcode.com/problems/maximize-the-profit-as-the-salesman)