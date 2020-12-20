---
layout: post
title:  " LeetCode : 94. Binary Tree Inorder Traversal "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

### Problem

```
Given the root of a binary tree, return the inorder traversal of its nodes' values.
```





---

### Example

```
Input: root = [1,null,2,3]
Output: [1,3,2]
```

---

### [1] Code (20. 12. 20)

``` java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {

        List<Integer> ansList = new ArrayList<>();
        search(root, ansList);
        return ansList;
    }

    private void search(TreeNode treeNode, List<Integer> ansList) {
        if (treeNode == null) {
            return;
        }
        search(treeNode.left, ansList);
        ansList.add(treeNode.val);
        search(treeNode.right, ansList);
    }
}
```

* Inorder니까 left -> middle -> right 로 순회를 하면 된다.

  그런데 문제 조건 중에 Recursive가 아닌 Iterative하게 풀기를 원했다.

  *Recursive solution is trivial, could you do it iteratively?*

---


### [2] Code (20. 12. 20)

``` java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {

        Stack<TreeNode> s = new Stack<>();
        TreeNode curr = root;
        List<Integer> ansList = new LinkedList<>();

        while (curr != null || s.size() > 0) {
            while (curr != null) {
                s.push(curr);
                curr = curr.left;
            }

            curr = s.pop();
            ansList.add(curr.val);
            curr = curr.right;
        }

        return ansList;
    }
}
```

* Iterative 하게 Inorder Search를 하는 코드이다.


---

## Reference

*  [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)