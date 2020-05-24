---
layout: post
title:  " Maven Project Structure 알아보기 "
categories: Java
author: goodGid
---
* content
{:toc}

* 해당 글은 Apache Maven Project의 [공식 Docs(Standard Directory Layout)](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html)를 번역한 글이다.

![](/assets/img/java/maven_project_structure_1.png)







## 번역

*참고로 번역은 필자가 주관적으로 하였기 때문에 정석적인 번역이 아닐 수 있음을 주의하자.*

*Gid : 가 없는 문장은 해석을 실패한 문장이다.*

```
Introduction to the Standard Directory Layout

Having a common directory layout would allow for users familiar with one Maven project to immediately feel at home in another Maven project.
// Gid : 공통적인 디렉토리 레이아웃을 갖는 것은 Maven 프로젝트 경험이 있는 유저가 다른 Maven 프로젝트를 접했을 때 친밀하고 집에 있는듯한 느낌을 갖게 한다.
// Google : 일반적인 디렉토리 레이아웃을 사용하면 한 Maven 프로젝트에 익숙한 사용자가 다른 Maven 프로젝트에서 집에있는 것처럼 느낄 수 있습니다.


The advantages are analogous to adopting a site-wide look-and-feel.
// Gid : 이러한 장점들은 유사(analogous)하다. 사이트 전체의 모양과 느낌을 채택하는 것과
// Google : 장점은 사이트 전체의 모양과 느낌을 채택하는 것과 유사합니다.

The next section documents the directory layout expected by Maven and the directory layout created by Maven. 
// Gid : 다음 섹션에서는 설명(documents)한다. Maven이 기대하는 디렉토리 레이아웃과 Maven이 만든 디렉토리 레이아웃에 대해
// Google : 다음 섹션에서는 Maven이 기대하는 디렉토리 레이아웃과 Maven이 만든 디렉토리 레이아웃에 대해 설명합니다.

Please try to conform to this structure as much as possible; 
// Gid : 가능한한 이구조를 따르자(conform).
// Google : 가능한 한이 구조를 준수하도록 노력하십시오.

however, if you can't these settings can be overridden via the project descriptor.
(= if you can't these settings, it can be overridden via the project descriptor.)
// Gid : 그러나 만약 너가 이런 셋팅을 따를 수 없다면 프로젝트 설명서를 통해 Override해라.
// Google : 그러나 이러한 설정은 프로젝트 설명자를 통해 무시할 수 없습니다.
```

![](/assets/img/java/maven_project_structure_2.png)

```
At the top level, files descriptive of the project: a pom.xml file. 
// Gid & Google : 최상위 레벨에서 프로젝트를 설명하는 파일 : pom.xml 파일.

In addition, there are textual documents meant for the user to be able to read immediately on receiving the source: README.txt, LICENSE.txt, etc.
// Gid : 게다가 textual 문서들은 유저들이 즉각적으로 읽을 수 있게 해준다. README.txt, LICENSE.txt, etc.와 같은 소스들을
// Google : 또한 README.txt, LICENSE.txt 등 소스를 받으면 즉시 읽을 수있는 텍스트 문서가 있습니다.
// "Mean for" : To intend for something to be received

There are just two subdirectories of this structure: src and target. 
// Gid : 이 구조에 2개의 subdirectories가 있다. : src와 target
// Google : 이 구조체에는 src와 target이라는 두 개의 하위 디렉토리가 있습니다.

The only other directories that would be expected here are metadata like CVS, .git or .svn, and any subprojects in a multiproject build (each of which would be laid out as above).
// Google : 여기서 기대할 수있는 유일한 디렉토리는 CVS, .git 또는 .svn과 같은 메타 데이터와 다중 프로젝트 빌드의 모든 하위 프로젝트입니다 (각각 위와 같이 배치됩니다).
// subprojects in a multiproject build : 다중 프로젝트 빌드의 하위 프로젝트

The target directory is used to house all output of the build.
// Gid : target directory는 사용된다. 모든 빌드 결과물을 house하는데
// Google : 대상 디렉토리는 빌드의 모든 출력을 저장하는 데 사용됩니다.
// "house" : 저장하다.

The src directory contains all of the source material for building the project, its site and so on.
// Google : src 디렉토리는 프로젝트를 빌드하기위한 모든 소스 자료, 사이트 등을 포함합니다.
// "its site and so on." : 그 사이트 등등.

It contains a subdirectory for each type: main for the main build artifact, test for the unit test code and resources, site and so on.
// Gid : src directory는 포함한다. 각 타입의 하위디렉토리를, the main build artifact를 위한 핵심과 unit test code와 자원, 사이트를 위한 test, 기타 등등
// Google : 기본 빌드 아티팩트에 대한 main, 유닛 테스트 코드 및 리소스에 대한 테스트, 사이트 등에 대한 각 유형의 하위 디렉토리가 있습니다.

Within artifact producing source directories (ie. main and test), 
// Gid : source directories를 생성하는 artifact안에서 (예를 들어 main과 test)
// Google : 이슈 생성 소스 디렉토리 (예 : 주 및 테스트) 내에서

there is one directory for the language java (under which the normal package hierarchy exists), and one for resources (the structure which is copied to the target classpath given the default resource definition).
// Google : 언어 java (일반 패키지 계층 구조가 존재하는)와 자원 (기본 자원 정의가 주어진 경우 대상 클래스 경로에 복사되는 구조)에 대한 하나의 디렉토리가 있습니다.

If there are other contributing sources to the artifact build, they would be under other subdirectories: for example src/main/antlr would contain Antlr grammar definition files.
// Google : 이슈 빌드에 다른 기여 소스가있는 경우 다른 서브 디렉토리 아래있을 것입니다. 예를 들어 src / main / antlr에는 Antlr 문법 정의 파일이 들어 있습니다.
// Fail : "If there are other contributing sources to the artifact build,"

```




---

## 참고

* [Introduction to the Standard Directory Layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html)

* [Maven Project Structure Example](https://examples.javacodegeeks.com/enterprise-java/maven/maven-project-structure-example/)