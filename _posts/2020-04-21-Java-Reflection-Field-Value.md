---
layout: post
title:  " Java Reflection으로 Field 값(Value) 참조하기 "
categories: Java
author: goodGid
---
* content
{:toc}

## Prologue

* Object에 있는 모든 Field에 접근하여 Validate 해야하는 Need가 생겼다.




---

## Reflection

* Reflection 개념 관련해서는 다음 글을 참고하자.

* [리플렉션(Reflection) : 클래스 생성자 접근]({{site.url}}/Java-Reflection-Access-Class-Constructor/)

* [리플렉션(Reflection) : 클래스 정보 조회]({{site.url}}/Java-Reflection-Class-Info-Query/)

* [리플렉션(Reflection) : 클래스 정보 수정]({{site.url}}/Java-Reflection-Modify-Class-Information/)



---

## Code

``` java
private void checkGoodGidObject(GoodGidObject goodGidObject) {

  // Reflection으로 Object Field에 접근한다.
  Field[] declaredFields = goodGidObject.getClass().getDeclaredFields();

  for (Field field : declaredFields) {
      Object value = null;

      // private Field일 경우 접근을 허용한다.
      field.setAccessible(true);

      try {
          // Field Value를 참조한다.
          value = field.get(goodGidObject);
      } catch (IllegalAccessException e) {
          log.info("Reflection Error. {}", e);
      }

      // ObjectUtils를 사용하여 Field Value 값을 체크한다.
      if (ObjectUtils.isEmpty(value)) {
          log.warn("The field value of goodGidObject has a null value. {}", goodGidObject);
          return;
      }
  }

}
```