---
layout: post
title:  " LeetCode : 98. Validate Binary Search Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree)

### Problem

```
Given the root of a binary tree, determine if it is a valid binary search tree (BST).
```


---

### Example

```
Input: root = [2,1,3]
Output: true
```

---

### [1] Code (22. 04. 15)

*Need to Retry*

``` java
// Wrong Code
// Ref : https://leetcode.com/submissions/detail/679641920
class Solution {
    public boolean isValidBST(TreeNode root) {
        if (root == null) {
            return true;
        }

        int val = root.val;

        if (root.left != null) {
            if (!(val > root.left.val)) {
                return false;
            }
            if (root.left.left != null) {
                if (!(val > root.left.left.val)) {
                    return false;
                }
            }
            if (root.left.right != null) {
                if (!(val > root.left.right.val)) {
                    return false;
                }
            }
        }

        if (!isValidBST(root.left)) {
            return false;
        }

        if (root.right != null) {
            if (!(val < root.right.val)) {
                return false;
            }
            if (root.right.left != null) {
                if (!(val < root.right.left.val)) {
                    return false;
                }
                if (!(val < root.right.right.val)) {
                    return false;
                }
            }
        }
        if (!isValidBST(root.right)) {
            return false;
        }
        return true;
    }
}
```

* 풀다 보니 자꾸 이건 아닌 거 같은데 생각이 들었다. -ㅂ-

  그럼에도 붙잡고 풀었지만 실패 ㅠㅠ

---

> Reference Code

**Code 1**

``` java
// Runtime: 0 ms
// Memory Usage: 41.9 MB
// Ref : https://leetcode.com/submissions/detail/680277723/
class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValidBST(root, -Long.MAX_VALUE, Long.MAX_VALUE);
    }

    boolean isValidBST(TreeNode root, long min, long max) {
        if (root == null) {return true;}
        if (root.val >= max || root.val <= min) {return false;}
        return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
    }
}
```

* 너무 심플하다.

---

> Review

* 2~3일에 걸쳐서 풀어보고 아이디어를 다시 떠올려보고 했는데 실패했다.

  정답 코드를 보니 너무나도 심플했다.

---


### [2] Code (24. 02. 25)

*Need to Retry*

``` java
class Solution {
    public boolean isValidBST(TreeNode root) {
        if (root == null) {
            return true;
        }
        
        if (root.left != null && root.val <= root.left.val) {
            return false;
        }
        
        if (root.right != null && root.val >= root.right.val) {
            return false;
        }
        
        
        return isValidBST(root.left, null, root) && isValidBST(root.right, root, null);
    }
    
    public boolean isValidBST(TreeNode root, TreeNode left, TreeNode right) {
        if (root == null) {
            return true;
        }
        
        
        if (root.left != null) {
            if (root.val <= root.left.val) {
                return false;
            }
            
            if (left != null && left.val >= root.left.val) {
                return false;
            }
            
            if (right != null && right.val <= root.left.val) {
                return false;
            }
        }
        
        if (root.right != null) {
            if (root.val >= root.right.val) {
                return false;
            }
            
            if (left != null && root.right.val <= left.val) {
                return false;
            }
            
            if (right != null && root.right.val >= right.val) {
                return false;
            }
        }
        
        return isValidBST(root.left, null, root) && isValidBST(root.right, root, null);
    } 
}
```

* 82 / 85 test cases passed.

* 또 못 풀었네...

  5번 제출을 했는데 결국 막혔다.

* 제대로 복습하고 짚고 넘어가야겠다.

---

## Reference

* [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree)