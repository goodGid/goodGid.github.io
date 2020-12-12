---
layout: post
title:  " LeetCode : 141. Linked List Cycle "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

### Problem

```
Given head, the head of a linked list, determine if the linked list has a cycle in it.
There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
Return true if there is a cycle in the linked list. Otherwise, return false.
```

---

### Example

```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
```



---

### [1] Code (20. 12. 12)

> Wrong Code

``` java
public class Solution {
    public boolean hasCycle(ListNode head) {
        HashSet<Integer> hashSet = new HashSet<>();

        boolean isCycle = false;
        while (head != null) {
            if (hashSet.contains(head.val)) {
                isCycle = true;
                break;
            }
            hashSet.add(head.val);
            head = head.next;
        }
        return isCycle;
    }
}
```

* 처음엔 그냥 같은 값을 갖은 ListNode가 없겠지? 라는 생각으로 접근했다.

  그래서 순회를 돌면서 같은 값이 나오면 이건 Cycle이다 생각했는데 틀렸다.

  그래서 값이 아니라 Object 체크를 해야 하고 

  체크 조건으로는 유일성을 보장하는 hashCode 값을 사용하였다.

> Accept Code

``` java
public class Solution {
    public boolean hasCycle(ListNode head) {
        HashSet<Integer> hashSet = new HashSet<>();

        boolean isCycle = false;
        while (head != null) {
            if (hashSet.contains(head.hashCode())) {
                isCycle = true;
                break;
            }
            hashSet.add(head.hashCode());
            head = head.next;
        }
        return isCycle;
    }
}
```


---

### [2] Code (20. 12. 12)

``` java
class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) {
            return false;
        }

        ListNode l1 = head;
        ListNode l2 = head.next;

        while (l1 != l2) {
            if (l2 == null || l2.next == null) {
                return false;
            }

            l1 = l1.next;
            l2 = l2.next.next;
        }
        return true;
    }
}
```

* 더 신박한 아이디어가 있다.

  l1은 1칸씩 l2는 2칸씩 이동을 시킨다.

  그러면 Cycle이 있다면 어느 순간 무조건 만나게 된다.

```
Step 1 
l1 과 l2의 차이 1

Step 2
l1 과 l2의 차이 2

Step 3
l1 과 l2의 차이 3

Step n
l1 과 l2의 차이 n
```

* 직접 손으로 해보면 l1이 n 바퀴 돌 때 

  l2는 2n 바퀴 돌 게 된다.

  그리고 그 n번째가 되는 순간 해당 포지션이 겹치면 Cycle이 존재한다고 보면 된다.

---

## Reference

* [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)