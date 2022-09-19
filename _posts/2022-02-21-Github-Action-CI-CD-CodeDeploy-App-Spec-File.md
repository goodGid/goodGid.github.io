---
layout: post
title:  " Github Action으로 CI/CD 구축하기 - 5편 : appspec.yml 분석 "
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

* 이번 글에서는 빌드된 결과물을 

  인스턴스에 배포하기 위해 사용되는 스크립트(= appspec.yml)를 분석해본다.

* 주의할 점은 appspec.yaml로 하면 CodeDeploy Agent가 찾질 못한다.
  
  **반드시 확장자를 yml**으로 해야한다.


---

## appspec.yml

* [AppSpec File은 CodeDeploy에서 배포를 관리하는 데 사용하는 YAML 형식 또는 JSON 형식의 파일이다.](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file.html)

* [AppSpec 파일은 파일에 정의된 일련의 수명 주기 이벤트 후크로 각 배포를 관리하는 데 사용된다.](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/application-specification-files.html)

> [appspec.yml](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/appspec.yml)

``` yaml
version: 0.0
os: linux
files:
  - source:  /
    destination: /home/ubuntu/github_action
    overwrite: yes

permissions:
  - object: /
    pattern: "**"
    owner: ubuntu
    group: ubuntu

hooks:
  ApplicationStart:
    - location: scripts/gh_deploy.sh
      timeout: 60
      runas: ubuntu
```

* files, permissions, hooks의 영역을 **[섹션](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-structure.html)**이라고 부른다.

* 본격적으로 각 세션을 분석해보자.

---

### [files](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-structure-files.html)

> Section

``` yaml
files:
  - source:  /
    destination: /home/ubuntu/github_action
    overwrite: yes
```

---

**source**

* [source 명령은 인스턴스에 복사할 수정된 파일 또는 디렉터리를 식별한다.](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-structure-files.html)

  source에 사용된 경로는 appspec.yml 파일에 상대적이다.

``` java
if (source == 파일명) { // 단순 파일명만 표기
  지정한 파일만 인스턴스에 복사
} else if (source == directory) { // directory 표기
  directory 내의 모든 파일이 인스턴스에 복사
} else if (source == "/") { // = 슬래시 하나인 경우
  수정된 버전의 모든 파일이 인스턴스에 복사
}
```

---

**destination**

* destination 명령은 인스턴스에서 파일이 복사되어야 하는 위치를 식별한다.

  작성 방법은 정규화된 경로여야 한다.

  ex) /root/destination/directory

---

> Example

``` yaml
files:
  - source: Config/config.txt
    destination: /webapps/Config
  - source: source
    destination: /webapps/myApp
```

* 위와 같이 섹션을 설정하였다면 다음 2가지 작업이 수행된다.

1. (S3에 저장된) Config/config.txt 파일을 인스턴스의 /webapps/Config/config.txt 경로에 복사한다.

2. (S3에 저장된) source directory에 있는 파일을 인스턴스의 /webapps/myApp directory로 모두 복사한다.

---

> 결과 확인

* 실제로 Github Action CI/CD 작업 전/후 상태를 보면서 원하는대로 동작하는지 확인해보자.

---

**Github Action의 CI/CD 작업 전 상태**

![](/assets/img/github/Github-Action-CI-CD-CodeDeploy-App-Spec-File_1.png)

* 해당 경로에 아무것도 존재하지 않은 상태이다.

---

**Github Action의 CI/CD 작업 후 상태**

![](/assets/img/github/Github-Action-CI-CD-CodeDeploy-App-Spec-File_2.png)

* ( 예제 프로젝트에서 복사할 파일들은 S3에 위치한다. )

  S3에 저장된 파일들이 destination(= /home/ubuntu/github_action)에 정의되어 있는 경로에 복사되었음을 확인할 수 있다.

---


### [permissions](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-structure-permissions.html)

> Section

``` yaml
permissions:
  - object: /
    pattern: "**"
    owner: ubuntu
    group: ubuntu
```

* 'permissions' 섹션은 'files' 섹션에서 정의한 파일이 인스턴스에 복사된 후 

  해당 파일에 권한이 어떻게 적용되어야 하는지를 지정한다.

* 그리고 EC2/온프레미스 배포용으로만 'permissions' 섹션을 사용한다. 

  AWS Lambda 또는 Amazon ECS 배포에는 [resources 섹션](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html)이 사용된다.

---

> Instructions

* 우리가 사용한 명령들(= Instructions)에 대해서만 알아보자.

  그 외에 명령에 대해서는 [AWS Docs](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-structure-permissions.html)를 참고하자.

``` java
object 
- 선택이 아니라 필수 사항이다. 
- 문자열을 사용하여 object를 지정한다.

pattern
- 선택 사항이다. 
- 권한을 적용할 패턴을 지정한다. 
- 따옴표("")가 있는 문자열을 사용하여 pattern을 지정한다.
- 지정하지 않거나 특수 문자 "**"를 사용하여 지정하면 권한이 type에 따라 일치하는 모든 파일에 적용된다.

owner
- 선택 사항이다.
- object의 소유자 이름이다. 
- 문자열을 사용하여 owner를 지정한다.
- 지정하지 않으면 원본 파일에 적용된 기존의 모든 소유자가 복사 작업 후에도 아무것도 변경되지 않는다.

group 
- 선택 사항이다. 
- object의 그룹 이름이다. 
- 문자열을 사용하여 group을 지정한다.
- 지정하지 않으면 원본 파일에 적용된 기존의 모든 소유자가 복사 작업 후에도 아무것도 변경되지 않는다.
```


---

> Example

* permissions과 관련된 예제는 [AWS Docs](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-structure-permissions.html)에 자세히 나와 있으니 공식 문서를 보는 걸 추천한다.


---

### [hooks](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html)

> Section

``` yaml
hooks:
  ApplicationStart:
    - location: scripts/gh_deploy.sh
      timeout: 60
      runas: ubuntu
```

* AppSpec 파일의 'hooks' 섹션 내용은 해당 배포의 컴퓨팅 플랫폼에 따라 다르다.

* EC2/온프레미스 배포에 대한 'hooks' 섹션에는 

  배포 수명 주기 이벤트 후크를 하나 이상의 스크립트에 연결하는 매핑이 포함되어 있다.
  
* Lambda 또는 Amazon ECS 배포에 대한 'hooks' 섹션은 

  배포 수명 주기 이벤트 중 실행하는 Lambda 확인 함수를 지정한다.
  
* 이벤트 후크가 없는 경우 해당 이벤트에 대해 작업이 실행되지 않는다.

---

> Elements

**location**

* 필수 요소이다. 

  hooks 섹션에서 지정한 스크립트 위치는 Application root를 기준으로 한다.

* [gh_deploy.sh](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/scripts/gh_deploy.sh)를 예를 들면 

  root(= /github_action)를 기준으로 scripts directory에 위치한다.
  
  ![](/assets/img/github/Github-Action-CI-CD-CodeDeploy-App-Spec-File_3.png)

---

**timeout**

* 선택 사항이다.

* 기본값은 3,600초(1시간)이다.

* 각 배포 수명 주기 이벤트에 대한 스크립트 실행에 허용되는 최대 시간이다. 

  설정 시간을 초과하면 이벤트는 실패처리가 된다.

---

**runas**

* 선택 사항이다.

* 기본적으로 인스턴스에서 실행 중인 CodeDeploy 에이전트이다. 

---

> Example

``` yaml
# AfterInstall – Application 구성 또는 파일 권한 변경과 같은 작업에 이 배포 수명 주기 이벤트를 사용할 수 있다.
hooks:
   AfterInstall:
     - location: Scripts/RunResourceTests.sh
       timeout: 180
```

* Scripts/RunResourceTests.sh는 배포 프로세스의 AfterInstall 단계 중 실행된다. 

* 스크립트 실행 시간이 180초(3분)를 넘어가면 배포에 성공하지 못한다.

* 'hooks' 섹션에서 지정한 스크립트 위치는 Application root를 기준으로 한다.

  그러므로 Scripts directory는 root에 위치한다.

---

## Summary

* S3에 저장된 빌드 결과물을

  CodeDeploy가 인스턴스에 배포하기 위해 사용하는 스크립트(= appspec.yml)를 분석해봤다.

* 크게 3가지 섹션으로 나눠서 알아봤고

  각 섹션이 어떤 의미와 기능을 담당하는지도 알아봤다.

* [다음으로는 스프링 프로젝트를 jar 파일로 생성하여 배포를 한다면 주의해야할 부분에 대해 알아보자 !]({{site.url}}/Github-Action-CI-CD-Build-Gradle-File/)

* [또한 Github Action을 사용하여 빌드시 동적으로 변수 값 주입하는 방법에 대해서도 알아보자 !]({{site.url}}/Github-Action-Dynamic-Variable-Substitution/)