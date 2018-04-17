---
layout: post
title:  " 정렬/합병 [ Part 2 ] "
date:   2018-04-17
excerpt: " 정렬/합병 [2] "
cate : "posts"
tag:
- File Processing
---

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


