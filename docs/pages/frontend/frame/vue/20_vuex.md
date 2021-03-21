## 认识Vuex

### Vuex是什么

Vuex是一个专为Vue.js应用程序开发的**状态管理模式**。它采用`集中式存储管理`应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex也集成到Vue的官方调试工具`devtools extension`，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

何为状态管理？

其实，你可以简单的将其看成把需要多个组件共享的变量全部存储在一个对象里面，之后将这个对象放到Vue原型链上，这样多个组件就可以共享这个对象中所有的变量属性了。

Vuex就是为了提供这样一个可在多个组件间共享状态的插件。


### 具体管理什么状态

有什么状态需要我们在多个组件之间共享呢？
* 用户个人信息：登录状态、用户名称、头像、地理位置信息等等；
* 商品的收藏、购物车中的物品；

这些状态信息，我们会统一的放到Vuex中，对它进行保存和管理，而且它们还是响应式的。


### 单界面的状态管理

这个状态自管理包括以下几个部分：
* State：驱动应用的数据源（你可以当做就是data的属性）；
* View：以声明方式将 state 映射到视图；
* Actions：响应在 view 上的用户输入导致的状态变化，用户在视图层的各种操作：点击、输入等；

以下是一个表示“单向数据流”理念的简单示意：

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/01_单页面的状态管理.png')" alt="单页面的状态管理">

单个组件的状态管理模式，可以从一个简单的Vue计数器案例开始：

``` vue
<template>
  <div id="app">
    <h2>当前计数：{{counter}}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      counter: 10
    }
  },
  methods: {
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    }
  }
}
</script>

<style scoped>
</style>
```

在当前案例中：
* counter就是我们的 State；
* counter需要显示在界面中也就是 View 部分；
* 界面发生变化时（这里是用户点击按钮），需要更新 State 的状态也就是Actions；


### 多界面状态管理

Vue已经帮我们做好了单界面的状态管理，但我们应用遇到`多个组件共享状态`时，单向数据流的简洁性很容易被破坏：

* 多个试图依赖同一个状态；
* 来自不同视图的 Actions 需要变更同一状态；

对于问题一：传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
对于问题二：我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理。在这种模式下，我们的组件树构成了一个巨大的”视图“，不管树在哪一个位置，任何组件都能获取状态或者触发行为。这就是Vuex背后的基本思想。

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/02_多页面的状态管理.png')" alt="多页面的状态管理">


## Vuex基本使用

### 安装

* 直接下载/CDN
``` js
// 1. 通过此网址下载最新的版本
https://unpkg.com/vuex

// 2. 在 Vue 之后，通过 script 标签引入 vuex，会自动进行安装：
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

* NPM/Yarn

``` js
npm install vuex --save

yarn add vuex
```

::: danger 注意
在一个模块化的打包系统中，您必须显式地通过 Vue.use() 来安装 Vuex：
:::

## 使用Vuex

首先我们需要在某个地方存放Vuex代码，在项目中src文件夹下创建一个`store`文件夹，并且在其中创建一个`index.js`文件。

使用Vuex的三个步骤：
1. 安装Vuex插件
``` js
Vue.use(Vuex);
```
2. 创建store对象
``` js
const store = Vuex.Store({
  // 书写内容
})
```
3. 导出store对象并在vue实例中挂载


我们使用Vuex来实现之前简单的计数器案例：

``` js
// store/index.js

import Vue from "vue"
import Vuex from "vuex"

// 1. 安装Vuex插件
Vue.use(Vuex)

// 2. 创建Vuex对象
const store = new Vuex.Store({
  state: {
    counter: 10
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  }
})

// 3. 导出store对象并在vue实例中挂载
export default store
```

``` js
// main.js

import Vue from 'vue'
import store from "./store"

import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
```

``` vue
<!-- App.vue -->

<template>
  <div id="app">
    <h2>当前计数：{{$store.state.counter}}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
</div>
</template>

<script>
export default {
  name: 'App'
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    decrement() {
      this.$store.commit("decrement");
    }
  }
}
</script>

<style store>
</style>
```

总结：
1. 提取出一个公共的store对象，用于保存在多个组件中共享的状态
2. 将store对象放置在new Vue对象中，这样可以保证在所有的组件中都可以使用到
3. 在其他组件中使用store对象中保存的状态即可
  * 通过`this.$store.state.属性`的方式来访问状态
  * 通过`this.$store.commit('mutation的type')`来修改状态

::: danger 注意
* 我们通过提交 mutation 的方式，而非直接改变`store.state.counter`。
* 这是因为Vuex可以更明确的追踪状态的变化，所以不要直接改变`store.state.counter`的值。
:::


## Vuex的核心概念

Vuex中有几个比较重要的核心概念：
* State
* Getters
* Mutations
* Actions
* Modules

## State

Vuex提出使用单一状态树，英文名称是Single Source of Truth，也可以翻译成单一数据源。

意思是：每个应用将仅仅包含一个 store 实例。单一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的维护和调试过程中，也可以非常方便的管理和维护。


## Getters

有时我们需要从store中获取一些state变化之后的结果，Vuex允许我们在 store 中定义“getters”（可以认为是 store 的计算属性）。就像计算属性一样，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

### 通过属性访问
案例：我们获取所有学生中年龄大于20岁的学生。

Getter 接受 state 作为其第一个参数：
``` js
// store/index.js

const store = new Vuex.Store({
  state: {
    students: [
      {id: 1001, name: "coderz", age: 18},
      {id: 1002, name: "kobe", age: 24},
      {id: 1003, name: "james", age: 30},
      {id: 1004, name: "curry", age: 10}
    ]
  },
  getters: {
    more20Stu(state) {
      return state.students.filter(item => item.age > 20);
    }
  }
})
```

通过属性访问，Getter会暴露为`store.getters`对象，你可以以属性的形式访问这些值：

``` vue
<!-- App.vue -->

<template>
  <div id="app">
    <h2>超过20岁的学生：</h2>
    <ul v-for="item in $store.getters.more20Stu" :key="item.id">
      <li>{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style store>
</style>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/03_getters通过属性访问.png')" alt="getters通过属性访问">


我们在原来案例上再添加一个需求，获取所有学生中年龄大于20岁的学生人数。

其实 getter 也可以接受其他 getter 作为第二个参数（getters）：

``` js
// store/index.js

const store = new Vuex.Store({
  state: {
    students: [
      {id: 1001, name: "coderz", age: 18},
      {id: 1002, name: "kobe", age: 24},
      {id: 1003, name: "james", age: 30},
      {id: 1004, name: "curry", age: 10}
    ]
  },
  getters: {
    more20Stu(state) {
      return state.students.filter(item => item.age > 20);
    },
    more20StuLength(state, getters) {
      return getters.more20Stu.length;
    }
  }
})
```

``` vue
<!-- App.vue -->

<template>
  <div id="app">
    <h2>超过20岁的学生人数：{{$store.getters.more20StuLength}}</h2>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style store>
</style>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/04_Getter可接受其他getter作为第二个参数.png')" alt="Getter可接受其他getter作为第二个参数">

::: danger 注意
getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。
:::

### 通过方法访问

getter 默认是不能传递参数的，如果希望传递参数，你可以通过让 getter 返回一个函数，来实现给 getter 传递参数。这样在你对 store 里面的数组进行查询时非常有用。

例如：让用户传递希望的年龄来显示超出年龄的学生。

``` js
// store/index.js

const store = new Vuex.Store({
  state: {
    students: [
      {id: 1001, name: "coderz", age: 18},
      {id: 1002, name: "kobe", age: 24},
      {id: 1003, name: "james", age: 30},
      {id: 1004, name: "curry", age: 10}
    ]
  },
  getters: {
    moreAgeStu(state) {
      return age => {
        return state.students.filter(item => item.age > age);
      }
    }
  }
})
```

``` vue
<!-- App.vue -->

<template>
  <div id="app">
    <h2>超过自定义年龄的学生：</h2>
    <ul v-for="item in $store.getters.moreAgeStu(12)" :key="item.id">
      <li>{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style store>
</style>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/05_getters通过方法访问.png')" alt="getters通过方法访问">

::: danger 注意
getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
:::


## Mutations

### Mutation状态更新
更改 Vuex 的 store 中的状态的唯一方式是 `提交 mutation`。

Vuex 中的 mutation 非常类似于事件，每个 mutation 都有：
* 一个字符串的 **事件类型（type）**；
* 一个**回调函数（handler）**，该回调函数的第一个参数就是state；

mutation的定义方式：
``` js
// store/index.js

const store = new Vuex.Store({
  state: {
    counter: 10
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  }
})
```

通过提交mutation更新：

当要唤醒一个mutation handler，你需要以相应的 type 调用 `store.commit` 方法。
``` js
store.commit('increment')
```

### Mutation传递参数

在通过 mutation 更新数据的时候，我们希望携带一些**额外的参数**。可以向 `store.commit` 传入额外的参数，参数被称为是 mutation 的载荷（Payload）。

``` js
// store/index.js

const store = new Vuex.Store({
  // ...
  mutations: {
    incrementCount(state, count) {
      state.counter += count;
    }
  }
});
```

``` vue
<!-- App.vue -->

<template>
  <div id="app">
    <h2>当前计数：{{$store.state.counter}}</h2>
    <button @click="decrementCount(5)">5</button>
    <button @click="decrementCount(10)">10</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // ...
    decrementCount(count) {
      this.$store.commit("incrementCount", count);
    }
  }
}
</script>

<style store>
</style>
```

如果参数是以对象的形式传递，也就是 Payload 是一个对象，这时再从此对象中获取相关信息。这样可包含多个字段并且记录的 mutation 会更易读。

``` js
// store/index.js

const store = new Vuex.Store({
  // ...
  mutations: {
    incrementCount(state, payload) {
      state.counter += payload.count;
    }
  }
})
```

``` js
$store.commit("incrementCount", {count: 20});
```

### Mutation对象风格提交方式

提交 mutation 的方式，除了上面通过 commit 进行提交这是普通的方式外，另外一种方式是直接使用 type 属性的对象。

``` js
store.commit({
  type: "incrementCount",
  count: 20
})
```

当使用对象风格的提交方式，是将整个 commit 的对象都作为载荷传递给 mutation 函数使用，因此 handler 保持不变：

``` js
// store/index.js

const store = new Vuex.Store({
  // ...
  mutations : {
    incrementCount(state, payload) {
      state.counter += payload.count;
    }
  }
})
```

### Mutation 响应规则

Vuex 的 store 中的 state 是响应式的，那么当 state 中的数据发生改变时，Vue 组件也会自动更新。

这也意味着 Vuex 中的 mutation  必须遵守一些注意事项：
1. 最好提前在你的 store 中初始化好所有所需的属性；
2. 当需要在 state 中的对象上添加新的属性，你应该：
  * 方式一：使用`Vue.set(obj(目标对象), key(添加的属性名), value(添加的属性值))`;
  * 方式二：用新对象给旧对象重新赋值；例如：使用对象展开运算符，
  ``` js
    state.obj = {...state.obj, newProp: 123}
  ```

我们实现一个案例：当点击更新信息时，给info对象新增adderss属性让界面发生变化。

``` vue
<!-- App.vue -->

<template>
  <div>
    <h2>{{$store.state.info}}</h2>
    <button @click="updateInfo">更新信息</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    updateInfo() {
      this.$store.commit("updateInfo", {address: "beijing"});
    }
  }
}
</script>

<style scoped>
</style>
```

错误写法，这种写法并不会让界面发生更新：
``` js
// store/index.js

const store = new Vuex.Store({
  state: {
    info: {
      name: "kobe",
      age: 40,
      height: 1.88
    }
  },
  mutations: {
    updateInfo(state, payload) {
      state.info["address"] = payload.address;
    }
  }
})
```

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/06_mutation的响应规则之添加属性错误写法.png')" alt="mutation的响应规则之添加属性错误写法">

那么，界面如何可以发生改变呢？使用上面所说的方式一或者方式二都可以使界面发生改变。

``` js
// store/index.js

const store = new Vuex.Store({
  state: {
    info: {
      name: "kobe",
      age: 40,
      height: 1.88
    }
  },
  mutations: {
    updateInfo(state, payload) {
      // 方式一：
      Vue.set(state.info, "address", payload.address);

      // 方式二：
      state.info = {...state.info, address: "beijing"};
    }
  }
})
```

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/07_mutation的响应规则之添加属性正确写法.png')" alt="mutation的响应规则之添加属性正确写法">

::: tip 补充
既然可以添加属性，那么也就可以删除属性。使用`Vue.delete(obj(目标对象), key(删除的属性名))`

``` vue
<!-- App.vue -->

<template>
  <div>
    <h2>{{$store.state.info}}</h2>
    <button @click="updateInfo">更新信息</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    updateInfo() {
      this.$store.commit("updateInfo");
    }
  }
}
</script>

<style scoped>
</style>
```

错误写法：
``` js
// store/index.js

const store = new Vuex.Store({
  state: {
    info: {
      name: "kobe",
      age: 40,
      height: 1.88
    }
  },
  mutations: {
    updateInfo(state) {
      delete state.info.age;
    }
  }
})
```

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/08_mutation的响应规则之删除属性错误写法.png')" alt="mutation的响应规则之删除属性错误写法">

正确写法：
``` js
// store/index.js

const store = new Vuex.Store({
  state: {
    info: {
      name: "kobe",
      age: 40,
      height: 1.88
    }
  },
  mutations: {
    updateInfo(state) {
      Vue.delete(state.info, "age");
    }
  }
})
```

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/09_mutation的响应规则之删除属性正确写法.png')" alt="mutation的响应规则之删除属性正确写法">
:::

Vuex 中 store 的 state 中的所有属性都会被添加到响应式系统中，而响应式系统会监听属性的变化。当属性发生变化时，会通知所有界面中用到该属性的地方让界面刷新。至于没有提前在 store 中初始化好的属性，也不会添加到响应式系统中去，更不会让界面刷新。


### 使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。我们把这些常量放在单独的文件中，方便管理以及让整个 app 所有的事件类型一目了然。

具体操作是：
1. 在`./src/store`目录下创建一个文件`mutation-types.js`，并在其中定义 mutation type 的常量。
2. 定义常量后，我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名。
> 重点是 要给常量加一个中括号 就是这么任性~

代码演示：
``` js
// store/mutation-types.js

export const UPDATE_INFO = "UPDATE_INFO";
```

``` js
// store/index.js

import Vuex from "vuex"
import * as types from "./mutation-types"

const store = new Vuex.Store({
  state: {
    info: {...}
  },
  mutations: {
    [UPDATE_INFO] (state, payload) {
      Vue.set(state.info, "address", payload.address);
    }
  }
})
```

``` js
// App.js
...
<script>
  import { UPDATE_INFO } from "./store/mutation-types"

  export default {
    name: "App",
    methods: {
      updateInfo() {
        this.$store.commit("UPDATE_INFO", {address: "beijing"})
      }
    }
  }
</script>
...
```

### Mutation 同步函数

Vuex 要求我们 mutations 中的方法必须是同步方法。

主要因为我们使用 devtools 时，可以让 devtools 帮助我们捕捉 mutation 的快照。但如果是异步操作的话，devtools 不能很好的追踪这个操作是什么时候被完成的。

如果是我们之前的代码，当执行更新时，devtool中的信息如下：

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/10_mutation同步方法结果.png')" alt="mutation同步方法结果">

但是，如果 Vuex 中 mutation 中的方法内使用了异步函数：

``` js
mutation: {
  [types.UPDATE_INFO](state, payload) {
    setTimeout(() => {
      Vue.set(state.info, "address", payload.address);
    }, 2000)
  }
}
```

你会发现，虽说界面上已经修改了，但 devtools 中 state 中的 info 数据一直都没有被改变，因为它无法被追踪。

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/11_mutation异步方法结果.png')" alt="mutation异步方法结果">

在上面的例子中，因为当 mutation 触发的时候，异步操作还没被执行，devtools 不知道什么时候异步操作实际上被执行——实际上任何异步操作中进行的状态的改变都是不可追踪的。 

**所以通常通常下，不要在 mutation 中进行异步的操作。**


## Actions

Action 类似于 mutation，不同在于：
* Action 提交的是 mutation，而不是直接变更状态；
* Action 可以包含任何异步操作；

### 基本定义 Action

下面来基本定义 Action：

``` js
// store.index.js

const store = new Vuex.Store({
  state: {
    info: {
      name: "kobe",
      age: 40,
      height: 1.88
    }
  },
  mutations: {
    [types.UPDATE_INFO](state, payload) {  
      Vue.set(state.info, "address", payload.address);
    }
  },
  actions: {
    updateInfoAsync(context) {
      setTimeout(() => {
        context.commit(types.UPDATE_INFO);
      }, 2000);
    }
  }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，可以翻译为“上下文”的意思。因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。

但是注意，之后介绍到 `Modules` 时，你就知道 context 对象为什么不是 store 实例本身了。

在实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：

``` js
actions: {
  updateInfoAsync({commit}) {
    setTimeout(() => {
      commit(types.UPDATE_INFO);
    }, 2000);
  }
}
```

### Action 的分发

我们定义了 Action 之后，在组件中调用此方法就通过 `store.dispatch` 方法来触发：

``` vue
<!-- App.vue -->

<template>
  <div id="app">
    <h2>{{$store.state.info}}</h2>
    <button @click="updateInfo">更新信息</button>
  </div>
</template>

<script>
import {UPDATE_INFO} from "./store/mutation-types"

export default {
  name: 'App',
  methods: {
    updateInfo() {
      this.$store.dispatch("updateInfoAsync", {address: "beijing"})
    }
  }
}
</script>

<style store>
</style>
```

Actions 支持同样的**载荷方式（payload）**和**对象方式**进行分发：

``` js
// 以载荷形式分发
store.dispatch("updateInfoAsync", {address: "beijing"});

// 对象方式
store.dispatch({
  type: "updateInfoAsync",
  address: "beijing"
})
```

### Action 返回的 Promise

前面学习 Promise 经常用于异步操作，在 Action 中，我们可以将异步操作放在一个 Promise 中，并且在成功或者失败后，调用对应的 resolve 或 reject。

下面来看代码：

``` js
// store/index.js

updateInfoAsync(context, payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      context.commit(types.UPDATE_INFO, payload);
      resolve("完成了更新操作");
    }, 2000);
  })
}
```

``` vue
<!-- App.vue -->

<template>
  <div id="app">
    <h2>{{$store.state.info}}</h2>
    <button @click="updateInfo">更新信息</button>
  </div>
</template>

<script>
import {UPDATE_INFO} from "./store/mutation-types"

export default {
  name: 'App',
  methods: {
    this.$store.dispatch("updateInfoAsync", {address: "beijing"}).then(res => {
      console.log(res);
    })
  }
}
</script>

<style store>
</style>
```

2s后控制台打印"完成了更新操作"，说明已经完成了更新。


## Modules

由于 Vuex 使用单一状态树，应用的所有状态都会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每一个模块都有自己的 state、mutation、getter、action、甚至是嵌套子模块————从上至下进行同样方式的分割。

``` js
const moduleA = {
  state: {...},
  metations: {...},
  getters: {...},
  actions: {...}
};
const moduleB = {
  state: {...},
  metations: {...},
  getters: {...},
  actions: {...}
};

const store = new Vuex.Store({
  state: {...},
  mutations: {...},
  getters: {...},
  actions: {...},
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

### 模块的局部状态

1. state

``` js
const moduleA = {
  state: {
    name: "zhangsan"
  }
};

const store = new Vuex.Store({
  ...
  modules: {
    a: moduleA
  }
})
```

使用 moduleA 中的 state 状态时，通过 `store.state.a.状态名` 取出。

``` vue
<template>
  <div>
    <h2>{{$store.state.a.name}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
</style>
```

2. mutations

mutation 接收的第一个参数是**模块的局部状态对象**，接收的第二个参数是Payload（载荷）。

``` js
const moduleA = {
  state: {
    name: "zhangsan"
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload.name;
    }
  }
};

const store = new Vuex.Store({
  ...
  modules: {
    a: moduleA
  }
})
```

提交 moduleA 中的 mutation 与提交 store 中 mutation 的方式一样。

``` vue
<template>
  <div>
    <h2>{{$store.state.a.name}}</h2>
    <button @click="updateName">修改名字</button>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      updateName(state, payload) {
        this.$store.commit("updateName", {name: "lisi"});
      }
    }
  }
</script>

<style>
</style>
```

3. getters

mutation 接收:
* 第一个参数（state）：是**模块的局部状态对象**；
* 接受的第二个参数（getters）：是模块内定义的getters和store中定义的getters；
* 接受第三个参数（rootState）：是根节点状态对象；

``` js
const moduleA = {
  state: {
    name: "zhangsan"
  }
  getters: {
    fullName(state) {
      return state.name + "111";
    },
    fullName2(state, getters) {
      // 这里getters参数包括：模块内定义的getters和store中定义的getters
      // console.log(getters);
      return getters.fullName + "333";
    },
    fullName3(state, getters, rootState) {
      return getters.fullName2 + rootState.counter;
    }
  }
};

const store = new Vuex.Store({
  ...
  modules: {
    a: moduleA
  }
})
```

``` vue
<template>
  <div>
    <h2>{{$store.getters.fullName}}</h2>
    <h2>{{$store.getters.fullName2}}</h2>
    <h2>{{$store.getters.fullName3}}</h2>

    <!-- 
      结果：
      zhangsan111
      zhangsan111333
      zhangsan11133310
     -->
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
</style>
```

4. actions

对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

``` js
const moduleA = {
  state: {
    name: "zhangsan"
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload.name;
    }
  },
  getters: {...}，
  actions: {
    updateNameAsync(context, payload) {   
      // 模块中的 context 只代表此模块，当 context.commit 时只能拿到此模块的 mutation
      setTimeout(() => {
        context.commit("updateName", payload);
      }, 1000);
    }
  }
};

const store = new Vuex.Store({
  ...
  modules: {
    a: moduleA
  }
})
```

``` vue
<template>
  <div>
    <h2>{{$store.state.a.name}}</h2>
    <button @click="updateNameAsync">异步修改名字</button>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      updateNameAsync() {
        this.$store.dispatch("updateNameAsync", {name: "wangwu"});
      }
    }
  }
</script>

<style>
</style>
```

## 项目结构组织

Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：
* 应用层级的状态应该集中到单个 store 对象中。
* 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
* 异步逻辑都应该封装到 action 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/12_项目结构组织.png')" alt="项目结构组织">

我们来看下重新组织代码后，`store/index.js` 文件效果：

<img class="medium" :src="$withBase('/frontend/frame/vue/20_vuex/13_Vuex代码分隔到不同模块之后index.js文件效果.png')" alt="Vuex代码分隔到不同模块之后index.js文件效果">
