---
layout: post
title:  " [Java] 특정 문자열 Crawling 하기 "
categories: Crawling
author: goodGid
---
* content
{:toc}

## Goal

1. "http://"로 시작하는 URL을 Crawlling 한다.

2. 그 중 유효한 URL만 파일로 생성한다.





---

## Code

``` java 
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class Main {

    public static void main(String[] args) {
        /*
        * Doument란? 읽어온 문서 전체
        * Element란? <body></body> 이 태그 하나
        * Attribure란? <a bref=""></a> 여기서 " "안에 있는 속성
        */

        ArrayList<String> arr = new ArrayList<>();
        Document doc = null;

        // [ Start of Sector 1 ] 
        try {
            doc = Jsoup.connect("http://sopt.org/wp/").post();
        } catch (IOException e) {
            e.printStackTrace();
        }

        Elements elm = doc.getAllElements();
        for(Element element : elm) {
            Attributes attrs = element.attributes();

            for(Attribute attr : attrs) {
                if(attr.getValue().startsWith("http://")) {
                    arr.add(attr.getValue());
                }
            }
        }
        // [ End of Secotr 1 ]

        // [ Start of Secotr 2 ]
        Integer cnt = 0;
        for(String url : arr){
            try {
                System.out.println("URL :: " + url);
                Document doc2 = null;
                try {
                    doc2 = Jsoup.connect(url).get();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                Elements elements2 = doc2.getAllElements();
                for (Element element : elements2) {
                    Attributes attrs = element.attributes();
                    for (Attribute attr : attrs) {
                        if (attr.getValue().startsWith("http://")) {
                            System.out.println(attr.getValue());
                        }
                    }
                }
                PrintWriter pw = new PrintWriter(new File(String.valueOf(cnt)));
                pw.println(doc.toString());
                pw.flush();
                pw.close();
                cnt++;
            }
            catch (Exception e){
                System.out.println("ERROR URL :: " + url);
            }
        }
        // [ End of Secotr 2 ]
    }
}
```

---

## Review

* [Sector 1]은 

  "http://sopt.org/wp/" 사이트에서 
  
  "http://"로 시작하는 모든 값을 구한다.

* [Sector 2]에서는 

  [Sector 1]에서 구한 값 중 유효한 URL들만 파일로 생성한다.



---

## Output

![](/assets/img/posts/crawling_string_1.png)

* 정상 URL 수 만큼 파일이 생성된다.