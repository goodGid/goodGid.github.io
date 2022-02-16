---
layout: post
title:  " Github Action으로 CI/CD 구축하기 - 3편 : AWS CodeDeploy 생성 및 설정 "
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

* Github Action으로 CI/CD 구축을 위한 세 번째 단계로

  AWS CodeDeploy 생성 및 설정에 대해 알아보자.

---

## CodeDeploy

> Step 1

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_1.png)

---

> Step 2

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_2.png)

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_3.png)

---

> Step 3

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_4.png)

* Step 2에서 CodeDeploy를 선택했으므로 자동으로 "CodeDeployRole" 권한이 부여되어있다.

  추가로 권한 부여를 할 필요가 없으니 다음으로 넘어간다.

---

> Step 4

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_5.png)

* tags는 skip 한다.

---

> Step 5

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_6.png)

* "Role name"에는 원하는 값을 입력한다.

  이로써 CodeDeploy를 위한 IAM 생성이 완료되었다.

  이 IAM은 CodeDeploy 생성 시 사용한다.

---

> Step 6

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_7.png)

* "CodeDeploy -> Application -> Create application" 클릭을 한다.

---

> Step 7

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_8.png)

* Application name에는 원하는 값을 입력한다.

* "Compute platform"은 **EC2/On-premises**를 선택한다.

---

> Step 8

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_9.png)

* CodeDeploy Application을 생성했다.

  이제는 이 Application안에 Deploy Group을 생성한다.

---

> Step 9

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_10.png)

* **Service role**에 방금 위에서 생성한 IAM을 넣어준다.

---

> Step 10

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_11.png)

* Tag group에 보면 "CodeDeploy-Element" 값이 존재한다.

  이 값은 [Github Action으로 CI/CD 구축하기 - 1편 : AWS EC2 생성 및 설정]({{site.url}}/Github-Action-CI-CD-AWS-EC2/#ec2-생성)에서 Step 6에서 지정한 값이다.

* 이렇게 CodeDeploy와 EC2간 tag 값으로

  해당 EC2 인스턴스에 대해 CodeDeploy가 사전 정의한 동작을 실행할 수 있게 된다.

---

> Step 11

![](/assets/img/github/Github-Action-CI-CD-AWS-CodeDeploy_12.png)

* **Deployment settings** 값에 대해 궁금하다면

  [CodeDeploy에서 배포 구성 작업](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/deployment-configurations.html)글을 참고하자 !

* 따로 LB 설정을 하지 않았다면 **Load balancer** 체크 박스는 해제해준다.

* 이로써 CodeDeploy 설정이 완료되었다.

---

## Summary

* AWS CodeDeploy 생성 및 설정 방법에 대해 알아봤다.

  [다음으로는 Github Action에서 사용할 CI/CD 스크립트를 작성하러 가보자 !]({{site.url}}/Github-Action-CI-CD-Workflows/)

---

## Reference

* [github action과 aws code deploy를 이용하여 spring boot 배포하기(3)](https://isntyet.github.io/deploy/github-action%EA%B3%BC-aws-code-deploy%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-spring-boot-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0(3))