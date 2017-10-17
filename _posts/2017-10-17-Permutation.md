---
layout: post
title:  "Permutation"
date:   2017-10-17
excerpt: "Permutation"
cate : "algorithm"
tag:
- Key Point
---

## Problem
Problem URL : **[다음 순열](https://www.acmicpc.net/problem/10972)**

{% capture images %}
    /assets/img/algorithm/10972_1.png
    /assets/img/algorithm/10972_2.png
    /assets/img/algorithm/10972_3.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=3 %}

---

## The Key Point

```
- 순열을 사전순으로 나열 했을 때, 사전순으로 Next or Prev 순열을 찾는 방법
    1) STL 함수 사용
    2) 직접 구현
- 해당 알고리즘에 대한 설명은 PDF 완전 탐색 0 참고 !
        --> p26에서 " j >= i 이면서 A[j] > A[i-1]를 만족하는 가장 큰 j를 찾는다 " 인데
                        가장 큰 j가 아닌 큰 j중 최소를 찾는게 맞는거 같다 !
 
- 같은 Logic Problem : 10973 이전 순열 / 10974 모든 순열
```  

---

## Code
{% highlight cpp %}

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
    
    cout << '\n';
    return 0;
}


{% endhighlight %}


