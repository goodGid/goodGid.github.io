---
layout: post
title:  " LeetCode : 538. Convert BST to Greater Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [538. Convert BST to Greater Tree](https://leetcode.com/problems/convert-bst-to-greater-tree)

### Problem

```
Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.
```


---

### Example

```
Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
```

---

### [1] Code (22. 05. 28) (x)

``` java
// Runtime: 1 ms
// Memory Usage: 49.4 MB
// Ref : https://leetcode.com/submissions/detail/707959747
class Solution {
    private int maxVal = 0;
    public TreeNode convertBST(TreeNode root) {
        recur(root);
        return root;
    }
    
    private void recur(TreeNode node) {
        if (node == null) {
            return;
        }
        
        recur(node.right);
        node.val = node.val + maxVal;
        maxVal = node.val;
        recur(node.left);
    }
}
```

---

> Review

* 전위/중위/후위 탐색을 약간 변형하여서 생각하니 어렵지 않게 풀 수 있었다.

  




---

## Reference

* [538. Convert BST to Greater Tree](https://leetcode.com/problems/convert-bst-to-greater-tree)