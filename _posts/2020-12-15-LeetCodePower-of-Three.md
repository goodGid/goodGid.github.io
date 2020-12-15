---
layout: post
title:  " LeetCode : 326. Power of Three "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [326. Power of Three](https://leetcode.com/problems/power-of-three/)

### Problem

```
Given an integer n, return true if it is a power of three. Otherwise, return false.
An integer n is a power of three, if there exists an integer x such that n == 3x.
-231 <= n <= 231 - 1
```




---

### Example

```
Input: n = 27
Output: true
```

---

### [1] Code (20. 12. 15)

``` java
class Solution {
    public boolean isPowerOfThree(int n) {
        if (n <= 0) {
            return false;
        }
        if (1162261467 % n == 0) {
            return true;
        }
        return false;
    }
}
```

* 5분이면 풀겠네 하고 접근했다가 큰코다쳤다.

  일단 2가지 예외처리가 필요했다.

---

1. n == 0일 경우

2. n < 0일 경우

---

* 그리고 처음에 생각한 아이디어가 잘못됐었다.

```
1. 2^31-1을 구한다. (= a)
2. a부터 낮은 순으로 3으로 나뉘는 값을 구한다. (= b)
3. 주어진 n 값으로 b를 나눴을 때 나머지가 0이면 그 값은 3의 제곱 값이다.
```

* 결론적으로 여기서 2번 접근이 잘못됐다.

  우선 1번의 결괏값 부터 확인해보자.

``` java
long pow = (long)Math.pow(2, 31);
// pow = 2147483648
// pow-1 = 2147483647 --> n의 max 범위
```

* 그리고 2번과 같이 접근하면 잘못되는 예제를 보자.

```
3 9 27은 3의 제곱이다.
하지만 위 논리대로 하면 
24(= 3*8) 값이 3의 제곱으로 판별된다.
```

``` java
for (int i = 2147483647; i >0 ; i--) {
    if (i % 3 == 0){
        System.out.println(i); // 2147483646 = (3 * 715827882) --> 잘못된 값
        break;
    }
}
```

* 잘못된 2번 로직을 다음과 같이 수정한다.

  3^0부터 3을 곱하는 과정을 a보다 작을 때까지 loop를 돌린다.


``` java
long aa = 1; // int는 범위를 초과한다.
for (int i = 0; i < 100; i++) {
    aa = aa * 3;
    if (aa > 2147483647){
        break;
    }
    System.out.println(aa); // 1162261467
}
```

* 2147483646와

  1162261467는 값이 다름을 알 수 있다.

* 이제 1162261467과 주어진 n을 나눴을 때 

  나머지가 0이면 주어진 n은 3의 제곱이다.

  (= 3^3 % 3^2 == 0 과 같은 논리 )

* 다만 여기서 주의해야 하는 게 2가지 경우에 대한 처리이다.

  (n == 0일 경우) or (n < 0일 경우)

* 우선 n == 0일 경우엔 나머지 연산자를 하면 안 되므로 예외 처리를 해준다.

  그리고 3의 제곱은 음수 값을 가질 수 없다.

  그러므로 n < 0일 경우에도 예외처리를 해준다.



---

## Summary

* 어렵진 않았는데 왜 틀리지? 라는 고민이 많았던 문제이다.

  그리고 다른 제출 코드를 보니 나와 똑같은 실수한 사람들도 보였다.

``` java
class Solution {
    public boolean isPowerOfThree(int n) {   
        // return n > 0 && 2147483646%n==0;
        return n > 0 &&    1162261467%n==0;
    }
}
```




---

## Reference

* [326. Power of Three](https://leetcode.com/problems/power-of-three/)