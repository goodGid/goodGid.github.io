---
layout: post
title:  "순열 (Permutation)"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## To Do

* 순열을 사전순으로 나열 했을 때, 사전순으로 Next or Prev 순열을 찾는 방법에 대해 알아보자.
    - 1) STL 함수 사용
    - 2) 직접 구현

*  같은 Logic Problem : 10973 이전 순열 / 10974 모든 순열











## Key Point

* n값에 따라 앞에서 부터 n자리까지만 순열을 구한다.

* do ~ while이 아닌 while문을 사용하게되면 다음과 같은 문제가 발생한다.

```
123
132가 아닌

즉 123상태에서 이미 swap을 시키게 된다.
132부터 시작한다.
```

* **next or prev permutation**의 Return Value에 대해 알아보자.

``` cpp
next_permutation(v.begin(),v.end());

/*
만약 
vector에 1 2 3 4 가 있다면
1 2 4 3 으로 순열을 구할 수 있기 때문에 
Return Value는 1이 된다.

하지만
vector에 4 3 2 1 순서로 있다면
더이상의 순열을 구할 수 없기 때문에
Return Value는 0이 된다.
*/
```


> next_permutation()

* **작은 값 -> 큰 값** 순서로 진행된다.

``` cpp
#include<iostream>
#include<algorithm>
using namespace std;

int main(){
    int arr[10];
    for(int i=0; i<10; i++)
        arr[i] = i;

    int n = 3;
    do {
        for(int i=0; i<10; i++)
            cout << arr[i] << " ";
        cout << endl;
    } while (next_permutation(arr, arr+n));
    return 0;
}

/*
Output
n = 3일 때
0 1 2 3 4 5 6 7 8 9 
0 2 1 3 4 5 6 7 8 9 
1 0 2 3 4 5 6 7 8 9 
1 2 0 3 4 5 6 7 8 9 
2 0 1 3 4 5 6 7 8 9 
2 1 0 3 4 5 6 7 8 9 


n = 4일 때
0 1 2 3 4 5 6 7 8 9 
0 1 3 2 4 5 6 7 8 9 
0 2 1 3 4 5 6 7 8 9 
0 2 3 1 4 5 6 7 8 9 
0 3 1 2 4 5 6 7 8 9 
0 3 2 1 4 5 6 7 8 9 
1 0 2 3 4 5 6 7 8 9 
1 0 3 2 4 5 6 7 8 9 
1 2 0 3 4 5 6 7 8 9 
1 2 3 0 4 5 6 7 8 9 
1 3 0 2 4 5 6 7 8 9 
1 3 2 0 4 5 6 7 8 9 
2 0 1 3 4 5 6 7 8 9 
2 0 3 1 4 5 6 7 8 9 
2 1 0 3 4 5 6 7 8 9 
2 1 3 0 4 5 6 7 8 9 
2 3 0 1 4 5 6 7 8 9 
2 3 1 0 4 5 6 7 8 9 
3 0 1 2 4 5 6 7 8 9 
3 0 2 1 4 5 6 7 8 9 
3 1 0 2 4 5 6 7 8 9 
3 1 2 0 4 5 6 7 8 9 
3 2 0 1 4 5 6 7 8 9 
3 2 1 0 4 5 6 7 8 9 
*/
```


> prev_permutation()

* **큰 값 -> 작은 값** 순서로 진행된다.


``` cpp
#include<iostream>
#include<algorithm>
using namespace std;

int main(){
    int arr[4] = {3,2,4,1};

    int n = 3;
     do {
        for(int i=0; i<4; i++)
            cout << arr[i] << " ";
        cout << endl;
     } while (prev_permutation(arr, arr+n));
    return 0;
}

/*
Output
n = 3일 때
3 2 4 1 
2 4 3 1 
2 3 4 1 


n = 4일 때
3 2 4 1 
3 2 1 4 
3 1 4 2 
3 1 2 4 
2 4 3 1 
2 4 1 3 
2 3 4 1 
2 3 1 4 
2 1 4 3 
2 1 3 4 
1 4 3 2 
1 4 2 3 
1 3 4 2 
1 3 2 4 
1 2 4 3 
1 2 3 4 
*/
```



---

## [1] Problem

Problem URL : **[다음 순열](https://www.acmicpc.net/problem/10972)**

![](/assets/img/algorithm/10972_1.png)

![](/assets/img/algorithm/10972_2.png)

![](/assets/img/algorithm/10972_3.png)

---

### Code

``` cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

bool next_permutation(vector<int> &a, int n) {
    int i = n-1;
    while (i > 0 && a[i-1] >= a[i]) {
        i -= 1;
    }
    if (i <= 0) {
        return false; // 마지막 순열
    }
    int j = n-1;
    while (a[j] <= a[i-1]) {
        j -= 1;
    }
    swap(a[i-1], a[j]);
    j = n-1;
    while (i < j) {
        swap(a[i], a[j]);
        i += 1;
        j -= 1;
    }
    return true;
}

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i=0; i<n; i++) {
        cin >> a[i];
    }

    /*
     STL 함수 사용 법
     */
    if (next_permutation(a.begin(),a.end())) {
//  if (prev_permutation(a.begin(),a.end())) {
        for (int i=0; i<n; i++) {
            cout << a[i] << ' ';
        }
    } else {
        cout << "-1";
    }

    /*
     직접 구현한 함수 사용법
     */
    if (next_permutation(a,n)) {
        for (int i=0; i<n; i++) {
            cout << a[i] << ' ';
        }
    } else {
        cout << "-1";
    }
    
    cout << endl;
    return 0;
}
```

---

## [2] Problem

Problem URL : **[차이를 최대로](https://www.acmicpc.net/problem/10819)**

![](/assets/img/algorithm/10819_1.png)


### Code

* 배열에 들어있는 값에 대해 **next_permutation**함수 사용하기

```cpp
#include<iostream>
#include<algorithm>
using namespace std;

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    int n;
    int arr[10];
    cin >> n ;
    
    for(int i=0; i<n; i++)
        cin >> arr[i];
    
    int ans = -1;
    sort(arr,arr+n); // [1]
    
    do {
        int tmp = 0;
        for(int i=0; i<n-1; i++){
            tmp += abs(arr[i] - arr[i+1]);
        }
        ans = max(ans,tmp);
        
    } while (next_permutation(arr, arr+n)); // [2]
    
    cout << ans << endl;
    return 0;
}
```

* [1] : 배열을 sort하는 법

* [2] : 배열에 순열을 구하는 법
