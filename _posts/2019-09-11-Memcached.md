---
layout: post
title:  " Memchcahed 개념과 특징  "
categories: Technology
author: goodGid
---
* content
{:toc}

## Memcached

![](/assets/img/posts/redis_2.png)

---

## Memcached의 장점

* Memcached는 

* DB / API 통신을 줄이기 위해 

* **데이터를 캐싱**처리하는 데에 사용하면 좋은 캐시이다. 

* Redis는 트래픽이 몰리면 

* 응답속도가 불안정하다고 한다.

* 반면 트래픽이 몰려도 

* Memcached의 응답 속도는 

* **안정적**인 편이라고 한다. 








---


## Memcached의 단점

* Redis처럼 

* 데이터 타입과 API가 다양하지 않다. 

* Memcached는 

* Key-Value**만** 지원한다.


---

## Redis vs Memcached

* Redis와 관련해선 [Redis 개념과 특징]({{site.url}}/Redis) 글을 읽고 오자.

* 아주 단순하게 비교하자면 

* Memcached는 **캐시 솔루션**이다.

* 이러한 Memcached에 

* **저장소의 개념**이 추가된 것이 

* Redis라고 할 수 있다. 

<br>

* **캐시**는 빠른 속도를 위해서 어떤 결과를 저장해 두는 것을 의미하며

* 또한 **데이터가 사라지면 다시 만들 수 있다**는 전제를 내포하고 있다. 

* 캐시 기능만을 고려한다면 

* 디스크에서 불러오기만 하면 된다.

* (= Load 기능만 수행되면 된다.)

* 그런데 **저장소**라는 개념이 추가되면 

* **데이터가 유지되어야 한다**는 특성을 가지게 된다.  

* (= Save기능도 필요하다.)


---

## 정리

* 메모리가 날라가도 

* **원본 데이터로 즉시 복구**할 수 있는 데이터는 

* Memcached를 사용하는 편이 좋을 수 있다.

<br>

* 메모리가 날아가면 

* **서비스 장애가 발생** 할 수 있는 상황이라면 

* Redis를 사용하는 편이 좋을 수 있다.

<br>

* 통신 속도를 향상 시키기 위한 목적이면 

* Memcached를 사용하는게 좋다. 

* 그러나 **서비스의 특정 기능**을 위한 목적으로 

* 캐시 데이터를 사용한다면 

* Redis를 사용하는게 좋다. 





---

## Reference

* [Redis, Redis를 사용한 데이터베이스 캐싱서버 운영하기](https://webisfree.com/2017-10-26/redis-%EB%A0%88%EB%94%94%EC%8A%A4%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%BA%90%EC%8B%B1%EC%84%9C%EB%B2%84-%EC%9A%B4%EC%98%81%ED%95%98%EA%B8%B0)

* [[Cache]Redis vs Memcached](http://americanopeople.tistory.com/148)

* [[Redis 개념 및 특징]](http://codingmania.tistory.com/18)

* [Redis를 실무에 사용하기 전에 꼭 알아야 하는 실전 전략 운영 관리](http://preview.hanbit.co.kr/2647/sample_ebook.pdf)
