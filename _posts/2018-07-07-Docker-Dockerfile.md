---
layout: post
title:  " Dockerfile 자세히 알아보기 "
categories: Docker
author: goodGid
---
* content
{:toc}

* Docekr는 이미지를 만들기 위해 

  Dockerfile이라는 파일에 **DSL(Domain-specific language)** 언어를 이용하여 이미지 생성 과정을 적는다.

* Dockerfile은 `<명령> <매개 변수>` 형식으로 작성하고

  항상 **FROM** 명령으로 시작한다.

* 그렇게 작성된 Dockerfile은 순서대로 처리되고 독립적으로 실행된다.

```
RUN cd /home/hello
이동 후 hello 안에 존재하는 파일에 대해 실행을 하려고 해도
RUN 명령어가 끝나면 
현재 위치는 /home/hello에 있지 않으므로 원하는 대로 동작하지 않는다.
```

* 이미지 생성 시 Dockerfile이 있는 디렉토리에서 docker build 명령어를 사용한다.

```
docker build --tag example .
docker build -t goodgid/example .

--tag 혹은 -t 옵션으로 이미지 이름 설정 가능
_a_/ : Docker Hub에 이미지를 올리려면 / 앞에 사용자명(_a_) 명시
```



---

# .dockerignore

* Dockerfile과 같은 directory에 들어있는 모든 파일을 `컨텍스트(context)`라 한다.

* 컨텍스트에서 파일이나 directory를 제외하고 싶을 때는 `.dockerignore` 파일을 사용

```
example/hello.txt
example/*.cpp
```

---

# FROM

* FROM은 어떤 이미지를 기반으로 이미지를 생성할지 설정한다.

* Dockerfile로 이미지 생성 시

  항상 기존에 있는 이미지를 기반으로 생성하므로
  
  반드시 Dockerfile을 설정해야 한다.

> Usage

1. FROM <이미지>

2. FROM <이미지>:<태그>

> Example

```
FROM ubuntu // 이름만 설정하면 latest를 사용
FROM ubuntu:16.04
```

---

# MAINTAINER

* MAINTAINER는 자유로운 형식으로 이미지를 생성한 사람의 정보를 설정한다.

```
MAINTAINER Good, Gid <hello.goodgid@gmail.com>
```

---

# RUN

* RUN은 FROM에서 설정한 이미지 위에서 스크립트 혹은 명령을 실행한다.

* RUN으로 실행한 결과는 새 이미지로 생성되고

  실행 내역은 이미지의 히스토리에 기록된다.

* RUN으로 실행한 결과는 **Cache**되며 다음 빌드 때 재사용된다.

  Cache된 결과를 사용하지 않으려면 docker build 명령에서 --no-cache 옵션을 사용하면 된다.


> Usage

* FROM으로 설정한 이미지에 /bin/sh 실행 파일 유무에 따라 다르다.

1. RUN <명령>

2. RUN [ "실행 파일", "매개 변수1", "매개 변수2" ]


---

## Shell(/bin/sh)로 명령 실행하기

```
RUN apt-get install -y nginx
RUN echo "Hello Docker" > /tmp/hello
RUN curl -sSL https://golang.org/dl/go1.3.1 ~ 
RUN git clone https://github.com/~
```

* FROM으로 설정한 이미지에 포함된 **/bin/sh 실행 파일**을 사용하며

  /bin/sh 실행 파일이 없으면 사용할 수 없다.


---

## Shell 없이 바로 실행

```
RUN ["apt-get", "install", "-y", "nginx"]
RUN ["/user/local/bin/hello", "--help"]
```

* FROM으로 설정한 이미지의 /bin/sh 실행 파일을 사용하지 않는 방식이다.


---


# CMD

* Dockerfile에서 한 번만 사용할 수 있다.

* CMD는 컨테이너 시작 시 스크립트 혹은 명령을 실행한다.

* 즉 RUN 명령으로 컨테이너를 생성하거나

  docker start 명령으로 정지된 컨테이너를 시작할 때 실행된다.

> Usage

* FROM으로 설정한 이미지에 /bin/sh 실행 파일 유무에 따라 다르다.

1. CMD <명령>

2. CMD [ "실행 파일", "매개 변수1", "매개 변수2" ]

---

## Shell(/bin/sh)로 명령 실행하기

```
CMD touch /home/hello/hello.txt
```

* FROM으로 설정한 이미지에 포함된 **/bin/sh 실행 파일**을 사용하며

  /bin/sh 실행 파일이 없으면 사용할 수 없다.

---

## Shell 없이 바로 실행

```
CMD ["redis-server"]
```

---

## Shell 없이 바로 실행할 때 매개 변수 설정하기

```
CMD ["mysql", "--datadir=/var/lib/mysql", "--user=mysql"]
```

---

## ENTRYPOINT 사용 시

```
ENTRYPOINT ["echo"]
CMD ["hello"]
```

* CMD ["< 매개 변수1 >", "< 매개 변수2 >"]

* ENTRYPOINT에 설정한 명령에 매개 변수를 전달하여 실행한다.

* Dockerfile에 ENTRYPOINT가 있으면 

  CMD는 ENTRYPOINT에 매개 변수만 전달하는 역할을 한다.
  
  그래서 CMD 독자적으로 파일을 실행할 수 없다.



---

# EXPOSE

* 호스트와 연결할 포트 번호를 설정하기 위해 사용한다.

> Usage

1. EXPOSE < 포트 번호 >

> Example

```
EXPOSE 80
EXPOSE 443
EXPOSE 80 443
```

* EXPOSE는 호스트와 연결하는 데 사용되고 외부에 노출되지 않는다.

* 포트를 외부에 노출하려면 docker run 명령의 -p, -P 옵션을 사용한다.

---

# ENV

* ENV는 환경 변수를 설정하기위해 사용한다.

* ENV로 설정한 환경 변수는 RUN, CMD, ENTRYPOINT에 적용된다.

> Usage

1. ENV < 환경 변수 > < 값 >

> Example

```
ENV GOPATH /go
ENV PATH /go/bin:$PATH
```

* 환경 변수를 사용하기 위해선 **$**를 사용한다.

* 다음은 ENV에서 설정한 환경 변수를 CMD로 출력하는 코드이다.

```
ENV HELLO 1234
CMD echo $HELLO
```

* 환경 변수는 docker run 명령에서도 설정 가능하다.

```
docker run -e HELLO=4321 example
4321 출력 # if example 이미지 안에서 HELLO 변수를 출력하는 Code가 있다면
```

---

# ADD

* ADD는 파일을 이미지에 추가하는 데 사용한다.

> Usage

1. ADD < 복사할 파일 경로 > < 이미지에서 파일이 위치할 경로 >

> Detail Usage

* < 복사할 파일 경로 >는 컨텍스트 아래를 기준으로 한다.

  그러므로 **상위 directory** 혹은 **절대 경로**를 사용할 수 없다.

```  
ADD ../hello.txt /home/hello (x)
ADD /home/hello/hello.txt /home/hello (x) --> 시작을 "/"로 하면 안 된다.
```

* < 복사할 파일 경로 >는 파일뿐만 아니라 directory도 설정할 수 있다.
  
  **와일드카드(*)**를 사용하여 특정 파일만 복사할 수 있다.

```
ADD *.txt /root
```

* < 이미지에서 파일이 위치할 경로 >는 항상 **절대 경로**로 설정해야 한다.

  마지막이 **/**로 끝나면 directory가 생성되고 파일은 그 아래에 복사된다.

```
ADD hello.zip /
```

* < 복사할 파일 경로 >에 현재 directory를 사용하면 

  *.dockerignore 파일* 에 설정한 파일과 directory는 제외된다.

```
ADD ./ /Hello
```

---

# COPY

* COPY는 파일을 이미지에 추가하는데 사용한다.

  ADD와 달리 압축 파일을 추가할 때 압축을 해제하지 않고 파일 URL도 사용 가능하다.

> Usage

1. COPY < 복사할 파일 경로 > < 이미지에서 파일이 위치할 경로 >

> Detail Usage

* < 복사할 파일 경로 >는 컨텍스트 아래를 기준으로 한다.

  그러므로 **상위 directory** 혹은 **절대 경로**를 사용할 수 없다.

```
COPY hello-dir /hello-dir
```

* < 복사할 파일 경로 >는 파일뿐만 아니라 directory도 설정할 수 있다.
  
  **와일드카드(*)**를 사용하여 특정 파일만 복사할 수 있다.

```
COPY *.txt /root/
```

* < 이미지에서 파일이 위치할 경로 >는 항상 **절대 경로**로 설정해야 한다.

  마지막이 **/**로 끝나면 directory가 생성되고 파일은 그 아래에 복사된다.
        
```
COPY ./ /hello
```

---

# VOLUME

* directory의 내용을 컨테이너에 저장하지 않고 호스트에 저장한다.

> Usage

1. VOLUME < 컨테이너 directory > 

2. VOLUME [ "컨테이너 directory 1", "컨테이너 directory 2" ]

> Example

```
VOLUME /data
VOLUME ["/data", "/var/log/hello"]
```

* VOLUME으로는 호스트의 특정 directory와 연결할 수 없다.

* 호스트의 특정 directory와 연결하려면 docker run **-v** 옵션을 사용해야 한다.

  ex) -v < 호스트 directory > : < 컨테이너 directory >


---

# WORKDIR

* WORKDIR는 RUN, CMD, ENTRYPOINT의 명령이 실행될 directory를 설정한다.

> Usage

1. WORKDIR <경로>

> Example

```
WORKDIR /root
RUN touch hello.txt

WORKDIR /tmp
RUN touch hello.txt
```

* WORKDIR은 절대 경로 대신 **상대 경로**를 사용해도 된다.

  상대 경로 사용 시 먼저 설정한 WORKDIR의 경로를 기준으로 directory를 변경한다.

* Default가 되는 기준 Path는 **/**이다.

```
WORKDIR var
WORKDIR www
RUN touch hello.txt
```

* 상대 경로를 사용하여 명령이 실행될 directory를 지정했으므로

  /var/www/hello.txt에 파일이 생성된다.

  ( "/" -> "var" -> "www" )
  
  