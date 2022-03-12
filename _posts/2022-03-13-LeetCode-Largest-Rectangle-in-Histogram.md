---
layout: post
title:  " LeetCode : 84. Largest Rectangle in Histogram "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [84. Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

### Problem

```
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
```


---

### Example

```
Input: heights = [2,1,5,6,2,3]
Output: 10
```

---

### [1] Code (22. 03. 13)

*Need to Retry -> Hard 문제는 다시 풀어보자 !*

``` java
// Runtime: 148 ms
// Memory Usage: 93.1 MB
// Ref : https://leetcode.com/submissions/detail/657229072
class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Node> st = new Stack<>();

        int ans = -1;

        if (heights.length < 1) {
            return heights[0];
        }

        st.push(new Node(0, heights[0]));

        for (int i = 1; i < heights.length; i++) {
            int pos = i;
            while (!st.isEmpty() && st.peek().val > heights[i]) {
                Node node = st.pop();
                pos = node.pos;
                ans = Math.max(ans, (i - node.pos) * node.val);
            }
            st.push(new Node(pos, heights[i]));
        }

        Node rightNode = new Node(heights.length, st.peek().val);

        while (!st.isEmpty()) {
            Node node = st.pop();
            ans = Math.max(ans, (rightNode.pos - node.pos) * node.val);
        }
        return ans;
    }

    private class Node {
        public int pos;
        public int val;

        public Node(int pos, int val) {
            this.pos = pos;
            this.val = val;
        }
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 75 ms
// Memory Usage: 88.8 MB
// Ref : https://leetcode.com/submissions/detail/621037929
class Solution {
    public int largestRectangleArea(int[] heights) {
        int len = heights.length;
        Stack<Integer> s = new Stack<>();
        int maxArea = 0;
        for (int i = 0; i <= len; i++) {
            int h = (i == len ? 0 : heights[i]);
            if (s.isEmpty() || h >= heights[s.peek()]) {
                s.push(i);
            } else {
                int tp = s.pop();
                maxArea = Math.max(maxArea, heights[tp] * (s.isEmpty() ? i : i - 1 - s.peek()));
                i--;
            }
        }
        return maxArea;
    }
}
```

* 내가 푼 풀이보다 시간/공간 복잡도가 효율적이다.

---

> Review

* 60분 소요

  기본적인 아이디어를 떠올리는 데는 크게 어렵지 않았다.

  그런데 거기서 디테일 로직을 구현하는데 애를 좀 먹었다. -ㅂ-



---

## Reference

* [84. Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)