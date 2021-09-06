---
layout: post
title:  " Spring Security 환경에서 Password를 암호화(Encrypt)해보자. "
categories: SpringBoot
author: goodGid
---
* content
{:toc}

## Goal

> [PasswordEncoder](https://docs.spring.io/spring-security/site/docs/4.2.4.RELEASE/apidocs/org/springframework/security/crypto/password/PasswordEncoder.html)

``` java
package org.springframework.security.crypto.password;

public interface PasswordEncoder {
  String encode(CharSequence rawPassword);
  boolean matches(CharSequence rawPassword, String encodedPassword);
  default boolean upgradeEncoding(String encodedPassword) {
    return false;
  }
}
```

* SpringSecurity에서 제공하는 PasswordEncoder를 사용하여 Password를 암호화(Encrypt)해보자.

  



---

## Code

### build.gradle

``` 
implementation 'org.projectlombok:lombok:1.18.20'
implementation 'org.springframework.boot:spring-boot-starter-security' // [1]
implementation 'org.springframework.boot:spring-boot-starter-web'      // [1]
testImplementation 'org.springframework.boot:spring-boot-starter-test' // [2]
testImplementation 'org.springframework.security:spring-security-test' // [2]
```

* [1] : SpringBoot + SpringSecurity 환경을 위한 Dependency를 추가한다.

* [2] : SpringBoot + SpringSecurity 환경에서 TestCode 작성을 위해 Dependency를 추가한다.







### Config

``` java
@Configuration
@EnableWebSecurity // [1]
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder(); // [2]
    }
}
```

* [1] : SpringSecurity를 기능을 사용하기 위해 어노테이션을 선언해준다.

* [2] : PasswordEncoder는 Interface이므로 구현체로 **BCryptPasswordEncoder**를 사용한다.

  구현체에 대한 개념은 [[SpringSecurity] PasswordEncoder](https://velog.io/@hyeinisfree/SpringSecurity-PasswordEncoder) 글을 참고하자.


### Controller

``` java
@RestController
@RequestMapping("/security")
public class SecurityController {

    @Autowired
    private PasswordEncoder passwordEncoder; // [1]

    @GetMapping("/encrypt_pw")
    public String securityPassword(@RequestParam("pw") String pw) {
        return passwordEncoder.encode(pw);
    }

}
```

* [1] : passwordEncoder를 사용하여 암호화를 진행한다.


### Controller TestCode

``` java
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

/**
 * ## Reference
 * - [1]. https://goodgid.github.io/Spring-Test-SpringBootTest-Annotation
 * - [2]. https://youngjinmo.github.io/2021/05/passwordencoder/
 * - [3]. https://velog.io/@hyeinisfree/SpringSecurity-PasswordEncoder
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.MOCK) // [1]
@AutoConfigureMockMvc // [1]
class SecurityControllerTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("패스워드 암호화 테스트")
    @WithMockUser(roles = "USER, ADMIN") // Spring Security 때문에 권한을 부여해줘야 테스트를 성공한다.
    void securityPasswordTest() throws Exception {
        // given
        String rawPassword = "12345678";
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("pw", rawPassword);

        // when
        ResultActions result = mockMvc.perform(get("/security/encrypt_pw")
                                                       .params(map));
        String contentAsString = result.andReturn().getResponse().getContentAsString();

        // then
        assertAll(
                () -> assertNotEquals(rawPassword, contentAsString),
                () -> assertTrue(passwordEncoder.matches(rawPassword, contentAsString))
        );
    }
}
```

* [1] : "[SpringBoot 테스트 : @SpringBootTest - 통합 테스트하다.](https://goodgid.github.io/Spring-Test-SpringBootTest-Annotation/)" 글을 참고하자.


---

## Summary

* PlainText를 암호화하는 코드와 
  
  TestCode를 통해 정상적으로 암호화가 이뤄지는지까지 확인해봤다.

* 이와 관련된 모든 코드는 [Github](https://github.com/goodGid/SpringSecurity-With-EncryptedPassword)을 참고하자.


---

## Reference

* [Github :: goodGid/SpringSecurity-With-EncryptedPassword](https://github.com/goodGid/SpringSecurity-With-EncryptedPassword)