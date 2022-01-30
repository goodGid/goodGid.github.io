---
layout: post
title:  " LeetCode : 75. Sort Colors "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [75. Sort Colors](https://leetcode.com/problems/sort-colors/)

### Problem

```
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.
```


---

### Example

```
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

---

### [1] Code (21. 11. 28) (x)

``` java
class Solution {
    public void sortColors(int[] nums) {
        int oneIdx = 0;
        for (int i=0; i<nums.length; i++) {
            if (nums[i] == 1) {
                oneIdx = i;
                break;
            }
        }
        
        int l = 0;
        int r = nums.length-1;
        
        while (l <= r) {
            if (nums[l] == 0) {
                if (l > oneIdx) {
                    nums[l] = nums[oneIdx];
                    nums[oneIdx] = 0;
                    oneIdx++;
                }
                l++;
            } else if (nums[l] == 1) {
                if (oneIdx > l) {
                    oneIdx = l;
                }
                l++;
            } else if (nums[l] == 2) {
                nums[l] = nums[r];
                nums[r] = 2;
                r--;
            }
        }
    }
}
```

---

> Check Point

* sort them [in-place algorithm](https://en.wikipedia.org/wiki/In-place_algorithm)

* Could you come up with a one-pass algorithm using only constant extra space?

---

> Algorithm Description

* 단순 구현 문제

---

> Reference Code

**Case 1**

``` java
class Solution {
    public void sortColors(int[] nums) {
        int[] count = new int[3];
        for (int i = 0; i < nums.length; i++) {
            count[nums[i]]++;
        }
        for (int i = 0, j = 0; i < nums.length; i++) {
            while (count[j]-- == 0) {j++;}
            nums[i] = j;
        }
    }
}
```

* 내가 짠 코드보다 

  더 안전하고 이해하기 쉬운 코드란 생각이 든다.

---

> Review

* 3개의 포인터를 사용해야겠다는 생각이 먼저 들었고

  각 케이스에 맞게 분기 처리를 하였다.

  그런데 눈에 보이는 테스트 케이스가 아닌 엣지 케이스에 대해선 불안할 수밖에 없어

  실제 제출 후 코드의 안정성을 측정할 수 있었다.

* 이런 접근보다는 Reference Code에 **Case 1**와 같은 접근이 훨씬 좋아 보인다.

---


### [2] Code (22. 01. 28)

*Need to Retry -> 풀긴 풀었는데 오래 걸렸다. 다시 풀어보자.*

``` java
// Runtime: 0 ms
// Memory Usage: 42.6 MB
// Ref : https://leetcode.com/submissions/detail/629406212/
class Solution {
    public void sortColors(int[] n) {

        int l = 0;
        int r = n.length - 1;
        int cur = 0;

        while (cur <= r) {
            int value = n[cur];

            if (value == 0) {
                if (cur == l) {
                    l++;
                    cur++;
                } else {
                    n[cur] = n[l];
                    n[l] = 0;
                    l++;
                }
            } else if (value == 1) {
                cur++;
            } else {
                if (cur == r) {
                    r--;
                    cur++;
                } else {
                    n[cur] = n[r];
                    n[r] = 2;
                    r--;
                }
            }
        }
    }
}
```

* 위 코드로 맞췄으나 코드를 Refactoring 하였다.

``` java
// Runtime: 0 ms
// Memory Usage: 40.7 MB
// Ref : https://leetcode.com/submissions/detail/629407825/
class Solution {
    public void sortColors(int[] n) {

        int l = 0;
        int r = n.length - 1;
        int cur = 0;

        while (cur <= r) {
            int value = n[cur];

            if (value == 0) {
                n[cur] = n[l];
                n[l] = 0;
                cur++;
                l++;
            } else if (value == 1) {
                cur++;
            } else {
                n[cur] = n[r];
                n[r] = 2;
                r--;
            }
        }
    }
}
```

* value가 0일 경우엔 

  cur과 l 변수의 값을 이동시키는데

  value가 2일 경우엔

  cur에 대해서는 이동시키지 않는다.

---

> Review

* 포기하려 했지만 포기하지 않고 풀었다.

---

## Reference

* [75. Sort Colors](https://leetcode.com/problems/sort-colors/)