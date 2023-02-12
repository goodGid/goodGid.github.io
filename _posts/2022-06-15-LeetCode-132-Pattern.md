---
layout: post
title:  " LeetCode : 456. 132 Pattern "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [456. 132 Pattern](https://leetcode.com/problems/132-pattern)

### Problem

```
Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j].

Return true if there is a 132 pattern in nums, otherwise, return false.
```


---

### Example

```
Input: nums = [3,1,4,2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].
```

---

### [1] Code (22. 06. 15)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 16 ms
// Memory Usage: 68.3 MB
// Ref : https://leetcode.com/submissions/detail/722833594
public boolean find132pattern_stack(int[] nums) {
    int len = nums.length;
    if (len < 3) {
        return false;
    }

    Deque<Integer> stk = new ArrayDeque<>();
    int k = -1;
    for (int i = len - 1; i >= 0; i--) {
        if (k > -1 && nums[k] > nums[i]) {
            return true;
        }

        while (!stk.isEmpty() && nums[i] > nums[stk.peek()]) {
            k = stk.pop();
        }

        stk.push(i);
    }

    return false;
}
```

* 위 아이디어를 제외하고 3가지 접근 방법이 더 있다.

  ref : https://leetcode.com/problems/132-pattern/discuss/2015224/Java-4-Approaches%3A-BF-O(n3)-BF-O(n2)-TreeMap-Monotonic-Stack

---

> Review

* 문제가 어렵다.

  정답 코드를 봐도 직관적으로 이해가 되지 않아 

  몇 번을 천천히 보니 그제야 이해가 되었다.

* 다음에 다시 풀더라도 과연 풀 수 있을까?라는 의아함이 남는다. ㅠㅠ

---

---

### [2] Code (23. 02. 13)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

* [1] Code (22. 06. 15) 때처럼 아이디어를 떠올리지 못했다. ㅠㅠ

* 아직도 알고리즘 사고능력이 많이 부족한 듯 싶다.

---

## Reference

* [456. 132 Pattern](https://leetcode.com/problems/132-pattern)