---
layout: post
title:  " LeetCode : 169. Majority Element "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [169. Majority Element](https://leetcode.com/problems/majority-element/)

### Problem

```
Given an array of size n, find the majority element. 
The majority element is the element that appears more than ⌊ n/2 ⌋ times.
You may assume that the array is non-empty and the majority element always exist in the array.
```

---

### Example

```
Input: [3,2,3]
Output: 3
```



---

### [1] Code (20. 11. 15)

``` java
public int majorityElement(int[] nums) {

    HashMap<Integer, Integer> map = new HashMap<>();

    int ans_count = 0;
    int ans_key = 0;

    for (int i : nums) {
        Integer count = map.getOrDefault(i, 0);
        map.put(i, count + 1);

        if (count + 1 > ans_count) {
            ans_count = count + 1;
            ans_key = i;
        }
    }

    return ans_key;
}
```

* 1차원 적으로 생각하면 풀 수 있는 풀이라고 생각이 든다.

* 여기서 더 중요한 포인트는 "Reference Code"에 아이디어이다.

---

> Reference Code

> Case 1

``` java
public int majorityElement(int[] nums) {
    return helper(nums, 0);
}

private int helper(int[] nums, int start) {
    int count = 1;
    int pivot = nums[start];
    for (int i = start + 1; i < nums.length; i++) {
        count = nums[i] == pivot ? count + 1 : count - 1;
        if (count == 0) { return helper(nums, i + 1); }
    }
    return pivot;
}
```

* 다음 예시로 위 알고리즘을 이해해보자.

```
idx   : 0 1 2 3 4 5 6
value : 1 2 2 2 1 1 1
```

* 정답이 되는 value를 key라고 해보자.

  그러면 문제 조건인 key는 n/2보다 많아야 한다.

  즉 key의 count가 다른 value의 count와 같으면 그건 key가 될 수 없다. 

* 위 정보를 토대로 처음에 idx[0]을 정답이 되는 key라고 가정한다.

  그리고 idx[1]과 비교를 하는데 다르므로 count를 -1 해준다.

  그러면 idx[0]의 count는 0이 된다.

* 여기서 count = 0이 된다는 건

  key는 n/2보다 크다는 조건을 충족시켜야 하는데 

  idx[0]과 idx[1]의 수는 같으므로 

  key라고 가정했던 idx[0]는 idx[1]까지만 보는 시점엔 정답이 될 수 없다.

* idx[1]을 보고 난 후 

  idx[0]가 key가 아니므로 key를 idx[2]로 다시 가정한다.

  (= return helper(nums, i + 1) )

* 여기서 idx[1]의 값을 skip 하는 이유는 

  idx[0].count = idx[1].count이므로 idx[1]도 key가 될 수 없다.

* 이제는 idx[2]를 key라고 가정한다.

  그리고 똑같은 행위를 반복한다.

  그러면 idx[3]은 idx[2]와 같으므로 count를 +1 해주고

  idx[4]가 되면 count를 -1 해주고

  idx[5]가 되면 count를 -1을 해주는데 이 시점에 count가 0이 되므로

  key라고 생각했던 idx[2]도 정답이 될 수 없다.

  그러므로 idx[6]을 key라고 가정하고 다시 진행한다.

* 위와 같은 행위를 반복하면 정답이 되는 key를 구할 수 있다.


---

> Case 2

``` java
public int majorityElement(int[] nums) {
    Arrays.sort(nums);
    return nums[nums.length / 2];
}
```

* [Boyer–Moore majority vote algorithm](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm) 풀이 방법이다.

* 위 알고리즘이 가능한 이유는 

  정답이 되는 key는 
  
  n/2 사이즈보다 크다는 조건이 있으므로 가능하다.

```
ex) 1 1 2 2 3 3 3 3 3
--> n/2 = 4 
--> arr[4] = 3
```

### [2] Code (21. 09. 19)

*Need to Retry*

``` java
public int majorityElement(int[] nums) {
    int n = nums.length / 2;
    int index = 0;
    int count = 1;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == nums[index]) {
            count++;
        } else {
            count--;
        }
        if (count == 0) {
            index = i;
            count = 1;
        }
    }
    return nums[index];
}
```

> Check Point

* Follow-up: Could you solve the problem in **linear time** and in **O(1)** space?

---

> Review

* TreeMap으로 접근하려고 했는데 사용법을 모르겠어서 실패했다.

---

## Summary

* 다양한 풀이를 참고하였고 만족스러운 문제였다.

---

## Reference

* [169. Majority Element](https://leetcode.com/problems/majority-element/)
