---
layout: post
title: " LeetCode : 896. Monotonic Array "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [896. Monotonic Array](https://leetcode.com/problems/monotonic-array/)

### Problem

```
An array is monotonic if it is either monotone increasing or monotone decreasing.
An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j]. An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].
Given an integer array nums, return true if the given array is monotonic, or false otherwise.
```


---

### Example

```
Input: nums = [6,5,4,4]
Output: true
```

---

### [1] Code (23. 11. 26)

*Retry -> Easy문제였지만 코드가 깔끔하지 못했다.*

``` java
// Runtime: 2 ms
// Memory Usage: 55.7 MB
// Ref : https://leetcode.com/submissions/detail/1106430195
class Solution {
    public boolean isMonotonic(int[] nums) {
        int n = nums.length;
        
        if (n < 2) {
            return true;
        }
        
        int st = 1;
        
        boolean preDir = true;
        for (int i = st; i<n; i++) {
            if (nums[i] == nums[i-1]) {
                continue;
            }
            preDir = nums[i] - nums[i-1] >= 0? true: false;
            st = i;
            break;
        }
               
        for (int i=st; i<n; i++) {
            if (nums[i] == nums[i-1]) {
                continue;
            }
            boolean curDir = nums[i] - nums[i-1] >= 0? true: false;
            if (preDir != curDir) {
                return false;
            }
        }
        return true;
    }
}
```

* 문제를 보고 떠올린 접근 방식은

  nums[0]과 nums[1]을 통해 증가 혹은 감소 배열인 지 판단하고

  i=2부터 순회해서 방향성이 일치한 지 판단하면 되겠다고 생각했다.
  
* 그렇게 코드를 짜고 나니

  nums[i] == nums[i+1] 경우에 난감해졌다.

* 예를 들어 nums[1]과 nums[0]의 관계가 감소였는데

  nums[2]와 nums[1]이 같은 값일 경우엔 

  nums[2]와 nums[1]의 방향성을 어떻게 판단해야 하지?

  그냥 증가로 봐야 하나? 아니면 감소로 봐야 하나?

  [1,2,2]일 경우엔 증가로 봐야 하고

  [3,2,2]일 경우엔 감소로 봐야 하고

  상황에 따라 다르게 봐야 하니 그냥 Skip 해야겠다고 생각하고 [제출](https://leetcode.com/submissions/detail/1106427651)을 했다.

  (= 코드가 더러워지기 시작)

    ``` java
    if (nums[i] == nums[i-1]) {
        continue;
    }
    ```

* 그런데 값이 같을 경우엔 판단 로직이 

  최초에 방향성을 체크하는

  nums[1]과 nums[0]에도 적용이 필요했다.

  (= 코드가 더 더러워진다.)

  ex) [1,1,0]에서 최초 방향을 증가로 보면 틀리게 된다.

* 결론적으로 문제를 스스로 더 까다롭게 만들었고

  정답 풀이를 보고 싶은 욕구가 샘솟았다.


---

> Reference Code

**Code 1**

``` java
// Runtime: 1 ms
// Memory Usage: 55.6 MB
// Ref : https://leetcode.com/submissions/detail/1106452982
class Solution {
    public boolean isMonotonic(int[] nums) {

        int lowValue = nums[0];
        int highValue = nums[nums.length - 1];
        boolean increase = true;

        if (lowValue <= highValue) {
            for (int i = 0; i < nums.length - 1; i++) {
                if (nums[i] > nums[i+1]) {
                    return false;
                }
            }
        }
        else {
           for (int i = 0; i < nums.length - 1; i++) {
                if (nums[i] < nums[i+1]) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

* 너무 깔끔했다.

  nums[0]과 nums[N-1]을 보고 방향성을 체크한다.

  굳이 nums[0]과 nums[1]로 증가 배열인 지 감소 배열인 지 판단할 필요가 없었다.

---

**Code 2**

``` java
// Runtime: 2 ms
// Memory Usage: 56.2 MB
// Ref : https://leetcode.com/submissions/detail/1106453060/
class Solution {
    public boolean isMonotonic(int[] nums) {
        boolean increasing = true;
        boolean decreasing = true;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) {
                decreasing = false;
            } else if (nums[i] < nums[i - 1]) {
                increasing = false;
            }

            if (!increasing && !decreasing) {
                return false;
            }
        }

        return true;
    }
}
```

* nums[i]와 nums[i+1]의 관계를 하나하나씩 체크하면서

  flag를 통해 문제 조건을 충족하는지 찾아낸다.

---

> Review

* Easy라서 가볍게 접근했다가 많은 고민과 성찰을 하게 된 문제였다.


---

## Reference

* [896. Monotonic Array](https://leetcode.com/problems/monotonic-array)