---
layout: post
title:  " Cursor가 매일 수십억 건의 AI 코드 완성을 처리하는 방식 "
categories: Tech
author: goodGid
use_math: true
---
* content
{:toc}

## Prologue

* Cursor의 지능은 OpenAI의 GPT-4 변형과 Anthropic의 Claude를 포함한 

  최첨단 대규모 언어 모델과 자체적으로 미세 조정된 모델을 활용하여 구현된다.

* Cursor의 백엔드는 엄청난 규모로 설계되어 

  최대 초당 100만 건 이상의 트랜잭션을 처리하고 
  
  매일 수십억 건의 AI 코드 완성을 처리하여 반응성과 원활한 경험을 보장한다.

* 이 글에서는 Cursor의 주요 기능, 각 기능의 작동 방식

  그리고 이를 구동하는 인프라 스택에 대해 살펴본다.


---

## 1 - AI Code Autocomplete

* Cursor의 중요한 기능 중 하나는 AI 기반 코드 완성으로 

  사용자가 코드를 입력할 때 코드를 제안하여 코딩 속도를 크게 높여준다.
  
  이 기능은 한 줄 단위의 코드 입력을 넘어 
  
  리팩토링 및 여러 파일 편집 시 더욱 스마트한 제안을 제공한다.

  특히 Cursor의 자동 완성 기능은 핵심적인 기능이다.

* Cursor의 작동 방식은 개발자가 코드를 입력하면
  
  Cursor 클라이언트(개발자 컴퓨터의 편집기)는 
  
  현재 코드 컨텍스트의 **작은 스니펫**을 수집한 다음 
  
  로컬에서 **암호화**하여 네트워크를 통해 Cursor의 클라우드 서버로 전송한다.

* 서버에서 스니펫은 안전하게 **복호화**되고 

  Cursor의 자체 코드인 **LLM(Large Language Model)**이 응답을 신속하게 생성하고

  그 응답은 클라이언트로 반환되어 인라인으로 표시됩니다.

![](/assets/img/tech/How-Cursor-Serves-Billions-of-AI-Code-Completions-Every-Day_1.png)

* 이 전체 프로세스는 사용자에게 즉각적으로 느껴지도록 

  1초 미만의 매우 짧은 지연 시간을 제공하도록 설계되었다. 
  
* 여기서 중요한 점은

  사용자의 개인 정보 보호를 최우선으로 다루므로

  암호화된 코드는 즉시 사용된 후 폐기된다.
  
  즉 Cursor 자동 완성 요청의 코드를 영구적으로 저장하지 않는다 

* Cursor는 초당 100만 건 이상의 쿼리(QPS)를 처리하는데

  이는 주로 이러한 작은 자동완성 요청 때문이다.


---

## Reference

* [How Cursor Serves Billions of AI Code Completions Every Day](https://blog.bytebytego.com/p/how-cursor-serves-billions-of-ai)
