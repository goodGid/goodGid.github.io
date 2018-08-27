---
layout: post
title:  " Merge 와 Fetch의 차이 "
categories: Git
tags: Git
author: goodGid
---
* content
{:toc}


2018-08-22-Git-Merge-vs-Fetch


pull 을 실행하면, 원격 저장소의 내용을 가져와 자동으로 병합 작업을 실행하게 된다.

그러나 단순히 원격 저장소의 내용을 확인만 하고 로컬 데이터와 병합은 하고 싶지 않은 경우에는 fetch 명령어를 사용할 수 있다.

<br>

<b>fetch</b>를 실행하면, 원격 저장소의 최신 이력을 확인할 수 있다. 

이 때 가져온 최신 커밋 이력은 이름 없는 브랜치로 로컬에 가져오게 된다. 

이 브랜치는 '<b>FETCH_HEAD</b>'의 이름으로 체크아웃도 가능하다.

<br>


예를 들어, 로컬 저장소와 원격 저장소에 B에서 진행된 커밋이 있는 상태에서 

fetch 를 수행하면 아래 그림과 같이 이력이 남겨진다.

{% capture images %}
    /assets/img/git/git_merge_vs_fetch_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

<br>

이 상태에서 원격 저장소의 내용을 로컬 저장소의 'master'에 통합하고 싶은 경우에는, 

'FETCH_HEAD' 브랜치를 merge 하거나 다시 pull을 실행하면 된다.

{% capture images %}
    /assets/img/git/git_merge_vs_fetch_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


이렇게 fetch 후 merge 를 수행하면, pull 명령을 실행했을 때와 같은 이력이 만들어진다.

사실 pull 이라는 것은 내부적으로 보면 fetch + merge 이기 때문이다 !

---

# 출처

* [fetch, 원격 저장소의 데이터를 로컬에 가져오기만 하기](https://backlog.com/git-tutorial/kr/stepup/stepup3_2.html)
