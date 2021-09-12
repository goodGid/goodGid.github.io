---
layout: post
title:  " LeetCode : 617. Merge Two Binary Trees "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [617. Merge Two Binary Trees](https://leetcode.com/problems/merge-two-binary-trees/)

### Problem

```
You are given two binary trees root1 and root2.
Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.
Return the merged tree.
```


---

### Example

```
Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
Output: [3,4,5,5,4,null,7]
```

---

### [1] Code (21. 09. 12)

``` java
class Solution {
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null){
            return root2;
        } else if (root2 == null) {
            return root1;
        }
        
        TreeNode node = new TreeNode(root1.val + root2.val);
        node.left = mergeTrees(root1.left, root2.left);
        node.right = mergeTrees(root1.right, root2.right);
        return node;
    }
}
```

> Review

* 어렵지 않게 풀었다.

  다시 풀 필요도 없다.


---

## Reference

* [617. Merge Two Binary Trees](https://leetcode.com/problems/merge-two-binary-trees/)