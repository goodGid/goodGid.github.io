---
layout: post
title:  " Ubuntu Login without Public Key "
categories: Technology
tags: EC2
author: goodGid
---
* content
{:toc}


## Problem

* 아마존 웹 서비스(AWS)에서 생성한 EC2 인스턴스는 기본적으로 생성시 발급한 공개키로만 접근이 가능하다.

* 공개키 접속 방법이 가장 뛰어난 보안성을 제공하지만, 경우에 따라서 Password를 통한 Login이 필요하다.

## How to Login Using Password

* Environment : Ubuntu 16.04.3 LTS (GNU/Linux 4.4.0-1022-aws x86_64)

### Step 1

#### Login with Public Key

{% capture images %}
	/assets/img/posts/ec2_login_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}



### Step 2

#### Access Config File

``` js

sudo vi /etc/ssh/sshd_config

```

### Step 3

#### Edit Config File

{% capture images %}
	/assets/img/posts/ec2_login_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


### Step 4

#### Change Password

1) sudo su - 로 root 권한으로 접속 후 타 계정의 PW를 바꾸는 경우

``` js

passwd user_ID

```



2) 현재 Login ID의 PW를 바꾸는 경우

``` js

passwd

```

{% capture images %}
/assets/img/posts/ec2_login_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

* 보이는 것과 같이 현재 Login ID는 ubuntu이고 <br> "Changing password for ubuntu."라는 멘트가 뜬다. <br> 그리고 PW를 바꾸면 된다.



### Step 5

#### Restart SSH

``` js

sudo service ssh restart

```


### Step 6

#### Login with Using Password Option

{% capture images %}
	/assets/img/posts/ec2_login_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

* Step 4에서 바꾼 PW로 Login을 하면 된다.

* 입력시 주의할 점은 ___@에서 @ 앞부분은 user_ID를 입력하면 된다.



