---
layout: post
title:  " LeetCode : 47. Permutations II "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [47. Permutations II](https://leetcode.com/problems/permutations-ii)

### Problem

```
Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
```


---

### Example

```
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

---

### [1] Code (22. 05. 22)

*Need to Retry -> 풀긴했는데 로직이 효율적이지 못했다.*

``` java
// Runtime: 57 ms
// Memory Usage: 58.1 MB
// Ref : https://leetcode.com/submissions/detail/704757139
class Solution {
    List<List<Integer>> answer = new ArrayList<>();
    int[] visit;

    public List<List<Integer>> permuteUnique(int[] nums) {
        visit = new int[nums.length];
        recur(nums, new ArrayList<>());

        return new ArrayList<>(new LinkedHashSet<>(answer));
    }

    private void recur(int[] nums, List<Integer> ans) {
        if (ans.size() == nums.length) {
            answer.add(new ArrayList<>(ans));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            int val = nums[i];
            if (visit[i] == 1) {
                continue;
            }
            visit[i] = 1;
            ans.add(val);
            recur(nums, ans);
            ans.remove(ans.size() - 1);
            visit[i] = 0;
        }
    }
}
```

* 중복된 값도 일단 answer 리스트에 다 넣고

  마지막에 중복된 값을 제거하는 로직의 효율성은 그리 좋지 않다.

---

> Review

* 15분 소요

* 시간이 촉박하여 다른 코드들을 유심히 살펴보지 못했다.

  다음에 풀 때 다른 코드를 보고 학습하도록 하자.


---

## Reference

* [47. Permutations II](https://leetcode.com/problems/permutations-ii)