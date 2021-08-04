前面了解了Options-API中的`template`、`data`、`methods`属性。

## computed

### 复杂data的处理方式

我们可以直接通过**插值语法**的方式显示一些**data中的数据**。

但在某些情况，我们需要对**数据进行一些转化后**再进行显示或者**对多个数据结合起来**进行展示。虽然模板中也可以使用**表达式**非常方便的实现，但设计初衷是为进行简单的运算，太过复杂的逻辑会让**模板过重和难以维护**。并且在多个地方使用会有大量重复代码。

那有什么方法可以将逻辑抽离出去呢？

一种方法是将逻辑抽离到一个`method`中，放到OPtions的methods中。但这种做法有一个直观的弊端就是data使用过程中变成了方法的调用。而另一种方法就是使用计算属性`computed`。

### 认识计算属性

对于任何包含响应式数据的复杂逻辑，你都应该使用**计算属性**。

官方文档：
* 类型：`{ [key: string]: Function | { get: Function, set: Function } }`
* 详细：计算属性将被混入到组件实例中。所有 getter 和 setter 的 this 上下文自动地绑定为组件实例。

下面通过案例来理解计算属性。我们来看三个案例：
* 有两个变量firstName、lastName，希望得到拼接之后的结果；
* 有一个分数score，当score大于等于60分界面显示及格，当score小于60分界面显示不及格；
* 有一个变量message记录一段文字Hello World，希望得到翻转后的结果；

我们有三种方法实现案例：
1. 实现思路一：模板语法中使用表达式
``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <h2>{{firstName + " " + lastName}}</h2>
    <h2>{{score >= 60 ? "及格" : "不及格"}}</h2>
    <h2>{{message.split(" ").reverse().join(" ")}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          firstName: "Kobe",
          lastName: "Bryant",
          score: 80,
          message: "Hello Vue3"
        }
      }
    };
    
    Vue.createApp(App).mount("#app");
  </script>
</body>
```

::: tip 提示
模板语法的缺点：
* 模板语法中存在大量的复杂逻辑，不便于维护（模板中的表达式初衷是进行简单的运算）；
* 多次使用时，存在大量的重复代码，而且一样的逻辑也需要多次运算执行，没有缓存；
:::

2. 实现思路二：使用method对逻辑进行抽离；
``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <h2>{{getFullName()}}</h2>
    <h2>{{getResult()}}</h2>
    <h2>{{getReverseMessage()}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          firstName: "Kobe",
          lastName: "Bryant",
          score: 80,
          message: "Hello Vue3"
        }
      },
      methods: {
        getFullName() {
          return this.firstName + " " + this.lastName;
        },
        getResult() {
          return this.score >= 60 ? "及格" : "不及格";
        },
        getReverseMessage() {
          return this.message.split(" ").reverse().join(" ");
        }
      }
    };
    
    Vue.createApp(App).mount("#app");
  </script>
</body>
```

::: tip 提示
methods的缺点：
* 事实上想显示一个结果，但都变成方法的调用；
* 多次使用方法时，也需要多次计算，没有缓存；
:::

3. 实现思路三：使用计算属性computed；
``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <h2>{{fullName}}</h2>
    <h2>{{result}}</h2>
    <h2>{{reverseMessage}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          firstName: "Kobe",
          lastName: "Bryant",
          score: 80,
          message: "Hello Vue3"
        }
      },
      computed: {
        fullName() {
          return this.firstName + " " + this.lastName;
        },
        result() {
          return this.score >= 60 ? "及格" : "不及格";
        },
        reverseMessage() {
          return this.message.split(" ").reverse().join(" ");
        }
      }
    };
    
    Vue.createApp(App).mount("#app");
  </script>
</body>
```

::: danger 注意
* 计算属性看起来是一个函数，但使用时不需要加()，后面讲计算属性的getter和setter会讲到；
* 不管是直观效果上还是使用上计算属性都是更好的选择；
* 而且计算属性是有缓存的；
:::

### 计算属性 VS methods

我们多次提到计算属性有缓存，接下来看同一个计算多次使用，计算属性和methods的差别。

``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <button @click="changeFirstName">修改firstName</button>

    <!-- methods -->
    <h2>{{getFullName()}}</h2>
    <h2>{{getFullName()}}</h2>
    <h2>{{getFullName()}}</h2>
    
    <!-- computed -->
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          firstName: "Kobe",
          lastName: "Bryant"
        }
      },
      methods: {
        getFullName() {
          console.log("执行methods中的getFullName方法");
          return this.firstName + " " + this.lastName;
        },
        changeFirstName() {
          this.firstName = "Coder";
        }
      },
      computed: {
        fullName() {
          console.log("执行computed中的fullName方法");
          return this.firstName + " " + this.lastName; 
        }
      }
    };
    
    Vue.createApp(App).mount("#app");
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue3/03_vue3-Options-API/01_computed可以缓存.png')" alt="computed可以缓存">

计算属性是有缓存的，当我们多次使用计算属性时，计算属性中的运算只会执行一次，并且计算属性会随着依赖的数据（firstName）发生变化，而进行重新的运算。

### 计算属性的setter和getter

在使用计算属性的大多数场景下，只需要使用一个`getter方法`即可，所以我们会将计算属性直接写成一个函数。但也有小部分情况我们想设置计算属性的值，那么可以给计算属性设置一个`setter方法`。

``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <button @click="changeFullName">改变</button>
    <h2>{{fullName}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          firstName: "Kobe",
          lastName: "Bryant"
        }
      },
      computed: {
        // 1. fullName默认使用getter方法（类型为函数）
        fullName() {
          return this.firstName + " " + this.lastName;
        },

        // 2. fullName的 getter 方法和 setter 方法（类型为对象）
        fullName: {
          get: function() {
            return this.firstName + " " + this.lastName;
          },
          // 当计算属性发生修改时会调用set方法
          set: function(newValue) {
            console.log(newValue);

            const names = newValue.split(" ");
            this.firstName = names[0];
            this.lastName = names[1];
          }
        }
      },
      methods: {
        changeFullName() {
          this.fullName = "Coder Why";
        }
      }
    };
    
    Vue.createApp(App).mount("#app");
  </script>
</body>
```

### 源码对setter和getter的处理

Vue内部只是做了一个简单的计算，就知道我们传入的是只有getter的函数，还是包含getter和setter的对象。

<img class="medium" :src="$withBase('/frontend/frame/vue3/03_vue3-Options-API/02_源码对setter和getter的处理.png')" alt="源码对setter和getter的处理">


## watch

### 认识侦听器watch

开发中我们在data返回的对象中定义数据，这个数据通过模板语法的方式绑定到template中。当数据发生变化时，template会自动发生更新来显示型的数据。

但在某些情况下，希望通过代码逻辑来监听某个数据的变化，这时就需要使用**侦听器watch**来完成。

官方文档：

* 类型：`{ [key: string]: string | Function | Object | Array}`

### 侦听器watch的简单使用

当用户在input中输入一个问题，我们获取到最新的问题，之后根据最新的问题到服务器查询答案。所以就需要实时的去获取最新的数据变化。

``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <h2>请输入问题：</h2>
    <input type="text" v-model="question">
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          // 侦听 question 变化时，去进行一些逻辑的处理（JavaScript代码），例如网络请求
          question: "Hello World"
        }
      },
      watch: {
        /**
         * question：监听data返回对象中的属性名称
         * newValue为变化后的新值
         * oldValue为变化前的旧值
        */
         question: function(newValue, oldValue) {
          console.log(`newValue：${newValue},oldValue：${oldValue}`);

          this.getAnswer(newValue);
        }
      },
      methods: {
        getAnswer(question) {
          console.log(`您的问题是：${question}，答案是：哈哈哈哈`);
        }
      }
    };

    Vue.createApp(App).mount("#app");
  </script>
</body>
```

结果：

<img class="medium" :src="$withBase('/frontend/frame/vue3/03_vue3-Options-API/03_侦听器wtach的简单使用.png')" alt="侦听器wtach的简单使用">

### 侦听器watch的配置选项

我们先来看一个例子，当点击按钮时会不会修改info.name的值。使用watch来侦听info可以侦听到吗？

答案是：会修改info.name的值但watch侦听不到info。

``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <button @click="changeInfoName">修改info.name</button>
    
    <h2>{{info.name}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          info: {name: "coderz", age: 18, nba: {name: "kobe"}}
        }
      },
      watch: {
        changeInfoName(newValue, oldValue) {
          console.log("newValue", newValue, "oldValue", oldValue);
        }
      },
      methods: {
        changeInfoName() {
          this.info.name = "coderwhy"
        }
      }
    };

    Vue.createApp(App).mount("#app");
  </script>
</body>
```

这是因为默认情况下，侦听器watch只会针对监听的info引用的变化，对于内部属性的变化是不会被监听到的。我们可以使用一个属性`keep: true`进行更深层的侦听。前面也了解到watch侦听的属性对应也可以是一个Object。

``` js
watch: {
  info: {
    handler: function(newInfo, oldInfo) {
      console.log("newValue:", newInfo, "oldValue:", oldInfo);
    },
    deep: true, // 深度侦听
  }
}

// 结果：
// newValue: Proxy {name: "coderwhy", age: 18, nba: {name: 'kobe'}} oldValue: Proxy {name: "coderwhy", age: 18, nba: {name: 'kobe'}}
```

::: danger 注意
当变更（不是替换）对象或数组并使用 deep 选项时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。
:::

另外一个属性是`immediate: true`，无论后面的数据是否有变化，侦听的函数一开始就会立即执行一次。

``` js
watch: {
  info: {
    handler: function(newInfo, oldInfo) {
      console.log("newValue:", newInfo, "oldValue:", oldInfo);
    },
    deep: true, // 深度侦听
    immediate: true
  }
}

// 结果：
// newValue: Proxy {name: "coderz", age: 18, nba: {name: 'kobe'}} oldValue: undefined
```

### 侦听器watch的其他方式

1. 字符串方法名方式

``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <button @click="changeInfo">修改info</button>

    <h2>{{info}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          info: { name: "coderz", age: 18, nba: {name: 'kobe'} }
        }
      },
      watch: {
        // 1. 字符串方法名
        info: 'someMethod'
      },
      methods: {
        someMethod(newInfo, oldInfo) {
          console.log("newValue", newInfo, "oldValue", oldInfo);
        },
        changeInfo() {
          this.info = {name: "James"};
        }
      }
    };

    Vue.createApp(App).mount("#app");
  </script>
</body>
```

结果：
``` js
// newValue Proxy {name: "James"} oldValue Proxy {name: "coderz", age: 18, nba: {name: 'kobe'}}
```

2. 数组方式

你可以传入回调数组，它们会被逐一调用。

``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <button @click="changeInfo">修改info</button>

    <h2>{{info}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          info: { name: "coderz", age: 18, nba: {name: 'kobe'} }
        }
      },
      watch: {
        // 2. 数组方式
        info: [
          'handle1',
          function(newInfo, oldInfo) {
            console.log("newValue:", newInfo, "oldValue:", oldInfo);
          }
        ]
      },
      methods: {
        handle1() {
          console.log('handle 1 triggered');
        },
        changeInfo() {
          this.info = {name: "James"};
        }
      }
    };

    Vue.createApp(App).mount("#app");
  </script>
</body>
```

结果：
``` js
// handle 1 triggered
// newValue Proxy {name: "James"} oldValue Proxy {name: "coderz", age: 18, nba: {name: 'kobe'}}
```

3. Vue3文档没提到，但Vue2文档有提到的侦听对象的属性的变化

``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <button @click="changeInfoName">修改info.name</button>

    <h2>{{info}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          info: { name: "coderz", age: 18, nba: {name: 'kobe'} }
        }
      },
      watch: {
        // 3. 监听对象的属性
        "info.name": function(newInfo, oldInfo) {
          console.log("newValue", newInfo, "oldValue", oldInfo);
        }
      },
      methods: {
        changeInfoName() {
          this.info.name = "coderwhy"
        },
      }
    };

    Vue.createApp(App).mount("#app");
  </script>
</body>
```

结果：
``` js
// newValue, coderwhy, oldValue, coderz
```


4. 使用$watch的API

我们可以在created生命周期（后续会讲到）中，使用`this.$watch`来监听。
* 第一个参数是要侦听的源；
* 第二个参数是要侦听的回调函数callback；
* 第三个参数是额外的其它选项，比如：deep、immadiate；

官方文档：
* 参数：
  * {string | Function} source
  * {Function | Object} callback
  * {Object} [options]
    * {boolean} deep
    * {boolean} immediate
    * {string} flush
* 返回：{Function} unwatch

``` html
<body>
  <div id="app"></div>

  <template id="my-app">
    <button @click="changeInfoName">修改info.name</button>

    <h2>{{info}}</h2>
  </template>

  <script src="../js/vue3.js"></script>
  <script>
    const App = {
      template: "#my-app",
      data() {
        return {
          info: { name: "coderz", age: 18, nba: {name: 'kobe'} }
        }
      },
      // 4. 使用$switch API
      created() {
        // 返回值为卸载侦听器
        const unWatch = this.$watch("info", function(newInfo, oldInfo) {
          console.log("newValue", newInfo, "oldValue", oldInfo);
        }, {deep: true, immediate: true})
      },
      methods: {
        changeInfoName() {
          this.info.name = "coderwhy"
        }
      }
    };

    Vue.createApp(App).mount("#app");
  </script>
</body>
```

结果：
``` js
// 1. 因为有immediate属性，所以会进入页面立即执行一次
// newValue Proxy{name: "coderz", age: 18, nba: {name: 'kobe'}}  oldValue undefined

// 2. 点击修改info.name按钮后
// newValue Proxy{name: "coderwhy", age: 18, nba: {name: 'kobe'}}   oldValue Proxy{name: "coderwhy", age: 18, nba: {name: 'kobe'}}
```

::: tip 补充
``` js
data() {
  return {
    friends: [
      {name: "kobe"},
      {name: "james"}
    ]
  }
}
```

如果想侦听friends数组中某个对象中的某个属性的改变，在真实开发中大概率会创建一个BaseFriend组件，之后通过v-for遍历friends得到多个BaseFriend组件，将friend传入到子组件的props接收，我们在子组件中侦听props.friend.name的变化。
:::