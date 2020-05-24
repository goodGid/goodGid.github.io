---
layout: post
title:  " Query String의 함정 : List에 null이 담겨온다. "
categories: TIL
author: goodGid
---
* content
{:toc}

## Prologue

* LINE Pay Real 환경에서

* NPE가 발생했다.

<br>

* NPE를 해결하기 위해 

* 코드를 보는데

* 이게 어떻게 NPE가 발생하지? 란 생각이 들었다.

<br>

* 하지만 컴퓨터는 **정직**했다.










## Service Flow

* 다음과 같은 Service Flow가 있다.

1. 사용자로부터 transactionId 값을 입력 받는다.

2. 입력받은 transactionId 값을 Validate 한다.

3. 입력받은 transactionId 값으로 DB에서 Data를 조회한다.

4. 조회해온 값을 Return 해준다.




## Coding

* Bug를 해결하기전 Code는 다음과 같다.

* 참고로 실제 코드를 갖고 올 순 없기 때문에

* 강조하고 싶은 부분만 Rough하게 작성하였다.


### Controller 

``` java
@GetMapping("/transaction/paments")
public List<PaymentDetailForm> getPayments(
        @RequestParam(value = "transactionId", required = false) List<Long> transactionIds) {
    
    // Make Form
    PaymentDetailForm criteria = new PaymentDetailForm();
    criteria.setTransactionId(transactionIds);

    // Validate
    PaymentDetailCriteriaUtil.validateCriteria(criteria);

    // Select Data from DB
    // --> Transacdtion List에서 1st 인자값을 사용해 DB에서 Data를 조회한다.
    select * 
    from trx
    where trx_seq = criteria.getTransactionId().get(0);

    // Return
    return ...;
}
```

### Service 

* Validate 하는 과정에서는 2가지를 체크한다.

1. Null 체크

2. Size 체크

``` java
public class PaymentDetailCriteriaUtil {
    public static void validateCriteria(PaymentDetailForm criteria) {
        if (criteria.getTransactionId() == null) {
            throw new Exception(ReturnCode.WRONG_PARAMETER);
        }

        int transactionIdSize = 0;

        
        if (CollectionUtils.isEmpty(criteria.getTransactionId())){
            transactionIdSize = criteria.getTransactionId().size();
        }

        if (transactionIdSize == 0) {
            throw new Exception(ReturnCode.NOT_EXISTS_TRANSACTION);
        }
    }
}
``` 




### So What?

* 여기까지만 보면

* 사실 큰 문제가 없어 보인다.

<br>

* 하지만 다음과 같은 Input이 들어온다면

* DB에서 Data를 조회하는 과정에서 NPE가 발생한다.

* ex) 
http://goodgid.github.io/transaction/paments?transactionId=&transactionId=





### Test Code

``` java
@RunWith(MockitoJUnitRunner.class)
public class PaymentDetailCriteriaUtilMockTest {

    @InjectMocks
    PaymentDetailCriteriaUtil paymentDetailCriteriaUtil = new PaymentDetailCriteriaUtil();

    @Test
    public void F_TransactionId_have_null_values() throws Exception {
        PaymentDetailCriteria paymentDetailCriteria = new PaymentDetailCriteria();
        
        List<Long> list = Lists.newArrayList();
        list.add(null);
        list.add(null);
        paymentDetailCriteria.setTransactionId(list);
        
        paymentDetailCriteriaUtil.validateCriteria(paymentDetailCriteria);
    }
} 
```

* TC를 실행시키면

* validateCriteria()의 Logic은 통과하여서 

* TC는 통과한다.

* 하지만 실제 서비스 측면에서는 실패해야한다.

> Why? 

* List에는 **null**이 들어있다.

* 그렇기 때문에 다음과 같은 코드로 

* DB에 접근하게 되면 Error가 발생한다.

``` java
select * 
from trx
where trx_seq = criteria.getTransactionId().get(0); // trx_seq = null과 같은 상황이다.
```





## Problem

* 무엇이 문제였을까?

* validateCriteria()에는 **형식**만 판단하는 조건만 들어가 있다.

1. Null 체크

2. Size 체크

<br>

* 형식은 체크하였지만

* 실제 Data에 대해 validate하는 Code가 없다.

<br>

* 그렇기 때문에 transactionId을 null 리스트로 요청해도

* validateCriteria()는 Pass 하게 되는 것이다.





## Solution

* Data를 validation하는 Code를 추가한다.

* 직접 Loop 문을 통해 확인 가능하지만 

* 보다 세련되게 **CollectionUtils**을 사용해본다.

<br>

``` java
CollectionUtils.filter(criteria.getTransactionId(), PredicateUtils.notNullPredicate());
```

> [Reference] CollectionUtils.filter 

``` java
/** 
* Filter the collection by applying a Predicate to each element. If the
* predicate returns false, remove the element.
* <p>
* If the input collection or predicate is null, there is no change made.
* 
* @param collection  the collection to get the input from, may be null
* @param predicate  the predicate to use as a filter, may be null
*/
public static void filter(Collection collection, Predicate predicate) {
    if (collection != null && predicate != null) {
        for (Iterator it = collection.iterator(); it.hasNext();) {
            if (predicate.evaluate(it.next()) == false) {
                it.remove();
            }
        }
    }
}
```

<br>

* 해당 코드를 validateCriteria() Method에 추가하자.

``` java
public class PaymentDetailCriteriaUtil {
    public static void validateCriteria(PaymentDetailForm criteria) {
        // 코드 추가
        CollectionUtils.filter(criteria.getTransactionId(), PredicateUtils.notNullPredicate());

        if (criteria.getTransactionId() == null) {
            throw new Exception(ReturnCode.WRONG_PARAMETER);
        }

        int transactionIdSize = 0;
        if (CollectionUtils.isEmpty(criteria.getTransactionId())){
            transactionIdSize = criteria.getTransactionId().size();
        }

        if (transactionIdSize == 0) {
            throw new Exception(ReturnCode.NOT_EXISTS_TRANSACTION);
        }
    }
}
``` 

<br>

* null 값들을 Filter 하는 Code가 추가 되었기 때문에

* TC도 수정을 해준다.

``` java
@Test
public void F_TransactionId_have_null_values() throws Exception {
    PaymentDetailCriteria paymentDetailCriteria = new PaymentDetailCriteria();
    
    List<Long> list = Lists.newArrayList();
    list.add(null);
    list.add(null);
    paymentDetailCriteria.setTransactionId(list);

    // AS-IS
    // paymentDetailCriteriaUtil.validateCriteria(paymentDetailCriteria);
    
    // TO-BE
    try {
        paymentDetailCriteriaUtil.validateCriteria(paymentDetailCriteria);
    } catch (Exception e) {
        assertEquals(e.getMessage(), ReturnCode.NOT_EXISTS_TRANSACTION.getReturnMessage());
    }
}
```

## Summary

* Data를 검증하는 Logic을 추가함으로써

* DB 조회를 하면서 Error가 발생했던 이슈를 막을 수 있었다.

<br>

* 글을 마치기전에

* 이 글을 작성하게 된 목적에 대해 한번 더 생각해보자.

<br>

* List에 null이 들어올 수 있는 환경이고

* 그 값을 참조하는 Logic이 있다면

* 실제 Data에 대한 **Validate**를 잊지 말자 !!!

<br>

* 그렇지 않으면 

* **NPE**가 발생할 수 있다.


<br>


> 느낀점

* 이전보다 다양한 관점으로

* **견고한 코딩**을 할 수 있겠다는 

* 자신감이 생겼다. ㅎㅎ

* *(물론 아닐수도 있다...)*