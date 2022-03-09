---
layout: post
title:  " AWS S3 Bucket에 있는 파일에 대해 Public Access 하는 방법 "
categories: AWS
author: goodGid
---
* content
{:toc}

## Prologue

* AWS S3 서비스를 사용하여 정적 파일을 업로드 시

  외부에서도 해당 파일에 대해 접근이 필요할 때도 있다.

* 이 글에서는 어떻게 Public Access 할 수 있는지 알아보자.



---

## Public Access to Bucket 

> Step 1 

![](/assets/img/aws/AWS-S3-File-Public-Access_1.png)

* "Create bucket"을 클릭한다.

---

> Step 2

![](/assets/img/aws/AWS-S3-File-Public-Access_2.png)

* Bucket name과 region을 정한다.


---

> Step 3

![](/assets/img/aws/AWS-S3-File-Public-Access_3.png)

* Block all pulbic access 체크 박스를 해지한다.

  참고로 위 버튼을 해지했다고 Public Access가 되지 않고 추가 설정이 필요하다.

* 우선은 Bucket 생성을 마무리 짓는다.

---

> Step 4

![](/assets/img/aws/AWS-S3-File-Public-Access_4.png)

* Bucket 생성을 완료한다.

---

> Step 5

![](/assets/img/aws/AWS-S3-File-Public-Access_5.png)

* 방금 생성한 Bucket을 클릭 후 "Permissions -> Bucket policy" 부분에 다음 코드를 추가하면

  정말로 Public Access가 가능해진다.

``` json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AddPerm",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::MY_BUCKECT_NAME/*"
      ex) "Resource": "arn:aws:s3:::tiltil/*"
    }
  ]
}
```

* 참고로 Version에 있는 값을 보고 지금은 2012년이 아니잖아? 할 수 있지만

  저건 현재 연도를 말하는 게 아니므로 그냥 위 코드를 사용하면 된다.

---

> Step 6

![](/assets/img/github/Github-Action-CI-CD-AWS-S3_13.png)

* *Permissions overview* 영역에 **Public**이라는 텍스트가 노출되면

  정상적으로 설정이 완료되었고 Bucket에 업로드된 파일에 대해 Public Access도 정상적으로 된다.

---

## Summary

* AWS S3를 사용하여 정적 파일 관리 시 

  외부에서도 접근할 수 있는 설정 방법을 알아봤다.

* 주의할 점은 Public Access가 가능하므로 보안상 취약할 수 있으니 

  반드시 조심하도록 하자 !