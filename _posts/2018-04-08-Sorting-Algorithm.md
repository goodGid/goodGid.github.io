---
layout: post
title:  " 정렬 알고리즘 (Sort Algorithm) "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}



### Sorting Algorithm

``` cpp

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
void Selection_Sort(vector<int> v);
void Insertion_Sort(vector<int> v);
void Bubble_Sort(vector<int> v);
void Merge(vector <int>& v, int s, int e, int m); 
void Merge_Sort(vector<int>& v, int s, int e);
void Quick_Sort(vector<int> &v, int s, int e);
void Print(vector<int>v);

// Time Complex : O(n2)
// Space Complex : O(n)
void Selection_Sort(vector<int> v)
{
	for (int i = 0; i < v.size()-1; i++)
	{
		int tmp = i;//인덱스의 맨 앞에서부터
		for (int j = i + 1; j < v.size(); j++)
		{
			if (v[tmp] >= v[j])//가장 작은 값을 찾으면, 그 값을 현재 인데스의 값과 바꿔줌
				tmp = j;
		}
		swap(v[i], v[tmp]);
		Print(v);
	}	
	//Print(v);
}

// Time Complex : O(n2)
// Space Complex : O(n)
void Insertion_Sort(vector<int> v)
{
	for (int i = 1; i < v.size(); i++)
	{
		int key = v[i];	//두번째 인덱스부터 시작, 별도의 변수에 저장
		int j = i - 1;	//비교 인덱스 현재인덱스-1
		
		while (j >= 0 && key < v[j])	//별도로 저장해둔 변수와 비교 인덱스의 배열값 비교
		{
			swap(v[j], v[j + 1]);
			j--;						//비교 인덱스를 -1하여 비교를 반복
		}
		//v[j + 1] = key;				//삽입 변수가 더 클 경우, 비교 인덱스+1에 삽입 변수 저장
										//while안에서 swap()을 해주기 때문에 없어도 될 듯  
		Print(v);
	}
}

// Time Complex : O(n2)
// Space Complex : O(n)
void Insertion_Sort2(int a[], int size){
    int tmp;

    for (int i = 1; i < size; i++) {
        tmp = a[i];
        int j = i;

        while (j > 0 && a[j - 1] > tmp) {
            a[j] = a[j - 1];
            j--;
        }
        a[j] = tmp;		// while안에서 swap이 아니라 그냥 덮어쓰기이기 때문에 생략하면 안된다.
    }
}

// Time Complex : O(n2)
// Space Complex : O(n)
// 뒤에서 부터 Fix
void Bubble_Sort(vector<int> v)
{
	for (int i = 0; i < v.size()-1; i++)
	{
		for (int j = 1; j < v.size() -i; j++)
		{
			if (v[j-1] > v[j])
				swap(v[j-1], v[j]);
		}
			Print(v);
	}
}

// Time Complex : O(n2)
// Space Complex : O(n)
// 앞에서 부터 Fix
void Bubble_Sort2(int a[], int size) {
    int tmp;
    
    for (int i = 0; i < size - 1; i++) {
        for (int j = i + 1; j < size; j++) {
            if (a[i] > a[j]) {
                tmp = a[i];
                a[i] = a[j];
                a[j] = tmp;
            
            for(int i=0; i<size; i++) cout << a[i] << " " ; cout << endl;
            }
        }
    }
    
}

void Merge(vector <int>& v, int s, int e, int m) //합병
{
	vector <int> ret;
	int i = s, j = m + 1, copy = 0;
	
	//결과를 저장할 배열에 하나씩 비교하여 저장한다.
	while (i <= m && j <= e)
	{
		if (v[i] < v[j])
			ret.push_back(v[i++]);
		else if (v[i] > v[j])
			ret.push_back(v[j++]);
	}

	//남은 값들을 뒤에 채워 넣어준다
	while (i <= m)
		ret.push_back(v[i++]);
	while (j <= e)
		ret.push_back(v[j++]);

	//원래 배열에 복사해준다.
	for (int k = s; k <= e; k++)
		v[k] = ret[copy++];
}

void Merge_Sort(vector<int>& v, int s, int e)
{
	if (s < e)
	{
		int m = (s + e) / 2;
		////분할 divide
		Merge_Sort(v, s, m);	//from s to m
		Merge_Sort(v, m + 1, e);	//from m+1 to e
		////합병 conquer
		Merge(v, s, e, m);
	//cout << s << " " << e << " " << m << endl;
	//Print(v);
	}

}

void Quick_Sort(vector<int> &v, int s, int e)
{
	int pivot = v[s];
	int bs = s, be = e;
	while (s < e)
	{
		while (pivot <= v[e] && s < e)
			e--;
		if (s > e)
			break;
		while (pivot >= v[s] && s < e)
			s++;
		if (s > e)
			break;
		swap(v[s], v[e]);
	}
	swap(v[bs], v[s]);

	cout << pivot << endl;
	Print(v);
	
	if (bs < s)
		Quick_Sort(v, bs, s - 1);
	if (be > e)
		Quick_Sort(v, s + 1, be);
	
}

void Print(vector<int>v)
{
	for (int i = 0; i < v.size(); i++)
		cout << v.at(i)<< " ";
	cout << endl;
}

int main()
{
    vector <int> v;
    //v = { 3,7,4,5,2,1,9,8,6 };
    v = { 23, 79, 98, 56, 16, 25, 58, 55 };
//    v = { 8,5,6,2,4};
//    Selection_Sort(v);
//    Insertion_Sort(v);
    Bubble_Sort(v);
    int a[] = { 8,5,6,2,4 };
//    Bubble_Sort2(a,5);
//    Merge_Sort(v,0, v.size()-1);
//    Quick_Sort(v, 0, v.size() - 1);
    return 0;
}

```