---
layout:         post
title:          "这是一份你们需要的Windows版深度学习软件安装指南"
subtitle:       "选自Github 机器之心编译"
date:           2017-10-12 21:00
author:         "Quanyin Tang"
author_homepage: https://quanyin.eu.org
header-img:     "/Source/images/background/post-bg-default.jpg"
description:    "本文从最基本的依赖项开始，依次配置了 VS 2015、Anaconda 4.4.0、CUDA 8.0.61 和 cuDNN v5.1 等基本环境，然后再从 Keras 出发安装 Theano、TensorFlow 和 CNTK 以作为其后端。在完成配置深度学习框架后，本文分别利用这三个框架作为 Keras 后端在 CPU 和 GPU 上训练了一个标准的卷积神经网络，完成该简单的卷积网络也就意味着我们完成了深度学习环境的配置。"
catalog:        true
mathjax:        false
categories:     [Deep-Learning]
tags:           [Deep-Learning]
---

> 本文从最基本的依赖项开始，依次配置了 VS 2015、Anaconda 4.4.0、CUDA 8.0.61 和 cuDNN v5.1 等基本环境，然后再从 Keras 出发安装 Theano、TensorFlow 和 CNTK 以作为其后端。在完成配置深度学习框架后，本文分别利用这三个框架作为 Keras 后端在 CPU 和 GPU 上训练了一个标准的卷积神经网络，完成该简单的卷积网络也就意味着我们完成了深度学习环境的配置。

- [从零开始：深度学习软件环境安装指南](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&amp;mid=2650731550&amp;idx=1&amp;sn=0ad49b4f74046456d806655b36659ba8&amp;chksm=871b3060b06cb9761b6016c083413d33ec5333fd520deb1264aca45f469f1125d381376cf973&scene=21#wechat_redirect)(Ubuntu)
- 本文GitHub地址:https://github.com/philferriere/dlwin

该配置版本最后更新的日期是今年七月，该更新版本允许本地使用 3 个不同的 GPU 加速后端，并添加对 MKL BLAS 库的支持。

目前有很多帮助我们在 Linux 或 Mac OS 上构建深度学习（DL）环境的指导文章，但很少有文章完整地叙述如何高效地在 Windows 10 上配置深度学习开发环境。此外，很多开发者安装 Windows 和 Ubuntu 双系统或在 Windows 上安装虚拟机以配置深度学习环境，但对于入门者来说，我们更希望还是直接使用 Windows 直接配置深度学习环境。因此，本文作者 Phil Ferriere 在 GitHub 上发布了该教程，他希望能从最基本的环境变量配置开始一步步搭建 Keras 深度学习开发环境。

如果读者希望在 Windows 10 上配置深度学习环境，那么本文将为大家提供很多有利的信息。

# Dependencies

下面是我们将在 Windows 10（Version 1607 OS Build 14393.222）上配置深度学习环境所需要的工具和软件包：

1. Visual Studio 2015 Community Edition Update 3 w. Windows Kit 10.0.10240.0：用于其 C/C++编译器（而不是 IDE）和 SDK，选择该确定的版本是因为 CUDA 8.0.61 所支持的 Windows 编译器。

2. Anaconda (64-bit) w. Python 3.6 (Anaconda3-4.4.0) [for Tensorflow support] or Python 2.7 (Anaconda2-4.4.0) [no Tensorflow support] with MKL：Anaconda 是一个开源的 Python 发行版本，其包含了 conda、Python、NumPy、SciPy 等 180 多个科学包及其依赖项，是一个集成开发环境。MKL 可以利用 CPU 加速许多线性代数运算。

3. CUDA 8.0.61 (64-bit)：CUDA 是一种由 NVIDIA 推出的通用并行计算架构，该架构使 GPU 能够解决复杂的计算问题，该软件包能提供 GPU 数学库、显卡驱动和 CUDA 编译器等。

4. cuDNN v5.1 (Jan 20, 2017) for CUDA 8.0：用于加速卷积神经网络的运算。

5. Keras 2.0.5 with three different backends: Theano 0.9.0, Tensorflow-gpu 1.2.0, and CNTK 2.0：Keras 以 Theano、Tensorflow 或 CNTK 等框架为后端，并提供深度学习高级 API。使用不同的后端在张量数学计算等方面会有不同的效果

# Hardware

1. Dell Precision T7900, 64GB RAM
   - Intel Xeon E5-2630 v4 @ 2.20 GHz (1 processor, 10 cores total, 20 logical processors)
2. NVIDIA GeForce Titan X, 12GB RAM
   - Driver version: 372.90 / Win 10 64

# Installation steps

We like to keep our toolkits and libraries in a single root folder boringly called `c:\toolkits`, so whenever you see a Windows path that starts with `c:\toolkits` below, make sure to replace it with whatever you decide your own toolkit drive and folder ought to be.

## Visual Studio 2015 Community Edition Update 3 w. Windows Kit 10.0.10240.0

我们可能喜欢让所有的工具包和软件包在一个根目录下（如 e:\toolkits.win），所以在下文只要看到以 e:\toolkits.win 开头的路径，那么我们可能就需要小心不要覆盖或随意更改必要的软件包目录。

- Visual Studio 2015 Community Edition Update 3 w. Windows Kit 10.0.10240.0

- 下载地址：https://www.visualstudio.com/vs/older-downloads

运行下载的软件包以安装 Visual Studio，可能我们还需要做一些额外的配置：![](/Source/images/post-content/deeplearning-on-windows/vs2015-install-part1-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/vs2015-install-part2-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/vs2015-install-part3b-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/vs2015-install-part4b-2016-10.png)

1. 基于我们安装 VS 2015 的地址，需要将 C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\bin 添加到 PATH 中。

2. 定义系统环境变量(sysenv variable)```INCLUDE```的值为```C:\Program Files (x86)\Windows Kits\10\Include\10.0.10240.0\ucrt```

3. 定义系统环境变量(sysenv variable)```LIB```的值为```C:\Program Files (x86)\Windows Kits\10\Lib\10.0.10240.0\um\x64;C:\Program Files (x86)\Windows Kits\10\Lib\10.0.10240.0\ucrt\x64```

> Reference Note: We couldn't run any Theano python files until we added the last two env variables above. We would get a `c:\program files (x86)\microsoft visual studio 14.0\vc\include\crtdefs.h(10): fatal error C1083: Cannot open include file: 'corecrt.h': No such file or directory` error at compile time and missing `kernel32.lib uuid.lib ucrt.lib` errors at link time. True, you could probably run `C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\bin\amd64\vcvars64.bat` (with proper params) every single time you open a MINGW cmd prompt, but, obviously, none of the sysenv vars would stick from one session to the next.

## Anaconda (64-bit)

本教程最初使用的是 Python 2.7，而随着 TensorFlow 可作为 Keras 的后端，我们决定使用 Python 3.6 作为默认配置。因此，根据我们配置的偏好，可以设置```e:\toolkits.win\anaconda3-4.4.0```或```e:\toolkits.win\anaconda2-4.4.0```为安装 Anaconda 的文件夹名。

- Python 3.6 版本的 Anaconda 下载地址：https://repo.continuum.io/archive/Anaconda3-4.4.0-Windows-x86_64.exe

- Python 2.7 版本的 Anaconda 下载地址：https://repo.continuum.io/archive/Anaconda2-4.4.0-Windows-x86_64.exe
![](/Source/images/post-content/deeplearning-on-windows/anaconda-4.2.0-download-2016-10.png)

运行安装程序完成安装：

![](/Source/images/post-content/deeplearning-on-windows/anaconda-4.2.0-setup1-2016-10.png)

> Warning: Below, we enabled `Register Anaconda as the system Python 2.7` because it works for us, but that may not be the best option for you!

![](/Source/images/post-content/deeplearning-on-windows/anaconda-4.2.0-setup2-2016-10.png)

The installation should create the environment variables automatically if you chose to.
Otherwise make sure that the following variables are defined:

1. Define sysenv variable `PYTHON_HOME` with the value `c:\toolkits\anaconda2-4.2.0`
2. Add `%PYTHON_HOME%`, `%PYTHON_HOME%\Scripts`, and `%PYTHON_HOME%\Library\bin` to `PATH`

After anaconda installation open a command prompt and execute:

```
$ cd $PYTHON_HOME; conda install libpython
```

![](/Source/images/post-content/deeplearning-on-windows/anaconda-4.2.0-libpython-2016-10.png)

> Note: The version of MinGW above is old (gcc 4.7.0). Instead, we will use MinGW 5.4.0, as shown below.

## CUDA 8.0.61 (64-bit)
Download CUDA 8.0 (64-bit) from the [NVidia website] (https://developer.nvidia.com/cuda-downloads)

Select the proper target platform:

![](/Source/images/post-content/deeplearning-on-windows/cuda8-downloads-win10a-2016-10.png)

Download the installer:

![](/Source/images/post-content/deeplearning-on-windows/cuda8-downloads-win10b-2016-10.png)

Run the downloaded installer. Install the files in `c:\toolkits\cuda-8.0.61`:

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part1-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part2-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part3-2017-10.png)

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part4-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/cuda8-install-part5-2016-10.png)

After completion, the installer should have created a system environment (sysenv) variable named `CUDA_PATH` and added `%CUDA_PATH%\bin` as well as`%CUDA_PATH%\libnvvp` to `PATH`. Check that it is indeed the case. If, for some reason, the CUDA env vars are missing, then:

1. Define a system environment (sysenv) variable named `CUDA_PATH` with the value `c:\toolkits\cuda-8.0.61`
2. Add`%CUDA_PATH%\libnvvp` and `%CUDA_PATH%\bin` to `PATH`

## MinGW-w64 (5.4.0)

Download MinGW-w64 from [here](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/installer/)
note that newer version of the G++ compiler are not supported by Theano:

![](/Source/images/post-content/deeplearning-on-windows/mingw-download-6.2.0-2016-10.png)

Install it to `c:\toolkits\mingw-w64-5.4.0` with the following settings (second wizard screen):

![](/Source/images/post-content/deeplearning-on-windows/mingw-install-5.4.0-part1-2016-10.png)

![](/Source/images/post-content/deeplearning-on-windows/mingw-install-5.4.0-part2-2016-10.png)


1. Define the sysenv variable `MINGW_HOME` with the value `c:\toolkits\mingw-w64-5.4.0`
2. Add `%MINGW_HOME%\mingw64\bin` to `PATH`

Run the following to make sure all necessary build tools can be found:

```
$ where gcc; where g++; where cl; where nvcc; where cudafe; where cudafe++
$ gcc --version; g++ --version
$ cl
$ nvcc --version; cudafe --version; cudafe++ --version
```

You should get results similar to:

![](/Source/images/post-content/deeplearning-on-windows/build-tools-cuda8-2016-10.png)

## Keras 2.0.4 and Theano 0.9

Why those specific versions? Why not just install the latest bleeding-edge version of 
Keras and Theano since they obviously must work better, right? Simply put, because it 
makes [reproducible research](https://www.coursera.org/learn/reproducible-research) harder. 
If your work colleagues or Kaggle teammates install the latest code from the dev branch at a 
different time than you did, you will most likely be running different code bases on your machines, 
increasing the odds that even though you're using the same input data (the same random seeds, etc.), 
you still end up with different results when you shouldn't. 
For this reason alone, we highly recommend only using point releases, the same one across machines, 
and always documenting which one you use if you can't just use a setup script.

The following command will install Keras and Theano inside of your Python distribution 

```
$ pip install keras==2.0.4
```

Verify Keras was installed by querying Anaconda for the list of installed packages:

```
$ conda list | grep -i keras
```
or
```
PS> conda list | sls Keras
```

![](/Source/images/post-content/deeplearning-on-windows/keras_conda_list_2017.png)


### Get the source for Keras

If you wish, you may also clone the Keras repository from github to get the sample sources used in this tutorial

```
$ cd /c/toolkits
$ git clone https://github.com/fchollet/keras.git keras-2.0.4 --branch 2.0.4
```

![](/Source/images/post-content/deeplearning-on-windows/keras-git-2016-10.png)

This should clone Keras 2.0.4 in `c:\toolkits\keras-2.0.4`:

## OpenBLAS 0.2.19 (Optional)

If we're going to use the GPU, why install a CPU-optimized linear algebra library? With our setup, most of the deep learning grunt work is performed by the GPU, that is correct, but *the CPU isn't idle*. An important part of image-based Kaggle competitions is **data augmentation**. In that context, data augmentation is the process of manufacturing additional input samples (more training images) by transformation of the original training samples, via the use of image processing operators. Basic transformations such as downsampling and (mean-centered) normalization are also needed. If you feel adventurous, you'll want to try additional pre-processing enhancements (noise removal, histogram equalization, etc.). You certainly could use the GPU for that purpose and save the results to file. In practice, however, those operations are often executed **in parallel on the CPU** while the GPU is busy learning the weights of the deep neural network and the augmented data discarded after use. For this reason, we *highly recommend* installing the OpenBLAS library.

According to the Theano [documentation](http://deeplearning.net/software/theano_versions/dev/install_windows.html#install-windows), the multi-threaded [OpenBLAS](https://en.wikipedia.org/wiki/OpenBLAS) library performs much better than the un-optimized standard BLAS (Basic Linear Algebra Subprograms) library, so that's what we use.

Download OpenBLAS from [here](https://sourceforge.net/projects/openblas/files/v0.2.19/OpenBLAS-v0.2.19-Win64-int32.zip/download) and extract the files to `c:\toolkits\openblas-0.2.19`

1. Define sysenv variable `OPENBLAS_HOME` with the value `c:\toolkits\openblas-0.2.19`
2. Add `%OPENBLAS_HOME%\bin` to `PATH`

### MKL-Service

> Note that the [documentation](http://deeplearning.net/software/theano_versions/dev/install_windows.html#install-windows) was updated an now recommends MKL-Service, so the OpenBLAS steps might be skipped and parameters indicating OpenBLAS might be ommitted (so `floatX=float32,device=cpu,lib.cnmem=0.8,blas.ldflags=-LC:/toolkits/openblas-0.2.19/bin -lopenblas` becomes `floatX=float32,device=cpu,lib.cnmem=0.8`).

The MKL-Service library which provides an alternative to OpenBLAS can be installed via conda

`$ conda install mkl-service`



## Switching between CPU and GPU mode

Next, create the two following sysenv variables:

- sysenv variable `THEANO_FLAGS_CPU` with the value:

`floatX=float32,device=cpu,lib.cnmem=0.8,blas.ldflags=-LC:/toolkits/openblas-0.2.19/bin -lopenblas`

- sysenv variable `THEANO_FLAGS_GPU` with the value:

`floatX=float32,device=gpu,dnn.enabled=False,lib.cnmem=0.8,blas.ldflags=-LC:/toolkits/openblas-0.2.19/bin -lopenblas`

Theano only cares about the value of the sysenv variable named `THEANO_FLAGS`. All we need to do to tell Theano to use the CPU or GPU is to set `THEANO_FLAGS` to either `THEANO_FLAGS_CPU` or `THEANO_FLAGS_GPU`. You can verify those variables have been successfully added to your environment with the following command:

```
$ env | grep -i theano
```

![](/Source/images/post-content/deeplearning-on-windows/theano-env-2016-10.png)


## Validating our OpenBLAS install (Optional)

We can use the following program from the [Theano documentation](http://deeplearning.net/software/theano/install_windows.html):

```python
import numpy as np
import time
import theano

print('blas.ldflags=', theano.config.blas.ldflags)

A = np.random.rand(1000, 10000).astype(theano.config.floatX)
B = np.random.rand(10000, 1000).astype(theano.config.floatX)
np_start = time.time()
AB = A.dot(B)
np_end = time.time()
X, Y = theano.tensor.matrices('XY')
mf = theano.function([X, Y], X.dot(Y))
t_start = time.time()
tAB = mf(A, B)
t_end = time.time()
print("numpy time: %f[s], theano time: %f[s] (times should be close when run on CPU!)" % (
np_end - np_start, t_end - t_start))
print("Result difference: %f" % (np.abs(AB - tAB).max(), ))
```

Save the code above to a file named `openblas_test.py` in the current directory (or download it from this [GitHub repo](https://github.com/philferriere/dlwin)) and run the next commands:

```
$ THEANO_FLAGS=$THEANO_FLAGS_CPU
$ python openblas_test.py
```

![](/Source/images/post-content/deeplearning-on-windows/openblas_test-2016-10.png)

> Note: If you get a failure of the kind `NameError: global name 'CVM' is not defined`, it may be because, like us, you've messed with the value of `THEANO_FLAGS_CPU` and switched back and forth between `floatX=float32` and `floatX=float64` several times. Cleaning your `C:\Users\username\AppData\Local\Theano` directory (replace username with your login name) will fix the problem (See [here](https://groups.google.com/forum/#!msg/theano-users/JoTu61_MTLk/4ZzsVyaOf2kJ), for reference)

## Checking our PATH sysenv var

At this point, the `PATH` environment variable should look something like:

```
%MINGW_HOME%\mingw64\bin;
%CUDA_PATH%\bin;
%CUDA_PATH%\libnvvp;
%OPENBLAS_HOME%\bin;
%PYTHON_HOME%;
%PYTHON_HOME%\Scripts;
%PYTHON_HOME%\Library\bin;
C:\ProgramData\Oracle\Java\javapath;
C:\WINDOWS\system32;
C:\WINDOWS;
C:\WINDOWS\System32\Wbem;
C:\WINDOWS\System32\WindowsPowerShell\v1.0\;
C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;
C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\bin;
C:\Program Files (x86)\Windows Kits\10\Windows Performance Toolkit\;
C:\Program Files\Git\cmd;
C:\Program Files\Git\mingw64\bin;
C:\Program Files\Git\usr\bin
...
```

## Validating our GPU install with Theano

We'll run the following program from the Theano documentation to compare the performance of the GPU install vs using Theano in CPU-mode. Save the code to a file named `cpu_gpu_test.py` in the current directory (or download it from this [GitHub repo](https://github.com/philferriere/dlwin)):

```python
from theano import function, config, shared, sandbox
import theano.tensor as T
import numpy
import time

vlen = 10 * 30 * 768  # 10 x #cores x # threads per core
iters = 1000

rng = numpy.random.RandomState(22)
x = shared(numpy.asarray(rng.rand(vlen), config.floatX))
f = function([], T.exp(x))
print(f.maker.fgraph.toposort())
t0 = time.time()
for i in range(iters):
    r = f()
t1 = time.time()
print("Looping %d times took %f seconds" % (iters, t1 - t0))
print("Result is %s" % (r,))
if numpy.any([isinstance(x.op, T.Elemwise) for x in f.maker.fgraph.toposort()]):
    print('Used the cpu')
else:
    print('Used the gpu')
```

First, let's see what kind of results we get running Theano in CPU mode:

```
$ THEANO_FLAGS=$THEANO_FLAGS_CPU
$ python cpu_gpu_test.py
```

![](/Source/images/post-content/deeplearning-on-windows/theano-cpu_test-2016-10.png)

Next, let's run the same program on the GPU:

```
$ THEANO_FLAGS=$THEANO_FLAGS_GPU
$ python cpu_gpu_test.py
```

> Note: If you get a `c:\program files (x86)\microsoft visual studio 14.0\vc\include\crtdefs.h(10): fatal error C1083: Cannot open include file: 'corecrt.h': No such file or directory` with the above, please see the Reference Note at the end of the `Visual Studio 2015 Community Edition Update 3` section.

![](/Source/images/post-content/deeplearning-on-windows/theano-gpu_test-2016-10.png)

Almost **a 68:1 improvement**. It works! Great, we're done with setting up Theano 0.9.

## Validating our GPU install with Keras

We can train a simple convnet ([convolutional neural network](https://en.wikipedia.org/wiki/Convolutional_neural_network)) on the [MNIST dataset](https://en.wikipedia.org/wiki/MNIST_database#Dataset) by using one of the example scripts provided with Keras. The file is called `mnist_cnn.py` and can be found in the `examples` folder:

```
$ THEANO_FLAGS=$THEANO_FLAGS_GPU
$ cd /c/toolkits/keras-2.0.4/examples
$ python mnist_cnn.py
```

![](/Source/images/post-content/deeplearning-on-windows/mnist_cnn_gpu_log-2016-10.png)

Without cuDNN, each epoch takes about 20s. If you install [TechPowerUp's GPU-Z](https://www.techpowerup.com/downloads/SysInfo/GPU-Z/), you can track how well the GPU is being leveraged. Here, in the case of this convnet (no cuDNN), we max out at 92% GPU usage on average:

![](/Source/images/post-content/deeplearning-on-windows/mnist_cnn_gpu_usage-2016-10.png)

## cuDNN v5.1 (Jan 20, 2017) for CUDA 8.0 (Conditional)

If you're not going to train convnets then you might not really benefit from installing cuDNN. Per NVidia's [website](https://developer.nvidia.com/cudnn), "cuDNN provides highly tuned implementations for standard routines such as forward and backward convolution, pooling, normalization, and activation layers," hallmarks of convolution network architectures. Theano is mentioned in the list of [frameworks that support cuDNN v5](https://developer.nvidia.com/deep-learning-frameworks) for GPU acceleration.

If you are going to train convnets, then download cuDNN from [here](https://developer.nvidia.com/rdp/cudnn-download). Choose the cuDNN Library for Windows 10 that complies with your CUDA version. Typically cuDNN 5.1 for CUDA 8.0.

![](/Source/images/post-content/deeplearning-on-windows/cudnn-download-2016-10.png)

The downloaded ZIP file contains three directories (`bin`, `include`, `lib`). Extract those directories and copy the files they contain to the identically named folders in `C:\toolkits\cuda-8.0.61` (The same folder we earlier created an environment variable for: `%CUDA_PATH%`).

To enable cuDNN, create a new sysenv variable named `THEANO_FLAGS_GPU_DNN` with the following value:

`floatX=float32,device=gpu,optimizer_including=cudnn,lib.cnmem=0.8,dnn.conv.algo_bwd_filter=deterministic,dnn.conv.algo_bwd_data=deterministic,blas.ldflags=-LC:/toolkits/openblas-0.2.19/bin -lopenblas`

Then, run the following commands:

```
$ THEANO_FLAGS=$THEANO_FLAGS_GPU_DNN
$ cd /c/toolkits/keras-2.0.4/examples
$ python mnist_cnn.py
```

> Note: If you get a `cuDNN not available` message after this, try cleaning your `%USERPROFILE%\AppData\Local\Theano` directory. If you get an error similar to `cudnn error: Mixed dnn version. The header is from one version, but we link with a different version (5010, 5005)`, try cuDNN v5.0 instead of cuDNN v5.1. Windows will sometimes also helpfully block foreign `.dll` files from running on your computer. If that is the case, right click and unblock the files to allow them to be used.

Here's the (cleaned up) execution log for the simple convnet Keras example, using cuDNN:

![](/Source/images/post-content/deeplearning-on-windows/mnist_cnn_gpu_cudnn_log-2016-10.png)

Now, each epoch takes about 3s, instead of 20s, **a large improvement in speed**, with slightly lower GPU usage:

![](/Source/images/post-content/deeplearning-on-windows/mnist_cnn_gpu_cudnn_usage-2016-10.png)

The `Your cuDNN version is more recent than the one Theano officially supports` message certainly sounds ominous but a test accuracy of 0.9899 would suggest that it can be safely ignored. 

## Installing Tensorflow and switching backend

Tensorflow finally supports windows (but only Python 3.5 with x64) and if everything worked out fine for you this far, you may now try to switch to Tensorflow and see if it performs equally well or even better. Run the following command to install the GPU-optimized version of tensorflow.

`$ pip install tensorflow-gpu==1.1.0`

> Note that if you had the library `tensorflow` installed previously, you have to uninstall it using `pip uninstall tensorflow`

Ideally this should install tensorflow and now we can switch the backend by editing keras.json in our user-directory.

![](/Source/images/post-content/deeplearning-on-windows/tensorflow_backend.png)

When running the MNIST-dataset example again, we should get similar or potentially even better results:

![](/Source/images/post-content/deeplearning-on-windows/tensorflow_mnist.png)

The warnings at the beginning are annoying, but so far there is [no supported way](https://www.tensorflow.org/install/install_sources) of building Tensorflow on Windows with those optimizations, so we have to stay put and simply ignore them. Hopefully that will be [fixed](https://github.com/tensorflow/tensorflow/issues/7778) [soon](https://github.com/tensorflow/tensorflow/issues/7257) so people don't have to [build Tensorflow](https://github.com/tensorflow/tensorflow/tree/v1.1.0/tensorflow/contrib/cmake) for [themselves](https://github.com/yaroslavvb/tensorflow-community-wheels) because that's [quite](https://stackoverflow.com/questions/42603407/how-to-compile-tensor-flow-with-sse-and-and-avx-instructions-on-windows?noredirect=1&lq=1) [tricky](https://stackoverflow.com/questions/44071608/compiling-tensorflow-with-cmake-on-windows-fails-with-file-version-info-cc-not-f?noredirect=1&lq=1).

So...

... that's it. Enjoy your super-fast installation. 

# References

[Setup a Deep Learning Environment on Windows (Theano & Keras with GPU Enabled)](https://datanoord.com/2016/02/02/setup-a-deep-learning-environment-on-windows-theano-keras-with-gpu-enabled/), by Ayse Elvan Aydemir

[Installation of Theano on Windows](http://deeplearning.net/software/theano_versions/dev/install_windows.html#install-windows), by Theano team

[A few tips to install theano on Windows, 64 bits](https://www.kaggle.com/c/otto-group-product-classification-challenge/forums/t/13973/a-few-tips-to-install-theano-on-windows-64-bits), by Kagglers

[How do I install Keras and Theano in Anaconda Python 2.7 on Windows?](http://stackoverflow.com/questions/34097988/how-do-i-install-keras-and-theano-in-anaconda-python-2-7-on-windows), by S.O. contributors

# Additional Thanks Go To...

[Alexander Pacha](https://github.com/apacha) for updating this tutorial several times and extending it to include Tensorflow.

[Kaggler Vincent L.](https://www.kaggle.com/vincentl) for recommending adding `dnn.conv.algo_bwd_filter=deterministic,dnn.conv.algo_bwd_data=deterministic` to THEANO_FLAGS_GPU_DNN in order to improve reproducibility with no observable impact on performance.

If you'd rather use Python3, conda's built-in MinGW package, or pip, please refer to [@stmax82](https://github.com/stmax82)'s note [here](https://github.com/philferriere/dlwin/issues/1).

# Suggested viewing/reading

Intro to Deep Learning with Python, by Alec Radford

@ https://www.youtube.com/watch?v=S75EdAcXHKk

@ http://slidesha.re/1zs9M11

@ https://github.com/Newmu/Theano-Tutorials

# About the Author

For information about the author, please visit:

[![https://www.linkedin.com/in/philferriere](/Source/images/post-content/deeplearning-on-windows/LinkedInDev.png)](https://www.linkedin.com/in/philferriere)


