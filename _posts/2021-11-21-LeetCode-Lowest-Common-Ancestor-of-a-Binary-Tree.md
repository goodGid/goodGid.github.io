---
layout: post
title:  " LeetCode : 236. Lowest Common Ancestor of a Binary Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

### Problem

```
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
```


---

### Example

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
```

---

### [1] Code (21. 11. 21)

*Need to Retry -> 구현을 못했다.*

``` java
n/a
```

---

> Reference Code

``` java
// Time : 6 ms 
// Space : 43.2 MB
class Solution {
    public static HashMap<Integer, Integer> depthMap;
    public static HashMap<Integer, TreeNode> parentMap;

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        //노드별 depth, 부모노드 계산
        depthMap = new HashMap<>();
        parentMap = new HashMap<>();
        calc(root, 0);

        //p와 q 높이 맞추기
        while (true) {
            //같은 경우 break
            if (depthMap.get(p.val) == depthMap.get(q.val)) {
                break;
            } else if (depthMap.get(p.val) > depthMap.get(q.val)) {
                //p의 깊이가 더 큰경우
                p = parentMap.get(p.val);
            } else {
                q = parentMap.get(q.val);
            }
        }

        //한칸씩 올라가며 값이 같을때까지
        while (true) {
            if (p.val == q.val) {break;} else {
                p = parentMap.get(p.val);
                q = parentMap.get(q.val);
            }
        }
        return p;
    }

    private void calc(TreeNode root, int depth) {
        depthMap.put(root.val, depth);
        if (root.left != null) {
            calc(root.left, depth + 1);
            parentMap.put(root.left.val, root);
        }

        if (root.right != null) {
            calc(root.right, depth + 1);
            parentMap.put(root.right.val, root);
        }
    }
}
```

* [코드](https://github.com/wonyong-park/LeetCode/blob/main/lowest-common-ancestor-of-a-binary-tree/lowest-common-ancestor-of-a-binary-tree.java)가 직관적이여서 이해하기 편했다.

---

``` java
// Time : 4 ms	
// Space : 41.3 MB
class Solution {

    private TreeNode ans;

    public Solution() {
        // Variable to store LCA node.
        this.ans = null;
    }

    private boolean recurseTree(TreeNode currentNode, TreeNode p, TreeNode q) {

        // If reached the end of a branch, return false.
        if (currentNode == null) {
            return false;
        }

        // Left Recursion. If left recursion returns true, set left = 1 else 0
        int left = this.recurseTree(currentNode.left, p, q) ? 1 : 0;

        // Right Recursion
        int right = this.recurseTree(currentNode.right, p, q) ? 1 : 0;

        // If the current node is one of p or q
        int mid = (currentNode == p || currentNode == q) ? 1 : 0;

        // If any two of the flags left, right or mid become True
        if (mid + left + right >= 2) {
            this.ans = currentNode;
        }

        // Return true if any one of the three bool values is True.
        return (mid + left + right > 0);
    }

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Traverse the tree
        this.recurseTree(root, p, q);
        return this.ans;
    }
}
```

* LeetCode [Solution](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/)에 있는 코드이다.

---

> Review

* 구현 능력이 부족하였다.




---

## Reference

* [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)