---
layout: post
title:  " Github에서 PR 생성 시 Reviewer 자동으로 할당하기 (feat. CODEOWNERS) "
categories: Github
author: goodGid
---
* content
{:toc}

## Prologue

> How to automatically assign a reviewer?

* Github에서 PR 생성 시 자동으로 Reviewers를 지정해주는 [기능](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners)이 있다.

* 다만 몇 가지 조건을 충족시켜야 한다.

  시간이 없으신 분들은 **[Summary]({{site.url}}/Github-CODEOWNERS/#summary)**만 보고

  시간이 있다면 다양한 케이스를 직접 테스트하면서 정리해놓은 내용까지 함께 보는 걸 추천한다.





## CODEOWNERS 

### File Location

* [사용법](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners#codeowners-file-location)은 매우 간편하다.

  **CODEOWNERS** 이라는 파일명을 가진 파일을
  
  **root**, **docs/**, **.github/** 중 원하는 디렉토리에 위치하면 된다.

> [Github Docs](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners#codeowners-file-location)

```
To use a CODEOWNERS file, 
create a new file called CODEOWNERS in the root, docs/, or .github/ directory of the repository, 
in the branch where you'd like to add the code owners.
```

### Syntax

```
# This is a comment.
# Each line is a file pattern followed by one or more owners.

# These owners will be the default owners for everything in the repo.
*.java @global-owner1 @global-owner2

# You can also use email addresses if you prefer.
*.go docs@example.com

# In this example, 
# @doctocat owns any files in the build/logs
/build/logs/ @doctocat

# The `docs/*` pattern will match files like
# `docs/getting-started.md` 
# but not further nested files like `docs/build-app/troubleshooting.md`.
docs/*  docs@example.com

# In this example, 
# @octocat owns any file in an apps directory
# anywhere in your repository.
apps/ @octocat

# In this example, @doctocat owns any file in the `/docs`
# directory in the root of your repository 
# and any of its subdirectories.
/docs/ @doctocat

# In this example, @octocat owns any file in the `/apps` 
# directory in the root of your repository 
# except for the `/apps/github` subdirectory, as its owners are left empty.
/apps/ @octocat
/apps/github 
```

---

* 실제로 사용할 때는 다음과 같이 Simple하게 작성하였다.

> CODEOWNERS

```
# Example
*.java @goodGid1 @goodGid2 @goodGid3
```





#### Reviewer로 Team을 지정

* 개인이 아닌 **Team 단위**로도 Reviewer를 할당할 수 있다.

---

> Step 1

![](/assets/img/tech/Github-CODEOWNERS_Team_1.png)

* Organizations에서 Teams를 선택한다.

---

> Step 2

![](/assets/img/tech/Github-CODEOWNERS_Team_2.png)

* New team 버튼을 눌러 Team을 생성한다.

  그리고 Team에 Member를 추가한다.

---

> Step 3

![](/assets/img/tech/Github-CODEOWNERS_Team_3.png)

* Repositories -> Add repository 버튼을 클릭 후 원하는 Repository를 추가한다.

---

> Step 4

![](/assets/img/tech/Github-CODEOWNERS_Team_4.png)

* CODEOWNERS 파일을 수정한다.

  여기서 @org/team_name 형식으로 선언을 해주면 된다.

* 예제에서 org는 DEMO-CODEOWNER 이므로 다음과 같이 작성을 하였다.

  ***.java @DEMO-CODEOWNER/goodgid_team**

---

> Step 5

![](/assets/img/tech/Github-CODEOWNERS_Team_5.png)

* 그리고 PR을 생성하면 Team이 할당된다.

---



## Example

* Team이 아닌 개인별로 할당하는 Example을 다양한 케이스로 알아보자.






### Organizations 권한 = Member

![](/assets/img/tech/Github-CODEOWNERS_Organizations_1.png)

#### Public Repository

> Organizations 권한 = `Member` && Manage Access 권한 부여 `X`

![](/assets/img/tech/Github-CODEOWNERS_1.png)

![](/assets/img/tech/Github-CODEOWNERS_ManageAccess_1.png)

* Organizations 권한이 Member이고

  Manage Access 권한이 부여되지 않았으므로

  Reviewers에 자동으로 추가되지 않는다.

  ==> **Reviewers 추가 X**

<br>

> Organizations 권한 = `Member` && Manage Access 권한 부여 `O`

![](/assets/img/tech/Github-CODEOWNERS_2.png)

![](/assets/img/tech/Github-CODEOWNERS_ManageAccess_2.png)

* Organizations 권한이 Member이지만

  Manage Access 권한이 부여되었으므로

  Reviewers에 자동으로 추가된다.

  ==> **Reviewers 추가 O**












#### Private Repository

> Organizations 권한 = `Member` && Manage Access 권한 부여 `X`

![](/assets/img/tech/Github-CODEOWNERS_3.png)

* Private Repository이므로

  Organizations 권한과 Manage Access 권한 값에 상관없이
  
  Reviewers에 자동으로 추가되지 않는다.

  ==> **Reviewers 추가 X**


<br>

> Organizations 권한 = `Member` && Manage Access 권한 부여 `O`

![](/assets/img/tech/Github-CODEOWNERS_4.png)

* Private Repository이므로 

  Organizations 권한과 Manage Access 권한 값에 상관없이
  
  Reviewers에 자동으로 추가되지 않는다.

  ==> **Reviewers 추가 X**









### Organizations 권한 = Owner

![](/assets/img/tech/Github-CODEOWNERS_Organizations_2.png)

#### Public Repository

> Organizations 권한 = `Owner` && Manage Access 권한 부여 `X`

![](/assets/img/tech/Github-CODEOWNERS_5.png)

* Organizations 권한이 Owner이므로

  Manage Access 권한과 상관없이

  Reviewers에 자동으로 추가된다.

  ==> **Reviewers 추가 O**

<br>

> Organizations 권한 = `Owner` && Manage Access 권한 부여 `O`

![](/assets/img/tech/Github-CODEOWNERS_6.png)

* Organizations 권한이 Owner이므로

  Manage Access 권한과 상관없이

  Reviewers에 자동으로 추가된다.

  ==> **Reviewers 추가 O**













#### Private Repository

> Organizations 권한 = `Owner` && Manage Access 권한 부여 `X`

![](/assets/img/tech/Github-CODEOWNERS_7.png)

* Organizations 권한이 Owner이지만

  Private Repository이므로
  
  Manage Access 권한과 상관없이 Reviewers에 자동으로 추가되지 않는다.

  ==> **Reviewers 추가 X**

<br>

> Organizations 권한 = `Owner` && Manage Access 권한 부여 `O`

![](/assets/img/tech/Github-CODEOWNERS_8.png)

* Organizations 권한이 Owner이지만

  Private Repository이므로
  
  Manage Access 권한과 상관없이 Reviewers에 자동으로 추가되지 않는다.

  ==> **Reviewers 추가 X**



---

## Summary

* 일반적인 Github 계정 유저라면 **Public Repository**를 사용해야 한다.
  
  이 후 Organizations 권한과 Manage Access 권한을 적절하게 설정해줘야 정상적으로 CODEOWNERS가 동작한다.

* 만약 **Private Repository**를 사용해야 한다면

  다음과 같은 계정을 사용해야지만 CODEOWNERS가 동작한다.
  
  ex) GitHub Pro / GitHub Team / GitHub Enterprise Cloud / GitHub Enterprise Server

> [About code owners](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners)

```
You can define code owners in public repositories with GitHub Free and GitHub Free for organizations, 
and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server.
```


