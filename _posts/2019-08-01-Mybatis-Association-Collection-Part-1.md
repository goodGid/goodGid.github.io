---
layout: post
title:  " MyBatis의 Association과 Collection 알아보기 - Artist, Album "
categories: DB
author: goodGid
---
* content
{:toc}

## 배경 지식

### Association & Collection

* `has one` 관계를 설정하기 위한 **association**

* `has many` 관계를 설정하기 위한 **collection**





---

### Mybatis에서 관계를 정의하는 방법

*  **Nested Select** = 1번의 추가 Select을 통한 데이터 검색
    
*  **Nested Results** = Join을 통한 한 번에 데이터를 검색

---

* 본격적으로 Association & Collection에 대해 알아보자 !

* 이 글에서 다룰 가장 기본이 되는 Entity는 3개다.

1. [Artist]({{site.url}}/Mybatis-Association-Collection-Part-1/#1-artist)

2. [Album]({{site.url}}/Mybatis-Association-Collection-Part-1/#2-album)

3. [Song]({{site.url}}/Mybatis-Association-Collection-Part-2/#3-song)

* Artist와 Ablum은 해당 글에서 다루고 <br> Song은 [MyBatis의 Association과 Collection 알아보기 - Song]({{site.url}}/Mybatis-Association-Collection-Part-2/)에서 다룬다.


``` java
@Data 
public class Artist {
    private Long seq;
    private String name;
    private Date debutDate;
}

@Data 
public class Album {
    private Long seq;
    private Artist artist;
    private String title;
    private Stock stock;
    private Date issueDate;
    private List<Song> songs;

    public int getTotalPlaytime() {
        return (getSongs() == null || getSongs().size() == 0) ? 0 :
                getSongs().stream().mapToInt(Song::getPlaytime).sum();
    }
}

@Data 
public class Song {
    private Long seq;
    private Album album;
    private String name;
    private int playtime;
}
```


## 1. Artist

* 우선 Artist Entity를 위한 작업을 진행해보자.

* ArtistRepository의 selectArtistByPrimaryKey 메소드에 대한 매핑 XML은 아래와 같다. 

* Artist 객체 자체는 어떠한 연관 객체를 멤버 속성으로 지니지 않으므로 <br>(= Album과 Song에 비교해 가장 상위 Class라 볼 수 있다.) <br> has one 또는 has many와 같은 연관 관계를 고려할 필요는 없다. 


``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.devop.test.core.repo.artist.ArtistRepository">
    <!-- Result Map 선언  -->
    <resultMap id="[1] : artistResultMap" type="com.devop.test.core.entity.artist.Artist">
        <id column="seq" property="seq" jdbcType="BIGINT"/>
        <result column="name" property="name" jdbcType="VARCHAR"/>
        <result column="debut_date" property="debutDate" jdbcType="TIMESTAMP"/>
    </resultMap>

    <!-- SELECT Query  -->
    <select id="selectArtistByPrimaryKey" 
    resultMap="[1] : artistResultMap" parameterType="java.lang.Long">
        select
            seq, name, debut_date
        from
            artists
        where
            seq = #{seq, jdbcType=BIGINT}
    </select>
</mapper>
```


---


## 2. Album

* 다음으로 Album Entity를 위한 작업을 진행해보자.

* AlbumRepository 매핑 XML은 다음과 같다. 

* Album 객체를 기준으로 <br> `has one` 관계에 있는 Artist 객체 <br> `has many` 관계에 있는 Song 객체와 연관 되도록 SQL을 설정한다. 

* 이러한 연관 설정은 MyBatis에서 제공하는 **association**과 **collection**으로 정의할 수 있다.

---
    
* 아래 매핑 XML은 Album 객체와 <br> `has one` 관계에 있는 Artist 객체를 Nested Select를 통해 가져오도록 한다.

* 아래 매핑 XML은 Album 객체와 <br> `has many` 관계에 있는 Song 객체를 Nested Select를 통해 가져오도록 한다.


``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.devop.test.core.repo.album.AlbumRepository">
    <!-- Result Map 선언  -->
    <resultMap id="albumResultMap" type="com.devop.test.core.entity.album.Album">
        <id column="seq" property="seq" jdbcType="BIGINT"/>
        <result column="title" property="title" jdbcType="VARCHAR"/>
        <result column="stock" property="stock" jdbcType="INTEGER" typeHandler="org.apache.ibatis.type.EnumOrdinalTypeHandler"/>
        <result column="issueDate" property="issueDate" jdbcType="TIMESTAMP"/>
        <!-- association -->
        <association column="artist_seq" property="artist" select="[1] : selectArtistByPrimaryKey"/>

        <!-- collection -->
        <collection column="seq" property="songs" select="[2] : selectSongByAlbumKey"/>
    </resultMap>

    <!-- SELECT Query  -->  
    <select id="[1] : selectArtistByPrimaryKey" 
    resultMap="artistResultMap" parameterType="java.lang.Long">
        select
            seq, name, debut_date
        from
            artists
        where
            seq = #{seq, jdbcType=BIGINT}
    </select>

    <!-- SELECT Query  -->
    <select id="[2] : selectSongByAlbumKey" 
    resultMap="songResultMap" parameterType="java.lang.Long">
        select
            seq, album_seq, name, playtime
        from
            songs
        where
            album_seq = #{seq, jdbcType=BIGINT}
    </select>
</mapper>
```
[]({{site.url}}/)



## Summary

* Song Entity는 <br> [MyBatis의 Association과 Collection 알아보기 - Song]({{site.url}}/Mybatis-Association-Collection-Part-2/)글을 통해 알아보자.


---

## 참고

* [MyBatis를 ORM 처럼 사용하기](https://lyb1495.tistory.com/110)