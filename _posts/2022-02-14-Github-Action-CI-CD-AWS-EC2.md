---
layout: post
title:  " Github Action으로 CI/CD 구축하기 - 1편 : AWS EC2 생성 및 설정 "
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

* [Github Action으로 CI/CD 구축하기 - 5편 : appspec.yml 분석]({{site.url}}/Github-Action-CI-CD-CodeDeploy-App-Spec-File/)

* [Github Action으로 CI/CD 구축하기 - 6편 : build.gradle 분석]({{site.url}}/Github-Action-CI-CD-Build-Gradle-File/)

* [Github Action을 사용하여 빌드시 동적으로 변숫값 주입하기 (feat. Dynamic Variable Substitution)]({{site.url}}/Github-Action-Dynamic-Variable-Substitution/)



---

## Prologue

* Github Action으로 CI/CD 구축을 위한 첫 번째 단계로

  AWS EC2 인스턴스 생성 및 설정에 대해 알아보자.

---

## EC2 생성

> Step 1

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_1.png)

* 우측 상단에 지역을 Asia Pacific (Seoul) ap-northeast-2 으로 맞추고

  위 사진처럼 "Launch Instance" 버튼을 클릭한다.

---

> Step 2

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_2.png)

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_3.png)

* Freetier이므로 해당 옵션을 클릭하고 원하는 OS를 선택한다.

  Ubuntu 버전은 반드시 **20.04 버전**으로 한다.

---

> Step 3

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_4.png)

* 서버를 접속 시 인증을 하기 위한 **.pem** 키를 발급한다.

---

> Step 4

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_5.png)

* Network 설정은 따로 건드리지 않고 기본적으로 선택되어 있는 상태를 유지한다.

---

> Step 5

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_6.png)

* 인스턴스를 생성한다.

---

> Step 6

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_7.png)

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_8.png)


* "Edit tags" 버튼을 클릭한다.

* tag를 설정해주는 이유는 

  CodeDeploy에서 tag group을 지정하는데

  이 때 CodeDeploy에서 설정한 key 값이랑 
  
  EC2에서 지정한 tag의 key 값을 매칭해서 
  
  해당 EC2 인스턴스에 CodeDeploy에 정의한 동작을 실행한다.

---

> Step 7

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_9.png)

* Inbound를 허용할 IP 설정을 위해

  해당 인스턴스에 연결되어 있는 Security group을 알야하는데

  위 사진처럼 원하는 인스턴스를 클릭 후 아래를 보면 알 수 있다.

---

> Step 8

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_10.png)

* "launch-wizard-1"를 클릭하면 자동으로 

  Security group 설정이 가능한 화면으로 전환된다.

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_11.png)

* 그러면 Inbound rules를 선택하고

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_12.png)

* 해당 인스턴스로 요청을 허용할 IP를 설정해준다.

  필요에 따라 IP4와 IP6를 다해준다.

  관련해서 [[네트워크] 0.0.0.0/0 과 ::/0는 뭐가 다른걸까?]({{site.url}}/Network-IP4-IP6-Different) 글을 참고하자.

---

> Step 9

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_13.png)

* 정적인 IP를 발급받기 위해 "EC2 -> Elastic IPs"를 클릭한다.

  EC2 인스턴스만 생성하면 IP가 동적으로 변경된다.

  즉 클라이언트는 IP 변경 시 계속해서 바뀐 IP로 호출하도록 수정을 해야 한다.

  이런 번거로움을 없애고자 정적인 IP를 할당받아 사용한다.

* 주의할 점은 나중에 EC2 인스턴스 종료 시

  인스턴스만 종료하고 정적 IP를 Release 하지 않으면 돈이 청구되니

  반드시 정적 IP도 같이 Release 하도록 하자 !

---

> Step 10

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_14.png)

* "Allocate Elastic IP addressInfo"를 클릭한다.

---

> Step 11

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_15.png)

* "Allocate" 버튼을 눌러 고정 IP를 할당받는다.

---

> Step 12

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_16.png)

* 생성된 고정 IP를 클릭한다.

---

> Step 13

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_17.png)

* "Associate Elastic IP address"를 클릭한다.

---

> Step 14

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_18.png)

* Instance 칸에 방금 위에서 생성한 EC2 인스턴스를 넣고

  "Associate" 버튼을 클릭한다.

* 이로써 EC2 인스턴스에 고정 IP 할당이 완료되었다.

---

> Step 15

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_19.png)

* 생성한 인스턴스에 접근하는 방법에 대해 알아본다.

* 우리가 생성한 인스턴스를 클릭 후 "Connect"를 클릭한다.

---

> Step 16

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_20.png)

* ssh 명령어로 접근할 수 있는 Command 명령어를 복사한다.

  그리고 터미널에서 pem가 있는 곳으로 이동 후 복사한 명령어를 붙여넣는다.

* 권한이 없다고 뜨면 명령어 가장 앞에 "sudo"를 붙히면 접속이 될 것이다.

  ex) sudo ssh -i "EC2.pem" ubuntu@ec2-15-164-37-248.ap-northeast-2.compute.amazonaws.com

* 추가로 **.pem** 키로 접근하는 게 번거롭다면

  [[AWS] EC2 Password로 접속하기 : Ubuntu Login with Password]({{site.url}}/Ubuntu-Login_Without_PublicKey) 글을 참고하여 P/W로만 접근할 수 있도록 설정을 변경하자.

---

> Step 18

``` 
$ sudo apt update && sudo apt upgrade
$ sudo apt install openjdk-11-jdk
$ sudo apt install openjdk-8-jdk

$ java -version
openjdk version "11.0.13" 2021-10-19
OpenJDK Runtime Environment (build 11.0.13+8-Ubuntu-0ubuntu1.20.04)
OpenJDK 64-Bit Server VM (build 11.0.13+8-Ubuntu-0ubuntu1.20.04, mixed mode, sharing)
```

* (선택 옵션)

  필자의 프로젝트는 스프링이므로 JDK를 설치해야 한다.

  인스턴스에 접속 후 본인이 사용할 JDK 버전을 설치한다.


---

> Step 19

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_21.png)


```
$ sudo apt update
$ sudo apt install ruby-full
$ sudo apt install wget
$ cd /home/ubuntu
$ wget https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install
$ chmod +x ./install
$ sudo ./install auto > /tmp/logfile
$ sudo service codedeploy-agent status
```

* Ubuntu 20.04 일 경우 위 명령어를 따라 하면 된다.

  만약 버전이 다를 경우엔 [Ubuntu Server용 CodeDeploy 에이전트 설치](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-ubuntu.html)글을 참고하자.

---

> Step 20

* EC2 생성 및 인스턴스 내 설정을 완료하였다.

* 다음으로는 EC2의 Config 설정과 같은 **IAM(Identity and Access Management)** 설정을 해야 한다.

---

> Step 21

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_22.png)

* IAM 서비스 -> Roles -> Create role을 클릭한다.

---

> Step 22

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_23.png)

* "AWS service"와 "EC2"를 클릭한다.

---

> Step 23

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_24.png)

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_25.png)

* [CodeDeployFullAccess, S3FullAccess] 권한을 부여한다.

---

> Step 25

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_26.png)

* "Role name"에는 원하는 값을 입력한다.

  그리고 Policies에 [CodeDeployFullAccess, S3FullAccess]가 정상적으로 들어가 있는지 확인한다.

* 정상적으로 생성되었다면

  생성된 IAM을 EC2 인스턴스에 적용해보자.

---

> Step 26

![](/assets/img/github/Github-Action-CI-CD-AWS-EC2_27.png)

* "EC2 -> Instances -> Instance 우클릭 -> Security -> Modify IAM role"을 클릭 후

  방금 생성한 IAM role을 넣어준다.


---

## Summary

* AWS EC2 생성 및 설정 방법에 대해 알아봤다.

  [다음으로는 AWS의 S3 설정을 하러 가보자 !]({{site.url}}/Github-Action-CI-CD-AWS-S3/)

---

## Reference

* [github action과 aws code deploy를 이용하여 spring boot 배포하기(2)](https://isntyet.github.io/deploy/github-action%EA%B3%BC-aws-code-deploy%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-spring-boot-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0(2))