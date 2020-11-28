---
layout: post
title:  " Java 진법 다루기 : 2진수, 8진수, 10진수, 16진수 "
categories: Java
author: goodGid
---
* content
{:toc}

## 진법

### 주어진 숫자를 원하는 진수로 읽기

``` java
System.out.println(Integer.valueOf(String.valueOf(101), 2));
System.out.println(Integer.valueOf(String.valueOf(101), 8));
System.out.println(Integer.valueOf(String.valueOf(101), 10));
System.out.println(Integer.valueOf(String.valueOf(101), 16)); // 16 * 16 = 256

/*
5
65
101
257
*/
```



---

### 2,8,10,16 진수 입력 받기

``` java
public int print(int n){
    return n;
}

System.out.println("=== 2진수 (0b) ===");
System.out.println("0b01 : " + print(0b01));
System.out.println("0b10 : " + print(0b10));

System.out.println("=== 8진수 (0) ==");
System.out.println("001 : " + print(001));
System.out.println("010 : " + print(010));

System.out.println("=== 10진수 ==");
System.out.println("1011 : " + print(1011));
System.out.println("1001 : " + print(1001));
System.out.println("1010 : " + print(1010));

System.out.println("=== 16진수 (0x) ==");
System.out.println("0x01 : " + print(0x01));
System.out.println("0x10 : " + print(0x10));


## Output
=== 2진수 (0b) ===
0b01 : 1
0b10 : 2
=== 8진수 (0) ==
001 : 1
010 : 8
=== 10진수 ==
1011 : 1011
1001 : 1001
1010 : 1010
=== 16진수 (0x) ==
0x01 : 1
0x10 : 16
```

---


### 10 진수 -> 2,8,16 진수 

``` java
int i = 10;
String binaryString = Integer.toBinaryString(i); // 2진수
String octalString = Integer.toOctalString(i);   // 8진수
String hexString = Integer.toHexString(i);       // 16진수

System.out.println("Input : 10");
System.out.println("2진수 (binaryString) : " + binaryString);
System.out.println("8진수 (octalString) : " + octalString);
System.out.println("16진수 (hexString) : " + hexString);

## Output
Input : 10
2진수 (binaryString) : 1010
8진수 (octalString) : 12
16진수 (hexString) : a
```