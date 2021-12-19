---
layout: post
title:  " LeetCode : 105. Construct Binary Tree from Preorder and Inorder Traversal "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

### Problem

* Need to Retry

```
Given preorder and inorder traversal of a tree, construct the binary tree.
Note:
You may assume that duplicates do not exist in the tree.
```





---

### Example

```
preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]

  3
 / \
9  20
  /  \
 15   7
```

---

### [1] Code (21. 01. 15)

*Need to Retry*

``` java
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return recur(preorder, 0, preorder.length - 1,
                     inorder, 0, inorder.length - 1);
    }

    private TreeNode recur(int[] preorder, int preStart, int preEnd,
                           int[] inorder, int inStart, int inEnd) {
        if (preStart > preEnd || inStart > inEnd) { // [1]
            return null;
        }

        TreeNode root = new TreeNode(preorder[preStart]);

        int inorderRootIdx = inStart; // [2]
        for (int i = inStart; i <= inEnd; i++) {
            if (preorder[preStart] == inorder[i]) {
                inorderRootIdx = i;
                break;
            }
        }

        int subLength = inorderRootIdx - inStart;

        // [3]
        root.left = recur(preorder, preStart + 1, preStart + subLength,
                          inorder, inStart, inStart + subLength);

        root.right = recur(preorder, preStart + subLength + 1, preEnd,
                           inorder, inorderRootIdx + 1, inEnd);
        return root;
    }
}
```

* 어려웠다. 

  다시 풀어봐야겠다.

* 정답을 알고 보면 아이디어는 참 간단했는데

  처음부터 떠올리는 게 쉽지 않았다.


* [1] : recursive의 종료 조건이 쉽게 떠오르지 않았다.

* [2] : preOrder와 inOrder 배열을 하고 rootNode를 찾는 아이디어는 신선했다.

* [3] : Merge Sort 처럼 반으로 쪼개는 조건이 어려웠다.

---

### [2] Code (21. 12. 19) (x)


``` java
// Runtime: 6 ms
// Memory Usage: 41.5 MB
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return go(preorder, inorder,
                  0, preorder.length - 1,
                  0, inorder.length - 1);

    }

    private TreeNode go(int[] preorder, int[] inorder,
                        int preLeftIdx, int preRightIdx,
                        int inLeftIdx, int inRightIdx) {

        if (preLeftIdx > preRightIdx) {
            return null;
        }

        TreeNode node = new TreeNode(preorder[preLeftIdx]);

        int range = 0;
        for (int i = inLeftIdx; i <= inRightIdx; i++) {
            if (inorder[i] == node.val) {
                range = i - inLeftIdx;
            }
        }

        node.left = go(preorder, inorder,
                       preLeftIdx + 1, preLeftIdx + range,
                       inLeftIdx, inLeftIdx + range - 1);
        node.right = go(preorder, inorder,
                        preLeftIdx + 1 + range, preRightIdx,
                        inLeftIdx + 1 + range, inRightIdx);

        return node;
    }
}
```

---

> Review

* 30분 정도 소요


---

## Reference

* [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)