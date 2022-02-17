---
layout: post
title:  " Github Action으로 CI/CD 구축하기 - 4편 : deploy.yaml 분석 "
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

* 이번 글에서는 Github Action CI/CD 사용 시 반드시 필요한 Workflow를 분석해본다.

---

## Github Action Workflows 

> [deploy.yaml](https://github.com/goodGid/Github-Action-Variable-Substitution/blob/main/.github/workflows/deploy.yaml)

``` yaml
name: CI-CD

on:
  push:
    branches:
      - main

env:
  S3_BUCKET_NAME: tiltil
  RESOURCE_PATH: ./src/main/resources/application.yaml
  CODE_DEPLOY_APPLICATION_NAME: tiltil-code-deploy
  CODE_DEPLOY_DEPLOYMENT_GROUP_NAME: tiltil-server

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Set up JDK 11
        uses: actions/setup-java@v1
        with:
          java-version: 11
        
        # [1]
      - name: Set yaml file 
        uses: microsoft/variable-substitution@v1
        with:
          files: {% raw %}${{ env.RESOURCE_PATH }} {% endraw %}
        env:
          override.value: {% raw %}${{ secrets.DI_FROM_SECRET }} {% endraw %}
          # override.value: 'from deploy.yaml' <-- 이렇게 사용해도 주입이 된다.

      - name: Grant execute permission for gradlew
        run: chmod +x ./gradlew
        shell: bash

        # [2]
      - name: Build with Gradle
        run: ./gradlew build
        shell: bash

        # [3]
      - name: Make zip file
        run: zip -r ./$GITHUB_SHA.zip .
        shell: bash

        # [4]
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: {% raw %}${{ secrets.AWS_ACCESS_KEY_ID }} {% endraw %}
          aws-secret-access-key: {% raw %}${{ secrets.AWS_SECRET_ACCESS_KEY }} {% endraw %}
          aws-region: {% raw %}${{ secrets.AWS_REGION }} {% endraw %}

        # [5]
      - name: Upload to S3
        run: aws s3 cp --region ap-northeast-2 ./$GITHUB_SHA.zip s3://$S3_BUCKET_NAME/$GITHUB_SHA.zip

        # [6]
      - name: Code Deploy
        run: | 
          aws deploy create-deployment \
          --deployment-config-name CodeDeployDefault.AllAtOnce \
          --application-name {% raw %}${{ env.CODE_DEPLOY_APPLICATION_NAME }}{% endraw %} \
          --deployment-group-name {% raw %}${{ env.CODE_DEPLOY_DEPLOYMENT_GROUP_NAME }}{% endraw %} \
          --s3-location bucket=$S3_BUCKET_NAME,bundleType=zip,key=$GITHUB_SHA.zip
```

---

### [1] Set yaml file

``` yaml
- name: Set yaml file 
  uses: microsoft/variable-substitution@v1
  with:
    files: {% raw %}${{ env.RESOURCE_PATH }} {% endraw %}
  env:
    override.value: {% raw %}${{ secrets.DI_FROM_SECRET }} {% endraw %}
    # override.value: 'from deploy.yaml' <-- 이렇게 사용해도 주입이 된다.
```

* Github Action을 사용하여 빌드 시 

  동적으로 변수에 값을 주입하기 위한 Step이다.

* 그러면 이런 질문을 던질 수 있다.

  " 반드시 필요한 Step인가? "

  답을 하자면 CI/CD를 위해 해당 Step은 필요하지 않다.

  그러나 아마도 필요할 것이다. 

  그 이유는 [이 글]({{site.url}}/Github-Action-Dynamic-Variable-Substitution)을 참고하자.

---

### [2] Build with Gradle

``` yaml
- name: Build with Gradle
  run: ./gradlew build
  shell: bash
```

* Gradle로 빌드를 하기 위한 Step이다.

  만약 멀티 모듈 구조의 프로젝트라면 run 부분을 다음과 같이 원하는 옵션을 넣어 사용하면 된다.

``` yaml
- name: Build with Gradle
  run: ./gradlew clean :tiltil-api:buildNeeded --stacktrace --info -x test
  # run: ./gradlew clean :{ Module-Name }:buildNeeded --stacktrace --info -x test
  shell: bash
```

---

### [3] Make zip file

``` yaml
- name: Make zip file
  run: zip -r ./$GITHUB_SHA.zip .
  shell: bash
```

* 프로젝트를 빌드했으면 그 결과물을 어딘가에 저장을 시켜놔야 한다.

  ( 바로 EC2 인스턴스에 배포하고 싶지만 그렇게는 안 된다. )

  근데 그냥 저장시키는 게 아니라 zip 파일로 압축해서 저장시키는 데 필요한 Step이다.

* zip 파일 저장 시 파일명은

  Github에서 default로 제공하는 환경변수인 **[GITHUB_SHA](https://docs.github.com/en/actions/learn-github-actions/environment-variables)**를 사용한다.

```
GITHUB_SHA : The commit SHA that triggered the workflow. 
             For example, ffac537e6cbbf934b08745a378932722df287a53.
```

* 이렇게 저장된 zip 파일은

  AWS의 S3라는 저장소에 저장되고

  AWS의 CodeDeploy를 사용하여 EC2 인스턴스에 배포한다.

---

### [4] Configure AWS credentials

``` yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: {% raw %}${{ secrets.AWS_ACCESS_KEY_ID }} {% endraw %}
    aws-secret-access-key: {% raw %}${{ secrets.AWS_SECRET_ACCESS_KEY }} {% endraw %}
    aws-region: {% raw %}${{ secrets.AWS_REGION }} {% endraw %}
```

* AWS 서비스에 접근하는 데 필요한 권한을 얻어오는 Step이라고 생각하면 된다.

![](/assets/img/github/Github-Action-CI-CD-Workflows_1.png)

---

### [5] Upload to S3

``` yaml
- name: Upload to S3
  run: aws s3 cp --region ap-northeast-2 ./$GITHUB_SHA.zip s3://$S3_BUCKET_NAME/$GITHUB_SHA.zip
```

* 빌드된 결과물을 S3에 저장하기 위한 Step이다.

* 만약 위 스크립트를 가져다 사용할 경우

  **수정해야 하는 부분**은 **$S3_BUCKET_NAME** 값이다.

* 저 변수 같은 경우에 Workflow 상단에 선언해놓았다.

``` yaml
env:
  S3_BUCKET_NAME: tiltil
```

* 그렇다면 저 *tiltil* 값은 어디 있을까?

  S3 버켓 이름을 그대로 작성하면 된다.

![](/assets/img/github/Github-Action-CI-CD-Workflows_2.png)


---

### [6] Code Deploy

``` yaml
- name: Code Deploy
  run: | 
    aws deploy create-deployment \
    --deployment-config-name CodeDeployDefault.AllAtOnce \
    --application-name {% raw %}${{ env.CODE_DEPLOY_APPLICATION_NAME }}{% endraw %} \
    --deployment-group-name {% raw %}${{ env.CODE_DEPLOY_DEPLOYMENT_GROUP_NAME }}{% endraw %} \
    --s3-location bucket=$S3_BUCKET_NAME,bundleType=zip,key=$GITHUB_SHA.zip
```

* 만약 위 스크립트를 가져다 사용할 경우

  **수정해야 하는 부분**은 **application-name** 과 **deployment-group-name** 값이다.

* 저 값들은 AWS의 CodeDeploy 서비스에서 가져오면 된다.

> application-name

![](/assets/img/github/Github-Action-CI-CD-Workflows_3.png)

---

> deployment-group-name

![](/assets/img/github/Github-Action-CI-CD-Workflows_4.png)

---

### [7] Github Secrets

* 코드를 보다 보면 다음과 같이 **secrets**로 시작하는 Key 값들이 보인다.

``` yaml
{% raw %}${{ secrets.DI_FROM_SECRET }} {% endraw %}
{% raw %}${{ secrets.AWS_ACCESS_KEY_ID }} {% endraw %}
{% raw %}${{ secrets.AWS_SECRET_ACCESS_KEY }} {% endraw %}
{% raw %}${{ secrets.AWS_REGION }} {% endraw %}
```

* 위 값들은 Github Action 동작 시

  Github Repository -> Settings -> Secrets -> Actions에 정의해놓은 값들이 주입된다.

![](/assets/img/github/Github-Action-CI-CD-Workflows_5.png)

---

## Summary

* 이번 글에서는 Github Action에서 CI/CD를 위해 사용하는 

  deploy.yaml 스크립트에 대해 상세하게 분석을 해봤다.

* [다음으로 CodeDeploy가 배포 시 사용할 스크립트를 작성하러 가보자 !]({{site.url}}/Github-Action-CI-CD-CodeDeploy-App-Spec-File/)
