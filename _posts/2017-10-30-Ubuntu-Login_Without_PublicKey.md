---
layout: post
title:  " Ubuntu Login without Public Key "
categories: AWS
author: goodGid
---
* content
{:toc}


## Problem

* 아마존 웹 서비스(AWS)에서 생성한 EC2 인스턴스는 

* 기본적으로 생성시 발급한 공개키로만 접근이 가능하다.

* 공개키 접속 방법이 가장 뛰어난 보안성을 제공하지만

* 경우에 따라서 Password를 통한 Login이 필요하다.






## How to Login Using Password

* Environment : Ubuntu 16.04.3 LTS (GNU/Linux 4.4.0-1022-aws x86_64)

### 1. Login with Public Key

```
ssh -i "goodgid-ec2.pem" ubuntu@ec2-13-124-47-92.ap-northeast-2.compute.amazonaws.com
```

### 2. Access Config File

```
sudo vi /etc/ssh/sshd_config
```

### 3. Edit Config File

* **PasswordAuthentication** 필드 값만 하여도

* PW로 로그인이 가능하다.

![](/assets/img/aws/ec2_login_1.png)


### 4. Change Password

1. root 권한으로 접속

``` 
sudo su -
```

* PW 변경

```
passwd ubuntu
```


### 5. Restart SSH

``` 
sudo service ssh restart
```

![](/assets/img/aws/ec2_login_2.png)

### 6. Login without Public Key

![](/assets/img/aws/ec2_login_3.png)

* **-i "goodgid-ec2.pem"** 옵션없이 로그인이 가능하다.

* @ 앞에 User ID를 입력하면 된다.