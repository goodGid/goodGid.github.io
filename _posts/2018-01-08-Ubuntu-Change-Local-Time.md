---
layout: post
title:  " [Ubuntu] 우분투(Ubuntu)에서 Time Zone 변경하기 "
categories: Linux
author: goodGid
---
* content
{:toc}

## Goal

* Ubuntu에서 표준시간대(Time Zone)을 변경하는 법을 알아보자.




---

## Set Time Zone

### 1st Method

> Step 1. Check Current Time Zone

``` js
ubuntu@node1:~$ date
Mon Jan 8 01:00:00 UTC 2018
```

---

> Step 2. Find Time Zone files

* 전체 시간대 탐색

``` js
ls /usr/share/zoneinfo
```

* 서울은 Asia에 있으므로 

  Asia 폴더로 이동

``` js
ls /usr/share/zoneinfo/Asia
```

![](/assets/img/linux/Ubuntu-Change-Local-Time_1.png)

---


> Step 3. Change Local Time

``` js
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
```

---

> Step 4. Check the changed Time Zone

``` js
ubuntu@node1:~$ date
Mon Jan 8 10:00:00 KST 2018
```


---


> [Option] Reboot ubuntu

* 적용이 안 될 경우에 Reboot를 해준다.

* 재부팅 시 5 ~ 10분 정도 소요된다.

``` js
sudo reboot
```



---

### 2st Method

#### Dpkg-reconfigure

* [dpkg-reconfigure](https://wiki.debianusers.or.kr/index.php?title=Dpkg-reconfigure)는 패키지가 설치된 이후에 패키지를 다시 설정한다.

* 재설정을 위해서는 패키지 또는 패키지의 이름을 전달해야 한다.



#### 사용법

``` shell
dpkg-reconfigure [ 옵션 ] 패키지이름
```

---

> Step 1.

``` shell
sudo dpkg-reconfigure tzdata
```

---

> Step 2.

<img src="/assets/img/linux/Ubuntu-Change-Local-Time_2.png" alt="" style="max-width: 40%;"> 
<img src="/assets/img/linux/Ubuntu-Change-Local-Time_3.png" alt="" style="max-width: 50%;">


* 설정하고자하는 Time Zone을 선택한다.

---

> Step 3.

![](/assets/img/linux/Ubuntu-Change-Local-Time_4.png)

* 설정이 끝나면 변경된 Time Zone을 확인한다.



