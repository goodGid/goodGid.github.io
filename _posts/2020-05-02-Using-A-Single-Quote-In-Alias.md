---
layout: post
title:  " [Linux] Alias에서 싱글 쿼터(') 사용하기 "
categories: Linux
author: goodGid
---
* content
{:toc}

## Situation

* Linux 환경에서 

  Shell에서는 정상적으로 동작하는

  **싱글 쿼터(')**가 포함된 Command Line 명령어를

  alias로 설정을 하려고하니 적용이 되지 않았다.
  



---

## Solution

* 해결 방법은 간단하다.

* alias에서는 **싱글 쿼터(')**를 그냥 사용하면 안된다.

* 싱글 쿼터를 다음과 같이 변경을 해줘야한다. 

  <p><strong>'</strong> -> <strong>'\''</strong></p>  

``` shell
// Wrong Case
alias stop_sv='kill -9 `ps -ef | grep server_name | awk '{print $2}'`'

// Right Case
alias stop_sv='kill -9 `ps -ef | grep server_name | awk '\''{print $2}'\''`'
```


---

## Additional Info

### .bashrc 수정 방법

* .bashrc을 수정하기 위한 방법은 다음과 같다.

```
1. vim ~/.bashrc
2. alias 설정
3. source ~/.bashrc     // 변경된 .bashrc 적용
```

<br>

* 만약 싱글 쿼터를 그냥 사용하여 alias 설정을 하려한다면

  <p>ex) alias stop_sv='kill -9 `ps -ef | grep server_name | awk '{print $2}'`'</p>
  
  다음과 같은 Error를 보게 된다.

``` shell
ubuntu@node1:~$ source ~/.bashrc
-bash: alias: }`: not found
```
