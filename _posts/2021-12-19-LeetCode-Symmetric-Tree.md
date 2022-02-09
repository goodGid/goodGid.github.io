---
layout: post
title:  " LeetCode : 101. Symmetric Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)

### Problem

```
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
```


---

### Example

```
Input: root = [1,2,2,3,4,4,3]
Output: true
```

---

### [1] Code (21. 12. 19)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

---

> Reference Code

``` java
// ref : https://leetcode.com/problems/symmetric-tree/discuss/1632703/DFS-and-BFS-java-solutions
public boolean isSymmetric(TreeNode root) {
    if (root.left == null && root.right == null) {return true;}
    if (root.left == null || root.right == null) {return false;}
    Stack<TreeNode> stack = new Stack<TreeNode>();
    stack.add(root.left);
    stack.add(root.right);

    while (!stack.isEmpty()) {
        TreeNode n1 = stack.pop();
        TreeNode n2 = stack.pop();
        if (n1.val != n2.val) {return false;}
        if (n1.left != null && n2.right != null) {
            stack.add(n1.left);
            stack.add(n2.right);
        } else if (n1.left != null || n2.right != null) {return false;}
        if (n1.right != null && n2.left != null) {
            stack.add(n1.right);
            stack.add(n2.left);
        } else if (n1.right != null || n2.left != null) {return false;}
    }
    return true;
}
```

---

> Review

* 다음에 맞추도록 하자 ! 

---

### [2] Code (22. 02. 09)

*Need to Retry -> 아이디어를 떠올렸는데 살짝 아쉬웠다.*

``` java
// Wrong Code
// Ref : https://leetcode.com/submissions/detail/637783907
// 187 / 197 test cases passed.
// Status : TLE 발생 
class Solution {
    public boolean isSymmetric(TreeNode root) {

        Queue<TreeNode> q = new LinkedList<>();

        q.add(root);

        while (!q.isEmpty()) {
            int size = q.size();

            List<TreeNode> list = new ArrayList<>();
            boolean flag = false;
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                list.add(node);

                if (node.val != 101) { // [1]
                    flag = true;
                }

                if (node.left != null) { q.add(node.left); } 
                else { q.add(new TreeNode(101)); }

                if (node.right != null) { q.add(node.right); } 
                else { q.add(new TreeNode(101)); }
            }

            if (flag == false) { // [2]
                return true;
            }

            int left = 0;
            int right = size - 1;

            while (left <= right) {
                TreeNode leftNode = list.get(left);
                TreeNode rightNode = list.get(right);

                if (leftNode.val != rightNode.val) {
                    return false;
                }
                left++;
                right--;
            }
        }
        return true;
    }
}
```

---

> Algorithm Description

* 큐에 left, right 노드를 넣으면서 순회를 한다.

  그 단계마다 해당 level의 노드를 담는 list를 사용하여

  list의 left와 right에 대해 2포인터 느낌으로 대칭이 되는지 체크를 한다.

* [1] : 만약 해당 Level 노드 값들이 

  모두 임시로 넣은 값이라면 

  모든 노드를 순회하였고

  더 이상의 순회를 필요가 없으므로 flag 값을 false로 유지한다.

* [2] : 더는 순회할 필요가 없고

  모든 노드를 순회하였고 대칭이였으므로 true를 return 한다.

---

> Wrong Reason

* 큐에는 유효한 노드만 넣어야 한다.

  그런데 list에는 유효하지 않은 값도 넣어야지

  대칭이 되는지 체크가 가능하다.

* 여기서 막혔던 부분이

  큐에 유효하지 않은 값을 넣어주다 보니

  while 문이 돌게 되었고

  그래서 유효하지 않은 값을 validation 해주는 코드를 넣어

  (= [1], [2] 부분 코드)

  종료를 하게 했는데 TLE가 발생하였다.

* 그래도 로직은 맞았다고 생각이 드는 게

  총 197개 중 187는 pass 하였다.

  = 187 / 197 test cases passed.

---

> Reference Code

**Case 1**

``` java
// Runtime: 1 ms
// Memory Usage: 40.1 MB
// Ref : https://leetcode.com/problems/symmetric-tree/discuss/1739605/0ms-Beats-100-oror-Java-oror-BFS
class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) {
            return true;
        }
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root.left);
        q.offer(root.right);
        while (!q.isEmpty()) {
            TreeNode a = q.poll();
            TreeNode b = q.poll();
            if (a == null && b == null) {
                continue;
            }
            if (a == null || b == null) {
                return false;
            }
            if (a.val != b.val) {
                return false;
            }

            // [1]
            q.offer(a.left);
            q.offer(b.right);
            q.offer(a.right);
            q.offer(b.left);
        }
        return true;
    }
}
```

* Iteratively 방식의 풀이

* [1] : 큐에 노드를 넣는 순서에 대해 유연하게 사고하지 못했던 부분을 해결한 코드이다.

---

**Case 2**

``` java

class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) {return true;}
        return helper(root.left, root.right);
    }

    public boolean helper(TreeNode l, TreeNode r) {
        if (null == l && null == r) {return true;}
        if (null == l || null == r) {return false;}
        if (l.val == r.val) {return helper(l.left, r.right) && helper(l.right, r.left);}
        return false;
    }
}
```

* Recursively 방식의 풀이

---

> Review

* "Reference Code#Case 1" 코드와 비슷한 아이디어로 접근했지만

  큐에 노드를 넣는 로직에 대해 
  
  좀 더 유연하게 생각했다면 맞췄을 수도 있을 텐데 라는 아쉬움이 남는다.


---

## Reference

* [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)