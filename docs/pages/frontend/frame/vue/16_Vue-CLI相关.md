## Vue CLI
### CLI是什么

CLI是`Command-Line Interface`，翻译是命令行界面，俗称脚手架。

Vue CLI是官方提供的 Vue.js 的项目脚手架，可以快速搭建Vue开发环境和Webpack配置。

### 开发场景

当使用Vue开发大型项目时，我们需要考虑代码的目录结构、项目结构和部署、热加载、代码单元格测试等事情，这时如果还和原来一样，每个项目还需要手动完成这些配置，那效率是非常低效的，所以需要通过脚手架工具来帮我们完成这些事情。

### 使用前提

* 安装NodeJS：
直接在官网中下载安装，网址：http://nodejs.cn/download/。

检测安装版本：
默认情况下自动安装Node和NPM，Node环境要求在8.9以上或者更高版本。

``` 
node --version

npm --version
```

什么是NPM：
NPM的全称是：Node Package Manager，是Node包管理和分发工具，已经成为非官方的发布Node模块（包）的标准。

* 安装webpack：

VueJS官方脚手架工具就使用了Webpack工具。

Webpack的全局安装：
```
npm install webpack -g
```

### Vue CLI使用

安装Vue脚手架，使用node的包管理工具npm，`-g`为全局安装。

```
npm install -g @vue/cli
```

安装完成后使用`vue --version`查看安装版本。

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/01_vue-cli版本检测.png')" alt="vue-cli版本检测">

::: danger 注意
上面安装的是Vue CLI3的版本，如果想按照Vue CLI2的方式初始化项目是不可以的。
:::

Vue CLI3和旧版使用了相同的vue命令，所以Vue CLI2（Vue CLI）被覆盖了。如果你仍然需要使用旧版本的Vue init功能，你可以全局安装一个桥接工具，这样就可以拉取2.x的模板。

```
npm install -g @vue/cli-init
```

Vue CLI2初始化项目

``` 
vue init webpack my-project
```

Vue CLI3初始化项目

``` 
vue create my-project
```

## Vue CLI2

### 安装步骤

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/02_vue-cli2安装步骤.png')" alt="vue-cli2安装步骤">

### 目录结构

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/03_vue-cli2目录结构.png')" alt="vue-cli2目录结构">

### 运行

```
npm run dev
```

::: tip 提示
如果在创建项目时选择安装Eslint，之后又不想使用Eslint，可以在项目根目录下：`./confog.index.js`中修改：

```
useEslint: false,
```
:::

### Runtime + Compiler和Runtime only的区别

在之前创建项目时，有一个选项是让选择`运行时+编译器版本（Runtime + Compiler）`或者`只含有运行时版本（Runtime only）`选项，我们为了保险选择了`Runtime + Compiler`这个选项，但是内部的原理并不知道。

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/04_runtimeCompiler和runtimeOnly的区别.png')" alt="04_runtimeCompiler和runtimeOnly的区别">

下面我们来讲解下，让你之后选择不再迷惑：

`Runtime only`相较于`Runtime + Compiler`来说更加轻量（轻约6KB）。如开发中，你依然使用`template`，就需要使用`Runtime + Compiler`选项。如使用`.vue`文件开发，就需要使用`Runtime only`选项。

下面对比：
* 这是选择`Runtime + Compiler`选项创建项目，在根目录下：`./src/main.js`文件中代码：

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/05_runtime-compiler模式中的main.png')" alt="runtime-compiler模式中的main">

* 这是选择`Runtime only`选项创建项目，在根目录下：`./src/main.js`文件中代码：

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/06_runtime-only模式中的main.png')" alt="runtime-only模式中的main">

为什么会出现这样的差异呢？我们通过一张图理解Vue应用程序是如何运行的。

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/07_Vue程序运行过程.png')" alt="Vue程序运行过程">

我们看到运行的过程是：template → 解析为ast  → 编译为render函数 → 生成virtual dom（虚拟DOM） → 最终为UI。

根据这幅图再结合之前不同选项中的main文件得出：
* `Runtime + Compiler`：是注册组件并将组件替换index.html中id为app的div元素。所以步骤是：template → 解析为ast  → 编译为render函数 → 生成virtual dom（虚拟DOM） → 最终为UI。
* `Runtime only`：是直接render函数渲染组件，替换index.html中id为app的div元素，不需要编译器（Compiler）。所以步骤是：render函数 → 生成virtual dom（虚拟DOM） → 最终为UI。

### render函数的使用

* 使用方式一：

[参考](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)

``` js
render('标签', 标签的属性，对象类型(可以不传), ['内容数组']);
```

1. render函数的基本使用：

``` js
new Vue({
  el: '#app',
  render: (createElement) => createElement('h2', {'class': 'box'}, ['我是h2元素'])
})
```

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/08_render函数的基本使用.png')" alt="render函数的基本使用">

2. render函数的嵌套：

``` js
new Vue({
  el: '#app',
  render: (createElement) => createElement(
    'h2', 
    {'class': 'box'}, 
    ['我是h2元素', createElement('button', ['按钮'])]
  )
})
```
<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/09_render函数的嵌套.png')" alt="render函数的嵌套">

* 传入一个组件对象

``` js
// template写法：
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

// render写法：
new Vue({
  el: '#app',
  render: (createElement) => createElement(App)
})

// render写法的简写：
new Vue({
  el: '#app',
  render: (h) => h(App)
})
```

答疑：
1. Vue中`render: h=> h(App)`中h具体是什么含义？

其中 根据 Vue.js 作者 Even You 的回复，h 的含义如下：

> It comes from the term "hyperscript", which is commonly used in many virtual-dom implementations. "Hyperscript" itself stands for "script that generates HTML structures" because HTML is the acronym for "hyper-text markup language".}<br>
它来自单词 `hyperscript`，这个单词通常用在 virtual-dom 的实现中。`Hyperscript` 本身是指`生成HTML 结构的 script 脚本`，因为 HTML 是 `hyper-text markup language` 的缩写（超文本标记语言）<br>

个人理解：createElement 函数是用来生成 HTML DOM 元素的，也就是上文中的 generate HTML structures，也就是 Hyperscript，这样作者才把 createElement 简写成 h。

[点击更多](https://segmentfault.com/q/1010000007130348)


2. 创建项目选择`Runtime only`时，那么*.vue文件中的template怎么办，也需要一步步的转换吗？

`*.vue文件`最终编译出来是普通的对象，这个对象中已将template编译成render函数了，这个功劳是创建项目时安装的开发依赖`vue-template-compiler`，作用是将`*.vue文件`中template解析成render函数。所以最后运行Vue时不再会有template了，都是render函数。


经过这样的学习，之后可以放心大胆的选择`Runtime only`选项，不仅轻量而且效率更高。


### 自定义配置

Vue CLI2中自定义配置，是在根目录下创建`webpack.base.conf.js`文件，例如起别名：

``` js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'pages': resolve('src/pages'),
        'commom': resolve('src/common'),
        'components': resolve('src/components'),
        'network': resolve('src/network') 
      }
    }
  }
}
```

## Vue CLI3

Vue CLI3与Vue CLI2版本有很大区别：
* Vue CLI3是基于Webpack4打造的，Vue CLI2是基于Webpack3；
* Vue CLI3的设计原则是“0配置”，移除了根目录下的`build`和`config`等配置文件；
* Vue CLI3提供了可视化配置，命令为`vue ui`，这样更加人性化；
* 移除了`static`文件夹，新增了`public`文件夹，并且index.html移动到public中；

### 初始化项目

1. 选择配置方式

有选择默认或者手动选择功能。这里选择手动选择。

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/10_选择配置方式.png')" alt="选择配置方式">

2. 选择自定义配置

方向键上下选择，空格选中或反选，Enter确定。

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/11_选择自定义配置.png')" alt="选择自定义配置">

3. 选择配置文件的存放位置

对应的配置是单独生成文件还是放到`package.json`中，这里选择独立放置配置文件。

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/12_选择配置文件的存放位置.png')" alt="选择配置文件的存放位置">

4. 是否保存此预设

意思是要不要把刚才的配置保存下来，选择yes下次就不用进行配置直接生成。
<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/13_是否保存此预设.png')" alt="是否保存此预设">

5. 设置保存的名字

之后会在选择配置方式那里，选择此名字来进行配置。
<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/14_设置保存的名字.png')" alt="设置保存的名字">

6. 选择安装依赖项时要使用的程序包管理器

这里选择npm。
<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/15_选择包管理器.png')" alt="选择包管理器">

7. 安装
<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/16_安装.png')" alt="安装">

### 运行程序

```
npm run sever
```

### 目录结构

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/17_cli3代码结构.png')" alt="cli3代码结构">


### 使用图形化界面来配置

在任意文件夹下cmd中输入指令`vue ui`，来启动配置服务器。

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/18_ui界面配置.png')" alt="ui界面配置">

那么在Vue CLI2中可以看到的Webpack配置，在Vue CLI3哪里可以看到呢？

<img class="medium" :src="$withBase('/frontend/frame/vue/16_Vue-CLI/19_隐藏的配置.png')" alt="隐藏的配置">

### 自定义配置

想自定义配置，在项目根目录下的 `vue.config.js` 文件下，进行基本常用配置。

``` js
module.exports = {
  devServer: {
    port: 8888, // 端口号
    host: 'localhost',
    https: false,
    open: false // 配置是否自动启动浏览器
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'pages': resolve('src/pages'),
        'commom': resolve('src/common'),
        'components': resolve('src/components'),
        'network': resolve('src/network') 
      }
    }
  }
}
```
其他的具体看[文档](https://cli.vuejs.org/zh/config/#vue-config-js)。