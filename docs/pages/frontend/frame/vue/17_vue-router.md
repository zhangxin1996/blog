## 认识路由

### 什么是路由

路由是一个网络工程里面的术语。维基百科的解释是：通过互联的网络把信息从源地址传递到目标地址的活动。

在生活中你有路由的概念吗？当然路由器嘛，路由器提供了两种机制：
* 路由：决定数据包从来源到目的地的路径；
* 传送：将输入端的数据转移到合适的输出端；

原理是：一进一出，数据进来给到路由器，路由器根据路由表，找到mac地址，然后根据mac地址绑定的内网ip，传送到终端。


### 后端路由

在早期的网络开发中，整个HTML页面都是由服务器渲染的。

步骤：
* 浏览器发送请求url到服务器；
* 服务器通过正则表达式对url进行匹配，找到对应的jsp页面，后台处理数据返回给浏览器html+css+js页面；
* 由后端处理url和页面之间的映射关系，就称为后端路由；

优点：
* 这样渲染好的页面，不要要单独加载CSS和JS，直接交给浏览器展示；
* 有利于SEO优化；

缺点：
* 当访问一个新页面时，需要向服务器发送请求，之后服务器响应请求，这过程中坑定有延迟；
* 整个页面的模块由后端人员编写和维护，如前端人员要开发页面，需要掌握后端语言来编写页面代码；
* HTML代码和数据以及对应的逻辑都混在一起，不利于之后的编写和维护；

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/01_后端路由.png')" alt="后端路由">

后端渲染是什么：
前端发送请求，后端通过后台模板引擎直接生成好HTML返回给前端，前端展示到界面上。

### 前端路由

#### 前后端分离
随着AJAX的出现，由后端路由成为前后端分离阶段。即后端只提供API接口来返回数据，前端通过AJAX来接受数据，并用JS将接收到的数据渲染到页面上。

步骤：
* 浏览器发送url请求到静态资源服务器；
* 静态资源服务器响应，返回给浏览器静态资源（html+css+js）;
* 浏览器解析js代码时，向api服务器发送ajax请求；
* api服务器响应，进行相关数据处理之后返回；
* 通过js代码处理数据、创建标签等操作，将数据包裹到标签中，之后展示到页面上；

优点：职责划分明确，后端只注重于数据方面，前端只注重于交互和可视化。随着移动端的出现，后端不需要对API进行任何的修改，可直接使用，这种模式现在有很多的网站使用。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/02_前后端分离阶段.png')" alt="前后端分离阶段">

#### 单页面富应用

单页面富应用（SPA）最主要的特点是：在前后端分离的基础上加了一层前端路由。前端路由就是把不同的url对应不同的内容或页面交给前端来处理。

前端来维护一套路由规则，每跳转到不同的URL都是使用前端的锚点路由（#），页面不刷新，来实现不同页面之间的切换。前后端开发的分离，这也是目前项目中最常使用的。

前端路由的主要模式：hash模式和history模式。

步骤：
* 浏览器发送url请求到静态资源服务器，之后请求下来一整套页面；
* 前端路由处理映射关系，这一关系是将url与组件关联，当跳转页面时展示关于此页面的组件。并向API服务器发送请求数据。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/03_前端路由之SPA阶段.png')" alt="前端路由之SPA阶段">

前端渲染是什么：
由后端发送JSON数据给前端，前端利用预先写好的HTML模板，通过for循环遍历将数据拼接字符串，插入到页面上。

### 前端路由的规则

我们使用前端路由在改变url时，不希望页面发生刷新，有两种方法：
* 一种是改变url的hash；
* 一种是HTML5的history模式；

#### url的hash

url的hash也就是锚点（#），可以通过直接赋值`location.hash`来改变href，但是页面不发生刷新。之后在前端路由映射关系中，找出对应的组件并进行渲染。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/04_location的hash值.png')" alt="location的hash值">

#### HTML5的history模式

history接口是HTML5新增的，它有五种模式改变url而不刷新页面。

1. history.pushState()
`history.pushState()`方法向当前浏览器会话的历史堆栈中添加一个状态（增加一个记录）。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/05_history中的pushState.png')" alt="history中的pushState">

执行`history.pushState({}, '', '/home')`会先将`/home`压入栈中，接着执行`history.pushState({}, '', '/home')`再将`/about`压入栈中。

栈是一种数据结构，有一个口诀是：“先进后出，后进先出”。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/07_栈数据结构.png')" alt="栈数据结构">


2. history.replaceState()
`history.replaceState()`方法是把当前页面的历史记录替换掉。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/06_history中的replaceState.png')" alt="history中的replaceState">

使用`history.pushState()`和`history.replaceState()`实现的效果是一样的，但区别是：`pushState()`是在history栈中推入一个历史记录，`replaceState()`是修改当前的历史记录而不是新增一个。


3. history.back()和history.forward()
`history.back()`等于在浏览器界面上的后退按钮。

``` js
history.back()
```

`history.forword()`等于在浏览器界面上的前进按钮。

``` js
history.forward()
```

4. history.go()

可以前进也可以后退只是传递的参数不同。

``` js
history.go(n);

// n为正值时。表示前进n页；
// n为负值时，表示后退m页；
// n为0时，表示刷新；
```

::: danger 注意
history的`back()`、`forword()`、`go()`方法，只有`pushState()`方法可以使用，`replaceState()`方法不能使用。
:::

## 认识vue-router

在Vue中使用的路由插件是：`vue-router`，这也是Vue官方所提供的路由管理器。它和Vue.js是深度集成的，适合用于构建单页面富应用。

我们可以通过访问其官方网站进行学习，[点我学习](https://router.vuejs.org/zh/)。

`vue-router`是基于路由和组件之间的映射关系，路由用于设定访问的路径，路径相匹配上要展示对应的组件。在`vue-router`的单页面富应用上，页面路径的改变就等于组件的切换。

## vue-router基本使用

### 安装

1. 直接下载或CDN，`vue-router`必须在vue之后引用。

``` js
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
<script src="https://cdn.bootcss.com/vue-router/3.0.7/vue-router.min.js"></script>
```

2. npm安装

``` js
npm install vue-router --save
```

### 使用步骤

步骤一：通过npm安装`vue-router`

``` js
npm install vue-router --save
```

步骤二：搭建`vue-router`框架

1. 需导入Vue和VueRouter，因为VueRouter是一个插件，所以调用`Vue.use(VueRouter)`来安装路由插件
``` js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
```

2. 创建路由实例，并传入配置的路由映射匹配关系
``` js
const routes = [
  // 路由映射匹配关系
];

const router = new VueRouter({
  routes
})
```

3. 导出路由实例
``` js
export default router;
```

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/08_创建路由框架.png')" alt="创建路由框架">

4. 在Vue实例中挂载导出的路由实例

``` js
// 导入
import router from './router';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/09_将router实例挂载到Vue实例上.png')" alt="将router实例挂载到Vue实例上">

::: danger 注意
如果对象的属性名和属性值是一样的话，可以使用的增强写法。
:::

步骤三：使用`vue-router`

1. 创建路由组件

``` vue
<!-- Home.vue -->
<template>
  <div>
    <h2>首页标题</h2>
    <p>首页内容，哈哈哈</p>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>

</style>
```

``` vue
<!-- About.vue -->
<template>
  <div>
    <h2>关于标题</h2>
    <p>关于内容，呵呵呵</p>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
  
</style>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/10_创建路由组件.png')" alt="创建路由组件">

2. 配置路由映射：路径和组件映射关系，一个映射关系就是一对象。
``` js
// 导入组件
import Home from '../components/Home.vue';
import About from '../components/About.vue';

const routes = [
  {
    path: '/home',
    component: Home,
    name: 'Home'
  },
  {
    path: '/about',
    component: About,
    name: 'About'
  }
];

const router = new VueRouter({
  routes
});
```

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/11_配置路由映射.png')" alt="配置路由映射">

3. 使用路由：通过`<router-link>`和`<router-view>`

``` html
<!-- App.vue -->
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>

    <router-view></router-view>
  </div>
</template>
```

::: tip 提示
* `<router-link>`最终会渲染为a标签，to属性表示目标路由的链接；
* `<router-view>`相当于占位，当路径发生改变通过路由映射查找对应路径的组件，并将组件渲染到`<router-view>`的位置去；
:::

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/12_使用路由.png')" alt="使用路由">


展示：

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/13_路由简单展示效果.png')" alt="路由简单展示效果">


### 路由的默认路径

如果刚进入页面时，默认没有显示首页组件，必须让用户点击才可以。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/14_刚进入的效果.png')" alt="刚进入的效果">

从上面的图片可以看出，没有任何组件显示出来，这是由于进入到页面的时候，url地址还是根地址。在匹配路由映射时，没有对根路径进行匹配，所以就造成了根路径没有组件显示。

怎样可以让路径默认跳转到首页？非常简单，我们只需要多配置一个映射关系就可以了。

``` js
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    name: 'Home'
  },
  {
    path: '/about',
    component: About,
    name: 'About'
  }
]
```
配置解析：
* 我们在routes中又配置了一个映射；
* path配置的是根路径：/；
* redirect是重定向，也就是我们将根路径重定向到/home的路径下，这样就可以得到我们想要的结果了；


### HTML5的History模式
默认情况下，路径的改变使用的是hash模式，如果喜欢使用HTML5的history模式，只要进行如下配置：

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/15_修改为HTML5的history模式.png')" alt="修改为HTML5的history模式">

效果：
<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/16_history模式效果展示.png')" alt="history模式效果展示">


### router-link补充

在前面使用过`<router-link>`时，我们只是使用了to属性：用于跳转的路径，其实还有其他的属性和其他一些补充。

其他属性：
1. tag属性（修改默认a标签）

`<router-link>`标签在DOM中默认渲染成a标签，可以使用tag属性修改为其他标签。

``` html
<router-link to="/home" tag="button">Home</router-link>
<router-link to="/about" tag="button">About</router-link>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/17_router-link标签添加tag属性效果.png')" alt="router-link标签添加tag属性效果">

2. replace属性（不留下history记录）

添加replace属性就不会留下history记录，所以指定replace的情况下，浏览器界面上的前进和后退按钮不能使用。

``` html
<router-link to="/home" replace>Home</router-link>
<router-link to="/about" replace>About</router-link>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/18_router-link标签添加replace属性效果.png')" alt="router-link标签添加replace属性效果">

3. active-class属性
当`<router-link>`对应的路由匹配成功时，会自动给当前元素设置一个`router-link-active`的class，设置`active-class`可以修改默认的名称。

``` html
<router-link to="/home" active-class="active">Home</router-link>
<router-link to="/about" active-class="active">About</router-link>

<style scoped>
/* .router-link-active {
  color: #f00;
} */

.active {
  color: #f00;
}
</style>
```
<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/19_router-link标签添加active-class效果.png')" alt="router-link标签添加active-class效果">

::: tip 提示
* 在进行高亮显示的导航菜单或者底部tabbar，会使用到该类；
* 但是通常情况下，会直接使用默认的`router-link-active`，不会修改该类的属性；
:::


其他补充：
1. 在router实例中修改linkActive

在router实例中添加属性`linkActiveClass`来匹配路由成功的class。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/20_在router实例中添加属性来匹配路由成功的class.png')" alt="在router实例中添加属性来匹配路由成功的class">

2. 路由使用代码跳转

有时页面的跳转需要执行对应的JavaScript代码。

* 似history.pushState()方式

``` vue
<template>
  <div id="app">
    <button @click="linkToHome">Home</button>
    <button @click="linkToAbout">About</button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    linkToHome() {
      this.$router.push("/home");
    },
    linkToAbout() {
      this.$router.push("/about");
    }
  }
}
</script>
```

* 似history.replaceState()方式

``` vue
<template>
  <div id="app">
    <button @click="linkToHome">Home</button>
    <button @click="linkToAbout">About</button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    linkToHome() {
      this.$router.replace("/home");
    },
    linkToAbout() {
      this.$router.replace("/about");
    }
  }
}
</script>
```

::: danger 注意
一定要使用Router的实例方法，不要直接使用HTML5的history。[查看](router.vuejs.org/zh/api/#router-push)
:::


3. 动态路由

在某些情况下，一个页面的path路径是不确定的。例如：我们进入我的界面，希望是如下路径：

``` js
/profile/zhangsan 
// 或者
/profile/lisi
```

除了前面的`/user`之外，后面还跟上了用户的ID。这种path和component的匹配关系，我们称之为动态路由（也是之后路由传递数据的一种方式）。

1. 创建Profile组件
<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/21_动态路由步骤一创建路由组件.png')" alt="动态路由步骤一创建路由组件">

2. 配置路由映射
<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/22_动态路由步骤二配置路由映射.png')" alt="动态路由步骤二配置路由映射">

3. 在App.vue中使用路由
<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/23_动态路由步骤三在App.vue中使用路由.png')" alt="动态路由步骤三在App.vue中使用路由">

效果：
<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/24_动态路由的效果.png')" alt="动态路由的效果">

::: tip 提示
可以使用`$route.params.id`获取到动态路由的值。但`$route.params.id`的id要与配置路由映射中path的`/user/:id`的id名称要一致。
:::

## 路由的懒加载

### 需求分析

官方给出的解释：
* 当打包构建应用时，JavaScript包会变得非常大，影响页面的加载；
* 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了；

官方的意思是：
当打包构建应用时，不同路由所对应的组件一般情况下是打包到一个js文件中，但很多不同的组件都放到一个js文件中，必然造成这个js文件非常大。如果一次性的从服务器请求下来，需要花费一定的时间，影响页面的加载。

### 路由懒加载做什么

1. 将不同路由所对应的组件分割成不同的js文件；
2. 当该路由被访问时，才会加载对应该路由的组件；

### 路由懒加载的效果

实现前：

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/25_路由懒加载实现前效果.png')" alt="路由懒加载实现前效果">

问题：在上图打包后，js文件会自动生成一些后缀为.map文件，怎么把它去掉不要？

解决办法：在`./config/index.js`中修改一个参数`productionSourceMap:false`，这样最终打包的文件中，就不会出现后缀为.map文件。

后缀为.map文件的作用：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。而有了map文件就可以像未加密的代码一样，准确的输出是哪一行那一列有错。最后你在build之后，发现就没有自动生成一些map文件了。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/26_解决打包出现map文件的问题.png')" alt="解决打包出现map文件的问题">

实现后：
<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/27_实现路由懒加载.png')" alt="实现路由懒加载">

### 懒加载的方式

方式一：结合Vue的异步组件和Webpack的代码分析

```
const Home = resolve => { require.ensure(['../components/Home.vue'], () => { resolve(require('../components/Home.vue')) })};
```

方式二：AMD写法

```
const Home = resolve => require(['../components/Home.vue'], resolve);
```

方式三：在ES6中, 我们可以有更加简单的写法来组织Vue异步组件和Webpack的代码分割

```
const Home = () => {import('../components/Home.vue')}
```

## vue-router嵌套路由

### 实现需求

在Home页面中，希望通过`/home/news`和`/home/message`，来访问一些内容。一个路径映射一个组件，访问这两个路径也会分别渲染两个组件。

实现嵌套路由的步骤：
* 创建子路由，并在路由映射匹配中配置对应的子路由；
* 在组件中使用`<router-view>`标签来展示子组件的内容；

### 实现步骤

1. 创建子组件

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/28_路由嵌套之创建子路由.png')" alt="路由嵌套之创建子路由">

2. 配置路由映射

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/29_路由嵌套之配置子路由映射.png')" alt="路由嵌套之配置子路由映射">

::: tip 提示
`VueRouter`提供的路由规则中存在一个children数组，这个数组用来存放子路由规则。
:::

::: danger 注意
子路由中path属性值不要使用`/`，如果使用的话，则会在根路径去匹配。
:::

3. 在组件中内使用：
<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/30_路由嵌套之在组件中使用.png')" alt="路由嵌套之在组件中使用">

效果：
<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/31_路由嵌套的案例效果.png')" alt="路由嵌套的案例效果">

### 路由嵌套的默认路径

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/32_路由嵌套的默认路径.png')" alt="路由嵌套的默认路径">

## vue-router参数传递

### 传递方式

传递参数的的方式有两种类型：`params`和`query`。

### params（以/进行传参）

* 配置路由映射的path格式：`/profile/:id`；
* 传递的方式：在path后面跟上对应的值；
* 传递后形成的路径：`/profile/10001`或`/profile/10002`；

#### 传递参数

步骤一：
``` js
// router/index.js
const routes = [
  {
    path: '/profile/:id',
    component: Profile,
    name: 'Profile'
  }
]
```

步骤二：
1. 方法一： 通过`<router-link>`标签
``` vue
<!-- app.vue -->
<template>
  <div>
    <router-link :to="'/profile/' + profileId">Profile</router-link>

    <router-view><router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileId: 10001
    }
  }
}
</script>
```

2. 方法二：通过JS代码

``` html
<template>
  <div>
    <button @click="linkToProfile">Profile</button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileId: 10001
    }
  },
  methods: {
    linkToProfile() {
      this.$router.push("/profile/" + this.profileId);
    }
  }
}
</script>
```

#### 获取参数

``` js
// 获取参数的方式：
$route.params.配置路由映射path中:后面的值
```

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/33_传递参数之params方式获取参数.png')" alt="传递参数之params方式获取参数">


### query（以?进行传参）

* 配置的路由格式：`/router`，也就是普通的配置；
* 传递的方式：在对象中使用query的key作为传递的方式；
* 传递后形成的路径：`/router?name=coderz&age=18&height=1.88`；

#### 传递参数

步骤一：
``` js
// router/index.js
const routes = [
  {
    path: '/profile',
    component: Profile,
    name: 'Profile'
  }
]
```

步骤二：
1. 方法一： 通过`<router-link>`标签
``` vue
<!-- app.vue -->
<template>
  <div>
    <router-link :to="{path: '/profile', query}">Proflie</router-link>

    <router-view><router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        name: 'coderz', 
        age: 18, 
        height: 1.88
      }
    }
  }
}
</script>
```

2. 方法二：通过JS代码

``` html
<template>
  <div>
    <button @click="linkToProfile">Profile</button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileId: 10001
    }
  },
  methods: {
    linkToProfile() {
      this.$router.push({
        path: "/profile",
        query: {
          name: "coderz",
          age: 18,
          height: 1.88
        }
      })
    }
  }
}
</script>
```

#### 获取参数

``` js
// 获取参数的方式：

// 获取整个query对象
$route.query

// 获取到query中的某一个值
$route.query.query对象中的key
```

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/34_传递参数之query方式获取参数.png')" alt="传递参数之query方式获取参数">

### `$router`和`$route`的区别

`$router`是VueRouter的实例，在script标签中想要导航到不同的url，使用$router.push方法或者$router.replace方法；
`$route`是当谁处于活跃状态拿到的就是这个对象，可以获取当前路由的name、path、params、query等；

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/35_$router和$route的区别.png')" alt="$router和$route的区别">

## 命名路由

命名路由即这个路由有一个名字，就是给路由添加name属性。

``` js
const router = new VueROuter({
  routes: [
    {
      path: '/profile/:id', 
      component: ProFile
      name: 'profile'
    }
  ]
})
```

命名路由的使用。在`<router-link>`标签中的to属性就可以使用对象了。

``` html
<router-link :to="/profile/ + profileId">Profile</router-link>
<!-- 和下面等价 -->
<router-link :to="{name: 'Profile', params: {id: profileId}}">Profile</router-link>

```

## vue-router导航守卫

”导航“表示路由正在发生变化，而导航守卫表示当导航开始变化到导航变化结束这段时间里，根据导航的变化做出一些响应。比如：跳转到一个页面，看有没有登录了，要是没登录的话，跳转到登录页面先让其登录。

`vue-router`提供的导航守卫主要是跳转到某处或者取消跳转到某处来守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

### 全局前置守卫

你可以使用`router.beforeEach`注册一个全局前置守卫：

``` js
const router = new VueRouter({
  // ...
})

const HAS_LOGIN = false;

router.beforeEach((to, from, next) => {
  if(!HAS_LOGIN && to.name !== 'login') {
    next({name: 'login'});
  }else {
    next();
  }
})
```

**确保要调用 next 方法，否则钩子就不会被 resolved。**

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，每个守卫方法接受三个参数：
* `to：Route`：即将要进入的目标路由对象；
* `from：Router`当前导航正要离开的路由；
* `next：Function`：一定要调用该方法，执行效果依赖`next`方法的调用参数。
  * `next()`：进入到下一个钩子。
  * `next(false)`：中断当前的导航。如果浏览器的URl改变了（可能是用户手动或者浏览器后退按钮），那么URL地址会重置到`from`路由对应的地址。
  * `next('/foo')`或者`next({path: '/foo'})`：跳转到一个不同的地址。中断当前导航进入一个新的导航。你可以向`next`传递任意位置对象，切韵序设置诸如`replace: true`、`name: 'home'`之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
  * `next(Error)`：(2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

### 全局解析守卫

你可以用`router.beforeResolve`注册一个全局守卫。这和`router.beforeEach`类似，区别是在导航确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

``` js
router.beforeResolve((to, from, next) => {
  // ...
})
```

### 全局后置钩子

全局后置钩子与守卫不同的是，这些钩子不会接受`next`函数，也不会改变导航本身：

``` js
router.afterEach((to, from) => {
  // ...
})
```

### 路由独享守卫

如果你不想在全局设置路由守卫的话，可以在路由配置上单独配置`befpreEnter`守卫。

``` js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        if(from.name === "user") {
          console.log("这是从user页面过来的");
        }else {
          console.log("这不是从user页面过来的");
        }

        next(); // 必须调用来进行下一步操作，否则是不会跳转的
      }
    }
  ]
})
```

这些守卫与全局导航守卫的方法参数是一样的。

### 组件内的守卫

你可以在路由组件内直接定义以下路由导航守卫：
* beforeRouteEnter
* beforeRouteUpdate（2.2新增）
* beforeRouteLeave

1. beforeRouteEnter：在渲染该组件的对应路由被 confirm 前调用

::: danger 注意1
`beforeRouteEnter`守卫**不能**访问this，因为守卫在确认导航之前被调用，因此即将登场的新组件还没有被创建出来。
不过，你可以通过传一个回调给`next`来访问组件实例，在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
:::

``` js
<script>
export default {
  name: 'Home',
  data() {
    return {
      message: "你好啊"
    }
  },
  beforeRouteEnter (to, from, next) {
    // 调用beforeRouteEnter守卫时，该组件还未被创建出来，所以访问不到组件实例的this
    // alert(this.message);    // Cannot read property 'message' of undefined

    next(vm => {
      // 通过 vm 来访问组件实例
      alert(vm.message);    // "你好啊"
    })
  }
}
</script>
```

::: danger 注意2
`beforeRouteEnter`是支持给`next`传递回调的唯一守卫。对于`beforeRouteUpate`和`beforeRouteLeave`来说，`this`已经可以使用了，所以不支持传递回调，因为没有必要了。
:::

2. beforeRouteLeave：导航离开该组件对应的路由时调用

在`beforeRouteLeave`守卫中，可以访问组件实例this。

通常作用是：用来禁止用户在还未保存修改前突然离开某页面。该导航可以通过`next(false)`来取消。

``` vue
<template>
  <div>
    <label for="user">
      用户名：<input type="text" id="user" v-model="user">
    </label>
    <button @click="saveClick">保存</button>
  </div>
</template>

<script>
  export default {
    name: "Admin",
    data() {
      return {
        user: '',   // 输入框中输入的内容
        saveUser: '',    // 点击保存按钮后的数据
        confirm: true
      }
    },
    methods:{
      saveClick() {
        this.saveUser = this.user;
        this.user = "";
        this.confirm = true;
      }
    },
    beforeRouteLeave(to, from, next) {
      if(this.confirm && this.user) {
        // 证明用户输入了内容
        this.confirm = window.confirm("请保存重要信息");
        next(false);
      } else if(this.confirm === false) {
        alert('请保存信息后退出');
        next(false);
      } else {
        next();
      }
    }
  }
</script>
```

3. beforeRouteUpate：在当前路由改变，但是该组件被复用时才会调用。

举例来说，对于一个带有动态参数的路径`/foo/:id`，在`/foo/1`和`/foo/2`之间跳转时，由于渲染同样的Foo组件，因此组件实例会复用，没有组件的创建和销毁。而这个钩子就会在这种情况下被调用。

``` js
<script>
  export default {
    name: "Foo",
    data() {
      return {
        id: ""
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.id = to.params.id;
      next();   // 一定要用下next()，不然会被卡住
    }
  }
</script>
```

### 一个完整我那个的导航解析流程

``` 
1、导航被触发。
2、在失活的组件（即将离开的页面组件）里调用离开守卫。 beforeRouteLeave
3、调用全局的 beforeEach 守卫。
4、在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5、在路由配置里调用（路由独享的守卫） beforeEnter。
6、解析异步路由组件
7、在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter。
8、调用全局的 beforeResolve 守卫 (2.5+)。
9、导航被确认。
10、调用全局的 afterEach 钩子。所有的钩子都触发完了。
11、触发 DOM 更新。
12、用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
```

## 路由元信息（mete字段）

定义路由的时候，可以为每一个路由配置meta对象，在meta对象中可以设置一些自定义信息，供页面组件或者路由钩子函数使用。

应用一：当跳转页面修改标题
``` js
const routes = [
  {
    path: '/', 
    redirect: '/home'
  },
  {
    meta: {title: '首页'},
    path: '/home', 
    component: Home,
    children: [
      {path: '', redirect: '/home/news'},
      {name: 'news', path: 'news', component: HomeNews},
      {name: 'message', path: 'message', component: HomeNews}
    ]
  },
  {
    name: 'about', 
    meta: {title: '关于'}, 
    path: '/about', 
    component: About
  },
  {
    name: 'profile', 
    meta: {title: '档案'}, 
    path: '/profile/:profileId', 
    component: ProFile
  }
]

// 可以在route.beforeEach中获取meta的title属性
router.beforeEach((to, from, next) => {
  window.document.title = to.matched[0].meta.title;
  next();
})
```

## keep-alive

### keep-alive是什么

`<keep-alive>`包裹动态组件时，会缓存不活动的组件实例，而不是销毁它。`<keep-alive>`是Vue内置组件中一个抽象的组件，它自身不会渲染为一个DOM元素，也不会出现在组件父组件链中。

当组件在`<keep-alive>`内被切换，它的`activated`和`deactivated`这两个生命周期函数将会被执行。

主要用来保留组件状态或者避免重新渲染。

### keep-alive用法

1. 在动态组件中使用

``` html
<!-- 基本 --->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 --->
<keep-alive>
  <comp-a v-if="a > 2"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
```

2. 在VueRouter中的应用

``` html
<keep-alive>
  <router-view><router-view>
</keep-alive>
```

::: danger 注意
`<keep-alive>`是用在其一个直属的子组件被开关的情况。如果其中有`v-for`则不会工作。如果有上述的多个条件性的子元素，`<keep-alive>`要求同时只有一个子元素被渲染。
:::

参数解释：
* include：用逗号分割字符串、正则表达式或一个数组。命中的组件才会被缓存。
* exclude：用逗号分割字符串、正则表达式或一个数组。命中的组件不会被缓存。

::: tip 提示
exclude优先级大于include。
:::

``` html
<!-- 逗号分割字符串 -->
<keep-alive include="a,b">
  <component></component>
</keep-alive>

<!-- 正则表达式（需要使用v-bind） -->
<keep-alive include="/a|b/">
  <component></component>
</keep-alive>

<!-- 数组（需要使用v-bind） -->
<keep-alive include="['a', 'b']">
  <component></component>
</keep-alive>
```

::: tip 提示
匹配首先检查组件自身的`name`选项，如果`name`选项不可用，则匹配它局部注册名称（父组件`components`选项的键值）。匿名组件不能被匹配。
:::

* max：定义缓存的上限

最多可以缓存多少个组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。

``` html
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

### 总结

在没有keep-alive包裹route-view的时候，通过给组件定义created()和destroyed这两个生命周期函数，运行代码可以看到当从路由a跳转到路由b时，是销毁a组件创建b组件；当keep-alive包裹router-view时，当切换路由，只创建组件而不销毁组件。

其中activated是组件被激活时调用，deactivated是组件被离开时调用；注意一点，activated,deactivated这两个生命周期函数一定是要在使用了keep-alive组件后才会有的，否则则不存在。

## TabBar案例

通过使用vue.js和vue-router来实现TabBar案例。

<img class="medium" :src="$withBase('/frontend/frame/vue/17_vue-router/36_tabbar案例.png')" alt="tabbar案例">

实现步骤：

1. 先创建一个TabBar组件，在App中使用。让TabBar处于底部，并设置相关样式。
2. 在TabBar中定义slot让显示的内容由外部决定。在TabBar设置flex样式。
3. 创建TabBarItem组件，定义三个具名插槽，分别放：激活时图片，未激活时图片，文字。在插槽外包裹一层div用于设置样式。
4. 定义一个变量isActive，通过v-show来决定是否显示对应的icon。
5. 配置路由映射关系。
6. 父组件TabBar传递当前路径path和active的color到子组件TabBarItem。
7. 当点击item时跳转到对应路由，并且动态决定isAcitve。
  * 监听item当点击，通过`this.$rputer.push(this.path)`跳转路径；
  * 判断`this.$route.path.indexOf(this.path) !== -1`来判断是否是active；
8. 动态计算active的样式
  * 通过`this.isActive ? {color: this.activeColor} : {}`
