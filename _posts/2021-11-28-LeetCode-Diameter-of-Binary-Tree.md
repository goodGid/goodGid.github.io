---
layout: post
title:  " LeetCode : 543. Diameter of Binary Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

### Problem

```
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.
```


---

### Example

```
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
```

---

### [1] Code (21. 11. 28)

*Need to Retry -> Diameter의 정확한 의미를 파악하자*

``` java
// Wrong Code
class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        int leftDepth = DFS(root.left, 0, 0);
        int rightDepth = DFS(root.right, 0, 0);
        return leftDepth + rightDepth;
    }

    private int DFS(TreeNode node, int depth, int maxDepth) {
        if (node == null) {
            return Math.max(maxDepth, depth);
        }

        int leftMaxDepth = DFS(node.left, depth + 1, maxDepth);
        int rightMaxDepth = DFS(node.right, depth + 1, maxDepth);

        return Math.max(leftMaxDepth, rightMaxDepth);
    }
}
```

---

> Wrong Reason

* 문제 자체를 잘못 이해했다.

  애초에 이게 맞나? 생각이 들었지만

  DFS라는 생각으로 풀었다.

* *This path may or may not pass through the root.* 

  특히 위 문장의 진짜 뜻을 헤아리지 못했다.

<center><img src="/assets/img/leetcode/LeetCode-Diameter-of-Binary-Tree_1.png" alt="" style="max-width: 50%;"> 
<p><em>출처 : <a href="https://www.youtube.com/watch?v=1VNWJTbE2pM" target="_blank">코딩테스트, 초급, Tree Diameter,Tree 지름 구하기</a></em></p>
</center>

* 루트 기준으로 보면 

  좌측 서브 트리의 레벨 = 4

  우측 서브 트리의 레벨 = 1 

  그래서 5라는 답이 나온다.

* 하지만 "2" 노드를 기준으로

  좌우를 보면 3 + 3 = 6 이라는 값이 나온다.

---

> Reference Code

``` java
public class Solution {
    int max = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        maxDepth(root);
        return max;
    }

    private int maxDepth(TreeNode root) {
        if (root == null) {return 0;}

        // [1]
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        max = Math.max(max, left + right);

        // [2]
        return Math.max(left, right) + 1;
    }
}
```

* [1] : 현재 노드를 기준으로 좌우의 **Depth 차이**를 구한다.

* [2] : 현재 노드를 기준으로 좌우 중 **최대 Depth**를 구한다.

---

> Review

* 요즘 문제를 풀면서 느끼는 건데

  문제 지문에 주어진 힌트를 잘 이해하고 활용해야 함을 느낀다.

---

### [2] Code (22. 01. 31) (x)

``` java
// Runtime: 1 ms
// Memory Usage: 43.6 MB
// Ref : https://leetcode.com/submissions/detail/631552260
class Solution {
    int ans = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        dfs(root);
        return ans;
    }

    private int[] dfs(TreeNode node) {
        if (node == null) {
            return new int[] { -1, -1 };
        }

        int[] left = dfs(node.left);
        int[] right = dfs(node.right);

        int maxLeft = Math.max(left[0], left[1]) + 1;
        int maxRight = Math.max(right[0], right[1]) + 1;

        ans = Math.max(ans, maxLeft + maxRight);

        return new int[] { maxLeft, maxRight };
    }
}
```

---

> Review

* 30분 정도 소요 

  아이디어 생각이 안 나서 포기하려다 한 번 더 곰곰이 생각했더니 아이디어가 떠올랐다.

---

## Reference

* [543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

* [코딩테스트, 초급, Tree Diameter,Tree 지름 구하기](https://www.youtube.com/watch?v=1VNWJTbE2pM)