---
layout: post
title:  " [네트워크 기초 지식] 스위칭 "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}



# 이더넷 네트워크는 스위치를 중심으로 구축한다.

* 이더넷은 `스위칭`이라는 네트워크 기기를 중심으로 하여 <br> 컴퓨터를 배치해 가는 `스타형 토폴리지 연결 형태`를 채택

---

# MAC 주소 테이블을 사용하여 스위칭

스위치는 프레임이 들어온 `LAN 포트 번호`와 

그 프레임의 `출발지 MAC 주소`를 테이블로 만들어 <b>일정 기간</b> 동안 기억해 둔다.

이로써 불필요한 프레임 전송을 막고 이더넷 네트워크의 통신 효율을 샹항 시킬 수 있다.

<br>

스위치가 수행하는 프레임 전송을 `스위칭`이라고 하며,

스위치가 스위칭에서 사용하는 LAN 포트 번호와 

출발지 MAC 주소의 테이블을 `MAC 주소 테이블`이라고 한다.

<br>

스위치는 아래와 같은 순서로 MAC 주소 테이블을 만들어 

필요한 포트에게만 프레임을 전송하도록 한다.

```
1. 
프레임을 받은 스위치는 
프레임이 들어온 LAN 포트 번호와 출발지 MAC 주소를 
MAC 주소 테이블에 기록

2. 
if( 목적지 MAC 존재 in MAC 주소 테이블 )
그 정보를 바탕으로 프레임을 전송

else
모든 포트에게 프레임의 복사본을 송신하는데,
이 때 해당되는 컴퓨터만 프레임을 수취하고 그 외의 컴퓨터는 프레임을 파기

3.
그 후는 프레임이 들어올 때마다 MAC 주소 테이블의 정보를 갱신
더 이상 사용하지 않는 정보는 일정 시간 경과 후 삭제
```


{% capture images %}
    /assets/img/server/switching_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


<br>

{% capture images %}
    /assets/img/server/switch_function_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


