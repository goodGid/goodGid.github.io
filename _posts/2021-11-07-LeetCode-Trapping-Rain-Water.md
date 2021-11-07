---
layout: post
title:  " LeetCode : 42. Trapping Rain Water "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

### Problem

```
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
```


---

### Example

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
```

---

### [1] Code (21. 11. 17)

*Need to Retry -> 너무 오랜 시간 걸려서 풀었다.*

``` java
class Solution {
    public int trap(int[] h) {
        int ans = 0;
        Stack<Node> st = new Stack<>();

        Node maxNode = new Node(-1, -1);

        for (int i = 0; i < h.length; i++) {
            if (h[i] != 0) {
                maxNode = new Node(i, h[i]);
                st.add(new Node(i, h[i]));
                break;
            }
        }

        for (int i = maxNode.idx + 1; i < h.length; i++) {
            if (h[i] == 0) {
                continue;
            }

            if (h[i] >= maxNode.val) {
                int cnt = 0;
                while (st.peek().idx != maxNode.idx && !st.isEmpty()) {
                    cnt += st.pop().val;
                }
                st.pop();
                ans = ans + (i - maxNode.idx - 1) * maxNode.val - cnt;
                maxNode = new Node(i, h[i]);
            }
            st.add(new Node(i, h[i]));
        }

        while (st.size() > 1) {
            Node curNode = st.pop();

            int cnt = 0;
            if (curNode.idx - st.peek().idx == 1 && curNode.val <= st.peek().val) {
                continue;
            }

            while (curNode.val > st.peek().val) {
                cnt += st.pop().val;
            }
            ans = ans + (curNode.idx - st.peek().idx - 1) * curNode.val - cnt;
        }
        return ans;
    }

    class Node {
        public int idx;
        public int val;

        public Node(int idx, int val) {
            this.idx = idx;
            this.val = val;
        }
    }
}
```

> Review

* 스스로 풀긴했으나 

  시간이 너무 오래걸렸다.




---

## Reference

* [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)