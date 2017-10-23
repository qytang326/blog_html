---
layout:         post
title:          "Linux系统命令 I"
subtitle:       "目录操作命令:ls,cd,mkdir,rmdir,pwd"
date:           2017-10-23
lastmod:
author:         "Quanyin Tang"
author_homepage: https://quanyin.eu.org
header-img:     "/Source/images/background/post-bg-default.jpg"
description:    "Linux系统下一些常用命令介绍"
catalog:        true
mathjax:        false
lazyload:       false
categories:     [Linux]
tags:           [Linux]
---
## ls
ls命令是Linux下用于显示目录相关信息的命令.
### 1. 用法
```bash
ls [选项] [文件(夹)]
ls [OPTION]... [FILE]...
```

### 2. 功能
列出 `[FILE]` 的相关信息

### 3. 常用参数
    -a,–all                         列出目录下的所有文件,包括以 . 开头的隐含文件

    -A                              同-a,但不列出"."(表示当前目录)和".."(表示当前目录的父目录)。

    -c                              配合 -lt:根据 ctime 排序及显示 ctime(文件状态最后更改的时间)
                                    配合 -l:显示 ctime 但根据名称排序
                                    否则:根据 ctime 排序

    -C                              每栏由上至下列出项目

    –color[=WHEN]                   控制是否使用色彩分辨文件。WHEN 可以是'never'、'always'或'auto'其中之一

    -d,–directory                   将目录象文件一样显示,而不是显示其下的文件。

    -D,–dired                       产生适合 Emacs 的 dired 模式使用的结果

    -f                              对输出的文件不进行排序,-aU 选项生效,-lst 选项失效

    -g                              类似 -l,但不列出所有者

    -G,–no-group                    不列出任何有关组的信息

    -h,–human-readable              以容易理解的格式列出文件大小(例如 1K 234M 2G)

    –si                             类似 -h,但文件大小取 1000 的次方而不是 1024

    -H,–dereference-command-line    使用命令列中的符号链接指示的真正目的地

    –indicator-style=方式           指定在每个项目名称后加上指示符号<方式>:none(默认),classify(-F),file-type(-p)

    -i,–inode                       印出每个文件的 inode 号

    -I,–ignore=样式                 不印出任何符合 shell 万用字符<样式>的项目

    -k                              即 `–block-size=1K` ,以 k 字节的形式表示文件的大小。

    -l                              除了文件名之外,还将文件的权限、所有者、文件大小等信息详细列出来。

    -L, –dereference                当显示符号链接的文件信息时,显示符号链接所指示的对象而并非符号链接本身的信息

    -m                              所有项目以逗号分隔,并填满整行行宽

    -o                              类似 -l,显示文件的除组信息外的详细信息。   

    -r, –reverse                    依相反次序排列

    -R, –recursive                  同时列出所有子目录层

    -s, –size                       以块大小为单位列出所有文件的大小

    -S                              根据文件大小排序

    –sort=WORD                      以下是可选用的 WORD 和它们代表的相应选项:
                                    - extension -X status -c
                                    - none -U time -t
                                    - size -S atime -u
                                    - time -t access -u
                                    - version -v use -u

    -t                              以文件修改时间排序

    -u                              配合 -lt:显示访问时间而且依访问时间排序
                                    配合 -l:显示访问时间但根据名称排序
                                    否则:根据访问时间排序

    -U                              不进行排序;依文件系统原有的次序列出项目

    -v                              根据版本进行排序

    -w, –width=COLS                 自行指定屏幕宽度而不使用目前的数值

    -x                              逐行列出项目而不是逐栏列出

    -X                              根据扩展名排序

    -1                              每行只列出一个文件

    –help                           显示此帮助信息并离开

    –version                        显示版本信息并离开
    
### 4. 寻求帮助
- 使用 `ls --help` 
- 使用 `man ls` 
- 使用 `info ls` 

```bash
$ ls --help

用法:ls [选项]... [文件]...
List information about the FILEs(the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

必选参数对长短选项同时适用。
  -a, --all			不隐藏任何以. 开始的项目
  -A, --almost-all		列出除. 及.. 以外的任何项目
      --author			与-l 同时使用时列出每个文件的作者
  -b, --escape			以八进制溢出序列表示不可打印的字符
      --block-size=SIZE      scale sizes by SIZE before printing them; e.g.,
                               '--block-size=M' prints sizes in units of
                               1,048,576 bytes; see SIZE format below
  -B, --ignore-backups       do not list implied entries ending with ~
  -c                         with -lt: sort by, and show, ctime(time of last
                               modification of file status information);
                               with -l: show ctime and sort by name;
                               otherwise: sort by ctime, newest first
  -C                         list entries by columns
      --color[=WHEN]         colorize the output; WHEN can be 'always'(default
                               if omitted), 'auto', or 'never'; more info below
  -d, --directory            list directories themselves, not their contents
  -D, --dired                generate output designed for Emacs' dired mode
  -f                         do not sort, enable -aU, disable -ls --color
  -F, --classify             append indicator(one of */=>@|) to entries
      --file-type            likewise, except do not append '*'
      --format=WORD          across -x, commas -m, horizontal -x, long -l,
                               single-column -1, verbose -l, vertical -C
      --full-time            like -l --time-style=full-iso
  -g				类似-l,但不列出所有者
      --group-directories-first
                             group directories before files;
                               can be augmented with a --sort option, but any
                               use of --sort=none(-U) disables grouping
  -G, --no-group             in a long listing, don't print group names
  -h, --human-readable       with -l and/or -s, print human readable sizes
                              (e.g., 1K 234M 2G)
      --si                   likewise, but use powers of 1000 not 1024
  -H, --dereference-command-line
                             follow symbolic links listed on the command line
      --dereference-command-line-symlink-to-dir
                             follow each command line symbolic link
                               that points to a directory
      --hide=PATTERN         do not list implied entries matching shell PATTERN
                              (overridden by -a or -A)
      --indicator-style=WORD  append indicator with style WORD to entry names:
                               none(default), slash(-p),
                               file-type(--file-type), classify(-F)
  -i, --inode                print the index number of each file
  -I, --ignore=PATTERN       do not list implied entries matching shell PATTERN
  -k, --kibibytes            default to 1024-byte blocks for disk usage
  -l				使用较长格式列出信息
  -L, --dereference		当显示符号链接的文件信息时,显示符号链接所指示
				的对象而并非符号链接本身的信息
  -m				所有项目以逗号分隔,并填满整行行宽
  -n, --numeric-uid-gid      like -l, but list numeric user and group IDs
  -N, --literal              print entry names without quoting
  -o                         like -l, but do not list group information
  -p, --indicator-style=slash
                             append / indicator to directories
  -q, --hide-control-chars   print ? instead of nongraphic characters
      --show-control-chars   show nongraphic characters as-is(the default,
                               unless program is 'ls' and output is a terminal)
  -Q, --quote-name           enclose entry names in double quotes
      --quoting-style=WORD   use quoting style WORD for entry names:
                               literal, locale, shell, shell-always,
                               shell-escape, shell-escape-always, c, escape
  -r, --reverse			逆序排列
  -R, --recursive		递归显示子目录
  -s, --size			以块数形式显示每个文件分配的尺寸
  -S                         sort by file size, largest first
      --sort=WORD            sort by WORD instead of name: none(-U), size(-S),
                               time(-t), version(-v), extension(-X)
      --time=WORD            with -l, show time as WORD instead of default
                               modification time: atime or access or use(-u);
                               ctime or status(-c); also use specified time
                               as sort key if --sort=time(newest first)
      --time-style=STYLE     with -l, show times using style STYLE:
                               full-iso, long-iso, iso, locale, or +FORMAT;
                               FORMAT is interpreted like in 'date'; if FORMAT
                               is FORMAT1<newline>FORMAT2, then FORMAT1 applies
                               to non-recent files and FORMAT2 to recent files;
                               if STYLE is prefixed with 'posix-', STYLE
                               takes effect only outside the POSIX locale
  -t                         sort by modification time, newest first
  -T, --tabsize=COLS         assume tab stops at each COLS instead of 8
  -u                         with -lt: sort by, and show, access time;
                               with -l: show access time and sort by name;
                               otherwise: sort by access time, newest first
  -U                         do not sort; list entries in directory order
  -v                         natural sort of(version) numbers within text
  -w, --width=COLS           set output width to COLS.  0 means no limit
  -x                         list entries by lines instead of by columns
  -X                         sort alphabetically by entry extension
  -Z, --context              print any security context of each file
  -1                         list one file per line.  Avoid '\n' with -q or -b
      --help		显示此帮助信息并退出
      --version		显示版本信息并退出

The SIZE argument is an integer and optional unit(example: 10K is 10*1024).
Units are K,M,G,T,P,E,Z,Y(powers of 1024) or KB,MB,...(powers of 1000).

使用色彩来区分文件类型的功能已被禁用,默认设置和 --color=never 同时禁用了它。
使用 --color=auto 选项,ls 只在标准输出被连至终端时才生成颜色代码。
LS_COLORS 环境变量可改变此设置,可使用 dircolors 命令来设置。

退出状态:
 0  正常
 1  一般问题(例如:无法访问子文件夹)
 2  严重问题(例如:无法使用命令行参数)
```

## cd

### 1. 用法
```bash
cd [目录名]
cd [-L|[-P [-e]] [-@]] [目录]
```

### 2. 功能
改变当前工作目录;
切换当前目录到`[目录]`,默认为`HOME`目录

### 3. 常用参数

    cd .        进入到当前目录(没有任何改变)
    cd ..       进入到父目录(上层目录)
    cd ~        进入到`HOME`目录
    cd -        进入到上次工作目录(`$OLDPWD`)
    cd !$       把上个命令的参数作为cd参数使用
    cd DIR      进入到当前目录下的`DIR`中(相对目录),若没有`DIR`目录则报错`没有那个文件或目录`
    cd /a/b     进入到`/a/b`目录(绝对位置)
    
    选项 Option :
          -L	force symbolic links to be followed: resolve symbolic
                links in DIR after processing instances of `..'
          -P	use the physical directory structure without following
                symbolic links: resolve symbolic links in DIR before
                processing instances of `..'
          -e	if the -P option is supplied, and the current working
                directory cannot be determined successfully, exit with
                a non-zero status
          -@	on systems that support it, present a file with extended
                attributes as a directory containing the file attributes

### 4. 寻求帮助
- 使用 `cd --help` 
- 使用 `man cd` 
- 使用 `info cd` 

```bash
    cd [-L|[-P [-e]] [-@]] [目录]
    Change the shell working directory.
    
    Change the current directory to DIR.  The default DIR is the value of the
    HOME shell variable.
    
    The variable CDPATH defines the search path for the directory containing
    DIR.  Alternative directory names in CDPATH are separated by a colon (:).
    A null directory name is the same as the current directory.  If DIR begins
    with a slash (/), then CDPATH is not used.
    
    If the directory is not found, and the shell option 'cdable_vars' is set,
    the word is assumed to be  a variable name.  If that variable has a value,
    its value is used for DIR.
    
    Options:
      -L	force symbolic links to be followed: resolve symbolic
    		links in DIR after processing instances of '..'
      -P	use the physical directory structure without following
    		symbolic links: resolve symbolic links in DIR before
    		processing instances of '..'
      -e	if the -P option is supplied, and the current working
    		directory cannot be determined successfully, exit with
    		a non-zero status
      -@	on systems that support it, present a file with extended
    		attributes as a directory containing the file attributes
    
    The default is to follow symbolic links, as if '-L' were specified.
    '..' is processed by removing the immediately previous pathname component
    back to a slash or the beginning of DIR.
    
    Exit Status:
    Returns 0 if the directory is changed, and if $PWD is set successfully when
    -P is used; non-zero otherwise.
```

## mkdir

### 1. 用法
```bash
    mkdir [选项]... 目录...
```

### 2. 功能
创建`目录`(如果不存在的话)

### 3. 常用参数
        -m,--mode=模式        设定权限`模式`(类似 chmod),而不是`rwxrwxrwx减umask`

        -p,--parents          递归创建,可以是一个路径名称。此时若路径中的某些目录尚不存在,加上此选项后,系统将自动建立好那些尚不存在的目录,即一次可以建立多个目录; 

        -v,--verbose         每次创建新目录都显示信息

        --help            显示此帮助信息并退出

        --version         输出版本信息并退出
      
### 4. 寻求帮助
- 使用 `mkdir --help` 
- 使用 `man mkdir` 
- 使用 `info mkdir` 

```bash
用法：mkdir [选项]... 目录...
Create the DIRECTORY(ies), if they do not already exist.

必选参数对长短选项同时适用。
  -m, --mode=MODE   set file mode (as in chmod), not a=rwx - umask
  -p, --parents     no error if existing, make parent directories as needed
  -v, --verbose     print a message for each created directory
  -Z                   set SELinux security context of each created directory
                         to the default type
      --context[=CTX]  like -Z, or if CTX is specified then set the SELinux
                         or SMACK security context to CTX
      --help        显示此帮助信息并退出
      --version     显示版本信息并退出
```

## rmdir

### 1. 用法
```bash
rmdir [选项]... 目录...
```

### 2. 功能
删除指定的`空目录`

### 3. 常用参数
    -p                 递归删除目录dirname,当子目录删除后其父目录为空时,也一同被删除。如果整个路径被删除或者由于某种原因保留部分路径,则系统在标准输出上显示相应的信息。 

    -v,--verbose        显示指令执行过程 
    
### 4. 寻求帮助
- 使用 `rmdir --help` 
- 使用 `man rmdir` 
- 使用 `info rmdir` 

```bash
用法：rmdir [选项]... 目录...
删除指定的空目录。

      --ignore-fail-on-non-empty
			忽略仅由目录非空产生的所有错误
  -p, --parents   remove DIRECTORY and its ancestors; e.g., 'rmdir -p a/b/c' is
                    similar to 'rmdir a/b/c a/b a'
  -v, --verbose   output a diagnostic for every directory processed
      --help		显示此帮助信息并退出
      --version		显示版本信息并退出
```

## pwd
### 1. 用法
```bash
pwd [-LP]
```

### 2. 功能
打印当前工作目录的完整路径

### 3. 常用参数
    -p                  显示实际物理路径,而不是符号链接
    -L                  print the value of $PWD if it names the current working directory
    
### 4. 寻求帮助
- 使用 `pwd --help` 
- 使用 `man pwd` 
- 使用 `info pwd` 

```bash
pwd: pwd [-LP]
    Print the name of the current working directory.
    
    Options:
      -L	print the value of $PWD if it names the current working
    		directory
      -P	print the physical directory, without any symbolic links
    
    By default, `pwd' behaves as if `-L' were specified.
    
    Exit Status:
    Returns 0 unless an invalid option is given or the current directory
    cannot be read.
```