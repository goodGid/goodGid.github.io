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

### [3] Code (21. 07. 31)

``` java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {        
        
        List<Integer> ans = new ArrayList<>();
        
        if (root != null) {
            inOrder(ans, root);
        }
        return ans;
    }
    
    public void inOrder(List<Integer> ans, TreeNode node) {
        if (node.left != null) {
            inOrder(ans, node.left);
        }
        ans.add(node.val);
        
        if (node.right != null) {
            inOrder(ans, node.right);
        }
    }
}
```

* 다시 문제를 풀었는데 똑같이 Recursive 하게 풀었다.

  아무래도 Recursive가 익숙하다 보니 자연스레 손이 가는 듯하다.

* 그리고 Iterative하게 푸는 코드를 보는데

  참 신선한 아이디어이구나를 또(?) 생각했다.

  다음엔 이 아이디어가 먼저 떠오를 수 있길 !

---

### [4] Code (21. 10. 02) (x)

**Need to Retry --> 다시 풀 필요 X, [2] 코드 참고*

``` java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();       
        go(ans, root);
        return ans;
    }
    
    public List<Integer> go(List<Integer> ans, TreeNode node) {
        if (node == null) {
            return null;
        }
        
        go(ans, node.left);
        ans.add(node.val);
        go(ans, node.right);
        
        return ans;
    }
}
```

* 재귀 방식으로는 안 풀어봐도 될 거 같다.

  대신 [2]번 처럼 Iterative 한 풀이를 익혀두자.

---

## Reference

*  [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)