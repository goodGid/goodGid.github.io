---
layout: post
title: " LeetCode : 1512. Number of Good Pairs "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1512. Number of Good Pairs](https://leetcode.com/problems/number-of-good-pairs/)

### Problem

```
Given an array of integers nums, return the number of good pairs.
A pair (i, j) is called good if nums[i] == nums[j] and i < j.
```


---

### Example

```
Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
```

---

### [1] Code (23. 11. 05)

*Retry*

``` java
// Runtime: 0 ms
// Memory Usage: 39.9 MB
// Ref : https://leetcode.com/submissions/detail/1091827606
class Solution {
    public int numIdenticalPairs(int[] nums) {
        int[] cntArray = new int[101];
        
        for (int i:nums) {
            cntArray[i]++;
        }
        
        int ans = 0;
        for (int i : cntArray) {
            if (i < 2) {
                continue;
            }
            
            ans = ans + ( i*(i-1) / 2);
        }     
        return ans;
    }
}
```

* 어렵지 않게 풀었다.

  nC2 로직으로 접근했다.

---

> Reference Code

**Code 1**

``` java
// Ref : https://leetcode.com/submissions/detail/1091842672
class Solution {
    public int numIdenticalPairs(int[] nums) {
        HashMap<Integer, Integer> map = new HashMap<>();
        int count = 0 ;
        for(int i : nums){
            if(map.containsKey(i)){
                count+=map.get(i); // [1]
                map.put(i, map.get(i)+1);
            }else{
                map.put(i, 1);
            }
        }
        return count;
    }
}
```

* [1] : nC2 로 접근했는데 그렇게 할 필요 없이

  동일한 값이 있을 경우엔 바로바로 카운팅을 해줘도 된다.

---

> Review


---

## Reference

* [1512. Number of Good Pairs](https://leetcode.com/problems/number-of-good-pairs/)