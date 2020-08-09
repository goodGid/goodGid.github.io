---
layout: post
title:  " String을 임의의 Byte Length로 자르기 : 99% vs 100% "
categories: TIL
author: goodGid
---
* content
{:toc}

## Background

* QA 분께서 Bug를 등록해주셨다.

  Bug를 불러일으킨 코드를 봤는데 완벽해 보였다.

  하지만 삽질 후 완벽하지 않았음을 깨달았다.

* 문제가 되었던 코드는 
  
  String을 임의의 Byte Length로 자르는 부분이었는데 
  
  해당 Logic이 완벽하지 못했다.



---

## Requirement

* 다음과 같은 요구 사항이 있다.

1. DB column 값이 10byte이다.

2. 사용자에게 입력받은 String 값을 10byte로 잘라야 한다.



---

## Think

* 어떻게 코딩할 수 있을까?

1. 입력받은 String을 임의의 Byte Length로 자른다. 

2. 끝

* 그런데 구현하는 데 있어 

  너무 쉽게 생각하고 코딩을 하면

  특정 케이스에서 의도치 않은 결과를 마주하게 된다.


---

## Pre-Concept

* 구현을 보기 전에 이 글에서 **공유하고 싶었던 코드**를 정리해봤다.

> null check

* 일부러 2가지 방법으로 null check를 하였다.

1. Objects.requireNonNull()

2. Assert.notNull()

* 2개다 null일 경우에 exception을 던진다.

  하지만 **몇 가지 차이**가 있다.

---

* 첫째로는 해당 method를 제공해주는 **출처**이다.

* Objects는 **java.util**에서 제공해주는 method이다.

  반면에 Assert는 **Spring Framework**에서 제공해주는 method이다.

  만약 java에 가까운 code를 원한다면 Objects를 사용하고

  그게 아니라면 사용하는 Framework에서 제공하는 method를 사용하면 된다.

---

* 또 다른 점으로는 **Exception Type** 이다.

  Objects는 NullPointerException를 던진다.

  반면 Assert는 IllegalArgumentException을 던진다.

---

* 무엇을 사용하느냐는 개인적인 선택이므로 

  자신의 스타일에 맞는 method를 사용하도록 하자 !

  다만 필자는 이런 게 있음을 공유하고 싶었다.

---

> Test Code

* Test Framework로 **Spock**을 사용하였다.

  Junit을 사용할까 하다가 신선함을 위하여 Spock을 사용하였다.

  개인적으로 Junit보다 100배는 더 간편하고 좋은 거 같다.



---

## Implementation

### 99% Algorithm

* 먼저 99% 완벽함을 보이는 코드를 보자.

``` java
public static String directCutByByteSize(String sentence, int maxByteSize) {
    byte[] cutBytesSentence =
            ArrayUtils.subarray(sentence.getBytes(),
                                0, // startIndexInclusive
                                maxByteSize); // endIndexExclusive 

    String editedSentence = new String(cutBytesSentence);
    return editedSentence;
}
```
  
* apache.commons에서 제공해주는 ArrayUtils 을 사용하여

  주어진 String을 임의의 Byte Length로 잘라냈다.

> org.apache.commons.lang.ArrayUtils#subarray(byte[], int, int)

``` java
public class CustomByteUtils {
    public static byte[] subarray(byte[] array, 
                                int startIndexInclusive, 
                                int endIndexExclusive) {
        if (array == null) {
            return null;
        } else {
            if (startIndexInclusive < 0) {
                startIndexInclusive = 0;
            }

            if (endIndexExclusive > array.length) {
                endIndexExclusive = array.length;
            }

            int newSize = endIndexExclusive - startIndexInclusive;
            if (newSize <= 0) {
                return EMPTY_BYTE_ARRAY;
            } else {
                byte[] subarray = new byte[newSize];
                System.arraycopy(array, startIndexInclusive, subarray, 0, newSize);
                return subarray;
            }
        }
    }
}
```

* 언뜻 봐서는 큰 문제가 없어 보인다.

  하지만 Test Code를 통해 어떤 문제가 있는지 알아보자.

> Test Code

``` java
class CustomByteUtilsMockTest extends Specification {

    def customByteUtils = new CustomByteUtils()

    @Unroll
    def "directCutByByteSize"() {
        expect:
        customByteUtils.directCutByByteSize(sentence, maxByteSize) == result

        where:
        sentence     | maxByteSize | result
        "1234567890" | 10          | "1234567890"   // [1]
        "123456789안" | 10          | "123456789�"  // [2]
    }
}
``` 

* [1],[2] case 모두 다 성공한다.

* [1] case를 보면 의도한 결과가 나왔다.

  그런데 [2]는 '뭐지?'라는 생각이 들 수 있다.

  그 결과가 나온 원인과 결과를 아는 게 이 글의 **핵심**이다.

  그러기 위해선 **Ascii 값**과 **Ascii 값의 Byte Length**를 알아야 한다.

```
1 = ascii 값 49 = 1byte 
...
9 = ascii 값 57 = 1byte 
안 = ascii 값 -20,-107,-120 = 3byte
```

* 주의해서 볼 문자는 **안**이다.

  안의 Byte Length는 3이다.

  그리고 입력한 maxByteSize는 10이다.

```
입력한 '123456789안'을 보면
1~9까지 하면 Byte Length는 9이다.

그런데 maxByteSize가 10이기 때문에
'안'을 표현하는 -20,-107,-120중에서 
-20까지만 포함되게 된다.

그러므로 cutBytesSentence 변수에는 다음처럼 값이 들어가 있게 된다.

0 = 49
1 = 50
2 = 51
3 = 52
4 = 53
5 = 54
6 = 55
7 = 56
8 = 57
9 = -20
```

* 여기서 문제가 발생한다.

* '안'을 제대로 표현하기 위해서는

  -20, -107, -120이 들어가야 하지만
  
  byte 제한으로 인해 -20만 들어가게 됐다.

* 그러므로 cutBytesSentence 을 다시 String으로 변환할 때

  이상한 값이 나오게 된다.

  ex) 123456789�

* 즉 위 Logic의 **문제점**은 

  문맥 단위의 작업이 아닌 그저 Byte 단위로 자르기 때문에

  String -> Byte -> String으로 변환 시 다른 값으로 변경될 가능성 있다.

---

### 100% Algorithm

* 위 문제점을 해결하기 위해선

  문맥 단위로 Byte로 잘라야 한다.
  
  다양하게 구현할 수 있겠지만 필자는 다음처럼 구현하였다.

  어렵지 않은 코드이므로 이해해보도록 하자.



> CustomByteUtils

``` java
public class CustomByteUtils {

    private static final String DEFAULT_APPEND_TO_END = "...";

    public static String abbreviateByByteSize(String sentence, 
                                              int maxByteSize, 
                                              String appendToEnd) {

        appendToEnd = defaultIfNull(appendToEnd, DEFAULT_APPEND_TO_END);

        // throw NullPointerException --> from `java.util`
        Objects.requireNonNull(sentence, "`sentence` must not be null");

        // throw IllegalArgumentException --> from `org.springframework.util.Assert`
        Assert.notNull(maxByteSize, "`maxByteSize` must not be null");

        if (sentence.getBytes().length <= maxByteSize) {
            return sentence;
        }

        // 사용 될 appendToEnd Byte Length를 미리 계산해 놓는다.
        int byteSize = appendToEnd.getBytes().length;

        char[] charArray = sentence.toCharArray();
        int length = charArray.length;

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            String s = String.valueOf(charArray[i]);
            int charByteSize = s.getBytes().length;

            if (byteSize + charByteSize <= maxByteSize) {
                byteSize += charByteSize;
                sb.append(s);
            } else {
                sb.append(appendToEnd);
                break;
            }
        }
        return sb.toString();
    }

    private static <T> T defaultIfNull(T objectValue, T defaultValue) {
        return objectValue == null ? defaultValue : objectValue;
    }
}
```

> Test Code

``` java
class CustomByteUtilsMockTest extends Specification {

    def customByteUtils = new CustomByteUtils()

    @Unroll
    def "customByteUtils"() {
        expect:
        customByteUtils.abbreviateByByteSize(sentence, maxByteSize, appendToEnd) == result

        // 숫자 : 1바이트
        // 영어 : 1바이트
        // 한글 : 3바이트
        // ∑ : 3바이트

        where:
        sentence          | maxByteSize | appendToEnd | result
        "1234567890"      | 10          | ""          | "1234567890"
        "123456789안"      | 10          | ""          | "123456789"
        "123456789안"      | 10          | "..."       | "1234567..."

        "abcdefg"         | 6           | null        | "abc..."
        "abcdefg"         | 6           | ""          | "abcdef"
        "abcdefg"         | 6           | "---"       | "abc---"

        "1234abcdㄱㄴㄷㄹ"    | 15          | null        | "1234abcdㄱ..."
        "1234∑123"        | 10          | null        | "1234∑123"
        "1234∑"           | 10          | null        | "1234∑"
        "1234∑0123456789" | 10          | null        | "1234∑..."

        "안녕하세요"           | 10          | null        | "안녕..."
        "안녕하세요"           | 10          | ""          | "안녕하"
    }
}
```

---

## Summary

* String -> Byte로 자르는 경우가 필요하다면 

  위에서 언급한 부분을 고려하여 작업하도록 하자 ! 

* 끝으로 도움을 받았던 분들에게 감사함을 표하고 싶다.

  100% Algorithm 아이디어를 주셨던 **lucky.donggyu**님에게 감사하고

  Bug가 등록되었을 때 문제 파악을 하기 위해 도와준 **jinhyeon-park**님과 **youil-han**님에게 매우 감사하다.
  