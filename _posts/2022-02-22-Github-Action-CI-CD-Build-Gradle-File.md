---
layout: post
title:  " Github Action으로 CI/CD 구축하기 - 6편 : build.gradle 분석 "
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

* 이번 글에서는 서버를 배포하는 데 필요한 jar 파일 생성과 관련해
  
  **build.gradle**에 대해 이야기를 나눠보려고 한다.

* 참고로 프로젝트 스택은 SpringBoot 2.6.3 + Gradle 7.3.3 이다.

---

## 배포 프로세스 

* build.gradle 이야기를 하기에 앞서 

  배포 프로세스에 대해 짚고 넘어가려 한다.

* Spring 프로젝트 빌드 시 build.gradle 내용을 참조하게 된다.

  ( [SpringBoot 2.5 이후 버전부터](https://earth-95.tistory.com/132) ) 특별한 설정이 없이 빌드를 하게 되면 2가지 jar 파일이 생성된다.

--- 

1. {Projcet-Name}-{Version}-plain.jar

2. {Projcet-Name}-{Version}.jar

---

* 그렇게 빌드된 결과물을 

  Github Action [deploy.yaml](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/.github/workflows/deploy.yaml)에서 zip 파일로 만들어 S3에 저장하고 
  
  CodeDeploy는 해당 zip 파일을 인스턴스로 가져와
  
  사전에 정의한 [배포 스크립트(= gh_deploy.sh)](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/scripts/gh_deploy.sh)를 사용하여 배포하게 된다.

---

## 문제 상황

* 프로세스를 보면 아무 문제가 없어 보이지만 

  jar 파일을 생성하는 시점에 **문제**가 발생한다.

* [배포 스크립트(= gh_deploy.sh)](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/scripts/gh_deploy.sh)를 보면 다음과 같은 수식으로 jar 파일을 찾는다.

  --> JAR_PATH="/home/ubuntu/github_action/build/libs/*.jar"

* 여기서 찾은 jar 파일을 우리는 배포를 할 텐데 

  이 상황에서 의도치 않게 "-plain"이 붙은 jar가 배포될 수 있다.

  원래 의도는 "-plain"이 붙지 않은 jar를 배포해야 한다.

* 그래서 "-plain"이 붙은 jar를 배포하려고 하면

  다음가 같은 error를 발생시키면서 배포를 실패하게 된다.

  *no main manifest attribute, in /home/ubuntu/github_action/{Projcet-Name}-{Version}-plain.jar*

* 그래서 위와 같은 상황을 방지하고자

  "-plain"이 붙은 jar는 생성되지 않도록 [build.gradle](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/build.gradle)에 아래와 같은 코드가 필요하다.

``` java
jar {
    enabled = false
}
```

---

## Summary

* 참고로 위에서 언급한 코드가 build.gradle에 반드시 필요하진 않다.

  배포 스크립트에서 jar 파일을 찾는 코드를 수정해도 정상적으로 배포할 순 있다.

* [다음으로 Github Action을 사용하여 빌드시 동적으로 변수 값 주입하는 방법에 대해서도 알아보자 !]({{site.url}}/Github-Action-Dynamic-Variable-Substitution/)


---

## Reference

* [[SpringBoot 2.5↑] 빌드 시 2가지 jar가 생성되는 현상 (executable jar & plain jar)](https://earth-95.tistory.com/132)