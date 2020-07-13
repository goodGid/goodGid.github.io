---
layout: post
title:  " SpringBoot 테스트 : OutputCaptureRule - 출력되는 Log까지 테스트가 가능하다. "
categories: Spring
author: goodGid
---
* content
{:toc}

## Prologue

* SpringBoot 환경에서 **출력되는 Log**도 테스트가 가능하다.



---


## Code

### Controller

``` java
@Slf4j
@RestController
public class GoodGidController {

    @GetMapping("/")
    public String goodGid(){
        log.info("Slf4j");
        System.out.println("System Out");
        return "Heelo goodGid";
    }
}
```




---

### OutputCaptureRule

* OutputCaptureRule 클래스를 사용하면

  출력되는 Log에 대해 테스트가 가능하다.

  사용법은 굉장히 간단하다.


``` java
@RunWith(SpringRunner.class)
@WebMvcTest(GoodGidController.class)
public class GoodGidControllerTest_OutputCaptureRule {

    @Rule
    public OutputCaptureRule outputCaptureRule = new OutputCaptureRule();

    @Autowired
    MockMvc mockMvc;

    @Test
    public void goodGid() throws Exception {
  
        mockMvc.perform(get("/"))
               .andExpect(status().isOk())
               .andExpect(content().string("Hello goodGid"));

        assertThat(outputCaptureRule.toString().contains("Slf4j"));
        assertThat(outputCaptureRule.toString().contains("System Out"));
    }
}
```


---

## Summary

* OutputCaptureRule의 사용법은 굉장히 단순하다.

  하지만 출력되는 Log까지 테스트할 수 있다는 점은 굉장히 **강력한 기능**이라 생각한다.

  테스트 코드를 작성할 때 유용하게 활용해보자 !


---

## Reference

* [스프링 부트 개념과 활용 : 4부 스프링 부트 활용 - 테스트 유틸](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)