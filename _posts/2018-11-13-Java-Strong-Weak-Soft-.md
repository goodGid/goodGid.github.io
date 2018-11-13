---
layout: post
title:  " Java Reference(Strong, Weak, Soft Reference) "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

## Java Reference

* strong > soft > weak > (phantom ?) > unreachable 

* **오른쪽**으로 갈수록 GC의 수거 대상 확률이 높아진다.










---



## Strong Reference

* 먼저 우리가 일반적으로 쓰고있는 **Strong reference**이다.

* 이런식의 참조는 절대 GC가 되지 않는다.

```java
public class ClassStrong {
 
    public static class Referred {
        protected void finalize() {
            System.out.println("Good bye cruel world");
        }
    }
 
    public static void collect() throws InterruptedException {
        System.out.println("Suggesting collection");
        System.gc();
        System.out.println("Sleeping");
        Thread.sleep(5000);
    }
 
    public static void main(String args[]) throws InterruptedException {
        System.out.println("Creating strong references");
 
        // This is now a strong reference.
        // The object will only be collected if all references to it disappear.
        Referred strong = new Referred();
 
        // Attempt to claim a suggested reference.
        ClassStrong.collect();
 
        System.out.println("Removing reference");
        // The object may now be collected.
        strong = null;
        ClassStrong.collect();
 
        System.out.println("Done");
    }
}
```




---

## Soft Reference

* 이 경우 JVM의 GC가 **메모리가 부족하다고 판단하면 수거**해간다.

* GC가 수거해가지 못하도록 방지하는 수준은 아니지만 (이거는 strong reference), 수거 시간을 지연할 수는 있다.

* GC가 수거해가지 못하도록 하는 수준은 아니지만(=Strong Reference) <br> **수거 시간**을 **지연**할 수는 있다.

* **자주 사용**될수록 GC가 수거해가지 않는다.

* [Soft Reference가 참조하고 있는 객체가 마지막으로 사용된 이후로부터 지금까지의 시간] > [옵션 설정값 N] * [힙에 남아있는 메모리 크기] 

* 위 조건이 만족되면 GC가 수거해간다.

* 위의 *옵션 설정값 N* 은 **JVM 옵션 설정값**으로 다음과 같이 정해준다. <br> -XX:SoftRefLRUPolicyMSPerMB=<N>


<br>


* 따라서 원문에서는 **캐쉬(cache)로 사용**하면 좋다고 언급하지만

* 사실 Soft Reference는 캐쉬로 사용하면 안된다. 

* 간략하게 설명하자면 soft reference로 인해 **메모리에 GC threshold까지 계속 차있는 상태가 유지**되면 

* 훨씬더 잦은 GC를 발생시킨다.

``` java
import java.lang.ref.SoftReference;
import java.util.ArrayList;
import java.util.List;
 
/*
 * A sample for Detecting and locating memory leaks in Java
 */
public class ClassSoft {
 
    public static class Referred {
        protected void finalize() {
            System.out.println("Good bye cruel world");
        }
    }
 
    public static void collect() throws InterruptedException {
        System.out.println("Suggesting collection");
        System.gc();
        System.out.println("Sleeping");
        Thread.sleep(5000);
    }
 
    public static void main(String args[]) throws InterruptedException {
        System.out.println("Creating soft references");
 
        // This is now a soft reference.
        // The object will be collected only if no strong references exist and the JVM really needs the memory.
        Referred strong = new Referred();
        SoftReference<Referred> soft = new SoftReference<Referred>(strong);
 
        // Attempt to claim a suggested reference.
        ClassSoft.collect();
 
        System.out.println("Removing reference");
        // The object may but highly likely wont be collected.
        strong = null;
        ClassSoft.collect();
 
        System.out.println("Consuming heap");
        try
        {
            // Create lots of objects on the heap
            List<ClassSoft> heap = new ArrayList<ClassSoft>(100000);
            while(true) {
                heap.add(new ClassSoft());
            }
        }
        catch (OutOfMemoryError e) {
            // The soft object should have been collected before this
            System.out.println("Out of memory error raised");
        }
 
        System.out.println("Done");
    }
}
```



---

## Weak Reference

* 가장 흔하게 쓰는 Reference이다.

* 명시적으로 **Weak Reference**를 사용하여 해당 객체가 GC 되도록 유도할 수 있다.

* 일단 GC가 돌면은 수거해가는 객체들이다.

``` java
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;
 
/*
 * A sample for Detecting and locating memory leaks in Java
 */
public class ClassWeak {
 
    public static class Referred {
        protected void finalize() {
            System.out.println("Good bye cruel world");
        }
    }
 
    public static void collect() throws InterruptedException {
        System.out.println("Suggesting collection");
        System.gc();
        System.out.println("Sleeping");
        Thread.sleep(5000);
    }
 
    public static void main(String args[]) throws InterruptedException {
        System.out.println("Creating weak references");
 
        // This is now a weak reference.
        // The object will be collected only if no strong references.
        Referred strong = new Referred();
        WeakReference<Referred> weak = new WeakReference<Referred>(strong);
 
        // Attempt to claim a suggested reference.
        ClassWeak.collect();
 
        System.out.println("Removing reference");
        // The object may be collected.
        strong = null;
        ClassWeak.collect();
 
        System.out.println("Done");
    }
}
```



---


## LRU 캐시 구현

* LRU 캐시 구현에 Soft Reference가 적합하다는 의견이 있다.

* Weak Reference가 적합하다는 의견도 있다.

* Soft Reference가 적합하다고 하는 이유는 <br> Soft Reference 자체적으로 최근에 사용될수록 GC에서 수거해가지 않는 속성이 있기 때문에 <br> **LRU 전략(Least Recently Used)**을 바로 구현할 수 있기 때문이다.

* Weak Reference가 적합하다고 하는 이유는 <br> 다른 logic을 위해 비워야할 Heap 공간이 Soft Reachable 객체들에 의해 점유되기 때문에 <br> 메모리 사용량이 늘고 따라서 GC 가 자주 돌게 되고 이는 성능 이슈를 만든다.

* 즉 Soft로 선언했기 때문에 자주 사용되지 않아도 메모리에 남아있을 가능성이 있기 때문에 <br> Weak처럼 안쓰면 바로바로 회수를 하여 실질적으로 많이 참조되는 객체만 살아남도록하자는 방식이다.






---

## 참고

* [Strong, Soft, Weak and Phantom References (Java)](http://neverfear.org/blog/view/150/Strong_Soft_Weak_and_Phantom_References_Java)

* [Java의 메모리 관리 - Weak, Soft, Phantom reference 예제](https://tourspace.tistory.com/42)

* [Weak, Soft, Phantom Reference](http://128.199.231.48/weak-soft-phantom-reference/)

* [Java Reference와 GC](https://d2.naver.com/helloworld/329631)