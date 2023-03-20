---
layout: post
title:  " LeetCode : 496. Next Greater Element I "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i)

### Problem

```
The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
```


---

### Example

```
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
```

---

### [1] Code (22. 05. 04)

*Need to Retry -> 너무 오래걸렸다.*

``` java
// Runtime: 2 ms
// Memory Usage: 43.6 MB
// Ref : https://leetcode.com/submissions/detail/693009892
class Solution {
    public int[] nextGreaterElement(int[] n1, int[] n2) {
        int n1l = n1.length;
        int n2l = n2.length;
        int[] ans = new int[n1l];
        int[] dp = new int[10001];

        Arrays.fill(dp, -1);

        for (int i = 0; i < n2l - 1; i++) {
            for (int j = i + 1; j < n2l; j++) {
                if (n2[i] < n2[j]) {
                    dp[n2[i]] = n2[j];
                    break;
                }
            }
        }

        for (int i = 0; i < n1l; i++) {
            ans[i] = dp[n1[i]];
        }

        return ans;
    }
}
```

---

> Review

* 쉽게 느껴졌는데 실수가 잦아 너무 오래 걸렸다.


---

### [2] Code (23. 03. 19)

*Need to Retry -> $O(nums1.length + nums2.length)$을 충족시키는 아이디어를 떠올리지 못했다.*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 4 ms
// Memory Usage: 42.4 MB
// Ref : https://leetcode.com/submissions/detail/917580900
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        int[] ans = new int[nums1.length];

        Stack<Integer> stack = new Stack<>();
        HashMap<Integer, Integer> map = new HashMap<>();

        // find out all the next greater elements in nums2 array
        for (int num : nums2) {
            // if num is greater than top elements in stack then it is the next greater element in nums2
            while (!stack.isEmpty() && num > stack.peek()) {
                map.put(stack.pop(), num);
            }
            // then add num to stack
            stack.add(num);
        }

        int i = 0;
        for (int num : nums1) {
            ans[i++] = map.getOrDefault(num, -1);
        }
        return ans;
    }
}
```

* Stack을 사용한 깔끔한 풀이

* 만약 위 코드가 이해 안 된다면 [코드를 발췌한 글](https://bit.ly/3TsrAq3)을 읽어보고

  그래도 이해가 안 된다면 

  [Next Greater Element I - Leetcode 496 - Python](https://www.youtube.com/watch?v=68a1Dc_qVq4) 영상을 보도록 하자.

---

> Review

* Stack 자료구조를 아예 떠올리지 못했다. ㅠ_ㅠ



---

## Reference

* [496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i)