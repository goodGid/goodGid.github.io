---
layout: post
title:  " Dockerfile 자세히 알아보기 "
categories: Docker
tags: Docker
author: goodGid
---
* content
{:toc}


* Docekr는 이미지를 만들기 위해 Dockerfile이라는 파일에 자체 **DSL(Domain-specific language)**언어를 이용하여 이미지 생성 과정을 적는다.

* Dockerfile은 다음과 같이 `<명령> <매개 변수>` 형식으로 작성

* Docker는 Dockerfile에 작성된 명령을 순서대로 처리

* 그리고 Dockerfile에서 명령은 항상 `FROM`으로 시작

* 각 명령은 독립적으로 실행
    - ex) RUN cd /home/hello로 디렉터리를 이동하더라도 뒤에 오는 명령에는 영향 X

* 이미지 생성할 때는 Dockerfile이 있는 디렉터리에서 docker build 명령 사용

```
docker build --tag example .
docker build -t goodgid/example .

--tag or -t 옵션으로 이미지 이름 설정 가능
_a_/ : Docker Hub에 이미지를 올리려면 / 앞에 사용자명(_a_) 명시
```












---

# .dockerignore

* Dockerfile과 같은 디렉터리에 들어있는 모든 파일을 `컨텍스트(context)`라 한다.

* 컨텍스트에서 파일이나 디렉터리를 제외하고 싶을 때는 `.dockerignore` 파일을 사용

```
example/hello.txt
example/*.cpp
```

---

# FROM

* FROM은 어떤 이미지를 기반으로 이미지를 생성할지 설정

* Dockerfile로 이미지를 생성할 때는 항상 기존에 있는 이미지를 기반으로 생성하기 때문에 <br> 반드시 Dockerfile을 설정해야 한다.

* FROM <이미지> or FROM <이미지>:<태그>

* 다음과 같이 이미지 이름을 설정하거나 <br> 이미지 이름 + 태그를 함께 설정 가능 이미지 ( 이름만 설정하면 latest를 사용 )

* Dockerfile에 FROM을 2개 설정했다면 이미지가 2개 생성


```
FROM ubuntu

FROM ubuntu:16.04
```

---

# MAINTAINER

* MAINTAINER는 이미지를 생성한 사람의 정보를 설정 <br> 형식은 자유

```
MAINTAINER Hong, Gildong <gd@yuldo.com>
```

---

# RUN

* RUN은 FROM에서 설정한 이미지 위에서 스크립트 혹은 명령을 실행

* 여기서 RUN으로 실행한 결과가 새 이미지로 생성되고, 실행 내역은 이미지의 히스토리에 기록

* RUN으로 실행한 결과는 cache되며 다음 빌드 때 재사용 <br> 캐시된 결과를 사용하지 않으려면 docker build 명령에서 --no-cache 옵션을 사용

## 셸(/bin/sh)로 명령 실행하기

```
RUN apt-get install -y nginx
RUN echo "Hello Docker" > /tmp/hello
RUN curl -sSL https://golang.org/dl/go1.3.1 ~ 
RUN git clone https://github.com/~
```

* RUN <명령> 형식이며 셸 스크립트 구문 사용 가능

* FROM으로 설정한 이미지에 포함된 /bin/sh 실행 파일을 사용하게 되며 <br> /bin/sh 실행 파일이 없으면 사용 불가능

<br> 

## 셸 없이 바로 실행

```
RUN ["apt-get", "install", "-y", "nginx"]
RUN ["/user/local/bin/hello", "--help"]
```

* RUN ["<실행 파일>", "<매개 변수1>", "<매개 변수2"] 형식

* FROM으로 설정한 이미지의 /bin/sh 실행 파일을 사용하지 않는 방식


---


# CMD

* CMD는 Dockerfile에서 한 번만 사용 가능

* CMD는 컨테이너가 시작되었을 때 스크립트 혹은 명령을 실행

* 즉 docker run 명령으로 컨테이너를 생성하거나, <br> docker start 명령으로 정지된 컨테이너를 시작할 때 실행

## 셸(/bin/sh)로 명령 실행하기

```
CMD touch /home/hello/hello.txt
```

* CMD <명령> 형식이며 셸 스크립트 구문 사용 가능

* FROM으로 설정한 이미지에 포함된 /bin/sh 실행 파일을 사용하게 되며 <br> /bin/sh 실행 파일이 없으면 사용 불가능

<br> 

## 셸 없이 바로 실행

```
CMD ["redis-server"]
```

## 셸 없이 바로 실행할 때 매개 변수 설정하기

```
CMD ["mysql", "--datadir=/var/lib/mysql", "--user=mysql"]
```

* CMD ["<실행 파일>", "<매개 변수1>", "<매개 변수2>"] 형식

<br>

## ENTRYPOINT를 사용할 때

```
ENTRYPOINT ["echo"]
CMD ["hello"]
```

* CMD ["<매개 변수1>", "<매개 변수2>"] 형식

* ENTRYPOINT에 설정한 명령에 매개 변수를 전달하여 실행

* Dockerfile에 ENTRYPOINT가 있으면 CMD는 ENTRYPOINT에 매개 변수만 전달하는 역할 <br> 그래서 CMD 독자적으로 파일을 실행할 수 없다.



---

# EXPOSE

* EXPOSE는 호스트와 연결할 포트 번호를 설정

```
EXPOSE 80
EXPOSE 443

EXPOSE 80 443
```

* EXPOSE <포트 번호> 형식

* EXPOSE는 호스트와 연결만 할 뿐 외부에 노출 X

* 포트를 외부에 노출하려면 docker run 명령의 -p, -P 옵션을 사용

---

# ENV

* ENV는 환경 변수를 설정

* ENV로 설정한 환경 변수는 RUN, CMD, ENTRYPOINT에 적용

```
ENV GOPATH /go
ENV PATH /go/bin:$PATH
```

* ENV <환경 변수> <값> 형식

* 환경 변수를 사용할 대는 $를 사용

* 다음은 ENV에서 설정한 환경 변수를 CMD로 출력

```
ENV HELLO 1234
CMD echo $HELLO
```

* 환경 변수는 docker run 명령에서도 설정 가능

```
docker run -e HELLO=4321 example
4321 출력 # example 이미지 안에서 출력하는 Code가 있다고 전제
```

---

# ADD

* ADD는 파일을 이미지에 추가

```
ADD hello-dir /hello-dir
ADD hello.zip /
```

* ADD <복사할 파일 경로> <이미지에서 파일이 위치할 경로> 형식

    - <복사할 파일 경로>는 컨텍스트 아래를 기준으로 하며 컨텍스트 바깥의 파일, 디렉터리나 절대 경로는 사용 X
        - ADD ../hello.txt /home/hello (x)
        - ADD /home/hello/hello.txt /home/hello (x) --> 시작이 / 로 하면 X

    - <복사할 파일 경로>는 파일뿐만 아니라 디렉터리도 설정 가능하며 또한, 와일드카드를 사용하여 특정 파일만 복사 가능
        - ADD *.txt /root
    
    - <복사할 파일 경로>에 인터넷이 있는 파일의 URL 설정 가능
        - <이미지에서 파일이 위치할 경로>의 마지막에 /가 있으면 디렉터리가 생성되고 파일은 그아래에 복사

    - <이미지에서 파일이 위치할 경로>는 항상 절대 경로로 설정 
        - 마지막이 /로 끝나면 디렉터리가 생성되고 파일은 그 아래에 복사

    - ADD ./ /hello와 같이 현재 디렉터리를 추가할 때 .dockerignore 파일에 설정한 파일과 디렉터리는 제외

---

# COPY

* COPY는 파일을 이미지에 추가

* ADD와 달리 COPY는 압축 파일을 추가할 때 압축을 해제하지 않고, 파일 URL도 사용 가능

```
COPY hello-dir / hello-dir
COPY *.txt /root/
```

* COPY <복사할 파일 경로> < 이미지에서 파일이 위치할 경로> 형식

    - <복사할 파일 경로>는 컨텍스트 아래를 기준으로 하며 컨텍스트 바깥의 파일, 디렉터리나 절대 경로는 사용 X

    - <복사할 파일 경로>는 파일뿐만 아니라 디렉터리도 설정 가능하며 또한, 와일드카드를 사용하여 특정 파일만 복사 가능

    - <이미지에서 파일이 위치할 경로>는 항상 절대 경로로 설정 
        - 마지막이 /로 끝나면 디렉터리가 생성되고 파일은 그 아래에 복사    
        
    - COPY ./ /hello와 같이 현재 디렉터리를 추가할 때 .dockerignore 파일에 설정한 파일과 디렉터리는 제외

---

# VOLUME

* VOLUME은 디렉터리의 내용을 컨테이너에 저장하지 않고 호스트에 저장

```
VOLUME /data
VOLUME ["/data", "/var/log/hello"]
```

* VOLUME <컨테이너 디렉터리> or VOLUME ["컨테이너 디렉터리 1", "컨테이너 디렉터리 2"] 형식

* VOLUME으로는 호스트의 특정 디렉터리와 연결 X

* 호스트의 특정 디렉터리와 연결하려면 docker run -v 옵션 사용 
    - -v <호스트 디렉터리> : <컨테이너 디렉터리> 형식


---

# WORKDIR

* WORKDIR는 RUN, CMD, ENTRYPOINT의 명령이 실행될 디렉터리를 설정

```
WORKDIR /var/www
```

* WORKDIR <경로> 형식

```
WORKDIR /root
RUN touch hello.txt

WORKDIR /tmp
RUN touch hello.txt
```

* WORKDIR은 절대 경로 대신 상대 경로 사용 가능

* 상대 경로를 사용하면 먼저 설정한 WORKDIR의 경로를 기준으로 디렉터리를 변경

* 최조 기준은 / 이다.

```
WORKDIR var
WORKDIR www

RUN touch hello.txt
```

* 상대 경로를 사용하여 /에서 var로 이동 후 <br> www로 이동했기 때문에 /var/www/hello.txt에 파일이 생성