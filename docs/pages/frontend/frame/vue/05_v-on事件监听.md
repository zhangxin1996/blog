## v-on介绍
前端开发中，我们经常需要与用户交互。这时就必须监听用户发生的事件。例如：点击、拖拽、键盘事件等等。在Vue中监听事件使用`v-on`指令。

v-on:
* 作用：绑定事件监听器；
* 缩写：@；
* 预期：Function | Inline Statement | Object；
* 参数：event；

## v-on基本使用

我们实现之前的一个案例，当点击+1按钮之后，counter加1，当点击-1按钮之后，counter减1。

``` html
<body>
  <div id="app">
    <h2>{{counter}}</h2>

    <!-- 方式一：表达式的写法 -->
    <button v-on:click="counter++">+1</button>
    <button v-on:click="counter--">-1</button>

    <!-- 方式二：methods中定义方法方法的写法 -->
    <button v-on:click="increment">+1</button>
    <button v-on:click="decrement">-1</button>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        counter: 0
      },
      methods: {
        increment() {
          this.counter++;
        },
        decrement() {
          this.counter--;
        }
      }
    })
  </script>
</body>
```

第一种方式是表达式的写法，第二种是methods中定义方法的写法，这两种方法都可以实现案例。

## v-on语法糖

``` html
<div id="app">
    <h2>{{counter}}</h2>

    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
```

## v-on参数

当通过methods中定义方法，以供@click调用时，需要注意参数问题：

* 情况一：监听事件调用的方法没有参数；

事件监听的时候且监听对应的方法不需要传递参数，只要满足这两个条件方法后的小括号可以不添加。这种情况下加小括号和不加小括号结果是一样的。

``` html
<body>
  <div id="app">
    <button @click="btnClick1">按钮1</button>
    <button @click="btnClick1()">按钮1</button>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      methods: {
        btnClick1() {
          console.log("-----btnClick1点击了");
        }
      }
    })
  </script>
</body>
```
结果为：
``` js
// -----btnClick1点击了
// -----btnClick1点击了
```

* 情况二：监听事件调用的方法有参数；

调用方法的时候省略了小括号，但是方法本身是需要传递参数的，这时Vue默认会将浏览器生成的Event事件对象作为参数传递到方法。

如果只是没有传递参数有小括号的话，接受到的实参是`undefined`。

如果是有传递参数的，接受的实参是传递的值。

``` html
<body>
  <div id="app">
    <!-- 事件调用的方法需要传递参数 -->
    <!-- 1. 省略小括号 -->
    <button @click="btnClick2">按钮2</button>
    <!-- 2. 没有传递参数 -->
    <button @click="btnClick2()">按钮2</button>
    <!-- 3. 传递参数 -->
    <button @click="btnClick2('abc)">按钮2</button>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      methods: {
        btnClick2(abc) {
          console.log("-----btnClick2点击了", abc);
        }
      }
    })
  </script>
</body>
```

结果为：
``` js
// -----btnClick2点击了", event事件对象
// -----btnClick2点击了", undefined
// -----btnClick2点击了", abc
```

* 情况三：监听事件调用的方法有多个参数；

如果需要传递多个参数同时需要event事件对象，通过`$event`传递event事件对象。

``` html
<body>
  <div id="app">
    <!-- 事件调用的方法需要传递多个参数 -->
    <!-- 1. 省略小括号 -->
    <button @click="btnClick3">按钮3</button>
    <!-- 2. 省略参数 -->
    <button @click="btnClick3()">按钮3</button>
    <!-- 3. 传递参数 -->
    <button @click="btnClick3('abc', $event)">按钮3</button>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      methods: {
        btnClick3(abc, event) {
          console.log("+++++btnClick3点击了", abc, event);
        }
      }
    })
  </script>
</body>
```
结果为：
``` js
// +++++btnClick3点击了", event事件对象, undefined
// +++++btnClick3点击了", undefined, undefined
// +++++btnClick3点击了", abc, event事件对象
```


## v-on事件修饰符

### .stop（阻止冒泡）

bigBox中嵌套了smallBox，smallBox中又嵌套了button。如果每一个元素都有一个点击事件，当我们只想点击button，就很容易造成事件穿透（冒泡事件）。

``` html
<head>
  <style>
    .bigBox {
      width: 200px;
      height: 100px;
      background-color: burlywood;
    }
    .smallBox {
      width: 100px;
      height: 50px;
      background-color: deepskyblue;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="bigBox" @click="bigBoxClick">
      <div class="smallBox" @click="smallBoxClick">
        <button @click.stop="btnClick">按钮</button>
      </div>
    </div>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      methods: {
        bigBoxClick() {
          console.log("bigBox点击事件");
        },
        smallBoxClick() {
          console.log("smallBox点击事件");
        },
        btnClick() {
          console.log("按钮点击事件");
        }
      }
    })
  </script>
</body>
```

结果是：

<img class="medium" :src="$withBase('/frontend/frame/vue/05_v-on/01_v-on修饰符之.stop.png')" alt="v-on修饰符之.stop">


### .capture（添加事件监听捕获模式）

我们使用上面案例的HTML结构来演示，给bigBox和smallBox添加事件修饰符`.capture`。当点击按钮时，最先捕获到的是bigBox，之后是smallBox，最后是button。

``` html
<head>
  <style>
    .bigBox {
      width: 200px;
      height: 100px;
      background-color: burlywood;
    }
    .smallBox {
      width: 100px;
      height: 50px;
      background-color: deepskyblue;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="bigBox" @click.capture="bigBoxClick">
      <div class="smallBox" @click.capture="smallBoxClick">
        <button @click="btnClick">按钮</button>
      </div>
    </div>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      methods: {
        bigBoxClick() {
          console.log("bigBox点击事件");
        },
        smallBoxClick() {
          console.log("smallBox点击事件");
        },
        btnClick() {
          console.log("按钮点击事件");
        }
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/05_v-on/04_captrue修饰符.png')" alt="captrue修饰符">

### .self（只阻止本身冒泡行为）

我们给smallBox的点击事件添加.self修饰符，当点击button时，发现smallBox的点击事件并未执行，但阻止不了bigBox的点击事件。

``` html
<head>>
  <style>
    .bigBox {
      width: 200px;
      height: 100px;
      background-color: burlywood;
    }
    .smallBox {
      width: 100px;
      height: 50px;
      background-color: deepskyblue;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="bigBox" @click="bigBoxClick">
      <div class="smallBox" @click.self="smallBoxClick">
        <button @click="btnClick">按钮</button>
      </div>
    </div>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      methods: {
        bigBoxClick() {
          console.log("bigBox点击事件");
        },
        smallBoxClick() {
          console.log("smallBox点击事件");
        },
        btnClick() {
          console.log("按钮点击事件");
        }
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/05_v-on/05_self修饰符.png')" alt="self修饰符">

`.stop`与`.self`之间的区别在于：`.stop`会把该元素的所有冒泡事件都阻止掉，`.self`只会阻止自己本身的冒泡事件，而其他元素的冒泡事件依旧会执行。

### .prevent（阻止默认行为）

正常情况下，当点击a链接时会跳转到对应的网址。当添加`.prevent`修饰符之后就不再跳转而执行hrefClick点击事件。

``` html
<body>
  <div id="app">
    <a href="http://www.baidu.com" @click.prevent="hrefClick">百度一下</a>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      methods: {
        hrefClick() {
          console.log("hrefClick");
        }
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/05_v-on/02_.prevent修饰符.png')" alt=".prevent修饰符">

### .once（只执行一次）

下面我们写了两个a链接，其中第一个a链接是阻止了默认行为，点击a链接会执行hrefClick点击事件，这是可以重复执行的。第二个a链接阻止默认行为且只执行一次的话，执行一次之后就会执行a链接的默认行为（跳转网站或执行锚点）。

``` html
<body>
  <div id="app">
    <a href="http://www.baidu.com" @click.prevent="hrefClick">百度一下</a>
    <a href="http://www.baidu.com" @click.prevent.once="hrefClick">百度一下</a>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      methods: {
        hrefClick() {
          console.log("hrefClick");
        }
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/05_v-on/03_.once修饰符.png')" alt=".once修饰符">

由此可见，事件修饰符可以串联使用。


### .native（监听根组件的原生事件）

在组件中绑定一个原生事件，直接`v-on`事件是无法生效的，必须加修饰符`.native`。

``` html
<my-component v-on.native="btnClick"/>
```

## v-on按键修饰符

通过在输入框输入完内容后，会按回车或者一些特殊的按钮来执行某些操作。所以在输入框中添加按键的监听操作。vue提供的是：`@keyup`。但是vue提供的键名是比较少的：

``` js
.enter
.tab
.delete
.esc
.space
.up
.down
.left
.right 
```

要使用以上按键就可以使用`@keyup.enter`这种方法进行调用。

``` html
<body>
  <div id="app">
    <input type="text" @keyup.enter="keyUp">
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      methods: {
        keyUp() {
          console.log('输入完成!');
        }
      }   
    })
  </script>
</body>
```

但是，我们有特殊的需求，并不是以上面的按键进行操作，下面就要用到键值进行调用，例如对 `f1` 进行调用：

``` html
<input type="text" @keyup.f1="console.log('输入完成!')">

<script>
  // 全局定义后，就可以调用@keyup.f1
  Vue.config.keyCodes.f1 = 112; 
</script>
```

按键修饰符也可以组合使用，

``` js
.ctrl
.alt
.shift
.meta
```

``` html
<!-- shift 键 + s -->
<input type="text" @keyup.shift.83="console.log('输入完成!')">
```