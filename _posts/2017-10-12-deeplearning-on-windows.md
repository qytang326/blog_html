---
layout:         post
title:          "这是一份你们需要的Windows版深度学习软件安装指南"
subtitle:       "选自Github 机器之心编译"
date:           2017-10-12 21:00
lastMod:        2017-10-14 01:00
author:         "Quanyin Tang"
author_homepage: https://quanyin.eu.org
header-img:     "/Source/images/background/post-bg-default.jpg"
description:    "本文从最基本的依赖项开始,依次配置了 VS 2015、Anaconda 4.4.0、CUDA 8.0.61 和 cuDNN v5.1 等基本环境,然后再从 Keras 出发安装 Theano、TensorFlow 和 CNTK 以作为其后端.在完成配置深度学习框架后,本文分别利用这三个框架作为 Keras 后端在 CPU 和 GPU 上训练了一个标准的卷积神经网络,完成该简单的卷积网络也就意味着我们完成了深度学习环境的配置."
catalog:        true
mathjax:        false
categories:     [编程,笔记]
tags:           [Deep-Learning,Python]
---

> 本文经机器之心(微信公众号:almosthuman2014)授权转载,禁止二次转载.本文由机器之心编译,蒋思源、刘晓坤参与.


> 本文从最基本的依赖项开始,依次配置了 VS 2015、Anaconda 4.4.0、CUDA 8.0.61 和 cuDNN v5.1 等基本环境,然后再从 Keras 出发安装 Theano、TensorFlow 和 CNTK 以作为其后端.在完成配置深度学习框架后,本文分别利用这三个框架作为 Keras 后端在 CPU 和 GPU 上训练了一个标准的卷积神经网络,完成该简单的卷积网络也就意味着我们完成了深度学习环境的配置.

- [从零开始:深度学习软件环境安装指南](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&amp;mid=2650731550&amp;idx=1&amp;sn=0ad49b4f74046456d806655b36659ba8&amp;chksm=871b3060b06cb9761b6016c083413d33ec5333fd520deb1264aca45f469f1125d381376cf973&scene=21##wechat_redirect)(Ubuntu)
- 本文GitHub地址:[https://github.com/philferriere/dlwin](https://github.com/philferriere/dlwin)

该配置版本最后更新的日期是今年七月,该更新版本允许本地使用 3 个不同的 GPU 加速后端,并添加对 MKL BLAS 库的支持.

目前有很多帮助我们在 Linux 或 Mac OS 上构建深度学习(DL)环境的指导文章,但很少有文章完整地叙述如何高效地在 Windows 10 上配置深度学习开发环境.此外,很多开发者安装 Windows 和 Ubuntu 双系统或在 Windows 上安装虚拟机以配置深度学习环境,但对于入门者来说,我们更希望还是直接使用 Windows 直接配置深度学习环境.因此,本文作者 Phil Ferriere 在 GitHub 上发布了该教程,他希望能从最基本的环境变量配置开始一步步搭建 Keras 深度学习开发环境.

如果读者希望在 Windows 10 上配置深度学习环境,那么本文将为大家提供很多有利的信息.
## 依赖项
下面是我们将在 Windows 10(Version 1607 OS Build 14393.222)上配置深度学习环境所需要的工具和软件包:
1. Visual Studio 2015 Community Edition Update 3 w. Windows Kit 10.0.10240.0:用于其 C/C++编译器(而不是 IDE)和 SDK,选择该确定的版本是因为 CUDA 8.0.61 所支持的 Windows 编译器.

2. Anaconda (64-bit) w. Python 3.6 (Anaconda3-4.4.0) [for Tensorflow support] or Python 2.7 (Anaconda2-4.4.0) [no Tensorflow support] with MKL:Anaconda 是一个开源的 Python 发行版本,其包含了 conda、Python、NumPy、SciPy 等 180 多个科学包及其依赖项,是一个集成开发环境.MKL 可以利用 CPU 加速许多线性代数运算.

3. CUDA 8.0.61 (64-bit):CUDA 是一种由 NVIDIA 推出的通用并行计算架构,该架构使 GPU 能够解决复杂的计算问题,该软件包能提供 GPU 数学库、显卡驱动和 CUDA 编译器等.

4. cuDNN v5.1 (Jan 20, 2017) for CUDA 8.0:用于加速卷积神经网络的运算.

5. Keras 2.0.5 with three different backends: Theano 0.9.0, Tensorflow-gpu 1.2.0, and CNTK 2.0:Keras 以 Theano、Tensorflow 或 CNTK 等框架为后端,并提供深度学习高级 API.使用不同的后端在张量数学计算等方面会有不同的效果

## 硬件

1. Dell Precision T7900, 64GB RAM
   - Intel Xeon E5-2630 v4 @ 2.20 GHz (1 processor, 10 cores total, 20 logical processors)
2. NVIDIA GeForce Titan X, 12GB RAM
   - Driver version: 372.90 / Win 10 64

## 安装步骤

我们可能喜欢让所有的工具包和软件包在一个根目录下(如 `e:\toolkits.win`),所以在下文只要看到以`e:\toolkits.win`开头的路径,那么我们可能就需要小心不要覆盖或随意更改必要的软件包目录.

### Visual Studio 2015 Community Edition Update 3 w. Windows Kit 10.0.10240.0

下载 [Visual Studio Community 2015 with Update 3 (x86)](https://www.visualstudio.com/vs/older-downloads). 
> Note that for downloading, a free [Visual Studio Dev Essentials](https://www.visualstudio.com/dev-essentials/) 
license or a full Visual Studio Subscription is required.

运行下载的软件包以安装 Visual Studio,可能我们还需要做一些额外的配置:

![](/Source/images/post-content/deeplearning-on-windows/vs2015-install-part1-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/vs2015-install-part2-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/vs2015-install-part3b-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/vs2015-install-part4b-2016-10.png)

1. 基于我们安装 VS 2015 的地址,需要将 `C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\bin` 到 `PATH` 中.
2. 定义系统环境变量(sysenv variable) `INCLUDE` 的值为:
```
    C:\Program Files (x86)\Windows Kits\10\Include\10.0.10240.0\ucrt
```
3. 定义系统环境变量 `LIB` 的值为:
```
    C:\Program Files (x86)\Windows Kits\10\Lib\10.0.10240.0\um\x64;C:\Program Files (x86)\Windows Kits\10\Lib\10.0.10240.0\ucrt\x64
```

> Reference Note: We couldn't run any Theano python files until we added the last two env variables above. 
We would get a `c:\program files (x86)\microsoft visual studio 14.0\vc\include\crtdefs.h(10): fatal error C1083: Cannot open include file: 'corecrt.h': No such file or directory` error at compile time and missing `kernel32.lib uuid.lib ucrt.lib` errors at link time. True, you could probably run `C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\bin\amd64\vcvars64.bat` (with proper params) every single time you open a MINGW cmd prompt, but, obviously, none of the sysenv vars would stick from one session to the next.

### Anaconda 4.4.0 (64-bit) (Python 3.6 TF support / Python 2.7 no TF support))

  本教程最初使用的是 Python 2.7,而随着 TensorFlow 可作为 Keras 的后端,我们决定使用 Python 3.6 作为默认配置.因此,根据我们配置的偏好,可以设置 e:\toolkits.win\anaconda3-4.4.0 或 e:\toolkits.win\anaconda2-4.4.0 为安装 Anaconda 的文件夹名.

- 下载 Python 3.6 版本的Anaconda [here](https://repo.continuum.io/archive/Anaconda3-4.4.0-Windows-x86_64.exe) 

![](/Source/images/post-content/deeplearning-on-windows/anaconda-4.4.0-download-2017-07.png)

- 运行安装程序完成安装Anaconda:

![](/Source/images/post-content/deeplearning-on-windows/anaconda-4.4.0-setup1-2017-07.jpg)
![](/Source/images/post-content/deeplearning-on-windows/anaconda-4.4.0-setup2-2017-07.jpg)
 
> 如图,本教程选择了 `Advanced Options` 的第二个选项,但不一定是最好的.

![](/Source/images/post-content/deeplearning-on-windows/anaconda-4.4.0-setup3-2017-07.jpg)

- 定义一下变量并更新 `PATH`:

1. 定义系统环境(sysenv variable)变量 `PYTHON_HOME` 的值为 `e:\toolkits.win\anaconda3-4.4.0`
2. 添加 `%PYTHON_HOME%`, `%PYTHON_HOME%\Scripts`, 和 `%PYTHON_HOME%\Library\bin` 到 `PATH` 中去.

#### 创建 `dlwin36` conda 环境

在安装 Anaconda 后,打开 Windows 命令窗口并执行:

```bash
##使用以下命令行创建环境
$ conda create --yes -n dlwin36 numpy scipy mkl-service m2w64-toolchain libpython jupyter
Fetching package metadata ...........
Solving package specifications: .

Package plan for installation in environment e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36:

The following NEW packages will be INSTALLED:

    bleach:                         1.5.0-py36_0
    colorama:                       0.3.9-py36_0
    decorator:                      4.0.11-py36_0
    entrypoints:                    0.2.2-py36_1
    html5lib:                       0.999-py36_0
    icu:                            57.1-vc14_0          [vc14]
    ipykernel:                      4.6.1-py36_0
    ipython:                        6.1.0-py36_0
    ipython_genutils:               0.2.0-py36_0
    ipywidgets:                     6.0.0-py36_0
    jedi:                           0.10.2-py36_2
    jinja2:                         2.9.6-py36_0
    jpeg:                           9b-vc14_0            [vc14]
    jsonschema:                     2.6.0-py36_0
    jupyter:                        1.0.0-py36_3
    jupyter_client:                 5.1.0-py36_0
    jupyter_console:                5.1.0-py36_0
    jupyter_core:                   4.3.0-py36_0
    libpng:                         1.6.27-vc14_0        [vc14]
    libpython:                      2.0-py36_0
    m2w64-binutils:                 2.25.1-5
    m2w64-bzip2:                    1.0.6-6
    m2w64-crt-git:                  5.0.0.4636.2595836-2
    m2w64-gcc:                      5.3.0-6
    m2w64-gcc-ada:                  5.3.0-6
    m2w64-gcc-fortran:              5.3.0-6
    m2w64-gcc-libgfortran:          5.3.0-6
    m2w64-gcc-libs:                 5.3.0-7
    m2w64-gcc-libs-core:            5.3.0-7
    m2w64-gcc-objc:                 5.3.0-6
    m2w64-gmp:                      6.1.0-2
    m2w64-headers-git:              5.0.0.4636.c0ad18a-2
    m2w64-isl:                      0.16.1-2
    m2w64-libiconv:                 1.14-6
    m2w64-libmangle-git:            5.0.0.4509.2e5a9a2-2
    m2w64-libwinpthread-git:        5.0.0.4634.697f757-2
    m2w64-make:                     4.1.2351.a80a8b8-2
    m2w64-mpc:                      1.0.3-3
    m2w64-mpfr:                     3.1.4-4
    m2w64-pkg-config:               0.29.1-2
    m2w64-toolchain:                5.3.0-7
    m2w64-tools-git:                5.0.0.4592.90b8472-2
    m2w64-windows-default-manifest: 6.4-3
    m2w64-winpthreads-git:          5.0.0.4634.697f757-2
    m2w64-zlib:                     1.2.8-10
    markupsafe:                     0.23-py36_2
    mistune:                        0.7.4-py36_0
    mkl:                            2017.0.3-0
    mkl-service:                    1.1.2-py36_3
    msys2-conda-epoch:              20160418-1
    nbconvert:                      5.2.1-py36_0
    nbformat:                       4.3.0-py36_0
    notebook:                       5.0.0-py36_0
    numpy:                          1.13.0-py36_0
    openssl:                        1.0.2l-vc14_0        [vc14]
    pandocfilters:                  1.4.1-py36_0
    path.py:                        10.3.1-py36_0
    pickleshare:                    0.7.4-py36_0
    pip:                            9.0.1-py36_1
    prompt_toolkit:                 1.0.14-py36_0
    pygments:                       2.2.0-py36_0
    pyqt:                           5.6.0-py36_2
    python:                         3.6.1-2
    python-dateutil:                2.6.0-py36_0
    pyzmq:                          16.0.2-py36_0
    qt:                             5.6.2-vc14_5         [vc14]
    qtconsole:                      4.3.0-py36_0
    scipy:                          0.19.1-np113py36_0
    setuptools:                     27.2.0-py36_1
    simplegeneric:                  0.8.1-py36_1
    sip:                            4.18-py36_0
    six:                            1.10.0-py36_0
    testpath:                       0.3.1-py36_0
    tornado:                        4.5.1-py36_0
    traitlets:                      4.3.2-py36_0
    vs2015_runtime:                 14.0.25420-0
    wcwidth:                        0.1.7-py36_0
    wheel:                          0.29.0-py36_0
    widgetsnbextension:             2.0.0-py36_0
    zlib:                           1.2.8-vc14_3         [vc14]

INFO menuinst_win32:__init__(182): Menu: name: 'Anaconda${PY_VER} ${PLATFORM}', prefix: 'e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36', env_name: 'dlwin36', mode: 'None', used_mode: 'system'
INFO menuinst_win32:__init__(182): Menu: name: 'Anaconda${PY_VER} ${PLATFORM}', prefix: 'e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36', env_name: 'dlwin36', mode: 'None', used_mode: 'system'
INFO menuinst_win32:__init__(182): Menu: name: 'Anaconda${PY_VER} ${PLATFORM}', prefix: 'e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36', env_name: 'dlwin36', mode: 'None', used_mode: 'system'
##
## 使用以下命令行激活环境:
## > activate dlwin36
##
## 使用以下命令行关闭环境:
## > deactivate dlwin36
##
## * for power-users using bash, you must source
##
```
如上所示,使用 active dlwin36 命令激活这个新的环境.如果已经有了旧的 dlwin36 环境,可以先用 conda env remove -n dlwin36 命令删除.既然打算使用 GPU,为什么还要安装 CPU 优化的线性代数库如 MKL 呢?
在我们的设置中,大多数深度学习都是由 GPU 承担的,这并没错,但 CPU 也不是无所事事.基于图像的 Kaggle 竞赛一个重要部分是数据增强.如此看来,数据增强是通过转换原始训练样本(利用图像处理算子)获得额
外输入样本(即更多的训练图像)的过程.基本的转换比如下采样和均值归 0 的归一化也是必需的.如果你觉得这样太冒险,可以试试额外的预处理增强(噪声消除、直方图均化等等).当然也可以用 GPU 处理并把结果
保存到文件中.然而在实践过程中,这些计算通常都是在 CPU 上平行执行的,而 GPU 正忙于学习深度神经网络的权重,况且增强数据是用完即弃的.因此,我们强烈推荐安装 MKL,而 Theanos 用 BLAS 库更好.

### CUDA 8.0.61 (64-bit)
从[英伟达网站](https://developer.nvidia.com/cuda-downloads)下载 CUDA 8.0 (64-bit): [https://developer.nvidia.com/cuda-downloads](https://developer.nvidia.com/cuda-downloads)

- 选择合适的操作系统:

![](/Source/images/post-content/deeplearning-on-windows/cuda8-downloads-win10a-2016-10.png)

- 下载安装包

![](/Source/images/post-content/deeplearning-on-windows/cuda8-downloads-win10b-2017-07.png)

- 运行安装程序,安装在 `e:\toolkits.win\cuda-8.0.61`:

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part1-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part2-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part3-2017-07.png)

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part4-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part5-2016-10.png)

完成安装后,安装包应该创建了一个名为`CUDA_PATH`的系统环境变量(sysenv variable),并且已经添加了`%CUDA_PATH%\bin`和`%CUDA_PATH%\libnvvp`到`PATH`中.检查是否真正添加了,若`CUDA`环境变量因为一些原因出错了,那么完成下面两个步骤:

1. 定义名为 `CUDA_PATH` 的系统环境变量的值为 `e:\toolkits.win\cuda-8.0.61`
2. 添加 `%CUDA_PATH%\bin` 和 `%CUDA_PATH%\libnvvp` 到 `PATH` 中


### cuDNN v5.1 (Jan 20, 2017) for CUDA 8.0

根据英伟达官网```「cuDNN 为标准的运算如前向和反向卷积、池化、归一化和激活层等提供高度调优的实现」```,它是为卷积神经网络和深度学习设计的一款加速方案.

- cuDNN 的下载地址: [https://developer.nvidia.com/rdp/cudnn-download](https://developer.nvidia.com/rdp/cudnn-download)

我们需要选择符合 CUDA 版本和 Window 10 编译器的 cuDNN 软件包,一般来说,cuDNN 5.1 可以支持 CUDA 8.0 和 Windows 10.

![](/Source/images/post-content/deeplearning-on-windows/cudnn-download-2017-07.jpg)

下载的 ZIP 文件包含三个目录 `bin` 、 `include` 、`lib` ,抽取这三个的文件夹到 `%CUDA_PATH%` 中.

### 安装 Keras 2.0.5 和 Theano0.9.0 与 libgpuarray

Why those specific versions? Why not just install the latest bleeding-edge/dev version of  Keras and various backends (Tensorflow, CNTK or Theano)? Simply put, because it makes [reproducible research](https://www.coursera.org/learn/reproducible-research) harder. If your work colleagues or Kaggle teammates install the latest code from the dev branch at a different time than you did, you will most likely be running different code bases on your machines, increasing the odds that even though you're using the same input data (the same random seeds, etc.), you still end up with different results when you shouldn't. For this reason alone, we highly recommend only using point releases, the same one across machines, and always documenting which one you use if you can't just use a setup script.

运行以下命令安装`libgpuarray 0.6.2`,即`Theano 0.9.0`唯一的稳定版:

```bash
(dlwin36) $ conda install pygpu==0.6.2 nose
Fetching package metadata ...........
Solving package specifications: .

Package plan for installation in environment e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36:

The following NEW packages will be INSTALLED:

    libgpuarray: 0.6.2-vc14_0 [vc14]
    nose:        1.3.7-py36_1
    pygpu:       0.6.2-py36_0

Proceed ([y]/n)? y
```

> Note: As was reported by @bonifacio123 and @wpmarinho [here](https://github.com/philferriere/dlwin/issues/40), you may get a `ERROR (theano.gpuarray): Could not initialize pygpu, support disabled` error when using the flags `THEANO_FLAGS_GPU_DNN` with libgpuarray 0.6.2. If using cuDNN is crucial to your experiment, you can try using a more recent version of `libgpuarray` by running the following command instead: `conda install pygpu==0.6.9 nose`, keeping in mind that libgpuarray 0.6.2 is still the only stable version for Theano 0.9.0.
 
输入以下命令安装`Keras`和`Theano`:

```bash
(dlwin36) $ pip install keras==2.0.5
Collecting keras==2.0.5
Requirement already satisfied: six in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages (from keras==2.0.5)
Collecting pyyaml (from keras==2.0.5)
Collecting theano (from keras==2.0.5)
Requirement already satisfied: scipy>=0.14 in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages (from theano->keras==2.0.5)
Requirement already satisfied: numpy>=1.9.1 in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages (from theano->keras==2.0.5)
Installing collected packages: pyyaml, theano, keras
Successfully installed keras-2.0.5 pyyaml-3.12 theano-0.9.0
```

### Installing the CNTK 2.0 backend

安装 CNTK 2.0 后端 
根据 CNTK 安装文档,我们可以使用以下 pip 命令行安装 CNTK [参考文档](https://docs.microsoft.com/en-us/cognitive-toolkit/setup-windows-python):

```bash
(dlwin36) $ pip install https://cntk.ai/PythonWheel/GPU/cntk-2.0-cp36-cp36m-win_amd64.whl
Collecting cntk==2.0 from https://cntk.ai/PythonWheel/GPU/cntk-2.0-cp36-cp36m-win_amd64.whl
  Using cached https://cntk.ai/PythonWheel/GPU/cntk-2.0-cp36-cp36m-win_amd64.whl
Requirement already satisfied: numpy>=1.11 in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages (from cntk==2.0)
Requirement already satisfied: scipy>=0.17 in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages (from cntk==2.0)
Installing collected packages: cntk
Successfully installed cntk-2.0
```

该安装将导致在 conda 环境目录下额外安装 `CUDA` 和 `cuDNN DLLs`:

```bash
(dlwin36) $ cd E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36
(dlwin36) $ dir cu*.dll
 Volume in drive E is datasets
 Volume Serial Number is 1ED0-657B

 Directory of E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36

06/30/2017  02:47 PM        40,744,896 cublas64_80.dll
06/30/2017  02:47 PM           366,016 cudart64_80.dll
06/30/2017  02:47 PM        78,389,760 cudnn64_5.dll
06/30/2017  02:47 PM        47,985,208 curand64_80.dll
06/30/2017  02:47 PM        41,780,280 cusparse64_80.dll
               5 File(s)    209,266,160 bytes
               0 Dir(s)  400,471,019,520 bytes free
```

这个问题并不是因为浪费硬盘空间,而是安装的 `cuDNN` 版本和我们安装在 `c:\toolkits\cuda-8.0.61` 下的 `cuDNN` 版本不同,因为在 `conda` 环境目录下的 `DLL` 将首先加载,所以我们需要这些 `DLL` 移除出 `%PATH%` 目录:

```bash
(dlwin36) $ md discard & move cu*.dll discard
E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\cublas64_80.dll
E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\cudart64_80.dll
E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\cudnn64_5.dll
E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\curand64_80.dll
E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\cusparse64_80.dll
        5 file(s) moved.
```

### 安装 TensorFlow-GPU 1.2.0 后端

运行以下命令行使用 `pip` 安装 `TensorFlow`:

```bash
(dlwin36) $ pip install tensorflow-gpu==1.2.0
Collecting tensorflow-gpu==1.2.0
  Using cached tensorflow_gpu-1.2.0-cp36-cp36m-win_amd64.whl
Requirement already satisfied: bleach==1.5.0 in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages (from tensorflow-gpu==1.2.0)
Requirement already satisfied: numpy>=1.11.0 in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages (from tensorflow-gpu==1.2.0)
Collecting markdown==2.2.0 (from tensorflow-gpu==1.2.0)
Requirement already satisfied: wheel>=0.26 in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages (from tensorflow-gpu==1.2.0)
Collecting protobuf>=3.2.0 (from tensorflow-gpu==1.2.0)
Collecting backports.weakref==1.0rc1 (from tensorflow-gpu==1.2.0)
  Using cached backports.weakref-1.0rc1-py3-none-any.whl
Collecting html5lib==0.9999999 (from tensorflow-gpu==1.2.0)
Collecting werkzeug>=0.11.10 (from tensorflow-gpu==1.2.0)
  Using cached Werkzeug-0.12.2-py2.py3-none-any.whl
Requirement already satisfied: six>=1.10.0 in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages (from tensorflow-gpu==1.2.0)
Requirement already satisfied: setuptools in e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages\setuptools-27.2.0-py3.6.egg (from protobuf>=3.2.0->tensorflow-gpu==1.2.0)
Installing collected packages: markdown, protobuf, backports.weakref, html5lib, werkzeug, tensorflow-gpu
  Found existing installation: html5lib 0.999
    DEPRECATION: Uninstalling a distutils installed project (html5lib) has been deprecated and will be removed in a future version. This is due to the fact that uninstalling a distutils project will only partially uninstall the project.
    Uninstalling html5lib-0.999:
      Successfully uninstalled html5lib-0.999
Successfully installed backports.weakref-1.0rc1 html5lib-0.9999999 markdown-2.2.0 protobuf-3.3.0 tensorflow-gpu-1.2.0 werkzeug-0.12.2
```

### 使用 conda 检查安装的软件包

完成以上安装和配置后,我们应该在 `dlwin36` conda 环境中看到以下软件包列表:

```bash
(dlwin36) $ conda list
## packages in environment at e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36:
##
backports.weakref         1.0rc1                    <pip>
bleach                    1.5.0                    py36_0
cntk                      2.0                       <pip>
colorama                  0.3.9                    py36_0
decorator                 4.0.11                   py36_0
entrypoints               0.2.2                    py36_1
html5lib                  0.999                    py36_0
html5lib                  0.9999999                 <pip>
icu                       57.1                     vc14_0  [vc14]
ipykernel                 4.6.1                    py36_0
ipython                   6.1.0                    py36_0
ipython_genutils          0.2.0                    py36_0
ipywidgets                6.0.0                    py36_0
jedi                      0.10.2                   py36_2
jinja2                    2.9.6                    py36_0
jpeg                      9b                       vc14_0  [vc14]
jsonschema                2.6.0                    py36_0
jupyter                   1.0.0                    py36_3
jupyter_client            5.1.0                    py36_0
jupyter_console           5.1.0                    py36_0
jupyter_core              4.3.0                    py36_0
Keras                     2.0.5                     <pip>
libgpuarray               0.6.2                    vc14_0  [vc14]
libpng                    1.6.27                   vc14_0  [vc14]
libpython                 2.0                      py36_0
m2w64-binutils            2.25.1                        5
m2w64-bzip2               1.0.6                         6
m2w64-crt-git             5.0.0.4636.2595836               2
m2w64-gcc                 5.3.0                         6
m2w64-gcc-ada             5.3.0                         6
m2w64-gcc-fortran         5.3.0                         6
m2w64-gcc-libgfortran     5.3.0                         6
m2w64-gcc-libs            5.3.0                         7
m2w64-gcc-libs-core       5.3.0                         7
m2w64-gcc-objc            5.3.0                         6
m2w64-gmp                 6.1.0                         2
m2w64-headers-git         5.0.0.4636.c0ad18a               2
m2w64-isl                 0.16.1                        2
m2w64-libiconv            1.14                          6
m2w64-libmangle-git       5.0.0.4509.2e5a9a2               2
m2w64-libwinpthread-git   5.0.0.4634.697f757               2
m2w64-make                4.1.2351.a80a8b8               2
m2w64-mpc                 1.0.3                         3
m2w64-mpfr                3.1.4                         4
m2w64-pkg-config          0.29.1                        2
m2w64-toolchain           5.3.0                         7
m2w64-tools-git           5.0.0.4592.90b8472               2
m2w64-windows-default-manifest 6.4                           3
m2w64-winpthreads-git     5.0.0.4634.697f757               2
m2w64-zlib                1.2.8                        10
mako                      1.0.6                    py36_0
Markdown                  2.2.0                     <pip>
markupsafe                0.23                     py36_2
mistune                   0.7.4                    py36_0
mkl                       2017.0.3                      0
mkl-service               1.1.2                    py36_3
msys2-conda-epoch         20160418                      1
nbconvert                 5.2.1                    py36_0
nbformat                  4.3.0                    py36_0
nose                      1.3.7                    py36_1
notebook                  5.0.0                    py36_0
numpy                     1.13.0                   py36_0
openssl                   1.0.2l                   vc14_0  [vc14]
pandocfilters             1.4.1                    py36_0
path.py                   10.3.1                   py36_0
pickleshare               0.7.4                    py36_0
pip                       9.0.1                    py36_1
prompt_toolkit            1.0.14                   py36_0
protobuf                  3.3.0                     <pip>
pygments                  2.2.0                    py36_0
pygpu                     0.6.2                    py36_0
pyqt                      5.6.0                    py36_2
python                    3.6.1                         2
python-dateutil           2.6.0                    py36_0
PyYAML                    3.12                      <pip>
pyzmq                     16.0.2                   py36_0
qt                        5.6.2                    vc14_5  [vc14]
qtconsole                 4.3.0                    py36_0
scipy                     0.19.1              np113py36_0
setuptools                27.2.0                   py36_1
simplegeneric             0.8.1                    py36_1
sip                       4.18                     py36_0
six                       1.10.0                   py36_0
tensorflow-gpu            1.2.0                     <pip>
testpath                  0.3.1                    py36_0
Theano                    0.9.0                     <pip>
tornado                   4.5.1                    py36_0
traitlets                 4.3.2                    py36_0
vs2015_runtime            14.0.25420                    0
wcwidth                   0.1.7                    py36_0
Werkzeug                  0.12.2                    <pip>
wheel                     0.29.0                   py36_0
widgetsnbextension        2.0.0                    py36_0
zlib                      1.2.8                    vc14_3  [vc14]
```

为了快速检查上述三个后端安装的效果,依次运行一下命令行分别检查 `Theano`、`TensorFlow` 和 `CNTK` 导入情况:
```bash
(dlwin36) $ python -c "import theano; print('theano: %s, %s' % (theano.__version__, theano.__file__))"
theano: 0.9.0, E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages\theano\__init__.py
(dlwin36) $ python -c "import pygpu; print('pygpu: %s, %s' % (pygpu.__version__, pygpu.__file__))"
pygpu: 0.6.2, e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages\pygpu\__init__.py
(dlwin36) $ python -c "import tensorflow; print('tensorflow: %s, %s' % (tensorflow.__version__, tensorflow.__file__))"
tensorflow: 1.2.0, E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages\tensorflow\__init__.py
(dlwin36) $ python -c "import cntk; print('cntk: %s, %s' % (cntk.__version__, cntk.__file__))"
cntk: 2.0, E:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages\cntk\__init__.py
```

### 验证 Theano 的安装

因为 `Theano` 是安装 `Keras` 时自动安装的,为了快速地在 `CPU 模式`、`GPU 模式`和`带cuDNN的 GPU 模式`之间转换,我们需要创建以下三个系统环境变量(sysenv variable):

- 系统环境变量 `THEANO_FLAGS_CPU` 的值定义为: `floatX=float32,device=cpu`
- 系统环境变量 `THEANO_FLAGS_GPU` 的值定义为: 
``` 
    floatX=float32,device=cuda0,dnn.enabled=False,gpuarray.preallocate=0.8
```
- 系统环境变量 `THEANO_FLAGS_GPU_DNN` 的值定义为:
```
    floatX=float32,device=cuda0,optimizer_including=cudnn,gpuarray.preallocate=0.8,dnn.conv.algo_bwd_filter=deterministic,dnn.conv.algo_bwd_data=deterministic,dnn.include_path=e:/toolkits.win/cuda-8.0.61/include,dnn.library_path=e:/toolkits.win/cuda-8.0.61/lib/x64
```

现在,我们能直接使用 `THEANO_FLAGS_CPU`、`THEANO_FLAGS_GPU` 或 `THEANO_FLAGS_GPU_DNN` 直接设置 `Theano` 使用 `CPU`、`GPU` 还是 `GPU+cuDNN`.我们可以使用以下命令行验证这些变量是否成功加入环境中:

```bash
(dlwin36) $ set KERAS_BACKEND=theano
(dlwin36) $ set | findstr /i theano
KERAS_BACKEND=theano
THEANO_FLAGS=floatX=float32,device=cuda0,optimizer_including=cudnn,gpuarray.preallocate=0.8,dnn.conv.algo_bwd_filter=deterministic,dnn.conv.algo_bwd_data=deterministic,dnn.include_path=e:/toolkits.win/cuda-8.0.61/include,dnn.library_path=e:/toolkits.win/cuda-8.0.61/lib/x64
THEANO_FLAGS_CPU=floatX=float32,device=cpu
THEANO_FLAGS_GPU=floatX=float32,device=cuda0,dnn.enabled=False,gpuarray.preallocate=0.8
THEANO_FLAGS_GPU_DNN=floatX=float32,device=cuda0,optimizer_including=cudnn,gpuarray.preallocate=0.8,dnn.conv.algo_bwd_filter=deterministic,dnn.conv.algo_bwd_data=deterministic,dnn.include_path=e:/toolkits.win/cuda-8.0.61/include,dnn.library_path=e:/toolkits.win/cuda-8.0.61/lib/x64
```
> Note: For information about the GPU flags above, please refer to the official Theano documentation [here](http://deeplearning.net/software/theano/tutorial/using_gpu.html)

We can now run the following program from the Theano documentation to compare the performance of the GPU install vs using Theano in CPU-mode. Save the code to a file named `cpu_gpu_test.py` in the current directory (or download it from this [GitHub repo](https://github.com/philferriere/dlwin)):

```python
from theano import function, config, shared, tensor
import numpy
import time

vlen = 10 * 30 * 768  ## 10 x ##cores x ## threads per core
iters = 1000

rng = numpy.random.RandomState(22)
x = shared(numpy.asarray(rng.rand(vlen), config.floatX))
f = function([], tensor.exp(x))
print(f.maker.fgraph.toposort())
t0 = time.time()
for i in range(iters):
    r = f()
t1 = time.time()
print("Looping %d times took %f seconds" % (iters, t1 - t0))
print("Result is %s" % (r,))
if numpy.any([isinstance(x.op, tensor.Elemwise) and
              ('Gpu' not in type(x.op).__name__)
              for x in f.maker.fgraph.toposort()]):
    print('Used the cpu')
else:
    print('Used the gpu')
```

First, let's see what kind of results we get running Theano in CPU mode:

```bash
(dlwin36) $ set THEANO_FLAGS=%THEANO_FLAGS_CPU%
(dlwin36) $ python cpu_gpu_test.py
[Elemwise{exp,no_inplace}(<TensorType(float32, vector)>)]
Looping 1000 times took 16.037982 seconds
Result is [ 1.23178029  1.61879337  1.52278066 ...,  2.20771813  2.29967761
  1.62323284]
Used the cpu
```

> Note: If you get a failure of the kind `NameError: global name 'CVM' is not defined`, it may be because, like us, you've messed with the value of `THEANO_FLAGS_CPU` and switched back and forth between `floatX=float32` and `floatX=float64` several times. Cleaning your `C:\Users\username\AppData\Local\Theano` directory (replace username with your login name) will fix the problem (See [here](https://groups.google.com/forum/##!msg/theano-users/JoTu61_MTLk/4ZzsVyaOf2kJ), for reference)

Next, let's run the same program on the GPU:

```bash
(dlwin36) $ set THEANO_FLAGS=%THEANO_FLAGS_GPU%
(dlwin36) $ python cpu_gpu_test.py
Can not use cuDNN on context None: Disabled by dnn.enabled flag
Preallocating 9830/12288 Mb (0.800000) on cuda0
Mapped name None to device cuda0: GeForce GTX TITAN X (0000:03:00.0)
[GpuElemwise{exp,no_inplace}(<GpuArrayType<None>(float32, (False,))>), HostFromGpu(gpuarray)(GpuElemwise{exp,no_inplace}.0)]
Looping 1000 times took 0.293377 seconds
Result is [ 1.23178029  1.61879349  1.52278066 ...,  2.20771813  2.29967761
  1.62323296]
Used the gpu
```

> Note: If you get a `c:\program files (x86)\microsoft visual studio 14.0\vc\include\crtdefs.h(10): fatal error C1083: Cannot open include file: 'corecrt.h': No such file or directory` with the above, please see the Reference Note at the end of the `Visual Studio 2015 Community Edition Update 3` section.

Almost **a 55:1 improvement**!. Finally, let's make sure we can also use Theano in GPU mode with cuDNN:

```bash
(dlwin36) $ set THEANO_FLAGS=%THEANO_FLAGS_GPU_DNN%
(dlwin36) $ python cpu_gpu_test.py
Using cuDNN version 5110 on context None
Preallocating 9830/12288 Mb (0.800000) on cuda0
Mapped name None to device cuda0: GeForce GTX TITAN X (0000:03:00.0)
[GpuElemwise{exp,no_inplace}(<GpuArrayType<None>(float32, (False,))>), HostFromGpu(gpuarray)(GpuElemwise{exp,no_inplace}.0)]
Looping 1000 times took 0.269696 seconds
Result is [ 1.23178029  1.61879349  1.52278066 ...,  2.20771813  2.29967761
  1.62323296]
Used the gpu
```
> Note: If you get a `cuDNN not available` message after this, try cleaning your `%USERPROFILE%\AppData\Local\Theano` directory. If you get an error similar to `cudnn error: Mixed dnn version. The header is from one version, but we link with a different version (5010, 5005)`, try cuDNN v5.0 instead of cuDNN v5.1. Windows will sometimes also helpfully block foreign `.dll` files from running on your computer. If that is the case, right click and unblock the files to allow them to be used.

### 检查系统环境变量

现在,不论 `dlwin36` conda 环境什么时候激活,`PATH` 环境变量应该需要看起来如下面列表一样:

```bash
e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36;
e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\Library\mingw-w64\bin;
e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\Library\usr\bin;
e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\Library\bin;
e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\Scripts;
e:\toolkits.win\anaconda3-4.4.0;
e:\toolkits.win\anaconda3-4.4.0\Scripts;
e:\toolkits.win\anaconda3-4.4.0\Library\bin;
e:\toolkits.win\cuda-8.0.61\bin;
e:\toolkits.win\cuda-8.0.61\libnvvp;
C:\ProgramData\Oracle\Java\javapath;
C:\WINDOWS\system32;
C:\WINDOWS;C:\WINDOWS\System32\Wbem;
C:\WINDOWS\System32\WindowsPowerShell\v1.0\;
C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;
C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\bin;
C:\Program Files\Git\cmd;
C:\Program Files\Git\mingw64\bin;
C:\Program Files\Git\usr\bin;
C:\Program Files (x86)\Windows Kits\10\Windows Performance Toolkit\;
...
```

### 使用 Keras 验证 GPU+cuDNN 的安装

我们可以使用 `Keras` 在 `MNIST` 数据集上训练简单的卷积神经网络([convolutional neural network](https://en.wikipedia.org/wiki/Convolutional_neural_network))来验证 GPU 的 cuDNN 是否正确安装,该文件名为 `mnist_cnn.py`,其可以在 `Keras` [案例](https://github.com/fchollet/keras/blob/2.0.5/examples/mnist_cnn.py)中找到.该卷积神经网络的代码如下:

```python
'''Trains a simple convnet on the MNIST dataset.

Gets to 99.25% test accuracy after 12 epochs
(there is still a lot of margin for parameter tuning).
16 seconds per epoch on a GRID K520 GPU.
'''

from __future__ import print_function
import keras
from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras import backend as K

batch_size = 128
num_classes = 10
epochs = 12

## input image dimensions
img_rows, img_cols = 28, 28

## the data, shuffled and split between train and test sets
(x_train, y_train), (x_test, y_test) = mnist.load_data()

if K.image_data_format() == 'channels_first':
    x_train = x_train.reshape(x_train.shape[0], 1, img_rows, img_cols)
    x_test = x_test.reshape(x_test.shape[0], 1, img_rows, img_cols)
    input_shape = (1, img_rows, img_cols)
else:
    x_train = x_train.reshape(x_train.shape[0], img_rows, img_cols, 1)
    x_test = x_test.reshape(x_test.shape[0], img_rows, img_cols, 1)
    input_shape = (img_rows, img_cols, 1)

x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255
print('x_train shape:', x_train.shape)
print(x_train.shape[0], 'train samples')
print(x_test.shape[0], 'test samples')

## convert class vectors to binary class matrices
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

model = Sequential()
model.add(Conv2D(32, kernel_size=(3, 3),
                 activation='relu',
                 input_shape=input_shape))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(num_classes, activation='softmax'))

model.compile(loss=keras.losses.categorical_crossentropy,
              optimizer=keras.optimizers.Adadelta(),
              metrics=['accuracy'])

model.fit(x_train, y_train,
          batch_size=batch_size,
          epochs=epochs,
          verbose=1,
          validation_data=(x_test, y_test))
score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])
```

#### 1.使用带 Theano 后端的 Keras

J为了有一个能进行对比的基线模型,首先我们使用 Theano 后端和 CPU 训练简单的卷积神经网络:
```bash
(dlwin36) $ set KERAS_BACKEND=theano
(dlwin36) $ set THEANO_FLAGS=%THEANO_FLAGS_CPU%
(dlwin36) $ python mnist_cnn.py
Using Theano backend.
x_train shape: (60000, 28, 28, 1)
60000 train samples
10000 test samples
Train on 60000 samples, validate on 10000 samples
Epoch 1/12
60000/60000 [==============================] - 233s - loss: 0.3344 - acc: 0.8972 - val_loss: 0.0743 - val_acc: 0.9777
Epoch 2/12
60000/60000 [==============================] - 234s - loss: 0.1106 - acc: 0.9674 - val_loss: 0.0504 - val_acc: 0.9837
Epoch 3/12
60000/60000 [==============================] - 237s - loss: 0.0865 - acc: 0.9741 - val_loss: 0.0402 - val_acc: 0.9865
Epoch 4/12
60000/60000 [==============================] - 238s - loss: 0.0692 - acc: 0.9792 - val_loss: 0.0362 - val_acc: 0.9874
Epoch 5/12
60000/60000 [==============================] - 241s - loss: 0.0614 - acc: 0.9821 - val_loss: 0.0370 - val_acc: 0.9879
Epoch 6/12
60000/60000 [==============================] - 245s - loss: 0.0547 - acc: 0.9839 - val_loss: 0.0319 - val_acc: 0.9885
Epoch 7/12
60000/60000 [==============================] - 248s - loss: 0.0517 - acc: 0.9840 - val_loss: 0.0293 - val_acc: 0.9900
Epoch 8/12
60000/60000 [==============================] - 256s - loss: 0.0465 - acc: 0.9863 - val_loss: 0.0294 - val_acc: 0.9905
Epoch 9/12
60000/60000 [==============================] - 264s - loss: 0.0422 - acc: 0.9870 - val_loss: 0.0276 - val_acc: 0.9902
Epoch 10/12
60000/60000 [==============================] - 263s - loss: 0.0423 - acc: 0.9875 - val_loss: 0.0287 - val_acc: 0.9902
Epoch 11/12
60000/60000 [==============================] - 262s - loss: 0.0389 - acc: 0.9884 - val_loss: 0.0291 - val_acc: 0.9898
Epoch 12/12
60000/60000 [==============================] - 270s - loss: 0.0377 - acc: 0.9885 - val_loss: 0.0272 - val_acc: 0.9910
Test loss: 0.0271551907005
Test accuracy: 0.991
```

我们现在使用以下命令行利用带 Theano 的后端的 Keras 在 GPU 和 cuDNN 环境下训练卷积神经网络:
```bash
(dlwin36) $ set THEANO_FLAGS=%THEANO_FLAGS_GPU%
(dlwin36) $ python mnist_cnn.py
Using Theano backend.
Can not use cuDNN on context None: Disabled by dnn.enabled flag
Preallocating 9830/12288 Mb (0.800000) on cuda0
Mapped name None to device cuda0: GeForce GTX TITAN X (0000:03:00.0)
x_train shape: (60000, 28, 28, 1)
60000 train samples
10000 test samples
Train on 60000 samples, validate on 10000 samples
Epoch 1/12
60000/60000 [==============================] - 48s - loss: 0.3258 - acc: 0.9023 - val_loss: 0.0752 - val_acc: 0.9761
Epoch 2/12
60000/60000 [==============================] - 47s - loss: 0.1108 - acc: 0.9669 - val_loss: 0.0511 - val_acc: 0.9833
Epoch 3/12
60000/60000 [==============================] - 47s - loss: 0.0862 - acc: 0.9743 - val_loss: 0.0438 - val_acc: 0.9845
Epoch 4/12
60000/60000 [==============================] - 47s - loss: 0.0726 - acc: 0.9786 - val_loss: 0.0422 - val_acc: 0.9860
Epoch 5/12
60000/60000 [==============================] - 47s - loss: 0.0621 - acc: 0.9818 - val_loss: 0.0351 - val_acc: 0.9885
Epoch 6/12
60000/60000 [==============================] - 47s - loss: 0.0575 - acc: 0.9828 - val_loss: 0.0346 - val_acc: 0.9878
Epoch 7/12
60000/60000 [==============================] - 47s - loss: 0.0523 - acc: 0.9843 - val_loss: 0.0325 - val_acc: 0.9894
Epoch 8/12
60000/60000 [==============================] - 47s - loss: 0.0478 - acc: 0.9861 - val_loss: 0.0313 - val_acc: 0.9894
Epoch 9/12
60000/60000 [==============================] - 47s - loss: 0.0444 - acc: 0.9869 - val_loss: 0.0286 - val_acc: 0.9906
Epoch 10/12
60000/60000 [==============================] - 47s - loss: 0.0412 - acc: 0.9879 - val_loss: 0.0287 - val_acc: 0.9904
Epoch 11/12
60000/60000 [==============================] - 47s - loss: 0.0393 - acc: 0.9885 - val_loss: 0.0286 - val_acc: 0.9904
Epoch 12/12
60000/60000 [==============================] - 47s - loss: 0.0367 - acc: 0.9885 - val_loss: 0.0271 - val_acc: 0.9919
Test loss: 0.0271264006825
Test accuracy: 0.9919
```
That is quite an improvement over the CPU-only version already. Without cuDNN, each epoch takes about 47s on this particular machine. If you install [TechPowerUp's GPU-Z](https://www.techpowerup.com/downloads/SysInfo/GPU-Z/), you can track how well the GPU is being leveraged. Here, in the case of this convnet (no cuDNN), we max out at 97% GPU usage on average:

![](/Source/images/post-content/deeplearning-on-windows/mnist_cnn_gpu_usage_theano-2017-07.png)

 Finally, use the following commands to train the convnet using the Theano backend in GPU mode with cuDNN:
```bash
(dlwin36) $ set THEANO_FLAGS=%THEANO_FLAGS_GPU_DNN%
(dlwin36) $ python mnist_cnn.py
Using Theano backend.
Using cuDNN version 5110 on context None
Preallocating 9830/12288 Mb (0.800000) on cuda0
Mapped name None to device cuda0: GeForce GTX TITAN X (0000:03:00.0)
x_train shape: (60000, 28, 28, 1)
60000 train samples
10000 test samples
Train on 60000 samples, validate on 10000 samples
Epoch 1/12
60000/60000 [==============================] - 17s - loss: 0.3219 - acc: 0.9003 - val_loss: 0.0774 - val_acc: 0.9743
Epoch 2/12
60000/60000 [==============================] - 16s - loss: 0.1108 - acc: 0.9674 - val_loss: 0.0536 - val_acc: 0.9822
Epoch 3/12
60000/60000 [==============================] - 16s - loss: 0.0832 - acc: 0.9766 - val_loss: 0.0434 - val_acc: 0.9862
Epoch 4/12
60000/60000 [==============================] - 16s - loss: 0.0694 - acc: 0.9795 - val_loss: 0.0382 - val_acc: 0.9876
Epoch 5/12
60000/60000 [==============================] - 16s - loss: 0.0605 - acc: 0.9819 - val_loss: 0.0353 - val_acc: 0.9884
Epoch 6/12
60000/60000 [==============================] - 16s - loss: 0.0533 - acc: 0.9836 - val_loss: 0.0360 - val_acc: 0.9883
Epoch 7/12
60000/60000 [==============================] - 16s - loss: 0.0482 - acc: 0.9859 - val_loss: 0.0305 - val_acc: 0.9897
Epoch 8/12
60000/60000 [==============================] - 16s - loss: 0.0452 - acc: 0.9865 - val_loss: 0.0295 - val_acc: 0.9911
Epoch 9/12
60000/60000 [==============================] - 16s - loss: 0.0414 - acc: 0.9878 - val_loss: 0.0315 - val_acc: 0.9898
Epoch 10/12
60000/60000 [==============================] - 16s - loss: 0.0386 - acc: 0.9886 - val_loss: 0.0282 - val_acc: 0.9911
Epoch 11/12
60000/60000 [==============================] - 16s - loss: 0.0378 - acc: 0.9887 - val_loss: 0.0306 - val_acc: 0.9904
Epoch 12/12
60000/60000 [==============================] - 16s - loss: 0.0354 - acc: 0.9893 - val_loss: 0.0296 - val_acc: 0.9898
Test loss: 0.0296215178292
Test accuracy: 0.9898
```

An even bigger speed improvement, at about the same GPU usage:

![](/Source/images/post-content/deeplearning-on-windows/mnist_cnn_gpu_cudnn_usage_theano-2017-07.png)

#### 2. 使用 TensorFlow 后端的 Keras

为了激活和测试 TensorFlow 后端,我们需要使用以下命令行:
```bash
(dlwin36) $ set KERAS_BACKEND=tensorflow
(dlwin36) $ python mnist_cnn.py
Using TensorFlow backend.
x_train shape: (60000, 28, 28, 1)
60000 train samples
10000 test samples
Train on 60000 samples, validate on 10000 samples
Epoch 1/12
2017-06-30 12:49:22.005585: W c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\platform\cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE instructions, but these are available on your machine and could speed up CPU computations.
2017-06-30 12:49:22.005767: W c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\platform\cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE2 instructions, but these are available on your machine and could speed up CPU computations.
2017-06-30 12:49:22.005996: W c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\platform\cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE3 instructions, but these are available on your machine and could speed up CPU computations.
2017-06-30 12:49:22.006181: W c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\platform\cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE4.1 instructions, but these are available on your machine and could speed up CPU computations.
2017-06-30 12:49:22.006361: W c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\platform\cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE4.2 instructions, but these are available on your machine and could speed up CPU computations.
2017-06-30 12:49:22.006539: W c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\platform\cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use AVX instructions, but these are available on your machine and could speed up CPU computations.
2017-06-30 12:49:22.006717: W c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\platform\cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use AVX2 instructions, but these are available on your machine and could speed up CPU computations.
2017-06-30 12:49:22.006897: W c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\platform\cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use FMA instructions, but these are available on your machine and could speed up CPU computations.
2017-06-30 12:49:22.453483: I c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\common_runtime\gpu\gpu_device.cc:940] Found device 0 with properties:
name: GeForce GTX TITAN X
major: 5 minor: 2 memoryClockRate (GHz) 1.076
pciBusID 0000:03:00.0
Total memory: 12.00GiB
Free memory: 10.06GiB
2017-06-30 12:49:22.454375: I c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\common_runtime\gpu\gpu_device.cc:961] DMA: 0
2017-06-30 12:49:22.454489: I c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\common_runtime\gpu\gpu_device.cc:971] 0:   Y
2017-06-30 12:49:22.454624: I c:\tf_jenkins\home\workspace\release-win\m\windows-gpu\py\36\tensorflow\core\common_runtime\gpu\gpu_device.cc:1030] Creating TensorFlow device (/gpu:0) -> (device: 0, name: GeForce G
TX TITAN X, pci bus id: 0000:03:00.0)
60000/60000 [==============================] - 8s - loss: 0.3355 - acc: 0.8979 - val_loss: 0.0749 - val_acc: 0.9760
Epoch 2/12
60000/60000 [==============================] - 5s - loss: 0.1134 - acc: 0.9667 - val_loss: 0.0521 - val_acc: 0.9825
Epoch 3/12
60000/60000 [==============================] - 5s - loss: 0.0863 - acc: 0.9745 - val_loss: 0.0436 - val_acc: 0.9854
Epoch 4/12
60000/60000 [==============================] - 5s - loss: 0.0722 - acc: 0.9787 - val_loss: 0.0381 - val_acc: 0.9872
Epoch 5/12
60000/60000 [==============================] - 5s - loss: 0.0636 - acc: 0.9811 - val_loss: 0.0339 - val_acc: 0.9880
Epoch 6/12
60000/60000 [==============================] - 5s - loss: 0.0552 - acc: 0.9838 - val_loss: 0.0328 - val_acc: 0.9888
Epoch 7/12
60000/60000 [==============================] - 5s - loss: 0.0515 - acc: 0.9851 - val_loss: 0.0318 - val_acc: 0.9893
Epoch 8/12
60000/60000 [==============================] - 5s - loss: 0.0479 - acc: 0.9862 - val_loss: 0.0311 - val_acc: 0.9891
Epoch 9/12
60000/60000 [==============================] - 5s - loss: 0.0441 - acc: 0.9870 - val_loss: 0.0310 - val_acc: 0.9898
Epoch 10/12
60000/60000 [==============================] - 5s - loss: 0.0407 - acc: 0.9871 - val_loss: 0.0302 - val_acc: 0.9903
Epoch 11/12
60000/60000 [==============================] - 5s - loss: 0.0405 - acc: 0.9877 - val_loss: 0.0309 - val_acc: 0.9892
Epoch 12/12
60000/60000 [==============================] - 5s - loss: 0.0373 - acc: 0.9886 - val_loss: 0.0309 - val_acc: 0.9898
Test loss: 0.0308696583555
Test accuracy: 0.9898
```
> Note: The warnings at the beginning are annoying, but so far there is [no supported way](https://www.tensorflow.org/install/install_sources) of building Tensorflow on Windows with those optimizations, so we have to stay put and simply ignore them. Hopefully that will be [fixed](https://github.com/tensorflow/tensorflow/issues/7778) [soon](https://github.com/tensorflow/tensorflow/issues/7257) so people don't have to [build Tensorflow](https://github.com/tensorflow/tensorflow/tree/v1.1.0/tensorflow/contrib/cmake) for [themselves](https://github.com/yaroslavvb/tensorflow-community-wheels) because that's [quite](https://stackoverflow.com/questions/42603407/how-to-compile-tensor-flow-with-sse-and-and-avx-instructions-on-windows?noredirect=1&lq=1) [tricky](https://stackoverflow.com/questions/44071608/compiling-tensorflow-with-cmake-on-windows-fails-with-file-version-info-cc-not-f?noredirect=1&lq=1).

我们看到使用 TensorFlow 后端要比 Theano 后端在该任务上快 3 倍左右,它们都是用了 GPU 和 cuDNN 加速.这可能是因为在该测试中它们有相同的通道等级(channel ordering),但实际上两个平台在这一点是不一样的.因此,程序可能强制 Theano 后端重新排序数据而造成性能上的差异.但在该案例下,TensorFlow 在 GPU 上的负载一直没有超过 70%.

![](/Source/images/post-content/deeplearning-on-windows/mnist_cnn_gpu_cudnn_usage_tensorflow-2017-07.png)

#### 3. 使用 CNTK 后端的 Keras

为了激活和测试 CNTK 后算,我们需要使用以下命令行:
```bash
(dlwin36) $ set KERAS_BACKEND=cntk
(dlwin36) $ python mnist_cnn.py
Using CNTK backend
Selected GPU[0] GeForce GTX TITAN X as the process wide default device.
x_train shape: (60000, 28, 28, 1)
60000 train samples
10000 test samples
Train on 60000 samples, validate on 10000 samples
Epoch 1/12
e:\toolkits.win\anaconda3-4.4.0\envs\dlwin36\lib\site-packages\cntk\core.py:351: UserWarning: your data is of type "float64", but your input variable (uid "Input113") expects "<class 'numpy.float32'>". Please convert your data beforehand to speed up training.
  (sample.dtype, var.uid, str(var.dtype)))
60000/60000 [==============================] - 8s - loss: 0.3275 - acc: 0.8991 - val_loss: 0.0754 - val_acc: 0.9749
Epoch 2/12
60000/60000 [==============================] - 7s - loss: 0.1114 - acc: 0.9662 - val_loss: 0.0513 - val_acc: 0.9841
Epoch 3/12
60000/60000 [==============================] - 7s - loss: 0.0862 - acc: 0.9750 - val_loss: 0.0429 - val_acc: 0.9859
Epoch 4/12
60000/60000 [==============================] - 7s - loss: 0.0721 - acc: 0.9784 - val_loss: 0.0373 - val_acc: 0.9868
Epoch 5/12
60000/60000 [==============================] - 7s - loss: 0.0649 - acc: 0.9803 - val_loss: 0.0339 - val_acc: 0.9878
Epoch 6/12
60000/60000 [==============================] - 8s - loss: 0.0580 - acc: 0.9831 - val_loss: 0.0337 - val_acc: 0.9890
Epoch 7/12
60000/60000 [==============================] - 8s - loss: 0.0529 - acc: 0.9846 - val_loss: 0.0326 - val_acc: 0.9895
Epoch 8/12
60000/60000 [==============================] - 8s - loss: 0.0483 - acc: 0.9858 - val_loss: 0.0307 - val_acc: 0.9897
Epoch 9/12
60000/60000 [==============================] - 8s - loss: 0.0456 - acc: 0.9864 - val_loss: 0.0299 - val_acc: 0.9898
Epoch 10/12
60000/60000 [==============================] - 8s - loss: 0.0407 - acc: 0.9875 - val_loss: 0.0274 - val_acc: 0.9906
Epoch 11/12
60000/60000 [==============================] - 8s - loss: 0.0405 - acc: 0.9883 - val_loss: 0.0276 - val_acc: 0.9904
Epoch 12/12
60000/60000 [==============================] - 8s - loss: 0.0372 - acc: 0.9889 - val_loss: 0.0274 - val_acc: 0.9906
Test loss: 0.0274011099327
Test accuracy: 0.9906
```

在具体的试验中,CNTK 同样也十分快速,并且 GPU 负载达到了 80%.

![](/Source/images/post-content/deeplearning-on-windows/mnist_cnn_gpu_cudnn_usage_cntk-2017-07.png)

## 最后

### 参考

1. [Setup a Deep Learning Environment on Windows (Theano & Keras with GPU Enabled)](https://datanoord.com/2016/02/02/setup-a-deep-learning-environment-on-windows-theano-keras-with-gpu-enabled/), by Ayse Elvan Aydemir
2. [Installation of Theano on Windows](http://deeplearning.net/software/theano_versions/dev/install_windows.html##install-windows), by Theano team
3. [A few tips to install theano on Windows, 64 bits](https://www.kaggle.com/c/otto-group-product-classification-challenge/forums/t/13973/a-few-tips-to-install-theano-on-windows-64-bits), by Kagglers
4. [How do I install Keras and Theano in Anaconda Python 2.7 on Windows?](http://stackoverflow.com/questions/34097988/how-do-i-install-keras-and-theano-in-anaconda-python-2-7-on-windows), by S.O. contributors

### 致谢...

感谢[Alexander Pacha](https://github.com/apacha) 数次更新本教程并且将TensorFlow的内容纳入.
感谢[Kaggler Vincent L.](https://www.kaggle.com/vincentl)建议将`dnn.conv.algo_bwd_filter=deterministic,dnn.conv.algo_bwd_data=deterministic`加入到`THEANO_FLAGS_GPU_DNN`来提升`reproducibility with no observable impact on performance`.

### 推荐阅读

Alec Radford的`利用Python进行深度学习入门`:
- [Introduction to Deep Learning with Python](https://www.youtube.com/watch?v=S75EdAcXHKk)
- [deep-learning-with-python-and-the-theano-library](http://slidesha.re/1zs9M11)
- [Theano-Tutorials](https://github.com/Newmu/Theano-Tutorials)

### 作者信息

- 原文作者详细信息:[![https://www.linkedin.com/in/philferriere](/Source/images/post-content/deeplearning-on-windows/LinkedInDev.png)](https://www.linkedin.com/in/philferriere)
- [机器之心原文链接](http://mp.weixin.qq.com/s/vhBOrR6uTL2vGXnYC8BS1w)

### 补充

严格安装教程来,本人在安装时自作主张的使用了 `CUDA 9.0` ,完全无法使用GPU(TensorFlow-GPU最新版1.4不支持),以及theano的安装好像没有原文那么简单,CNTK可以安装最新版,可以运行.

