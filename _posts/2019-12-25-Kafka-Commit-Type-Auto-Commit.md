---
layout: post
title:  " Kafka Commit Type : Auto Commit "
categories: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [책](https://book.naver.com/bookdb/book_detail.nhn?bid=13540082)을 바탕으로 작성하였습니다.

## Auto Commit

* 컨슈머 어플리케이션들의 기본값으로

* 많이 사용하고 있는

* 자동 커밋 방식에 대해 알아보자.

<br>

* 자동 커밋을 사용하고 싶을 때는

* 컨슈머 옵션 중 

* [enable.auto.commit]({{site.url}}/Kafka-Consumer-Option/#enableautocommit) = true로 설정하면

* 5초마다 컨슈머는 poll()를 호출할 때

* 가장 마지막 오프셋을 커밋한다.

<br>

* 5초 주기는 기본값이며

* [auto.commit.interval.ms]({{site.url}}/Kafka-Consumer-Option/#autocommitintervalms) 옵션을 통해 조정이 가능하다.








<br>

* 컨슈머는 poll을 요청할 때마다

* 커밋할 시간인지 아닌지 체크하게 되고

* poll 요청으로 가져온 마지막 오프셋을 커밋한다.

### Example

![](/assets/img/kafka/Kafka-Commit-Type-Auto-Commit_1.png)

* 파티션 0으로부터 컨슈머 01이 

* 메시지를 가져오고 있고

* 5초 주기로 컨슈머는 자동 커밋을 하고 있다.

<br>

* 컨슈머는 한 번의 poll()을 이용해

* 메시지 2개씩 가져오고 있다.

* 처음의 poll()로 메시지 1과 2를 가져오게 되었고

* 5초가 되면서

* 마지막 오프셋 2를 커밋한 다음

* 메시지 3과 4를 가져온 후 

* 5초가 지나 오프셋 4를 커밋했다.




## 주의 사항

* 자동 커밋이 편리한 기능이지만

* 주의해야할 부분도 있다.

<br>

* 만약 커밋을 해야하는 5초가 되기전에

*  [리밸런스]({{site.url}}/Kafka-Consumer-Group-Rebalance/)가 일어나면 어떻게 될까?

<br>

* 즉 마지막 커밋 이후 3초가 지난 시점에

* 리밸런스가 일어나면

* 5초가 되지 않았기 때문에 

* 정상적으로 커밋을 하지 못했고

* 마지막 커밋 이후 3초간의 메시지는 중복으로 가져오게 된다.

<br>

* 그림으로 보면 다음과 같다.

![](/assets/img/kafka/Kafka-Commit-Type-Auto-Commit_2.png)

* 파티션 0으로부터 컨슈머 01이 메시지를 가져오고 있다.

* 그런데 컨슈머 02가 추가되면서

* [리밸런스]({{site.url}}/Kafka-Consumer-Group-Rebalance/)가 일어나게 되었고

* 파티션 0번에 대해 

* 마지막 커밋은 4로 되어 있기 때문에

* 컨슈머 02는 메시지 5와 6을 가져오게 된다.

<br>

* 하지만 메시지 5와 6은 

* 컨슈머 01이 리밸런스 직전에 이미 가져왔던 메시지이다.

* 결국 메시지 5와 6은 중복으로 처리된다.

<br>

> 한계

* 만약 중복을 줄이기 위해서 

* 자동 커밋의 시간을 더 줄일 수 있지만

* 중복을 완벽하게 제거하는 것은 불가능한다.



## Summary

* 이렇게 자동으로 오프셋을 커밋하는 방법은

* 매우 편리하지만

* 중복 등이 발생할 수 있기 때문에

* 동작에 대해 완벽하게 이해하고 사용하는 것이 중요하다.

---

## Reference

* [카프카, 데이터 플랫폼의 최강자 실시간 비동기 스트리밍 솔루션 카프카의 기본부터 확장 응용까지](https://book.naver.com/bookdb/book_detail.nhn?bid=13540082)