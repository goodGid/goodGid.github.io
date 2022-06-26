---
layout: post
title:  " LeetCode : 18. 4Sum "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [18. 4Sum](https://leetcode.com/problems/4sum)

### Problem

```
Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.
```


---

### Example

```
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

---

### [1] Code (22. 06. 26)

*Need to Retry -> [3Sum 문제 코드]({{site.url}}/LeetCode-3Sum/#1-code-22-02-13-x)를 가져다 활용하였다.*

``` java
// Runtime: 57 ms
// Memory Usage: 44.7 MB
// Ref : https://leetcode.com/submissions/detail/731596253
class Solution {
    List<List<Integer>> ans = new ArrayList<>();
    Set<List<Integer>> set = new HashSet<>();

    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            threeSum(nums, i, target - nums[i]);
        }

        Iterator<List<Integer>> it = set.iterator();
        while (it.hasNext()) {
            ans.add(it.next());
        }

        return ans;
    }

    public List<List<Integer>> threeSum(int[] nums, int st, long t) {

        for (int i = st + 1; i < nums.length - 2; i++) {
            long target = t + (nums[i] * -1);

            int l = i + 1;
            int r = nums.length - 1;
            while (l < r) {
                int sum = nums[l] + nums[r];

                if (sum < target) {
                    l = leftSkipDupValue(nums, l, r) + 1;
                } else if (sum == target) {
                    set.add(Arrays.asList(nums[st], nums[i], nums[l], nums[r]));
                    l = leftSkipDupValue(nums, l, r) + 1;
                    r = rightSkipDupValue(nums, l, r) - 1;
                } else {
                    r = rightSkipDupValue(nums, l, r) - 1;
                }
            }
            i = leftSkipDupValue(nums, i, nums.length - 1);
        }
        return ans;
    }

    private int leftSkipDupValue(int[] nums, int st, int end) {
        while (st < end) {
            if (nums[st] == nums[st + 1]) {
                st++;
            } else {
                break;
            }
        }
        return st;
    }

    private int rightSkipDupValue(int[] nums, int st, int end) {
        while (st < end) {
            if (nums[end] == nums[end - 1]) {
                end--;
            } else {
                break;
            }
        }
        return end;
    }
}
```

* 문제를 집중해서 풀지 않고 

  빨리 풀어야 하니까 후다닥 풀었다.

  그러다보니 코드가 깔끔하지 않고 다른 정답 코드를 보고 공부하지도 않았다.

---

> Check Point

* **-$10^9$ <= target <= $10^9$**, **-$10^9$ <= nums[i] <= $10^9$**  

  조건 때문에 int 범위를 벗어날 수 있다.

``` java
1. public List<List<Integer>> threeSum(int[] nums, int st, int t) {
2. 
3.    for (int i = st + 1; i < nums.length - 2; i++) {
4.        int target = t + (nums[i] * -1);
5.        ...
6.    }
7. }

nums = [1000000000, 1000000000, 1000000000, 1000000000]
t = -1294967296
target = 2000000000
ref : https://leetcode.com/submissions/detail/731513693
```

* st, target 변수가 int 형이다.

  t(=-1294967296)와 nums\[i\](=1000000000)를 더하면

  -2,294,967,296 값이 되어야 하지만

  int의 범위(-2,147,483,648 ~ 2,147,483,647)를 초과하였으므로 값이 이상해진다.

---

> Review

* 다음엔 다른 정답 코드들을 보면서 공부하자.

---

## Reference

* [18. 4Sum](https://leetcode.com/problems/4sum)