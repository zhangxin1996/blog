表单控件在实际开发中是非常常见的。特别是对于用户信息的提交，需要大量的表单。Vue中使用`v-model指令`来实现表单元素和数据的双向绑定。

## v-model的基本使用

我们来实现一个案例：

当input中的`v-model`指令绑定message时，运行代码input的value属性会展现message的内容；当在input中输入内容时，会实时的将输入的内容传递给message，message发生改变。

当message发生改变时，因为我们使用`Mustache语法`，会将message的值插入到DOM中去，所以DOM会发生响应的改变。

这就是通过`v-model`指令实现双向绑定。

``` html
<body>
  <div id="app">
    <input type="text" v-model="message">
    <h2>{{message}}</h2>
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

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/01_v-model的基本使用.png')" alt="v-model的基本使用">


## v-model的原理

`v-model指令`其实是一个语法糖，它背后本质是包括两个操作：
* 属性绑定：`v-bind指令`绑定value属性；
* 事件监听：`v-on指令`给当前元素绑定input事件，触发输入事件；

也就是说，v-model等同于：
``` html
<body>
  <div id="app">
    <input type="text" v-bind:value="message" @input="message = event.target.value">
    <h2>{{message}}</h2>
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

## v-model结合textarea

`v-model指令`用于textarea元素。

``` html
<body>
  <div id="app">
    <textarea id="aaa" cols="30" rows="10" v-model="message"></textarea>
    <h2>{{message}}</h2>
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

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/02_v-model结合textarea元素.png')" alt="v-model结合textarea元素">


## v-model结合radio类型

单选按钮组合使用来实现互斥效果，需要使用`v-model指令`配合value属性使用。

::: tip 提示
数据sex的值与单选按钮的value属性一致时，就会选中该项。
:::

``` html
<body>
  <div id="app">
    <label for="male">
      <input type="radio" id="male" value="男" v-model="sex">男
    </label>
    <label for="female">
      <input type="radio" id="female" value="女" v-model="sex">女
    </label>
    <h2>您选择的性别是：{{sex}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        sex: "男"
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/03_v-model结合radio类型.png')" alt="v-model结合radio类型">

::: danger 注意
一般情况下是需要设置name属性的，提交到服务器作为key，有了name属性才会互斥的。但使用`v-model指令`绑定后可以省略name属性了，Vue会帮我们解决分组问题。
:::


## v-model结合checkbox类型

复选框分为两种情况：单个复选框和多个复选框。

### 单个复选框

`v-model指令`绑定布尔值，为true时选中，为false时不选中。其中input中的value属性不会影响v-model的值。

作用是：一般作为是否同意协议，来进行下一步操作。当不同意协议就不能进行下一步操作。

``` html
<body>
  <div id="app">
    <label for="protocol">
      <input type="checkbox" id="protocol" v-model="isProtocol">同意协议
    </label>
    <h2>您是否同意协议：{{isProtocol}}</h2>
    <button :disabled="!isProtocol">下一步</button>
  </div>
  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        isProtocol: false
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/04_v-model结合checkbox类型之单个复选框.png')" alt="v-model结合checkbox类型之单个复选框">


### 多个复选框

当是多个复选框时，因为可以选中多个所以对应data中的属性是一个数组。当选中某一个复选框时，会将这个复选框的value属性的值添加到数组中。

``` html
<body>
  <div id="app">
    <label for="basketball">
      <input type="checkbox" id="basketball" value="篮球" v-model="hobbies">篮球
    </label>
    <label for="football">
      <input type="checkbox" id="football" value="足球" v-model="hobbies">足球
    </label>
    <label for="pingpong">
      <input type="checkbox" id="pingpong" value="乒乓球" v-model="hobbies">乒乓球
    </label>
    <label for="badminton">
      <input type="checkbox" id="badminton" value="羽毛球" v-model="hobbies">羽毛球
    </label>
    <h2>你选择的爱好是：{{hobbies}}</h2>
  </div>
  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        hobbies: []
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/05_v-model结合checkbox类型之多个复选框.png')" alt="v-model结合checkbox类型之单个复选框">


## v-model结合select类型

和checkbox类型一样，select类型也分单选和多选两种情况。

### 单选选择列表

单选意味着只能选中一个值，所以`v-model指令`只能绑定一个值（String类型）。

当我们选中一个option项时，会将它的value值赋值到fruits1。如果该option项有value属性，会优先匹配value的值，如果没有就会匹配option项的text值。

``` html
<body>
  <div id="app">
    <select name="mySelect" id="" v-model="mySelect">
      <option value="苹果">苹果</option>
      <option value="香蕉">香蕉</option>
      <option value="橙子">橙子</option>
      <option>西瓜</option>
    </select>
    <h2>您选择的水果是：{{mySelect}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        mySelect: "橙子"
      }
    })
  </script>
</body>
```


<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/06_v-model结合select类型之单选.png')" alt="v-model结合select类型之单选">


### 多选选择列表

多选意味着可以绑定多个值，所以`v-model指令`绑定是一个数组。

当我们选中多个option项时，会将选中的option项对应的value值添加到mySelects数组中。

``` html
<body>
  <div id="app">
    <select name="mySelects" v-model="mySelects" multiple>
      <option value="苹果">苹果</option>
      <option value="香蕉">香蕉</option>
      <option value="橙子">橙子</option>
      <option value="西瓜">西瓜</option>
    </select>
    <h2>您选择的水果是：{{mySelects}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        mySelect: "橙子",
        mySelects: [],
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/07_v-model结合select类型之多选.png')" alt="v-model结合select类型之多选">


## 值绑定

值绑定就是动态的给value赋值而已。在之前都是定义input的时候直接给定value值，但是在实际开发中，这些input的value值可能是从网络上获取或定义在data中的。可以通过`v-bind:value`动态的给value绑定值。

在下面的案例中，我们使用`v-for指令`遍历originHobbies数组，将选中的复选框的value值放到hobbies数组中。

``` html
<body>
  <!-- 值绑定：意味着值不要写死，动态的获取的 -->
  <div id="app">
    <label v-for="item in originHobbies" :for="item">
      <input type="checkbox" :id="item" :value="item" v-model="hobbies">{{item}}
    </label>
    <h2>您选择的爱好是：{{hobbies}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        originHobbies: ["篮球", "足球", "乒乓球", "羽毛球", "高尔夫球", "台球"],
        hobbies: []
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/08_值绑定.png')" alt="值绑定">


## v-model的修饰符

### lazy修饰符

默认情况下，`v-model`默认在input事件中同步输入框中的数据。也就是说，一旦输入框中的数据发生改变对应的data就会发生变化。这样频率太高了。使用lazy修饰符可以让数据在输入框失去焦点或者输入完毕后按Enter键才会更新。

``` html
<body>
  <div id="app">
    <input type="text" v-model.lazy="msg">
    <h2>当前内容：{{msg}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        msg: ""
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/09_lazy修饰符.png')" alt="lazy修饰符">

### number修饰符

默认情况下，无论输入框中输入的是字母还是数字，都会被当做String类型处理。即使input的type是number类型，但只是第一次显示是Number类型，后面输入框中输入内容就是String类型。原因是：默认情况下，`v-model`给变量赋值的时候都是String类型。

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/10_使用number修饰符的原因.png')" alt="使用number修饰符的原因">

number修饰符可以让输入框中输入的内容自动转化为Number类型。

``` html
<body>
  <div id="app">>
    <input type="number" v-model.number="age">
    <h2>年龄：{{age}}, 类型：{{typeof age}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        age: 18
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/11_number修饰符.png')" alt="number修饰符">

### trim修饰符

如果输入的内容左右两边有很多空格，通常我们希望将其去除。trim修饰符可以过滤左右两边的空格。

``` html
<body>
  <div id="app">>
    <input type="text" v-model.trim="message">
    <h2>当前内容：{{message}}</h2>
  </div>

  <script src="../js/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        message: ""
      }
    })
  </script>
</body>
```

<img class="medium" :src="$withBase('/frontend/frame/vue/09_v-model/12_trim修饰符.png')" alt="trim修饰符">