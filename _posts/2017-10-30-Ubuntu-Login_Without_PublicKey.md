---
layout: post
title:  " [AWS] EC2 Password로 접속하기 : Ubuntu Login with Password "
categories: AWS
author: goodGid
---
* content
{:toc}

## Goal

* AWS에서 생성한 EC2 인스턴스는 

  기본적으로 생성시 발급한 공개키(=**.pem**)로만 접근이 가능하다.

* 하지만 Password로 접근하는게 좀 더 편리하기 때문에 
  
  공개키가 아닌 Password로 접근하는 방법에 대해 알아보자.






## Login with Password

* Environment : Ubuntu 16.04.3 LTS (GNU/Linux 4.4.0-1022-aws x86_64)

---

> Step 1. Login with Public Key

``` shell
ssh -i "goodgid-ec2.pem" ubuntu@ec2-13-124-47-92.ap-northeast-2.compute.amazonaws.com
```

---


> Step 2. Access Config File

``` shell
sudo vi /etc/ssh/sshd_config
```

---


> Step 3. Edit Config File

* **PasswordAuthentication** 값을 수정한다.

![](/assets/img/aws/ec2_login_1.png)



---


> Step 4. Change Password

* root 권한으로 접속하여 User Password를 변경한다.

``` shell
sudo su -       # root 권한 접속
passwd ubuntu   # Password 변경
```

![](/assets/img/aws/ec2_login_2.png)

---


> Step 5. Restart SSH

``` shell
sudo service ssh restart
```



---

> Step 6. Login without Public Key

![](/assets/img/aws/ec2_login_3.png)

* **-i "goodgid-ec2.pem"** 옵션없이 로그인이 가능해졌다.

* 접속 시 @ 앞에는 접속할 User ID를 입력하면 된다.