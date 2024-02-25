---
layout: post
title: " LeetCode : 155. Min Stack "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## Min Stack

### Problem

```
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:

MinStack() initializes the stack object.
void push(int val) pushes the element val onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function.
```


---

### Example

```
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
```

---

### [1] Code (24. 02. 25)

*Retry*

``` java
// Runtime: 4 ms
// Memory Usage: 44.8 MB
// Ref : https://leetcode.com/submissions/detail/1184496240
class MinStack {
    private int size;
    private List<Node> list;

    public MinStack() {
        size = 0;
        list = new ArrayList<>();
    }

    public void push(int val) {
        int prevMin = val;
        if (size > 0) {
            prevMin = list.get(size - 1).min;
        }
        list.add(new Node(val, Math.min(prevMin, val)));
        size++;
    }

    public void pop() {
        list.remove(size - 1);
        size--;
    }

    public int top() {
        return list.get(size - 1).val;
    }

    public int getMin() {
        return list.get(size - 1).min;
    }
}

class Node {
    int val;
    int min;

    public Node(int _val, int _min) {
        this.val = _val;
        this.min = _min;
    }
}
```

* 처음에 [코드](https://leetcode.com/submissions/detail/1184495209)를 제출했는데 실수가 발생했다.

``` java
public void push(int val) {
    int prevMin = val + 1; // [1]
    if (size > 0) {
        prevMin = list.get(size - 1).min;
    }
    list.add(new Node(val, Math.min(prevMin, val)));
    size++;
}
```

* [1] : prevMin+1을 하면서 Max.Integer 값이 들어오면 Overflow가 발생했다.

  그래서 해당 부분을 "int prevMin = val;" 이렇게 수정해줘서 제출해서 패스했다.

---

> Review

* 굉장히 재밌었던 문제였다.

---

## Reference

* [155. Min Stack](https://leetcode.com/problems/min-stack)