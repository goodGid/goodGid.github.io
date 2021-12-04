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
        if (l1 == null) { return l2; }
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

### [2] Code (21. 10. 09)

``` java
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode ans = new ListNode();
    ListNode root = ans;

    while (l1 != null && l2 != null) {
        if (l1.val == l2.val) {
            ans.next = new ListNode(l1.val);
            ans = ans.next;
            ans.next = new ListNode(l2.val);
            ans = ans.next;
            l1 = l1.next;
            l2 = l2.next;
        } else if (l1.val > l2.val) {
            ans.next = new ListNode(l2.val);
            ans = ans.next;
            l2 = l2.next;
        } else {
            ans.next = new ListNode(l1.val);
            ans = ans.next;
            l1 = l1.next;
        }
    }

    if (l1 == null) {
        ans.next = l2;
    }

    if (l2 == null) {
        ans.next = l1;
    }

    return root.next;
}
```

> FeedBack

* 생각의 흐름대로 풀었다.

  알고리즘을 푸는 관점에서는 별로 좋지 않은 코드라고 생각이 든다.

* 다음에 다시 풀 땐 [1] 풀이처럼 깔끔하게 풀어보도록 하자.


---

### [3] Code (21. 12. 04) (x)

``` java
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        if (list1 == null) {
            return list2;
        }
        
        if (list2 == null) {
            return list1;
        }
        
        if (list1.val < list2.val) {
            list1.next = mergeTwoLists(list1.next, list2);
            return list1;
        }
        
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}
```

---

> Review

* 어렴풋하게 아이디어가 생각나서 금방 풀었다.


---

## Reference

* [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)