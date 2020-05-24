---
layout: post
title:  " [Clean Code] 함수 (Function) : Switch 문 "
categories: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## Switch 문

* 본질적으로 Switch 문은 N가지를 처리한다.

* 그렇기 때문에 Switch 문은 작게 만들기 어렵다.

* 하지만 다형성을 이용하여

* 각 Switch 문을 저차원 클래스에 숨기는 방법이 있다.







## Example 

``` java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
    switch (e.type) {
        case COMMISSIONED:
            return caclculateCommissionedPay(e);
        case HOURLY:
            return calculateHourlyPay(e);
        case SALARIED:
            return calculateSalariedPay(e);
        default:
            throw new InvalidEmployeeType(e.type);
    }
}
```

* 위 함수에는 몇 가지 문제가 있다.

1. 함수가 길다.

2. 한 가지 작업만 수행하지 않는다.

3. 새 직원 유형을 추가할 때마다 코드를 변경하여야한다.

## Refactoring

* Example Code를 Refactoring해보자.

``` java
public abstract class Employee {
    public static boolean isPayday();

    public static Money calculatePay();

    public static void deliverPay(Money pay);
}
```

``` java
public interface EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}

public class EmployeeFactoryImpl implements EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
        switch (r.type) {
            case COMMISSIONED:
                return new CommissionedEmployee(r);
            case HOURLY:
                return new HourlyEmployee(r);
            case SALARIED:
                return new SalariedEmployee(r);
            default:
                throw new InvalidEmployeeType(r.type);
        }
    }
}
```

* Switch 문을 추상 팩토리에 숨긴다.

* 팩토리에서는 Switch 문을 사용해 

* 적절한 Employee 파생 클래스의 인스턴스를 생성한다.


## Summary

* Switch 문 자체를 없애는건 쉽지 않다.

* 하지만 Switch 문 코드를 

* 추상 팩토리로 이동시키고

* 실제 비즈니스 코드를 다음과 같이 수정 할 수 있다.

> Before

``` java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
    switch (e.type) {
        case COMMISSIONED:
            return caclculateCommissionedPay(e);
        case HOURLY:
            return calculateHourlyPay(e);
        case SALARIED:
            return calculateSalariedPay(e);
        default:
            throw new InvalidEmployeeType(e.type);
    }
}
```

> After

``` java
@Autowired
EmployeeFactory employeeFactory;

public Money calculatePay(Employee e) throws InvalidEmployeeType {
    Employee employee = employeeFactory.makeEmployee(COMMISSIONED);
    return employee.calculatePay();
}
```

* 함수의 길이가 짧아지게 되고

* 보는 입장에서도 가독성은 더 높아진다.

---

## 참고

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)