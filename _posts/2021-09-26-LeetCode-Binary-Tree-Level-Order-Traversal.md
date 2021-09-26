---
layout: post
title:  " LeetCode : 102. Binary Tree Level Order Traversal "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

### Problem

```
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
```


---

### Example

```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

---

### [1] Code (21. 09. 26)

*Need to Retry --> Reference Code 참고*

``` java
class Solution {
public List<List<Integer>> levelOrder(TreeNode root) {

    if (root == null) {
        return new ArrayList<>();
    }

    Queue<Node> q = new LinkedList<>();
    q.add(new Node(root, 0));

    HashMap<Integer, List<Integer>> map = new HashMap<>();
    int depthSize = 0;

    while (!q.isEmpty()) {
        Node node = q.poll();

        List<Integer> list = map.getOrDefault(node.depth, new ArrayList<>());
        list.add(node.treeNode.val);
        map.put(node.depth, list);

        if (node.treeNode.left != null) {
            q.add(new Node(node.treeNode.left, node.depth + 1));
        }

        if (node.treeNode.right != null) {
            q.add(new Node(node.treeNode.right, node.depth + 1));
        }
    }

    List<List<Integer>> ans = new ArrayList<>();
    int idx = 0;
    while (true) {
        if (!map.containsKey(idx)) {
            break;
        }
        ans.add(new ArrayList(map.get(idx++)));
    }
    return ans;
}

class Node {
    private TreeNode treeNode;
    private int depth;

    public Node(TreeNode treeNode, int depth) {
        this.treeNode = treeNode;
        this.depth = depth;
    }
}
}
```

> Concern Point

**HashMap 선언 시 Value에 List 넣기**

``` java
HashMap<Integer, List<Integer>> map = new HashMap<>();
```

* 갑자기 Value에 List 어떻게 넣어야 하지? 생각이 나지 않았다.

---

> Reference Code

``` java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> lvOrder = new ArrayList<>();
        if (root == null) {
            return lvOrder;
        }
        Queue<TreeNode> bfsTreeBuffer = new LinkedList<>();
        bfsTreeBuffer.offer(root);
        while (!bfsTreeBuffer.isEmpty()) {
            int layerSize = bfsTreeBuffer.size(); // [1]
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < layerSize; i++) { // [2]
                TreeNode current = bfsTreeBuffer.poll();
                level.add(current.val);
                if (current.left != null) {
                    bfsTreeBuffer.offer(current.left);
                }
                if (current.right != null) {
                    bfsTreeBuffer.offer(current.right);
                }
            }
            lvOrder.add(level);
        }
        return lvOrder;
    }
}
```

* [1] : Binary Tree 특징을 이용하여 

  Queue에 들어있는 Size가 해당 Level에 존재하는 Node의 수이다.

* [2] : 위 특징을 이용하여 [2]에서 Size만큼만 for 문을 돌린다.

> Review

* 구현 문제라 어렵지 않았지만

  다른 사람의 풀이를 보면서 한 수 배웠다.

---

## Reference

* [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)