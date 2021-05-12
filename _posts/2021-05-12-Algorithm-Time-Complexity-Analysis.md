---
layout: post
title:  " 알고리즘 시간 복잡도 마스터하기 feat. 마스터 정리(Master Theorem) "
categories: Algorithm
author: goodGid
use_math: true
---
* content
{:toc}

## 마스터 정리

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_1.png)

* 마스터 정리는(Master Theorem)는 

  **재귀식**으로 표현된 알고리즘의 시간 복잡도를 간단하게 계산하는 방법이다.

* 증명은 매우 어려우니 패스하고 다양한 예제에 적용시켜보자 !



## Example

### 재귀식에 마스터 정리 적용하기

> T(n) = 8 * T($\frac{n}{4}$) + 5 * $n^2$

* $a = 8$

  $b^k = 4^2$

  => $a < b^k$

  => $O(N^2)$

---

> T(n) = 8 * T($\frac{n}{2}$) + 5 * $n^3$

* $a = 8$

  $b^k = 2^3$

  => $a = b^k$
  
  => $O(N^3 * \log_2 N)$

---

> T(n) = 9 * T($\frac{n}{3}$) + 5 * n

* $a = 9$

  $b^k = 3^1$

  => $a > b^k$

  => $O(N^{\log_3 9}) = O(N^{\log_3 3^2}) = O(N^2)$


### 합병 정렬 (Merge Sort)

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_2.png)

* $T(n) = 2 * T(\frac{n}{2}) + n$

* $a = 2$

  $b^k = 2^1$

  => $a = b^k$

  => $O(n^1 * \log_2 N) = O(n * \log_2 N)$




### 입력 크기에 따른 실행 횟수의 변화가 다양한 경우

> 문제 5

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_5.png)

* 1번째 for loop를 보면

  $i = 1, 2, 4, 8, ... , N$

  2배씩 증가하므로 $\log_2 N$이다.

* 2번째 for loop를 보면

  $i = n, n/2, ... 1$

  2배씩 나누어지므로 $\log_2 N$이다.

* 그래서 시간 복잡도는 $O(\log_2 N + \log_2 N) = O(\log_2 N)$이다.




### 입력 크기의 변수가 여러 개인 경우

> 문제 6

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_6.png)

i변수를 다루는 for loop는 n번 돈다.

j변수를 다루는 for loop는 2배씩 증가하므로 $\log2 M$번 돈다.

그러므로 시간 복잡도는 $O(n * \log2 M)$이다.




### 복잡한 복잡도 문제 풀어보기

> 문제 8

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_8.png)

* $i^2 <= n$

  = $i <= \sqrt{x}$

* $s = 1 + 2 + 3 + ... + \sqrt{x}$

  = $O(\sqrt{x})$

---

> 문제 9

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_9.png)

* $s = 1 + 2 + ... + k <= n$

  = $\frac{k*(k+1)}{2} <= n$

  = $k^2 <= n$

  = $k <= \sqrt{n}$

  = $O(\sqrt{x})$

---

> 문제 10

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_10.png)

* i = 1 -> n번

  i = 2 -> n-1번

  i = k -> n-(k-1)번

  i = n -> 1번

* $s = 1 + 2 + 3 + ... + n$

  = $\frac{n*(n+1)}{2}$

  = $O(n^2)$

---

> 문제 11

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_11.png)

* i = 1 -> n번

  i = 2 -> n/2번

  i = 3 -> n/3번

  i = n -> n/n = 1번

* $n + \frac{n}{2} + \frac{n}{3} + ... + + \frac{n}{n}$

  = $n * (1 + \frac{1}{2} + \frac{1}{3} + ... + \frac{1}{n})$

  = $n * \log_2 N$

---

> 문제 12

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_12.png)

* $T(0) = 1$

  $T(n) = 3 * T(n-1)$

  = 3 * 3 * T(n-2)$

  = 3 * 3 * 3 * T(n-3)$

  = 3 * 3 * ... 3 * T(0)$

  = $3^n * T(0)$

  = $O(3^n)$

---

> 문제 13

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_13.png)

* $T(0) = 1$

  $T(n) = 3 * T(\frac{n}{3}) + n^k$

  // T(n)이 마스터 정리 형태이므로 마스터 정리를 적용한다.

  여기서 k는 0이다.

* $a = 3$

  $b^k = 3^0 = 1$

  => $a > b^k$

  => $O(N^{\log_3 3}) = O(N)$

---

> 문제 14
  
![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_14.png)

* $T(0) = 1$

  $T(n) = 8 * T(\frac{n}{2}) + n^k$

  // T(n)이 마스터 정리 형태이므로 마스터 정리를 적용한다.

  여기서 k는 0이다.

* $a = 8$

  $b^k = 2^0 = 1$

  => $a > b^k$

  => $O(N^{\log_2 8}) = O(N^3)$

---

> 문제 15

![](/assets/img/algorithm/Algorithm-Time-Complexity-Analysis_15.png)

* $T(0) = 1$

  $T(n) = 8 * T(\frac{n}{2}) + n^3$

  // T(n)이 마스터 정리 형태이므로 마스터 정리를 적용한다.

  재귀 호출 이후에 for문이 3번 있으므로 k는 3이다. 

* $a = 8$

  $b^k = 2^3$

  => $a = b^k$

  => $O(N^3 * {\log_2 N})$

---

## Summary

* 시간 복잡도를 구하는 건 쉽지 않다.

  특히나 재귀일 경우엔 더더욱 어렵다.

* 하지만 우리에겐 **마스터 정리**가 있으니

  이론을 잘 활용하여 시간 복잡도를 간편하게 구해보도록 하자.



---

## Reference

* [알고리즘 복잡도 뽀개기: 1. 복잡도 분석 문제와 해설](https://www.youtube.com/watch?v=alHBRp704l8&list=PLHqxB9kMLLaO2Zxb5exYYcN-Tin5pE-sK&index=1)

* [알고리즘 복잡도 뽀개기: 2. 재귀 함수와 마스터 정리](https://www.youtube.com/watch?v=-bm0-k7UeV8&list=PLHqxB9kMLLaO2Zxb5exYYcN-Tin5pE-sK&index=2)

* [알고리즘 복잡도 뽀개기: 3. 복잡한 복잡도 문제 풀어보기](https://www.youtube.com/watch?v=hi_vqyh1vys&list=PLHqxB9kMLLaO2Zxb5exYYcN-Tin5pE-sK&index=3)