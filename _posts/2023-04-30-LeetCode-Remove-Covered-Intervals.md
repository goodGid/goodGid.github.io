---
layout: post
title: " LeetCode : 1288. Remove Covered Intervals "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1288. Remove Covered Intervals](https://leetcode.com/problems/remove-covered-intervals)

### Problem

```
Given an array intervals where intervals[i] = [li, ri] represent the interval [li, ri), remove all intervals that are covered by another interval in the list.

The interval [a, b) is covered by the interval [c, d) if and only if c <= a and b <= d.

Return the number of remaining intervals.
```


---

### Example

```
Input: intervals = [[1,4],[3,6],[2,8]]
Output: 2
Explanation: Interval [3,6] is covered by [2,8], therefore it is removed.
```

---

### [1] Code (23. 04. 30)

*Need to Retry -> 아이디어를 떠올려야 한다.*

``` java
// Wrong Code
// Ref : https://leetcode.com/submissions/detail/941625015
class Solution {
    public int removeCoveredIntervals(int[][] input) {
        int ans = input.length;
        int size = input.length;

        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (i == j) {
                    continue;
                }
                if (input[i][0] <= input[j][0] && input[j][1] <= input[i][1]) {
                    ans--;
                }
            }
        }
        return ans;
    }
}
```

* input의 조건을 보고 그냥 빠르게 풀고 싶어서

  $O(N^2)$ 으로 풀어보자 하고 빠르게 코딩을 했는데 틀렸다.

  틀린 예제 케이스는 아래와 같다.

``` java
[[34335,39239],[15875,91969],[29673,66453],[53548,69161],[40618,93111]]
```

* [29673,66453]를 기준으로 for문을 돌리면

  [34335,39239] 값을 포함한다고 생각해서 ans의 값을 줄인다.

  이 부분에서 정답이 어긋나게 된다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 6 ms
// Memory Usage: 42.9 MB
// Ref : https://leetcode.com/submissions/detail/941664327
class Solution {
    public int removeCoveredIntervals(int[][] intervals) {
        // 시작점 오름차순, 끝점 내림차순으로 정렬
        Arrays.sort(intervals, (a, b) -> {
            if (a[0] != b[0]) {
                return a[0] - b[0];
            } else {
                return b[1] - a[1];
            }
        });

        // 이전 구간의 끝점
        int prevEnd = 0;
        // 남은 구간의 개수
        int count = 0;

        for (int[] interval : intervals) {
            int end = interval[1];
            if (prevEnd < end) {
                count++;
                prevEnd = end;
            }
        }
        return count;
    }
}
```

* 이 문제의 핵심은 **시작 좌표를 기준으로 정렬을 하는 것**과

  **시작 좌표가 같다면 끝나는 지점의 좌표 값을 정렬하는 것**이다.

* 부연 설명을 하자면

  일단 시작 지점을 기준점으로 잡는다.

  그러면 나올 수 있는 경우의 수는 2가지가 나온다.

  1. 시작 지점이 같을 경우

  2. 시작 지점이 다를 경우

> 시작 지점이 같을 경우

* n개의 Interval의 시작점이 같다면

  끝나는 지점이 가장 멀리 있는 Interval이 

  나머지 Interval를 Cover 할 수 있다.

```
1번 : |-------|
2번 : |----|
3번 : |---|
```

* 위 예를 보면 1번이 2,3번을 Cover 할 수 있다.

  그러므로 시작점이 같다면 끝나는 지점을 내림 차순으로 정렬한다.

---

> 시작 지점이 다를 경우

* 시작 지점이 다르다면

  다음과 같은 예제 케이스를 그려 볼 수 있다.

```
|--------|      // 1번
  |---|         // 2번
  |------|      // 3번
  |---------|   // 4번
   |---|        // 5번
     |--|       // 6번
```

* 위 예제를 보고 직관적으로 정답을 유추해 보면 2라는 것을 알 수 있다.

  정답 : 1번, 3번

* 만약 시작 지점이 다르면

  일단 시작 지점이 좌측에 있는 걸 기준으로 끝나는 지점을 본다.

  그러면 처음에는 1번의 끝점을 보고

  그다음엔 2,3번을 차례대로 보는데 

  2,3번은 1번이 품을 수 있으니 Pass를 하고

  4번은 끝점이 다르기 때문에 정답 Count를 증가시킨다.

* 여기서 **중요한 포인트**는 

  지금까지 본 끝 지점의 최대 값은 1번이었는데
  
  그 끝 지점의 값이 4번으로 인해 변경이 되었고

  지금부터는 그 값을 기준으로 다시 봐야 한다는 것이다.

* 그렇게 해도 되는 이유는

  5,6번은

  1번을 기준으로 보나 3번을 기준으로 보나

  이미 시작점에 대한 기준은 충족이 되었으니 

  끝 지점의 값만 보면 되기 때문이다.

  // The interval [a, b) is covered by the interval [c, d) if and only if **c <= a** and b <= d.

* 다시 말해 5,6번 입장에선

  1,3번의 시작점이 똑같던 다르던 자기들 보다 작다고 퉁칠 수 있다는 뜻이다.

* 그러면 이제 끝나는 지점 값을 봐야 하는데

  어떤 값을 봐야 할까?

  당연히 더 큰 값을 기준으로 봐야지

  Cover 할 수 있는 확률이 높아진다.

* 그러므로 5,6번을 Cover 할 수 있는지 볼 때

  기준이 되는 값은 1번이 아니라 3번이 된다.

---

>  시작 지점이 같을 경우 + 시작 지점이 다를 경우

* 다음과 같이 Input이 들어왔는데

```
|---|
|----|
|-------|
  |---|         
  |---------|   
  |------|      
   |---|        
     |--|     
```

* "시작점 오름차순, 끝점 내림차순으로 정렬" 조건으로 정렬을 하게 되면

  다음과 같은 순서로 정렬이 된다.

```
|-------|           // 1번
|----|              // 2번
|---|               // 3번
  |---------|       // 4번
  |------|          // 5번
  |---|             // 6번    
   |---|            // 7번
     |--|           // 8번
```

---

> 코드 분석 

* 정답 코드의 핵심 부분을 분석해 보자.

``` java
for (int[] interval : intervals) {
    int end = interval[1];
    if (prevEnd < end) {
        count++;
        prevEnd = end;
    }
}
```

* 우리는 이미 정렬된 intervals를 갖고 있다.

  그 말은 시작 지점은 정렬이 되어있으므로 

  1번 input으로 prevEnd 값을 초기화하고

  2,3번을 품게 된다.

* 그리고 4번을 보는데 prevEnd보다 큰 값을 갖고 있으므로

  새롭게 prevEnd 값을 초기화하고

  5,6,7,8번의 각 끝 값보다 4번의 끝 값이 크기 때문에 

  정답은 1번과 4번만 살아남게 되어 2가 된다.

---

> Review

* 자세하게 문제를 분석하고 설명을 작성하였다.

  설명을 어렴풋하게 하는 거라면

  내가 그 문제를 온전히 이해하지 못했다는 생각이 문득 들어서

  ~~귀찮았지만~~ 꼼꼼하게 작성하였다.

---

## Reference

* [1288. Remove Covered Intervals](https://leetcode.com/problems/remove-covered-intervals)