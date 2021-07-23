最早Git是在Linux上开发的，很长一段时间内，Git也只能在Linux和Unix系统上跑。不过，慢慢有人将它移植到Windows上。现在，Git可以在Linux、Unix、Mac、Windows这几大平台上正常运行了。

要是使用Git，第一步当然是安装Git了。根据你当前使用的平台来阅读下面的文字：

## 在Linux上安装Git

首先，你可以试着输入`git`，看看系统有没有安装Git：

```
$ git
The program 'git' is currently not installed. You can install it by typing:
sudo apt-get install git
```

像上面的命令，有很多Linux会有好地告诉你Git没有安装，还会告诉你如何安装Git。

如果你碰巧用Debian或Ubuntu Linux，通过一条`sudo apt-get install git`就可以直接完成Git的安装，非常简单。

老一点的Debian或Ubuntu Linux，要把命令改为`sudo apt-get install git-core`。

如果是其他Linux版本，可以直接通过源码安装。先从Git官网下载源码，然后解压，依次输入：`./config`，`make`，`sudo make install`这几个命令安装就好了。


## 在Mac OS X上安装Git

如果你使用Mac做开发，有两种安装Git的方法。

* 使用homebrew，然后通过homebrew安装git，具体方法请参考homebrew的[文档](http://brew.sh/)；
* 此方法更简单也是推荐的方法，直接从AppStore安装Xcode，Xcode集成了Git，不过默认没有安装，你需要运行Xcode，选择菜单“Xcode” → “Preferences”，在弹出窗口中找到“DownLoads”，选择“Command Line Tools”，点“Install”就可以完成安装了。

<img class="medium" :src="$withBase('/frontend/advanced/git/02_git-install/01_在Mac上安装Git.png')" alt="在Mac上安装Git">

Xcode是Apple官方IDE，功能非常强大，是开发Mac和iOS App的必选装备，而且是免费的！


## 在 Windows 上安装

在Windows上使用Git，可以从Git官网上直接下载安装程序，然后默认选项安装即可。

安装完成后，在开始菜单里找到“Git → Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功。

<img class="medium" :src="$withBase('/frontend/advanced/git/02_git-install/02_在windows上安装Git.png')" alt="在windows上安装Git">

安装完成后，还需要最后一步设置，在命令行输入：

```
git config --global user.name "runoob"
git config --global user.email test@runoob.com
```

::: danger 注意
`git config`命令的`--global`参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置。

当然也可以对某个仓库指定不同的用户名和Email地址。只要去掉 --global 选项重新配置即可，新的设定保存在当前项目的 .git/config 文件里。
:::

