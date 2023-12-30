---
layout: post
title: " LeetCode : 1814. Count Nice Pairs in an Array "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1814. Count Nice Pairs in an Array](https://leetcode.com/problems/count-nice-pairs-in-an-array/)

### Problem

```
You are given an array nums that consists of non-negative integers. Let us define rev(x) as the reverse of the non-negative integer x. For example, rev(123) = 321, and rev(120) = 21. A pair of indices (i, j) is nice if it satisfies all of the following conditions:
- 0 <= i < j < nums.length
- nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])
Return the number of nice pairs of indices. Since that number can be too large, return it modulo 109 + 7.
```


---

### Example

```
Input: nums = [42,11,1,97]
Output: 2
Explanation: The two pairs are:
 - (0,3) : 42 + rev(97) = 42 + 79 = 121, 97 + rev(42) = 97 + 24 = 121.
 - (1,2) : 11 + rev(1) = 11 + 1 = 12, 1 + rev(11) = 1 + 11 = 12.
```

---

### [1] Code (23. 12. 30)

*Retry -> 재밌었던 문제 하지만 아이디어를 떠올리지 못했다.*

``` java
// 제출 했으나 시간 초과 발생
// Ref : https://leetcode.com/submissions/detail/1131898399
class Solution {
    public int countNicePairs(int[] nums) {
        int mod = 1000000000 + 7;
        int cnt = 0;
        int[] rev = new int[nums.length];
        
        for (int i=0; i<nums.length; i++) {
            rev[i] = calReverse(nums[i]);
        }
        
        for (int i=0; i<nums.length; i++) {
            for (int j=i+1; j<nums.length; j++) {
                if (nums[i] + rev[j] == rev[i] + nums[j]) {
                    cnt++;
                    cnt %= mod;
                }
            }
        }
        
        return cnt;
    }
    
    private int calReverse(int n) {
        int val = 0;
        while (n > 0) {
            val *= 10;
            val += n%10;
            n /= 10;
        }
        return val;
    }
}
```

* nums의 값이 1 <= nums.length <= $10^5+9$ 라서 

  1억까지는 시간 초과가 발생 안 하니 괜찮겠다 했는데 

  ~~어림도 없지~~ 바로 시간 초과 뜸


---

> Reference Code

**Code 1**

``` java
// Runtime: 81 ms
// Memory Usage: 55.6 MB
// Ref : https://leetcode.com/submissions/detail/1131910229
class Solution {
    public int countNicePairs(int[] nums) {
        int[] arr = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            arr[i] = nums[i] - rev(nums[i]);
        }
        
        Map<Integer, Integer> dic = new HashMap();
        int ans = 0;
        int MOD = (int) 1e9 + 7;
        for (int num : arr) {
            ans = (ans + dic.getOrDefault(num, 0)) % MOD;
            dic.put(num, dic.getOrDefault(num, 0) + 1);
        }
        
        return ans;
    }
    
    public int rev(int num) {
        int result = 0;
        while (num > 0) {
            result = result * 10 + num % 10;
            num /= 10;
        }
        
        return result;
    }
}
```

* 수학적인 식으로 표현하면 다음과 같이 정리할 수 있다.

```
nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])
-> x + rev(y) == y + rev(x)
-> x - rev(x) == y - rev(y)
-> arr[i] = nums[i] - rev(nums[i])
```

* arr 배열은 nums[i] - rev(nums[i])의 결괏값을 갖고 있고

  우리는 for문을 돌면서 특정 index에 대해
  
  nums[index] - rev(nums[index]) 계산 시

  같은 값이 있다면 그것만큼 조합을 만들어서

  문제 조건을 충족시킬 수 있다.

---

> Review

* 재밌었던 문제다.

  좋은 아이디어를 배웠다.

---

## Reference

* [1814. Count Nice Pairs in an Array](https://leetcode.com/problems/count-nice-pairs-in-an-array/)