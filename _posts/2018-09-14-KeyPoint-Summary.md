---
layout: post
title:  " Key Point 모음 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## [10진수 -> 2진수 변환]({{site.url}}/Change-JinBub/#10진수---2진수-변환)

``` cpp
 int tenConvertTwo(int num){
    int result = 0;
    for(int i=1; num>0; i*=10){
        int tmp = num % 2;
        result += tmp * i;
        num /= 2;
    }
    return result;
  }

```






---

## [2진수 -> 10진수 변환]({{site.url}}/Change-JinBub/#2진수---10진수-변환)

``` cpp

int twoConvertTen(int num){
    int result = 0;
    for(int i=1; num>0; i*=2){
        int tmp = num % 2;
        result += tmp * i;
        num /= 10;
    }
    return result;
}
```


---

## [GCD & LCM]({{stie.url}}/Gcd-Lcm/#3-gcd--lcm-code)

``` cpp
void gcdlcm(int a,int b){
    if(a > b){
        swap(a,b);
    }
    
    for(int i = a; i > 0; i--){
        if(((a%i) == 0) && ((b%i) == 0)){
            printf("GCD : %d \n", i );
            printf("LCM : %d \n", (a*b)/i);
            break;
        }
    }
}
```



---

## [조합 (Combination)]({{site.url}}/Combination/)

``` cpp
int a,b,n,r;
    a = b =1;
    scanf("%d%d",&n,&r);
    
    for(int i=n-r+1; i<=n; i++){
        b = ( b * i ) / a++ ;
    }
    cout << b << endl;

// 4 2를 입력하면 b=6 출력 
// 10 3을 입력하면 b=120 출력 
```

---

## [Int 총 자릿 수 구하기]({{site.url}}/Count-Pos-Number/)


``` cpp
int CntPosNumber(int value){
        int pos_number;
        // 방법 1. 로그함수를이용한자리수계산
        pos_number = (int)log10((double)value)+1; // #include<cmath> 선언
        cout << pos_number << endl;
        
        // 방법 2. 직접계산
        pos_number = 0;
        while (value != 0)
        {
            value /= 10;
            pos_number++;
        }
        
        cout << pos_number << endl;
    
    return pos_number;
}
```

---

## [2차원 배열 넘기기]({{site.url}}/Pass-2-Array/)

``` cpp
int map[20][25];

void solve(int idx, int (*m)[25]){
    int tm[20][25];
    memset(tm, -1, sizeof(tm));
    
    if( idx == n+1 ){
        for(int i=0; i<n; i++){
            for(int j=0; j<n; j++){
                ans = ans < m[i][j] ? m[i][j] : ans;
            }
        }
        return ;
    }
}
```

* 받을 때 [20]이 아니라 [25]임을 유의하자.

* 즉, 이차원배열의 값으로 선언을 해줘야한다.


---

## [Swap]({{site.url}}//Swap/)

``` cpp
#define swap(a,b) a ^= b ^= a ^= b
```

---


## [ASCII 값 갖고 놀기]({{site.url}}/ASCII-To-Int/)

``` cpp
int main(){
    // [1], [2] 어느걸로 해도 상관 없다.
    char s[5] = "aAzZ"; // [1]
    string s = "aAzZ"; // [2]
    
    printf("%d \n", s[0] - 'a'); // 0
    printf("%d \n", s[1] - 'A'); // 0
    printf("%d \n", s[2] - 'z'); // 0
    printf("%d \n", s[3] - 'Z'); // 0
    
    // 0의 ASCII값은 48이다.
    // 그렇기 때문에  [ A - '0' + 48 ]을 해주게 되면
    // A의 ASCII값을 알 수 있다.
    printf("%d \n", s[0] - '0' + 48); // 97
    printf("%d \n", s[1] - '0' + 48); // 65
    printf("%d \n", s[2] - '0' + 48); // 122
    printf("%d \n", s[3] - '0' + 48); // 90
    
    
    return 0;
}
```



---


## [각 자릿수 더하기(Add each digit)]({{site.url}}/Add-Each-Digit/)

``` cpp
int cal(int num) {
    int sum = 0;
    while (num!=0) {
        sum += num % 10;
        num /= 10;
    }
    return sum;
}

/*
input : 123
output : 6


input : 51515
output : 17

*/
```


---


## [String Split ( 구분자로 구분하기 )]({{site.url}}/String-Split/#string-split--space-전용)

``` cpp
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

int main(){
    string sentence = "string to split";
    istringstream iss(sentence);
    

    // [1] - 1 : string
    vector<string> v;
    for(string s; iss >> s; ){
        v.push_back(s);
    }

    // [1] - 2 : int
    vector<int> v;
    for(int s; iss >> s; ){
        v.push_back(s);
    }

    
    // [2]
    vector<string> result{
        istream_iterator<string>(iss), {}
    };
    
    // 단어를 출력하려면
    copy(istream_iterator<string>(iss),
         istream_iterator<string>(),
         ostream_iterator<string>(cout, "\n"));

    // 단어를 container에 저장하려면
    vector<string> words;
    copy(istream_iterator<string>(iss),
         istream_iterator<string>(),
         back_inserter(words));
    
}
```

---

## [반올림 처리]({{site.url}}/Rounds/)

``` cpp
int C, K, t = 1;
int main() {
	scanf("%d %d", &C, &K);
	for (int i = 0; i < K; i++) t *= 10;
	K = t / 10;
	printf("%d\n", (C + (K * 5)) / (K * 10) * (K * 10));

	return 0;
}

/*
K자리 의미는 
1일 때는 10단위로
2일 때는 100단위로
n일 때는 pow(10,n)이다.
*/

Input : 123 1 
Output : 120

Input : 123 2
Output : 100
```