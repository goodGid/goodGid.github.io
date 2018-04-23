---
layout: post
title:  " 파일 저장 장치 [ Part 1 ] "
date:   2018-04-14
excerpt: " 파일 저장 장치 [1] "
cate : "posts"
tag:
- File Processing
---

# 파일 저장 장치의 특성 (1)

* 저장 매체 (Storage Medium)
    - 데이터를 저장하는 물리적 재료
    - 소멸성(volatile) vs 비소멸성(nonvolatile)

* 접근 장치 (Access Mechanism)
    - 데이터를 판독 or 기록하는 장치

* 저장 장치 (Storage Device)
    - 저장 매체 vs 접근 장치


---

# 파일 저장 장치의 특성 (2)

* 1차 저장 장치 (Primary Storage) : 모두 소멸성
    - 메인 메모리 (Main memory)
        - 프로그램/데이터 처리 위한 작업 공간
    <br>

    - 캐시 메모리 (Cache memory)
        - 메인 메모리의 성능 향상 목적
        - 메인 메모리보다 Fast, CPU 성능 향상을 위해 사용


* 2차 저장 장치 (Secondary Storage) : 디스크, 테이프를 일컬음
    - 자기 디스크 (Magnetic Dist)
        - 용량이 Large, Cheap --> 주로 파일 저장에 쓰임
        - 저장된 데이터는 메인 메모리를 거쳐 CPU에 의해서 처리
    <br>
    
    - 광 디스크(Optical dist), 자기 테이프(Magnetic tape)
    

---


# 저장 장치의 계층 (1) : 1차 저장 장치

* 캐시 메모리 (Cache Memory)
    - 가장 빠르고 가장 비싼 저장장치로 용량은 아주 작음 <br> Fast, Expensive, Small Storage
    - SRAM(Static Random Access Memory)
    - CPU 성능 향상을 위해 사용
    - `소멸성` : 데이터 저장에는 부적합

* 메인 메모리 (Main Memory)
    - 프로그램 실행과 이에 필요한 데이터 유지 공간
    - DRAM(Dynamic Random Access Memory)
    - SRAM에 비해 속도는 느리지만 값이 저렴
    - `소멸성` : 데이터 저장에는 부적합

---

# 저장 장치의 계층 (2) : 1차, 2차 저장 장치의 중간 느낌

* 플래시 메모리 (Flash Memory)
    - 전기적으로 데이터를 지우고 다시 기록할 수 잇는 `비휘발성` 컴퓨터 기억 장치

---

# 저장 장치의 계층 (3) : 2차 저장 장치

* 자기 디스크 (Magnetic Disk)
    - 데이터 저장 장치의 `주 매체`
    - 데이터 `처리`와 `기록`은 `메인 메모리`를 거쳐야 함
    - 고용량, 비소멸성, 저비용



