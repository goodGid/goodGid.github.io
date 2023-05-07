---
layout: post
title: " LeetCode : 622. Design Circular Queue "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [622. Design Circular Queue](https://leetcode.com/problems/design-circular-queue)

### Problem

```
Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".
```


---

### Example

```
Input
["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output
[null, true, true, true, false, 3, true, true, true, 4]
```

---

### [1] Code (23. 05. 07)

*Need to Retry -> 구현 실패...*

``` java
// 53 / 58 test cases passed.
// Ref : https://leetcode.com/submissions/detail/946042071
class MyCircularQueue {
    ArrayList<Integer> list;
    int front;
    int rear = -1;
    int size;

    public MyCircularQueue(int k) {
        list = new ArrayList<>(k);
        for (int i = 0; i < k; i++) {
            list.add(-1);
        }
        size = k;
    }

    public boolean enQueue(int value) {
        int nextPos = (rear + 1) % size;
        if (list.get(nextPos) == -1) {
            list.set(nextPos, value);
            rear = nextPos;
            return true;
        }
        return false;
    }

    public boolean deQueue() {
        if (list.get(front) != -1) {
            list.set(front, -1);
            front = (front + 1) % size;
            return true;
        }
        return false;
    }

    public int Front() {
        return list.get(front);
    }

    public int Rear() {
        return list.get(rear);
    }

     public boolean isEmpty() {
        for (int i : list) {
            if (i != -1) {
                return false;
            }
        }
        return true;
    }

    public boolean isFull() {
        return (rear + 1) % size == front;
    }
}
```

* 위 코드를 하나하나 분석해 볼 필욘 X

  느낌만 이해하고 넘어가도록 하자.

---

> Reference Code

**Code 1**

``` java
// Runtime: 5 ms
// Memory Usage: 42.8 MB
// Ref : https://leetcode.com/submissions/detail/946051399
// Ref : https://leetcode.com/problems/design-circular-queue/discuss/2620288/LeetCode-The-Hard-Way-Explained-Line-By-Line
// Time Complexity: O(1)
// Space Complexity: O(N)
class MyCircularQueue {

    public MyCircularQueue(int k) {
        // the queue holding the elements for the circular queue
        q = new int[k];
        // the number of elements in the circular queue
        cnt = 0;
        // queue size
        sz = k;
        // the idx of the head element
        headIdx = 0;
    }
    
    public boolean enQueue(int value) {
         // handle full case
        if (isFull()) return false;
        // set the value 
        // Given an array of size of 4, we can find the position to be inserted using the formula
        // targetIdx = (headIdx + cnt) % sz
        // e.g. [1, 2, 3, _]
        // headIdx = 0, cnt = 3, sz = 4, targetIdx = (0 + 3) % 4 = 3
        // e.g. [_, 2, 3, 4]
        // headIdx = 1, cnt = 3, sz = 4, targetIdx = (1 + 3) % 4 = 0
        q[(headIdx + cnt) % sz] = value;
        // increase the number of elements by 1
        cnt += 1;
        return true;
    }
    
    public boolean deQueue() {
        // handle empty case
        if (isEmpty()) return false;
        // update the head index
        headIdx = (headIdx + 1) % sz;
        // decrease the number of elements by 1
        cnt -= 1;
        return true;
    }
    
    public int Front() {
        // handle empty queue case
        if (isEmpty()) return -1;
        // return the head element
        return q[headIdx];
    }
    
    public int Rear() {
        // handle empty queue case
        if (isEmpty()) return -1;
        // Given an array of size of 4, we can find the tailIdx using the formula
        // tailIdx = (headIdx + cnt - 1) % sz
        // e.g. [0 1 2] 3
        // headIdx = 0, cnt = 3, sz = 4, tailIdx = (0 + 3 - 1) % 4 = 2
        // e.g. 0 [1 2 3]
        // headIdx = 1, cnt = 3, sz = 4, tailIdx = (1 + 3 - 1) % 4 = 3
        // e.g. 0] 1 [2 3
        // headIdx = 2, cnt = 3, sz = 4, tailIdx = (2 + 3 - 1) % 4 = 0
        return q[(headIdx + cnt - 1) % sz];
    }
    
    public boolean isEmpty() {
        // no element in the queue
        return cnt == 0;
    }
    
    public boolean isFull() {
        // return true if the count is equal to the queue size
        // else return false
        return cnt == sz;
    }
    
    private int[] q;
    private int headIdx, cnt, sz;
}
```

* 위 코드 말고 다른 코드를 봐도 

  isEmpty( )와 isFull( )을 판단하는데

  현재 cnt 값을 활용한다.

  그러므로 **cnt 값을 활용한다.**를 꼭 기억하도록 하자.

---

> Review

* 이런 구현 스타일의 문제가 쉬우면서 어렵다.

  많이 풀어보도록 하자 !


---

## Reference

* [622. Design Circular Queue](https://leetcode.com/problems/design-circular-queue)