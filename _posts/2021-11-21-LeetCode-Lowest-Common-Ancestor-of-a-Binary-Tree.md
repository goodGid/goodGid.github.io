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

**Case 1**

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

**Case 2**

``` java
// Time : 5 ms
// Space : 40.8 MB
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) {return null;}

        if (root.equals(p) || root.equals(q)) {return root;}

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) {return root;}

        return (left != null) ? left : right;
    }
}
```

* [Lowest Common Ancestor of a Binary Tree](https://www.youtube.com/watch?v=WRAJ8Q9bICM)

  Youtube에 있는 해설 영상인데

  설명이 매우 잘 되어있어서 보기만 해도 이해가 된다.

---

> Review

* 구현 능력이 부족하였다.

---

### [2] Code (22. 01. 20)

*Need to Retry -> 또 구현을 못했다.*

``` java
n/a
```

---

> Reference Code

``` java
// Time : 5 ms
// Space : 40.8 MB
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) {return null;}

        if (root.equals(p) || root.equals(q)) {return root;}

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) {return root;}

        return (left != null) ? left : right;
    }
}
```

> Review

* 문제를 너무 어렵게 접근했다.

  다음엔 꼭 풀 수 있길...

---

### [3] Code (24. 03. 23)

*Retry*

``` java
// Runtime: 7 ms
// Memory Usage: 44.7 MB
// Ref : https://leetcode.com/submissions/detail/1211621757
class Solution {
    private TreeNode ans = null;
    // private int cnt = 0;
    
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        List<TreeNode> list = new ArrayList<>();
        go(root, p, q);
        return ans;
    }
    
    private int go(TreeNode node, TreeNode p, TreeNode q) {
        int cnt = 0;
        
        if (node == null) {
            return 0;
        }
        if (ans != null) {
            return -1;
        }
        
        if (node.val == p.val || node.val == q.val) {
            cnt++;
        }
        
        cnt += go(node.left, p, q);
        cnt += go(node.right, p, q);
        if (cnt == 2) { 
            ans = node;
            cnt = 0;
        }
        return cnt;
    }
}
```

* 1시간 정도 소요

* 드디어 스스로 힘으로 풀었다.

  로직을 3번 뒤엎으면서 풀었다.

  2년 전에 풀었을 때는 아예 막막했던 기억이 있는데

  이번에는 그래도 할 수 있겠는데?라는 자신감이 있어서 포기하지 않았다.

* 문제를 풀어서 뿌듯하지만

  코드가 깔끔하진 않아서 아쉬운 부분이 있다.

---

> Reference Code

``` java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root; //DNE / one of the subnodes, return it
        }
        //Find if p and q exist in subtrees
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left == null) { //DNE in left
            if (right == null) { //Also DNE in right, return null
                return null;
            } else { //Does exist in right, return right
                return right;
            }
        } else { //Exists in left
            if (right == null) { //DNE in right, return left
                return left;
            } else { //Also exist in right, return root
                return root;
            }
        }
    }
}
```

---

> Review

* 2년동안 **성장**을 했다는 생각에 너무 뿌듯하다.

---

## Reference

* [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)