## 简单认识Vue.js

* Vue (读音 /vjuː/，类似于 view) ;
* `Vue.js`是一个渐进式框架，渐进式意味着你可以将Vue作为你应用的一部分嵌入其中，带给你丰富的交互体验。你也可以将更多的业务逻辑使用Vue来实现（Vue全家桶）;

## Vue.js的优点和特点

优点：
* 简单小巧的核心即Vue.js压缩后大小仅为17KB；
* 渐进式技术栈即可以有阶段地使用Vue.js，不必一开始就使用所有东西；

特点：
* 解耦数据和视图；
* 可复用的组件；
* 前端路由技术；
* 状态管理（Vuex）；
* 虚拟DOM；

## 安装Vue

安装使用Vue有以下几种方式：

### 直接CDN引入
这里的Vue就会被注册成全局变量，你可以引入开发环境版本或生产环境版本。
``` js
// 开发环境版本，包含了有帮助的命令行警告
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

// 生产环境版本，优化了尺寸和速度
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
```

### 下载到本地引用

* 将资源下载到本地；
``` js
// 开发环境
https://cn.vuejs.org/js/vue.js

// 生产环境
https://cn.vuejs.org/js/vue.min.js
```
* 通过`<script>`标签引入

### NPM安装
后续通过webpack和CLI使用该方式，
``` ks
npm install vue --save
```

## Vuejs初体验

### Hello VueJS
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <h2>Hello {{name}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        name: "VueJS"
      }
    })
  </script>
</body>
</html>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/01_first-acquaintance-vue/01_HelloVueJS.png')" alt="Hello VueJS">

当我们引入`vue.js`包的时候，就可以创建一个`Vue`的实例对象。其中，变量`app`就代表了这个Vue实例。我们可以在创建Vue的时候传入一些options：{}。{}包含了`el`属性和`data`属性。`el`属性决定了这个Vue对象挂载到id为app的元素上；`data`属性用于存储数据，这些数据可以是我们直接定义的数据也可以是来自网络从服务器加载的数据。

<img class="medium" :src="$withBase('/frontend/frame/vue/01_first-acquaintance-vue/02_响应式.png')" alt="Hello VueJS">

当我们在控制台通过`app.name = "coderz"`来修改data数据之后，会自动更新界面。这也证明了响应式。

### Vue列表展示

下面展示复杂一点的数据：数据列表。需要在HTML代码中使用`v-for`指令。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <ul>
      <li v-for="item in movies">{{item}}</li>
    </ul>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        movies: ["速度与激情8", "星际穿越", "大话西游"]
      }
    })
  </script>
</body>
</html>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/01_first-acquaintance-vue/03_Vue列表展示.png')" alt="Vue列表展示">

更重要的是它也是响应式的。也就是说，数组中的数据发生改变时，界面会自动改变。下面是在控制台修改数组中的数据界面发生改变。

<img class="medium" :src="$withBase('/frontend/frame/vue/01_first-acquaintance-vue/04_列表展示的响应式.png')" alt="列表展示的响应式">

### 计数器

下面完成小的计数器案例，当点击`+1`时计数器+1，当点击`-1`时计数器-1。

这里又需要新的指令和属性：
* 新的指令：@click，该指令用于监听某个元素的点击事件，并且需要指定当点击时，执行的方法（方法是methods中定义的方法）；
* 新的属性：methods，该属性用于在Vue对象中定义方法；

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <h2>{{number}}</h2>
    <button @click="increment()">+1</button>
    <button @click="decrement()">+1</button>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        number: 0
      },
      methods: {
        increment() {
          this.number++;
        },
        decrement() {
          this.number--;
        }
      },
    })
  </script>
</body>
</html>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/01_first-acquaintance-vue/05_计数器案例.png')" alt="计数器案例">

## Vue的MVVM
MVVM分为三部分：分别是M（Model，数据层），V（View，视图层），VM（ViewModel，视图模型层）。

<img class="medium" :src="$withBase('/frontend/frame/vue/01_first-acquaintance-vue/06_MVVM.png')" alt="MVVM">

Model：主要是负责业务数据相关；这里面的数据可能是我们固定下来的死数据，更多的是来自我们服务器从网络请求下来的数据；

View：负责视图相关；在我们前端开发中，通常就是DOM层；

ViewModel：它是View与Model沟通的桥梁，一方面它实现了`Data Binding`，也就是数据绑定，将Model的改变事实的反映到View中。另一方面它实现了`DOM Listener`，也就是DOM监听，为DOM发生一些事件（点击、滚动、touch等）时可以监听到，并在需要的情况下改变对应的Data；

在计数器案例中就有严格的MVVM思想，View依然是我们的DOM，Model就是我们的data数据，ViewModel就是我们创建的Vue对象实例。首先viewModel通过Data Binding让Data中的数据实时的在DOM中显示，其次ViewModel通过DOM Listener来监听DOM事件，通过methods的操作，来改变data中的数据。

有了Vue帮助我们完成ViewModel的处理，后续的开发我们可以专注于数据的处理和DOM结构的编写工作了。

