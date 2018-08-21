---
layout: post
title:  " [서버를 장애로부터 보호하기] UPS "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# UPS

* 시스템 장애의 원인으로 특히 많은 것이 <b>전원 장애</b>이다.

* 전원 장애로부터 서버를 보호하는 기구가 <b>UPS(무정전 전원 장치)</b>이다.

* UPS는 정전 시 서버를 안전하게 종료시키는 등 전원에 관한 여러 가지 역할을 담당한다.


---

# 정상적으로 시스템을 종료시킨다.

* UPS는 정전 시에도 정상적으로 시스템 종료 처리를 할 수 있는 장치를 갖고 있다.

```
1. UPS는 정전 발생 시 내장하고 있는 배터리를 사용하여 연결되어 있는 서버에 전원을 공급한다.

2. 그와 동시에 서버에 인스톨된 SW에게 '정전 상태'를 통지한다.

3. 그 명령을 받은 SW는 '평상시'와 똑같은 순서대로 시스템 종료를 수행한다.

4. UPS는 미리 설정해 놓은 시간이 경과하면 전원 공급을 정지한다.
```
 

 

---

{% capture images %}
    /assets/img/server/ups_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

