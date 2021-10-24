---
layout: post
title:  " LeetCode : 230. Kth Smallest Element in a BST "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

### Problem

```
Given the root of a binary search tree, and an integer k, return the kth (1-indexed) smallest element in the tree.
```



---

### Example

```
Input: root = [3,1,4,null,2], k = 1
Output: 1
```

---

### [1] Code (21. 08. 16)

*Need to Retry*

``` java
class Solution {
    int depth = 0;
    int ans = 0;
    public int kthSmallest(TreeNode root, int k) {
        
        go(root,k);
        
        return ans;
    }
    
    private void go(TreeNode head, int k) {
        
        if (head.left != null) {
            go(head.left, k);
        }
        
        depth++;        
        if (depth == k) {
            ans = head.val;
        }   
        
        if (head.right != null) {
            go(head.right, k);
        }
    }
}
```

> Algorithm Description

* 중위 탐색 하듯이 순회하면서 정답을 찾으면 된다.

> Reference Code

``` java
public int kthSmallest(TreeNode root, int k) {
    if (root == null) {
        return 0;
    }

    LinkedList<TreeNode> result = new LinkedList<TreeNode>();
    TreeNode p = root;

    while (true) {
        while (p != null) {
            result.add(p);
            p = p.left;
        }

        p = result.removeLast();
        if (--k == 0) {
            return p.val;
        }
        p = p.right;
    }
}
```

* 재귀가 아닌 while 문으로도 해결할 수 있었다.

  iterative 하게 푸는 아이디어를 잘 익혀두자 !

  그래서 Need to Retry를 추가해놓았다.

> Review

* 20분 소요

* 재귀보다 iterative 풀이가 메모리를 더 적게 사용한다.

  다음에 풀 땐 iterative 하게 풀어보자.

---

### [2] Code (21. 10. 16)

*Need to Retry -> 재귀말고 iterative하게 풀어보기*

``` java
public int kthSmallest(TreeNode root, int k) {
    List<TreeNode> list = new ArrayList<>();
    go(root, k, list);
    return list.get(k-1).val;
}

private void go(TreeNode node, int k, List<TreeNode> list) {
    if (node == null) {
        return ;
    }
    go(node.left, k, list);
    list.add(node);
    go(node.right, k, list);
}
```

---

> Reference Code

``` java
public int kthSmallest(TreeNode root, int k) {
    int count = 0;
    Stack<TreeNode> s = new Stack();
    while (!s.isEmpty() || root != null) {
        if (root != null) {
            s.push(root);
            root = root.left;
        } else {
            TreeNode t = s.pop();
            count++;
            if (count == k) {return t.val;}
            root = t.right;
        }
    }
    return 0;
}
```

---

> Review

* iterative 하게 풀어보려 했는데 풀지 못했다.

  자료구조로 Stack까지는 생각했는데 그다음 로직에서 막혔다.

  다음에 iterative 하게 풀어보자.

* 그리고 [1]의 Reference Code랑 [2]의 Reference Code를 다시 보자.

---


### [3] Code (21. 10. 24)

*Need to Retry -> iterative하게 풀어보자.*

``` java
class Solution {
    public int kthSmallest(TreeNode root, int k) {
        int cnt = 0;
        Stack<TreeNode> st = new Stack<>();
        TreeNode cur = root;
        st.add(root);

        while (true) {
            while (cur.left != null) {
                st.add(cur.left);
                cur = cur.left;
            }

            while (!st.isEmpty()) {
                cur = st.pop();

                if (cnt + 1 == k) {
                    return cur.val;
                }
                cnt++;

                if (cur.right != null) {
                    st.add(cur.right);
                    cur = cur.right;
                    break;
                }
            }
        }
    }
}
```

> Review

* 23분 소요 

* [1]의 Reference Code랑 [2]의 Reference Code와는 비슷한 듯 살짝 다르다.

  iterative하게 풀어서 맞았지만 다시 한 번 풀어도 좋은 문제라고 생각이 든다.


---

## Reference

* [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)