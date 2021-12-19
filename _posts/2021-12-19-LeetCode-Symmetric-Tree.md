---
layout: post
title:  " LeetCode : 101. Symmetric Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)

### Problem

```
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
```


---

### Example

```
Input: root = [1,2,2,3,4,4,3]
Output: true
```

---

### [1] Code (21. 12. 19)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

---

> Reference Code

``` java
// ref : https://leetcode.com/problems/symmetric-tree/discuss/1632703/DFS-and-BFS-java-solutions
public boolean isSymmetric(TreeNode root) {
    if (root.left == null && root.right == null) {return true;}
    if (root.left == null || root.right == null) {return false;}
    Stack<TreeNode> stack = new Stack<TreeNode>();
    stack.add(root.left);
    stack.add(root.right);

    while (!stack.isEmpty()) {
        TreeNode n1 = stack.pop();
        TreeNode n2 = stack.pop();
        if (n1.val != n2.val) {return false;}
        if (n1.left != null && n2.right != null) {
            stack.add(n1.left);
            stack.add(n2.right);
        } else if (n1.left != null || n2.right != null) {return false;}
        if (n1.right != null && n2.left != null) {
            stack.add(n1.right);
            stack.add(n2.left);
        } else if (n1.right != null || n2.left != null) {return false;}
    }
    return true;
}
```

---

> Review

* 다음에 맞추도록 하자 ! 




---

## Reference

* [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)