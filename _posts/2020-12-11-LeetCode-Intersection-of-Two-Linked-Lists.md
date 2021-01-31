---
layout: post
title:  " LeetCode : 160. Intersection of Two Linked Lists "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)

### Problem

```
Write a program to find the node at which the intersection of two singly linked lists begins.
You may assume there are no cycles anywhere in the entire linked structure.
```

---

### Example

```
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Reference of the node with value = 8
Input Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect). From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.
```



---

### Code (20. 12. 11)

``` java
class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode aTempNode = headA;
        ListNode bTempNode = headB;

        while (headA != headB) {
            if (headA == null) {
                headA = bTempNode; // [1]
            } else {
                headA = headA.next;
            }

            if (headB == null) {
                headB = aTempNode; // [2]
            } else {
                headB = headB.next;
            }
        }
        return headA;
    }
}
```

* 아이디어가 너무 **참신**하고 **신선**했다.

  풀지 못해서 답을 찾아보고 풀었다.

  '어떻게 저런 아이디어를 생각해냈지?' 라는 생각이 들었다.

* 이 아이디어의 핵심은

  [1], [2] 코드를 이해하는 것이다.

```
A List.size = 3
B List.size = 5

headA는 A List를 다 탐색하고 B List를 탐색한다.
    --> 3 + 5 = 8번
headB는 B List를 다 탐색하고 A List를 탐색한다.
    --> 5 + 3 = 8번

즉 A+B List를 돌면서 교집합을 찾는다.
= 동일한 List에 대해 순회를 한다.
= 교집합이 있다면 가리키는 Node가 동일해지는 시점이 온다.
= 교집합이 없다면 headA와 headB는 두개다 종단엔 null이 된다.

ex) listA = [4,1,8,4,5] / listB = [5,6,1,8,4,5]
[1], [2] 라인까지 가면
headA와 headB의 시작되는 위치에서
교집합이 되는 Node까지의 거리는 동일하다.

headA는 4를 가리키고 headB는 6을 가리킨다.
그리고 각각 교집합이 되는 8 Node까지의 거리는 2개이다.
```

* 위 아이디어가 가능한 이유는

  **You may assume there are no cycles anywhere in the entire linked structure.** 라는 조건이 있기 때문이다.

* 조금 더 설명을 더하자면 

```
A 집합 = [1,2]
B 집합 = [3,4]
C 집합 = [5,6] (= 교집합)

A List : [1,2,5,6] = A 집합 + C 집합
    --> A 탐색 -> C 탐색 -> B 탐색
B List : [3,4,5,6] = B 집합 + C 집합
    --> B 탐색 -> C 탐색 -> A 탐색

결과적으로 같은 Node에 대해 탐색한다고 볼 수 있다.
```

* 최대한 이해할 수 있도록 설명을 작성해봤는데 

  잘 이해가 되었으면 좋겠다 !


---

## Reference

* [160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)