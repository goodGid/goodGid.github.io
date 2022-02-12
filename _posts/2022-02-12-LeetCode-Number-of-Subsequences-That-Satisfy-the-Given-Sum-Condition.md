---
layout: post
title:  " LeetCode : 1498. Number of Subsequences That Satisfy the Given Sum Condition "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1498. Number of Subsequences That Satisfy the Given Sum Condition](https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/)

### Problem

```
You are given an array of integers nums and an integer target.

Return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less or equal to target. Since the answer may be too large, return it modulo 109 + 7.
```


---

### Example

```
Input: nums = [3,5,6,7], target = 9
Output: 4
Explanation: There are 4 subsequences that satisfy the condition.
[3] -> Min value + max value <= target (3 + 3 <= 9)
[3,5] -> (3 + 5 <= 9)
[3,5,6] -> (3 + 6 <= 9)
[3,6] -> (3 + 6 <= 9)
```

---

### [1] Code (22. 02. 12)

*Need to Retry -> 시간 초과 발생 !*

``` java
// Status: Time Limit Exceeded
// Ref : https://leetcode.com/submissions/detail/639593017
class Solution {
    int MOD = 1000000007;
    int ans = 0;

    public int numSubseq(int[] nums, int target) {
        Arrays.sort(nums);
        dfs(nums, target, new LinkedList<>(), 0);
        return ans;
    }

    private void dfs(int[] nums, int target, List<Integer> list, int idx) {
        if (idx >= nums.length) {
            return;
        }

        list.add(nums[idx]);
        if (list.get(0) + list.get(list.size() - 1) > target) {
            list.remove(list.size() - 1);
            return;
        } else if (list.get(0) + list.get(list.size() - 1) <= target) {
            ans = (ans + 1) % MOD;
        }

        dfs(nums, target, list, idx + 1);
        list.remove(list.size() - 1);
        dfs(nums, target, list, idx + 1);
    }
}
```

* TLE 발생 ㅠㅠ

* 문제를 보자마자 DFS 아이디어를 떠올렸는데 적절한 방법이 아니었다.

---

> Reference Code

**Code 1**

``` java
class Solution {
    public int numSubseq(int[] nums, int target) {
        final int MODULO = 1000000007;
        int length = nums.length;
        Arrays.sort(nums);

        int[] power2 = new int[length + 1];
        power2[0] = 1;
        for (int i = 1; i <= length; i++) {
            power2[i] = (power2[i - 1] * 2) % MODULO;
        }

        int l = 0;
        int r = length - 1;
        int ans = 0;
        while (l <= r) {
            if (nums[l] + nums[r] <= target) {
                ans = (ans + power2[r - l]) % MODULO;
                l += 1;
            } else {
                r -= 1;
            }
        }
        return ans;
    }
}
```

* 위 코드가 이해 안 된다면 [해설 강의](https://www.youtube.com/watch?v=xCsIkPLS4Ls)를 들어보자.

  영어 동영상이지만 자막을 키고 들으면 충분히 이해가 된다.

---

> Review

* 문제를 맞히진 못했지만 굉장히 재밌는 문제라는 생각이 들었다.

  다음엔 맞추자 !

---

## Reference

* [1498. Number of Subsequences That Satisfy the Given Sum Condition](https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/)