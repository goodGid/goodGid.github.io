---
layout: post
title:  " 순차 파일 [ Part 1 ] "
date:   2018-04-16
excerpt: " 순차 파일 [1] "
cate : "posts"
tag:
- File Processing
---

# 순차 파일 (Sequential File)

* 정의

    * 레코드들을 조직하는 가장 기본적인 방법
    * 파일 생성 시 레코드들을 연속적으로 저장
    * 레코드들을 접근할 때도 저장할 때의 `순서대로` 연속적으로 접근

* 종류
    * 입력 순차 파일 (Entry-Sequenced File)
        * 레코드가 입력되는 순서대로 저장
    * 키 순차 파일 (Key-Sequenced File)
        * 레코드의 특정 필드 값 순서에 따라 저장

---


{% capture images %}
    /assets/img/file_processing/fp_io_1_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

