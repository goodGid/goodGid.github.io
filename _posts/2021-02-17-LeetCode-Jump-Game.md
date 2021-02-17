---
layout: post
title:  " LeetCode : 55. Jump Game "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [55. Jump Game](https://leetcode.com/problems/jump-game/)

### Problem

```
Given an array of non-negative integers nums, you are initially positioned at the first index of the array.
Each element in the array represents your maximum jump length at that position.
Determine if you are able to reach the last index.
```





---

### Example

```
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

---

### [1] Code (21. 02. 17)

``` java
class Solution {
    public boolean canJump(int[] nums) {
        int value = -1;
        int idx = 0;

        for (int i = 0; i < nums.length; i++) {
            value = Math.max(value - 1, nums[i]);
            if (value == 0) {
                break;
            }
            idx = i;
        }
        return idx == nums.length - 1;
    }
}
```

> Algorithm Description

* 0번 index부터 

  jump할 수 있는 값을 더한다는 느낌으로 접근하였다.

> Example

```
Input: nums = [3,1, ...]
```

* 0번 index는 1,2,3번 index로 이동할 수 있다.

  만약 0 -> 1번으로 갔다면

  1번 index에서는 2칸을 더 움직일 수 있다.

  최종적으로는 3번 index에 위치하게 된다.

* 여기서 nums[1]의 값을 다시 보자.

  nums[1]의 값은 1이다.

  즉 1칸을 Jump 할 수 있고

  그 말은 1 -> 2번 index로 이동할 수 있다는 뜻이다.

* 그런데 이건 nums[1]만을 봤을 경우이고

  기존의 nums[0]에서 온 값과 비교할 필요가 있다.

  그러므로 nums[0]에서 갈 수 있는 값과

  nums[1]에서 갈 수 있는 값의 Max 값을 구하면
  
  1번 index에서 이동할 수 있는 최대 Position을 구할 수 있다.
  
  // 마치 운전을 하는데 해당 index에서 기름을 충전할 수 있다는 느낌이랄까?

---

## Reference

* [55. Jump Game](https://leetcode.com/problems/jump-game/)