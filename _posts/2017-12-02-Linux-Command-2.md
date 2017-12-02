---
layout:         post
title:          "Linux系统命令II"
subtitle:       "文件打包与压缩:tar"
date:           2017-12-02 16:30
lastmod:
author:         "Quanyin Tang"
author_homepage: https://quanyin.eu.org
header-img:     "/Source/images/background/post-bg-default.jpg"
description:    "利用tar,我们将许多文件一起保存至一个单独的磁带或磁盘归档,并能从归档中单独还原所需文件,可以轻易的实现文件的压缩与打包。"
catalog:        true
mathjax:        false
lazyload:       false
keyword:        tar,linux,
categories:     [Linux]
tags:           [Linux]
---
<!--
<a href="/Source/images/post-content/post-content/post-example.png"><img data-src="/Source/images/post-content/post-example.png" class="lazyload" alt=" " /></a>
-->
## tar命令

tar命令可以为linux的文件和目录创建文档。利用tar,可以为某一特定文件创建档案(备份),也可以
在其中改变文件,或者向其中加入新的文件。
>利用 tar命令,我们可以将文件/目录进行打包和压缩,以减少文件大小和便于管理。
- 打包:将一大堆文件或者目录变成一个总的文件；
- 压缩:将一个大的文件通过一些压缩算法变成小的文件

### 用法
```bash
$ tar [选项...] [FILE]...
```
将许多文件一起保存至一个单独的磁带或磁盘归档,并能从归档中单独还原所需文件。

### 选项
```bash
 本地文件名选择:

      --add-file=FILE        添加指定的 FILE 至归档(如果名字以 -
                             开始会很有用的)
  -C, --directory=DIR        改变至目录 DIR
      --exclude=PATTERN      排除以 PATTERN 指定的文件
      --exclude-backups      排除备份和锁文件
      --exclude-caches       除标识文件本身外,排除包含
                             CACHEDIR.TAG 的目录中的内容
      --exclude-caches-all   排除包含 CACHEDIR.TAG 的目录
      --exclude-caches-under 排除包含 CACHEDIR.TAG
                             的目录中所有内容
      --exclude-ignore=FILE  若存在FILE,
                             则从其中读取每个目录的例外匹配项
      --exclude-ignore-recursive=FILE
                             若存在FILE,
                             则从其中为每个目录及其子目录读取需要排除的例外匹配项
      --exclude-tag=FILE     除 FILE 自身外,排除包含 FILE
                             的目录中的内容
      --exclude-tag-all=FILE 排除包含 FILE 的目录
      --exclude-tag-under=FILE   排除包含 FILE 的目录中的所有内容
      --exclude-vcs          排除版本控制系统目录
      --exclude-vcs-ignores  从VCS 忽略文件中读取排除匹配项
      --no-null              禁用上一次的效果 --null 选项
      --no-recursion         避免目录中的自动降级
      --no-unquote           不要unquote 输入文件或成员名称
      --no-verbatim-files-from   -T
                             把以‘-’开始的文件作为选项(默认)
      --null                 -T 读取以空终止的名字; 隐含
                             --verbatim-files-from
      --recursion            目录递归(默认)
  -T, --files-from=FILE      从 FILE
                             中获取文件名来解压或创建文件
      --unquote              unquote 输入文件或成员名称(默认)
      --verbatim-files-from  -T 逐字读取文件名(不处理选项)
  -X, --exclude-from=FILE    排除 FILE 中列出的模式串

 文件名匹配选项(同时影响排除和包括模式串):

      --anchored             模式串匹配文件名头部
      --ignore-case          忽略大小写
      --no-anchored          模式串匹配任意‘/’后字符(默认对
                             exclusion 有效)
      --no-ignore-case       匹配大小写(默认)
      --no-wildcards         逐字匹配字符串
      --no-wildcards-match-slash   通配符不匹配‘/’
      --wildcards            使用通配符(默认对 exclusion )
      --wildcards-match-slash   通配符匹配‘/’(默认对exclusion
                             有效)

 主操作模式:

  -A, --catenate, --concatenate   追加 tar 文件至归档
  -c, --create               创建一个新归档
  -d, --diff, --compare      找出归档和文件系统的差异
      --delete               从归档(非磁带！)中删除
  -r, --append               追加文件至归档结尾
  -t, --list                 列出归档内容
      --test-label           测试归档卷标并退出
  -u, --update               仅追加比归档中副本更新的文件
  -x, --extract, --get       从归档中解出文件

 操作修饰符:

      --check-device         当创建增量归档时检查设备号(默认)
  -g, --listed-incremental=FILE   处理新式的 GNU 格式的增量备份
  -G, --incremental          处理老式的 GNU 格式的增量备份
      --hole-detection=TYPE  用于探测holes 的技术
      --ignore-failed-read
                             当遇上不可读文件时不要以非零值退出
      --level=NUMBER         所创建的增量列表归档的输出级别
  -n, --seek                 归档可检索
      --no-check-device      当创建增量归档时不要检查设备号
      --no-seek              归档不可检索
      --occurrence[=NUMBER]  仅处理归档中每个文件的第 NUMBER
                             个事件；仅当与以下子命令 --delete,
                             --diff, --extract 或是 --list
                             中的一个联合使用时,此选项才有效。而且不管文件列表是以命令行形式给出或是通过
                             -T 选项指定的；NUMBER 值默认为 1
      --sparse-version=MAJOR[.MINOR]
                             设置所用的离散格式版本(隐含
                             --sparse)
  -S, --sparse               高效处理离散文件

 重写控制:

  -k, --keep-old-files       解压时不替换存在的文件,
                             而将其认为是错误
      --keep-directory-symlink   解压时保留已存在的目录符号链接
      --keep-newer-files
                             不要替换比归档中副本更新的已存在的文件
      --no-overwrite-dir     保留已存在目录的元数据
      --one-top-level[=DIR]  创建子目录以避免解压松散文件
      --overwrite            解压时重写存在的文件
      --overwrite-dir
                             解压时重写已存在目录的元数据(默认)
      --recursive-unlink     解压目录之前先清除目录层次
      --remove-files         在添加文件至归档后删除它们
      --skip-old-files
                             解压时不替换存在的文件,而是自动忽略
  -U, --unlink-first         在解压要重写的文件之前先删除它们
  -W, --verify               在写入以后尝试校验归档

 选择输出流:

      --ignore-command-error 忽略子进程的退出代码
      --no-ignore-command-error
                             将子进程的非零退出代码认为发生错误
  -O, --to-stdout            解压文件至标准输出
      --to-command=COMMAND
                             将解压的文件通过管道传送至另一个程序

 操作文件属性:

      --atime-preserve[=METHOD]
                             在输出的文件上保留访问时间,要么通过在读取(默认
                             METHOD=‘replace’)后还原时间,要不就不要在第一次(METHOD=‘system’)设置时间
      --clamp-mtime          only set time when the file is more recent than
                             what was given with --mtime
      --delay-directory-restore
                             直到解压结束才设置修改时间和所解目录的权限
      --group=名称         强制将 NAME
                             作为所添加的文件的组所有者
      --group-map=FILE       用FILE 映射文件所有者GIDs 和名字
      --mode=CHANGES         强制将所添加的文件(符号)更改为权限
                             CHANGES
      --mtime=DATE-OR-FILE   从 DATE-OR-FILE 中为添加的文件设置
                             mtime
  -m, --touch                不要解压文件的修改时间
      --no-delay-directory-restore
                             取消 --delay-directory-restore 选项的效果
      --no-same-owner
                             将文件解压为您所有(普通用户默认此项)
      --no-same-permissions
                             从归档中解压权限时使用用户的掩码位(默认为普通用户服务)
      --numeric-owner        总是以数字代表用户/组的名称
      --owner=名称         强制将 NAME
                             作为所添加的文件的所有者
      --owner-map=FILE       用FILE 映射文件所有者UIDs 和名字
  -p, --preserve-permissions, --same-permissions
                             解压文件权限信息(默认只为超级用户服务)
      --same-owner
                             尝试解压时保持所有者关系一致(超级用户默认此项)
  -s, --preserve-order, --same-order
                             成员参数按归档中的文件顺序列出
      --sort=ORDER           目录排序顺序: none(默认), name 或inode

 操作extended 文件属性:

      --acls                 开启POSIX ACLs 支持
      --no-acls              关闭POSIX ACLs 支持
      --no-selinux           关闭SELinux 上下文支持
      --no-xattrs            关闭extended 属性支持
      --selinux              开启SELinux 上下文支持
      --xattrs               开启extended 属性支持
      --xattrs-exclude=MASK  为xattr 关键字指定排除匹配项
      --xattrs-include=MASK  为xattr 关键字指定包含匹配项

 设备选择和切换:

  -f, --file=ARCHIVE         使用归档文件或 ARCHIVE 设备
      --force-local
                             即使归档文件存在副本还是把它认为是本地归档
  -F, --info-script=名称, --new-volume-script=名称
                             在每卷磁带最后运行脚本(隐含 -M)
  -L, --tape-length=NUMBER   写入 NUMBER × 1024 字节后更换磁带
  -M, --multi-volume         创建/列出/解压多卷归档文件
      --rmt-command=COMMAND  使用指定的 rmt COMMAND 代替 rmt
      --rsh-command=COMMAND  使用远程 COMMAND 代替 rsh
      --volno-file=FILE      使用/更新 FILE 中的卷数

 设备分块:

  -b, --blocking-factor=BLOCKS   每个记录 BLOCKS x 512 字节
  -B, --read-full-records    读取时重新分块(只对 4.2BSD 管道有效)
  -i, --ignore-zeros         忽略归档中的零字节块(即文件结尾)
      --record-size=NUMBER   每个记录的字节数 NUMBER,乘以 512

 选择归档格式:

  -H, --format=FORMAT        创建指定格式的归档

 FORMAT 是以下格式中的一种:

    gnu                      GNU tar 1.13.x 格式
    oldgnu                   GNU 格式 as per tar <= 1.12
    pax                      POSIX 1003.1-2001 (pax) 格式
    posix                    等同于 pax
    ustar                    POSIX 1003.1-1988 (ustar) 格式
    v7                       old V7 tar 格式

      --old-archive, --portability
                             等同于 --format=v7
      --pax-option=关键字[[:]=值][,关键字[[:]=值]]...
                             控制 pax 关键字
      --posix                等同于 --format=posix
  -V, --label=TEXT           创建带有卷名 TEXT
                             的归档；在列出/解压时,使用 TEXT
                             作为卷名的模式串

 压缩选项:

  -a, --auto-compress        使用归档后缀名来决定压缩程序
  -I, --use-compress-program=PROG
                             通过 PROG 过滤(必须是能接受 -d
                             选项的程序)
  -j, --bzip2                通过 bzip2 过滤归档
  -J, --xz                   通过 xz 过滤归档
      --lzip                 通过 lzip 过滤归档
      --lzma                 通过 lzma 过滤归档
      --lzop                 通过 xz 过滤归档
      --no-auto-compress     不使用归档后缀名来决定压缩程序
  -z, --gzip, --gunzip, --ungzip   通过 gzip 过滤归档
  -Z, --compress, --uncompress   通过 compress 过滤归档

 本地文件选择:

      --backup[=CONTROL]     在删除前备份,选择 CONTROL 版本
  -h, --dereference
                             跟踪符号链接；将它们所指向的文件归档并输出
      --hard-dereference
                             跟踪硬链接；将它们所指向的文件归档并输出
  -K, --starting-file=MEMBER-NAME
                             从归档中的 MEMBER-NAME
                             成员处开始读取归档
      --newer-mtime=DATE     当只有数据改变时比较数据和时间
  -N, --newer=DATE-OR-FILE, --after-date=DATE-OR-FILE
                             只保存比 DATE-OR-FILE 更新的文件
      --one-file-system      创建归档时保存在本地文件系统中
  -P, --absolute-names       不要从文件名中清除引导符‘/’
      --suffix=STRING        在删除前备份,除非被环境变量
                             SIMPLE_BACKUP_SUFFIX
                             覆盖,否则覆盖常用后缀(‘’)

 文件名变换:

      --strip-components=NUMBER   解压时从文件名中清除 NUMBER
                             个引导部分
      --transform=EXPRESSION, --xform=EXPRESSION
                             使用 sed 代替 EXPRESSION
                             来进行文件名变换

 提示性输出:

      --checkpoint[=NUMBER]  每隔 NUMBER
                             个记录显示进度信息(默认为 10 个)
      --checkpoint-action=ACTION   在每个检查点上执行 ACTION
      --full-time            按文件原本时间格式打印
      --index-file=FILE      将详细输出发送至 FILE
  -l, --check-links
                             只要不是所有链接都被输出就打印信息
      --no-quote-chars=STRING   禁用来自 STRING 的字符引用
      --quote-chars=STRING   来自 STRING 的额外的引用字符
      --quoting-style=STYLE  设置名称引用风格；有效的 STYLE
                             值请参阅以下说明
  -R, --block-number         每个信息都显示归档内的块数
      --show-defaults        显示 tar 默认选项
      --show-omitted-dirs
                             列表或解压时,列出每个不匹配查找标准的目录
      --show-snapshot-field-ranges
                             显示快照文件区的有效范围
      --show-transformed-names, --show-stored-names
                             显示变换后的文件名或归档名
      --totals[=SIGNAL]      处理归档后打印出总字节数；当此
                             SIGNAL 被触发时带参数 -
                             打印总字节数；允许的信号为:
                             SIGHUP,SIGQUIT,SIGINT,SIGUSR1 和
                             SIGUSR2；同时也接受不带 SIG
                             前缀的信号名称
      --utc                  以 UTC 格式打印文件修改时间
  -v, --verbose              详细地列出处理的文件
      --warning=KEYWORD      警告控制:
  -w, --interactive, --confirmation
                             每次操作都要求确认

 兼容性选项:

  -o                         创建归档时,相当于
                             --old-archive；展开归档时,相当于
                             --no-same-owner

 其它选项:

  -?, --help                 显示此帮助列表
      --restrict             禁用某些潜在的有危险的选项
      --usage                显示简短的用法说明
      --version              打印程序版本

长选项和相应短选项具有相同的强制参数或可选参数。

除非以 --suffix 或 SIMPLE_BACKUP_SUFFIX
设置备份后缀,否则备份后缀就是“~”。
可以用 --backup 或 VERSION_CONTROL 设置版本控制,可能的值为：

  none, off	   从不做备份
  t, numbered     进行编号备份
  nil, existing
如果编号备份存在则进行编号备份,否则进行简单备份
  never, simple   总是使用简单备份

--quoting-style 选项的有效参数为:

  literal
  shell
  shell-always
  c
  c-maybe
  escape
  locale
  clocale
```

## 常用选项

```bash
-A或--catenate：新增文件到以存在的备份文件；
-B：设置区块大小； 
-c或--create：建立新的备份文件； 
-C <目录>：这个选项用在解压缩,若要在特定目录解压缩,可以使用这个选项。 
-d：记录文件的差别； 
-x或--extract或--get：从备份文件中还原文件； 
-t或--list：列出备份文件的内容； 
-z或--gzip或--ungzip：通过gzip指令处理备份文件； 
-Z或--compress或--uncompress：通过compress指令处理备份文件； 
-f<备份文件>或--file=<备份文件>：指定备份文件； 
-v或--verbose：显示指令执行过程； 
-r：添加文件到已经压缩的文件； 
-u：添加改变了和现有的文件到已经存在的压缩文件； 
-j：支持bzip2解压文件； 
-v：显示操作过程； 
-l：文件系统边界设置； 
-k：保留原有文件不覆盖； 
-m：保留文件不被覆盖； 
-w：确认压缩文件的正确性； 
-p或--same-permissions：用原来的文件权限还原文件； 
-P或--absolute-names：文件名使用绝对名称,不移除文件名称前的“/”号； 
-N <日期格式> 或 --newer=<日期时间>：只将较指定日期更新的文件保存到备份文件里； 
--exclude=<范本样式>：排除符合范本样式的文件。
```

### 寻求帮助
- 使用 `tar --help` 
- 使用 `man tar` 
- 使用 `info tar` 


### 示例
```bash 
$ tar -cf archive.tar foo bar  # 从文件 foo 和 bar 创建归档文件archive.tar。
$ tar -tvf archive.tar         # 详细列举归档文件 archive.tar中的所有文件。
$ tar -xf archive.tar          # 解开归档文件 archive.tar中的所有文件。
```
