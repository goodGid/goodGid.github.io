---
layout: post
title:  " EC2 Login without Public Key "
date:   2017-10-30
excerpt: " Login Using Password Option"
cate : "post"
tag:
- EC2
---

## Problem

* 아마존 웹 서비스(AWS)에서 생성한 EC2 인스턴스는 기본적으로 생성시 발급한 공개키로만 접근이 가능하다.

* 공개키 접속 방법이 가장 뛰어난 보안성을 제공하지만, 경우에 따라서 Password를 통한 Login이 필요하다.

## How to Login Using Password

* Environment : Ubuntu 16.04.3 LTS (GNU/Linux 4.4.0-1022-aws x86_64)

### Step 1

#### 우선 Public Key를 이용하여 EC2 Server에 접속한다. 

{% capture images %}
	/assets/img/posts/ec2_login_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}



### Step 2

#### Edit Config File

{% highlight JavaScript %}

sudo vi /etc/ssh/sshd_config

{% endhighlight %}

### Step 3

#### Access Config File

{% capture images %}
	/assets/img/posts/ec2_login_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


### Step 4

#### Edit Config File

1) sudo su - 로 root 권한으로 접속 후 타 계정의 PW를 바꾸는 경우

{% highlight JavaScript %}

passwd user_ID

{% endhighlight %}



2) 현재 Login ID의 PW를 바꾸는 경우

{% highlight JavaScript %}

passwd

{% endhighlight %}

{% capture images %}
	/assets/img/posts/ec2_login_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

보이는 것과 같이 현재 Login ID는 ubuntu이고

"Changing password for ubuntu."라는 멘트가 뜬다.

그리고 PW를 바꾸면 된다.



### Step 5

#### Restart SSH

{% highlight JavaScript %}

sudo service ssh restart

{% endhighlight %}


### Step 6

#### Login with Using Password Option

{% capture images %}
	/assets/img/posts/ec2_login_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

Step 4에서 바꾼 PW로 Login을 하면 된다.

입력시 주의할 점은 ___@에서 @ 앞부분은 user_ID를 입력하면 된다.



