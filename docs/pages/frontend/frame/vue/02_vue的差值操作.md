## Mustache语法
通过`Mustache语法`（也就是双大括号）可以将data中的文本数据插入到HTML中。

``` html
<body>
  <div id="app">
    <h2>{{message}}</h2>
    <h2>{{message}}，李银河</h2>
  </div>

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

上例中，data中定义了数据message，在h2中使用`Mustache语法`，能将数据实时的展示到对应位置。

在`Mustache语法`中，不仅可以简单的绑定值外，还可以使用JavaScript表达式进行简单的运算,下面两种方式效果都是一样的。

``` html
<body>
  <div id="app">
    <h2>{{firstName + " " + lastName}}</h2>
    <h2>{{firstName}} {{lastName}}</h2>
  </div>

  <script>
    const app = new Vue({
      el: "#app",
      data: {
        firstName: "Kobe",
        lastName: "Bryant"
      }
    })
  </script>
</body>
```

::: danger 注意
`Mustache语法`不支持语句和流控制。

``` js
//不支持
{{ var book = 'Vue.js实战' }}
{{ if(ok) return msg }}
```
:::


## v-once
该指令后面不需要跟任何表达式（比如之前的v-for后面是要跟表达式的）。

该指令表示元素和组件只渲染一下，不会随着数据的改变而改变。
``` html
<body>
  <div id="app">
    <h2 v-once>{{message}}</h2>
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

<img class="medium" :src="$withBase('/frontend/frame/vue/02_vue-instruction/01_v-once.png')" alt="v-once指令的使用">


## v-html
当从服务器请求到的数据本身就是一个HTML标签，如果通过Mustache语法输出，会将HTML标签原样输出。我们希望解析HTML标签，并显示对应的内容。

我们使用`v-html`指令，该指令往往会跟上String类型数据，将String类型数据内的HTML标签解析并渲染出内容。

``` html
<body>
  <div id="app">
    <!-- 使用Mustache语法的结果 -->
    {{url}}
    <h2 v-html="url"></h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        url: '<a href="https://www.baidu.com">百度一下</a>'
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/02_vue-instruction/02_v-html.png')" alt="v-html指令的展示">

`v-text`与`v-html`的区别：

* 当使用`v-text`时，则会将所绑定的数据原样显示，Mustache语法也是一样，这时候就需要`v-html`指令解析html标签，渲染内容。

## v-text

将message用变量的形式赋值给div中的属性，依然可以进行显示数据。
``` html
body>
  <div id="app">
    <h2>{{message}}</h2>
    <h2 v-text="message"></h2>
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
<img class="medium" :src="$withBase('/frontend/frame/vue/02_vue-instruction/03_v-text.png')" alt="v-text指令的展示">

虽然`v-text`与`Mustache语句`都可以将数据显示出来，但也有区别：

* 当使用`v-text`时，data数据会将之前的HTML元素中的值覆盖，并会清空；而在`Mustache语法`中，data数据只会将占位符位置进行覆盖，其他的值不会发生变化，也不会清空。

``` html
<body>
  <div id="app">
    <h2>{{message}}，李银河</h2>
    <h2 v-text="message">，李银河</h2>
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

<img class="medium" :src="$withBase('/frontend/frame/vue/02_vue-instruction/04_v-text与Mustache语法的区别.png')" alt="v-text与Mustache语法的区别">


## v-pre

将标签之间的内容原样输出，不作任何解析。

``` html
<body>
  <div id="app">
    <h2>{{message}}</h2>
    <h2 v-pre>{{message}}</h2>
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

<img class="medium" :src="$withBase('/frontend/frame/vue/02_vue-instruction/05_v-pre.png')" alt="v-pre指令的使用">


## v-bloak

在某些情况下，浏览器可能会直接显示出未编译的Mustache语法。

在vue解析之前，div中有一个属性`v-bloak`，只要有这个属性的标签就隐藏起来。在vue解析之后，div没有一个属性`v-bloak`，所以显示出来数据。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    [v-bloak] {
      display: none;
    }
  </style>
</head>
<body>
  <div id="app" v-bloak>
    <h2>{{message}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好啊"
      }
    });
  </script>
</body>
</html>
```
