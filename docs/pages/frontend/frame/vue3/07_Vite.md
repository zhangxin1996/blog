## 认识vite

webpack 是目前整个前端使用最多的构建工具，但是除了 webpack 之外还有其他的一些构建工具，比如：rollup(打包框架的模块打包器)、parcel(零配置打包工具)、gulp(自动化构建工具)、vite等等。

[官方](https://cn.vitejs.dev/)对vite的定位是：下一代前端开发与构建工具。

何为下一代前端开发与构建工具？

当前在实际开发中，我们编写的代码往往是不能被浏览器直接识别的，比如：TypeScript、vue、less文件等。所以须通过构建工具对代码进行转化、编译。但是随着项目越来越大，模块越来越多，需处理的JavaScript呈指数级增长。构建工具需要很长的事间才能开启服务器，而且HMR需要几秒钟的时间才能在浏览器上反应出来。

针对上面所说的情况才有vite的出现，vite (法语意为 "快速的"，发音 /vit/) 是一种新型前端构建工具，能够显著提升前端开发体验。

vite是由两部分组成：
* 开发阶段可以将vite理解成是一个开发服务器，它基于原生ES模块提供了非常丰富的内置功能，HMR的速度非常快速；
* 打包阶段是一套构建指令，它本质使用内置的rollup打开我们的代码，并且它是预配置的，可以输出生成环境的优化过的静态资源；

## 浏览器原生支持模块化

根据下面的目录结构创建js和html文件：

``` js
├─index.html
├─src
|  ├─main.js
|  ├─js
|  | └math.js
```

创建math.js文件，文件内导出sum函数：

``` js
export function sum(num1, num2) {
  return num1 + num2;
}
```

创建main.js文件，文件内导入sum函数并调用，打印Hello World：

``` js
import {sum} from "./js/math";

console.log("Hello World");
console.log(sum(10, 20));
```

创建index.html文件，通过script标签导入main.js文件：

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="./src/main.js"></script>
</body>
</html>
```

当前使用的chrome浏览器是已支持ES Module，当执行index.html文件时会报错：

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/01_浏览器原生支持模块化报错-说明类型是模块.png')" alt="说明类型是模块">

如果你想让浏览器认识main.js文件中所写的ES Module的话，要告诉浏览器加载的js文件是一个模块，需添加属性`type="module"`。

``` html
<body>
  <script src="./src/main.js" type="module"></script>
</body>
```

刷新页面的话还是会报错，当没有使用构建工具时，文件后缀名是不可省略的，当初在构建工具可以省略后缀名原因是：构建工具有自己的文件查找规则的。

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/02_浏览器原生支持模块化报错-不要省略后缀名.png')" alt="不要省略后缀名">

接下来就可以正常运行，打印Hello World和调用sum函数的返回值结果。

还有一个需求是使用lodash中的join工具函数，需要先通过 npm init 来创建 package.json 来管理依赖信息，之后安装 lodash：

``` sh
$ npm install lodash-es
```

在main.js中书写代码，并且导入lodash必须使用绝对路径：

``` js
import _ from "../node_modules/lodash-es/lodash.default.js";

console.log(_.join(['a', 'b', 'c'], '~'));
```

虽然这样可以使用lodash，但我们发现在使用loadash时，lodash依赖其他文件浏览器认为也是需要加载的，所以加载了上百个模块的js代码，对于浏览器发送请求是巨大的消耗。

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/03_浏览器原生支持模块化报错-第三方包加载弊端.png')" alt="第三方包加载弊端">

既然浏览器是支持ES Module的，是不是意味可以开发阶段不用构建工具，省去了构建的过程，等到打包上线再使用构建工具？如果你这样想了就片面的，开发阶段也可能用TypeScript、less、vue这些代码浏览器是不能识别的，依然是需要构建工具的。还有如果包之间的依赖过多，那么发送过多的网络请求也会影响性能。

事实上，vite就帮助我们解决了上面的所有问题。

## vite的安装和使用

vite本身也是依赖node.js的，所以也需要提前安装好node环境，并且vite需要node.js版本是大于12版本的。

安装vite工具：

``` sh
# 全局安装
$ npm install vite -g

#局部安装
$ npm install vite -D
```

通过vite来启动项目：

``` sh
$ npx vite
```

## vite对css的支持

### 支持css

vite可以直接支持css的处理，直接导入css文件即可。在main.js文件中，创建div元素并设置class和内容，导入css文件：

``` js
import "./css/style.css";

// 创建div元素并绑定class属性
const divEl = document.createElement("div");
divEl.className = "title";
divEl.innerHTML = "你好啊，李银河！";

document.body.appendChild(divEl);
```

``` css
/* ./src/style.css */

.title {
  color: red;
}
```

展示效果：

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/04_vite对css支持.png')" alt="vite对css支持">


### 支持css预处理器

vite可以直接支持css预处理器比如less，直接导入less文件。但需提前安装less编译器：

``` sh
$ npm install less -D
```

接下来编写less文件，对title类添加font-size和text-decoration，

``` less
/* ./src/el.less */

@fontSize: 40px;
@textDecoration: underline;

.title {
  font-size: @fontSize;
  text-decoration: @textDecoration;
}
```

将el.less文件导入main.js，查看效果

``` js
import "./css/el.less";
```

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/05_vite对less支持.png')" alt="vite对less支持">

### 支持postcss的转换

vite直接支持postcss的转换，只需要安装postcss和需要插件，并且配置 postcss.config.js 的配置文件即可；

``` sh
$ npm install postcss postcss-preset-env -D
```

``` js
// ./postcss.config.js

module.exports = {
  plugins: [
    require("postcss-preset-env")
  ]
}
```

之后会自动给css属性加浏览器前缀：

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/06_vite对postcss支持.png')" alt="vite对postcss支持">

## Vite对TypeScript的支持

vite对TypeScript是原生支持的，它会直接使用ESBuild来完成编译。

``` ts
export default function(num1: number, num2: number): number {
  return num1 * num2;
}
```

之后在main.js中导入并调用：

``` js
import mul from "./ts/mul"

console.log(mul(20, 30));
```

结果：

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/07_vite对ts支持.png')" alt="vite对ts支持">


那你有没想过vite到底怎么对ts及less做支持的？

前面说过，vite在开发时会建本地服务器用的是Connect，当浏览器去请求时（去本地服务器请求）会发现请求的依然是mul.ts文件，el.less文件的请求也是一样。但浏览器是解析不了ts、less文件的所以你不可以直接返回给浏览器，vite中的服务器Connect会对我们的请求进行转发，转发后的代码是请求文件的代码进行转化的（代码转化为ES6的js代码），转化后的文件名依然是mul.ts。之后返回给浏览器的代码就可以执行了。

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/08_vite内部服务器做转发的过程.png')" alt="vite内部服务器做转发的过程">

::: danger 注意
在vite2中，已经不再使用Koa了，而是使用Connect来搭建的服务器
:::


## vite对vue的支持

首先要安装vue：

``` sh
$ npm install vue@next -D
```

之后编写vue代码：

``` vue
<template>
  <div>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      message: "Hello Vite"
    }
  }
}
</script>

<style lang="">
  h2 {
    color: pink;
  }
</style>
```

在main.js中导入App.vue文件，将App组件挂载到id为app的div上。

``` js
import { createApp } from vue;

createApp(App).mount("#app");
```

之后运行 npx vite，报错了，需要安装 @vitejs/plugin-vue 来处理 .vue文件：
<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/09_vite处理vue文件报错.png')" alt="vite处理vue文件报错">

安装支持vue的插件：

``` sh
$ npm install @vitejs/plugin-vue -D
```

在vite.config.js中配置插件：

``` js
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue()
  ]
}
```

执行 npx vite 后又报错了，需要安装@vue/compiler-sfc：

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/10_vite处理vue文件报错2.png')" alt="vite处理vue文件报错2">

``` sh
$ npm install @vue/compiler-sfc -D
```

::: tip 提示
vite对vue提供第一优先级支持：
* Vue 3 单文件组件支持：@vitejs/plugin-vue
* Vue 3 JSX 支持：@vitejs/plugin-vue-jsx
* Vue 2 支持：underfin/vite-plugin-vue2
:::

最终浏览器看到效果了：

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/11_vite处理vue文件效果.png')" alt="vite处理vue文件效果">

## vite打包项目

我们可以通过 vite build 来完成对当前项目的打包：

``` sh
$ npx vite build
```

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/13_vite打包项目.png')" alt="vite打包项目">

我们可以通过preview的方式，开启一个本地服务来预览打包后的效果

``` sh
$ npx vite preview
```

其实我们可以在 package.json 中的 scripts 添加脚本，

``` json
"scripts": {
  "serve": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

之后执行命令就可以：
``` sh
# 开发阶段，开启本地服务器

$ npm run serve

# 对当前项目的打包工具

$ npm run build

# 开启一个本地服务来预览打包后的效果

$ npm run preview
```

## vite打包快的原因

### 预打包

在第一次执行 npx vite 命令的时候，会对当前项目通过 npm 安装的依赖（当前项目是依赖lodash-es 和 vue）进行预打包，之后将预打包的文件放到 node-modules 下的 .vite 文件夹。当下一次执行 npx vite 时，不会再次打包依赖会直接加载预打包的文件，这样打包的时间会缩短。

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/12_vite预打包.png')" alt="vite预打包">

### ESBuild

Vite来构建代码是依赖ESBuild。

ESBuild的特点是：
* 超快的构建速度，并且不需要缓存（babel会对转化过的代码进行缓存，下一次就不再转化了）；
* 支持ES6和CommonJS的模块化（最好用ES6模块化，这样就不用转化为ES6）；
* 支持ES6的Tree Shaking（定义了函数之后没有使用过，之后Tree Shaking能删除掉无用代码）；
* 支持Go、JavaScript的API（ESBuild是通过GO实现的）；
* 支持TypeScript、JSX等语法的编译；
* 支持SourceMap；
* 支持代码压缩；
* 支持扩展其他插件；

ESBuild的构建速度和其他构建工具速度的对比：

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/15_ESBuild构建速度.png')" alt="ESBuild构建速度">

ESBuild为什么这么快？
* 使用Go语言编写的，可以直接转化为机器代码，而无需字节码；
* ESBuild可以充分利用CPU的多内核，尽可能让它们饱和运行（对代码进行转化时发起新的进程，进程会开启许多的线程，线程会跑在内核中运行）；
* ESBuild的所有内容都是从零开始编写的，而不是使用第三方的，所以从一开始就可以考虑各种性能问题；
* 等等……


## vite脚手架工具

在开发中，我们不可能所有的项目都是用vite从零去搭建，如果一个vue项目、react项目。这时vite还给我们提供了对应的脚手架工具。

所以vite实际上是两个工具：
* vite相当于是一个构建工具，类似于webpack、rollup；
* @vitejs/create-app是一个脚手架：类似于vue-cli、react-create-app；

使用脚手架工具之前需要安装：

``` sh
$ npm install @vitejs/app -g
```

之后创建项目，下图是创建项目的过程：

``` sh
$ create-app <项目名称>
```

<img class="medium" :src="$withBase('/frontend/frame/vue3/07_vite/14_vite创建项目的过程.png')" alt="vite创建项目的过程">

::: danger 注意
创建好项目后，需手动通过 npm install 命令安装项目依赖。保证后续项目正常运行及打包。
:::