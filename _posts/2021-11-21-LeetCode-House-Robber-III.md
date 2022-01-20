---
layout: post
title:  " LeetCode : 337. House Robber III "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [337. House Robber III](https://leetcode.com/problems/house-robber-iii/)

### Problem

```
The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.
```


---

### Example

```
Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
```

---

### [1] Code (21. 11. 21)

*Need to Retry -> 아이디어는 떠올렸지만 구현 실패*

``` java
n/a
```

> Wrong Reason

* 처음엔 잘못된 아이디어로 접근을 했다.

* 가장 먼저 떠올렸던 아이디어는 Level 단위 계산이였다.

> Idea

```
A = level 1 + level 3 + level 5 
B = level 2 + level 4 + level 6
reutrn Max(A,B)
```

---

> Code

``` java
public int rob(TreeNode root) {
    if (root == null) {
        return 0;
    }
    
    List<Integer> ansList = new ArrayList<>();
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    

    while (!q.isEmpty()) {
        int size = q.size();
        int sum = 0;
        for (int i=0; i<size; i++) {
            TreeNode node = q.poll();
            sum += node.val;
            if (node.left != null) q.add(node.left);
            if (node.right != null) q.add(node.right);
        }
        ansList.add(sum);
    }
    
    
    int oddAns = 0;
    int evenAns = 0;
    for(int i=0; i<ansList.size(); i++) {
        if (i % 2 != 0) {
            oddAns += ansList.get(i);
        } else {
            evenAns += ansList.get(i);
        }
    }
    
    return oddAns > evenAns ? oddAns : evenAns;
    
}
```

* 하지만 위 아이디어는

  다음과 같은 테스트 케이스에서 잘못된 답을 리턴하였다.

```
[4,1,null,2,null,3] 
이러면 답은 6이 나오지만
실제론 7이 맞다.

[2,1,3,null,4]
이러면 [2,4,4] 가 나오는데
답이 6이 나온다.
```

---

* 그다음으로 생각한 게 DFS 방식이다.

``` java
class Solution {
    public int rob(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return go(root, true);
    }

    private int go(TreeNode node, boolean isAvailablePick) {
        if (node == null) {
            return 0;
        }

        if (isAvailablePick == true) {

            int a = go(node.left, false);
            int b = go(node.right, false);
            int ab = node.val + a + b;

            int c = go(node.left, true);
            int d = go(node.right, true);
            int cd = c + d;
            return Math.max(ab, cd);
        }

        int c = go(node.left, true);
        int d = go(node.right, true);
        return c + d;
    }
}
```

* TLE가 발생했다.

  아무래도 반복적인 작업이 많이 이뤄져서 그런 거 같다.

* 정답 코드와 내 코드를 비교해 보니

  미묘하지만 포커스가 되는 로직이 달랐다.

* 내 코드는 현재 노드를 중심으로 계산 후 

  자식 노드에 그 영향을 전파했다.

* 하지만 정답 코드를 보니 

  자식 노드까지 재귀

  -> 자식 노드에서 1번만 계산

  -> 부모 노드에 값 리턴

  -> 부모 노드는 해당 값을 활용

  -> 다시 그 부모에게 값을 리턴

* 자식 노드의 결괏값이 부모에게 영향을 끼치면서 

  반복된 계산을 줄일 수 있었다.

---

> Review

* 1시간 넘게 시도했으나 못풀었다.

  다음번엔 성공하자.

---

### [2] Code (22. 01. 20)

*Need to Retry -> 아이디어를 떠올리지 못함*

``` java
// Runtime: 1 ms
// Memory Usage: 41.6 MB
class Solution {
    public int rob(TreeNode root) {
        int[] ans = helper(root);
        return Math.max(ans[0], ans[1]);
    }

    private int[] helper(TreeNode node) {
        if (node == null) {
            return new int[] { 0, 0 };
        }

        int[] dp = new int[2];
        int[] a = helper(node.left);
        int[] b = helper(node.right);

        dp[0] = node.val + a[1] + b[1];
        dp[1] = Math.max(a[0], a[1]) + Math.max(b[0], b[1]);
        return dp;
    }
}
```
---

> Review

* [Youtube 영상](https://www.youtube.com/watch?v=nHR8ytpzz7c)을 보고 아이디어를 이해했다.

  다음엔 정말 풀 수 있을 거 같다.


---

## Reference

* [337. House Robber III](https://leetcode.com/problems/house-robber-iii/)