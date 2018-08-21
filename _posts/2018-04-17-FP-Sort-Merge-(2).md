---
layout: post
title:  " 정렬/합병 [ Part 2 ] "
categories: 파일처리
tags: 파일처리
author: goodGid
---
* content
{:toc}


# 합병 단계

* 합병 수행 방법
    - m-원 합병 (m-way merge)
    - 균형 합병 (balanced merge)
    - 다단계 합병 (polyphase merge)

---

# m-원 합병 (m-way merge)

* 특징
    - m개(합병의 원 수)의 입력 파일을 동시에 처리하는 합병
    - 입력 파일 `m`개, 출력 파일 `1`개 : `m+1`개의 파일을 사용
    - 많은 입출력 : 한 패스에 합병이 끝나지 않으면 런들을 다시 분배하기 위해 복사,이동해야함
    - 이상적 정렬/합병 : m개의 런에 m개의 입력 파일 사용하여 한번의 m-원 합병을 적용

* 2-원 합병의 경우
    - 한번 패스 후 : 합병된 `런의 크기`는 `2배`, `런의 수`는 `1/2배`
    - N개의 런으로 분할된 파일 정렬 위한 패스 수 : LogN 


---

# 6개의 런에 대한 2-원 합병

{% capture images %}
    /assets/img/file_processing/sort_merge_2_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

---

# 6개의 런에 대한 3-원 합병

{% capture images %}
    /assets/img/file_processing/sort_merge_2_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

---

# 균형 합병 (Balanced Merge)

* m-원 합병의 단점
    - 파일의 재분배 : 많은 I/O 필요 

* `균형 합병`
    - 출력할 때, 미리 다음 단계에 사용할 입력 파일로 재분배 <br> 즉, 출력 파일을 다음 단계의 입력 파일로 직접 사용
        - m-원 합병 : `m+1`개의 파일 필요
        - m-원 균형합병 : `2m`개의 파일 필요 (m개 입력파일, m개 출력파일)

* 각 합병 단계 후
    - 런의 총수는 합병 차수로 나눈만큼 감소
    - 런의 길이는 합병 차수배씩 증가
    - 초기 런의 수가 N일 때 합병 패스 수는 O(logm N)
    - 패스 수는 Same, 재분배를 Down

---

# 12개의 런에 대한 2-원 균형 합병

{% capture images %}
    /assets/img/file_processing/sort_merge_2_3.png
    /assets/img/file_processing/sort_merge_2_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}

---

# 다단계 합병 (Polyphase Merge)

* m-원 균형 합병 기법의 `단점`
    - `2m`개 파일 필요 (m개 입력파일, m개 출력파일)

* m-원 다단계 합병
    - `m`개의 `입력 파일`과 `1`개의 `출력 파일`
    - 입/출력 파일 수가 같지 않음 : `불균형` 합병
    - 파일의 `재분배`가 `필요 없고`, 파일 수는 `2m`에서 `m+1`로 감소
    - 각 합병 단계(pass)에서
        - 입력 파일의 어느 하나가 공백이 될 때까지 런들을 합병
        - 공백이 된 `입력 파일`이 `다음 합병 단계`의 `출력 파일`이 됨

---

# 2-원 다단계 합병의 예

{% capture images %}
    /assets/img/file_processing/sort_merge_2_5.png
    /assets/img/file_processing/sort_merge_2_6.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}

---

# 5개 런의 2-원 다단계 합병에서 런 수의 변화

{% capture images %}
    /assets/img/file_processing/sort_merge_2_7.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---

# 선택 트리 (Selection Tree) (1)

* m개의 런을 하나의 큰 런으로 정렬
    - m개의 런 중 가장 작은 키 값의 레코드를 계속 선택, 출력
    - `선택 트리`를 사용하여 `비교 횟수`를 줄일 수 있음

* 선택 트리의 종류
    1. 승자 트리 (winner tree)
    2. 패자 트리 (loser tree)


---

# 선택 트리 (2)

* 승자 트리
    - 완전 이진 트리
    - 각 단말 노드는 각 런의 최소 키 값 원소를 나타냄
    - 내부 노드는 그의 `두 자식 중`에서 `작은 키` 값을 가진 원소를 나타냄
    - 런이 8개인 경우 승자 트리 예





* 승자 트리 구축 과정
    - 가장 `작은 키` 값을 가진 원소가 승자로 올라가는 토너먼트 경기로 표현
    - 트리의 각 내부 노드 : <br> 두 자식 노드 원소의 토너먼트 승자
    - 루트 노드 : <br> 전체 토너먼트 승자, 트리에서 가장 작은 키 값 가진 원소


{% capture images %}
    /assets/img/file_processing/sort_merge_2_8.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---

# 선택 트리 (3)

* 합병의 진행
    - 루트가 결정되는 대로 순서순차에 출력 (7)
    - 다음 원소 <br> 즉 런 4의 키 값이 13인 원소가 승자트리 노드[11]로 들어감
    - 승자 트리를 다시 재구성 : <br> 노드 11에서부터 루트까지의 경로를 따라가면서 형제 노드 간 토너먼트 진행

{% capture images %}
    /assets/img/file_processing/sort_merge_2_9.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

---

# 선택 트리 (4)

{% capture images %}
    /assets/img/file_processing/sort_merge_2_10.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---

# 선택 트리 (5)

* 패자 트리 (Loser tree)
    - 루트 위에 0번 노드가 추가된 `완전 이진 트리`

* 패자 트리 구축 과정
    - 단말 노드 : 각 런의 최소 키값 원소
    - 내부 노드
        - 두 자식 노드들이 부모노드에서 토너먼트 경기를 수행
        - `패자`는 `부모 노드`에 남음
        - `승자`는 `그 위` 부모 노드로 올라가서 다시 토너먼트 경기를 진행

    - 루트 노드
        - 패자는 1번 루트 노드에 남음
        - 승자는 전체 토너먼트의 승자로서 `0번` 노드로 올라가 출력


{% capture images %}
    /assets/img/file_processing/sort_merge_2_11.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---

# 선택 트리 (6)

* 합병의 진행
    - 출력된 원소가 속한 런 4의 다음 원소, <br> 즉 키값이 13인 원소를 패자트리 노드 11에 삽입
    - 패자 트리를 다시 재구성 : <br> 토너먼트는 노드 11에서부터 루트 노드 1까지의 경로를 따라 경기를 진행
