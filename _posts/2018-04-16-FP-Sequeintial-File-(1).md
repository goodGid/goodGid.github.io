---
layout: post
title:  " 순차 파일 [ Part 1 ] "
categories: 파일처리
tags: 파일처리
author: goodGid
---
* content
{:toc}


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

# 스트림 파일 (Stream File)

* 정의
    - `연속적인` 판독 연산을 통해 <br> 레코드가 파일에 저장되어있는 <br> `순서`에 따라 데이터를 접근하는 파일

* 종류
    - `순차` 접근 스트림 파일
    - `임의` 접근 스트림 파일

* 접근 모드 (Access Mode)
    - 파일에서 수행하려는 연산에 따라 <br> 판독(Read), 기록(Write), 갱신(Read/Write), 첨가(Append) 등을 명세

---


# 순차 접근 스트림 파일

* 판독 (Read)
    - 기본 스트림 파일을 `판독(Read)` 모드로 열면 <br> 판독 포인터는 파일의 `첫 번째` 바이트를 가리킴

* 판독 연산
    - 해당 위치에서 시작하여 해당 바이트 값을 전송
    - 판독 포인터를 스트림 파일의 다음 바이트 시작 위치로 변경
    - n번째 바이트 값을 판독하기 위해서는 <br> 반드시 (n-1)번째 바이트 값을 `판독`해야함

{% capture images %}
    /assets/img/file_processing/seq_file_1_1.png
    /assets/img/file_processing/seq_file_1_2.png
    /assets/img/file_processing/seq_file_1_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=3 %}



* 연속적으로 파일을 접근하고, <br> 파일에 있는 `모든` 바이트를 처리하는 경우에 `유용`

* 파일을 `순차적`으로 `접근`하는 과정은 <br> 배열을 순차적으로 접근하는 것과 유사

* 특정 바이트를 찾기 위한 방법으로는 `좋지 않음`

---

# 임의 접근 스트림 파일

* 오프셋(offset) 값을 이용
    - 이전 바이트를 접근하지 않고 `직접` 접근

* 임의 접근을 위한 함수
    - `fseek()` 함수
        - 파일 스트림에서 판독 또는 기록 포인터를 변경하는데 사용
        - 파일의 시작, 끝, 현재의 위치로부터 offset 크기만큼 판독 또는 기록 포인터를 이동

    - `ftell()` 함수
        - 파일 스트림에서 판독 또는 기록 포인터의 현재 인덱스 값을 `반환`하는데 사용 

<br>

<br>

* "r"(판독) 모드로 개방한 스트림 파일

{% capture images %}
    /assets/img/file_processing/seq_file_1_4.png
    /assets/img/file_processing/seq_file_1_5.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}

---


# 입력 순차 파일 (Entry-Sequenced File)

* 필드의 순서, 길이 등에 대해서도 제한 없음

* 레코드의 길이, 타입도 일정하지 않을 수 있음

* 레코드<필드, 값> 쌍으로 구성

{% capture images %}
    /assets/img/file_processing/seq_file_1_6.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

* 갱신 작업
    - 레코드 삽입 : 기존 `파일 끝`에 첨가

* 검색 작업
    - `파일 시작`부터 비교


* 삽입, 삭제, 변경 작업
    - `새로운 순차 파일`을 생성하면서 동시에 수행

* 레코드 삭제 연산
    - 작업 대상 레코드를 검색하면서 기존의 레코드를 새로운 파일로 출력 <br> 삭제할 레코드 검색 시 그 레코드는 생략하고 나머지 레코드들만 새로운 파일로 출력


---

# 키 순차 파일 (Key-Sequenced File)

* 저장 장치의 레코드 순서와 <br> 레코드 리스트의 논리적 순서가 같은 구조의 파일

* 파일 내의 레코드들 : `키` 필드 값에 따라 정렬

* 데이터 필드 : 파일 설명자에 `한 번만` 저장하면 됨
    
---

# 순차 파일의 특징

* 순차적으로 접근하는 특성 때문에 대화식보다는 `일괄 처리`에 많이 사용
    - `장점` : 다음 레코드를 신속하게 접근 가능

* 접근 요구 순서가 저장된 레코드 순서와 `같다면` 접근 시간이 `단축`

* 접근 요구 순서가 저장된 레코드 순서와 `다르면` 접근 시간이 `저하`

* 데이터 접근 요구를 고려한 후, 접근 방법에 맞게 파일 구성해야 함