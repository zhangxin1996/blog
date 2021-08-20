## 认识webpack

### 前端的发展

事实上随着前端的快速发展，目前前端的开发已经变的越来越复杂了：
* 开发过程中需要通过**模块化的方式**来开发；
* 使用一些**高级的特性来加快开发效率或者安全性**，比如通过ES6+、TypeScript开发脚本逻辑，通过Sass、Less等方式来编写css样式；
* 开发工程中，希望**实时的监测代码的变化并反映到浏览器上**，提高开发效率；
* 开发完项目后，**对代码进行压缩、合并以及其他相关的优化**；
* 等等……

但目前前端开发来说，并不需要考虑这些问题，原因是目前前端开发我们通常直接使用三大框架来开发，这三大框架的创建过程我们都是借助于脚手架（CLI）。事实上Vue CLI、React CLI、Angular CLI都是基于**webpack**帮助我们支持模块化、less、TypeScript、打包优化等。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/01_三大框架基于webpack.png')" alt="三大框架基于webpack">

### 什么是webpack

官方的解释是：webpack is a **static** **module** **bundler** for **modern** JavaScript applications.

翻译过来是：webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。

我们对上面的解释进行拆解：
* 打包bundler：webpack是一个打包工具，可以帮助我们对代码进行打包；
* 静态的static：最终将代码打包成最终的静态资源（之后部署到静态服务器）；
* 模块化module：webpack默认支持各种模块化开发，ES Module、CommonJS、AMD、CMD等；
* 现代的medern：前面说个，正是因为现在前端的发展面临各种问题，才催生了webpack的出现和发展；

官方效果图：
<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/02_webpack官方效果图.png')" alt="webpack官方效果图">

### Vue项目中哪些文件需要webpack
JavaScript的打包：
* 将ES6语法转化为ES5语法；
* 将TypeScript转化为JavaScript；

CSS的处理：
* CSS文件模块的加载和处理；
* Less、Sass等预处理器的处理；

资源文件img、font：
* 图片文件的加载；
* 字体文件的加载；

HTML资源的处理：
* 打包HTML资源文件；

处理vue项目中SFC文件——.vue文件

## webpack的使用

### webpack的使用前提
这是[webpack的官方中文文档](https://webpack.docschina.org/)。

因为webpack的运行是依赖`Node环境`的，所以电脑必须安装Node环境。打开[Node官方网站](https://nodejs.org/)进行安装Node.js同时会安装NPM。

### webpack安装

webpack的安装目前是分为两个：webpack、webpack-cli。

安装：
``` js
// 全局安装
npm install webpack webpack-cli -g

// 局部安装
npm install webpack webpack-cli -D
```

它们之间的关系是：
* 在项目中执行 webpack 命令，其实执行的是 node_modules 下的 .bing 目录下的 webpack；
* 而 webpack 在执行时是依赖 webpack-cli 的，如果没有安装 webpack-cli 的话就会报错；
* 而 webpack-cli 中代码执行时，才是真正利用 webpack 进行编译和打包过程的；
* 所以在安装 webpack 时，同时要安装 webpack-cli（第三方脚手架事实上是没有安装 webpack-cli 的，而是类似于自己的 vue-service-cli 的东西）；

webpack 和 webpack-cli 图示：

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/03_webpack和webpack-cli图示.png')" alt="webpack和webpack-cli图示">


## 在项目中使用webpack

根据下面的目录结构创建js和html文件：

``` js
├─index.html
├─src
|  ├─index.js
|  ├─js
|  | ├─format.js
|  | └math.js
```

1. 创建math.js
``` js
// 使用ES Module导出
export function sum(num1, num2) {
  return num1 + num2;
}
```

2. 创建format.js
``` js
// 使用CommonJS导出
module.exports = {
  priceFormat: function(price) {
    return "¥" + price;
  }
};
```

3. 在index.js中导入math.js的sum函数和format.js的priceFormat函数
``` js
// index.js

import {sum} from "./js/math";
const {priceFormat} = require("./js/format");

console.log(sum(10, 5));
console.log(priceFormat(3.99));
```

4. 在index.html中通过script标签引入index.js
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
  <script src="./src/index.js"></script>
</body>
</html>
```

这样直接在浏览器打开控制台是会报错的，因为浏览器不认识`import`和`export`关键字。

### 使用全局webpack打包

前面我们全局安装了webpack，所以可以通过webpack进行打包，之后运行**打包之后**的代码。在目录下直接执行`webpack命令`即可。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/04_webpack默认打包-webpack命令.png')" alt="webpack默认打包-webpack命令">

之后目录下生成一个**dist文件夹**，里面存放着一个**main.js的文件**，这就是打包之后的文件。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/05_webpack默认打包-webpack命令生成的文件.png')" alt="webpack默认打包-webpack命令生成的文件">

这个文件中的代码被压缩和丑化了，可我们发现代码中还存在ES6的语法比如箭头函数，这是因为默认情况下，webpack并不清楚我们打包后的文件，是否需要转化为ES5之前的语法，后续需要通过babel来进行转化和设置。

接下来我们就可以在**index.html**中引入dist目录下main.js了。

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
  <script src="./dist/main.js"></script>
</body>
</html>

<!-- 输出：
15
¥3.99
-->
```

我们发现这样可以正常打包，是因为在执行webpack命令时，webpack会查找当前目录下的`src/index.js`文件作为入口，所以如果当前目录中没有存在`src/index.js`文件就会报错。

当然，我们也可以通过命令行配置来自己指定入口和和出口：
``` js
npx webpack --entry ./src/index.js --output-path ./build
```

如果所有项目都使用全局的webpack进行打包会有问题的，因为不同项目所依赖webpack的版本是不同的，会有兼容性问题。所以在真实项目中会在当前项目再安装一个局部的webpack。

### 使用局部webpack打包

下面演示创建局部webpack：

1. 第一步：创建package.json文件，用于管理项目的信息、库依赖等
``` js
npm init
// 简便写法
npm init -y
```

2. 第二步：安装局部webpack
```
mpm install webpack webpack-cli --save-dev
```

3. 使用局部的webpack

* 方案一：在命令行输入命令进行打包
``` js
./node_modules/.bin/webpack
// 或者
npx webpack
```

npm工具提供了npx，当执行`npx webpack`命令时，优先在`./node_modules/.bin`查找webpack命令。

* 方案二：在package.json中创建`scripts脚本`，执行脚本打包即可

``` json
{
  "scripts": {
    "build": "webpack"
  },
}
```

执行命令：npm run build。在脚本执行命令会自动到`./node_modules/.bin`查找webpack命令。


### webpack配置文件

如果想在package.json中的scripts脚本配置指定出口和入口：

``` json
"scripts": {
    "build": "webpack --entry ./src/index.js --output-path ./dist"
  }
```

通常情况下，webpack需要打包的项目是非常复杂的，并且我们需要一系列的配置来满足要求，全部放到scripts脚本是不现实的。

我们可以在根目录下创建一个`webpack.config.js`文件，来作为webpack的配置文件：

``` js
const path = require("path");

// 导出配置文件
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  }
};
```

继续执行`npm run build`命令，依然可以正常打包。

默认配置文件的名字是webpack.config.js，如果我们将其改成wk.config.js，可以通过--config来指定对应的配置文件。

```
webpack --config wk.config.js
```

但是每次这样执行命令会非常繁琐，所以可以在package.json中新增一个新的脚本：

``` json
"scripts": {
    "build": "webpack --config wk.config.json"
  }
```

之后执行`npm run duild`命令来打包即可。


## webpack对css的处理

根据下面的目录结构创建element.js和style.css文件：

``` js
├─src
|  ├─css
|  | ├─style.css
|  ├─js
|  | └element.js
```
1. element.js中通过JavaScript代码创建div元素并为其设置类及内容。

``` js
const divEle = document.createElement("div");
divEle.className = "title";
divEle.innerHTML = "你好啊，李银河！";

document.body.appendChild(divEle);
```

2. style.css中书写样式

``` css
.title {
  color: red;
  font-weight: bold;
}
```

### webpack依赖图

如果直接执行`npm run build`命令，界面中是没有div元素的。

事实上webpack在处理应用程序时，它会根据命令或者配置文件找到入口文件。从入口文件开始，会生成一个依赖关系图，这个依赖关系图会包含应用程序中所有需要的模块（比如js文件、css文件、图片、字体等）。然后遍历图结构，打包一个个模块（根据文件的不同使用不同的loader来解析）。

在webpack.config.js文件中，规定了入口文件是./src/index.js，index.js文件中导入了math.js和format.js模块，所以会最终打包。如果想将element.js打包就要导入模块。

``` js
// ./src/js/main.js
import "./js/element";
```

将style.css样式文件导入：

``` js
// ./src/css/element.js
import "../css/style.css";
```

### css-loader的使用

模块也导入了，接下来执行`npm run build`命令进行打包，发现报错了。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/06_没有合适的loader来解析css文件.png')" alt="没有合适的loader来解析css文件">

上面的错误信息告诉我们需要了一个loader来加载css文件，那什么是loader呢？

loader 用于对模块的源代码进行转换。我们可以将css文件也看成是一个模块，我们是通过import来加载这个模块的。在加载这个模块时，webpack其实并不知道如何对其进行加载，所以我们必须制定对应的loader来完成此功能。

对于当前需要加载css文件来说，我们需要一个可以读取css文件的loader。这个loader就是**css-loader**。

css-loader的安装：
```
npm install css-loader -D
```

使用css-loader来加载css文件由三种方式：
* 内联方式；

在import引用样式文件路径的前面加上使用的loader，并用!分割。

``` js
import "css-loader!../css/style.css";
```

内联方式使用的较少，因为不方便管理。

* CLI方式（webpack5中不再使用）；

在wepack5的文档中已经没有了`--module-bind`，在实际应用中也比较少使用，因为不方便管理。

* 配置文件方式；

配置文件方式是在webpack.config.js文件中写配置信息，`module.rules`中允许配置许多个loader（因为也需要使用其他的loader来解析其他的文件），这种方式可以更好的表示loader的配置，也方便后期的维护，同时也让你对各个loader有一个全局的概念。

module.rules的配置如下：

rules属性对应的值是一个数组，数组中存放的一个个的Rule，每一个Rule是一个对象，对象中可以设置多个属性：

```
test属性：用于对资源进行匹配，通常设置正则表达式；
loader属性：是Rule.use[{loader}]的简写；
use属性：对应的值是一个数组，[UseEntry]；
  * 当UseEntry为一个对象，可以设置一些属性：
    * loader：必须有一个loader属性，对应的值是一个字符串；
    * options：可选的属性，值是一个字符串或者对象，值会被传入到loader中；
    * query：目前已经使用options替代；
  * 当UseEntry为字符串时，如`use: ["css-loader"]`，是loader属性的简写方式`use:[{loader: "css-loader"}] `
```

配置代码如下：
``` js
const path = require('path');

// 导出配置文件
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 写法一
        // loader: "css-loader",

        // 写法二：当有多个loader时使用这种方法
        // use: ["css-loader"],

        // 写法三：需要额外的可选属性，完整写法
        use: [
          {loader: "css-loader"}
        ]
      }
    ]
  }
}
```


### style-loader的使用

我们通过css-loader来加载css文件，但css在代码中并没有生效。原因是：css-loader只负责将.css文件进行解析，并不会将解析后的css插入到页面中。如果想要将解析后的css通过style标签的形式插入到页面中，需要使用`style-loader`。

安装style-loader：

```
npm install style-loader -D
```

在配置文件中配置style-loader，要注意loader执行顺序时从右向左（或者从下向上），所以要将style-loader写到css-loader的前面。

``` js
rules: [
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      }
    ]
```

重新执行`npm run build`命令，可以发现打包的css已经生效了。是通过页内样式的方式添加进来的。

### 处理less文件

在开发中，我们为了开发效率的提高，可能使用less、sass、stylus等预处理器来编写css样式。怎么能让其转化为普通的css呢？

在这里我们以less样式为示例，在`./src/css/`目录下创建title.less：

``` less
@fontSize: 30px;
@textDecoration: underline;

.title {
  font-size: @fontSize;
  text-decoration: @textDecoration;
}
```

我们可以使用less工具来完成它的编译转换，安装less工具：
```
npm install less -D
```

执行命令：
```
npx lessc ./src/css/title.less ./src/css/title.css
```

### less-loader的使用

但在项目中有大量的css，手动转化肯定不行，这时使用`less-loader`来自动使用less工具转化less为css。

安装：
```
npm install less-loader -D
```

在webpack.config.js配置less-loader：

``` js
{
  test: /\.less$/,
  use: [
    {loader: "style-loader"},
    {loader: "css-loader"},
    {loader: "less-loader"}
  ]
}
```

在`./src/js/element.js`文件中引入less文件：

``` js
import "../css/title.less";
```

执行`npm run build`命令，less就可以自动转换成css，并且页面也会生效了。


### 认识PostCSS工具

PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具。这个工具可以帮助我们进行CSS的转化和适配，比如自动添加浏览器前缀、css样式的重置、支持最新的css语法等。除了工具以外还要借助于PostCSS对应的插件。

使用PostCSS主要有两个步骤：
* 步骤一：查找PostCSS在构建工具中的拓展，比如webpack中的postcss-loader；
* 步骤二：选择你需要添加的PostCSS相关的插件；

#### 命令行使用PostCSS工具及安装autoprefixer插件

当然我们可以不使用构建工具，直接在命令行使用PostCSS，需要安装postcss和postcss-cli：

```
npm install postcss postcss-cli -D
```

我们编写一个需要添加前缀的css文件，在`./src/css/`目录下创建test.css：

``` css
.title {
  user-select: none;
}
```

因为需要添加前缀，所以需要安装插件antoprefixer，

```
npm install autoprefixer -D
```

之后在命令行使用PostCSS工具并指定使用的插件antoprefixer对css进行转化，

```
npx postcss --use autoprefixer -o ./src/css/test.css ./src/css/test.css
``` 

转化之后的css文件样式如下：

``` css
.title {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
```

#### 使用postcss-loader

真实开发必然不会使用命令行工具来对css进行处理，借助webpack构建工具使用postcss-loader来处理。

安装postcss-loader：

```
npm install postcss-loader -D
```

修改webpack.config.js中加载css的loader，因为postcss需要有对应的插件才会起作用，所以需配置plugin。

``` js
{
  test: /\.css$/,
  use: [
    {loader: "style-loader"},
    {loader: "css-loader"},
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            require("autoprefixer")
          ]
        }
      }
    }
  ]
}
```

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/07_使用postcss-loader及插件autoprefixer的页面效果.png')" alt="07_使用postcss-loader及插件autoprefixer的页面效果">

也可将这些配置信息抽离到单独的文件中进行管理，我们在根目录下创建postcss.config.js文件，

``` js
// postcss.config.js
module.exports = {
  plugins: [
    require("autoprefixer")
  ]
}
```

webpack.config.js文件就可以这样写了：

``` js
// webpack.config.js
{
  test: /\.css$/,
  use: [
    {loader: "style-loader"},
    {loader: "css-loader"},
    {loader: "postcss-loader"}
  ]
},
```

#### postcss-preset-env插件

事实上在配置postcss-loader时，我们配置插件并不需要使用autoprefixer，而是使用另一个插件postcss-preset-env。

它也是一个postcss的插件，它可以帮助我们将一些现代的css特性，转换成大多数浏览器可以认识的css，并且会根据目标浏览器或者运行时环境添加所需的polyfill。也包括会自动帮助我们添加autoprefixer（所以相当于已经内置了autoprefixer）。

首先需要安装postcss-preset-env插件：

```
npm install postcss-preset-env -D
```

之后就可以直接修改掉之前的autoprefixer插件了。

```  js
// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-preset-env")
  ]
}
```

我们在使用某些postcss插件时，也可以直接传入字符串：
```  js
// postcss.config.js
module.exports = {
  plugins: [
    "postcss-preset-env"
  ]
}
```

## webpack对资源的处理

### 加载图片案例准备

为了演示在项目中可以加载图片，我们需要在项目中使用图片，比较常见使用图片的方式是两种：
* 第一种：img元素设置src属性；
* 第二种：其他元素（比如div元素），设置background-image的css属性；

``` js
// ./src/js/element.js

import "../css/image.css";

// 2. 加载图片资源
// 2.1 创建img元素设置src
const imgEle = document.createElement("img");
imgEle.src = zznhImage;
imgEle.style.width = "100px";
imgEle.style.height = "100px";

document.body.appendChild(imgEle);

// 2.2 设置背景图片，创建div元素设置class属性
const bgDivEle = document.createElement("div");
bgDivEle.className = "image-bg";

document.body.appendChild(bgDivEle);
```

``` css
/* ./src/css/image.css */

.image-bg {
  width: 200px;
  height: 200px;
  background-image: url("../img/nhlt.jpg");
  background-size: contain;
}
```

这时通过`npm run build`命令打包会报错。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/08_加载图片资源报错需要合适的loader.png')" alt="加载图片资源报错需要合适的loader">

### file-loader

要处理jpg、png等格式的图片资源，需要使用对应的loader：**file-loader**。

安装file-loader：

```
npm install file-loader -D
```

在webpack.config.js中配置处理文件的Rule：

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          },
        ],
        type: 'javascript/auto'
      },
    ],
  },
};
```

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/09_使用file-loader打包.png')" alt="使用file-loader打包">

::: tip 提示
当在 webpack 5 中使用旧的 assets loader（如 file-loader/url-loader/raw-loader 等）和 asset 模块时，你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决。
:::

::: danger 注意
在`npm run build`命令，图像标签的 src 被构建为&lt;img src="[object Module]"&gt;。这是因为file-loader版本过高导致的，esModule选项已在4.3.0版本的文件加载器中引入，而在5.0.0版本中，默认情况下已将其设置为true。

一种解决方案是：安装4.3.0以下版本的file-loader；

另一种解决方案是：使用4.3.0以上版本的file-loader,需设置esModule: false；
:::

有时候我们处理后的文件名称想按照一定的规则进行显示，比如保留原有文件名及扩展名，同时为了防止重复在原有文件名后包含一个hash值。

这时可以使用PlaceHolders来完成，webpack给我们提供了大量的PlaceHolders来显示不同的内容，[点击文档](https://webpack.docschina.org/loaders/file-loader/#placeholders)来查阅更多自己需要的PlaceHolders。

这里介绍几个常用的PlaceHolders：
* `[ext]`：目标文件或资源的文件扩展名；
* `[name]`：文件或资源的 basename；
* `[hash]`：指定生成文件内容哈希值的哈希方法；
* `[contentHash]`：在file-loader中和`[hash]`结果是一致的（在webpack的一些其他地方不一样，后面会讲到）；
* `[hash:<length>]`：截取hash的长度，默认32个字符；
* `[path]`：文件相对于 webpack/config context 的资源路径；

我们可以按照如下的格式编写，设置文件的名称及所在目录，这也是Vue的写法：

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "img/[name]_[hash:6].[ext]",
              esModule: false
            }
          },
        ],
        type: 'javascript/auto'
      },
    ],
  },
};
```

前面的配置我们通过/img已经设置了文件夹，当然也可以通过`outputPath`来设置输出的文件夹：
``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name]_[hash:6].[ext]",
              outputPath: "img",
              esModule: false
            }
          },
        ],
        type: 'javascript/auto'
      },
    ],
  },
};
```

下面通过`npm run build`命令打包，查看dist文件夹。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/10_file-loader设置图片存放路径及文件名.png')" alt="file-loader设置图片存放路径及文件名">


### url-loader

url-loader 功能类似于 file-loader, 但是在文件大小（单位为字节）低于指定的限制时，可以转换为 base64 URI。

安装 url-loader：

```
npm install url-loader -D
```

webpack.config.js配置Rule：

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "img/[name]_[hash:6].[ext]",
              esModule: false
            }
          }
        ],
        type: 'javascript/auto'
      },
    ],
  },
};
```

打包后浏览器中图片可以正常展示，但是dist文件夹中不会看到图片，原因是默认情况下url-loader会将所有图片转化成base64编码。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/11_url-loader默认打包.png')" alt="url-loader默认打包">

但在开发中我们往往是小的图片进行转化，大的图片直接使用图片。因为小的图片转化成base64之后可以和页面一起请求下来，浏览器就可以解析从而减少了不必要请求过程。而大的图片如果也进行转换，反而会影响页面的请求速度。

url-loader有一个options属性`limit`，可以用于转换时的限制。我们有两张图片大小分别是：38kb和295kb，我们在webpack.config.js中设置一个限额将38kb的图片进行base64编码，而295kb图片不会。

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100*1024,
              name: "img/[name]_[hash:6].[ext]",
              esModule: false
            }
          }
        ],
        type: 'javascript/auto'
      },
    ],
  },
};
```

打包后dist文件夹：

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/12_url-loader配置options属性limit后的dist文件夹.png')" alt="url-loader配置options属性limit后的dist文件夹">


### asset module type

#### 认识asset module type

资源模块（asset module）是一种模块类型，它允许使用资源文件（字体、图标等）而无需配置额外的loader。

我们当前使用webpack版本是webpack5，而在webpack5之前，通常使用：file-loader、url-loader、raw-loader。

从webpack5开始，资源模块类型（asset module type），通过添加4中新的模块类型，来替换所有这些loader:
* asset/resource：发送一个单独的文件并导出URL。之前通常使用 file-loader 实现；
* asset/inline：导出一个资源的 data URI。之前通常使用 url-loader 实现；
* asset/souce：导出资源的源代码。之前通常使用 raw-loader 实现；
* asset：在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

#### asset module type的使用

1. 类似file-loader的效果

加载图片时可以使用如下Rule：
``` js
{
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: "asset/resource"
}
```

想自定义文件的输出路径和文件名称，有两种方式：

* 修改output，添加assetModuleFilename属性：

``` js
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "img/[name]_[hash:6][ext]",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource"
      }
    ]
  },
};
```

* 在Rule中，添加一个generator属性，并设置filename；

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name]_[hash:6][ext]",
        }
      }
    ],
  },
};
```

2. 类似url-loader的limit效果

将type修改为asset，添加parser属性并且制定dataUrlCondition的条件，添加maxSize属性。

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator: {
          filename: "img/[name]_[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          }
        },
      }
    ],
  },
};
```

### 加载字体文件

如果我们需要使用某些特殊的字体或者字体图标，那么我们会引用很多的字体文件，这些字体文件的处理也是一样的。

将字体文件放到`./src/font`目录下，在`，./src/js/element.js`文件内创建i元素用于显示图标：

``` js
// 引入字体图标的css文件  
import "../font/iconfont.css";

// 3. 创建i元素
const iEle = document.createElement("i");
iEle.className = "iconfont icon-ashbin";

document.body.appendChild(iEle);
```

我们直接使用webpack5的资源模块类型来处理字体文件，在webpack.config.js中书写Rule：

``` js
{
  test: /\.(eot|ttf|woff2?)$/i,
  type: "asset/resource",
  generator: {
    filename: "font/[name]_[hash:6][ext]"
  }
}
```

打包后dist文件夹：

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/13_使用资源模块类型处理字体文件.png')" alt="使用资源模块类型处理字体文件">


## 认识Plugin

Webpack的另外一个核心是Plugin，官方对Plugin的描述：

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

### CleanWebpackPlugin

前面我们演示案例的过程中，每次修改了配置，重新打包时，都需要手动删除dist文件夹。现在我们可以借助CleanWebpckPlugin插件来完成。

首先安装插件：

```
npm install clean-webpack-plugin -D
```

之后在webpack.config.js配置插件：

``` js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 其他省略
  plugins: [
    new CleanWebpackPlugin(),
  ]
}
```

### HtmlWebpackPlugin

另外还有一个不太规范的地方是，我们的HTML文件是编写在根目录下的，而最终打包的dist文件夹中是没有index.html文件的。之后对项目进行部署时，必须需要有对应的入口文件index.html，所以需要对index.html进行打包处理。

对HTML进行打包处理可以使用另外一个插件：HtmlWebpackPlugin。

安装插件：
```
npm install html-webpack-plugin -D
```

之后在webpack.config.js配置插件：

``` js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 其他省略
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```

之后在进行`npm run build`命令打包后，dist文件夹会自动生成index.html文件。该文件中会自动添加打包的bundle.js文件。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/14_使用HtmlWebpackPlugin插件打包后dist文件夹下html文件.png')" alt="使用HtmlWebpackPlugin插件打包后dist文件夹下html文件">

原理是：在html-webpack-plugin插件的源码中，有一个default_index.ejs模块。默认情况下index.html文件根据ejs的一个模板来生成的。

如果我们想在自己的模块中加入一些比较特别的内容：
* 比如添加&lt;noscript&gt;标签，在用户的JavaScript被关闭时，给予响应提示；
* 比如开发vue项目时，需要一个可以挂载后续组件的根标签&lt;div id="app"&gt;&lt;/div&gt;

我们需要自定义一个属于自己的index.html模块，此文件放到项目目录下public文件夹内，之后以此为模板进行整个项目打包，项目目录下的index.html文件就可以删除了：

``` html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

上面的代码中，会有一些类似这样的语法<% 变量 %>，这个是EJS模块填充数据的方式。

接下来在配置HtmlWebpackPlugin时，可以添加如下配置：
* template属性：用来指定要使用模块的路径；
* title属性：在进行htmlWebpackPlugin.options.title读取时，就会读到该信息；

``` js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 其他省略
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack资源案例"，
      template: "./public/index.html"
    })
  ]
}
```

### DefinePlugin

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/15_自定义index.html模板编译报错.png')" alt="15_自定义index.html模板编译报错">

编译报错是因为在编译template模块时，有一个BASE_URL的常量我们没有定义过，&lt;link rel="icon" href="&lt;%= BASE_URL %&gt;favicon.ico"&gt;，所以会出现没有定义的错误。

这时我们可以使用DefinePlugin插件，这个插件是webpack内置的插件，不需要单独安装，作用是：允许在编译时创建配置的全局常量。

``` js
const { DefinePlugin } = require("webpack");

module.exports = {
  // 其他省略
  plugins: [
    new DefinePlugin({
      BASE_URL: "'./'"
    })
  ]
}
```

### CopyWebpackPlugin

在vue打包过程中，如果我们有些文件放到public目录下，那么这个目录的文件会被复制到dist文件夹中。这个复制功能可以使用`CopyWebpackPlugin`插件来完成。

安装CopyWebpackPlugin插件：

```
npm install copy-webpack-plugin -D
```

接下来配置CopyWebpackPlugin，规则在patterns中设置：
* from：设置从哪一个源中开始复制；
* to：复制到的位置，可以省略，会默认复制到打包目录下；
* globOptions：设置一些额外的选项，其中可以编写需要省略的文件：
  * index.html：不需要复制，通过HtmlWebpackPlugin插件完成了index.html的生成；

``` js
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // 其他省略
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public", 
          to: "./",
          globOptions: {
            ignore: ["**/index.html"]
          }
        }
      ]
    })
  ]
}
```

### Mode和Devtool配置

Mode配置选项可以告知webpack使用哪种响应模式的内置优化，默认值是production，有none|development|production这几个可选值。下面是几个可选值的详细讲解：

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/16_mode的可选值有哪些.png')" alt="mode的可选值有哪些">

一般开发阶段设置development，准备打包上线时设置production。

Devtool有很多，这里设置source-map，为了建立js映射文件，方便之后调试代码和错误位置。

应用场景：

当在element.js中打印`content.length`，其实content是没有定义的，打包后浏览器肯定会报错的。但错误的位置不利于查找。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/17_未定义变量报错.png')" alt="未定义变量报错">

我们可以在webpack.config.js中设置mode和devtool：

``` js
module.exports = {
  // 其他代码省略
  mode: "development",
  devtool: "source-map",
};
```

之后打包会生成一个bundle.js的source-map文件，这个文件是bundle.js的映射文件，之后在打开浏览器就能准确定位错误的位置。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/18_设置mode和devtool后准确定位报错位置.png')" alt="设置mode和devtool后准确定位报错位置">


## babel

### 为什么需要babel

在开发中我们很少去接触babel，但是babel对前端来说，目前是不可缺少的一部分。

开发中，我们想使用ES6+语法，想使用TypeScript，开发React项目都是离不开babel的。所以学习babel对于理解代码从编写到线上的转化过程有至关重要的作用。

[官方](https://babeljs.io/docs/en/)对babel的解释是：

Babel 是一个工具链，主要用于在当前和旧浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容的 JavaScript 版本。

babel主要做的事情：转化语法和源代码转换。

### babel在命令行使用

babel本身作为**一个独立的工具**（和PostCSS一样），不和webpack等构建工具配置来单独使用也可以。

尝试在命令行使用babel，需要安装如下库：
* @babel/core：babel的核心代码，必须安装；
* @babel/cli：babel带有一个内置的 CLI，可用于从命令行编译文件；

```
npm install @babel/core @babel/cli -D
```

使用babel来处理源代码：
* src：源文件的目录，也可以是文件；
* --out-dir：输出的文件夹，dist；
* --out-file：输出到文件，test-compiled.js；

``` js
npx babel src --out-file dist
// 或者
npx babel src --out-file test-compiled.js
```

我们编写一个包含ES6语法的js文件：

``` js
// test.js

const name = "Hello World";
const arr = ["cba", "nba", "abc"];

arr.forEach(item => console.log(item));
```

下面在命令行输入如下命令对源代码进行转换：

``` js
npx babel test.js --out-file test-compiled.js
```

我们发现转化后的test-compiled.js文件依然是ES6的语法，因为在使用babel的时候如果想把某些语法进行转化必须使用对应的插件。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/19_babel对源文件进行转换.png')" alt="babel对源文件进行转换">

### 插件的使用

我们需要转换箭头函数，就使用箭头函数转换的相关插件，安装插件：

``` js
npm install @babel/plugin-transform-arrow-functions -D
```

命令行输入命令：

``` js
npx babel test.js --out-file test-compiled.js --plugins=@babel/plugin-transform-arrow-functions
```

可以看到箭函数已经转换了，但const并没有转换为var。这是因为`plugin-transform-arrow-functions`，并没有这样的功能。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/20_使用了针对箭头函数的插件.png')" alt="使用了针对箭头函数的插件">

针对const转换需要使用`plugin-transform-block-scoping`来完成，安装插件：

``` js
npm install @babel/plugin-transform-block-scoping -D
```

命令行输入命令，需要两个插件来完成：

``` js
npx babel test.js --out-file test-compiled.js --plugins=@babel/plugin-transform-arrow-functions,@babel/plugin-transform-block-scoping
```

但如果转换的内容过多，一个个设置是比较麻烦的，我们可以使用babel提供的预设（preset），预设也就是将多个常用的ES6插件集合到一起了，后面再讲预设代表什么含义。

安装@babel/preset-env预设：

```
npm install @babel/preset-env -D
```

执行如下命令就可以对箭头函数和const关键字进行转换了：

```
npx babel test.js --out-file test-compiled.js --presets=@babel/preset-env
```

而且预设还标识使用严格模式：

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/21_使用babel提供的预设转化后结果.png')" alt="使用babel提供的预设转化后结果">

### babel的底层原理

babel是如何将一段代码（ES6、TypeS）转换为另一段代码（ES5）,事实上从一种源代码（原生语言）转换成另一种源代码（目标语言）这一工作就是编译器。

我们可以将babel看成是一个编译器，babel编译器的作用就是将我们的源代码转换成浏览器可以直接识别的另一段源代码。

babel也拥有编译器的工作流程：
* 解析阶段（Parsing）
* 转换阶段（Transformation）
* 生成阶段（Code Generation）

未完待续……


### 在webpack中使用babel

在实际开发中，我们通常在构建工具比如webpack中通过配置babel来对其进行转换。那么就需要去安装相关依赖了，如果之前已经安装了`@babel/core`就不需要再次安装了。

```
npm install babel-loader @babel/core -D
```

我们可以设置一个规则，在加载js文件的时候使用babel，而且必须使用插件才能生效。

``` js
// webpack.config.js

{
  test: /\.m?js$/i,
  use: [
    {
      loader: "babel-loader",
      options: {
        plugins: [
          "@babel/plugin-transform-arrow-functions",
          "@babel/plugin-transform-block-scoping"
        ]
      }
    }
  ]
}
```

如果我们一个个去装使用插件，那么需要手动来管理大量的babel插件，我们可以直接给webpack提供一个preset，webpack会根据我们的预设来加载对应的插件列表，并且传递给babel。

常见的预设有三个：
* env;
* react;
* TypeScript;

安装preset-env：

```
npm install @babel/preset-env -D
```

之后设置规则：

``` js
// webpack.config.js

{
  test: /\.m?js$/i,
  use: [
    {
      loader: "babel-loader",
      options: {
        presets: [
          ["@babel/preset-env"]
        ]
      }
    }
  ]
}
```

也可像之前PostCSS一样，将babel的配置信息当道一个独立的文件中，babel给我们提供了两种配置文件的编写：
* 一种：babel.config.json（或者.js、.cjs、.mjs后缀名都可）文件，；
* 另一种：babelrc.json（或者.babelrc、.js、.cjs、.mjs后缀名都可）文件；

它们之间的区别是：目前很多项目都采用了多包管理的方式，而.babelrc.json是早期使用较多的配置方式，对于配置Monorepos项目是比较麻烦的。babel.config.json（babel7）可以直接作用于Monorepos项目的子包，更加推荐。

我们在根目录新建`babel.config.js`文件，配置信息写入：

``` js
module.exports = {
  presets: [
    ["@babel/preset-env"]
  ]
}
```

`webpack.config.js`中规则修改如下：

``` js
{
  test: /\.m?js$/i,
  use: [
    {loader: "babel-loader"}
  ]
}
```

## webpack对vue的处理

### js文件中写vue代码并打包
我们学习Vue应该包含Vue相关的代码：

``` js
import { createApp } from "vue";

// vue代码
const app = createApp({
  template: "<h2>Hello World</h2>",
  data() {
    return {
      title: "你好啊，李银河"
    }
  }
});

app.mount("#app");
```

当打包后浏览器界面上是没有模板内容显示的，而且命令行也没有报错信息，接着我们查看控制台发现有警告信息：

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/22_vue代码控制台警告信息.png')" alt="vue代码控制台警告信息">

翻译是：**组件提供了模板选项，但此 Vue 版本不支持运行时编译。**意思是说，我们当前Vue代码中有模板template，而引用的Vue版本是没办法解析模板template的。

我们查看`node_modules`中Vue有多个版本，在dist文件夹下：

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/23_node_modules中vue多个版本.png')" alt="node_modules中vue多个版本">

### vue的不同版本选择

统一说明下：
* 下面讲解不同的版本内容，括号中是可选的参数；
* 包含.runtime的文件说明：此文件是不包含compiler的，不能编译template模板；
* 包含.prod的文件说明：此文件是丑化过（压缩过）的，在生产阶段使用的；

下面讲解不同的版本：
* vue(.runtime).global(.prod).js:
  * 此版本是之前通过CDN引入或者下载至本地的Vue版本；
  * 在浏览器中通过`&lt;script src="…"&gt;`直接使用；
  * 会暴露一个全局的Vue来使用；
* vue(.runtime).esm-browser(.prod).js:
  * 此版本用于通过原生ES Module导入使用（在浏览器中通过`&lt;script type="module" src="…"&gt;`来使用）
* vue(.runtime).esm-bundler.js:
  * 此版本用于webpack、rollup、parcel等构建工具使用；
  * 在构建工具中默认使用的是`vue.runtime.esm-bundler.js`，此版本是不能解析模板template，如果需要解析模板template，就要手动指定`vue.esm-bundler.js`;
* vue.cjs(.prod).js:
  * 此版本是服务器端渲染使用；
  * 通过require()在Node.js中使用；

了解vue的不同版本后，对引入vue包进行修改，之后在浏览器就可以显示template模板中的内容了。

``` js
import { createApp } from "vue/dist/vue.esm-bundler";
```

对于什么时候使用**runtime+compiler(运行时+编译器)**什么时候使用**runtime only(仅运行时)**肯定有疑惑？下面通过在Vue开发过程中编写DOM元素的方式来分情况讨论。

在Vue开发过程中我们有三种方式来编写DOM元素：
* 方式一：template模板的方式（也是之前经常使用的方式）；
* 方式二：render函数的方式，使用h函数来编写渲染的内容；
* 方式三：通过.vue文件中template来编写模板；

它们是如何处理的：
* 方式二是通过h函数直接返回一个虚拟节点，也就是VNode节点。
* 方式一和方式三中template都需要有特定的方式来对其进行解析：
  * 方式三.vue文件中的template可以通过`vue-loader`对其进行编译处理；
  * 方式一中的template必须**通过源码中一部分代码**来进行编译处理；

所以，Vue在让我们选择版本的时分为**运行时+编译器**和**仅运行时**：
* **运行时+编译器**包含了对template模板的编译代码，更加完整包体积也更大一些；
* **仅运行时**没有包含对template模板的编译代码，包体积也相对更小一些；

### 编写.vue文件对其打包

在前面提到，真实开发大多数情况下都是使用SFC（Single-file Components(单文件组件)）。

在VSCode对SFC的支持：
* 插件一：Vetur，从Vue2开发就一直在使用的VSCode支持Vue的插件；
* 插件二：Volar，官方推荐的插件（后续会基于Volar开发官方的VSCode插件）；

我们编写一个App.vue文件，在createApp导入使用：

``` vue
<template class="app">
  <h2>Hello World</h2>
  <p>{{title}}</p>
</template>

<<script>
export default {
  data() {
    return {
      title: "你好啊，李银河"
    }
  }
}
</script>

<style scoped>
  h2 {
    color: red;
  }

  p {
    color: blue;
  }
</style>
```

``` js
import { createApp } from "vue/dist/vue.esm-bundler";
import App from "./vue/App.vue";

createApp(App).mount("#app");
```

我们对代码打包会报错，我们需要一个合适的loader来处理.vue文件。

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/25_需要一个合适的loader处理.vue文件.png')" alt="需要一个合适的loader处理.vue文件">

安装vue-loader：

```
npm install vue-loader@next -D
```

在webpack.config.js中进行配置规则：

``` js
{
  test: /\.vue$/,
  use: [
    {
      loader: "vue-loader"
    }
  ]
}
```

进行以上配置后打包还是会报错，是因为必须添加`@vue/compiler-sfc插件`来对template进行解析，vue-loader是依赖@vue/compiler-sfc插件对template进行解析的，

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/26_vue-loader需要插件解析template.png')" alt="vue-loader需要插件解析template">

安装@vue/compiler-sfc插件：
```
npm install @vue/compiler-sfc -D
```

配置对应的插件：

``` js
const { VueLoaderPlugin } = require("vue-loader/dist/index");

module.exports = {
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

重新打包即支持App.vue的写法，我们也可以编写其他的.vue文件来作为App的子组件。


### 全局标识的配置

我们会发现浏览器的控制台还有另外一个警告：

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/24_需要全局标识的配置.png')" alt="需要全局标识的配置">

我们点击[链接](https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags)进入，在GitHub上的文档中我们可以找到说明：

<img class="medium" :src="$withBase('/frontend/frame/vue3/05_learn-webpack/27_全局标识匹配说明.png')" alt="全局标识匹配说明">

在esm-bundler 3.0.0-rc.c版本时，需要设置两个特性的标识：
* 一个是Vue的Options API，是对Vue2做适配的。默认是true，
  * 在Vue源码中是有对Options API做解析的，但我们在代码中全部使用Vue3的Composition API就不需要对Options API做解析，应该在源码中删除。
* 一个是Vue在Production模式下是否支持devtools工具。默认是false。

虽然都有默认值，但是强烈建议手动对它们进行配置。以便在最终捆绑包中进行适当的摇树。也就是对不需要的代码在源代码中删减，最终的包体积会减少。

在webpack的DefinePlugin中设置：

``` js
module.exports = {
  plugins: [
    new DefinePlugin({
      // 其他代码
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
  ]
}
```

之后打包浏览器控制台就没有警告信息了。