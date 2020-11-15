---
layout: post
title:  " LeetCode : 237. Delete Node in a Linked List "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [(Easy) Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/)

### Problem

```
Write a function to delete a node in a singly-linked list. You will not be given access to the head of the list, 
instead you will be given access to the node to be deleted directly.
It is guaranteed that the node to be deleted is not a tail node in the list.
```
 
---

### Example

```
Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
```

---

### Code (20. 11. 13)

``` java
public void deleteNode(ListNode node) {
    node.val = node.next.val;
    node.next = node.next.next;
}
```

* 문제가 뭐지?... 

  굉장히 어색한 스타일의 문제였다.

---

## Reference

* [237. Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/)
