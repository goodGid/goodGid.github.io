---
layout: post
title:  " Github Action으로 CI/CD 구축하기 - 2편 : AWS S3 생성 및 설정 "
categories: Github AWS
author: goodGid
---
* content
{:toc}

## TOC (Table of contents)

* [Github Action으로 CI/CD 구축하기 - 1편 : AWS EC2 생성 및 설정]({{site.url}}/Github-Action-CI-CD-AWS-EC2/)

* [Github Action으로 CI/CD 구축하기 - 2편 : AWS S3 생성 및 설정]({{site.url}}/Github-Action-CI-CD-AWS-S3/)

* [Github Action으로 CI/CD 구축하기 - 3편 : AWS CodeDeploy 생성 및 설정]({{site.url}}/Github-Action-CI-CD-AWS-CodeDeploy/)

* [Github Action으로 CI/CD 구축하기 - 4편 : deploy.yaml 분석]({{site.url}}/Github-Action-CI-CD-Workflows/)

* [Github Action으로 CI/CD 구축하기 - 5편 : appspec.yaml 분석]({{site.url}}/Github-Action-CI-CD-CodeDeploy-App-Spec-File/)

* [Github Action으로 CI/CD 구축하기 - 6편 : build.gradle 분석]({{site.url}}/Github-Action-CI-CD-Build-Gradle-File/)

* [Github Action을 사용하여 빌드시 동적으로 변숫값 주입하기 (feat. Dynamic Variable Substitution)]({{site.url}}/Github-Action-Dynamic-Variable-Substitution/)



---

## Prologue

* Github Action으로 CI/CD 구축을 위한 두 번째 단계로

  AWS S3 생성 및 설정에 대해 알아보자.

---

## S3 Buckets

> S3 서비스가 필요한 이유

* Github Action으로 빌드된 결과물을 S3에 올려놓을 것이다.

  그러면 EC2 인스턴스에 있는 CodeDeploy가

  S3에 저장된 빌드 결과물을 가져와 인스턴스에 배포를 한다. 

* 그러므로 우리는 빌드된 결과물을 저장하는 공간으로 **S3 서비스**를 사용할 예정이다.


---

### S3 생성

> Step 1 

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_1.png)

* "Create bucket"을 클릭한다.

---

> Step 2

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_2.png)

* Bucket name과 region을 정한다.


---

> Step 3

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_3.png)

* Public Access를 차단한다.

  그런데 만약 본인의 서비스가 외부 이미지 참조가 있다면 

  상황에 맞게 Public Access를 허용시킨다.

* 추가로 필요한 설정이 있다면 마무리 후 버켓을 생성한다.

---

> Step 4

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_4.png)

* S3용 IAM 생성을 위해 IAM 서비스 -> Users -> "Add users"을 클릭한다.

  // Roles가 아니라 Users 이다.

---

> Step 5

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_5.png)

* 원하는 User name을 넣고 

  "Select AWS credential type은 Access key - Programmatic access"를 체크한다.

---


> Step 5

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_6.png)

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_7.png)

* [AmazonS3FullAccess, AWSCodeDeployFullAccess] 권한을 부여한다.

---

> Step 6

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_8.png)

* skip 해도 무방하다.

---

> Step 7

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_9.png)

* 본인이 설정한 값들이 정상적으로 반영되었는지 확인한다.

---

> Step 8

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_10.png)

* 해당 화면을 지나치면 다시 확인이 불가능하니 
  
  반드시 Access Key와 Secret Key를 저장해둔다.

---

> Step 9

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_11.png)

* Repository -> Settings -> Secrets -> Actions에 값을 추가한다.

```
AWS_ACCESS_KEY_ID : {% raw %}{{AWS_ACCESS_KEY_ID}} {% endraw %}
AWS_SECRET_ACCESS_KEY : {% raw %}{{AWS_ACCESS_KEY_ID}}{% endraw %}
AWS_REGION : ap-northeast-2
```

* AWS_ACCESS_KEY_ID와 AWS_SECRET_ACCESS_KEY에는 Step 8에서 발급받은 값을 넣고

  AWS_REGION에는 "ap-northeast-2"를 넣는다.
  
  (= ap-northeast-2 = Asia Pacific (Seoul) )


---

## Summary

* AWS S3 생성 및 설정 방법에 대해 알아봤다.

  [다음으로는 AWS의 CodeDeploy 설정을 하러 가보자 !]({{site.url}}/Github-Action-CI-CD-AWS-CodeDeploy/)

---

## Reference

* [github action과 aws code deploy를 이용하여 spring boot 배포하기(3)](https://isntyet.github.io/deploy/github-action%EA%B3%BC-aws-code-deploy%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-spring-boot-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0(3))

* [Github Actions + CodeDeploy + Nginx 로 무중단 배포하기 (1)](https://wbluke.tistory.com/39)