---
layout:         post
title:          "免密码登陆Github"
subtitle:       "——利用ssh"
date:           2017-11-19 17:00
lastmod:
author:         "Quanyin Tang"
author_homepage: https://quanyin.eu.org
header-img:     "/Source/images/background/post-bg-default.jpg"
description:    "利用ssh可以实现免密码登陆Github,Linux服务器等"
catalog:        true
mathjax:        false
lazyload:       false
categories:     [笔记]
tags:           [Github,SSH]
---
<!--
<a href="/Source/images/post-content/post-content/post-example.png"><img data-src="/Source/images/post-content/post-example.png" class="lazyload" alt=" " /></a>
-->

## 什么是ssh

### SSH简介
  Secure Shell(缩写为SSH),由IETF的网络工作小组(Network Working Group)所制定;SSH为一项创建在应用层和传输层基础上的安全协议,为计算机上的Shell(壳层)提供安全的传输和使用环境。

  SSH是目前较可靠,专为远程登录会话和其他网络服务提供安全性的协议。利用SSH协议可以有效防止远程管理过程中的信息泄露问题。通过SSH可以对所有传输的数据进行加密,也能够防止DNS欺骗和IP欺骗。

  最初的SSH协议是由芬兰的一家公司的研究员Tatu Ylönen于1995年设计开发的,但是因为受版权和加密算法等等的限制,现在很多人都转而使用OpenSSH。OpenSSH是SSH的替代软件包,而且是开放源代码且自由的。

### 工作原理

"SSH公钥认证免密码登录认证机制",原理如下:

1. SSH客户端提前将SSH公钥储存在远程SSH服务器上,然后SSH客户端携带公钥向远程SSH服务器(known_hosts)发起请求。
2. 远程SSH服务器收到该请求之后,先在该服务器上的authorized_keys寻找授权过的公钥,然后把它和发送请求的公钥进行匹配。
3. 如果两个公钥一致(Key Exchange Success),远程SSH服务器会向用户发送一段使用SSH公钥加密过的随机字符串进行身份质询(Challenge)。
4. SSH客户端用自己的私钥解密后再发回给远程SSH服务器,远程SSH服务器对比回包中解密出来的随机字符串是否一致。如果一致,则证明用户(公钥或身份)是可信的,直接允许登录shell,不再要求密码。

## 配置免密码登陆
要进行SSH免密码登录,首先要有由公钥和私钥组成的密钥对,然后把公钥上传到远程服务器上,本地保留私钥并进行登录。
### 生成密钥对
```
$ ssh-keygen 
Generating public/private rsa key pair.
Enter file in which to save the key (/home/qytang/.ssh/id_rsa):     # 直接回车即选择默认路径
Enter passphrase (empty for no passphrase):                         # 输入密钥文件授权密码,用于加密本地ssh-key,一般直接留空不加密
Enter same passphrase again:                                        # 确认密钥文件授权密码
Your identification has been saved in /home/qytang/.ssh/id_rsa.     # 生成的ssh私钥路径
Your public key has been saved in /home/qytang/.ssh/id_rsa.pub.     # 生成的ssh公钥路径
The key fingerprint is:
SHA256:OdP+fuUUHvuprpW3h3A/Susm6bsBptCjpyDmjfz8gjc qytang@mstation
The key's randomart image is:
+---[RSA 2048]----+
|                 |
|                 |
|                 |
|      .  o     o |
|     . oSo.   . +|
|      o ++. . ooo|
| o.. . o  ...* Bo|
|+.=E. o    ++.=o*|
| +o++o    .*@Bo.o|
+----[SHA256]-----+
```
默认的`ssh-keygen`生成的是采用`rsa`算法的2048位密钥,也可以自己指定算法和密钥位数:

```
$ ssh-keygen -t rsa -b 4096   # "-t rsa"表示使用密钥的加密类型,默认为rsa,还可以为其他;"-b 4096"表示生成4096位密钥;-C设置注释文字,比如邮箱,姓名等
Generating public/private rsa key pair.
Enter file in which to save the key (/home/qytang/.ssh/id_rsa):
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/qytang/.ssh/id_rsa.
Your public key has been saved in /home/qytang/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:tLyLwRQxQ2DH1yfdOArKm/AOUW6aE7Fqops+bvc5VGI qytang@mstation
The key's randomart image is:
+---[RSA 4096]----+
|    o+*  . . o   |
|   ...o+o o = .  |
|     *.o.. + .   |
|    =E== ..      |
|   ..O+oS        |
|. o =++  .       |
|.o  .+o .        |
|.+ . .oo .       |
|*+o .oo .        |
+----[SHA256]-----+
```
可选的算法有`[ dsa | ecdsa | ed25519 | rsa | rsa1]`等,也可以在最后加上`-C Comment`对密钥进行标记。

生成密钥对在`~/.ssh/`下,`id_rsa`为私钥,要妥善保管;`id_rsa.pub`为公钥。

### 上传公钥

#### Github
1. 把`id_ras.pub`的文件内容复制并加到Github的`setting -> SSH and GPG Keys -> New SSH Key`中,并选择`Add SSH Key`保存。 
2. 测试连接
```
$ ssh git@github.com
The authenticity of host 'github.com (192.30.253.113)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)? yes # yes 确认密钥文件授权密码
Warning: Permanently added 'github.com,192.30.253.113' (RSA) to the list of known hosts.
PTY allocation request failed on channel 0
Hi qytang326! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed. #成功
```
3. Repo的地址改为ssh方式
```bash
$ git remote add origin git@github.com:[username]/[your repo].git
```
或者修改`.git/config`文件
最后的状态应该是:
```bash
$ git remote -v
origin  git@github.com:qytang326/qytang326.github.io.git (fetch)
origin  git@github.com:qytang326/qytang326.github.io.git (push)
```

#### Git服务器 & Linux服务器
  对于自建的Git服务器,以及期望实现远程ssh免密码登录Linux服务器,只需把公钥中的内容复制到服务器中的`/home/git/.ssh/authorized_keys`(对git服务器)或`~/.ssh/authorized_keys`(普通的linux服务器)即可,
若不存在`authorized_keys`文件,新建即可。

## Https免密码登陆

1. 新建文件并保存密码
```bash
touch ~/.git-credentials
vim ~/.git-credentials
```
2. 添加内容
```
https://{username}:{passwd}@github.com
```
3. 添加git配置
执行下面命令添加配置:
```bash
git config --global credential.helper store
```
4. 查看`~/.gitconfig`文件变化,`~/.gitconfig`文件多出下面配置项:
```bash
[credential]
    helper = store
```

## 免密码`git push`
经过以上两种免密码处理(SSH和https)中的任一种之后,再进行`git push`就不需要输入密码啦
