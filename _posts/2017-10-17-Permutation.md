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
