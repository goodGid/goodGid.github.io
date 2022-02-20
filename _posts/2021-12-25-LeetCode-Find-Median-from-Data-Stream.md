---
layout: post
title:  " LeetCode : 295. Find Median from Data Stream "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [295. Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

### Problem

```
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.
For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
```


---

### Example

```
Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]
```

---

### [1] Code (21. 12. 25)

*Need to Retry -> TLE 발생*

``` java
// TLE 코드
class MedianFinder {
    private List<Double> nums;
    private int numsSize;
    private double sum;

    public MedianFinder() {
        nums = new ArrayList<>();
        numsSize = 0;
        sum = 0;
    }

    public void addNum(int num) {
        nums.add((double) num);
        numsSize++;
        sum += (double) num;
        Collections.sort(nums);
    }

    public double findMedian() {
        if (numsSize % 2 == 1) { // odd
            return nums.get(numsSize / 2);
        } else { // even
            int mid = numsSize / 2;
            return (nums.get(mid - 1) + nums.get(mid)) / 2;
        }
    }
}
```

---

> Wrong Reason

* 매번 Sort를 해주면 시간 초과 발생

---

> Review

* 40분 소요했지만 시간 초과 문제를 해결 못 했다.

* Hard 문제는 자료 구조를 잘 사용해야겠다.

  그리고 middle 값만 중요시하면 되니까 적절한 자료구조 선택 또한 중요하다.

  중간 값을 찾기 위한 여러 방법 중
  
  2가지 Heap을 사용하여 접근할 수 있다는 아이디어를 배웠다.

---

### [2] Code (22. 02. 20)

*Need to Retry -> 풀었는데 다시 풀어도 좋을 문제*

``` java
// Runtime: 208 ms
// Memory Usage: 125 MB
// Ref : https://leetcode.com/submissions/detail/645292174/
class MedianFinder {
    PriorityQueue<Integer> maxQ;
    PriorityQueue<Integer> minQ;

    public MedianFinder() {
        maxQ = new PriorityQueue<>(Collections.reverseOrder());
        minQ = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        if (maxQ.size() == minQ.size()) {
            maxQ.add(num);
        } else {
            minQ.add(num);
        }
        
        while (maxQ.size() > 0 && 
               minQ.size() > 0 &&
               maxQ.peek() > minQ.peek()) {
            Integer maxValue = maxQ.poll();
            Integer minValue = minQ.poll();
            maxQ.add(minValue);
            minQ.add(maxValue);
        }
    }
    
    public double findMedian() {
        if (maxQ.size() == minQ.size()) {
            return ((double) maxQ.peek() + minQ.peek()) / 2;
        }
        return (double) maxQ.peek();
    }
}
```

---

> Algorithm Description

**홀수일 경우**

``` java
o1 o2 o3 / o4 o5
findMedian() -> return o3
```

* Left는 MaxQueue로 관리를 하고

  Right는 MinQueue로 관리를 한다.

* 그러면 홀수인 경우 findMedian 메소드 호출 시

  MaxQueue의 root 값을 반환하면 된다.

---

**짝수일 경우**

``` java
o1 o2 / o3 o4
findMedian() -> return (o2 + o3) / 2
```

* 짝수일 경우 findMedian 메소드 호출 시

  MaxQueue의 root 값과 MinQueue의 root 값을 활용하여 값을 반환한다.

---

> Review

* Hard 문제는 확실히 자료구조를 활용해야 한다.

* 문제 자체가 설명이 비약해서 처음에 헤맸다.

---

## Reference

* [295. Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)