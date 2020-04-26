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

## Time Zone

> [Step 1] Check Current Time Zone

``` js
ubuntu@node1:~$ date
Mon Jan 8 01:00:00 UTC 2018
```

---

> [Step 2] Find Time Zone files

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


> [Step 3] Change Local Time

``` js
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
```

---

> [Step 4] Check the changed Time Zone

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

