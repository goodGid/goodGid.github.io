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

### [2] Code (21. 11. 02)

``` java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> ans = new ArrayList<>();
        go(candidates, target, ans, new ArrayList<>(), 0);
        return ans;
    }

    private void go(int[] arr, int target, List<List<Integer>> ans, List<Integer> tempAns, int idx) {

        // case 1
        int sum = tempAns.stream().mapToInt(i -> i).sum();
        
        // case 2
        int sum = 0;
        for (int i : tempAns) {
            sum += i;
        }

        if (sum == target) {
            ans.add(new ArrayList<>(tempAns));
        } else if (sum > target) {
            return;
        }

        for (int i = idx; i < arr.length; i++) {
            tempAns.add(arr[i]);
            go(arr, target, ans, tempAns, i);
            tempAns.remove(tempAns.size() - 1);
        }
    }
}
```

> Review

* 다시 풀 필요는 없어 보인다.



---

## Reference

* [39. Combination Sum](https://leetcode.com/problems/combination-sum/)