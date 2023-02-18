---
layout: post
title:  " LeetCode : 680. Valid Palindrome II "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [680. Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii)

### Problem

```
Given a string s, return true if the s can be palindrome after deleting at most one character from it.
```


---

### Example

```
Input: s = "abca"
Output: true
```

---

### [1] Code (22. 05. 02)

*Need to Retry -> 아이디어는 떠올렸는데 시간복잡도 때문에 틀리지 않을까란 생각에 실패*

``` java
// Runtime: 6 ms
// Memory Usage: 42.6 MB
// Ref : https://leetcode.com/submissions/detail/691007310
class Solution {
    public boolean validPalindrome(String s) {
        return check(s, 0, s.length() - 1, false);
    }

    private boolean check(String s, int l, int r, boolean removed) {
        if (l > r) {
            return true;
        }

        while (l <= r) {
            if (s.charAt(l) == s.charAt(r)) {
                l++;
                r--;
            } else {
                if (removed) {
                    return false;
                }
                break;
            }
        }
        return check(s, l + 1, r, true) || check(s, l, r - 1, true);
    }
}
```

---

> Review

* 처음에 아이디어를 떠올렸는데 시간복잡도에서 터지지 않을까?란 생각 때문에 풀이를 포기했다.

  그래서 정답 코드를 보니 내 아이디어랑 같았다.

  시간 복잡도 계산에 대해 다시 학습해야겠다.

---

### [2] Code (23. 02. 18) (x)

``` java
// Runtime: 8 ms
// Memory Usage: 42.8 MB
// Ref : https://leetcode.com/submissions/detail/900218354
class Solution {
    public boolean validPalindrome(String s) {
        return valid(s.toCharArray(), 0, s.length()-1, true);
    }
    
    private boolean valid(char[] s, int left, int right, boolean isSkipable) {
        boolean ans = true;
        while (left < right) {
            if (s[left] == s[right]) {
                left ++;
                right --;
            } else if (isSkipable == false) {
                return false;
            } else {
                return valid(s,left+1,right,false) || valid(s,left,right-1,false);
            }
        }
        return ans;
    }
}
```

* 이렇게 재귀를 돌려도 될까? 란 생각이 들었지만 일단 Try했다.

* 풀고 다른 코드를 보면서 시간복잡도를 생각해보니 $O(N)$ 시간이엿다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 8 ms
// Memory Usage: 42.7 MB
// Ref : https://leetcode.com/submissions/detail/900219390
class Solution {
    public boolean validPalindrome(String s) {
        int i = 0;
        int j = s.length() - 1;
        
        while(i <= j){
            if(s.charAt(i) == s.charAt(j)){
                i++;
                j--;
            }
            else return isPalindrome(s, i + 1, j) || isPalindrome(s, i, j - 1);
        }
        return true;
    }
    public boolean isPalindrome(String s, int i, int j){
        while(i <= j){
            if(s.charAt(i) == s.charAt(j)){
                i++;
                j--;
            }
            else return false;
        }
        return true;
    }
}
```

* validPalindrome( )에서 valid 체크를 하다 어긋나면

  isPalindrome( )를 호출한다.

* 굳이 재귀함수를 돌리지 않고

  이미 1번 Skip 찬스를 사용했으므로 isPalindrome( )만으로도 정답을 알아낼 수 있다.

---

## Reference

* [680. Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii)