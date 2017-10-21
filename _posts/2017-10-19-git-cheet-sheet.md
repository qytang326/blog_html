---
layout:         post
title:          "git常用命令"
subtitle:       "git cheet sheet"
date:           2017-10-19 
lastmod:
author:         "Quanyin Tang"
author_homepage: https://quanyin.eu.org
header-img:     "/Source/images/background/post-bg-default.jpg"
description:    ""
catalog:        true
mathjax:        false
lazyload:       false
categories:     [git]
tags:           [git]
---

### 创建库
- 克隆一个已存在的库
```bash
$ git clone https://github.com/user/repo.git [DirName]
或者
$ git clone git@github.com:user/repo.git [DirName]
```
其中,user为用户名,repo为需要克隆的库名,DirName为可选,默认值为库的名称`repo`
- 新建本地库
```bash
$ git init
```

### 本地修改
- 查看本地工作目录下的文件变化
```bash
$ git status
```
- 已跟踪文件(tracked files)的变化
```bash
$ git diff
```
- 将本地所有修改加入到下次提交(commit)中:
```bash
$ git add .
```
- 把<file>文件中的改变加入到下次commit中：
```bash
$ git add -p <file>
```
- 提交跟踪文件在本地的修改:
```bash
$ git commit -a 
```
- 提交在工作台中的修改
```bash
$ git commit
```
- 修改最近一次的commit(不要修改已经published的commit)
```bash
$ git commit --amend
```

### Commit历史记录
- 从最新的一次开始,罗列所有提交
```bash
$ git log
```
- 查看某一文件的所有commit记录
```bash
$ git log -p <file>
```
- 查看某一文件的修改记录-Who,When,What
```bash
$ git blame <file>
```

### 分支与标签(Branch & Tag)
- 列出所以存在的分支
```bash
$ git branch -av
```
- 把HEAD移到分支上(转到分支上)
```bash
$ git checkout <branch>
```
- 基于目前的HEAD创建新分支
```bash
$ git branch <new-branch>
```
- 创建全新的分支
```bash
$ git checkout --orphan <branch>
```
- 创建远程分支的跟踪分支
```bash
$ git checkout --track <remote/branch>
```
- 删除本地分支
```bash
$ git branch -d <branch>
```
- 给当前的commit打标签
```bash
$ git tag <tag-name>
```

### 更新与提交
- 列出所有远程仓库
```bash
$ git remote -v
```
- 查看远程仓库的信息
```bash
$ git remote show <remote>
```
- 添加名为<remote>的新远程库
```bash
$ git remote add <shortname> <url>
```
- 从远程库下载所有修改,但不要加入到HEAD中
```bash
$ git fetch <remote>
```
- 下载修改并合并/加入到 HEAD中
```bash
$ git pull <remote> <branch>
```
- 把本地修改推送(push)到远程库
```bash
$ git push <remote> <branch>
```
- 删除远程库上的分支
```bash
$ git branch -dr <remote/branch>
```
- push标签
```bash
$ git push --tags
```
- push某一具体标签
```bash
$ git push <remote> <tag>
```

### 合并与编辑(merge & Rebase)
- 合并分支到当前HEAD中
```bash
$ git merge <branch>
```
- 把当前HEAD变到分支上
```bash
$ git rebase <branch>
```
> 不要对已经push的commits进行rebase

- 放弃rebase
```bash
$ git rebase --abort
```
- 解决冲突之后,仍rebase
```bash
$ git rebase --continue
```
- 使用自定义的merge工具来解决冲突
```bash
$ git mergetool
```
- 使用自定义的编辑器来手动解决冲突并在解决冲突之后标记为已解决
```bash
$ git add <resolved-file>
$ git rm <resolved-file>
```

### 撤销Undo
- 放弃在工作目录中的所有本地修改
```bash
$ git reset --hard HEAD
```
- 放弃某一文件中的本地修改
```bash
$ git checkout HEAD <file>
```
- 回复(revert)某次commit
```bash
$ git revert <commit>
```
- 重置HEAD指向某次commit：并放弃之后的所有修改
- ...并放弃之后的所有修改
```bash
$ git reset --hard <commit>
```
- ...并把之后的修改保存到unstaged changes
```bash
$ git reset <commit>
```
- ...并保留本地没有commit的修改:
```bash
$ git reset --keep <commit>
```
 
### 最基础
```
git init [<Project-Name>]                       #默认当前目录,否则新建<Project-Name>这个目录
git add .                                       #把本地修改加入到暂存区
git commit -m "<commit-message>'                #提交本次修改
git remote add origin <remote-repo>             #添加远程库
git push origin <local-branch>:<remote-branch>  #push到远程
```

### 最后！
神器:Help命令~
```bash
$ git help <command>
```
