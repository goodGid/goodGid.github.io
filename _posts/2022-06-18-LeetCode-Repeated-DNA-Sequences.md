---
layout: post
title:  " LeetCode : 187. Repeated DNA Sequences "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [187. Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences)

### Problem

```
The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.

For example, "ACGAATTCCG" is a DNA sequence.
When studying DNA, it is useful to identify repeated sequences within the DNA.

Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.
```


---

### Example

```
Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]
```

---

### [1] Code (22. 06. 18)

*Need to Retry -> 아이디어 + 적절한 자료구조를 떠올리지 못했다.*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 28 ms
// Memory Usage: 65.2 MB
// Ref : https://leetcode.com/submissions/detail/725159551
class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        Set seen = new HashSet(), repeated = new HashSet();
        for (int i = 0; i + 9 < s.length(); i++) {
            String ten = s.substring(i, i + 10);
            if (!seen.add(ten)) {repeated.add(ten);}
        }
        return new ArrayList(repeated);
    }
}
```

* ref : [7 lines simple Java, O(n)](https://leetcode.com/problems/repeated-dna-sequences/discuss/53855/7-lines-simple-Java-O(n))

---

**Code 2**

``` java
// Runtime: 97 ms
// Memory Usage: 48.8 MB
// Ref : https://leetcode.com/submissions/detail/725160469

class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        List<String> list = new ArrayList<String>();
        if (s == null || s.length() < 10) {return list;}
        HashMap<Integer, Boolean> map = new HashMap<Integer, Boolean>();

        for (int i = 0; i + 10 <= s.length(); i++) {
            int hash = stringToHash(s.substring(i, i + 10));
            // int hash = stringToHash2(s.substring(i, i + 10));
            if (map.containsKey(hash)) {
                if (!map.get(hash)) {
                    list.add(s.substring(i, i + 10));
                    map.put(hash, true);
                }
            } else {
                map.put(hash, false);
            }
        }
        return list;
    }

    private int stringToHash(String s) {
        String numberBuilder = "";
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == 'A') {numberBuilder += "0";}
            if (s.charAt(i) == 'C') {numberBuilder += "1";}
            if (s.charAt(i) == 'G') {numberBuilder += "2";}
            if (s.charAt(i) == 'T') {numberBuilder += "3";}
        }
        return Integer.parseInt(numberBuilder, 4);
    }

    private int stringToHash2(String s) {
        int numberBuilder = 0;
        for (int i = 0; i < s.length(); i++) {
            numberBuilder *= 4; // [1]
            if (s.charAt(i) == 'A') {
                numberBuilder += 0;
            } else if (s.charAt(i) == 'C') {
                numberBuilder += 1;
            } else if (s.charAt(i) == 'G') {
                numberBuilder += 2;
            } else if (s.charAt(i) == 'T') {
                numberBuilder += 3;
            }
        }
        return numberBuilder;
    }
}
```

* [1] : 4를 곱해주는 이유는 문제에서 나올 수 있는 경우의 수는 총 4가지(A,C,G,T)이다.

  그러므로 2bit로 1개의 String을 표현하기 위해 4를 곱해준다.

* 시간/공간 복잡도가 좋진 않지만 hash 값을 구하는 로직 위주로 살펴보자.

* ref : [Accepted Java easy to understand solution](https://leetcode.com/problems/repeated-dna-sequences/discuss/53980/Accepted-Java-easy-to-understand-solution)

---

> Review

* 처음에 2 포인터를 생각했으나 아님을 깨달았고

  뭐가 적절하지?란 고민을 하였으나 떠오르지 않았다.

---

### [2] Code (23. 03. 26)

*Need to Retry -> 재밌게 풀었다. 기분 좋게 다시 풀어보자.*

``` java
// Runtime: 18 ms
// Memory Usage: 51.3 MB
// Ref : https://leetcode.com/submissions/detail/922242735
class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        HashSet<String> set = new HashSet<>();
        List<String> list = new ArrayList<>();

        int length = s.length();
        if (length < 10) {
            return list;
        }

        for (int i = 0, j = 10; j <= length; i++, j++) {
            String substring = s.substring(i, j);
            if (set.contains(substring)) {
                list.add(substring);
            } else {
                set.add(substring);
            }

        }
        return list.stream().distinct().collect(Collectors.toList()); // [1]
    }
}
```

* 10개 단위로 Substring 값을 구한 후 Hash를 이용한다.

* [1] : List에 중복 제거를 위해 굳이 Stream을 사용하지 않고

  "[Code (22. 06. 18) -> Reference Code 1]({{site.url}}/LeetCode-Repeated-DNA-Sequences/#1-code-22-06-18)"를 보면 간단하게 요구사항을 충족시킬 수 있다.

  ``` java
  Set repeated = new HashSet();
  ...
  return new ArrayList(repeated);
  ```

---

## Reference

* [187. Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences)