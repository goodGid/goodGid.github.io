---
layout: post
title:  " MyBatis 공식 문서(Docs) 읽어보기 : typeAliases "
categories: MyBatis
author: goodGid
---
* content
{:toc}

## Prologue

* MyBatis에서 제공하는 공식 문서(Docs)를 참고하여

  [Configuration XML - typeAliases](https://mybatis.org/mybatis-3/configuration.html#typeAliases)개념에 대해 학습해보자.





---


## typeAliases

```
A type alias is simply a shorter name for a Java type. 
It's only relevant to the XML configuration 
and simply exists to reduce redundant typing of fully qualified classnames. 
```

* typeAliases는 Java 타입을 위한 short name을 지정할 수 있다.

  그리고 XML 설정에서만 사용할 수 있고

  [FQCN]({{site.url}}/Java-Class-Loader/#로딩-loading) 입력하지 않아도 되기 때문에 불필요한 중복을 줄일 수 있다.

---

> Example

``` xml
<typeAliases>
  <typeAlias alias="Author" type="domain.blog.Author"/>
  <typeAlias alias="Blog" type="domain.blog.Blog"/>
  <typeAlias alias="Comment" type="domain.blog.Comment"/>
  <typeAlias alias="Post" type="domain.blog.Post"/>
  <typeAlias alias="Section" type="domain.blog.Section"/>
  <typeAlias alias="Tag" type="domain.blog.Tag"/>
</typeAliases>
```

* 위와 같이 선언을 하면
  
  **domain.blog.Blog**를 사용하려는 곳에서 간단하게 **Blog**만 사용해도 된다.

---

```
You can also specify a package where MyBatis will search for beans. 
Each bean found in domain.blog, 
if no annotation is found, will be registered as an alias using uncapitalized non-qualified class name of the bean. 
That is domain.blog.Author will be registered as author. 
If the @Alias annotation is found its value will be used as an alias. 
```
* 또는 package 명을 명시하여 

  MyBatis가 해당 package에서 Bean을 찾을 수 있게 할 수 있다.

* 만약 해당 package에서 Bean을 찾을 때 

  명시된 @Alias annotation이 없다면 
  
  Bean의 package 정보를 제거하고 남은 마지막 키워드를 alias로 등록한다.

  예를 들면 *domain.blog.Author* 는 *author* 로 등록이 되어

  *author* 키워드가 *domain.blog.Author* 를 가리키게 된다.

<br>

> XML 방법

``` xml
<typeAliases>
  <package name="goodgid.model"/>
</typeAliases>
```

<br>

> Java 방법

``` java
SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
factoryBean.setTypeAliasesPackage("goodgid.model");
```

<br>

> @Alias

``` java
@Alias("author")
public class Author {
    ...
}
```

* 만약 **@Alias** anootation이 존재한다면

  annotation에 명시한 값으로 alias가 등록된다.
 
  위 경우에는 **author** 키워드가 Author 클래스를 가리키게 된다.


---

## Summary

* MyBatis의 typeAliases 속성에 대해 알아봤다.

* 영어로 작성되어있기 때문에 주관적으로 해석하고 의역을 하였다.

  혹시 글을 읽다 이상한 부분이 있다면 직접 문서를 읽어보는 걸 추천한다.

  ( 추가로 피드백까지 주면 매우 감사하겠습니다. )

* 만약 영어로 된 문서를 읽기 힘들다면 한글로 번역된 [사이트](https://mybatis.org/mybatis-3/ko/configuration.html#typeAliases)를 참고하자.


---

## Reference

* [MyBatis Docs : Configuration XML](https://mybatis.org/mybatis-3/configuration.html)