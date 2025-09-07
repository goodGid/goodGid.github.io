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

## 6 - Persistent Project Knowledge

* 만약 Cursor를 오늘 사용 종료 후

  내일 다시 Cursor를 실행시킨다면 어떻게 될까?

* AI한테 “우리 프로젝트 API 경로는 /api/v1으로 통일”이라고 알려준다.

  => 오늘 대화에서는 AI가 계속 그 규칙을 기억한다.

  => 세션을 종료한다. (= Cursor 닫는다.)

  => 내일 다시 Cursor를 켜서 “새 API 작성해 줘”라고 하면 보통 AI는 /api/v1 규칙을 모른다.
  
  (= 세션 간 맥락 손실 발생)

* 세션 간에 AI 모델이 맥락을 잃는다는 한계를 극복하기 위해

  (세션 간 = 첫 번째 세션이 끝나고 두 번째 세션이 시작되는 그 사이)

  Cursor는 프로젝트 지식을 지속적으로 유지하기 위해 **Rules**과 **Memories** 기능을 사용한다.
  
  이를 통해 AI는 프로젝트에 대한 장기적인 이해를 유지하고 특정 지침을 준수할 수 있게 된다.

---

### Rule

* 프로젝트의 **AI 사용 설명서**

* Rule은 개발자가 직접 작성하는

  AI가 코드를 작성하거나 수정할 때 반드시 따라야 할 일종의 매뉴얼이다.

* 마크다운 파일로 작성되며 

  프로젝트의 *.cursor/rules* 위치에 파일을 생성한다.

  또한 프로젝트별 또는 사용자별로 설정할 수 있다.

* Rule을 정의함으로써

  AI는 매번 같은 스타일과 아키텍처를 지킬 수 있어

  팀 차원에서 일관성 있는 코드 품질을 유지할 수 있다.

> Example

* 코딩 스타일 강제

  ex) 들여쓰기 2칸, 변수명 스네이크 케이스

* 아키텍처 규칙 유지

  ex) 서비스 레이어에서만 DB 접근

---

### Memory

* Memory는 Cursor 1.0 베타부터 도입된 기능으로 

  AI가 이전 채팅 세션의 중요한 정보와 결정을 기억할 수 있게 한다.

* 동작 방식으로는

  **사이드카 모델**이 대화를 실시간 분석하여

  중요한 정보(결정, 요구사항, 규칙 등)를 Potential Memories로 제안한다.

* 개발자는 해당 제안을 승인하면 

  해당 정보가 저장되고 이후 세션에서 AI가 이 기억을 활용한다.

* 즉 개발자가 한 세션에서 까다로운 기능이나 디자인 선택 사항을 설명하더라도
  
  AI는 나중에 해당 맥락을 다시 떠올려 중복 설명을 피하고
  
  마치 시간이 지남에 따라 프로젝트의 세부 사항을 알고 있는 것처럼 행동할 수 있다.

> Example

* 프로젝트의 주요 기술 스택 (React + Node.js + PostgreSQL)

1. API 응답 형식

2. 코드 네이밍 규칙

---

### Rule vs Memory

> Q. Rule을 정의해두면 Memory는 굳이 필요 없는 거 아니야?

* 얼핏 보면 Rule만으로도 충분해 보일 수 있지만 

  실제로는 Rule과 메모리는 목적과 적용 범위가 달라서 서로 보완 관계에 있다.

**Rule만으로는 부족한 이유**

* Rule은 명시적으로 작성한 지침만 따른다.

  ex) *.cursor/rules*에 "API 경로는 /api/v1”라고 적어놨다면 AI가 해당 규칙을 지킨다.

* 하지만 즉흥적인 대화에서 나온 정보나 결정은 Rule 파일에 없으면 다음 세션에서 잊어버린다.

  ex) 이번 로그인 페이지는 다크모드 기본 적용 => 규칙에 없으면 세션이 끝나면 사라진다.

**Memory가 필요한 이유**

* Memory는 Rule처럼 미리 작성할 필요가 없고

  대화 중에 발생하는 중요한 결정이나 맥락을 자동으로 분석하여 

  Rule처럼 파일에 따로 쓰지 않아도 유지될 수 있게 돕는다.

  ex) 대화 중 “회원가입 API는 POST만 허용” 
  
  => 사이드카 모델이 메모리 제안 
  
  => 개발자가 승
  
  => 다음 세션에서도 이 규칙을 자동 반영

**Summary**

```
- Rule => 장기적/반복적인 지침 사항 (ex. 스타일, 아키텍처, 공통 규칙)
- Memory => 세션 중 나온 즉흥적이지만 중요한 정보 (ex. 이번 기능의 특이 사항, 특정 API 세부 설정)
```

![](/assets/img/tech/How-Cursor-Serves-Billions-of-AI-Code-Completions-Every-Day_4.png)

---

## 7 - Codebase Indexing and Semantic Search

* 대규모 프로젝트를 효과적으로 지원하기 위해 

  Cursor는 백그라운드에서 코드베이스 인덱싱을 수행하여 
  
  AI가 전체 코드베이스를 이해하고 질문에 답할 수 있도록 한다.

### Initial Indexing

* 프로젝트를 열면 Cursor는 파일을 분석하여 더 작은 chunk(ex. function)로 분할한다.

  이러한 chunk는 로컬에서 암호화되어 
  
  난독화된 파일 식별자(파일 이름도 일반 텍스트로 전송되지 않음)와 함께 Cursor 서버로 전송된다.
  
* 서버는 AI 모델(ex. OpenAI's embedding model)을 사용하여

  각 chunk를 복호화하고 필요한 계산 후 데이터를 즉시 삭제한다. 

  즉 서버에는 사람이 읽을 수 있는 코드가 영구적으로 저장되지 않는다.

### Semantic Search

* 개발자가 질문하면

  Cursor는 쿼리를 벡터로 변환하고

  저장된 임베딩에 대해 벡터 유사성 검색을 수행한다.
  
* 이 검색은 서버가 실제 코드를 먼저 확인하지 않고도 

  정확한 키워드가 아닌 의미를 기반으로 관련 코드 섹션을 찾는다.


### Fetching Relevant Code

* 질문에 답변하기 위해 실제 코드 내용이 필요한 경우 

  서버는 Cursor 클라이언트에 해당 chunk를 요청한다.
  
* 그런 다음 클라이언트는 암호화된 상태로 해당 소스 코드를 전송하고 

  이러한 설계는 일반적으로 단방향이므로

  원본 코드를 재구성할 수 없으므로 개인 정보 보호를 우선시하며

  서버는 해당 코드를 복호화한 후 즉시 삭제한다.
  
* Cursor는 또한 .gitignore 및 전용 .cursorignore 파일을 준수하여 

  민감한 파일의 인덱싱을 방지하고 
  
  chunk를 전송하기 전에 Heuristically 방식으로 비밀 정보를 검색한다.

### Index Synchronization

* 개발자가 코드 편집 시 인덱스를 최신 상태로 유지하기 위해 

  Cursor는 Merkle Tree Synchronization Mechanism을 사용한다. 
  
* Merkle Tree는 해시 기반 데이터 구조로 

  대규모 데이터 세트의 변경 사항을 효율적으로 감지할 수 있다. 
  
* 클라이언트는 프로젝트 파일의 Merkle Tree를 계산하고 

  서버는 자체적으로 Merkle Tree를 관리한다. 
  
* Cursor는 몇 분마다 이러한 트리를 비교하여 

  어떤 파일이 수정되었는지 정확히 파악하고 
  
  변경된 부분만 다시 인덱싱하여 대역폭과 지연 시간을 최소화한다.

![](/assets/img/tech/How-Cursor-Serves-Billions-of-AI-Code-Completions-Every-Day_5.png)

---

## Summary

* Visual Studio Code를 fork하여 

  Cursor는 개발자에게 안정적이고 직관적인 인터페이스를 제공하는 동시에 
  
  심층적인 AI 통합에 신속하게 집중할 수 있도록 지원한다.

* Cursor의 아키텍처는 속도나 개인정보 보호에 영향을 주지 않으면서 

  지능형 지원을 제공하도록 설계되었다.
  
* 실시간 AI 코드 자동 완성과 같은 많은 기능은 

  **클라우드 서버**에서 실행되는 자체 모델을 기반으로 하며 
  
  **암호화**된 코드 조각만 전송하여 낮은 지연 시간과 데이터 보안을 보장한다.

* 매일 수십억 건의 AI 완료를 처리하는 이 정교한 클라우드 기반 시스템은 

  모든 워크플로에 AI를 심층적으로 내장하고 
  
  개발자 생산성을 높이며 코드 작성 및 관리 방식을 혁신함으로써 새로운 코딩 경험을 제공한다.

---

## Reference

* [How Cursor Serves Billions of AI Code Completions Every Day](https://blog.bytebytego.com/p/how-cursor-serves-billions-of-ai)
