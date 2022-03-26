---
layout: post
title:  " LeetCode : 19. Remove Nth Node From End of List "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

### Problem

* Need to Retry

```
Given the head of a linked list, remove the nth node from the end of the list and return its head.
Follow up: Could you do this in one pass?
```





---

### Example

```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

---

### [1] Code (21. 02. 13)

``` java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummyNode = new ListNode(0);
        dummyNode.next = head;

        int length = 0;
        ListNode node = head;
        while (node != null) {
            length++;
            node = node.next;
        }

        length -= n;
        node = dummyNode;
        while (length > 0) {
            length--;
            node = node.next;
        }
        node.next = node.next.next;
        return dummyNode.next;
    }
}
```

> Algorithm Description

* 약간의 아이디어가 필요한 구현 문제이다.

* 여기서 배워갈 만한 Skill은 dummyNode를 사용하는 이유이다.

> Example 

``` java
public ListNode removeNthFromEnd(ListNode head, int n) {
    ...
    node.next = node.next.next; // [1]
    ...
}
```

* 1개 Node가 들어온다면

  *[1]* *(= first.next.next)* 에서 NPE가 발생하므로 

  추가로 1개 Node를 위한 방어코드가 들어간다.

  그러므로 dummy node를 추가해서 사용하면 간결하게 코드 작성이 가능해진다.

---

> Review

* 풀지 못하고 정답을 참고했다.

  아예 손을 못 댄 건 아니고 [코딩]({{site.url}}/Java-Reverse-Linked-Node-Order/)을 하긴 했는데 맞지 못했다.

* 이런 문제는 그냥 구현해서 푸는 게 목적이 아니라

  아이디어를 아느냐 모르느냐이므로 정답을 보고 아이디어를 익히는 게 더 중요하다 판단하였다.

---

### [2] Code (21. 02. 13)

``` java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummyNode = new ListNode(0);
        dummyNode.next = head;

        ListNode leftNode = dummyNode;
        ListNode rightNode = dummyNode;

        while (n >= 0) {
            n--;
            rightNode = rightNode.next;
        }

        // Move rightNode to the end, maintaining the gap
        while (rightNode != null) {
            leftNode = leftNode.next;
            rightNode = rightNode.next;
        }

        leftNode.next = leftNode.next.next;
        return dummyNode.next;
    }
}
```

> Algorithm Description

* *[1] Code* 랑 아이디어는 비슷하나 

  2 포인터로 문제에 접근하였다.

* 알고리즘에 대한 자세한 설명은 [Youtube](https://www.youtube.com/watch?v=XVuQxVej6y8)를 참고하자.


---

### [3] Code (22. 03. 26) (x)

``` java
// Runtime: 1 ms
// Memory Usage: 42.8 MB
// Ref : https://leetcode.com/submissions/detail/667638898
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode temp = new ListNode();
        temp.next = head;

        ListNode node1 = temp;
        ListNode node2 = temp;

        for (int i = 0; i < n; i++) {
            node2 = node2.next;
        }

        while (node2.next != null) {
            node1 = node1.next;
            node2 = node2.next;
        }

        node1.next = node1.next.next;

        return temp.next;
    }
}
```

---

> Algorithm Description

* 문제를 보자마자 아이디어가 떠올랐고 어렵지 않게 풀었다.

---

> Review

* 10분 소요


---

## Reference

* [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)