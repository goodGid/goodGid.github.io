---
layout: post
title:  " LeetCode : 838. Push Dominoes "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [838. Push Dominoes](https://leetcode.com/problems/push-dominoes)

### Problem

```
There are n dominoes in a line, and we place each domino vertically upright. In the beginning, we simultaneously push some of the dominoes either to the left or to the right.
...
Return a string representing the final state.
```


---

### Example

```
Input: dominoes = ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."
```

---

### [1] Code (22. 06. 27)

*Need to Retry -> 못풀었다.*

``` java
n/a
```

* 엄청난 삽질을 했으나 풀지 못했다. ㅠㅠ

  실패했던 코드 : https://leetcode.com/submissions/detail/731841079

---

> Reference Code

**Code 1**

``` java
class Solution {
    public String pushDominoes(String S) {
        char[] A = S.toCharArray();
        int N = A.length;
        int[] forces = new int[N];

        // [1] : Populate forces going from left to right
        int force = 0;
        for (int i = 0; i < N; ++i) {
            if (A[i] == 'R') {force = N;} else if (A[i] == 'L') {force = 0;} else {
                force = Math.max(force - 1, 0); // [1-1]
            }
            forces[i] += force;
        }

        // [2] : Populate forces going from right to left
        force = 0;
        for (int i = N - 1; i >= 0; --i) {
            if (A[i] == 'L') {force = N;} else if (A[i] == 'R') {force = 0;} else {
                force = Math.max(force - 1, 0);
            }
            forces[i] -= force;
        }

        StringBuilder ans = new StringBuilder();
        for (int f : forces) {ans.append(f > 0 ? 'R' : f < 0 ? 'L' : '.');}
        return ans.toString();
    }
}
```

* 문제의 [Solution](https://leetcode.com/problems/push-dominoes/solution) 코드이다.

---

> Review

* 풀릴 듯 말듯 어려웠다.

* 230401

  [1] : 왼쪽에서 오른쪽으로 살펴보면서 특정 값을 부여함으로써 
  
  최종적으로 해당 위치에 값이 "R/L/." 인 지 결정해야 한다.

  [1-1] : "force-1" 가 왜 필요할까 고민하다 깨달았다.

  "."일 경우엔 왼쪽의 값에 영향을 받으므로 그 영향도를 위한 코드이다.

  ex) "R.." 라면 "543"으로 표현을 한다.
  

---

### [2] Code (23. 04. 01)

*Need to Retry -> 또다시 못 풀었다.*

``` java
n/a
```

---

> Reference Code

* 참고 : *Reference Code -> Code 1*

* "좌 -> 우 / 우 -> 좌"로 살펴봐야 할까? 생각이 들었지만 

  아니겠지 하고 넘어갔는데 그 방법이 맞았다.

---

## Reference

* [838. Push Dominoes](https://leetcode.com/problems/push-dominoes)