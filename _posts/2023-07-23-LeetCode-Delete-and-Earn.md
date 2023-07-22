---
layout: post
title: " LeetCode : 740. Delete and Earn "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [740. Delete and Earn](https://leetcode.com/problems/delete-and-earn)

### Problem

```
You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times:
Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must delete every element equal to nums[i] - 1 and every element equal to nums[i] + 1.
Return the maximum number of points you can earn by applying the above operation some number of times.
```


---

### Example

```
Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: You can perform the following operations:
- Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
- Delete a 3 again to earn 3 points. nums = [3].
- Delete a 3 once more to earn 3 points. nums = [].
You earn a total of 9 points.
```

---

### [1] Code (23. 07. 23)

*Need to Retry -> 못풀었지만 재밌던 문제*

``` java
// Wrong Code
// Ref : https://leetcode.com/submissions/detail/1000950776/
class Solution {
    public int deleteAndEarn(int[] nums) {
        HashMap<Integer, Integer> map = new HashMap<>();
        PriorityQueue<Node> pq = new PriorityQueue<>((i1, i2) -> i2.val - i1.val);
        int ans = 0;

        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + num);
        }

        for (Integer key : map.keySet()) {
            pq.add(new Node(key, map.get(key)));
        }

        while (!pq.isEmpty()) {
            Node node = pq.poll();

            if (!map.containsKey(node.getKey())) {
                continue;
            }

            int key = node.getKey();
            int sideSum = map.getOrDefault(key - 1, 0) + map.getOrDefault(key + 1, 0);

            if (node.getVal() >= sideSum) {
                ans += node.getVal();
                map.remove(key - 1);
                map.remove(key + 1);
            }
        }
        return ans;
    }

    class Node {
        int key;
        int val;

        public Node(int k, int v) {
            this.key = k;
            this.val = v;
        }

        public int getKey() {
            return this.key;
        }

        public int getVal() {
            return this.val;
        }
    }
}
```

* 자료구조로는 PriorityQueue와 HashMap을 사용하고

  *i 값 vs (i-1) 값 + (i+1)* 값 를 비교하여 판정하려고 했지만 틀렸다. ㅠ_ㅠ

---

> Reference Code

**Code 1**

``` java
// Runtime: 9 ms
// Memory Usage: 43.2 MB
// Ref : https://leetcode.com/submissions/detail/1001050994
class Solution {    
    public int deleteAndEarn(int[] nums) {
        var numToCount = new HashMap<Integer, Integer>();
        var min = Integer.MAX_VALUE;
        var max = Integer.MIN_VALUE;
        for (var num : nums) {
            numToCount.compute(num, (k, v) -> v == null ? 1 : ++v);
            min = Math.min(min, num);
            max = Math.max(max, num);
        }

        var prevIncEarn = 0;
        var prevExcEarn = 0;
        for (var i = min; i <= max; i++) {
            var incEarn = prevExcEarn + i * numToCount.getOrDefault(i, 0);
            var excEarn = Math.max(prevIncEarn, prevExcEarn);
            prevIncEarn = incEarn;
            prevExcEarn = excEarn;
        }
        return Math.max(prevIncEarn, prevExcEarn);
    }
}
```

* [풀이 링크](https://leetcode.com/problems/delete-and-earn/discuss/1820924/Java-or-Simple-or-Explained)에 사진도 함께 보자.

* 간략하게 아이디어를 설명하자면 다음과 같다.

* nums[i]를 선택한다면 

  굳이 nums[i+1]를 볼 필요 없이

  nums[i-1]을 선택했는지만 살펴도 된다.

  -> nums[i] 선택 = nums[i-1], nums[i+1] 선택 불가능 

  -> nums[i+1] 선택 결정 시 어차피 nums[i]를 봄

  -> 고로 nums[i-1]만 보면 된다.

* nums[i]를 선택한다면 

  nums[i-1]까지 중 nums[i-1]를 선택하지 않은 최댓값을 더해준다.

* nums[i]를 선택하지 않는다면

  nums[i-1]를 선택한 값과 nums[i-1]를 선택하지 않은 값 중 최댓값을 선택한다.

---

> Review

* (비록 시도했다 실패했지만) 재밌는 문제였다.
  
---

## Reference

* [740. Delete and Earn](https://leetcode.com/problems/delete-and-earn)