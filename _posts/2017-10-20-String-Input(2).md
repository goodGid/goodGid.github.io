---
layout: post
title:  "String Input (2)"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## cin vs getline

```
cin은 '\n'전 까지 입력 버퍼에 들어간다.

getline은 '\n'까지 입력 버퍼에 들어간다.
```










--- 


``` cpp

#include <iostream>
using namespace std;

int main(){
    int n;
    string s;
    char input[25];
    
    cin >> n;
    cin.getline(input,20);
    
    cout << n << endl;
    cout << input << endl;
    return 0;
}


```

```
[ solve 1 ]
    input : 
    1
    output : 
    1
     
    Program ended with exit code: 0

    --> 1하고 Enter를 치면 
        n에는 1
        input에는 '\n'가 들어간다.
```

```
[ solve 2 ]
    input :
    1 3
    output : 
    1
     3
    Program ended with exit code: 0

    --> n에는 1이 들어가고 
        [ 3]이 input에 들어간다.
```

```
[ solve 3 ]
    input : 
    12aa
    output : 
    12
    aa
    Program ended with exit code: 0

    --> n에는 12이 들어가고 
        aa가 input에 들어간다.

```     
 
---


## cin.ignore()

```
ignore(n, delim)

n자리 까지 입력을 무시한다.
or
delim 조건이 나올 때 까지 그동안 입력을 무시한다.

즉
n자리 이 후에 값만 입력 버퍼에 들어가거나
delim 조건 이 후 값만 입력 버퍼에 들어간다.
```



{% capture images %}
    /assets/img/posts/string_1.png
    /assets/img/posts/string_2.png 
    /assets/img/posts/string_3.png
    /assets/img/posts/string_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=4 %}


---

 ``` cpp

    #include <iostream>
    using namespace std;

    int main(){
        int n;
        string s;
        char input[25];
        
        cin >> n;
        cin.ignore(3,'\n');
        cin.getline(input,20);
        
        cout << n << endl;
        cout << input << endl;
        return 0;
    }


```

```
[ solve 1 ]
    input : 
    1
    aa
    
    output : 
    1
    aa
    Program ended with exit code: 0

    --> cin.ignore()에 의해서 입력된 '\n'가 버퍼에서 제거된다.
```

```
[ solve 2 ]
    input : 
    1abcde
    
    output : 
    1
    de
    Program ended with exit code: 0

    --> cin.ignore(3,'\n')에 의해서 
        1이후에 입력된 3자리는 무시하고 
        그 뒤부터 입력 버퍼에 들어간다.
```

```
[ solve 3 ]
    input : 
    1abc + enter
    
    output : 
    1
    
    Program ended with exit code: 0

    --> 1이후에 abc 3개가 입력되었다.그리고 '\n' 입력되었는데
        ignore(3,'\n')에 의해 3개를 입력받은 상태이므로
        그 다음부터 input은 입력 버퍼에 들어가게 된다.
        그런데 이 때 바로 '\n'를 쳤기 때문에
        input에는 '\n'가 들어가게 된다.
```

```
[ solve 4 ]
    input : 
    1a
    bcd
    output : 
    1
    bcd
    Program ended with exit code: 0

    --> 1이후에 a 1개만 나온 상태에서 '\n'가 들어갔기 때문에
        ignore()에 의해 입력 버퍼에는 아무것도 없는 상태이다.
        이상태에서 bcd를 입력하면 input에는 bcd가 들어가게 된다.
```

```
[ solve 5 ]
    input : 
    1ab
    ccc
    output : 
    1
    ccc
    Program ended with exit code: 0

    --> 1이후에 ab 2개만 나온 상태에서 '\n'가 들어갔기 때문에
        ignore()에 의해 입력 버퍼에는 아무것도 없는 상태이다.
        이상태에서 ccc를 입력하면 input에는 ccc가 들어가게 된다.
```

```
[ solve 6 ]
    input : 
    1 abcde

    output : 
    1
    cde
    Program ended with exit code: 0

    --> 1이후에 [ abcde] 가 입력으로 들어왔다.
        ignore(3,'\n')에 의해 [ ab]는 입력 버퍼에서 무시되고,
        input에는 그 이후 값인 cde가 들어가게 된다.
```     

