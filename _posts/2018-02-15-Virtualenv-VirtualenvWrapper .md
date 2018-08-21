---
layout: post
title:  " Install Virtualenv / VirtualenvWrapper "
categories: Python
tags: Python
author: goodGid
---
* content
{:toc}


## What is Virtualenv?

* `Virtualenv` is a tool to create isolated Python environments.

* A Virtual Environment, put simply, is an isolated working copy of Python which
allows you to work on a specific project without worry of affecting other projects

* It enables multiple side-by-side installations of Python, one for each project.

* It doesn’t actually install separate copies of Python, but it does provide a
clever way to keep different project environments isolated. 

<br>

Ex) 만약 A프로젝트에는 v1.1의 라이브러리를 사용해야만 하고,

B프로젝트에는 v2.1의 라이브러리를 사용해야만 한다고 가정하면

Local에서 그냥 실행시켰을 때 

전역으로 설치되어있는 라이브러리의 충돌이 일어날 수 있다. 

이런 문제를 방지하기 위해

A프로젝트에는 v1.1 / B프로젝트에는 v2.1만을 사용할 수 있게

고유한 영역을 생성하여 관리하게 도와주는게 Virtualenv이다 ! 

---

## What did Virtualenv do?

* Packages installed here will not affect the global Python installation. 

* Virtualenv does not create every file needed to get a whole new python environment

* It uses links to global environment files instead in order to save disk space end
speed up your virtualenv. 

* Therefore, there must already have an active python environment installed on your
system.


---

## What is VirtualenvWrapper ?

`VirtualenvWrapper`를 사용하지 않고 

VirtualEnv를 사용하기 위해서는 source를 이용해 가상환경에 진입해야한다. 

그러나, 이 진입 방법은 가상환경이 설치된 위치로 이동해야되는 것 뿐 아니라 

가상환경이 어느 폴더에 있는지 일일이 사용자가 기억해야 하는 단점이 있다. 

이를 보완하기 위해 VirtualenvWrapper를 사용한다.

또한, VirtualenvWrapper를 사용할 경우 

터미널이 현재 위치한 경로와 관계없이 가상환경을 활성화할 수 있다는 장점이 있다. 

---

## 1. Install pip3 (python3 기준)

* Mac OS에는 기본적으로 전역에 Python2가 설치되어 있다.

```
$ sudo easy_install pip
or
$ brew install python3
```

* 만약 sudo로 시스템 전역에 설치하기가 싫다면 <br> HomeBrew를 이용해 Python을 유저영역에 설치하도록 하자.

* 정상적으로 설치가 되었는지 체크

```
# python3일 경우
$ pip3 --version
or    
$ pip3 --V (Capital V)
```


--- 

## 2. Install virtualenv / virtualenvwrapper 


```
$ pip3 install virtualenv virtualenvwrapper
```


--- 


## 3. Set Virtualenvwrapper Environment Variable

[virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper/4.8.2) is a set of extensions to Ian Bicking’s virtualenv tool. The extensions include wrappers for creating and deleting virtual environments and otherwise managing your development workflow, making it easier to work on more than one project at a time without introducing conflicts in their dependencies.

* 환경변수 `WORKON_HOME`이 지정되어 있을 경우 해당 경로에 가상환경을 만든다.

* `workon` 명령어를 사용시 `WORKON_HOME`이 지정된 경로에서 검색합니다.

* `virtualenvwrapper.sh` 내용을 보면 설치 방법이 적혀있다.

{% capture images %}
    /assets/img/posts/virtualenv-virtualenvWrapper_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---

### 1. 각각의 가상 환경을 관리할 폴더를 만든다.

```
$ mkdir ~/dev/.virtualenvs
```

--- 


### 2. WORK_HOME 변수에 값을 지정해준다.

```
$ echo export WORKON_HOME=~/dev/.virtualenvs >> ~/.bash_profile
```

---

### 3. Virtualenvwrapper가 사용할 Python 지정

* `Python3` 설치 경로 찾기

{% capture images %}
/assets/img/posts/virtualenv-virtualenvWrapper_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


```
$ which python3
```

* 환경 변수 VIRTUALENVWRAPPER_PYTHON 값 지정

```
$ echo export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python3 >> ~/.bash_profile
```

---

### 4. Virtualenvwrapper 명령어 등록

* virtualenvwrapper.sh 파일에 virtualenvwrapper에 관련된 모든 설정이 있다.

* `virtualenvwrapper.sh` 설치 경로 찾기

```
$ sudo find / -name 'virtualenvwrapper.sh'
```

{% capture images %}
/assets/img/posts/virtualenv-virtualenvWrapper_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %} 

* 터미널이 실행될 때 마다 해당 파일을 실행하여 환경 변수값을 설정할 수 있는 명령어를 ~/.bash_profile 에 추가해준다.

```
$ echo source /Library/Frameworks/Python.framework/Versions/3.6/bin/virtualenvwrapper.sh >> ~/.bash_profile
```


---

### 5. 최신 .bash_profile 적용

```
$ source ~/.bash_profile
```


---

### 6. 가상 환경 구축 해보기 !

#### 6-1. 가상 환경 만들기

```
$ mkvirtualenv 가상환경이름
# 예시
# $ mkvirtualenv test_env
```

* mkvirtualenv 명령어를 사용할 경우 홈 디렉토리의 .virtualenvs폴더 안에 가상환경이름을 가진 폴더(test_env)가 생긴다.

---

#### 6-2. 가상 환경 지우기

```
$ rmvirtualenv 가상환경이름
# 예시
# $ rmvirtualenv test_env
```

* rmvirtualenv 명령어를 사용할 경우 mkvirtualenv로 만든 가상환경을 지워준다.

* 또한 홈 디렉토리의 .virtualenvs폴더 안의 가상환경이름을 가진 폴더를 지워도 삭제 된다.

---

#### 6-3. 가상 환경 리스트 조회

```
$ workon 
```

---

#### 6-4. 가상 환경 진입

```
$ workon 가상환경이름
# 가상환경으로 진입시 앞에 (가상환경이름)이 붙는다.
(가상환경이름) $
# 예시
# $ workon test_env
# (test_env) $
```

* 가상 환경 진입시 쉘의 앞단에 (test_env) 이라는 문구가 추가되는 것을 볼 수 있다.

* 이제 우리가 작업하는 모든 파이썬 관련 환경은 이 곳을 기준으로 한다.

* 주의할 점은, 이 디렉터리에서 나가 어디를 가더라도 파이썬을 사용하는 환경은 현재 활성화중인 가상환경이라는 것이다.

* 비활성화를 까먹고 다른 프로젝트에 가서 작업을 하면 골치아픈 상황이 생길 수도 있으니 <br> 다른 프로젝트에 필요한 일이 있을 경우 반드시 가상 환경을 나간 후 작업을 해야한다.


---


### 6-5. 가상 환경 나오기

```
(가상환경이름) $ deactivate
$
# 예시
# (test_env) $ deactivate
# $
```

---

## Related Resource

* 참고 Blog List

1. [Blog 1](https://beomi.github.io/2016/12/28/HowToSetup-Virtualenv-VirtualenvWrapper/)

2. [Blog 2](https://urbanscenery.github.io/server/2018/01/15/django_virtualenv_setting/)

3. [Blog 3](http://ulismoon.tistory.com/2 [ulismoon])