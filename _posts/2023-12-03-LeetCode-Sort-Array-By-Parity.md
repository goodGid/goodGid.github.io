---
layout: post
title: " LeetCode : 905. Sort Array By Parity "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [905. Sort Array By Parity](https://leetcode.com/problems/sort-array-by-parity)

### Problem

```
Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.
Return any array that satisfies this condition.
```


---

### Example

```
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
```

---

### [1] Code (23. 12. 03)

*Retry -> 다양한 접근법 공부하기*

``` java
// Runtime: 2 ms
// Memory Usage: 44.3 MB
// Ref : https://leetcode.com/submissions/detail/1111147575
class Solution {
    public int[] sortArrayByParity(int[] nums) {
        List<Integer> odds = new ArrayList<>();
        int size = nums.length;
        int[] ans = new int[size];
        int idx = 0;
        
        for (int i : nums) {
            odds.add(i);
        }
        
        for (int i=size-1; i>=0; i--) {
            if (nums[i] % 2 != 0) {
                continue;
            }           
            ans[idx++] = nums[i];
            odds.remove(i);
        }
        
        for (int i : odds) {
            ans[idx++] = i;
        }
        
        return ans;
    }
}
```

* 생각의 흐름대로 문제를 풀었다.

  풀면서 더 짧은 코드가 있을 텐데 생각이 들었지만

  깊게 고민하지 않고 의식의 흐름대로 풀었다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 0 ms
// Memory Usage: 44 MB
// Ref : https://leetcode.com/submissions/detail/1111149711
class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int j = 0;
        for(int i=0; i<nums.length; i++){
            if(nums[i]%2 == 0){
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j++] = temp;
            }
        }

        return nums;
    }
}
```

* Submit 중 가장 Runtime이 짧은 코드

* j의 값은 지금 값이 짝수여도 상관없이 swap을 해준다.

  어차피 짝수 간 순서가 중요하지 않으므로 가능하다.

```
- i값 / j값 기준으로 설명
홀홀, 짝홀 : i 값이 홀수이므로 num[i]%2 ==0 조건 충족 X -> 어떤 로직도 동작 X
짝짝 : 바꿔도 상관없음
홀짝 : i와 j를 swap 후 j값을 증가시켜 준다. (= 새로운 짝수를 넣어준 변수 j의 위치를 이동시킨다.)
```

---

**Code 2**

``` java
// Runtime: 1 ms
// Memory Usage: 44.4 MB
// Ref : https://leetcode.com/submissions/detail/1111149762
class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int left = 0, right = nums.length - 1;
        while(left <= right){
            if(nums[left] % 2 != 0){
                if(nums[right] % 2 == 0){
                    swap(nums, left, right);
                } else {
                    right--;
                }
            } else {
                left++;
            }
        }
        return nums;
    }
    
    private void swap(int[] nums, int i, int j){
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

* Submit 중 2번째로 Runtime이 짧은 코드

```
left == 짝수 -> left++
left == 홀수 && right == 홀수 -> right--
left == 홀수 && right == 짝수 -> swap
```


---

> Review

* Easy 문제여서 접근 방식도 쉽고 떠오르는대로 풀 순 있지만

  효율을 추구하면 공부할 부분이 많다.


---

## Reference

* [905. Sort Array By Parity](https://leetcode.com/problems/sort-array-by-parity)