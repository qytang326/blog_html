---
layout:         post
title:          "三种直接在命令行创建Github仓库的方法"
subtitle:       " "
date:           2017-09-30 20:30
author:         "Quanyin Tang"
header-img:     "/Source/images/background/post-bg-default.jpg"
description:    "不需要在github网页上创建仓库，直接用命令行搞定!"
catalog:        true
mathjax:        false
categories:     
                - blog
                - 转载
tags:
                - Github
---

> 摘要: 不需要在github网页上创建仓库，直接用命令行搞定，此文介绍三种直接在命令行创建GitHub仓库的形式！

## 准备工作
1. 进入一个本地仓库，并初始化
    ```bash
    git init && git add . && git commit -m "Init"
    ```
2. 新建一个API Token
进入```github - settings - Personal access tokens```，[generate new token](https://github.com/settings/applications)，写入description，选择scopes(权限范围)。记住```personal access token```(那串数字，只显示一遍！),请记住它，下次就看不到了！

## 一、命令行格式
这是最直接的一种形式，直接把参数写到命令行搞定：

```bash
    curl -u "$username:$token" https://api.github.com/user/repos -d '{"name":"'$repo_name'"}'
```

> Note: 这里需要把```$username```和```$token```分别换成实际的用户名和刚刚得到的```personal access token```，把```$repo_name```换成任何想要的```repo name```.

## 二、bash形式
可以把命令行写成bash脚本，下次只要执行里面的简单命令就可以执行以上整条命令。
1. 把```username```和```token```写入```~/.gitconfig```，形式如下：
    ```bash
    [github]
        user = your user name
        token = the token you get
    ```
2. 把如下的bash code写入```~/.bashrc```或者```~/.bash_profile```文件:

    ```bash
    github-create() {
      repo_name=$1
     
      dir_name=`basename $(pwd)`
     
      if [ "$repo_name" = "" ]; then
        echo "Repo name (hit enter to use '$dir_name')?"
        read repo_name
      fi
     
      if [ "$repo_name" = "" ]; then
        repo_name=$dir_name
      fi
     
      username=`git config github.user`
      if [ "$username" = "" ]; then
        echo "Could not find username, run 'git config --global github.user <username>'"
        invalid_credentials=1
      fi
     
      token=`git config github.token`
      if [ "$token" = "" ]; then
        echo "Could not find token, run 'git config --global github.token <token>'"
        invalid_credentials=1
      fi
     
      if [ "$invalid_credentials" == "1" ]; then
        return 1
      fi
     
      echo -n "Creating Github repository '$repo_name' ..."
      curl -u "$username:$token" https://api.github.com/user/repos -d '{"name":"'$repo_name'"}' > /dev/null 2>&1
      echo " done."
     
      echo -n "Pushing local code to remote ..."
      git remote add origin git@github.com:$username/$repo_name.git > /dev/null 2>&1
      git push -u origin master > /dev/null 2>&1
      echo " done."
    }
    ```

3. 使上述命令生效:重新打开或新启动一个Terminal,或者运行```source ~/.bashrc```
4. 以后便可以使用如下命令创建远程仓库了：
```bash
github-create [repo_name]
```
> 其中，默认的repo名是当前目录名。

## 三、Bash形式简化版
1. 把如下code写入```~/.bashrc```:
    ```bash
    github-create() 
    {if [ $1 ]
    then
        repo_name=$1
    else
        echo "Repo name?"
        read repo_name
    fi 
    curl -u '$username:$token' https://api.github.com/user/repos -d '{"name":"'$repo_name'"}'
    git remote add origin git@github.com:efatsi/$repo_name.git
    git push -u origin master
    }
    ```
2. 同Bash方式的步骤3
3. 执行命令
    ```simple-create [repo_name]```

## 四、备注
本文转自[这里](https://my.oschina.net/eduOSS/blog/287824)，有修改。