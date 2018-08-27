---
layout: post
title:  " AWS Lambda Seminar "
categories: Conference
tags: 
author: goodGid
---
* content
{:toc}

## AWS로 무료 이미지 리사이즈 서버 만들기 with AWS Lambda

### Seminar Info 

{% capture images %}
  /assets/img/conference/aws_lambda_seminar_1.png
  /assets/img/conference/aws_lambda_seminar_2.png
  /assets/img/conference/aws_lambda_seminar_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=3 %}

---


### Lambda에서 S3 트리거 설정 

{% capture images %}
  /assets/img/conference/aws_lambda_seminar_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

---

### 세미나를 들을 오늘의 강의실 
{% capture images %}
  /assets/img/conference/aws_lambda_seminar_7.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---



### 열심히 세미나를 따라가는 나의 모습 ㅎㅎ
{% capture images %}
  /assets/img/conference/aws_lambda_seminar_5.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---


### 수고해주신 ASUG와 단체 사진 
{% capture images %}
  /assets/img/conference/aws_lambda_seminar_6.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---

### Review

* `Lambda` 서비스를 사용하는 법을 익혔다.

* Lambda 함수에 S3를 트리거로 연결시켜 Image Resize를 실습해 봤다.

  1. Origin S3 버킷에 이미지를 올리면
  2. Resized된 이미지를 관리하는 S3 버킷에 Resized된 이미지를 자동으로 업로드한다.


* `Gateway API` 서비스를 사용하여 내가 만든 Lambda함수를 배포하였다.

* `IAM` 설정하는 법도 어느정도 익혔다. 

* `Role`과 `Policy`의 차이점을 익혔다. <br> ==> 1개의 Role에 내장된 Policy + 사용자 정의 Policy를 묶어서 Role로 사용한다 ! (틀린 개념일수도 있다... ㅎㅎ)


* 자세한 사용법과 실습 과정은 [Github Repo](https://github.com/goodGid/ausg-seminar-2018/tree/master/ImageResize)을 참고하자 !







