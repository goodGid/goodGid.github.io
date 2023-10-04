---
layout: post
title: " LeetCode : 767. Reorganize String "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [767. Reorganize String](https://leetcode.com/problems/reorganize-string)

### Problem

```
Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.
Return any possible rearrangement of s or return "" if not possible.
```


---

### Example

```
Input: s = "aab"
Output: "aba"
```

---

### [1] Code (23. 10. 03)

*Need to Retry -> 시간이 오래 걸림 + 로직이 깔끔하지 않음*

``` java
// Runtime: 3 ms
// Memory Usage: 40.7 MB
// Ref : https://leetcode.com/submissions/detail/1065078163
class Solution {
    public String reorganizeString(String s) {
        char[] arr = s.toCharArray();
        int size = s.length();
        Map<Character, Integer> map = new HashMap<>();
        PriorityQueue<Node> pq = new PriorityQueue<>((o1, o2) -> o2.getValue() - o1.getValue());

        if (size == 3) {
            if (arr[0] == arr[1] && arr[1] == arr[2]) {
                return "";
            }
            for (int i = 0; i < 3; i++) {
                map.put(arr[i], map.getOrDefault(arr[i], 0) + 1);
            }
            for (Character key : map.keySet()) {
                Integer i = map.get(key);
                pq.add(new Node(key, i));
            }
        } else {
            int maxCnt = 0;
            for (char c : arr) {
                map.put(c, map.getOrDefault(c, 0) + 1);
            }
            for (Character key : map.keySet()) {
                Integer i = map.get(key);
                pq.add(new Node(key, i));
            }

            if (size % 2 == 1 && pq.peek().cnt > size / 2 + 1) { // [1]
                return "";
            }

            if (size % 2 == 0 && pq.peek().cnt > size / 2) { // [1]
                return "";
            }
        }

        char[] ans = new char[size];
        int idx = 0;
        while (!pq.isEmpty()) {
            Node node = pq.poll();
            for (int i = 0; i < node.cnt; i++) {
                ans[idx] = node.c;
                idx = idx + 2;
                if (idx >= size) {
                    idx %= size;
                    if (idx % 2 == 0) { // [1]
                        idx++;
                    }
                }
            }
        }
        return String.valueOf(ans);
    }

    class Node {
        char c;
        int cnt;
        public Node(char _c, int _cnt) {
            c = _c;
            cnt = _cnt;
        }
        public int getValue() {
            return this.cnt;
        }
    }
}
```

* "제출 -> 틀림 -> 수정해서 제출" 이런 과정을 거치다 보니

  코드가 더러워지고

  특히 [1]처럼 홀/짝에 대해 
  
  if문으로 대응하다 보니 더더욱 더러워지고 마음에 들지 않는 코드가 되었다.

* 코드 제출 후 다른 정답 코드를 보면서 공부를 하는데

  굉장히 깔끔하고 마음에 드는 [코드](https://leetcode.com/submissions/detail/1065143607)를 찾았다.

  참고 : Reference Code -> Code 1

* 그리고 참고한 코드를 기반으로 [리팩토링](https://leetcode.com/submissions/detail/1065157372)을 해봤다.

  1. 중복 코드 제거

  2. 홀짝 코드 로직 개선

  3. idx 값이 범위 초과 시 로직 수정

---

> Reference Code

**Code 1**

``` java
// Runtime: 0 ms
// Memory Usage: 40.4 MB
// Ref : https://leetcode.com/submissions/detail/1065143607
// ref : 정답 코드 중 Runtime 효율 1위 블록 참고
class Solution {
    public String reorganizeString(String s) {
        int[] freq = new int[26]; //to Store Frequency of each alphabet
        char[] arr = s.toCharArray();

        for (int i = 0; i < arr.length; i++) {  //store the frequency
            freq[arr[i] - 'a']++;
        }

        int max = 0, letter = 0;
        for (int i = 0; i < 26; i++) {  //find the max frequency
            if (freq[i] > max) {
                max = freq[i];
                letter = i;
            }
        }

        if (max > (s.length() + 1) / 2) { // [1]
            return ""; //if max is more than half then not possible
        }

        int idx = 0;
        char[] res = new char[s.length()];

        //distribute the max freq char into even indices
        while (freq[letter] > 0) { // [2]
            res[idx] = (char) (letter + 'a');
            idx += 2;
            freq[letter]--;
        }

        for (int i = 0; i < 26; i++) {
            while (freq[i] > 0) { // [3]
                if (idx >= s.length()) { // [4]
                    idx = 1; //all even indices filled, so switch to odd indices
                }
                res[idx] = (char) (i + 'a');
                idx += 2;
                freq[i]--;
            }
        }
        return String.valueOf(res);
    }
}
```

* [1] : 내가 풀었던 코드에서 홀/짝을 분기하기 위해 어렵게 구현했던 로직을 매우 나이스하게 구현할 수 있다.

* [2] : 최초에는 idx=0부터 해서 2칸씩 값을 지정한다.

* [3] : PriorityQueue를 사용할 필요 없다. 

  왜냐면 어차피 최대 값만 찾고 나머지 부분엔 굳이 많이 나온 값 순서로 넣을 필요가 없기 때문이다.

* [4] : input 보다 커질 경우 idx 값을 수정해 준다.

---

> Review

* 오랜만에 알고리즘을 풀었는데 재밌었고 언제 성장하나라는 생각이 많이 들었다.

---

## Reference

* [767. Reorganize String](https://leetcode.com/problems/reorganize-string)