---
layout: post
title:  " LeetCode : 412. Fizz Buzz "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [412. Fizz Buzz](https://leetcode.com/problems/fizz-buzz/)

### Problem

```
Write a program that outputs the string representation of numbers from 1 to n.
But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. 
For numbers which are multiples of both three and five output “FizzBuzz”.
```
 
---

### Example

```
n = 15,

Return:
[
    "1",
    "2",
    "Fizz",
    "4",
    "Buzz",
    "Fizz",
    "7",
    "8",
    "Fizz",
    "Buzz",
    "11",
    "Fizz",
    "13",
    "14",
    "FizzBuzz"
]
```

---

### Code (20. 11. 14)

``` java
public List<String> fizzBuzz(int n) {
    List<String> ans = new ArrayList<>();
    for (int i = 1; i <= n; i++) {
        ans.add(getString(i));
    }
    return ans;
}

private String getString(int i) {

    String fizz = "Fizz";
    String buzz = "Buzz";
    String fizzBuzz = "FizzBuzz";

    if (i % 3 == 0 && i % 5 == 0) {
        return fizzBuzz;
    } else if (i % 3 == 0) {
        return fizz;
    } else if (i % 5 == 0) {
        return buzz;
    } else {
        return String.valueOf(i);
    }
}
```

* 너무 Easy한 문제


---

## Reference

* [412. Fizz Buzz](https://leetcode.com/problems/fizz-buzz/)
