---
layout: post
title:  " LeetCode : 128. Longest Consecutive Sequence "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

### Problem

```
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.
```


---

### Example

```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
```

---

### [1] Code (22. 01. 15)

*Need to Retry -> 시간 최적화가 핵심이다.*

``` java
// Runtime: 30 ms
// Memory Usage: 59.3 MB
class Solution {
    public int longestConsecutive(int[] n) {
        HashMap<Integer, Boolean> map = new HashMap<>();

        for (int i : n) {
            map.put(i, true);
        }

        int ans = 0;

        for (Map.Entry<Integer, Boolean> item : map.entrySet()) {
            int curNumber = item.getKey();
            
            if (map.get(curNumber - 1) == null) { // [1]
                int conCnt = 1;
                
                while (map.get(curNumber + 1) != null) {
                    conCnt++;
                    curNumber++;
                }
                ans = Math.max(ans, conCnt);
            }
        }
        return ans;
    }
}
```

* 처음에 TLE가 발생하고 힌트를 보고 다시 풀었다.

  그런데 [1]과 같은 최적화가 없으면 또 TLE가 발생했다.

  ex) [1,2,3,4] 일 경우

  1에서 2~4를 봤다면 

  2,3,4에서는 굳이 while 문을 돌 필요가 없다. 

  그래서 [1] 코드를 추가함으로써 중복 계산을 피할 수 있다.


---

> Check Point

* You must write an algorithm that runs in O(n) time.

---

> Reference Code

**처음에 풀었는데 TLE 발생한 코드**

``` java
// Time Limit Exceeded
class Solution {
    public int longestConsecutive(int[] n) {
        HashMap<Integer, Boolean> map = new HashMap<>();
        int min = 1000000000;
        int max = -1000000000;

        for (int i : n) {
            min = Math.min(min, i);
            max = Math.max(max, i);
            map.put(i, true);
        }

        int ans = 0;
        boolean isCon = true;
        int conCnt = 0;

        for (int i = min; i <= max; i++) {
            if (map.get(i) == null) {
                continue;
            }

            if (isCon && map.get(i) == true) {
                conCnt++;
                ans = Math.max(ans, conCnt);
            } else if (map.get(i) == true) {
                isCon = true;
                conCnt = 1;
                ans = Math.max(ans, conCnt);
            } else {
                isCon = false;
            }
        }
        return ans;
    }
}
```

* input 값이 많다 보니 TLE가 발생했다.

---

> Review

* 시간복잡도를 O(n)안으로 해결했어야 하는데 아이디어가 떠오르지 않았다.


---

### [2] Code (22. 03. 10)

*Need to Retry -> [Approach 3 : HashSet and Intelligent Sequence Building](https://leetcode.com/problems/longest-consecutive-sequence/solution/) 아이디어를 상기시키기 위해 다시 한 번 풀어보자.*

``` java
// Runtime: 27 ms
// Memory Usage: 61.6 MB
// Ref : https://leetcode.com/submissions/detail/657237517
class Solution {
    public int longestConsecutive(int[] nums) {
        int ans = 0;
        Set<Integer> set = new HashSet<>();

        for (int num : nums) {
            set.add(num);
        }

        while (!set.isEmpty()) {
            Iterator<Integer> it = set.iterator();
            int cnt = 1;
            Integer originValue = it.next();
            set.remove(originValue);

            Integer plusValue = originValue + 1;
            Integer minusValue = originValue - 1;

            while (set.contains(plusValue)) {
                cnt++;
                set.remove(plusValue);
                plusValue++;
            }

            while (set.contains(minusValue)) {
                cnt++;
                set.remove(minusValue);
                minusValue--;
            }

            ans = Math.max(ans, cnt);
        }
        return ans;
    }
}
```

---

> Check Point

* You must write an algorithm that runs in O(n) time.

---

> Algorithm Description

* i 값을 보고 i보다 작은 쪽으로 loop + i보다 큰 쪽으로 loop를 돌린다. 

  그리고 중복된 계산을 하지 않도록 한 번 체크한 값은 Set에서 값을 삭제한다.

---


> Reference Code

* [1] 풀이를 참고하자.

---

> Review

* 15분 소요


---

## Reference

* [128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)