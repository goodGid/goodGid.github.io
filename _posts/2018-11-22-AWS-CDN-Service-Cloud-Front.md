---
layout: post
title:  " AWS의 CDN 서비스(Cloud Front) "
categories: AWS
tags: AWS
author: goodGid
---
* content
{:toc}

## CDN이란?

* Cloud Front는 CDN (Contents Delivery Network) 서비스 이다.

* 이미지나 동영상 같은 **정적인 컨텐츠들**을 서비스하는데 

* 서버가 있는 데이터 센터에서 서비스를 하게 되면 

* 네트워크 latency 때문에 성능이 저하가 되기 때문에 

* 전세계의 여러 개의 데이터 센터에 서버(이를 edge node 또는 edge server라고 함)를 넣고

* 클라이언트와 가까운 데이터 센터로 부터 컨텐츠를 제공하는 서비스 이다.

<br>

* 얼마나 많은 지역별 데이터 센터에 edge node를 설치하고 서비스를 제공하느냐

* 각 edge node의 네트워크 대역폭이나 용량은 충분하느냐가 서비스의 품질을 결정하는데 

* 세계적으로 Akamai와 Limelight 등의 업체가 유명하다.

* 아마존의 경우에도 얼마전부터 Cloud Front라는 이름으로 CDN 서비스 제공을 시작했다.










---

## Cloud Front 동작 시나리오

![](/assets/img/aws/aws_cdn_service_cloud_front_1.png)

```
1. Client가 웹사이트에 접속한다. 
웹사이트를 www.terry.com이라고 하자.

2. Client는 DNS 서버를 통해서 www.terry.com 의 주소를 look up 한다. 
이 때 www.terry.com은 cloud front의 URL로 맵핑이 되어있어야 하는데 
CNAME 레코드를 이용하여 www.terry.com을 해당 사이트에 대한 Cloud Front URL로 맵핑 해놓는다. 
여기서는 asdf.cloudfront.net이라고 가정하자

3. Client는 asdf.cloundfront.net 의 주소를 다시 look up을 하는데
Route53에 의해서 Client와 가장 가까운 위치에 있는 Cloud Front의 edge node 주소를 리턴 받게 된다.

4. Client는 리턴 받은 ip를 가지고 Cloud Front의 edge server로 접속을 한다.

5. Cloud Front에는 URL에 따라서 resource의 위치를 RULE로 정해놓는데
위의 예에서는 /image 디렉토리의 파일은 S3에 원본을 두고 Cloud Front에 캐슁하도록 하고
/css/ 아래 파일들은 원격지에 있는 (Amazon이 아닌) 서버에 두고 캐슁을 하도록 하였다. 
그리고 *.jsp 파일은 캐슁 없이 직접 원본 서버로 가도록 하였다.

6. 만약에 /image/나 /css/에 있는 파일을 Client가 요청 하였을 경우 edge node의 캐쉬를 체크해보고
캐쉬에 내용이 없으면 원본 서버로 부터 파일을 읽어서 캐쉬에 저장한 후 Client에 리턴한다. 
캐쉬에 있을 경우에는 바로 리턴을 한다.
```
---

## Origin Server

* 앞에서 설명한 시나리오에서 원본 파일이 저장되는 곳을 Origin Server라고 한다.

* Origin Server는 Amazon의 S3 bucket이나 EC2 인스턴스 또는 Amazon 밖의 서버가 될 수 있다.


---

## 서비스가 가능한 컨텐츠의 종류

* Cloud Front를 통해서 서비스가 가능한 컨텐츠의 종류는 다음과 같다.

    - Download Distribution : HTTP 프로토콜을 이용해서 다운로드 받을 수 있는 이미지나 기타 정적인 리소스 파일

    - Streaming Distribution : HTTP Progressive Down load나 RTSP(Real Time Streaming Protocol)을 지원하는 동영상 컨텐츠


---

## Cache 동작

* CDN은 기본적으로 컨텐츠를 **edge node**에 캐쉬 해놓는 것을 기능으로 한다. 

* 캐쉬이기 때문에 유지 시간 **TTL**이 있는데 기본 TTL 시간은 24시간이고 최대 1시간으로 까지 줄일 수 있다.

* 그런데 만약 파일을 잘못 올렸거나 수정이 필요할 때 

* 캐쉬의 TTL 시간에 의해서 수정이 edge node에 반영되는 시간까지 최소 1시간이 소요된다.

* 이런 문제를 해결하기 위해서 Cloud Front는 **invalidation API(특정 파일을 캐쉬에서 지우는 기능)**을 제공한다.

* 한번에 **최대 3개**의 invalidation request을 실행할 수 있으며

* 각 invalidation request는 **최대 1000개의 파일**까지만 지원한다. 

* 그리고 invalidation request는 모든 edge node에 반영되어야 하기 때문에 보통 5~10 분 정도의 시간이 소요된다.

<br>

* 그래서 조금 더 빠르게 캐쉬에서 컨텐츠를 업데이트 하기 위해서는 

* **버전을 사용하기를 권장**하는데 쉽게 이야기 해서 파일명을 바꾸도록 하는 것이다. 

* /image/photo.png가 있을때 이 파일이 변경되기를 원할 경우

* HTML 원본에서 해당 이미지 명을 /image/photo_v2.png로 변경하고

* 새로운 파일명도 photo_v2.png로 저장을 하면 별도의 cache invalidation 작업 없이 바로 변경 내용을 반영할 수 있다.

<br>

* 파일명을 바꾸는 게 부담 스러울 경우에는 **Query String**을 사용할 수 있다.

* 예를 들어 /image/photo.png?version=1.0 으로 HTML에서 이미지 경로를 걸어 놓으면 

* Cloud Front는 "photo.png?version=1.0"을 키로 캐쉬에 파일을 저장을 하고

* Origin server에 이렇게 파일을 요청하게 되면 

* 이 파일은 정적인 컨텐츠이기 때문에 Query String은 무시 되고 

* Origin Sever는 "photo.png" 파일만 리턴한다. 

* 원본 컨텐츠가 바뀌었을 경우 원본 컨텐츠의 파일명은 변환할 필요가 없이 똑같이 "photo.png" 파일로 저장을 하되

* HTML의 참조명을 /image/photo.png?version=2.0으로만 바꿔 주면 

* Cloud Front입장에서는 resource의 이름이 아까와 다른 이름이기 때문에

* Cache에서 찾지 못하고 다시 Origin Server로 요청하게 된다

* 참고로 Query String을 버전명으로 사용하기 위해서는 

* Cloud Front설정에서 Query String by pass 기능을 on 해줘야 한다

---

## 성능 향상 방법

* Cloud Front를 사용하는데 있어서 몇 가지 성능을 향상 시킬 수 있는 테크닉이 있다.

> Domain Sharding 

* 일반적으로 웹브라우져는 하나의 도메인 주소에 대해서 동시에 열 수 있는 네트워크 Connection 수가 제한이 있다. 

* IE7의 경우에는 한 도메인당 2개 Chrome과 IE8/9은 6개 Fire Fox의 경우에는 8개이다. 

* 그런데 일반적인 웹 페이지에서 동시에 로딩되는 리소스는 대략 20~50개 정도가 된다.

* 즉 웹브라우져가 여는 Connection 수로는 한꺼번에 모든 리소스 로딩이 어렵다는 것이다. 

* 일반적인 CDN에서도 적용될 수 있는 기법인데 하나의 시스템에 여러개의 도메인을 적용하는 것이다. 

* 예를 들어 서버의 주소가 210.113.119.210 이라고 하고

* 도메인 명이 www.terry.com 이라고 하자.

* CNAME으로 image.terry.com, resource.terry.com, css.terry.com 등 

* 여러개의 도메인을 같은 URL을 가리키도록 해놓고 HTHL에서도 

* image url을 "src="http://image.terry.com/img/myimage.png" 식으로 지정해놓게 되면 

* 브라우져 입장에서는 전혀 다른 사이트로 인식하기 때문에 별도의 네트워크 Connection을 열 수 있다. 

* 이 방법을 사용하면 브라우져의 Connection을 최대로 열어서 전체적인 웹사이트 Loading Time을 증가시킬 수 있다.

<br>

> Compression 

* CDN은 네트워크에 관련되는 서비스이기 때문에 

* 당연히 원본 컨텐츠의 사이즈가 작으면 성능이 사용하는 대역폭도 작아지고 성능도 더 잘 나온다. 

* 압축 기능을 사용하기 위해서는 Origin server가 apache와 같은 웹서버인 경우에는 

* gzip compression 기능을 웹서버에 적용해주면 되지만

* S3를 Origin server로 사용하는 경우에는 S3 자체에는 gzip compression 기능을 가지고 있지 않기 때문에

* 컨텐츠를 할때 gzip으로 압축해서 올리고 "Content-Encoding"을 gzip으로 명기해주면 된다.


---

## 참고

* [Amazon의 CDN 서비스 Cloud Front](http://bcho.tistory.com/796?category=431292)
