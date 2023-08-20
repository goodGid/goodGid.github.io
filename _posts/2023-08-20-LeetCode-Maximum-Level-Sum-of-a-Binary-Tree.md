---
layout: post
title: " LeetCode : 1161. Maximum Level Sum of a Binary Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1161. Maximum Level Sum of a Binary Tree](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree)

### Problem

```
Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
Return the smallest level x such that the sum of all the values of nodes at level x is maximal.
```


---

### Example

```
Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.
```

---

### [1] Code (23. 08. 20) (x)

``` java
// Runtime: 8 ms
// Memory Usage: 46.2 MB
// Ref : https://leetcode.com/submissions/detail/1026676455
class Solution {
    public int maxLevelSum(TreeNode root) {

        Queue<TreeNode> q = new LinkedList<>();

        int level = 0;
        int ans = 1;
        int ansLevel = 0;
        int ansVal = -100000;

        q.add(root);

        while (!q.isEmpty()) {
            ansLevel++;

            int size = q.size();
            int sum = 0;

            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                sum += node.val;

                if (node.left != null) {
                    q.add(node.left);
                }
                if (node.right != null) {
                    q.add(node.right);
                }
            }

            if (sum > ansVal) {
                ans = ansLevel;
                ansVal = sum;
            }
        }
        return ans;
    }
}
```

* 너무나도 무난했던 BFS 유형의 문제

* 다시 풀 필요 X

---

## Reference

* [1161. Maximum Level Sum of a Binary Tree](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree)