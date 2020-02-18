---
layout: post
title:  " [Clean Code] 형식 맞추기(Format Match) "
categories: CleanCode
tags: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 신문 기사처럼 작성하라

* 신문 기사를 떠올려보자.

* 독자는 위에서 아래로 기사를 읽는다.

* 최상단에 기사를 몇 마디로 요약하는 표제가 나온다.

* 독자는 표제를 보고서 기사를 읽을지 말지 정한다.

* 첫 문단은 전체 기사 내용을 요약한다.

* 세세한 사실은 숨기고 커다란 그림을 보여준다.

* 쭉 읽으며 내려가면 세세한 사실이 조금씩 나온다.

<br>









* 소스 파일도 신문 기사와 비슷하게 작성한다.

* 이름만 보고도 올바른 모듈을 살펴보고 있는지 판단할 정도로 신셩 써서 짓는다.

* 소스 파일 첫 부분은 고차원 개념을 설명한다.

* 아래로 내려갈수록 의도를 세세하게 묘사하고

* 마지막에는 가장 저차원 함수와 세부 내역이 나온다.


## 개념은 빈 행으로 분리

* 일련의 행 묶음은 완결된 생각 하나를 표현한다.

* 생각 사이는 빈 행을 넣어 분리해야 마땅하다.

* 빈 행은 새로운 개념을 시작한다는 **시간적 단서**다.

* 코드를 읽어 내려가다 보면 빈 행 바로 다음 줄에 눈길이 멈춘다.

> 행 분리 X

``` java
package fitnesse.wikitext.widgets;
import java.util.regex.*;
public class BoldWidget extends ParentWidget {
    public static final String REGEXP = "'''.+?'''";
    private static final Pattern pattern = Pattern.compile("'''(.+?)'''",
        Pattern.MULTILINE + Pattern.DOTALL);
    public BoldWidget(ParentWidget parent, String text) throws Exception {
        super(parent);
        Matcher match = pattern.matcher(text);
        match.find();
        addChildWidgets(match.group(1));}
    public String render() throws Exception {
        StringBuffer html = new StringBuffer("<b>");
        html.append(childHtml()).append("</b>");
        return html.toString();
    }
}
```

> 행 분리 

``` java
package fitnesse.wikitext.widgets;

import java.util.regex.*;

public class BoldWidget extends ParentWidget {
    public static final String REGEXP = "'''.+?'''";
    private static final Pattern pattern = Pattern.compile("'''(.+?)'''",
        Pattern.MULTILINE + Pattern.DOTALL
    );

    public BoldWidget(ParentWidget parent, String text) throws Exception {
        super(parent);
        Matcher match = pattern.matcher(text);
        match.find();
        addChildWidgets(match.group(1));
    }

    public String render() throws Exception {
        StringBuffer html = new StringBuffer("<b>");
        html.append(childHtml()).append("</b>");
        return html.toString();
    }
}
```






## 세로 밀집도

* 줄바꿈이 개념을 분리한다면 

* 세로 밀집도는 **연관성**을 의미한다.

* 즉 서로 밀접한 코드 행은 세로로 가까이 놓여야 한다.

> Wrong Case

``` java
public class ReporterConfig {
	/**
	* The class name of the reporter listener 
	*/
	private String m_className;
	
	/**
	* The properties of the reporter listener 
	*/
	private List<Property> m_properties = new ArrayList<Property>();
	public void addProperty(Property property) { 
		m_properties.add(property);
	}
}
```

> Best Case

``` java
public class ReporterConfig {
	private String m_className;
	private List<Property> m_properties = new ArrayList<Property>();
	
	public void addProperty(Property property) { 
		m_properties.add(property);
	}
}
```

* 후자 방법이 변수 2개에 메서드가 1개인 클래스라는 사실을 명확하게 나타낸다.

---

## 참고

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)