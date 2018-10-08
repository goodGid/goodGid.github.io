---
layout: post
title:  "String Input (1)"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}



## To Do

* 코딩테스트를 치루다 보면 n값을 주어지지 않고 임의의 Input이 들어 올 때가 있다.

* 이러한 문제의 입력을 준비하고자 공부하였다.












---

## cin

* `문자`와 `문자열` 모두 입력 받을 수 있다.

``` cpp

int main(){
         char a, b;
         char str[10];
         cin >> a;                      //1
         cout << a << endl;             //2
         
         cin >> a;                      //3
         cin >> b;                      //4
         cout << a << " " << b << endl; //5
         
         cin >> str;                    //6
         cout << str << endl;           //7
     }


```

```
solve)
     1번 p를 입력하고 엔터
     2번 출력 결과 => p
 
     3,4번에서,
     x입력후 엔터, y입력후 엔터
     5번 출력 결과 => x y
     
     6번에서 loving you 엔터
     7번에서 출력 결과 =>loving

- cin은 엔터가 나오면 입력 종료로 간주.
- cin은 'asd zxc'로 입력하면 띄어쓰기 전까지 입력
```     
 
 ---


## cin.get

* `문자`만 입력받을 수 있다.

 ``` cpp

     #include <iostream>
     void main() {
         char a, b, c;
         a = cin.get();         //cin.get(a) 가능
         b = cin.get();
         c = cin.get();                               //1
         cout<< a << " " << b << " " << c << endl;    //2
     }

```

```
solve)
         1번까지 x입력 후 엔터, y입력 후 엔터
 
     [2번 출력 결과]
     x
     y
 
     // 즉 엔터도 입력받을 문자로 간주한 것으로 봄(공백 또한 문자로 간주)
     x + Enter(개행) + y
 
 - getline와 get함수가 다른 점
   --> get함수는 개행문자를 읽어서 버리지 않고 입력 큐에 그대로 남겨둠
         cin.get(str1, hi);
         cin.get(str2, hello);
        라는 두 문장이 있다면 입력 큐에 개행문자가 그대로 있어서 
        두번째 호출은 개행문자를 첫 문자로 만나게 된다.
 
     굳이 get()을 써야 한다면,
     cin.get(str1, hi);
     cin.get();
     cin.get(str2, hello);
     이렇게 두 문장사이에 get()을 하나 더 삽입하면 된다.

```     


---
 
## cin.getline
 
* `문자열`만 입력받을 수 있다.

 ``` cpp
#include<iostream>
void main(){
    char a[10];
    cin.getline(a,10);             //1
    cout << a << endl;             //2
    cin.getline(a, 10, 'u');       //3
    cout << a << endl;             //4

    string s;
    getline(cin, s);		//5
    cout << s << endl;
}
```

```
    solve)
    1번 so cute! 입력 후 엔터
    2번 결과 => so cute!
    cf)cin의 경우 공백이 나오면 입력이 끝났다고 간주, but getline은 공백(ascii 32)도 문자로 받아들임
 
    3번 so cute! 입력 후 엔터
    4번 결과 => so c
 
 
    cin.getline(변수의 주소, 최대입력가능 문자수, 종결문자);
 
 - getline()하면은 Enter키가 전달하는 개행문자를 
   입력의 끝으로 인식하여 한줄 전체를 읽는다.
 
 - 종결문자 생략시 엔터로 간주된다. 그리고 종결문자를 NULL문자로 바꾼다.
   따라서 종결문자전까지 출력하게 된다.
   최대입력가능 문자수보다 많은 문자를 입력한 경우 n-1개만큼만 받아들이고 
   n번째 문자는 null문자로 취급한다.
 
 - cin.getline(a,20); // 이때 입력한 문자의 개수는 19개이하이여야 한다.(마지막 1문자는 null문자 삽입)
 
 - cin.getline( ___ , 20); // ___ 에는 무조건 char형 배열 타입이 와야 한다.
 - getline(cin, ___ ); ___에는 무조건 string 타입이 와야 한다.


 - 1번 방법은 char형 입력 받기
 - 5번 방법은 string형 입력 받기
```     

---

## scanf 

 ``` cpp
    #include<iostream>
    using namespace std;

    int main(){
    char c[10];
    scanf("%s",c);	       	// 1
	cout << c[1] << endl;  	// 2
    cout << c << endl;      // 3
	return 0;
    }
```

```
    solve)
    1번 abc 입력 후 엔터
    2번 b 출력

    1번 a 입력 후 엔터
    2번 공백 출력

    1번 abc def 입력 후 엔터
    2번 b
    3번 abc

    - scanf는 공백전까지 입력받는다.
```     


* scanf 이용하여 한 글자씩 입력받기

 ``` cpp
#include<iostream>
using namespace std;

int main(){
    char a,b,c;
    scanf("%1c%1c%1c",&a,&b,&c);
    
    cout << a << endl;
    cout << b << endl;
    cout << c << endl;
    return 0;
}

```

```
solve)
    input : abcde
    output :
    a
    b
    c

- %1c 를 사용하면 한 글자씩 입력을 받는다.
```

---

## cin.get()과 scanf("%1c")의 공통점


``` cpp

#include <iostream>
#include <cstring>
using namespace std;

char c[100];
int main() {
    int i=0;
    while (1) {
        // [1] 또는 [2]로 하면 된다.
        c[i] = cin.get(); // [1]
        // scanf("%1c",c+i); // [2]
        if( c[i] == '\n'){
            cout << "Enter1" << endl;
            break;
        }
        if( c[i] == '\0'){
            cout << "Enter2" << endl;
            break;
        }
        i++;
    }
    cout << c << endl;
    return 0;
}

```


```
    solve)
    input : qwer asdf zxcv 입력 후 엔터
    output :
    Enter1
    qwer asdf zxcv 

    Program ended with exit code: 0

    - 엔터까지 들어가서 qwer asdf zxcv 출력 후 (엔터) 하고 "Program ended with exit code: 0" 출력
    - Enter2가 아닌 Enter1이 출력 된다. 
    - Enter를 입력했을 시 그 값은 `\n`이다.
```





