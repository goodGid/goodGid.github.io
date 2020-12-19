---
layout: post
title:  " LeetCode : 204. Count Primes "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [204. Count Primes](https://leetcode.com/problems/count-primes/)

### Problem

```
Count the number of prime numbers less than a non-negative number, n.
```





---

### Example

```
Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
```

---

### [1] Code (20. 12. 19)

> Runtime : 21 ms

``` java
class Solution {
    public int countPrimes(int n) {

        int[] arr = new int[n];

        for (int i = 1; i < n; i++) {
            arr[i] = 1;
        }

        for (int i = 2; i < n; i++) {
            if (arr[i] == 0) {
                continue;
            }

            for (int j = i * 2; j < n; j += i) {
                arr[j] = 0;
            }
        }

        int ans = 0;
        for (int i = 2; i < n; i++) {
            if (arr[i] != 0) {
                ans++;
            }
        }
        return ans;
    }
}
```

* 소수문제 = **에라토스체네스**로 풀면 된다.

  아이디어에 대한 설명은 다음과 같다.


``` java
for (int i = 2; i <= n; i++){
    if (arr[i] == 0){
        continue;
    }
    /*
    소수의 배수들은 무조건 소수가 아니다.
    ex) 3일 경우
    3의 배수 6,9,12,15 등등
    (= 소수 x 2,3,4,5 등등 )
    그렇기 때문에
    j에는 소수인 i의 2배값을 넣어주고
    j += i 를 해줌으로써 배수들을 다 제거해준다.
    */
    for (int j = i + i; j <= n; j += i){
        arr[j] = 0;
    }
}
```


---


### [2] Code (20. 12. 19)

> Runtime : 13 ms

``` java
class Solution {
    public int countPrimes(int n) {
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true);

        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (isPrime[i]) {
                for (int j = 2; j * i <= n; j++) {
                    isPrime[j * i] = false;
                }
            }
        }

        int count = 0;
        for (int i = 2; i < n; i++) {
            if (isPrime[i]) { 
                count++; 
            }
        }

        return count;
    }
}
```

* [1]과 같은 아이디어이지만 

  n까지 for loop을 돌리는 게 아니라

  **Math.sqrt( n )**까지만 돌린다.

```
|------------------|-------------------|
1                 100                10000
 <------(A)------->  <------(B)------->

위와 같다고 하면 
Math.sqrt(10000) = 100

10000을 만들기 위해서
A 구역에 있는 10과
B 구역에 있는 1000을 곱해야 한다.

10000을 만들기 위해서
A 구역에 있는 50과
B 구역에 있는 200을 곱해야 한다.

이처럼 100을 기준으로
좌(=A) * 우(=B)를 해야지 10000 값이 나온다.

다시 말해 A까지만 계산해도 된다는 걸 알 수 있다.
그러므로 Math.sqrt(n)까지만 for loop를 돌려도 된다.
```


---

### [3] Code (20. 12. 19)

> Runtime : 7 ms

``` java
class Solution {
    public int countPrimes(int n) {
        if (n < 3) {
            return 0;
        }

        if (n <= 3) {
            return 1;
        }

        boolean[] notPrime = new boolean[n];
        int count = 1;
        for (int i = 3; i < n; i += 2) { // [1] 
            if (notPrime[i] == false) {
                count++;
                for (int j = 3; i * j < n; j += 2) { // [2]
                    notPrime[i * j] = true;
                }
            }
        }
        return count;
    }
}
```

* 위 알고리즘은 다른 알고리즘에 비해 Runtime 시간이 적게 소요된다.

  즉 가장 효율적이다.

* [3] 알고리즘의 아이디어는 다음과 같다.

  모든 숫자는 홀수 아니면 짝수이다.

  그런데 2를 제외한 모든 짝수는 어차피 소수가 안 된다.

  그러므로 [1]을 보면 3부터 시작해서 +2를 해준다.

  (= 홀수만 처리할 것이다.)

  동시에 2를 Skip 했으므로 *count = 1* 로 설정해준다.

  그런 다음 3부터 시작하는 홀수들에 대해서 작업을 해준다.

```
3 x 3    5 x 3    7 x 3
  x 5      x 5      x 5
  x 7      x 7      x 7
  x 9      x 9      x 9

- 우측에 2,4,6과 같은 짝수를 곱해주지 않는 이유는 
  짝수는 이미 제외하고 보기로 하였기 때문이다.
ex) 3 x 2
      x 4
      x 6
```

---

## Reference

* [204. Count Primes](https://leetcode.com/problems/count-primes/)