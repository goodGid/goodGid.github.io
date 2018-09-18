---
layout: post
title:  " 로드 밸런싱과 클러스터링 "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

# 로드밸런싱(Loadbalancing)

> 로드 밸런싱이란 부하 분산을 위해서 가상(virtual) IP를 통해 여러 서버에 접속하도록 분배하는 기능을 말한다.

![](/assets/img/posts/load_balancing_and_clustering_1.png)








* 하나의 인터넷 서비스가 발생하는 트래픽이 많을 때 여러 대의 서버가 분산처리하여 <br> 서버의 로드율 증가, 부하량, 속도 저하 등을 고려하여 적절히 분산처리하여 해결해 주는 서비스이다. 

* 로드밸런싱은 하나의 서비스를 하나 이상의 노드가 처리하는 식으로 작동한다.

* 서버의 로드를 **클러스터링된 서버별**로 균등하게 나누어 주는 서버를 말한다.

* 로드밸런싱을 이용하면 한 서버가 다운되더라도 이중화시킨 다른 서버에서 서비스를 지속하여, <br> 사용자들이 문제를 인지하지 못하게 할 수 있다.

* 로드밸런싱을 위한 서비스 요청 처리 알고리즘은 다양하다. <br> 랜덤, 라운드 로빈, CPU나 메모리 사용률 등과 같은 특정 범주에 따라 노드를 선택하는 등의 방법이 있다. <br> 오픈소스 로드밸런서 중 많이 사용되고 있는 것은 HAProxy이다.



* 로드밸런싱을 해주는 소프트웨어 혹은 하드웨어 장비를 **로드밸런서**라고 한다. 

* **로드밸런서**의 주 목적은 동시에 오는 수 많은 커넥션을 처리하고 해당 커넥션이 요청 노드 중의 하나로 전달될 수 있게 하는 것이다. 그리고 단지 노드를 추가하는 것만으로 서비스가 확장성을 가질 수 있도록 한다. 

---

## 로드 밸런싱 종류

* L2
  - Mac주소를 바탕으로 Load Balancing 진행

* L3
  - IP주소를 바탕으로 Load Balancing 진행


* L4
  - Transport Layer(IP와 Port) Level에서 Load Balancing 진행
  - TCP, UDP

![](/assets/img/posts/load_balancing_and_clustering_2.png)

<br>

* L7
  - Application Layer(사용자의 Request) Level에서 Load Balancing 진행
  - HTTP, HTTPS, FTP


![](/assets/img/posts/load_balancing_and_clustering_3.png)

<br>

* HTTP
  - X-Forwarded-For : HTTP or HTTPS 로드 밸런서를 사용할 때 클라이언트의 IP 주소를 식별하는 데 도움을 준다.
  - X-Forwarded-Proto : 클라이언트가 로드 밸런서 연결에 사용한 프로토콜(HTTP or HTTPS)을 식별하는 데 도움을 준다.
  - X-Forwarded-Port : 클라이언트가 로드 밸런서 연결에 사용한 포트를 식별하는 데 도움을 준다.


![](/assets/img/posts/load_balancing_and_clustering_4.png)


---

## 로드 밸런싱 장애 대비

* 로드밸런서 서버의 이중화를 기본으로 구성 한다.

![](/assets/img/posts/load_balancing_and_clustering_5.png)

---

## 로브 밸런싱 장애 발생 시

* 이중화된 Load Balancer들은 서로 Health Check를 한다.

* Master서버와 Standby서버을 구성하고 <br> Master 서버가 Fail 시 Standby 서버가 자동으로 Master 서버의 역할을 한다.

* Standby서버는 평상시에는 대기상태로만 있다가 Master 서버가 Fail 되었을 경우만 작동을 한다.

* 이 구성을 **Fail Over**라 한다. 

![](/assets/img/posts/load_balancing_and_clustering_6.gif)




---

## 로드 밸런싱의 단점

* 로드밸런서를 사용할 때 어려운 문제 중 하나는 **세션 데이터**를 관리하는 것이다. 

* 클라이언트의 연결 정보를 저장하는 세션이 로드밸런싱을 통해 하나의 서버 장비에 저장이 되는 경우, <br> 추후 다른 서버로 접속하게 되면, 해당 클라이언트의 세션이 유지되지 않는다는 것이다. <br> 즉, 서버에 액세스 할 때마다 다른 세션을 사용한다면 특정 사용자의 정보를 일관성있게 유지할 수 없게 된다. 

* 이러한 문제를 해결하기 위해 **세션을 고정(session sticky)**한다. 

* 이 방법으로 특정 사용자의 요청이 전달될 노드를 고정시킬 수 있다. <br> 하지만 이 방법도 문제가 있다. 고정된 세션의 노드에 장애가 발생하면 고정한 의미가 없어진다. <br> 장애가 발생하여 비활성화된 노드에 대한 고려가 필요하다.


---

## 주요 기술

* **[NAT(Network Address Translation)](https://goodgid.github.io/NW-NAT/)** 
  - private IP를 public IP로 바꾸는데 사용하는 통신망의 주소변조기

* **DSR(Dynamic Source Routing protocol)** 
  - 로드밸런서 사용 시 서버에서 클라이언트로 되돌아가는 경우 <br> 목적지 주소를 [스위치](https://goodgid.github.io/Server-Switching/)의 IP주소가 아닌 클라이언트의 IP 주소로 전달해서 네트워크 스위치를 거치지 않고 바로 클라이언트를 찾아가는 개념

* **Tunneling** 
  - 인터넷 상에서 눈에 보이지 않는 통로를 만들어 통신할 수 있게 하는 개념
  - 데이터를 캡슐화해서 연결된 상호 간에만 캡슐화된 패킷을 구별해 캡슐화를 해제할 수 있다.


---

## 대용량 서비스를 위한 부하 분산

* 대용량 트래픽을 장애없이 처리하려면 여러 대의 서버에 적절히 트래픽을 분배해야 한다. <br> 단지 몇 개의 노드만 있다면 라운드 로빈 DNS와 같은 방식이 합리적이다. <br> 로드 밸런서 자체의 비용이 높고 불필요한 복잡함을 증가시킬 수 있기 때문이다.  

* DNS에서는 하나의 도메인 이름을 라운드 로빈 방식으로 여러 개의 IP 주소를 변환한다면 이것만으로 쉽게 부하 분산이 가능하다. 

* 하지만 여기에 두 가지 단점이 존재한다.
  - 첫째, 대부분의 클라이언트에서는 DNS 서버의 부하를 줄이고 성능을 향상시키기 위해 일정 시간 동안 캐싱하기 때문에 부하 분산이 균등하게 발생하지 않는다. 
  - 둘째, 특정 서버에 장애가 발생하더라도 장애 여부가 감지되지 않아 서비스에서 해당 서버를 제거할 수 없다.

* 그렇기 때문에 대규모 시스템에는 다양한 알고리즘과 스케줄링이 사용되고 있다. <br> 이러한 알고리즘들은 네트워크 트래픽과 분산 요청을 제어하면서 자동 절체나 이상 노드 제거와 같은 신뢰성 관련한 기능을 제공한다.


---


# 클러스터링(Clustering)

> 여러 대의 컴퓨터를 똑같은 구성의 서버군을 병렬로 연결한 시스템으로 마치 하나의 컴퓨터처럼 사용하는 것을 클러스터라고 한다.

* 여러 대의 컴퓨터를 가상의 하나의 컴퓨터처럼 사용하게 해주는 것을 클러스터링 이라고 한다.

* 클러스터링 환경에서는 특정 장비에 문제가 생기거나 애플리케이션에 문제가 생기더라도, 전체적인 서비스에는 영향을 주지 않게 제어할 수 있다.

* 클러스터링은 **Virtual IP(가상 IP)** 기반으로 구현되는데, 서비스를 제공하는 실제 장비는 Physical IP를 가지고, <br> 데이터의 처리는 Virtual IP를 통해 처리한다. 이렇게 내부의 시스템은 철저하게 가려 **추상화**하는 것이 원칙이다.

* 클러스터링 환경에서는 특정 장비에 문제가 생기거나 특정 장비에서 실행중인 애플리케이션에 문제가 발생하더라도 전체 서비스에 영향을 미치지 않도록 제어가 가능하다.

* 로드밸런서에 의해 각 클러스터링된 서버에 의해 서비스가 진행이 된다.



---


# 확장 면에서 비교

* 2가지 방법이 있다. 
  - *Scale-up* : Server가 더 빠르게 동작하기 위해 하드웨어 성능을 올리는 방법
  - *Scale-out* : 하나의 Server 보다는 여러 대의 Server가 나눠서 일을 하는 방법

* 둘 다 **Scale-out** 방식, <br> 즉 수평 방향으로 노드를 추가해서 성능을 업그레이드 하는 방법이다. 

* 저렴한 노드를 여러개 묶어서 성능을 업그레이드 하며, **Scale-up** 방식에 비해 비용을 줄일 수 있으며 유연한 구성이 가능하다. 

* Scale-out의 **장점**은 HW 향상하는 비용보다 서버 한 대 추가 비용이 더 적다. 



---


# 정리

* 로드 밸런싱은 [L4](https://goodgid.github.io/Load-Balancing-And-Clustering/#%EB%A1%9C%EB%93%9C-%EB%B0%B8%EB%9F%B0%EC%8B%B1-%EC%A2%85%EB%A5%98) or [L7](https://goodgid.github.io/Load-Balancing-And-Clustering/#%EB%A1%9C%EB%93%9C-%EB%B0%B8%EB%9F%B0%EC%8B%B1-%EC%A2%85%EB%A5%98)이 여러대의 서버에 패킷을 **부하분산**시켜주는 것이고 <br> 클러스터링은 여러대의 서버를 하나의 서버로 만들어 주는 것이다. 

* **클러스터링**은 한서비스를 제공하는 여러개의 서버를 하나로 묶어 성능을 높여 많은양의 패킷을 처리하는 것이고, <br> 로드밸런싱은 여러대의 서버에 분산을 시켜주는 것이다.

* 클러스터링이란 단어를 여러 그룹을 하나로 묶을 때 사용하는 약간 추상적인 단어 느낌이 든다.


---


# 참고

* [클러스터링이랑 로드밸런싱의 차이](https://blog.naver.com/tnrms007/221335657847)

* [로드발란싱이란? 클러스터링이란?](http://hanbiro.com/temp/view.php?bid=cluster&no=1)

* [로드밸런싱과 클러스터링](http://asfirstalways.tistory.com/320)

* [Load Banancing And Clustering](http://wookiist.tistory.com/57#fn4)

* [로드 밸런서(Load Balancer)란?](https://nesoy.github.io/articles/2018-06/Load-Balancer)
