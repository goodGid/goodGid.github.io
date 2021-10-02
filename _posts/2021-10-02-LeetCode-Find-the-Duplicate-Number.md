---
layout: post
title:  " LeetCode : 287. Find the Duplicate Number "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)

### Problem

```
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.
```


---

### Example

```
Input: nums = [1,3,4,2,2]
Output: 2
```

---

### [1] Code (21. 10. 02)

*Need to Retry*

``` java
n/a
```

> Check Point

* You must solve the problem without modifying the array nums and **uses only constant extra space**.

* Can you solve the problem in **linear runtime complexity**?

---

> Concern Point

* XOR로 접근해야 한다는 느낌은 왔는데 그 이상으로 아이디어가 떠오르지 않았다.

  -> 잘못된 접근이었다. ㅠㅠ

---

> Wrong Reason

* XOR로 접근했는데 잘못됐다.

  그 아이디어를 버리지 못해서 풀지 못했다.

---

> FeedBack

* 1개만 나온다는 키워드에 꽂혀서 XOR만 생각했다.

---

> Reference Code

**Case 1**

``` java
public int findDuplicate(int[] nums) {
    int slow = nums[0], fast = nums[0];

    // [1]
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    slow = nums[0];

    // [2]
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}
```

* *You must solve the problem without modifying the array nums* 조건을 충족하는 풀이

* 일명 "[토끼와 거북이](https://blog.naver.com/occidere/222260962156)" 풀이 방법

  [1] : Cycle 시작 지점을 찾기 위한 로직

  [2] : 최초로 slow와 fast가 만나는 지점을 찾기 위한 로직 

---

**Case 2**

``` java
public int findDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int i : nums) {
            if (set.contains(i)) {
                return i;
            }
            set.add(i);
        }
        return 0;
    }
```

* *You must solve the problem without modifying the array nums* 조건을 위반한 풀이

* Set을 사용한 풀이 방법

---

**Case 3**

``` java
public int findDuplicate(int[] nums) {
    int n = nums.length;

    int i = 0, j = 0;
    while (true) {
        if (nums[i] > 0) {
            j = nums[i];
            nums[i] *= (-1);
            i = j;
        } else {
            return i;
        }
    }
}
```

* *You must solve the problem without modifying the array nums* 조건을 위반한 풀이

* nums에 대해 수정이 발생했지만 아이디어는 알아두자.



---

## Reference

* [287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)