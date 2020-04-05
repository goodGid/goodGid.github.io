---
layout: post
title:  " EC2 :: 표준시간대 변경 "
categories: AWS
author: goodGid
---
* content
{:toc}


## EC2에서 인스턴스 표준시간대 변경

1. 현재 표준시간대 확인
``` js
  date
```

![](/assets/img/aws/localtime_1.png)

2. 표준 시간대 파일 찾기
  1. 전체 시간대 탐색
``` js
  ls /usr/share/zoneinfo
```

  2. 서울이 Asia에 있으므로 Asia폴더 접근
``` js
  ls /usr/share/zoneinfo/Asia
```

![](/assets/img/aws/localtime_3.png)

3. LocalTime을 원하는 시간으로 바꾸기
``` js
  sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
```

4. ubuntu 재부팅
``` js
  sudo reboot
```
재부팅하는데 5 ~ 10분이 걸린다

5. 바뀐 시간대 확인
``` js
  date
```

![](/assets/img/aws/localtime_2.png)