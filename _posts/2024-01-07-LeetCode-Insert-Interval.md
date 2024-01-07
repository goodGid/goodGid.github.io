---
layout: post
title: " LeetCode : 57. Insert Interval "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [57. Insert Interval](https://leetcode.com/problems/insert-interval)

### Problem

```
You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
Return intervals after the insertion.
```


---

### Example

```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

---

### [1] Code (24. 01. 07)

*Retry -> 못풀어서 정답보고 다음날 다시 풀어서 맞춤*

``` java
// Runtime: 68 ms
// Memory Usage: 44.7 MB
// Ref : https://leetcode.com/submissions/detail/1139221566
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<Node> rawList = new LinkedList<>();
        int size = intervals.length;

        // [1]
        for (int i = 0; i < size; i++) {
            rawList.add(new Node(intervals[i][0], intervals[i][1]));
        }
        rawList.add(new Node(newInterval[0], newInterval[1]));

        rawList.sort(Comparator.comparingInt(prev -> prev.st));

        List<Node> list = new LinkedList<>();
        list.add(rawList.get(0));

        for (int i = 1; i < size + 1; i++) {
            Node prev = list.get(list.size() - 1);

            if (prev.end >= rawList.get(i).st) { // [2]
                prev.end = Math.max(prev.end, rawList.get(i).end);
            } else {
                list.add(rawList.get(i));
            }
        }

        int[][] ans = new int[list.size()][2];
        for (int i = 0; i < list.size(); i++) {
            ans[i][0] = list.get(i).st;
            ans[i][1] = list.get(i).end;
        }
        return ans;
    }

    private class Node {
        int st;
        int end;

        public Node(int _st, int _end) {
            st = _st;
            end = _end;
        }
    }

}
```

* [1] : 일단 intervals과 newInterval 값을 다 넣고 st 값 기준으로 정렬한다.

* [2] : 정답 후보가 될 목록을 갖고 있는 list에서 가장 마지막 값의 end 값과

  지금 체크할 값의 st 값을 비교한다.

* 풀고 나면 참 간단한 아이디어였는데

  정렬한다는 아이디어를 못 떠올리고 접근하다 보니

  문제를 어렵게 만들어버리고 결국 포기했었지만

  다음날 다시 풀었을 땐 수월하게 풀었다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 1 ms
// Memory Usage: 45.3 MB
// Ref : https://leetcode.com/submissions/detail/1139223608
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        int n = intervals.length;

        // 새로운 interval보다 작은 end를 갖는 모든 interval을 결과에 추가
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }

        // 겹치는 interval을 병합
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }

        // 병합된 interval 결과에 추가
        result.add(newInterval);

        // 새로운 interval보다 큰 start를 갖는 모든 interval을 결과에 추가
        while (i < n) {
            result.add(intervals[i]);
            i++;
        }

        return result.toArray(new int[result.size()][]);
    }
} 
```

* 정답 코드를 GPT에게 리팩토링 요청 한 코드

* Runtime이나 Memory 측면에서 훨씬 효율적이다.

---

> Review

* 어찌 보면 간단한 아이디어인데 

  떠올리지 못하면 한 없이 어려워지는 문제


---

## Reference

* [57. Insert Interval](https://leetcode.com/problems/insert-interval)