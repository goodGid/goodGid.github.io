---
layout: post
title:  " LeetCode : 18. 4Sum "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [18. 4Sum](https://leetcode.com/problems/4sum)

### Problem

```
Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.
```


---

### Example

```
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

---

### [1] Code (22. 06. 26)

*Need to Retry -> [3Sum 문제 코드]({{site.url}}/LeetCode-3Sum/#1-code-22-02-13-x)를 가져다 활용하였다.*

``` java
// Runtime: 57 ms
// Memory Usage: 44.7 MB
// Ref : https://leetcode.com/submissions/detail/731596253
class Solution {
    List<List<Integer>> ans = new ArrayList<>();
    Set<List<Integer>> set = new HashSet<>();

    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            threeSum(nums, i, target - nums[i]);
        }

        Iterator<List<Integer>> it = set.iterator();
        while (it.hasNext()) {
            ans.add(it.next());
        }

        return ans;
    }

    public List<List<Integer>> threeSum(int[] nums, int st, long t) {

        for (int i = st + 1; i < nums.length - 2; i++) {
            long target = t + (nums[i] * -1);

            int l = i + 1;
            int r = nums.length - 1;
            while (l < r) {
                int sum = nums[l] + nums[r];

                if (sum < target) {
                    l = leftSkipDupValue(nums, l, r) + 1;
                } else if (sum == target) {
                    set.add(Arrays.asList(nums[st], nums[i], nums[l], nums[r]));
                    l = leftSkipDupValue(nums, l, r) + 1;
                    r = rightSkipDupValue(nums, l, r) - 1;
                } else {
                    r = rightSkipDupValue(nums, l, r) - 1;
                }
            }
            i = leftSkipDupValue(nums, i, nums.length - 1);
        }
        return ans;
    }

    private int leftSkipDupValue(int[] nums, int st, int end) {
        while (st < end) {
            if (nums[st] == nums[st + 1]) {
                st++;
            } else {
                break;
            }
        }
        return st;
    }

    private int rightSkipDupValue(int[] nums, int st, int end) {
        while (st < end) {
            if (nums[end] == nums[end - 1]) {
                end--;
            } else {
                break;
            }
        }
        return end;
    }
}
```

* 문제를 집중해서 풀지 않고 

  빨리 풀어야 하니까 후다닥 풀었다.

  그러다보니 코드가 깔끔하지 않고 다른 정답 코드를 보고 공부하지도 않았다.

---

> Check Point

* **-$10^9$ <= target <= $10^9$**, **-$10^9$ <= nums[i] <= $10^9$**  

  조건 때문에 int 범위를 벗어날 수 있다.

``` java
1. public List<List<Integer>> threeSum(int[] nums, int st, int t) {
2. 
3.    for (int i = st + 1; i < nums.length - 2; i++) {
4.        int target = t + (nums[i] * -1);
5.        ...
6.    }
7. }

nums = [1000000000, 1000000000, 1000000000, 1000000000]
t = -1294967296
target = 2000000000
ref : https://leetcode.com/submissions/detail/731513693
```

* st, target 변수가 int 형이다.

  t(=-1,294,967,296)와 nums\[i\](=1,000,000,000)를 더하면

  -2,294,967,296 값이 되어야 하지만

  int의 범위(-2,147,483,648 ~ 2,147,483,647)를 초과하였으므로 값이 이상해진다.

* 그러므로 long 타입으로 target을 선언해야한다.

---

> Review

* 다음엔 다른 정답 코드들을 보면서 공부하자.

---

### [2] Code (23. 04. 09)

*Need to Retry -> 못풀었다.*

``` java
// 틀린 코드임 ㅠㅠ
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        int length = nums.length;
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < length; i++) {
            map.put(nums[i], map.getOrDefault(nums[i], 0) + 1);
        }

        for (int i = 0; i + 2 < length; i++) {
            int a = nums[i];
            int b = nums[i + 1];

            map.put(a, map.getOrDefault(a, 0) - 1);
            map.put(b, map.getOrDefault(b, 0) - 1);

            int newTarget = target - a - b;
            for (int j = i + 2; j < length; j++) {
                Integer key = map.get(newTarget - nums[j]);
                if (key != null && key > 0) {
                    ans.add(Arrays.asList(a, b, nums[j], newTarget - nums[j]));
                }
            }
            map.put(a, map.getOrDefault(a, 0) + 1);
            map.put(b, map.getOrDefault(b, 0) + 1);
        }

        Set<List<Integer>> set = new HashSet<>();

        for (List<Integer> list : ans) {
            Collections.sort(list);
            set.add(list);
        }

        return new ArrayList<>(set);
    }
}
```

* 총체적 난국의 코드 

* a,b 고정

  i / i+1을 고정으로 생각하면 X

  i 와 i+n의 조합이 정답이 될 수 있음

```
## Input
[-3,-2,-1,0,0,1,2,3]
0

## 누락된 Output
[-3,-1,1,3]

## Ref
https://leetcode.com/submissions/detail/930192223
```

* Int 범위 초과

```
[1000000000,1000000000,1000000000,1000000000]
-294967296

"int newTarget = target - a - b;"
위 코드는 Int의 범위를 초과하게 된다.
이 실수는 저번에도 똑같이 겪었는데 또 똑같은 부분에서 실수를 했다.
```

* nums.length < 4 라면?

```
위 코드는 length가 4보다 작아도 돌아가고 
오히려 이상한 값을 Return 한다.

ref : https://leetcode.com/submissions/detail/930190768
```

* Map의 Value 처리

```
map.put(a, map.getOrDefault(a, 0) - 1);
map.put(b, map.getOrDefault(b, 0) - 1);
a와 b에 대해서는 -1 혹은 +1과 같은 작업을 한다.

for (int j = i + 2; j < length; j++) {
    Integer key = map.get(newTarget - nums[j]);
    if (key != null && key > 0) {
        ...
    }
}
그런데 j에 대해서는 따로 -1 처리를 하지 않는다.

Input : [-3,-1,0,2,4,5] / 0
Output   : [[-3,-1,0,4],[-3,-1,2,2]]
Expected : [[-3,-1,0,4]]
```

---

> Reference Code

**Code 1**

``` java
// Ref : https://leetcode.com/submissions/detail/930197312
class Solution {
    public List<List<Integer>> fourSum(int[] num, int target) {
        ArrayList<List<Integer>> res = new ArrayList<List<Integer>>();
        int n = num.length;
        if (n == 0 || n < 3) {
            return res;
        }
        if (target == -294967296 || target == 294967296) {
            return res;
        }
        if (num == null || num.length == 0) {return res;}

        Arrays.sort(num);

        for (int i = 0; i < n; i++) {
            int target_3 = target - num[i];
            for (int j = i + 1; j < n; j++) {
                int target_2 = target_3 - num[j];

                int front = j + 1;
                int back = n - 1;
                while (front < back) {
                    int two_sum = num[front] + num[back];
                    if (two_sum < target_2) {front++;} else if (two_sum > target_2) {back--;} else {
                        List<Integer> quad = new ArrayList<>();
                        quad.add(num[i]);
                        quad.add(num[j]);
                        quad.add(num[front]);
                        quad.add(num[back]);
                        res.add(quad);
                        
                        // [1] : Processing the duplicates of number 3
                        while (front < back && num[front] == quad.get(2)) {++front;}

                        // [2] : Processing the duplicates of number 4
                        while (front < back && num[back] == quad.get(3)) {--back;}
                    }
                }
                // Processing the duplicates of number 2
                while (j + 1 < n && num[j + 1] == num[j]) {++j;}
            }
            // Processing the duplicates of number 1
            while (i + 1 < n && num[i + 1] == num[i]) {++i;}
        }
        return res;
    }
}
```

* 코드가 굉장히 직관적이다.

* [1],[2] : 이 코드의 목적은 이해가 갔으나 

  *num[front] == quad.get(2)* 코드가 처음에 이해가 가지 않았다가 이해를 했다.

  일단 무조건 1번은 front를 증가시킨다. (ex. do-while)

  그 이후에도 quad.get(2)와 값이 같다면 중복된 값이라 판단하고 front의 중복 값을 제거한다.

---

> Review

* 너무나도 많은 실수가 있었다.

  조건을 꼼꼼하게 생각하지 않고 그냥 풀려고 하다 보니 이런 습관이 들어진 거 같은데

  매우 좋지 않은 습관이니 개선할 필요성을 절실히 느낀다.

  그나마 이런 인지를 하고 있으니 다행이라고 위로를 해보자...

---

### [3] Code (23. 12. 17)

*Need to Retry -> 못풀었다.*

``` java
// 틀린 코드임 ㅠㅠ
// Ref : https://leetcode.com/submissions/detail/1121399082
class Solution {
    private List<List<Integer>> ans = new ArrayList<>();
    private Set<List<Integer>> set = new HashSet<>();

    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        dfs(new ArrayList<>(), nums, target, 0, 0);

        Iterator<List<Integer>> it = set.iterator();
        while (it.hasNext()) {
            ans.add(it.next());
        }
        return ans;
    }

    private void dfs(List<Integer> _ans, int[] nums, int target, int depth, int idx) {
        if (depth == 4) {
            int sum = 0;
            for (int i : _ans) {
                sum += i;
            }
            if (sum == target) {
                set.add(new ArrayList<>(_ans));
            }
            return;
        }

        for (int i = idx; i < nums.length; i++) {
            _ans.add(nums[i]);
            dfs(_ans, nums, target, depth + 1, i + 1);
            _ans.remove(_ans.size() - 1);
        }
    }
}
```

* DFS로 접근해서 풀었다.

  사실 풀면서 이거 시간 초과 뜨겠다 생각했는데

  마땅한 아이디어가 떠오르지 않아서 일단 풀었다.

* 시간 초과 뜬 Case를 정답 코드로 돌려보니 일단 정답은 맞았다. -ㅂ-

* 위 문제를 벌써 3번째 푸는 것이고 

  8개월 전에 풀었을 때도

  아이디어가 떠오르지 않았고 못 풀었음에 스스로 실망감이 크다.

* 이번에 다른 사람 코드를 보다 보니 

  너무 깔끔하고 직관적이고 위 참조했던 코드들보다 훨씬 좋아서

  좋은 경험이었다 스스로 위안을 삼도록 하자.


---

> Reference Code

**Code 1**

``` java
// Runtime: 14 ms
// Memory Usage: 44.4 MB
// Ref : https://leetcode.com/submissions/detail/1121587605
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> output = new ArrayList<>();
        for (int i = 0; i < nums.length - 3; i++) {  // [1]
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            for (int j = i + 1; j < nums.length - 2; j++) { // [2]
                if (j > i + 1 && nums[j] == nums[j - 1]) {
                    continue;
                }

                long t = (long) target - nums[i] - nums[j]; // [3]

                int k = j + 1;
                int l = nums.length - 1; 

                while (k < l) {
                    if (nums[k] + nums[l] == t) {
                        output.add(Arrays.asList(nums[i], nums[j], nums[k], nums[l]));
                        while (k < l && nums[k] == nums[k + 1]) {k++;}
                        while (k < l && nums[l] == nums[l - 1]) {l--;}
                        k++;
                        l--;
                    } else if (nums[k] + nums[l] > t) {
                        l--;
                    } else {
                        k++;
                    }
                }
            }
        }
        return output;
    }
}
```

* 위 아이디어는 2개의 값(i,j)을 고정하고

  나머지 2개 값을
  
  남은 범위에서 Left, Right 값을 지정하여
  
  2-Pointer로 접근해서 풀어나가는 문제다.

* [1] : 2개의 값을 고정하는데 

  그중 가장 작은 값(=i변수)을 고정한다.

  그리고 [2]번 for문에서 나머지 3개를 찾으므로

  [1]번 for문 에서는 length-3까지만 순회를 하면 된다.

* [2] : i 값은 고정되었고 이제 j 값을 고정한다.

  그리고 [2]번 for문 내부에서

  k와 l 변수를 설정하여 

  정답을 만족하는 2개의 값을 찾게 된다.

  [1,2,3,...,4]가 있을 때

  i=0, j=1, k=2, l=n-1 값으로 index를 설정하고

  k 변수는 증가, l 변수는 감소시키면서

  조건을 충족하는 답을 찾는다고 생각하면 된다.

  그러니까 j변수는 length-2까지만 돌면 된다.

* [3] : [22년 6월 26일]({{site.url}}/LeetCode-4Sum/#1-code-22-06-26)에 풀었던 코드에 *Check Point*를 참고하자.


---

## Reference

* [18. 4Sum](https://leetcode.com/problems/4sum)