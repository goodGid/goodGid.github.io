---
layout: post
title:  " LeetCode : 199. Binary Tree Right Side View "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

### Problem

```
Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
```


---

### Example

```
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
```

---

### [1] Code (21. 10. 03)

``` java
public List<Integer> rightSideView(TreeNode root) {
    if (root == null) {
        return new ArrayList<>();
    }

    Queue<TreeNode> q = new LinkedList<>();
    List<Integer> ans = new ArrayList<>();

    q.add(root);

    while (!q.isEmpty()) {
        int size = q.size(); // [1]

        for (int i = 0; i < size; i++) { // [2]
            TreeNode node = q.poll();

            if (i == size - 1) {
                ans.add(node.val);
            }
            if (node.left != null) {
                q.add(node.left);
            }
            if (node.right != null) {
                q.add(node.right);
            }
        }
    }
    return ans;
}
```

> Algorithm Description

* 각 Level마다 가장 오른쪽을 찾기 위해 Queue를 사용하였다.

* [1] : Binary Tree 특징을 이용하여

  Queue에 들어있는 Size가 해당 Level에 존재하는 Node의 수이다.

  [2] : 위 특징을 이용하여 [2]에서 Size만큼만 for 문을 돌린다.

* 비슷한 아이디어의 문제 : [LeetCode : 102. Binary Tree Level Order Traversal]({{site.url}}/LeetCode-Binary-Tree-Level-Order-Traversal/#1-code-21-09-26)의 Reference Code 


---

## Reference

* [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)