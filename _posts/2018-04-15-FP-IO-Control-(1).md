---
layout: post
title:  " 파일 입출력 제어 [ Part 1 ] "
categories: 파일처리
tags: 파일처리
author: goodGid
---
* content
{:toc}



# 파일 입력 (Read)

{% capture images %}
    /assets/img/file_processing/fp_io_1_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


{% capture images %}
    /assets/img/file_processing/fp_io_1_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---

# 버퍼 관리

* 버퍼 (Buffer)

파일에서 데이터를 읽어들이는 주기억장치 내의 일정 구역

Q. 버퍼관리의 목적은 ?
{: .notice}


```
CPU와 보조기억장치의 성능과 활용을 최대화
```



* 버퍼 관리자
    * 제한된 주기억장치의 버퍼공간을 최적 분배
    * 사용자의 요구에 따라 버퍼 공간 할당
    * 사용하지 않는 주기억 공간을 관리
    * 버퍼 요구량이 할당 가능 공간을 초과시
        * 사용자 프로세스를 지연
        * 우선 순위가 낮은(또는 사용도가 낮은) 프로세스에 할당된 버퍼 공간을 회수 (LRU, FIFO 등)



{% capture images %}
    /assets/img/file_processing/fp_io_1_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


최초 적합 : 앞에서부터 들어갈 수 있는 곳

최적 적합 : 넣으려고하는 16M보다는 크고 넣었을 시 Empty Space가 가장 적은곳

순환 적합 : 지나온 곳을 보지 않고 그 다음에 가능한 위치