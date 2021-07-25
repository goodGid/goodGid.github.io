---
layout: post
title:  " LeetCode : 226. Invert Binary Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

### Problem

```
Given the root of a binary tree, invert the tree, and return its root.
```


---

### Example

```
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
```

---

## [1] Code (21. 07. 25)

*Need to Retry*

``` java
public TreeNode invertTree(TreeNode root) {
    if (root == null){
        return null;
    }

    // [1]       
    TreeNode rightNode = root.right;        
    root.right = root.left;
    root.left = rightNode;
    
    invertTree(root.left);
    invertTree(root.right);

    return root;
}
```

> Algorithm Description

* 트리의 각 Level 마다 Invert를 해주면 된다.

> Complex

* Time : $O(N)$

  Space : $O(N)$

```
Since each node in the tree is visited only once, the time complexity is O(n)
where n is the number of nodes in the tree. 
We cannot do better than that since at the very least we have to visit each node to invert it.

Because of recursion, O(h) function calls will be placed on the stack in the worst case
where h is the height of the tree. the space complexity is O(n).
```

> Wrong Reason

* 아이디어가 떠오르지 않았다.

* 너무 어렵게 접근하려 했다.

> Feed Back

* [1] : 저렇게 할 필요 없이 다음과 같은 코드로도 swap이 가능하다.

``` java
public TreeNode invertTree(TreeNode root) {
    if (root == null) {
        return null;
    }

    // right,left는 새로 생성된 TreeNode 인스턴스이다.
    // 그러므로 root.right와 root.left에 다이렉트로 할당을 해줘도 된다.
    TreeNode right = invertTree(root.right);
    TreeNode left = invertTree(root.left);
    root.left = right;
    root.right = left;
    return root;
}
```

> Reference Code

``` java
public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    Queue<TreeNode> queue = new LinkedList<TreeNode>();
    queue.add(root);
    while (!queue.isEmpty()) {
        TreeNode current = queue.poll();
        TreeNode temp = current.left;
        current.left = current.right;
        current.right = temp;
        if (current.left != null) queue.add(current.left);
        if (current.right != null) queue.add(current.right);
    }
    return root;
}
```
* Recursive가 아닌 Iterative하게 풀 수도 있다.

  대신 아이디어만 다를 뿐 동작 원리는 같다.

* 시간/공간 복잡도는 두 개다 : $O(N)$이다.

```
Since each node in the tree is visited / added to the queue only once
the time complexity is O(n) where nn is the number of nodes in the tree.

Space complexity is O(n), since in the worst case, 
the queue will contain all nodes in one level of the binary tree.
```


> Review

* 분명 코드는 짧을 텐데라는 느낌은 들었지만

  아이디어가 떠오르지 않았다. ㅠㅠ



---

## Reference

* [226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)