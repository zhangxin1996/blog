## v-bind介绍

当某些属性需要动态来绑定，例如：动态绑定a元素的href属性，动态绑定img元素的src属性。Vue提供了属性绑定的指令`v-bind`。

v-bind指令：
* 作用：动态绑定属性；
* 缩写：`:`;
* 预期：any（with angument）| Object（without angument）
* 参数：attrOrProp（optional）;


## v-bind基本使用

v-bind用于绑定一个或多个属性值，或者向另一个组件传递props值(这个学到组件时再介绍)。

``` html
<body>
  <div id="app">
    <img v-bind:src="imgUrl" alt="">
    <a v-bind:href="aHref">百度一下</a>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        imgUrl: "https://cn.vuejs.org/images/logo.png",
        aHref: "https://www.baidu.com"
      }
    })
  </script>
</body>
```
<img class="medium" :src="$withBase('/frontend/frame/vue/04_v-bind/01_v-bind的基本使用.png')" alt="v-bind的基本使用">

## v-bind语法糖
v-bind有一个对应的语法糖，也就是简写。在开发中，我们通常使用语法糖的形式，因为这样更加简洁。

``` html
<div id="app">
  <img :src="imgUrl" alt="">
  <a :href="aHref">百度一下</a>
</div>
```

## v-bind动态绑定class（对象语法）

设置一个对象，为class属性绑定对象。其中对象的键为类名，对象的值为布尔值。当布尔值为true时，为class添加类名，反之则不添加。

::: danger 注意
如果class绑定的对象的键中有`-`的话，需要用引号括起来，例如：`"font-size"`。
:::

``` html
<head>
  <style>
    .red {
      color: #ff0000;
    }
    .thin {
      font-weight: 800;
    }
  </style>
</head>

<body>
  <div id="app">
    <h2 :class="{red: isActive, thin: isError}">{{message}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊",
        isActive: true,
        isError: true
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/04_v-bind/02_v-bind动态绑定class之对象语法.png')" alt="v-bind动态绑定class之对象语法">


当和普通的class同时存在，并不冲突。最终展现的class为普通的class和动态要展示的class。

``` html
<body>
  <div id="app">
    <h2 class="title" :class="{red: isActive, thin: isError}">{{message}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊",
        isActive: true,
        isError: true
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/04_v-bind/03_当有普通的class.png')" alt="当有普通的class">

如果`:class`表达式过长或逻辑复杂时，可以放在一个methods或者computed中。
``` html
<style>
    .red {
      color: #ff0000;
    }
    .thin {
      font-weight: 800;
    }
  </style>
</head>
<body>
  <div id="app">
    <!-- methods -->
    <h2 class="title" :class="getClasses1()">{{message}}</h2>
    <!-- computed -->
    <h2 class="title" :class="classes2">{{message}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊",
        isActive: true,
        isError: true
      },
      methods: {
        getClasses1() {
          return {red: this.isActive, thin: this.isError}
        }
      },
      computed: {
        classes2() {
          return {
            red: this.isActive,
            thin: this.isError
          }
        }
      }
    })
  </script>
</body>
```

## v-bind动态绑定class（数组语法）

数组语法的含义是`:class`后面跟的是一个数组。直接通过[]绑定一个类，也可以是多个类。
``` html
<head>
  <style>
    .red {
      color: #ff0000;
    }
    .thin {
      font-weight: 800;
    }
  </style>
</head>
<body>
  <div id="app">
    <div :class="['red', 'thin']">{{message}}</div>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊"
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/04_v-bind/04_v-bind动态绑定class之数组语法.png')" alt="v-bind动态绑定class之数组语法">

也可以和普通的类同时存在，并不冲突。

``` html
<head>
  <style>
    .red {
      color: #ff0000;
    }
    .thin {
      font-weight: 800;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="title" :class="['red', 'thin']">{{message}}</div>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊"
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/04_v-bind/05_当有普通的class.png')" alt="当有普通的class">

如果`:class`表达式过于复杂，也可以放到methods或者computed中。

``` html
<head>
  <style>
    .red {
      color: #ff0000;
    }
    .thin {
      font-weight: 800;
    }
  </style>
</head>
<body>
  <div id="app">
    <!-- methods方式 -->
    <h2 :class="getClasses1()">{{message}}</h2>
    <!-- computed方式 -->
    <h2 :class="classes2">{{message}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊"
      },
      methods: {
        getClasses1() {
          return ['red', 'thin'];
        }
      },
      computed: {
        classes2() {
          return ['red', 'thin']
        }
      }
    })
  </script>
</body>
```

## v-bind动态绑定style（对象语法）

其中对象的属性名为样式的属性名，对象的属性值为样式的属性值（属性值可以是data中的属性）。

::: tip 提示
在写CSS属性的时候，例如`font-size`，我们可以使用驼峰式（camelCase）`fontSize`，或者使用短线分割（kebab-case，记得用单引号括起来）`"font-size"`。
:::

``` html
<body>
  <div id="app">
    <!-- <h2 :style="{样式的属性名: 样式的属性值}">{{message}}</h2> -->
    <h2 :style="{backgroundColor: finalBgColor}">{{message}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊",
        finalBgColor: "red"
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/04_v-bind/06_v-bind动态绑定style之对象语法.png')" alt="v-bind动态绑定style之对象语法">

如果`:style`表达式过于复杂，也可以放到methods或者computed中。


## v-bind动态绑定style（数组语法）

`:style`后面跟的是一个数组类型，多个值之间以逗号分隔。
``` html
<body>
  <div id="app">
    <h2 :style="[baseStyle1, baseStyle2]">{{message}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊",
        baseStyle1: {backgroundColor: "pink"},
        baseStyle2: {fontSize: "50px"}
      },
      
    })
  </script>
</body>
```
<img class="medium" :src="$withBase('/frontend/frame/vue/02_vue-instruction/11_v-bind动态绑定style之数组语法.png')" alt="v-bind动态绑定style之数组语法">