---
layout: post
title:  " DU(Disk Usage) 명령어를 아시나요? "
categories: Tech
author: goodGid
use_math: true
---
* content
{:toc}

## DU(Disk Usage)

* du -hs 명령어는 Linux 또는 macOS 등의 유닉스 계열 운영체제에서 

  디스크 사용량(Disk Usage)을 확인할 때 사용하는 명령어이다. 
  
### 옵션

| 옵션                  | 설명                                                  |
| ------------------- | ---------------------------------------------------   |
| `-h`                | **Human-readable**: 용량을 KB, MB, GB 등으로 보기 쉽게 표시  |
| `-s`                | **Summarize**: 지정한 경로의 총합만 출력하고, 하위 항목은 생략   |
| `-a`                | **All files**: 디렉토리뿐 아니라 파일들도 각각의 크기 노출       |
| `-c`                | **Total**: 모든 출력의 합계를 마지막에 출력                    |
| `-k`                | 용량을 KB 단위로 표시 (기본 단위는 블록 수)                      |
| `-m`                | 용량을 MB 단위로 표시                                    |
| `--time`            | 각 항목의 마지막 수정 시간을 함께 출력                           |
| `--exclude=PATTERN` | 특정 패턴을 제외 (ex: `--exclude="*.log"`)                |


---

### Example

> du -hs, du -hsc

![](/assets/img/tech/Tech-Command-DU-Disk-Usage_1.png)

> du -hs *, du -hsc *

![](/assets/img/tech/Tech-Command-DU-Disk-Usage_2.png)

---

## Summary

* 서버를 관리한다면 유용하게 사용할 수 있는 du 명령어 꼭 기억하자.