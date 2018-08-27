---
layout: post
title:  " 구조체  "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}


구조체는 기본적으로 `저장소`에 배치된다.

사용자가 만든

구조체로 구조체의 `배열`을 만들 수 있으며,

구조체를 `값`으로 갖는 `맵핑`을 만들 수 있다.

하지만

구조체가 `키`인 `맵핑`은 만들 수 없다.


``` js

pragma solidity ^0.4.11;

contract Example4 {
    struct personalInfo {
        uint32 birthday; 
        bool isMale;
    }

    struct student {
        uint8[2] scores; 
        uint8 team;
        personalInfo pi;
    } 

    mapping (address => student) students;
    student example = student([92, 97], 3, personalInfo(20170101, true));

    function getWholeInfo() returns (student){
        return students[msg.sender];
    } 

    function getTotalScore() returns (uint8, uint8){
        return (students[msg.sender].scores[0], students[msg.sender].scores[1]);
    } 

    function joinTeam(uint8 input) {
        students[msg.sender].team = input;
    }

    function setPI(personalInfo input) {
        students[msg.sender].pi = input;
    }

    function setBirthday(uint32 input) {        ## [1]
        student local = students[msg.sender];
        local.pi.birthday = input;
    }
}

```


[1]을 보면 지역 변수로 구조체의 대입은

사본 없이 원본 구조체를 참조하므로,

구조체인 지역 변수의 데이터를 수정하면

원본 구조체의 데이터도 같이 수정된다.



