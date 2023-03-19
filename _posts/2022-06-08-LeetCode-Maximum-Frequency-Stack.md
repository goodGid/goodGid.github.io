---
layout: post
title:  " LeetCode : 895. Maximum Frequency Stack "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [895. Maximum Frequency Stack](https://leetcode.com/problems/maximum-frequency-stack)

### Problem

```
Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.
```


---

### Example

```
Input
["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]
Output
[null, null, null, null, null, null, null, 5, 7, 5, 4]
```

---

### [1] Code (22. 06. 08) (x)

``` java
// Runtime: 48 ms
// Memory Usage: 75 MB
// Ref : https://leetcode.com/submissions/detail/716931012
class FreqStack {
    HashMap<Integer, Integer> map;
    List<List<Integer>> list;
    int maxCnt;

    public FreqStack() {
        map = new HashMap<>();
        list = new ArrayList<>();
    }

    public void push(int val) {
        if (!map.containsKey(val)) {
            map.put(val, 0);
        }
        int cnt = map.get(val);
        if (list.size() < cnt + 1) {
            list.add(new ArrayList<>());
        }
        list.get(cnt).add(val);
        map.put(val, cnt + 1);
        maxCnt = Math.max(maxCnt, cnt);
    }

    public int pop() {
        List<Integer> targetList = list.get(maxCnt);
        int size = targetList.size();
        int item = targetList.get(size - 1);
        targetList.remove(size - 1);

        if (targetList.isEmpty()) {
            maxCnt--;
        }

        map.put(item, map.get(item) - 1);

        return item;
    }
}
```

---

> Review

* 10 ~ 15분 소요

* Hard 문제인데 한 방에 맞춰서 기분이 좋다.

---

### [2] Code (23. 03. 19)

*Need to Retry -> 실력이 퇴화했나보다 못풀었다.*

``` java
// Ref : https://leetcode.com/submissions/detail/918181349
```

* 시도헸으나 못 풀었다.

---

> Review

* 이전에 풀었을 땐 아주 쉽게 풀었던 거 같은데

  지금은 왜 어려울까... ㅠ

  다시 복기를 해봐야겠다.



---

## Reference

* [895. Maximum Frequency Stack](https://leetcode.com/problems/maximum-frequency-stack)