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

### [2] Code (21. 11. 28) (x)

``` java
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        if (root == null) {
            return new ArrayList<>();
        }

        List<Integer> ans = new ArrayList<>();
        List<List<Integer>> treeLevelGroup = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();

        q.add(root);

        while (!q.isEmpty()) {
            int size = q.size();

            List<Integer> list = new ArrayList<>();

            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                list.add(node.val);
                if (node.left != null) {q.add(node.left);}
                if (node.right != null) {q.add(node.right);}
            }
            treeLevelGroup.add(list);
        }

        int depth = treeLevelGroup.size();
        for (int i = 0; i < depth; i++) {
            int size = treeLevelGroup.get(i).size();
            ans.add(treeLevelGroup.get(i).get(size - 1));
        }

        return ans;
    }
}
```

---

> Reference Code

``` java
while (!q.isEmpty()) {
    int size = q.size();

    for (int i = 0; i < size; i++) {
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
```

* *treeLevelGroup* 변수 선언을 할 필요 없이

  위처럼 좀 더 효율적으로 구현할 수 있다.

---

> Review

* BFS 유형의 문제는 확실히 풀 수 있겠단 자신감이 생겼다.

---

### [3] Code (25. 06. 08) (x)

``` java
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        if (root == null) {
            return ans;
        }
        q.add(root);

        while (!q.isEmpty()) {
            int size = q.size();
            for (int i=0; i<size; i++) {
                TreeNode node = q.poll();
                if (i == size-1) {
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
}
```

* 이전과 비슷하게 풀었다.

  이런 유형에 대해선 아이디어도 바로 떠오르고 자신감 있게 접근했다.

---

## Reference

* [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)