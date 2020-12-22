---
layout: post
title:  " LeetCode : 21. Merge Two Sorted Lists "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

### Problem

```
Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.
```





---

### Example

```
Input: l1 = [], l2 = [0]
Output: [0]
```

---

### [1] Code (20. 12. 23)

``` java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) {return l2; }
        if (l2 == null) { return l1; }

        if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}
```

* 문제를 보자마자 든 생각은 

  'while문을 돌면서 l1과 l2를 체크해야겠다'이다.

* 하지만 이 방법 말고 **재귀**를 통해 문제를 풀 수 있다.

  이 아이디어는 **Linked List**의 **특성**을 제대로 활용하였다는 생각을 들게 하였다.
  
  마치 **하나의 Node를 살아있는 객체**처럼 다루는 느낌이었다.

* 그리 어렵지 않은 코드이니 반드시 이해해보는 걸 추천한다.
  

---

## Reference

* [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)