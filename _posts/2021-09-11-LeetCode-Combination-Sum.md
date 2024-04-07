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

### [2] Code (21. 11. 02) (x)

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

### [3] Code (24. 04. 07)

*Retry -> 아이디어 떠올리는데 은근 어려웠는데?*

``` java
// Runtime: 6 ms
// Memory Usage: 44.8 MB
// Ref : https://leetcode.com/submissions/detail/1225361404
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        Node[] nodes = new Node[41];
        for (int i = 1; i <= target; i++) {
            nodes[i] = new Node(i);
        }

        for (int candidate : candidates) {
            for (int i = candidate; i <= target; i++) {
                if (i == candidate) {
                    Node node = nodes[candidate];
                    node.add(Collections.singletonList(candidate));
                    continue;
                }
                List<List<Integer>> subList = nodes[i - candidate].getList();
                if (subList.isEmpty()) {
                    continue;
                }

                for (List<Integer> sub : subList) {
                    List<Integer> list = new ArrayList<>();
                    list.add(candidate);
                    for (int val : sub) {
                        list.add(val);
                    }
                    nodes[i].add(list);
                }
            }
        }
        return nodes[target].getList();
    }

    class Node {
        int val;
        List<List<Integer>> list = new ArrayList<>();

        public Node(int _val) {
            this.val = _val;
        }

        public void add(List<Integer> subList) {
            this.list.add(subList);
        }

        public List<List<Integer>> getList() {
            return this.list;
        }
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 4 ms
// Memory Usage: 44.9 MB
// Ref : https://leetcode.com/submissions/detail/1225370515
public class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Node 클래스 삭제 및 기능 이동
        List<List<Integer>>[] dp = new ArrayList[target + 1];
        for (int i = 0; i <= target; i++) {
            dp[i] = new ArrayList<>();
        }

        // 0을 만들기 위해서는 아무런 요소도 사용할 필요가 없음
        dp[0].add(new ArrayList<>());

        // 후보군마다 조합을 만듦
        for (int candidate : candidates) {
            for (int i = candidate; i <= target; i++) {
                for (List<Integer> combination : dp[i - candidate]) {
                    List<Integer> newCombination = new ArrayList<>(combination); // [1]
                    newCombination.add(candidate);
                    dp[i].add(newCombination);
                }
            }
        }
        return dp[target];
    }
}
```

* 위 정답 코드를 지피티한테 리팩토링 시킨 코드

  훨씬 깔끔하다.

* [1] : List Copy 뜨는 코드

---

> Review

* 21년에는 재귀를 바로 떠올려서 풀었는데

  이번에는 다른 방식을 접근을 했더니 어렵게 느껴졌다.

  이전엔 쉬웠는데 이번엔 까다로워지는 마법

---

## Reference

* [39. Combination Sum](https://leetcode.com/problems/combination-sum/)