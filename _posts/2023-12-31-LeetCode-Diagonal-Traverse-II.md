---
layout: post
title: " LeetCode : 1424. Diagonal Traverse II "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1424. Diagonal Traverse II](https://leetcode.com/problems/diagonal-traverse-ii)

### Problem

```
Given a 2D integer array nums, return all elements of nums in diagonal order as shown in the below images.
```


---

### Example

```
Input: nums = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,4,2,7,5,3,8,6,9]
```

---

### [1] Code (23. 12. 31)

*Retry -> NxN 배열은 row+col을 활용하자 !*

``` java
// 제출 했으나 시간 초과 발생
// 53 / 56 test cases passed.
// Ref : https://leetcode.com/submissions/detail/1132606624
class Solution {
    public int[] findDiagonalOrder(List<List<Integer>> nums) {
        List<Integer> list = new ArrayList<>();

        int maxSize = 0;
        for (List<Integer> num : nums) {
            maxSize = Math.max(maxSize, num.size());
        }

        int curPosX = 0;
        int curPosY = 0;

        for (int i = 0; i < nums.size(); i++) {
            curPosX = i;
            curPosY = 0;
            while (isRange(curPosX, curPosY, maxSize)) {
                List<Integer> num = nums.get(curPosX);
                if (isValid(curPosX, curPosY, num)) {
                    // System.out.println(curPosX + " " + curPosY);
                    list.add(num.get(curPosY));
                }
                curPosX -= 1;
                curPosY += 1;
            }
        }

        int lastRowIdx = nums.size() - 1;
        int lastRowSize = nums.get(lastRowIdx).size();

        for (int i = 1; i < maxSize; i++) {
            curPosX = lastRowIdx;
            curPosY = i;
            while (isRange(curPosX, curPosY, maxSize)) {
                List<Integer> num = nums.get(curPosX);
                if (isValid(curPosX, curPosY, num)) {
                    // System.out.println(curPosX + " " + curPosY);
                    list.add(num.get(curPosY));
                }
                curPosX -= 1;
                curPosY += 1;
            }
        }

        int[] ans = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            ans[i] = list.get(i);
        }
        return ans;
    }

    private boolean isRange(int x, int y, int maxSize) {
        if (x < 0 || y >= maxSize) {
            return false;
        }
        return true;
    }

    private boolean isValid(int x, int y, List<Integer> num) {
        if (num.size() > y) {
            return true;
        }
        return false;
    }
}
```

* 정답은 맞췄으나 시간초과 ㅠㅠ

---

> Reference Code

**Code 1**

``` java
// Runtime: 37 ms
// Memory Usage: 72 MB
// Ref : https://leetcode.com/submissions/detail/1132845509
class Solution {
    public int[] findDiagonalOrder(List<List<Integer>> nums) {
        Map<Integer, List<Integer>> groups = new HashMap();
        int n = 0;
        for (int row = nums.size() - 1; row >= 0; row--) {
            for (int col = 0; col < nums.get(row).size(); col++) {
                int diagonal = row + col;
                if (!groups.containsKey(diagonal)) {
                    groups.put(diagonal, new ArrayList<Integer>());
                }
                
                groups.get(diagonal).add(nums.get(row).get(col));
                n++;
            }
        }
        
        int[] ans = new int[n];
        int i = 0;
        int curr = 0;
        
        while (groups.containsKey(curr)) {
            for (int num : groups.get(curr)) {
                ans[i] = num;
                i++;
            } 
            curr++;
        }
        
        return ans;
    }
}
```

* NxN 배열에 대해서는 row+col을 활용하는 아이디어를 떠올리자 !

* 핵심은 row+col의 합을 이용해서 문제를 푸는 것이다.

  그리고 가장 아래 row에서부터 시작해서

  문제의 요구사항인 우상향 방향으로 탐색을 하듯 List에 저장할 수가 있다.

* 자세한 내용은 [Solution](https://leetcode.com/problems/diagonal-traverse-ii/solution/)을 보면 

  이미지와 함께 이해가 잘 될 것이다.

**Code 2**

```java
class Solution {
    public int[] findDiagonalOrder(List<List<Integer>> nums) {
        Queue<Pair<Integer, Integer>> queue = new LinkedList();
        queue.offer(new Pair(0, 0));
        List<Integer> ans = new ArrayList();
        
        while (!queue.isEmpty()) {
            Pair<Integer, Integer> p = queue.poll();
            int row = p.getKey();
            int col = p.getValue();
            ans.add(nums.get(row).get(col));
            
            if (col == 0 && row + 1 < nums.size()) { // [1]
                queue.offer(new Pair(row + 1, col));
            }
            
            if (col + 1 < nums.get(row).size()) { // [2]
                queue.offer(new Pair(row, col + 1));
            }
        }
        
        // Java needs conversion
        int[] result = new int[ans.size()];
        int i = 0;
        for (int num : ans) {
            result[i] = num;
            i++;
        }
        
        return result;
    }
}
```

* BFS를 사용한 방법 !!

* [1] : col == 0일 경우에만 아래 방향으로 진행하도록 했다.

* [2] : col != 일 경우엔 오른쪽으로만 탐색한다.

* [1],[2] 방법으로 모든 지점을 방문할 수 있으며

  그 지점을 방문하는 순서 또한 맞출 수 있게 된다.

---

> Review

* 2가지 아이디어를 학습했다.

  신선하고 "우와"라는 소리가 나올 정도로 참신하다고 느껴졌다.

  이 경험을 잊지 말고 다음에 비슷한 문제가 나오면 꼭 풀어보자.

  (제발)

---

## Reference

* [1424. Diagonal Traverse II](https://leetcode.com/problems/diagonal-traverse-ii)