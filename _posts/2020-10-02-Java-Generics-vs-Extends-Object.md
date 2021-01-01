---
layout: post
title:  " Java Generics에서 &lt;?&gt; 와 &lt;? extends Object&gt; 차이에 대해 알아보자 "
categories: Java
author: goodGid
---
* content
{:toc}

## Overview

* we'll see the **similarities** and **differences** between <?> and <? extends Object> in Java Generics.





## [Wildcards(=?) in Generics](https://www.baeldung.com/java-generics-vs-extends-object#wildcards)

* A question mark, or wildcard, is used in generics to represent an unknown type. 

* It can have three forms:

```
1. Unbounded Wildcards
  List<?> represents a list of unknown type

2. Upper Bounded Wildcards 
  List<? extends Number> represents a list of Number or its sub-types such as Integer and Double

3. Lower Bounded Wildcards
  List<? super Integer> represents a list of Integer or its super-types Number and Object
```

* Now, since Object is the inherent super-type of all types in Java, 

  we would be tempted to think that it can also represent an unknown type. 

* In other words,

  List&lt;?&gt; and List&lt;Object&gt; could serve the same purpose.

  **But they don’t.**

* Let's consider these two methods:

``` java
public static void printListObject(List<Object> list) {
    for (Object element : list) 
        System.out.print(element + " ");
    }
}
 
public static void printListWildCard(List<?> list) {
    for (Object element: list) {
        System.out.print(element + " ");
    } 
}
```

* Given a list of Integers, say:

``` java
List<Integer> list = Arrays.asList(1, 2, 3);
printListObject(list); 
printListWildCard(list);
```

* *printListObject(list)* will not compile, and we'll get this error:

``` java
java: incompatible types: java.util.List<java.lang.Integer> cannot be converted to java.util.List<java.lang.Object>
```

* Whereas *printListWildCard(list)* will compile and will output 1 2 3 to the console.


---

### [Similarities](https://www.baeldung.com/java-generics-vs-extends-object#similarities)

* In the above example, 

  if we change the method signature for printListWildCard to:

``` java
public static void printListWildCard(List<? extends Object> list)
```

* It would function in the same way as printListWildCard(List<?> list) did. 

  This is due to the fact that Object is a supertype of all Java objects, 
  
  and basically everything extends Object. 
  
  So, a List of Integers gets processed as well.

* In short, it means that &lt;?&gt; and &lt;? extends Object&gt; are **synonymous** in this example.

  While in most cases that would hold true, but there are **a few differences** as well. 



---


### [Difference](https://www.baeldung.com/java-generics-vs-extends-object#differences)


* **[Reifiable](https://www.baeldung.com/java-super-type-tokens#1reification)** types are those whose type is **not erased** at compile time.

  In other words, a non-reifiable type's runtime representation will have less information 
  
  than its compile-time counterpart, because some of it'll get erased.

* As a general rule, parameterized types are not reifiable. 

  This means List&lt;String&gt; and Map<Integer, String> are **not reifiable**.
  
  The compiler erases their type and treats them as a **List** and **Map** respectively.

* **The only exception** to this rule is **unbounded wildcard types**.

  This means List&lt;?&gt; and Map&lt;?,?&gt; are reifiable.

* On the other hand, 

  List<? extends Object> is not reifiable. 
  
  While subtle, this is a notable difference.

* So we can summary it like this

```
## Reifiable
List<?> and Map<?,?> are reifiable.

## Not Reifiable
List<String> and Map<Integer, String>
List<? extends Object>
```

* Non-reifiable types cannot be used in certain situations 

  such as in **an instanceof operator** or as elements of an array.

* So, if we write:

``` java
// Success
List someList = new ArrayList<>();
boolean instanceTest = someList instanceof List<?>
```

* This code compiles and *instanceTest* is true.

* But, if we use the instanceof operator on List<? extends Object>:

``` java
// Fail
List anotherList = new ArrayList<>();
boolean instanceTest = anotherList instanceof List<? extends Object>;
```

* then line 2 does not compile.

* Similarly, in the below snippet, line 1 compiles, but line 2 doesn't

``` java
// Success
List<?>[] arrayOfList = new List<?>[1];
// Fail
List<? extends Object>[] arrayOfAnotherList = new List<? extends Object>[1]
```

---

## Summary

* While mostly similar, 

  there are **subtle differences** between the two in terms of their being reifiable or not.

---

## Reference

* [Java Generics – <?> vs <? extends Object>](https://www.baeldung.com/java-generics-vs-extends-object)