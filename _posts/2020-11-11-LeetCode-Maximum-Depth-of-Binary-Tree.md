---
layout: post
title:  " LeetCode : 104. Maximum Depth of Binary Tree "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [(Easy) Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

### Problem

```
Given a binary tree, find its maximum depth.
The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
Note: A leaf is a node with no children.
```
 
---

### Example

```
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
```

---

### Code (20. 11. 11)

``` java
public int maxDepth(TreeNode root) {
    return find(0, root);
}

public int find(int depth, TreeNode node) {
    if (node == null) {
        return depth;
    }
    return Math.max(find(depth + 1, node.left), find(depth + 1, node.right));
}
```

* 머리 아팠다.

  오랜만에 재귀로 푸려니까 너무 어려웠다.

---

## Reference

* [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
