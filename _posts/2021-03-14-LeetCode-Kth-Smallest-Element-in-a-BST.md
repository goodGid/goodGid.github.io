---
layout: post
title:  " LeetCode : 230. Kth Smallest Element in a BST "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

## Problem

* Need to Retry

```
Given the root of a binary search tree, and an integer k, return the kth (1-indexed) smallest element in the tree.

Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?
```





---

## Example

```
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
```

---

## [1] Code (21. 03. 14)

``` java
class Solution {
    int rank = 1;
    int res = -1;

    public int kthSmallest(TreeNode root, int k) {
        traverse(root, k);
        return res;
    }

    public void traverse(TreeNode node, int k) {
        if (node == null) { return; }

        traverse(node.left, k);
        if (rank++ == k) { res = node.val; }
        traverse(node.right, k);
    }
}
```

> Check Point

* BST 이므로 중위 탐색을 통해 답을 구할 수 있다.


---

## Reference

* [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)