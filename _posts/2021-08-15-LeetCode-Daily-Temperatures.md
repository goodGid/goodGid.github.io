---
layout: post
title:  " LeetCode : 739. Daily Temperatures "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

### Problem

```
Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.
```


---

### Example

```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

---

### [1] Code (21. 08. 15)

*Need to Retry*

``` java
class Solution {

    public int[] dailyTemperatures(int[] temperatures) {
        Stack<Integer> st = new Stack<>();
        int[] ans = new int[temperatures.length];

        for (int i = 0; i < temperatures.length; i++) {
            while (!st.isEmpty() && temperatures[st.peek()] < temperatures[i]) {
                int idx = st.pop();
                ans[idx] = i - idx;
            }
            st.push(i);
        }
        return ans;
    }
}

```

> Check Point

* Input 값을 보면 $O(N^2)$으로 접근하면 TLE가 발생한다.

> Wrong Reason

* $O(N)$에 가까운 시간복잡도 아이디어가 떠오르지 않았다.

  그래서 정답 코드를 참고했는데 너무 번뜩이는 아이디어란 생각이 들었다.

* 내가 떠올리지 못한 아이디어는 다음과 같다.

```
i번째값을 바라볼 때
i-1 / i-2 / i-3 등등 앞에 있는 값들을 동시에 비교해줘야 하는데
이거를 어떻게 구현해줘야 할지 생각이 떠오르지 않았다.

그런데 정답코드를 보니 스택을 사용해서 위 요구사항을 구현하였다.
i번째에서 while문을 사용해 
i-1 / i-2 / i-3 등등 앞에 있는 값들과의 비교를 일괄적으로 해줌으로써 처리할 수 있었다. 

스택을 이렇게도 활용할 수 있는지를 깨닫는 좋은 문제였다.
```

> Review

* 20분 정도 고민했지만 아이디어를 떠올리지 못했다.

---

### [2] Code (21. 10. 10)

``` java
class Solution {
    public int[] dailyTemperatures(int[] t) {
        int[] ans = new int[t.length];
        Stack<Pair> s = new Stack<>();
        
        for (int i=0; i<t.length; i++) {
            
            while (!s.empty()) {
                Pair topNode = s.peek();
                
                if (t[i] <= topNode.val) {
                    break;
                }
                
                if (t[i] > topNode.val) {
                    s.pop();
                    ans[topNode.idx] = i - topNode.idx;
                }
            }
            s.push(new Pair(i, t[i]));
        }
        return ans;
    }
    
    public class Pair {
        int idx;
        int val;
        
        public Pair(int idx, int val) {
            this.idx = idx;
            this.val = val;
        }
    }
}
```

> Concern Point

* Stack에서 Top에 있는 값 참조

```
stack.peek();
```

---

> FeedBack

* 이전에 풀었던 아이디어가 문제를 보자마자 떠올라서 쉽게 풀었다.

  아무래도 처음에 아이디어를 접했을 때 너무 인상 깊어서 각인된 듯싶다.


---

## Reference

* [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)