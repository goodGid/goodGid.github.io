---
layout: post
title: " LeetCode : 973. K Closest Points to Origin "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [973. K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin)

### Problem

```
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
```


---

### Example

```
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
```

---

### [1] Code (24. 01. 14)

*Retry -> 다른 풀이 방법도 참고해서 학습해두자.*

``` java
// Runtime: 239 ms
// Memory Usage: 51.9 MB
// Ref : https://leetcode.com/submissions/detail/1145480367
class Solution {
    public int[][] kClosest(int[][] points, int k) {
        List<Node> list = new LinkedList<>();
        
        for (int[] item : points) {
            int x = item[0];
            int y = item[1];
            int result = (int) Math.sqrt((int) Math.pow(x,2) + (int) Math.pow(y,2));
            list.add(new Node(item, (int) (Math.pow(x,2) + Math.pow(y,2))));
        }
        
        Collections.sort(list, (l1, l2) -> {
            return l1.val - l2.val;
        });
        
        int[][] ans = new int[k][2];
        for (int i=0; i<k; i++) {
            Node node = list.get(i);
            ans[i][0] = node.pos[0];
            ans[i][1] = node.pos[1];
        }
        return ans;
    }
    
    class Node {
        int[] pos;
        int val;
        
        public Node(int[] _pos, int _val) {
            pos = _pos;
            val = _val;
        }
    }
}
```

* 어렵지 않게 풀었다.

  그런데 더 효율적인 방법이 있으니 Reference Code를 살펴보자.

---

> Reference Code

**Code 1**

``` java
// Runtime: 12 ms
// Memory Usage: 53.6 MB
// Ref : https://leetcode.com/submissions/detail/1145619908
class Solution {
    public int[][] kClosest(int[][] points, int k) {
        int N = points.length;
        int[] dists = new int[N];
        for (int i = 0; i < N; ++i) {
            dists[i] = dist(points[i]);
        }

        Arrays.sort(dists); // [1]
        int distK = dists[k - 1]; // [2]
        int[][] ans = new int[k][2];
        int t = 0;
        for (int i = 0; i < N; ++i) {
            if (dist(points[i]) <= distK) { // [3]
                ans[t++] = points[i];
            }
        }

        return ans;
    }

    public int dist(int[] point) {
        return point[0] * point[0] + point[1] * point[1];
    }
}
```

* [1] : 거리순으로 정렬을 한다.

```
arr   : 5 4 3 2 1 
dists : 1 2 3 4 5
```

* arr의 순서대로라면 0,0까지 값이 5,4,3,2,1 이지만

  dists는 정렬되어 있으므로 1,2,3,4,5 이다.

* [2] : distK는 정렬된 값 중 k번째로 0,0에서 멀리 떨어진 값이다.

  주의할 점은 dists는 정렬된 배열이므로
  
  points[i] 값과 dists[i]의 값은 다를 수 있다.

* [3] : dists 배열에서 0~k-1까지의 값은 

  문제에서 요구한 K번째까지 0,0에 가까운 값들이다.
  
  그러므로 points 배열에 대해 0~N까지 순회를 돌면서 

  i번째 값과 0,0까지 거리 값을 보면서 

  정답이 될 수 있는 값들을 찾는다.

**Example**

```
arr   : 15 14 13 12 11 // points[i]에서 0,0까지 거리의 값 목록들
dists : 11 12 13 14 15
k = 3
```

* distK = 13이 되고

  arr[0](=15) > 13이므로

  k closest points 조건을 충족하지 못하므로 Pass

  arr[3](=12) < 13이므로

  k closest points 조건을 충족

---

**Code 2**

``` java
// Runtime: 29 ms
// Memory Usage: 55.6 MB
// Ref : https://leetcode.com/submissions/detail/1145620299
class Solution {
    public int[][] kClosest(int[][] points, int k) {
        int [][] ans = new int [k][];
        PriorityQueue<int[]> pq = new PriorityQueue<>((p1,p2)-> p2[0]*p2[0] + p2[1]*p2[1] - p1[0]*p1[0] - p1[1]*p1[1]); // [1], [2]
        for(int [] p : points){
            pq.add(p);
            if(pq.size()>k)
                pq.poll();
        }
        int i=0;
        while(!pq.isEmpty()){
            ans[i++] = pq.poll();
        }
        return ans;
    }
}
```

* [1] : PQ에 int[] 타입으로 선언할 수 있다.

* [2] : 값을 넣으면서 동시에 정렬 조건을 설정해 주면 쉽게 문제를 풀 수 있다.

  
---

> Review

* 처음엔 엄청 쉽겠네 했다가

  효율성을 고려하게 된 문제였다.

---

## Reference

* [973. K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin)