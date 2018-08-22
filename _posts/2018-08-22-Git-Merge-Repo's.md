---
layout: post
title:  " Git 저장소를 병합하는 방법(How to merge repositories in Git) "
categories: Git
tags: Git
author: goodGid
---
* content
{:toc}


# 서로 다른 저장소를 한 곳에 병합하는 방법

프로젝트 특성에 따라 한 개 이상의 저장소들에서 개발이 진행되다가 저장소의 병합이 필요할 때가 있다. 

특정 디렉토리를 생성하여 복사해서 추가하면 되겠지만, 이련 경우에는 기존 저장소의 수정 이력(버전) 정보는 포기해야 한다. 

쉽게 기존 저장소의 수정 이력 정보를 포함하여 저장소를 병합하는 방법이 있다.

우선 다음과 같이 세 개의 저장소가 있다고 가정한다.

1. git/project1
2. git/project2
3. git/project3

---


# 사전 고려사항
저장소가 병합되면 디렉토리 위치에 따라 코드가 합쳐질 수 있다. 따라서 병합전에 project1, project2, project3의 디렉터리를 병합하기 좋게 구성하여 커밋 후 PUSH 한다. (매우 중요)
병합 과정에 .gitignore 파일이 충돌 날 수 있는데, 이럴 경우에는 다음과 같이 입력한다.
``` bash
$git reset .gitignore
```

---

# 병합
Git 터미널 창을 연다. 그리고 git/project1으로 이동한다.

``` bash
$cd ~/git/project1
```

project2를 project1에 병합한다.

``` bash
$git remote add project2 ../project2
$git fetch project2
$git merge --allow-unrelated-histories project2/master # 또는 브렌치 이름
$git remote remove project2
$git commit -m 'Merge project2 into project1'
$git push
```

project2와 동일하게 project3를 project1에 병합한다.

``` bash
$git remote add project3 ../project3
$git fetch project3
$git merge --allow-unrelated-histories project3/master # 또는 브렌치 이름
$git remote remove project3
$git commit -m 'Merge project3 into project1'
$git push
```

이렇게 하면 쉽게 저장소를 수정 이력과 함께 병합할 수 있다.

---

# 출처

* [GIT 저장소를 다른 저장소에 병합하는 방법](https://mansoo-sw.blogspot.com/2017/08/git-repository-merge.html)
