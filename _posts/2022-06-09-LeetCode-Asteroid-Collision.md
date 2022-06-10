---
layout: post
title:  " LeetCode : 735. Asteroid Collision "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [735. Asteroid Collision](https://leetcode.com/problems/asteroid-collision)

### Problem

```
We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.
```


---

### Example

```
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
```

---

### [1] Code (22. 06. 10) (x)

``` java
// Runtime: 12 ms
// Memory Usage: 48.7 MB
// Ref : https://leetcode.com/submissions/detail/718631899
class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Stack<Integer> st = new Stack<>();

        for (int i : asteroids) {
            if (st.isEmpty()) {
                st.push(i);
                continue;
            }

            int top = st.peek();
            if (top > 0) {
                if (i > 0) {
                    st.push(i);
                } else {
                    cal(st, i);
                }
            } else {
                st.push(i);
            }
        }

        int size = st.size();
        int[] ans = new int[size];
        for (int i = size - 1; i >= 0; i--) {
            ans[i] = st.pop();
        }
        return ans;
    }

    private void cal(Stack<Integer> st, int i) {
        while (!st.isEmpty() && st.peek() > 0) {
            int top = st.peek();
            if (top > i * -1) {
                return;
            } else if (top == i * -1) {
                st.pop();
                return;
            } else {
                st.pop();
            }
        }
        st.push(i);
    }
}
```

---

> Review

* 15분 소요

* Stack의 top과 배열의 인자값 간의 경우의 수를 구했더니 쉽게 풀렸다.

---

## Reference

* [735. Asteroid Collision](https://leetcode.com/problems/asteroid-collision)