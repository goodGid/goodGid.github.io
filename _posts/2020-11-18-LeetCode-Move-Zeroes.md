---
layout: post
title:  " LeetCode : 283. Move Zeroes "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/)

### Problem

```
Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
```

---

### Example

```
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
```



---

### [1] Code (20. 11. 18)

``` java
public void moveZeroes(int[] nums) {
    int zero_cnt = 0;
    int idx = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[idx] = nums[i];
            idx++;
        } else {
            zero_cnt++;
        }
    }

    for (int i = nums.length - zero_cnt; i < nums.length; i++) {
        nums[i] = 0;
    }
}
```

* 직관적으로 풀 수 있는 무난했던 문제이다.
  
  이 밖에도 다양한 접근으로 문제를 풀 수 있다.
  
  Feed Back 코드를 참고하자.


---

> FeedBack

**Case 1**

``` java
public void moveZeroes(int[] nums) {
    int slow = 0;
    
    for (int fast = 0; fast < nums.length; fast++) {
        if (nums[fast] != 0) {
            if (fast != slow) { // [1]
                nums[slow] = nums[fast];
                nums[fast] = 0;
            }
            slow++;
        }
    }
}
```

* 2 pointer로 풀 수 있다니 신선 그 자체 !

  다만 [1] 조건이 없으면

  0으로 다 초기화가 되버리는 불상사가 발생한다.

  즉 fast가 slow보다 무조건 앞에 있어야한다.

---

**Case 2**

``` java
public void moveZeroes(int[] nums) {
    int idx = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            swap(nums, idx++, i);
        }
    }
}

public void swap(int[] nums, int i, int j) {
    if (i == j) { // [1]
        return;
    }
    nums[j] ^= nums[i];
    nums[i] ^= nums[j];
    nums[j] ^= nums[i];
}
```

* swap으로도 문제를 풀 수 있다.

  다만 input = [1] 일 경우

  [1] 조건이 없으면 0으로 출력이 되므로 주의하자.

---


### [2] Code (21. 09. 25)

*Need to Retry --> 아이디어 체크*

``` java
public void moveZeroes(int[] nums) {    
    int willBeInsertIdx = 0;
    int zeroCnt = 0;
    int size = nums.length;
    
    for (int i=0; i<size; i++) {
        if (nums[i] != 0) {
            nums[willBeInsertIdx++] = nums[i];
        } else {
            zeroCnt++;
        }
    }
    
    for (int i=0; i<zeroCnt; i++) {
        nums[size-1-i] = 0;
    }
}
```

> Review

* 다시 풀 필요는 없으나 아이디어만 가져가자.

---

### [3] Code (21. 11. 20) (x)

``` java
class Solution {
    public void moveZeroes(int[] nums) {
        if (nums.length == 1) {
            return;
        }

        int toBeInsertIdx = 0;
        for (int i = 0; i < nums.length; i++) {
            toBeInsertIdx = i;
            if (nums[i] == 0) {
                break;
            }
        }

        for (int i = toBeInsertIdx + 1; i < nums.length; i++) {
            if (nums[i] == 0) {
                continue;
            }
            nums[toBeInsertIdx++] = nums[i];
            nums[i] = 0;
        }
    }
}
```

> Review

* 자잘한 실수들이 많았으나 아이디어만 보자.

---

### [4] Code (23. 07. 05)

``` java
// Runtime: 1 ms
// Memory Usage: 45.1 MB
// Ref : https://leetcode.com/submissions/detail/986940658
class Solution {
    public void moveZeroes(int[] nums) {
        int idx = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                continue;
            }
            nums[idx++] = nums[i];
        }

        for (int i = idx; i < nums.length; i++) {
            nums[i] = 0;
        }
    }
}
```

> Review

* 아이디어가 바로 떠오르지 않아 고민을 좀 했다.


---

## Reference

* [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/)
