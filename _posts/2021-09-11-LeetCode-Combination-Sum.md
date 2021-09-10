---
layout: post
title:  " LeetCode : 39. Combination Sum "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [39. Combination Sum](https://leetcode.com/problems/combination-sum/)

### Problem

```
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
```


---

### Example

```
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
```

---

### [1] Code (21. 09. 11)

``` java
class Solution {
    int target;
    List<List<Integer>> ans = new ArrayList<>();

    public List<List<Integer>> combinationSum(int[] candidates, int t) {
        target = t;
        dfs(candidates, 0, 0, new ArrayList<>());
        return ans;
    }

    public void dfs(int[] candidates, int idx, int sum, List<Integer> ca) {
        if (sum > target) {
            return;
        }
        if (sum == target) {
            ans.add(new ArrayList<>(ca));
            return;
        }

        for (int i = idx; i < candidates.length; i++) {
            ca.add(candidates[i]);
            dfs(candidates, i, sum + candidates[i], ca);
            ca.remove(ca.size() - 1);
        }
    }
}
```

> Review

* 15분 소요

* 평이한 재귀함수 문제


---

## Reference

* [39. Combination Sum](https://leetcode.com/problems/combination-sum/)