---
layout: post
title:  " LeetCode : 108. Convert Sorted Array to Binary Search Tree "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

### Problem

```
Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
```

---

### Example

```
Given the sorted array: [-10,-3,0,5,9],

One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:

      0
     / \
   -3   9
   /   /
 -10  5
```



---

### [1] Code (20. 11. 18)

``` java
public TreeNode sortedArrayToBST(int[] nums) {
    return makeBST(nums, 0, nums.length - 1);
}

private TreeNode makeBST(int[] nums, int left, int right) {
    if (left > right) {
        return null;
    }

    int centerIdx = left + (right - left) / 2; // [1]
    // int centerIdx = (left + right) / 2;
    // = int centerIdx = (left + right) >> 1;

    TreeNode treeNode = new TreeNode(nums[centerIdx]);
    treeNode.left = makeBST(nums, left, centerIdx - 1);
    treeNode.right = makeBST(nums, centerIdx + 1, right);
    return treeNode;
}
```

* [1] : (left + right) / 2 로 할 수 있지만

  이러면 overflow가 발생할 수 있다.

  그러므로 left + (right - left) / 2 로 하는게 조금 더 안전하다.

---

### [2] Code (21. 08. 29)

``` java
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return solve(nums, 0, nums.length - 1);
    }

    public TreeNode solve(int[] nums, int stIdx, int endIdx) {
        int midIdx = (stIdx + endIdx) / 2;

        TreeNode node = new TreeNode(nums[midIdx]);
        if (stIdx <= midIdx - 1) {
            node.left = solve(nums, stIdx, midIdx - 1);
        }
        if (midIdx + 1 <= endIdx) {
            node.right = solve(nums, midIdx + 1, endIdx);
        }

        return node;
    }
}
```

* 이전과 같은 방식으로 접근했다.

  다시 풀 필요는 없어 보인다.

---

### [3] Code (21. 10. 31)

``` java
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return go(nums,0,nums.length-1);
    }
    
    private TreeNode go(int[] nums, int left, int right) {
        int mid = (left+right) / 2;
        
        TreeNode node = new TreeNode(nums[mid]);
        
        if (left <= mid-1) {
            node.left = go(nums, left, mid-1);
        }
        if (mid+1 <= right) {
            node.right = go(nums, mid+1, right);
        }
        return node;
    }
}
```

> Review

* 다시 풀 필요는 없어 보인다.

---

## Reference

* [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)
