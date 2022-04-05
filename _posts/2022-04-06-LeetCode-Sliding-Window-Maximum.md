---
layout: post
title:  " LeetCode : 239. Sliding Window Maximum "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum)

### Problem

```
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
```


---

### Example

```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
```

---

### [1] Code (22. 04. 06)

*Need to Retry -> 풀었는데 Hard 문제니까 한 번 더 풀어보자.*

``` java
// Runtime: 124 ms
// Memory Usage: 148.9 MB
// Ref : https://leetcode.com/submissions/detail/674642420
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {

        PriorityQueue<Node> pq = new PriorityQueue<>((o1, o2) -> o2.getVal() - o1.getVal());

        for (int i = 0; i < k - 1; i++) {
            pq.add(new Node(i, nums[i]));
        }

        int l = -1;
        int[] ans = new int[nums.length - k + 1];

        for (int r = k - 1; r < nums.length; r++) {
            l++;
            pq.add(new Node(r, nums[r]));

            while (pq.peek().getIdx() < l) {
                pq.poll();
            }
            ans[l] = pq.peek().getVal();
        }
        return ans;
    }
}

class Node {
    int idx;
    int val;

    public int getVal() {
        return val;
    }

    public int getIdx() {
        return idx;
    }

    public Node(int idx, int val) {
        this.idx = idx;
        this.val = val;
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 25 ms
// Memory Usage: 55.6 MB
// Ref : https://leetcode.com/submissions/detail/674648522
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        LinkedList<Integer> q = new LinkedList<Integer>();
        int left = 0;
        int right = 0;

        int[] res = new int[nums.length - k + 1];
        int index = 0;

        while (right < nums.length) {
            while (!q.isEmpty() && nums[q.peekLast()] <= nums[right]) {
                q.removeLast();
            }
            q.addLast(right);
            right++;

            if (right - left == k) { // [1]
                if (right - q.peekFirst() > k) { // [2]
                    q.removeFirst();
                }
                res[index++] = nums[q.peekFirst()];
                left++;
            }
        }
        return res;
    }
}
```

* [1] : left = 0 / right = 3 이면 right - left는 3이 된다.

  즉 k 이상이 되었으므로 maximum value를 선택하는 로직을 실행한다.

* [2] : right - q.peekFirst( )가 k보다 크다는 건 

  q가 윈도우 범위를 넘어선 index를 바라보고 있음을 알 수 있다.

  ```
  right = 5 / q.peekFirst( ) = 1 이라면 
  윈도우에 포함되어 있어야 하는 index는 3,4,5이다.
  ```

---

> Review

* 15분 소요

* Hard 문제였는데 어렵지 않았다.

  아이디어가 빠르게 떠올랐다.

---

## Reference

* [239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum)