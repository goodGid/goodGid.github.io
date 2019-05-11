---
layout: post
title:  " Servlet Life Cycle 알아보기 "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}


## Directory

* Servlet Life Cycle을 알아보기위한 프로젝트 구조는 다음과 같다.

![](/assets/img/java/java_serlvet_life_cycle_1.png)









---

## Servlet이란?

* 자바로 웹 어플리케이션을 개발 할 수 있는 스펙과 API를 제공한다.

* 가장 핵심적인 클래스는 **HttpServlet**이다.

* 한 요청을 처리할 때마다 프로세스를 만드는 게 아니라 쓰레드를 만들어서 공유한다.

* Servlet 컨테이너(톰캣, 제티, 언더토 등등)는 Servlet 스펙에 기반해 Servlet의 생명 주기(라이프 사이클)를 다룬다.



---


## Servlet Code

* Servlet의 LIfe Cylce을 확인해보기 위해 Init / Destroy / doGet 메소드를 오버라이드 해보자.

``` java
public class HelloServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        System.out.println("=====Init=====");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("=====doGet=====");
        resp.getWriter().println("<html>");
        resp.getWriter().println("<head>");
        resp.getWriter().println("<body>");
        resp.getWriter().println("<h1>Hello Servlet</h1>");
        resp.getWriter().println("</body>");
        resp.getWriter().println("</head>");
        resp.getWriter().println("</html>");
    }

    @Override
    public void destroy() {
        System.out.println("=====Destory=====");
    }
}
```

* 코딩 후 톰캣에 어플리케이션을 배포 & 실행해보자.

---


## Log

* 처음으로 http://localhost:8080/hello 요청하게 되면 2가지 동작이 수행된다.

* 초기화(Init)작업 후 doGet 요청 처리

* 처음으로 /hello를 요청하면 서블릿 인스턴스를 만들게 된다.

* 서블릿이 생성된 후 Get요청(URL로 접근을 시도)을 처리하는 doGet 메소드가 실행된다.

* 콘솔 로그에는 아래와 같이 2개의 로그가 찍히게 된다.


``` java
=====Init=====
=====doGet=====
```

* 이후 http://localhost:8080/hello URL로의 접근에 대해서는 Init 메소드가 호출되지 않는다.

* doGet 메소드만 호출된다.

``` java
=====doGet=====
```

* 마지막으로 Tomcat 서버를 중지하면 destroy 메소드가 호출된다.

``` java
=====Destory=====
```

* 전체 로그는 다음과 같다.

``` java
Connected to server
[2019-02-17 07:32:44,269] Artifact Servlet:war exploded: Artifact is being deployed, please wait...
[2019-02-17 07:32:44,588] Artifact Servlet:war exploded: Artifact is deployed successfully
[2019-02-17 07:32:44,588] Artifact Servlet:war exploded: Deploy took 319 milliseconds
17-Feb-2019 19:32:54.136 INFO [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [/usr/local/apache-tomcat-8.5.38/webapps/manager]
17-Feb-2019 19:32:54.161 INFO [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/usr/local/apache-tomcat-8.5.38/webapps/manager] has finished in [25] ms

=====Init=====
=====doGet=====
// Call http://localhost:8080/hello
=====doGet=====
// Call http://localhost:8080/hello
=====doGet=====
// Stop Tomcat/usr/local/apache-tomcat-8.5.38/bin/catalina.sh stop
17-Feb-2019 19:39:33.305 INFO [main] org.apache.catalina.core.StandardServer.await A valid shutdown command was received via the shutdown port. Stopping the Server instance.
17-Feb-2019 19:39:33.306 INFO [main] org.apache.coyote.AbstractProtocol.pause Pausing ProtocolHandler ["http-nio-8080"]
17-Feb-2019 19:39:33.315 INFO [main] org.apache.coyote.AbstractProtocol.pause Pausing ProtocolHandler ["ajp-nio-8009"]
17-Feb-2019 19:39:33.321 INFO [main] org.apache.catalina.core.StandardService.stopInternal Stopping service [Catalina]
=====Destory=====

17-Feb-2019 19:39:33.339 INFO [main] org.apache.coyote.AbstractProtocol.stop Stopping ProtocolHandler ["http-nio-8080"]
17-Feb-2019 19:39:33.342 INFO [main] org.apache.coyote.AbstractProtocol.stop Stopping ProtocolHandler ["ajp-nio-8009"]
17-Feb-2019 19:39:33.345 INFO [main] org.apache.coyote.AbstractProtocol.destroy Destroying ProtocolHandler ["http-nio-8080"]
17-Feb-2019 19:39:33.346 INFO [main] org.apache.coyote.AbstractProtocol.destroy Destroying ProtocolHandler ["ajp-nio-8009"]
Disconnected from server
```

* 관련된 소스코드는 모두 [Servlet Life Cycle](https://github.com/goodGid/Servlet_LifeCycle)에 있다.