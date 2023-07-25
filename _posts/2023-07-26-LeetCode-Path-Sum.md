---
layout: post
title: " LeetCode : 112. Path Sum "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [112. Path Sum](https://leetcode.com/problems/path-sum)

### Problem

```
Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.
A leaf is a node with no children.
```


---

### Example

```
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
```

---

### [1] Code (23. 07. 26)

*Need to Retry -> Easy 문제였는데 까다로웠다 -ㅂ-*

``` java
// Runtime: 0 ms
// Memory Usage: 43.4 MB
// Ref : https://leetcode.com/submissions/detail/1003957070
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }
                
        boolean hasChild = false;
        if (root.left != null || root.right != null) {
            hasChild = true;
        }
        
        return dfs(root, targetSum, 0, hasChild);
    }
    
    private boolean dfs(TreeNode node, int t, int sum, boolean hasChild) {
        if (node == null) {
            if (hasChild == false && t == sum) {
                return true;
            }
            return false;
        }
        
        hasChild = false;
        if (node.left != null || node.right != null) {
            hasChild = true;
        }
        
        boolean isSame = false;
        isSame = dfs(node.left, t, sum + node.val, hasChild);
        if (isSame) {
            return true;
        }
        isSame = dfs(node.right, t, sum + node.val, hasChild);
        if (isSame) {
            return true;
        }
        return false;
    }
}
```

* "[1,2] / targetSum = 1"은 flase이다.

  "[1,2] / targetSum = 3"은 true다.

* leafNode를 충족시켜야한다는 조건이 은근 까다로웠다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 0 ms
// Memory Usage: 43.4 MB
// Ref : https://leetcode.com/submissions/detail/1003960242
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;

        return dfs(root, targetSum);
    }

    private boolean dfs(TreeNode node, int targetSum) {
        if (node == null) { // base case
            return false;
        }

        targetSum -= node.val; // [1]

        // check whether it's a leaf node
        if (node.left == null && node.right == null) { // [2]
            return targetSum == 0;
        }

        return dfs(node.left, targetSum) || dfs(node.right, targetSum);
    }
}
```

* 내가 푼 풀이보다 깔끔한 풀이

* [1] : targetSum을 천천히 줄여가면서

  [2] : leafNode를 체크한다.

---

> Review

* Easy니까 쉽겠지 하고 덜컥 덤볐다가

  조건을 꼼꼼히 따지지 못하고 몇 번을 틀렸다.

---

## Reference

* [112. Path Sum](https://leetcode.com/problems/path-sum)