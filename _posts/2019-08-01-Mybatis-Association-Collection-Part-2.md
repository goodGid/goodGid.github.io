---
layout: post
title:  " MyBatis의 Association과 Collection 알아보기 - Song "
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

* 반드시 [MyBatis의 Association과 Collection 알아보기 - Artist, Album]({{site.url}}/Mybatis-Association-Collection-Part-1/)글을 정독 후 해당 글을 읽길 바란다.


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


---

## 3. Song

* 마지막으로 Song Entity를 위한 작업을 진행해보자.

* SongRepository 매핑 XML은 다음과 같다.

* 주의해서 볼 부분은 songResultMap에서 <br> Song 객체와 `has one` 관계에 있는 <br> Album 객체를 가져오기 위한 **assocication** 태그 부분이다. 

* 2가지 방법으로 **association** 태그를 사용해본다.

* 결론부터 말하자면 <br> Join을 통해 한번에 가져온 데이터를 <br> **association** 태그 내에 **resultMap**에 지정한 형태로 결과값을 담게된다.

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.devop.test.core.repo.song.SongRepository">
    <!-- [1] : Nested Results = Join을 통한 한 번에 데이터를 검색  -->
    <resultMap id="songResultMap" type="com.devop.test.core.entity.song.Song">
        <id column="seq" property="seq" jdbcType="BIGINT"/>
        <result column="name" property="name" jdbcType="VARCHAR"/>
        <result column="playtime" property="playtime" jdbcType="INTEGER"/>
        <!-- [association] 1번째 방법 -->
        <association property="album" resultMap="albumResultMap"/> 
        <!-- [association] 2번째 방법 -->
        <association property="album" column="album_seq" select="selectAlbumByPrimaryKey"/>
    </resultMap>
</mapper>
```

``` xml
<!-- [association] 1번째 방법 -->
<resultMap id="albumResultMap" type="com.devop.test.core.entity.album.Album">
    <id column="seq" property="seq" jdbcType="BIGINT"/>
    <result column="title" property="title" jdbcType="VARCHAR"/>
    <result column="stock" property="stock" jdbcType="INTEGER" typeHandler="org.apache.ibatis.type.EnumOrdinalTypeHandler"/>
    <result column="issueDate" property="issueDate" jdbcType="TIMESTAMP"/>
    <association column="artist_seq" property="artist" select="selectArtistByPrimaryKey"/>
    <collection column="seq" property="songs" select="selectSongByAlbumKey"/>
</resultMap>
```

<br>

* 여기서 `<association property="album" resultMap="albumResultMap"/>` 코드는 다음과 같이 이해할 수 있다.

* Album 타입의 album이라는 변수명에

``` java
@Data 
public class Song {
    private Long seq;
    private Album album; // <-- Album 타입의 album 이라는 변수명
    private String name;
    private int playtime;
}
```

* resultMap으로 선언한 **albumResultMap**형태로 값을 바인딩시킨다.

* 즉 album 변수에 **albumResultMap** 형태로 값이 들어가지게 된다.

<br>

* association을 사용하는 2번째 방법에 대해 알아보자.

``` xml
    <!-- Nested Select :: selectAlbumByPrimaryKey  -->
    <select id="selectAlbumByPrimaryKey" 
    resultMap="albumResultMap2" parameterType="java.lang.Long">
        select
            seq, artist_seq, title, stock, issue_date
        from
            albums
        where
            seq = #{seq, jdbcType=BIGINT}
    </select>
```


<br>


* [Artist]({{site.url}}/Mybatis-Association-Collection-Part-1/#1-artist),[Album]({{site.url}}/Mybatis-Association-Collection-Part-1/#2-album), [Song]({{site.url}}/Mybatis-Association-Collection-Part-2/#3-song)에 대한 Repository 작성이 끝났다.

* 이제 이 Repository를 DI 받아 사용할 Service를 정의하여 사용하면 된다.

``` java
@Service
public class ArtistService {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired 
    private ArtistRepository artistRepository;

    @Transactional(readOnly=true)
    public Artist selectArtistByPrimaryKey(Long seq) {
        try {
            return artistRepository.selectArtistByPrimaryKey(seq);
        } catch (DataAccessException e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }
}

@Service
public class AlbumService {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired 
    private AlbumRepository albumRepository;

    @Transactional(readOnly=true)
    public Album selectAlbumByPrimaryKey(Long seq) {
        try {
            return albumRepository.selectAlbumByPrimaryKey(seq);
        } catch (DataAccessException e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }
}

@Service
public class SongService {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired 
    private SongRepository songRepository;

    @Transactional(readOnly=true)
    public Song selectSongByPrimaryKey(Long seq) {
        try {
            return songRepository.selectSongByPrimaryKey(seq);
        } catch (DataAccessException e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Transactional(readOnly=true)
    public List<Song> selectSongByAlbumKey(Long albumSeq) {
        try {
            return songRepository.selectSongByAlbumKey(albumSeq);
        } catch (DataAccessException e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }
}
```

---

## Controller 추가

* 지금까지 열심히 작성한 Service를 사용하는 Spring MVC Controller를 추가해보자.

``` java
@Controller
@RequestMapping(value="album")
public class AlbumController {
    @Autowired private AlbumService albumService;

    @RequestMapping(value="index")
    public ModelAndView selectAlbum(@RequestParam(required=true) Long seq) {
        Album album = albumService.selectAlbumByPrimaryKey(seq);
        ModelAndView mav = new ModelAndView();
        mav.addObject("album", album);
        return mav;
    }
}
```


---

## 결과 화면

``` jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>:: 앨범 ::</title>
</head>
<body>
    <h1>앨범정보</h1>

    <h2>앨범명</h2>
    ${album.title}<br/>

    <h2>재생시간</h2>
    ${album.totalPlaytime}<br/>

    <h2>음악가</h2>
    ${album.artist.name}<br/>
</body>
</html>
```


---

## Reference

* [MyBatis를 ORM 처럼 사용하기](https://lyb1495.tistory.com/110)