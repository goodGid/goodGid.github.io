---
layout: post
title:  " SCP CLI 사용하기 : How to Use SCP Command Line Interface "
categories: CLI
author: goodGid
---
* content
{:toc}

## SCP

* SCP(secure copy) is a command-line utility 

  that allows you to securely copy files and directories between two locations.

---

* We can use it in the following situations

1. From your local system to a remote system

2. From a remote system to your local system

3. Between two remote systems from your local system

---




### Concept

* The scp command relies on ssh for data transfer 

  so it requires an **ssh key** or password to authenticate on the remote systems.

* The **colon(:)** is how scp distinguish between local and remote locations.

* To be able to copy files 

  you must have at least **read permissions** on the source file 
  
  and **write permission** on the target system.

* Be careful when copying files that share the same name and location on both systems

  scp will **overwrite** files without warning.

* When transferring large files

  it is recommended to run the scp command inside a [screen](https://linuxize.com/post/how-to-use-linux-screen/) or [tmux](https://linuxize.com/post/getting-started-with-tmux/) session.


---


### Security

* When transferring data with scp 

  both the files and password are encrypted 
  
  so that anyone snooping on the traffic doesn’t get anything sensitive.

---

### Syntax

```
scp [OPTION] [user@]SRC_HOST:]file1 [user@]DEST_HOST:]file2
```

* scp provides a number of options that control every aspect of its behavior. 

  The most widely used options are:

```
-P : Specifies the remote host ssh port.
-p : Preserves files modification and access times.
-q : Use this option if you want to suppress the progress meter and non-error messages.
-C : This option forces scp to compresses the data as it is sent to the destination machine.
-r : This option tells scp to copy directories recursively.
```

---

### Example

#### Local to Remote

> Normal Usage

* To copy a file from a local to a remote system run the following command:

```
$ scp file.txt remote_username@1.1.1.1:/remote/directory
```

---

> Saving a file with a different name

```
$ scp file.txt remote_username@1.1.1.1:/remote/directory/newfilename.txt
```

---

> Specifying Server Port

* If SSH on the remote host is listening on a port other than the default 22 

  then you can specify the port using the **-P** argument:

```
$ scp -P 1234 file.txt remote_username@1.1.1.1:/remote/directory
```

---

> Copy direcotry

* The command to copy a **directory** is much like as when copying files. 

  The only difference is that you need to use the **-r** flag for recursive.

```
$ scp -r /local/directory remote_username@1.1.1.1:/remote/directory
```

---

#### Remote to Local


``` 
$ scp remote_username@1.1.1.1:/remote/file.txt /local/directory
```

---

#### Remote to Remote

``` 
$ scp user1@host1.com:/files/file.txt user2@host2.com:/files
```


---

## Summary

* We looked at how to use scp cli

  Let's use it well.


---

## Reference

* [How to Use SCP Command to Securely Transfer Files](https://linuxize.com/post/how-to-use-scp-command-to-securely-transfer-files/)