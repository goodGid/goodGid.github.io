---
layout: post
title:  " Spring ThreadPoolTaskExecutor에서 CorePoolSize과 MaxPoolSize 개념 알아보기 "
categories: Spring
author: goodGid
---
* content
{:toc}

## Question

* I have a question:
 
  *What is the difference between corePoolSize and maxPoolSize in the Spring ThreadPoolTaskExecutor?*

* Let's find out the correct answer to the question

---

## CorePoolSize & MaxPoolSize

* **CorePoolSize** is the minimum number of threads used by the pool

  The number can increase up to **MaxPoolSize**
  
* When the load goes down 

  the pool will shrink back to **CorePoolSize**

---

## Caution

* If the CorePoolSize if very high 

  there can a high chance that many of your threads from pool are remaining **unused** for certain period
  
  since for every request new thread gets created until it reaches MaxPoolSize



---

## Summary

> CorePoolSize

``` 
if ( the number of threads < CorePoolSize )
    create a new Thread to run a new task

if ( the number of threads >= CorePoolSize )
    put the task into the queue
```

> MaxPoolSize

```
if ( the queue is full && the number of threads < MaxPoolSize )
    create a new thread to run tasks in

if ( the queue is full && the number of threads >= MaxPoolSize )
    reject the task
```

---

## Reference

* [What is the difference between CorePoolSize and MaxPoolSize in the Spring ThreadPoolTaskExecutor](https://stackoverflow.com/questions/1878806/what-is-the-difference-between-CorePoolSize-and-MaxPoolSize-in-the-spring-thread)