---
layout: post
title:  " LeetCode : 114. Flatten Binary Tree to Linked List "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)

### Problem

```
Given the root of a binary tree, flatten the tree into a "linked list":

The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
The "linked list" should be in the same order as a pre-order traversal of the binary tree.
```


---

### Example

```
Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
```

---

### [1] Code (21. 10. 23)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

> Check Point

* Can you flatten the tree in-place (with O(1) extra space)?

---

> Reference Code

**Case 1**

``` java
// Time : O(N)
// Space : O(Height)
// ref : https://www.youtube.com/watch?v=NOKVBiJwkD0
class Solution {
    public void flatten(TreeNode root) {
        if (root == null) {
            return ;
        }
        
        TreeNode tempLeft = root.left;
        TreeNode tempRight = root.right;
        
        root.left = null;
        
        flatten(tempLeft);
        flatten(tempRight);
        
        root.right = tempLeft;
        TreeNode current = root;
        while (current.right != null) {
            current = current.right;
        }
        current.right = tempRight;
    }
}
```

* 재귀로 높이만큼 탐색하므로 공간복잡도가 O(Height)가 된다.

---

**Case 2**

``` java
// Time : O(N)
// Space : O(1)
// ref : https://www.youtube.com/watch?v=NOKVBiJwkD0
class Solution {
    public void flatten(TreeNode root) {
        if (root == null) {
            return ;
        }
        
        while (root != null) {
            if (root.left != null) {
            TreeNode left = root.left;
            TreeNode current = left;
            
            while (current.right != null) {
                current = current.right;
            }
            current.right = root.right; // Morris Traversal main step
            root.left = null;
            root.right = left;
            }
        root = root.right;
        }
    }
}
```

* O(1) 공간 복잡도 풀이

---

> Review

* 다음에 위 2개 아이디어를 떠올려서 풀어봐야겠다.

  그런데 떠올릴 수 있을지 모르겠다. @__@




---

## Reference

* [114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)