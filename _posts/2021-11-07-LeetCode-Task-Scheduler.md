---
layout: post
title:  " LeetCode : 621. Task Scheduler "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [621. Task Scheduler](https://leetcode.com/problems/task-scheduler/)

### Problem

```
Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.
```


---

### Example

```
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.
```

---

### [1] Code (21. 11. 07)

*Need to Retry*

``` java
n/a
```

> Concern Point

**자료구조 선택**

```
LinkedList로 접근을 하려 했으나 적절하지 않았다.
정답 코드들을 보니 
그냥 배열 값으로만 처리하거나
우선순위 큐를 사용하는 코드가 많이 보였다.
```

---

> Reference Code

``` java
class Solution {
    public int leastInterval(char[] tasks, int n) {
        int len = tasks.length;
        int[] arr = new int[26];

        for (int i = 0; i < len; i++) {
            arr[tasks[i] - 'A']++;
        }

        int max = arr[0];
        int count = 0;

        for (int i = 0; i < 26; i++) {
            if (max < arr[i]) {
                max = arr[i];
            }
        }

        for (int i = 0; i < 26; i++) {
            if (max == arr[i]) {
                count++;
            }
        }
        return Math.max(len, (max - 1) * (n + 1) + count); // [1]
    }
}
```

* [1] : len 값을 비교해주는 이유는 다음 예시를 보면 된다.

``` java
["A","A","A","B","B","B"]
0

return (max - 1) * (n + 1) + count);

위 코드로 실행하면 "4"가 나온다.
하지만 실제로는 "6"이 정답이다.

idx : 1 2 3 4 5 6
val : A B A B A B
```

---

> Review

* 아이디어를 떠올리는 데 실패했다.

---

## Reference

* [621. Task Scheduler](https://leetcode.com/problems/task-scheduler/)