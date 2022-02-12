---
layout: post
title:  " LeetCode : 129. Sum Root to Leaf Numbers "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/)

### Problem

```
You are given the root of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.

For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

A leaf node is a node with no children.
```


---

### Example

```
Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.
Therefore, sum = 12 + 13 = 25.
```

---

### [1] Code (22. 02. 13) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 39.7 MB
// Ref : https://leetcode.com/submissions/detail/640088504
class Solution {
    int ans;

    public int sumNumbers(TreeNode root) {
        dfs(root, 0);
        return ans;
    }

    private void dfs(TreeNode node, int sum) {
        if (node == null) {
            return;
        }

        sum *= 10;

        if (node.left == null && node.right == null) {
            ans = ans + sum + node.val;
            return;
        }

        dfs(node.left, sum + node.val);
        dfs(node.right, sum + node.val);
    }
}
```

---

> Reference Code

**Code 1**

``` java
class Solution {
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    public int dfs(TreeNode root, int prevSum) {
        if (root == null) {
            return 0;
        }
        int sum = prevSum * 10 + root.val;
        if (root.left == null && root.right == null) {
            return sum;
        }
        return dfs(root.left, sum) + dfs(root.right, sum);
    }
}
```

* 내가 푼 아이디어와 같은데

  전역변수를 사용하지 않고 

  dfs 메소드의 return type이 int인 게 더 깔끔해 보인다.

---

> Review

* 직관적으로 아이디어가 떠올랐다.

---

## Reference

* [129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/)