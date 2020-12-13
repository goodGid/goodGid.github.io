---
layout: post
title:  " LeetCode : 234. Palindrome Linked List "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

### Problem

```
Given a singly linked list, determine if it is a palindrome.
Could you do it in O(n) time and O(1) space?
```

---

### Example

```
Input: 1->2->2->1
Output: true
```



---

### [1] Code (20. 12. 13)

``` java
class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null) {
            return true; // [1]
        }

        ListNode slow = head;
        ListNode fast = head.next;

        // [2]
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode reversedNode = reverse(slow.next);

        while (reversedNode != null) {
            if (reversedNode.val == head.val) {
                reversedNode = reversedNode.next;
                head = head.next;
            } else {
                return false;
            }
        }
        return true;
    }

    private ListNode reverse(ListNode slow) {
        ListNode toBeCurrent = slow;
        ListNode toBePrev = null;

        // [3]
        while (toBeCurrent != null) {
            ListNode nextNode = toBeCurrent.next;
            toBeCurrent.next = toBePrev;
            toBePrev = toBeCurrent;
            toBeCurrent = nextNode;
        }
        return toBePrev;
    }
}
```

* *Could you do it in O(n) time and O(1) space?*

  조건을 충족시킬 수 있는 아이디어가 떠오르지 않았다.

* 그래서 다른 분의 풀이를 보고 
  
  그 아이디어를 참고해서 문제를 다시 풀었다.

> 아이디어

```
1. 주어진 List Node에서 가운데를 중심으로 반으로 나눈다.
    - LeftListNode / RightListNode
2. 그리고 각 노드의 값을 비교한다.
```

---

* [1] : []로 입력이 들어오면 이 또한 Palindrome이다.

* [2] : fast가 끝나는 시점이 되면 slow는 정확히 중앙에 도착한다.

* [3] : nextNode (= the next node before the end of the loop)

  --> 1번의 loop가 끝나기 전 시점을 기준으로 보면
  
  --> currentNode의 nextNode를 가리키는 Node를 뜻하는 변수

---

* 참고로 reverse(swap) 해주는 로직을 보면 다음과 같은 공식이 있다.

``` java
while (toBeCurrent != null) {
    {1} = {2};
    {2} = {3};
    {3} = {4};
    {4} = {1};
}
```

---


### [2] Code (20. 12. 13)

``` java
class Solution {
    ListNode globalHead = null;
    boolean isPalindrome = true;

    public boolean isPalindrome(ListNode head) {
        globalHead = head;
        recur(head);
        return isPalindrome;
    }

    private void recur(ListNode head) {
        if (head == null || isPalindrome == false) {
            return;
        }

        recur(head.next);

        if (head.val != globalHead.val) {
            isPalindrome = false;
        }
        globalHead = globalHead.next;
    }
}
```

* 재귀 방법으로 구현


---

## Summary

* 다양한 아이디어가 있었다.

  각 값을 Stack과 Queue에 넣고

  Stack의front와 Queue의 top을 비교하면 쉽게 체크가 가능하다.

  다만 이 문제에서는 *O(1) space* 조건을 충족시키진 못한다.



---

## Reference

* [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)