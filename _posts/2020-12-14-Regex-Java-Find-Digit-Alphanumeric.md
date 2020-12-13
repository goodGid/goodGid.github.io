---
layout: post
title:  " [Java] 정규 표현식(Regex)으로 [숫자 / 소문자 / 대문자]를 찾아보자. "
categories: Regex
author: goodGid
---
* content
{:toc}

## Regex

* Java 언어를 사용하여 개발하다 보면 

  "숫자 / 영어 소문자 / 영어 대문자" 를 찾아내는 상황을 자주 접한다.

  그런 상황에 유용하게 쓸 수 있는 다양한 코드들을 정리해 보았다.




---

### 영어 소문자만 추출

``` java
private boolean isAlphanumeric(char c) {
    // a(97) ~ z(122)
    if (c >= 97 && c <= 122) {
        return true;
    }
    return false;
}
```


---


### 영어 대문자만 추출

``` java
private boolean isAlphanumeric(char c) {
    // A(65) ~ Z(90)
    if (c >= 65 && c <= 90) {
        return true;
    }
    return false;
}
```

---

### 문자 혹은 숫자 체크

* Character.isLetterOrDigit

``` java
System.out.println(Character.isLetterOrDigit('ㄱ')); // true
System.out.println(Character.isLetterOrDigit('a')); // true
System.out.println(Character.isLetterOrDigit('A')); // true
System.out.println(Character.isLetterOrDigit('1')); // true

System.out.println(Character.isLetterOrDigit(',')); // false
System.out.println(Character.isLetterOrDigit('#')); // false
```

---

### String 함수의 정규 표현식 사용하기

``` java
string.replaceAll("[^0-9a-zA-Z]", "");
```

<br>

> Example

``` java
String s1 = "A,b c*d";
String s2 = "A,b c*d";
String s3 = "A,b c*d";

// [1]
s1 = s1.replaceAll("[^0-9a-zA-Z]", "");
System.out.println(s1); // Abcd

// [2]
s2 = s2.replaceAll("^[0-9a-zA-Z]", "");
System.out.println(s2); // ,b c*d

// [3]
s3 = s3.replaceAll("[0-9a-zA-Z]", "");
System.out.println(s3); // , *
```

* [1]

  --> [^0-9a-zA-Z] = "0-9a-zA-Z"가 아닌 것들을 찾는다.

  --> [ ] 대괄호 안에 있는 **^**는 부정(Not)이다.

* [2]

  --> 대괄호([ ])앞에 **^**가 붙어있으므로 가장 앞글자(=A)만 체크한다.

* [3]

  --> [0-9a-zA-Z] = "0-9a-zA-Z"인 것들을 찾는다.

* 정규 표현식(Regex) 개념에 대해서는 [Java Regular Expressions](https://www.w3schools.com/java/java_regex.asp) 글을 참고하자.


---

### Pattern

``` java
private boolean isAlphanumeric(char c) {
    String regex = "[^a-zA-Z0-9]+$";
    Pattern pattern = Pattern.compile(regex);
    return pattern.matcher(String.valueOf(c)).matches();
}
```

<br>

> Example

``` java
System.out.println(isAlphanumeric('1')); // false
System.out.println(isAlphanumeric('a')); // false
System.out.println(isAlphanumeric('A')); // false

System.out.println(isAlphanumeric(',')); // true
System.out.println(isAlphanumeric('-')); // true
System.out.println(isAlphanumeric('#')); // true
```

* n+ : Matches any string that contains at least one n

  $ : Finds a match at the end of the string as in: World$

  ref : [Quantifiers](https://www.w3schools.com/java/java_regex.asp)

---

## Reference

* [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)