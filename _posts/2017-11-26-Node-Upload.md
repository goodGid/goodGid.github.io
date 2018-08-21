---
layout: post
title:  " Upload Image's "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}


## Upload Method

* Front에서 Multer를 사용하여 사진과 글을 업로드하는 경우가 있다.

* 이럴 경우 사용되는 Multer의 Method에 대해 알아보자.


Upload의 Method

1. single : 1개의 Image를 Upload
1. array : 배열 형식으로 여러 개의 Image를 Upload
2. field : 배열을 여러개 담은 형식으로 Upload
3. any : Combine [ single array field ]를 한 형태로 Upload


--- 


## Example 

#### upload.single

upload의 single이란 method를 사용하기 때문에

req.files[i].location이 아닌 

req.file.location으로 Aws의 S3에 업로드 된 1개의 이미지 URL을 참조한다.


``` js

router.post('/single', upload.single('image'), function(req, res){
    let imgIdx = req.body.imgIdx;
    let imgUrlFromS3 = req.file.location; // single이기 때문에 req.files[i]가 아니라 req.file이다.

    let taskArray = [
        function (callback) {
            pool.getConnection((err, connection) => {
                if(err) callback(err,null);
                else callback(null,connection);
            });   
        },
        function (conn, callback) {
            var firstQuery = 
            `
            insert into init_s3 (imgUrl)
            values(?)
            `;
            
            conn.query(firstQuery, [imgUrlFromS3], function(err, rows) {
                if(err) {
                    callback(err);
                    conn.release();
                }
                else {   
                    res.status(200).send({
                        stat : "S3 success",
                    });
                    conn.release();  // 반드시 해제해야 합니다.
                    callback(null, " S3 Successful ");
                }
            });
        }
    ];

    async.waterfall(taskArray, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

```

--- 


#### upload.array

upload.array('Key Value', Count) 형태로

Upload시 사용 될 Key값과 Image의 Count를 명시해준다.

그리고 주의할 점은

single은 req.file  / array는 req.files 처럼 사용해야 한다.

그래서 req.files[0].location / req.files[1].location 이런식으로 참조를 하면 된다.


``` js

router.post('/array', upload.array('image',2), function(req, res){
    let imgIdx = req.body.imgIdx;
    let imgUrlFromS3_1 = req.files[0].location; // req.file이 아니라 req.files[i]이다. 
	let imgUrlFromS3_2 = req.files[1].location; // req.file이 아니라 req.files[i]이다. 

    let taskArray = [
        function (callback) {
            pool.getConnection((err, connection) => {
                if(err) callback(err,null);
                else callback(null,connection);
            });   
        },
        function (conn, callback) {
            var firstQuery = 
            `
            insert into init_s3 
            values(?,?,?)
            `;
            
            conn.query(firstQuery, [imgIdx,imgUrlFromS3_1,imgUrlFromS3_2], function(err, rows) {
                if(err) {
                    callback(err);
                    conn.release();
                }
                else {   
                    res.status(200).send({
                        stat : "S3 success",
                    });
                    conn.release();  // 반드시 해제해야 합니다.
                    callback(null, " S3 Successful ");
                }
            });
        }
    ];

    async.waterfall(taskArray, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

```
