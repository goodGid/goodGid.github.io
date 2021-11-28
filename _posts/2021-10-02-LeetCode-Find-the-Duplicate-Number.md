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

* *uses only constant extra space* 조건을 위반한 풀이

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

### [2] Code (21. 11. 26)

*Need to Retry*


``` java
// Wrong Code
class Solution {
    public int findDuplicate(int[] nums) {
        int pivot = 0;
        for (int i = 0; i < nums.length; i++) {

            int bit = 1;
            for (int j = 0; j < nums[i]; j++) {
                bit = bit << 1;
            }
            System.out.println(bit);

            if ((bit & pivot) != 0) {
                return nums[i];
            } else {
                pivot = pivot | bit;
            }
        }
        return 0;
    }
}
```

> Check Point

* You must solve the problem without modifying the array nums and **uses only constant extra space**.

* Can you solve the problem in **linear runtime complexity**?

---

> Algorithm Description

* ( 틀렸지만 내가 작성한 코드에 관해 설명을 하자면 )

  bit 연산자를 이용하여 num[i]값만큼 shift 후

  해당 자리의 값이 있다면 

  그 값을 중복이라 생각하고 return 한다.

---

> Wrong Reason

* java의 int 범위는 "2147483647"로 
  
  총 10자리만 shift가 가능하다.

* 그래서 위 로직으로 진행 시 

  너무 큰 값에 대해 shift를 하면 범위를 벗어난다.

  ex) [13,47,24,47, ...]

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

> Review

* *Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.*

  위 문장이 힌트였고 힌트를 제대로 활용했으면 익숙한 아이디어로 문제 해결이 가능했다.

```
input : [3,1,3,4,2]
총 5개의 값이 있다
(= 4 + 1)
(= n + 1)
그러므로 n = 4이다.
```

* 이게 어떻게 힌트가 되느냐?

  input의 범위는 n을 벗어나지 않고
  
  그 사이에 중복된 값을 찾아야 한다.
  
  즉 "[토끼와 거북이](https://blog.naver.com/occidere/222260962156)" 풀이 방법으로 문제를 해결할 수 있다.

  (= [2] Code (21. 11. 26) -> Reference Code -> Case 1 코드 참고)





---

## Reference

* [287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)