## 了解Vue CLI

前面学习如何通过webpack配置Vue的开发环境，但在实际开发中我们不可能每一个项目从头来完成所有的webpack配置，这样大大影响开发效率。

所以，通常开发会使用脚手架来创建一个项目，Vue的项目我们使用的就是Vue脚手架。因为Vue CLI已经内置了webpack的相关配置，所以不需要从零来配置。脚手架其实是建筑工程的概念，在软件工程中会将帮助我们搭建项目的工具称为脚手架。

CLI（Command-Line-Interface），翻译过来是：命令行工具。我们可以通过CLI选择项目的配置和创建项目。

### Vue CLI的安装和使用

我们进行全局安装Vue CLI，这样可以在电脑的任何地方都可以通过vue命令来创建项目（目前最新版本是v4.5.13）：
``` 
npm install @vue/cli -g
```

如果之前安装过Vue CLI但是比较旧的版本，可以通过以下命令来升级Vue CLI：
```
npm update @vue/cli -g
```

通过vue命令来创建项目：
```
vue create 项目的名称
```

