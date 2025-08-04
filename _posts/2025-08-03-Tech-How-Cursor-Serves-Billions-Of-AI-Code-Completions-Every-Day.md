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

## 2 - AI Chat Assistant

* Cursor는 코드 제안 외에도 IDE 내의 전용 채팅 패널을 통해

  강력한 **AI 채팅 도우미(AI Chat Assistant)** 기능을 제공한다.

* Cursor는 각 파일에 어떤 코드가 있고

  클래스나 함수들이 어떤 관계를 맺고 있는지 미리 정리해 두기 위해

  프로젝트에 있는 모든 코드 파일을 스캔하고 분석하여 인덱스(Index) 작업을 해둔다.

* 그 결과 Cursor AI는 전체 프로젝트 구조와 내용을 파악하고 있으므로
  
  단순한 한 파일 수정이 아닌 여러 파일에 걸친 복잡한 작업도 수행할 수 있다.

---

## 3 - Inline Edit Mode

* 빠르고 집중적인 변경을 위해 Cursor는 인라인 편집 모드를 제공한다.

* 개발자는 편집기에서 코드 블록을 선택하고 명령을 내리기만 하면 

  Cursor AI가 선택한 영역에 요청된 변경 사항을 직접 적용한다.

![](/assets/img/tech/How-Cursor-Serves-Billions-of-AI-Code-Completions-Every-Day_2.png)

---

## 4 - AI Code Review with Bugbot

* Cursor 1.0은 GitHub 풀 리퀘스트(PR)를 위해 

  특별히 설계된 AI 기반 코드 검토 도우미인 BugBot을 선보였다.

  BugBot을 설정하려면 GitHub 앱 설치를 통해 Cursor를 GitHub 저장소에 연결해야 한다.

* BugBot은 Cursor와 동일한 강력한 AI 모델을 사용하여 코드 변경 사항을 자동으로 분석한다.

  PR을 검토하여 잠재적 버그, 오류 또는 스타일 문제를 파악하고 
  
  그런 다음 자세한 설명과 제안된 수정 사항을 PR에 직접 댓글로 남긴다.

* BugBot은 자동 모드(모든 PR 업데이트 시 재실행)로 작동하거나

  PR에 "bugbot run"이라는 댓글을 달아 수동으로 실행할 수도 있다.
  
  각 댓글에는 편리한 "Cursor에서 수정" 링크가 포함되어 있어 개발자는 관련 컨텍스트가 로드된 Cursor 편집기로 바로 이동하여 제안된 수정 사항을 즉시 적용하여 반복 루프를 단축할 수 있습니다.

---

## 5 - Background Agents

* Background Agents는 

  복잡하거나 시간이 오래 걸리는 코딩 작업을 

  백그라운드에서 자동으로 처리해 주는 도우미 역할을 한다.

* 로컬에서 코딩하고 있을 때
  
  백그라운드에서 동시에 다른 작업을 처리해 주는

  AI 페어 프로그래머라고 생각하면 된다.

* Background Agents는 광범위한 요구 사항과

  로컬 컴퓨터에 부담을 줄 수 있는 무거운 작업을 처리하기 위해

  일반적으로 Cursor의 고급 "Max" 모델을 활용한다.

* Cursor의 클라우드 환경(AWS)에 설치된 Ubuntu VM에서 작업을 수행한다.

* 우리의 컴퓨터가 아닌 완전히 격리된 안전한 공간에서 실행되므로
  
  실수로 뭔가 잘못되더라도 내 로컬 환경에는 영향을 주지 않는

  일종의 **샌드박스(안전한 실험 공간)**에서 작업한다고 보면 된다.

![](/assets/img/tech/How-Cursor-Serves-Billions-of-AI-Code-Completions-Every-Day_3.png)

---

## 6 - Persistent Project Knowledge: Rules and Memories




![](/assets/img/tech/How-Cursor-Serves-Billions-of-AI-Code-Completions-Every-Day_4.png)

---

## Reference

* [How Cursor Serves Billions of AI Code Completions Every Day](https://blog.bytebytego.com/p/how-cursor-serves-billions-of-ai)
