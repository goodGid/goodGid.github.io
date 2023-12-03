---
layout: post
title:  " 서버리스에는 서버가 있나요? (Does Serverless Have Servers?) "
categories: Technology
author: goodGid
---
* content
{:toc}

## Prologue

* Serverless 컴퓨팅은 쉽게 말해 서버를 관리하지 않고 

  어플리케이션을 구축하고 실행하는 패러다임을 말한다.

* 그래서 개발자는 어플리케이션 코드에 집중하고

  클라우드 업체는 내부적으로 서버 프로비전닝, 모니터리 등을 담당한다.

* 그리고 지난 10년 동안 Serverless 배포는 크게 단순화되었다.



---

## The Evolution of Serverless

![](/assets/img/tech/Tech-Does-Serverless-Have-Servers_1.png)

* Serverless 컴퓨팅은 2014년에 AWS Lambda가 출시되면서 두각을 나타냈다. 

  이를 통해 개발자는 백엔드 서버를 관리하지 않고
  
  이벤트 중심 어플리케이션을 실행할 수 있게 되었다.

* 더하여 Azure Functions 및 Google Cloud Functions의 출시로 

  FaaS(Functions-as-a-Service) 모델이 더욱 대중화되고

  2013년부터 2014년 사이에 Docker와 Kubernetes가 등장하면서 
  
  컨테이너화와 마이크로서비스를 통해 Serverless 어플리케이션이 더 대중화되었다.


* 아래 표에는 각 Serverless와 관련된 모델들의 장단점을 보여준다.

![](/assets/img/tech/Tech-Does-Serverless-Have-Servers_2.png)

---

## FaaS

![](/assets/img/tech/Tech-Does-Serverless-Have-Servers_3.png)

* CaaS를 사용하면 Docker와 같은 컨테이너에 종속성을 묶고

  어플리케이션 컨텍스트와 런타임 환경을 관리해야 한다.

* 하지만 FaaS는 공급자가 런타임에 필요한 환경을 세팅해 주므로

  개발자는 종속성이나 런타임 관리에 대해 걱정하지 않고 
  
  운영에 필요한 함수에만 집중할 수 있게 된다.

* 그렇게 만들어진 함수는 이벤트 트리거를 통해 동작하고 

  요청이 몰리면 Auto-Scaling이 되고 실행이 완료되면 삭제된다.

<br>
  
* 정리하자면 FaaS는 런타임 관리 및 확장을 추상화하여 

  개발자가 코드 작성에 집중할 수 있게 해 주고 

  사용한 만큼만 비용을 지불한다.

* 반면 CaaS는 종속성 및 런타임에 대한 더 많은 제어 기능을 제공하지만 

  그로 인해 환경 구성 및 관리가 필요해진다.

---

## Cold Start Process

* 기존 서버를 사용하면 앱을 다시 실행하는 데 몇 분이 걸리지만 

  FaaS는 훨씬 빠르게 실행 시킬 수 있다.

* 종속성이 거의 없는 간단한 함수는 수십 ms안에 시작 가능하고

  종속성이 포함된 대규모 함수는 Cold Start 시 몇 초가 걸릴 수 있다.

* 아래 다이어그램은 Cold Start 프로세스를 간략하게 설명하는 그림이다. 

  파란색 상자는 클라우드 공급자가 관리하고 
  
  빨간색 상자는 코드 소유자가 관리하는 영역이다.
  
  Cold Start 시간은 함수 호출부터 인스턴스 준비 완료까지 시간을 뜻한다.

<center> <img src="/assets/img/tech/Tech-Does-Serverless-Have-Servers_4.png" style="max-width: 50%;"> </center>

---

### Improve Cold Start Time

* Latency를 줄이기 위한 최적화 기술에 대해 알아보자.

> Pre Download 

* 업체는 함수 코드 및 종속성을 사전에 다운로드한다.

> Reserve Instance 

* 후속 호출이 예상된다면

  다음 인스턴스를 예약해 두는 기능을 활용해
  
  Cold Start를 방지할 수 있다. 

* 하지만 일정 기간 동안 활동하지 않으면 

  인스턴스는 자동으로 Shut Down 될 수도 있고

  불필요한 인스턴스 예약으로 인해 추가 비용이 발생하게 된다.

> Caching

* AWS SnapStart와 같은 서비스로 

  메모리/디스크 데이터를 캐싱하면 Cold Start 시간이 줄어든다.


---

## Cost Model

* FaaS는 요청이 발생했을 경우에만 비용을 지불하므로 초기 비용이 낮다.

  그런데 여기서 고려해야 할 몇 가지 비용 측면이 있다.

---

> 함수 호출 횟수

* 함수 호출이 많을수록 비용도 높아지므로 비용은 트래픽 변동에 따라 늘어난다.

> 호출 기간

* 요금은 호출당 사용된 CPU 사용 시간을 기준으로 부과된다.

> 함수에 할당된 메모리 

* 함수에 할당된 메모리는 비용에 영향을 미친다. 

  메모리가 많을수록 일반적으로 총 할당량에 비례하여 요금이 증가한다.

> CPU 및 메모리 확장

* 더 많은 메모리를 사용하여 

  처리 능력을 높일 수 있도록 CPU 코어를 메모리에 연결한다.

  메모리를 최적화하면 성능이 향상되고 전체 비용이 증가한다.

---

## BaaS (Backend-as-a-Service)

<center> <img src="/assets/img/tech/Tech-Does-Serverless-Have-Servers_5.png" style="max-width: 50%;"> </center>


* 일반적인 Serverless 아키텍처에서 

  FaaS는 BaaS(Backend-as-a-Service)와 같은 보완 서비스와 결합되어 

  상태를 저장해야 하는 요구 사항을 처리한다.

<br>

* BaaS는 어플리케이션의 핵심 백엔드 기능을 대체하는 API를 제공한다. 

  BaaS는 이러한 API를 AutoScaling, 관리형 서비스로 제공하여

  개발자에게 Serverless 형태로 추상화된 계층을 제공하여
  
  백엔드 작업을 효과적으로 처리할 수 있게 지원한다.
  
* 그러므로 개발자는 서버를 관리하지 않고도

  BaaS가 제공하는 API를 활용하여 개발을 빠르게 처리 할 수 있게 된다.
 
 <br>

* Serverless 아키텍처에서 BaaS는 Stateless한 FaaS를 보완한다. 

  FaaS는 이벤트에 대한 응답으로 
  
  Business Logic을 처리하고 BaaS는 DB 작업을 담당한다.
  
* 예를 들어 개발자는 데이터를 저장하기 위해 

  Stateless한 FaaS 환경에서 DB 처리를 신경 쓰지 않고

  그 책임은 BaaS 서비스에게 위임하여 
  
  FaaS가 DB 작업을 신경 쓰지 않도록 할 수 있다.

* 일반적인 BaaS 사용 사례로는 

  인증, 원격 업데이트, 클라우드 스토리지 및 DB 관리가 있다.

<br>

* "NoOps" 개념은 Serverless 컴퓨팅과 함께 등장했다.

* [NoOps](https://www.whatap.io/ko/blog/4/#:~:text=NoOps(No%20Operations)%EB%8A%94%20IT,%EC%97%85%EB%AC%B4%20%ED%99%98%EA%B2%BD%EC%9D%84%20%EC%9D%98%EB%AF%B8%ED%95%A9%EB%8B%88%EB%8B%A4.)를 사용하면 개발자는 
  
  작업을 클라우드 제공업체에 맡기고 새로운 기능 개발에 집중할 수 있게 된다.

<br>

* Serverless 컴퓨팅의 두 가지 요소인 

  FaaS와 BaaS를 결합한 일반적인 아키텍처는 다음과 같다.

* FaaS는 Business Logic을 처리하고 이벤트에 응답하는 작업을 처리하고

  BaaS는 DB 처리 및 백엔드 서비스를 제공한다.

* BFF(Backend for Frontend)는 

  FaaS 계층에서 생성된 데이터를 처리 및 가공하여 

  다양한 Frontend에서 사용할 수 있도록 최적화를 진행한다.

<br>

* 이렇게 계층화된 아키텍처는 

  문제가 될 만한 포인트를 명확하게 분리하는데

  Frontend는 사용자 경험에 초점을 맞추고
  
  BFF 계층은 전통적으로 Model과 Controller에서 수행되는 데이터 처리를 관리한다.

---

## Firecracker MicroVMAWS

<center> <img src="/assets/img/tech/Tech-Does-Serverless-Have-Servers_6.png" style="max-width: 80%;"> </center>

* AWS Lambda 실행 환경을 보면 

  Firecracker MicroVM을 사용하여 
  
  Lambda 기능을 격리하고 실행시킨다.

  다시 말해 각 Lambda는 여러 개의 격리된 MicroVM속에서 동작한다.

* 그러므로 사용자는 AWS가 기본 인프라를 처리하는 동안 
  
  녹색 및 파란색 영역에 올릴 코드만 작성하고 걱정하면 된다.

  참고 : Firecracker는 AWS에서 개발하고 Rust로 작성된 오픈 소스 가상화 기술이다.

---

## Synchronous Execution

<center> <img src="/assets/img/tech/Tech-Does-Serverless-Have-Servers_7.png" style="max-width: 80%;"> </center>

* 1단계 : Worker Manager는 배치 서비스(=Placement Service)와 통신하여 

  작업자 노드에 microVM을 할당하고 위치를 반환한다.

* 2단계 : Worker Manager는 Init()를 호출하여 

  S3에서 코드 패키지를 다운로드하고 
  
  Lambda 런타임을 설정하여 실행할 함수를 초기화한다.

* 3단계 : Frontend 작업자는 Invoke()를 호출하여 함수를 동기적으로 호출한다.

---

## Asynchronous Execution

<center> <img src="/assets/img/tech/Tech-Does-Serverless-Have-Servers_8.png" style="max-width: 80%;"> </center>

* 1단계 : Application Load Balancer는 

  내부 SQS 대기열에 이벤트를 배치하는 
  
  사용 가능한 Frontend 작업자에게 호출 이벤트를 전달한다.

* 2단계 : Poller 프로세스는 

  큐에서 이벤트를 가져와 

  Frontend 작업자에서 함수를 동기식으로 호출하고

  요청을 받은 Frontend 작업자는 
  
  위에서 다룬 동기 호출 패턴을 따른다.

---

## Limitations

* FaaS와 BaaS는 인프라 관리를 추상화하지만 디버깅을 어렵게 만들 수 있다. 

  오류가 발생하면 컨텍스트에 대해 백그라운드가 없다면 디버깅은 매우 어렵다.
  
* 제한적인 로그는 근본 원인을 파악하는데 충분한 컨텍스트를 제공하지 못하기 때문이다.

* 모든 것을 Serverless로 재설계하고 싶지만 과도한 엔지니어링은 피해야 한다. 
  
  모든 기능을 작은 기능으로 쪼개 Serverless로 운영을 하면

  유지보수가 어려운 복잡한 아키텍처가 생성된다. 
  
* 우리가 알아야 할 교훈은 아키텍처가 시간과 요구 사항에 따라 변경된다는 점이고 

  우리는 **Serverless First** 사고방식을 채택하는 건 좋지만
  
  **Serverless Only**으로 접근을 하면 안 된다.

---

## Summary

* 서버리스 컴퓨팅은 지난 10년 동안 클라우드 애플리케이션 개발에 혁명을 일으켰다. 

  인프라 관리를 추상화함으로써 
  
  서버리스 모델을 통해 개발자는 코드 및 비즈니스 로직 작성에 집중할 수 있게 되었다. 
  
  또한 이벤트 기반 FaaS와 관리형 BaaS의 결합은 
  
  최소한의 운영 오버헤드로 전체 스택 애플리케이션 구축을 단순화시켰다.

* 서버리스의 자동 확장, 종량제 결제 측면은 

  제품을 빠르게 구축하고 반복하려는 스타트업에 이상적인 것으로 입증되었다. 
  
* 디버깅에 대한 어려움과 및 공급 업체에 종속적인 환경과 같이 아직 제한된 부분이 있지만

  오픈 소스 도구는 이러한 장단점을 완화하기 위해 계속해서 발전하고 있다.

* 서버리스 프레임워크와 모범 사례가 성숙해짐에 따라 

  더 많은 대기업이 적절한 경우 서버리스를 채택하게 될 것이다. 
  
* 개발 속도, 운영 오버헤드 및 비용을 최적화하려면 
  
  서버리스 아키텍처와 기존 아키텍처 간의 적절한 균형을 유지하는 것이 중요하다. 
  

---

## Reference

* [Does Serverless Have Servers?](https://blog.bytebytego.com/p/serverless-has-servers)