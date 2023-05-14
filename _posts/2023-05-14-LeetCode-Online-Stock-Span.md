---
layout: post
title: " LeetCode : Online Stock Span "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [901. Online Stock Span](https://leetcode.com/problems/online-stock-span)

### Problem

```
Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.
```


---

### Example

```
Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]
```

---

### [1] Code (23. 05. 14)

*Need to Retry -> 자료구조를 떠올렸으나 거기까지였다.*

``` java
// Wrong Code
class StockSpanner {
    Stack<Integer> dp;
    Stack<Integer> st;

    public StockSpanner() {
        dp = new Stack<>();
        st = new Stack<>();
        dp.push(0);
        st.push(0);
    }
    
    public int next(int price) {
        if (st.peek() <= price) {
            dp.push(dp.peek() + 1);
        } else {
            dp.push(1);
        }
        st.push(price);
        return dp.peek();
    }
}
```

* [기본 예제](https://leetcode.com/submissions/detail/950083160)를 넣어도 틀린다.

  // 기록을 위해 코드 제출함

---

> Reference Code

**Code 1**

``` java
// Runtime: 53 ms
// Memory Usage: 51 MB
// Ref : https://leetcode.com/submissions/detail/950083688
class StockSpanner {
    Stack<int[]> stack = new Stack<>();

    public StockSpanner() {
    }
    
        
    public int next(int price) {
        int ans = 1;
        while (!stack.isEmpty() && stack.peek()[0] <= price) {
            ans += stack.pop()[1];
        }
        
        stack.push(new int[] {price, ans});
        return ans;
    }
}
```

* **Approach: Monotonic Stack**

```
A monotonic stack is a stack in which the elements are always sorted. 
A stack can be monotonically increasing (sorted ascending) or monotonically decreasing (sorted descending).
```

* Stack까지는 떠올렸으나 어떻게 활용해야 할지 생각하다 막혔다.

---

> Review

* Monotonic Stack을 활용한 유형에 대해 한발 더 친근해졌다는 느낌이 든다.

  = 다음엔 잘 풀 수 있겠지? 라는 생각

---

## Reference

* [901. Online Stock Span](https://leetcode.com/problems/online-stock-span)