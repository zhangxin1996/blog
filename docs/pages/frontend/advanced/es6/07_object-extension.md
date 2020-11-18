# 对象的扩展

## 属性的简洁表示法

ES6中允许在大括号中里面，直接写入变量和函数作为对象的属性和方法。

``` js
const name = "coderz";
const age = 18;

const person = {
  name,   // 相当于 name:name
  age,
  sayHello() {   // 声明方法的简化
    console.log("Hello World");
  }
}

// 等同于

const person = {
  name: name,
  age: age,
  sayHello: function() {
    console.log("Hello World");
  }
}
```

上面代码，变量`name`和`age`直接写在了大括号中，属性名是变量名，属性值是变量值。除了属性简写，方法也可以简写。


属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。

``` js
let cart = {
  wheels: 4,
  set(newVal = 3) {
    if(newVal < this.wheels) {
      throw new Error("轮子数太少了");
    }
    this.wheels = newVal;
  },
  get() {
    return this.wheels;
  }
};

cart.set(4);
console.log(cart.get());
```

::: danger 注意
简写的方法不能用作构造函数，会报错。

``` js
const obj = {
  f() {
    this.foo = "bar"
  }
};

new obj.f();
```
:::


## 属性名表达式

JavaScript定义对象的属性有两种方式。方法一是直接用标识符作为属性名，方法二是将表达式作为属性名，这时要将表达式放到方括号中。

``` js
// 方法一：
obj.name = "kobe";

// 方法二：
obj['na' + 'me'] = "kobe";
```

在ES5中使用字面量方式定义对象（即大括号方式），只能使用方式一（标识符）来定义属性。

``` js
let obj = {
  name: "kobe",
  age: 18
};
```

而在ES6中使用字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式挡在方括号内。

``` js
let propKey = "age";

let obj = {
  ["na" + "me"]: 'coderz',
  [propKey]: 18,
  height: 1.88
}
```

表达式还可以定义方法名。

``` js
let obj = {
  ["say" + "Hello"] () {
    return "Hello World";
  }
}

obj.sayHello();   // Hello world
```

::: danger 注意一：
属性名表达式与简洁表达式不能同时使用，会报错。

``` js
// 报错
const foo = "bar";
const bar = "abc";
const baz = { [foo] };

// 正确
const foo = "bar";
const baz = {[foo]: "abc"};
```
:::


::: danger 注意二：
属性名表达式如果是一个对象，默认情况下会自动将对象转化为字符串`[object object]`，这一点非常小心。

``` js
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB',
}

myObject    // {[object object]: "valueB"}
```

上面代码，`[keyA]`和`[keyB]`得到的都是`[object object]`，所以`[keyB]`会覆盖`[keyA]`掉，而`myObject`最后只有一个`[object object]`属性。
:::

