---
layout: post
title:  " 좋은 코드 vs 나쁜 코드 (Good Code vs. Bad Code) "
categories: Tech
author: goodGid
use_math: true
---
* content
{:toc}



## [The Importance of Good Names](https://blog.bytebytego.com/i/141263183/the-importance-of-good-names)

> Example 1

``` java
boolean processPayment(PaymentInstruction paymentInstruction) {
    Channel preferredChannel = paymentInstruction.getChannel();     
    channelFactory.getChannel(preferredChannel).send(paymentInstruction);
}
```

* processPayment에서 process는 너무 Generic 한 표현이므로 

  단순히 메서드 명만 봐서 이 메서드가 하는 게 정확히 무엇인지 알 수 없다.

* 만약 알고 싶다면 메서드 내부 코드를 읽은 후에 파악을 할 수 있고

  코드를 보면 선호하는 Channel을 선정하고

  해당 Channel로 PaymentInstruction을 보내고 있음을 알 수 있다.

* 그러면 메서드 명을 "sendPaymentToExternalChannel()"로 지정할 수 있지만 **너무 많은 세부정보가 노출**된다. 
  
* 대안으로 "startPayment()"는 **내부 세부 정보를 노출하지 않고**

  결제 흐름의 시작을 나타내므로 좋은 선택이 될 수 있다.

---

> Example 2

``` java
String userId = PaymentInstruction.getUserId();
```

* "userId"라는 변수명을 사용하기보단 

  도메인에서 사용되는 개념으로 바꾸면 더 좋다.

``` java
String payerId = paymentInstruction.getPayerId();
```

---

> Summary

* 변수의 이름을 효과적으로 짓기 위해선 다음과 같은 조건을 충족해야 한다.

1. 목적을 간결하고 정확하게 설명

2. 비즈니스 도메인 용어 사용

3. 구현 세부정보 노출 방지

---

## [The Perils of Copying Code](https://blog.bytebytego.com/i/141263183/the-perils-of-copying-code)

* 새로운 요구 사항을 개발 시

  기존에 비슷한 기능의 코드가 있지만

  개발 시간이 부족하다면 

  기존 코드 수정 후 테스트를 하기보다는

  코드 일부를 복사하여 새로운 요구 사항에 맞게 수정을 하고 싶은 유혹이 생긴다.

* 예를 들어 UserService에 이미 비슷한 기능이 존재하지만

  수정 후 기존 기능에 영향을 주지 않는지 테스트를 하기에 시간이 부족하여

  필요한 코드를 복사하여 새로운 서비스를 만들고
  
  새로운 요구사항에 맞게 수정을 하였다.

* 만약 사용자 관련 기능을 업데이트해야 한다면

  관리 포인트가 2곳으로 늘어나 
  
  관리도 힘들고 혹시라도 한 곳을 놓치면 장애가 발생할 수 있어

  동일한 기능을 중복으로 구현하는 건 좋지 않다.

<br>

<center> <img src="/assets/img/tech/Tech-Good-Code-vs-Bad-Code-The-Perils-Of-Copying-Code_1.png" style="max-width: 80%;"> </center>

<center>This violates the key "Don't Repeat Yourself" (DRY) principle of software development</center>

<br>

* static analyzers는 코드 중복 문제를 식별하는데 도움이 되지만

  기술 부채가 발생하지 않게 처음부터 잘 추상화된 구성 요소를 설계하는 것이 더욱 중요하다.

* Deadline이 다가올수록 촉박한 상황에서

  서투른 지름길을 택하는 건 시간이 지남에 따라 기술 부채를 더 키우게 될 것이다.

---

## [Too Many Parameters](https://blog.bytebytego.com/i/141263183/too-many-parameters)

``` java
PaymentInstruction createPaymentInstruction(String payerId,
                                            String receiverId,
                                            String orderId,
                                            Channel preferredChannel, 
                                            String callbackUrl,
                                            Currency currency,
                                            Amount amount) {
   // create payment instruction
}
```

* 매개변수가 너무 많으면 당연히 다루기 어려워진다.

  이럴 땐 단일 객체로 캡슐화 하여 관리를 손쉽게 할 수 있다.


``` java
public class PaymentInstructionParameters {
    private String payerId;
    private String receiverId;
    private String orderId;
    private Channel preferredChannel;
    private String callbackUrl;
    private Currency currency;
    private Amount amount; 
}
PaymentInstruction createPaymentInstruction(
    final PaymentInstructionParameters params) {
    // create payment instruction
} 
```

* 객체로 캡슐화를 한 방법이 위 방법보다 좋지만

  String 타입의 여러 ID 값을 세팅하는데 실수가 발생할 수 있다.
  
  이럴 땐 Builder 패턴을 사용하면 좋다.

``` java
public class PaymentInstructionParameters {
  private String payerId;
  private String receiverId;
  private String orderId;
  private Channel preferredChannel;
  private String callbackUrl;
  private Currency currency;
  private Amount amount; 

  public PaymentInstruction newPaymentInstruction() {
    return PaymentInstruction.builder()
                             .payerId(payerId)
                             .receiverId(receiverId)
                             .orderId(orderId)
                             .preferredChannel(preferredChannel)
                             .callbackUrl(callbackUrl)
                             .currency(currency)
                             .amount(amount);
  }
}
```

* 빌더 클래스를 사용하여 변수를 명시적으로 설정한다.

* 복잡한 매개변수를 잘 정의된 객체로 캡슐화하면 실수 확률도 줄이고 코드를 읽기 편하게 구현할 수 있게 된다.

---

## [Avoiding Nested Conditional Logic](https://blog.bytebytego.com/i/141263183/avoiding-nested-conditional-logic)

``` java 
if (condition)  {
   //Nested if else inside the body of “if”
   if (condition2)  {
       //Statements inside the body of nested “if”
   }
   else {
      //Statement inside the body of nested “else”
   } 
} 
else  {
   //Statement inside the body of “else” 
}
```

* 중첩된 if/else 문은 코드를 어렵게 만든다.

* 적절한 해결책으로는

  조건이 실패하면 바로 return을 시키거나

  조건을 확인할 수 있는 함수 또는 메소드로 캡슐화한다.

  예를 들어 Google Guava는 전제 조건 유틸리티 클래스를 제공한다.

``` java
public static double sqrt(double value) {
     Preconditions.checkArgument(value >= 0.0, "negative value: %s", value);
     // calculate the square root
}
```

---

## [The Benefits of Immutable Data](https://blog.bytebytego.com/i/141263183/the-benefits-of-immutable-data)

* 최신 IDE를 사용하면 

  기본적으로 클래스에 대한 setter가 생성되어

  손쉽게 데이터 수정이 가능하여 버그 발생 가능성이 높아진다.

* 이러한 setter를 없애고 Deep Copy를 통해 Immutable Data를 생성해보자.

---

> Setter 제거

* 값을 직접 수정하는 대신 API를 통해 상태 업데이트를 한다.

  ex) complete API를 호출하여 상태 변경 + 새로운 객체 할당

``` java
class PaymentInstruction {
    PaymentInstruction complete(CallBackResult result) {
        return new PaymentInstruction(..., result.getCode(), ...);
    }
}
```

---

> Immutable Data 구조 장점 

* 여러 프로세스가 병렬로 접근하더라도
  
  충돌 위험 없이 데이터에 액세스 하고 조작할 수 있게 한다.

  즉 쉬운 유지 보수 + 병렬 처리 가능이라는 장점을 누릴 수 있다.

---

## [Managing Technical Debt](https://blog.bytebytego.com/i/141263183/managing-technical-debt)

* Bad Code는 시간이 지나면서 기술 부채로 쌓이게 된다.

  그러므로 기술 부채를 효과적으로 관리하는 것은 필수적이다.

  완벽하게 기술 부채를 제거할 순 없으니 적절하게 관리하는 것이 중요하다.

> Quantify debt

* SonarQube와 같은 정적 도구를 사용하여 기술 부채를 즉각적으로 확인한다.

  즉 부채를 정량화시켜 확인할 수 있다.

> Allocate resources to pay down debt 

* 일정 주기마다 refactoring 작업을 진행하거나 서로 관리하는 시간을 갖도록 한다.

  이렇게 하면 부채가 너무 오래 머무르는 것을 방지할 수 있다.

> Convey the urgency to management

* 긴급한 상황에 놓이기 전에 미리 매니저에게 상황을 공유한다.

* 기술 부채가 쌓이면 위험하고 

  장기적으로 좋지 않다는 점을 지속적으로 공유하는 것이 중요하다.

---

## Summary

* 좋은 코드를 추구하지 않으면 

  [깨진 창문 이론](https://namu.wiki/w/%EA%B9%A8%EC%A7%84%20%EC%9C%A0%EB%A6%AC%EC%B0%BD%20%EC%9D%B4%EB%A1%A0)처럼 점점 코드가 더러워지고

  돌아갈 수 없는 강을 건너게 된다.

* 기술 부채는 지속적으로 관리하면서

  좋은 코드를 짤 수 있게 서로 노력하는 게 무엇보다 중요하단 생각이 든다.

---

## Reference

* [Good Code vs. Bad Code](https://blog.bytebytego.com/p/good-code-vs-bad-code)