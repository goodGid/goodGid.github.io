---
layout: post
title:  " [Java Optimizing] 8. GC 로깅, 모니터링, 튜닝, 툴 "
categories: JavaOptimizing
author: goodGid
---
* content
{:toc}

> 이 글은 [자바 최적화 (Optimizing Java,가장 빠른 성능을 구현하는 검증된 10가지 기법)](https://book.naver.com/bookdb/book_detail.nhn?bid=14796595) 책을 학습한 내용을 토대로 작성되었습니다.

## Prologue

* GC의 로그를 남기는 방법과 GC를 튜닝하는 방법에 대해 알아보자.

---

## GC 로깅

* GC 로그는 **논블로킹 방식**으로 로그를 남기므로

  로깅이 Application에 미치는 영향은 거의 0이므로 운영상 무조건 켜두어야 한다.

---

### 필수 플래그

* 다음 5가지 플래그는 **무조건 활성화**해야 하는 플래그이다.

> -Xloggc:gc.log

* GC 이벤트 로그를 기록할 파일을 지정한다.

> -XX:+PrintGCDetails

* GC 이벤트 **세부 정보**를 로깅한다.

> -XX:+PrintTenuringDistribution

* 툴링에 꼭 필요한 부가적인 GC 이벤트 세부 정보를 추가한다.

> -XX:+PrintGCTimeStamps

* GC 이벤트 발생 시간을 출력한다.

  단 VM 시작 이후 경과한 시간을 초 단위로 출력한다.

> -XX:+PrintGCDateStamps

* GC 이벤트 발생 시간을 출력한다.

  단 벽시계 시간 기준으로 출력한다.





#### 주의 사항

* 만약 verbose:gc를 사용한다면 

  verbose:gc 플래그를 지우고 PrintGCDetails를 사용해야 한다.

* PrintTenuringDistribution 플래그가 제공하는 정보는

  사람이 이용하기 위한 정보가 아니라
  
  이벤트 계산 시 필요한 기초 데이터를 제공한다.

  즉 JVM와 같은 기계를 위한 데이터라고 생각하면 될 거 같다.

* PrintGC**Time**Stamps와 PrintGC**Date**Stamps는 비슷하지만 2개다 필요하다.

  PrintGC**Time**Stamps는 GC 이벤트와 Application 이벤트(로그 파일)을

  PrintGC**Date**Stamps은 GC와 다른 내부 JVM 이벤트를 연관 짓는 용도로 사용된다.

---

### 로그 순환 플래그

> -XX:+UseGCLogFileRotation

* 로그 순환 기능을 on 시킨다.

> -XX:+NumberOfGCLogFiles={n}

* 보관 가능한 최대 로그 파일 개수를 설정한다.

> -XX:+GCLogFileSize={size}

* 순환 직전 각 파일의 최대 크기를 설정한다.


---

### GC 로그 vs JMX

* GC 로그 데이터는 실제로 GC 이벤트가 발생해서 쌓이지만

  JMX(Java Management eXtentensions)를 이용해 모니터링하는 클라이언트는
  
  런타임 시점에 샘플링된 데이터를 얻는다.

* JMX는 원격 메소드 호출(Remote Method Invocation, RMI)을 하므로 암묵적인 비용이 든다.

* 클라이언트는 데이터를 계속 넘겨받기 위해 

  런타임에 있는 JMX 빈을 Polling 한다.

  그런데 문제는 GC가 언제 실행될지 알 수 없으므로

  수집 사이클 전후의 메모리 상태 역시 정확하게 분석하는건 현실적으로 힘들다.

* 그래서 GC를 정확하게 튜닝하기 위해선 수집 전후의 힙 상태 정보가 대단히 중요하므로

  JMX를 통한 정보만으로는 튜닝을 하는 데 한계가 있다.


---

## GC 튜닝

### 힙 크기 조정

> -Xms{size}

* 힙 메모리의 최소 크기를 설정한다.

  ex) -Xms15g

> -Xmx{size}

* 힙 메모리의 최대 크기를 설정한다.

  ex) -Xmx15g

> -XX:MaxPermSize={size}

* (Java7 이전) [Perm 영역]({{site.url}}/Java-8-JVM-Metaspace/)의 메모리 최대 크기를 설정한다. 

> -XX:MetaspaceSize={size}

* (Java8 이상) [Metaspace 영역]({{site.url}}/Java-8-JVM-Metaspace/)의 메모리 최대 크기를 설정한다.


---

### 튜닝 조언

> 플래그 추가 시

1. 한번에 1개씩 추가한다.

2. 각 플래그가 무슨 작용을 하는지 숙지한다.

3. 부수 효과를 일으키는 플래그 조합도 있음을 명시한다.

* 튜닝 시 GC 플래그는 다음과 같이 추가한다.

> 성능 저하 시

1. CPU 사용률이 100%에 가까운가?

2. 대부분의 시간(90% 이상)이 유저 공간에서 소비되는가?

3. GC 로그가 쌓이고 있다면 현재 GC가 실행 중이라는 증거다.

* 성능이 떨어진 시스템이 있다면 다음 목록을 확인해본다.

* 위 3가지 조건이 다 맞는다면 

  GC가 성능 이슈를 일으키고 있을 가능성이 크고 튜닝이 필요하다.

---

## Summary

* GC 로깅 옵션들은 업무를 하면서 많이 봐서 익숙하지만

  GC 튜닝과 관련된 플래그는 직접 튜닝을 경험이 없다보니 와 닿지 않는 게 사실이다.

  그래도 언젠간 하게 될 상황에 놓이면 지금 학습한 내용이 도움되리라 믿는다.


---

## Reference

* [자바 최적화 (Optimizing Java,가장 빠른 성능을 구현하는 검증된 10가지 기법)](https://book.naver.com/bookdb/book_detail.nhn?bid=14796595)