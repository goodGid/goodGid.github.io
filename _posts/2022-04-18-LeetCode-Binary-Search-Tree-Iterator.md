---
layout: post
title:  " LeetCode : 173. Binary Search Tree Iterator "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator)

### Problem

```
Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST)
```


---

### Example

```
Input
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
Output
[null, 3, 7, true, 9, true, 15, true, 20, false]
```

---

### [1] Code (22. 04. 18) (x)

``` java
// Runtime: 12 ms
// Memory Usage: 45.9 MB
// Ref : https://leetcode.com/submissions/detail/682217142
class BSTIterator {
    Queue<Integer> q;

    public BSTIterator(TreeNode root) {
        q = new LinkedList<>();
        inOrder(q, root);
    }

    public int next() {
        return q.poll();

    }

    public boolean hasNext() {
        return !q.isEmpty();

    }

    private void inOrder(Queue<Integer> tempQ, TreeNode node) {
        if (node == null) {
            return;
        }
        inOrder(tempQ, node.left);
        tempQ.add(node.val);
        inOrder(tempQ, node.right);
    }
}
```

---

> Review

* 10분 소요

  어렵지 않게 풀었다.

---

## Reference

* [173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator)