---
layout: post
title:  " Spring ThreadPoolTaskExecutor에서 CorePoolSize과 MaxPoolSize 개념 알아보기 "
categories: Spring
author: goodGid
---
* content
{:toc}

## ThreadPoolTaskExecutor

### Question

* I have a question:
 
  *What is the difference between corePoolSize and maxPoolSize in the Spring ThreadPoolTaskExecutor?*

* Let's find out the correct answer to the question

---

### CorePoolSize & MaxPoolSize

* **CorePoolSize** is the minimum number of threads used by the pool

  The number can increase up to **MaxPoolSize**
  
* When the load goes down 

  the pool will shrink back to **CorePoolSize**

---

### Caution

* If the CorePoolSize if very high 

  there can a high chance that many of your threads from pool are remaining **unused** for certain period
  
  since for every request new thread gets created until it reaches MaxPoolSize

---

### Example

* We will see many examples

  But the concept is the same.

* Therefore if only one example is understood, you can pass the rest.

> Case 1.

* If the load is too high and queueCapacity is full 

  the new executor threads will be created unless the maxPoolSize is reached. 
  
* These additional threads will expire as soon as the queue is empty. 

* If the corePoolSize is exhausted 

  queueCapacity is full and maxPoolSize is also reached 
  
  then the new submitteds tasks will be rejected and called will get an exception.

---

> Case 2.

```
- thread pool size = 1 
- core pool size = 5 
- max pool size = 10   
- the queue is = 100
```

* As requests come in, 

  threads will be created up to 5 
  
  and then tasks will be added to the queue 
  
  until it reaches 100. 
  
* When the queue is full 

  new threads will be created up to maxPoolSize. 
  
* Once all the threads are in use 

  and the queue is full 
  
  tasks will be rejected. 
  
* As the queue reduces

  so does the number of active threads.


---

> Case 3.

``` java
ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, 
                   long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue)

ThreadPoolExecutor executorPool = 
    new ThreadPoolExecutor(5, 10, 3, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(50));
```

* **5 is the corePoolSize** :

  means Jvm will create new thread for new task for first 5 tasks. 
  
  and other tasks will be added to the queue 
  
  until queue is getting full (50 tasks).

* **10 is the maxPoolSize** : 

  JVM can create max 10 threads. 
  
  Means ( if there are already 5 task && thread is running && queue is full with 50 pending tasks )
  
  and if one more new request/task is arriving in queue 
  
  then JVM will create new thread up to 10 (total threads = previous 5 + new 5);

* **new ArrayBlockingQueue(50) = Total queue size** :
  
  it can queue 50 tasks in it.

* once all 10 threads are running 

  and if new task is arriving then that new task will be **rejected**.

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

* [Problems with pool size of Spring's ThreadPoolTaskExecutor](https://stackoverflow.com/questions/32157817/problems-with-pool-size-of-springs-threadpooltaskexecutor)

* [Core pool size vs maximum pool size in ThreadPoolExecutor](https://stackoverflow.com/questions/17659510/core-pool-size-vs-maximum-pool-size-in-threadpoolexecutor)