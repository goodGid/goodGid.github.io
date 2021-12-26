---
layout: post
title:  " LeetCode : 437. Path Sum III "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [437. Path Sum III](https://leetcode.com/problems/path-sum-iii/)

### Problem

```
Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).
```


---

### Example

```
Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.
```

---

### [1] Code (21. 12. 26)

*Need to Retry -> 믄제 최적화 실패*

``` java
// Runtime: 65 ms
// Memory Usage: 69.7 MB
class Solution {
    int target;
    int ans;

    public int pathSum(TreeNode root, int targetSum) {
        target = targetSum;
        go(new ArrayList<>(), root);
        return ans;
    }

    private void go(List<Integer> list, TreeNode node) {
        if (node == null) {
            return;
        }

        for (int i = 0; i < list.size(); i++) {
            if (target == list.get(i) + node.val) {
                ans++;
            }
        }
        if (target == node.val) {
            ans++;
        }

        List<Integer> newList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            newList.add(list.get(i) + node.val);
        }
        newList.add(node.val);

        go(newList, node.left);
        go(newList, node.right);
    }
}
```

---

> Reference Code

``` java
// Runtime: 2 ms
// Memory Usage: 39 MB
// ref : https://leetcode.com/problems/path-sum-iii/discuss/1641799/easy-java-solution-faster-than-100
class Solution {
    private Map<Integer, Integer> sums;

    public int pathSum(TreeNode root, int targetSum) {
        sums = new HashMap<>();
        sums.put(0, 1);
        return traverse(root, 0, targetSum);
    }

    private int traverse(TreeNode node, int sum, int targetSum) {
        if (node == null) {
            return 0;
        }

        sum += node.val;
        int count = sums.getOrDefault(sum - targetSum, 0);
        int val = sums.getOrDefault(sum, 0);
        sums.put(sum, val + 1);
        count += traverse(node.left, sum, targetSum);
        count += traverse(node.right, sum, targetSum);
        sums.put(sum, val);
        return count;
    }
}
```

---

``` java
// Runtime: 2 ms
// Memory Usage: 38.6 MB
// ref : https://silvergoni.tistory.com/entry/leetcode-437-Path-Sum-III
class Solution {
    
    private int count = 0;
    private int targetSum = 0;
    private Map<Integer, Integer> map = new HashMap<>();

    public int pathSum(TreeNode root, int sum) {
        targetSum = sum;
        solve(root, 0);
        return count;
    }

    private void solve(TreeNode root, int currentSum) {
        if (root == null) {
            return;
        }

        currentSum += root.val;
        if (currentSum == targetSum) {
            count++;
        }

        count += map.getOrDefault(currentSum - targetSum, 0);
        map.put(currentSum, map.getOrDefault(currentSum, 0) + 1);
        solve(root.left, currentSum);
        solve(root.right, currentSum);
        map.put(currentSum, map.get(currentSum) - 1);
    }
}
```

---

``` java
// Runtime: 208 ms
// Memory Usage: 38.8 MB
// https://github.com/syureu/21ReetCodeStudy/blob/main/path-sum-iii/path-sum-iii.kt
class Solution {
    fun pathSum(root: TreeNode?, targetSum: Int): Int {
        return initiate(root, targetSum)
    }

    private fun initiate(root: TreeNode?, targetSum: Int): Int {
        if (root == null) return 0
        return fromNodePathSum(root, targetSum) + initiate(root.left, targetSum) + initiate(root.right, targetSum)
    }

    private fun fromNodePathSum(node: TreeNode?, targetSum: Int): Int {
        if (node == null) return 0
        val me = if (node.`val` == targetSum) 1 else 0
        val left = fromNodePathSum(node.left, targetSum - node.`val`)
        val right = fromNodePathSum(node.right, targetSum - node.`val`)
        return me + left + right
    }
}
```

* 코틀린이지만 접근 아이디어가 좋았다.

``` java
fromNodePathSum(root, targetSum) + initiate(root.left, targetSum) + initiate(root.right, targetSum)
```

* fromNodePathSum -> 현재 노드부터 모든 합을 다 더한다.

  initiate -> left / right 를 기준으로 재귀 호출을 한다.

---

> Review

* 50분 소요 

  풀긴했으나 시간/공간 최적화가 되지 않았다.


---

## Reference

* [437. Path Sum III](https://leetcode.com/problems/path-sum-iii/)