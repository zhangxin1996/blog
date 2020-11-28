# 函数的扩展

## 函数参数的默认值

### 基本用法
ES6之前，不能直接对函数的参数指定默认值，只能采用变通的办法。
``` js
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello')    // 'Hello' 'world'
log('Hello', 'China')   // 'Hello' 'China'
log('Hello', '')    // 'Hello' 'world'
```

上面代码中，当参数y没有赋值时，则对参数y指定默认值为`World`。但是这种写法的缺点在于，如果对参数y赋值了，但是对应的布尔值为`false`，那么这种赋值是无效的。像上面代码的最后一行，为参数y赋值为空字符串，结果被修改为默认值。

为了避免上面的问题，我们首先要判断是否为参数y赋值，如果没有赋值则赋初始值。

``` js
if(typeof y === 'undefined') {
  y = 'World';
}
```

ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。
``` js
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello')    // 'Hello' 'world'
log('Hello', 'China')   // 'Hello' 'China'
log('Hello', '')    // 'Hello'
```

ES6写法比ES5写法的好处：
* 简洁很多，而且非常自然；
* 阅读代码的人，可以立即认识到那些参数是可以省略的，不用查看函数体或者文档；
* 有利于将来代码的优化，即使未来的版本在对外接口中，彻底拿掉了这个参数，也不会导致之前的代码无法运行；

::: danger 注意1
参数变量是默认声明的，所以不能用`let`或者`const`再次声明，否则会报错。
``` js
function foo(x = 5) {
  let x = 1;    // error
  const x = 2;    // error
}
```
:::

::: danger 注意2
使用参数默认值时，函数不能有同名参数。
``` js
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y) {
  // ...
}
// Uncaught SyntaxError: Duplicate parameter name not allowed in this context
```
:::

### 与解构赋值默认值结合使用

参数默认值可以与解构赋值的默认值，结合起来使用。
``` js
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({})   // undefined 5
foo({x: 1})   // 1 5
foo({x: 1, y: 2})   // 1 2
foo()   // TypeError: Cannot read property 'x' of undefined
```
上面的代码只是用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数`foo`的参数是一个对象时，变量`x`和`y`才会通过解构赋值生成。如果函数`foo`调用时没有提供参数，变量`x`和`y`就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。

``` js
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo();    // undefined 5
```

上面代码，如果没有提供参数，函数`foo`的参数默认是一个空对象。

作为练习，请问下面两种写法有什么区别？

``` js
// 写法一：
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二：
function m2({x, y} = {x: 0, y: 0}) {
  return [x, y];
}
```

上面两种写法都对函数的参数设定了默认值。区别在于：写法一是给函数参数的默认值是空对象，但设置了对象解构赋值的默认值；写法二是给函数参数的默认值是一个有具体属性的对象，但没有设置对象解构赋值的默认值。

``` js
// 函数没有参数的情况下
m1();   // [0, 0]
m2();   // [0, 0]

// x和y都有值的情况
m1({x: 3, y: 8});   // [3, 8]
m2({x: 3, y: 8});   // [3, 8]

// x有值，y无值的情况
m1({x: 3});   // [3, 0]
m2({x: 3});   // [3, undefined]

// x和y都无值的情况
m1({});   // [0, 0]
m2({});   // [undefined, undefined]

// x和y都无值，但给一个z值的情况
m1({z: 3});   // [0, 0]
m2({z: 3});   // [undefined, undefined]
```

### 参数默认值的位置

通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没办法省略的。

``` js
// 例一：
function f(x = 1, y) {
  return [x, y];
}

f()   // [1, undefined]
f(2)    // [2, undefined]
f(, 1)    // 报错
f(undefined, 1)   // [1, 1]

// 例二：
function f(x, y = 5, z) {
  return [x, y, z];
}

f()   // [undefined, 5, undefined]
f(1)    // [1, 5, undefined]
f(1, ,2)   // 报错
f(1, undefined, 2)    // [1, 5, 2]
```

上面代码，有默认值的参数都不是尾参数。这时，无法只省略该参数，又不省略它后面的参数，除非显示的输入`undefined`。

如果传入`undefined`，将触发该参数等于默认值，`null`则没有这个效果。

``` js
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)    // 5 null
```

上面代码中，x参数对应的`undefiend`，所以触发了默认值。y参数等于`null`，就没有触发默认值。

### 函数的length属性

指定了默认值后，函数的`length`属性，将返回没有指定默认值的参数的个数。也就是说，指定了默认值后，`length`属性失真。

``` js
(function (a) {}).length    // 1
(function (a = 5) {}).length    // 0
(function (a, b, c = 3) {}).length    // 2
```

这是因为`length`属性的含义是，该函数预期传入的参数个数。当某个参数指定默认值后，预期传入的参数个数就不包括这个参数了。剩余参数也不会计入`length`属性。

``` js
(function (...args) {}).length    // 0
```

如果设置了默认值的参数不是尾部参数，那么`length`属性也不会再计入后面的参数了。

``` js
(function (a = 3, b, c) {}).length    // 0
(function (a, b = 2, c) {}).length    // 1
```


## rest参数

ES6引入了rest参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放到一个数组中。

我们实现一个案例，这里有一个关于书的对象，里面存放了关于书的一些信息。挑选出一些对象的属性作为函数的参数，最后返回一个新对象。新对象中属性是传入的参数，属性值是传入参数的属性值。

``` js
const books = {
  title: "ES6标准入门",
  author: "阮一峰",
  year: 2017
};

const bookData = pick(books, "title", "author");
```


ES5实现的方法：
``` js
function pick(obj) {
  const result = {};
  for(let i = 1; i < arguments.length; i++) {
    result[arguments[i]] = obj[arguments[i]];
  }
  return result;
}
console.log(bookData);    // {title: "ES6标准入门", author: "阮一峰"}
```

ES6的写法：
``` js
function pick(obj, ...keys) {
  const result = {};
  for(let i = 0; i < keys.length; i++) {
    result[keys[i]] = obj[keys[i]];
  }
  return result;
}
console.log(bookData);    // {title: "ES6标准入门", author: "阮一峰"}
```

rest参数和arguments对象的区别：
1. rest参数只包含那些没有对应形参的实参，而`arguments`对象是包含传递给函数所有的实参。

2. `arguments`对象不是数组，而是一个类似于数组的对象，所以你想使用数组的方法，必须使用`Array.prototype.slice.call(arguments)`先将其转化为数组。而rest参数就是一个真正的数组，数组的所有方法都可以使用。

下面是一个rest参数代替`arguments`变量的例子。
``` js
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

::: danger 注意一
rest参数后面不能再有其他参数了（即只能是最后一个参数），否则报错。

``` js
// 报错
function f(a, ...b, c) {
  // ...
}
```
:::

::: danger 注意二
函数的`length`属性，不包括rest参数

``` js
(function(a) {}).length   // 1
(function(...a) {}).length   // 0
(function(a, ...b, c) {}).length   // 1
```
:::


## 箭头函数

### 基本操作
ES6允许使用“箭头”（`=>`）定义函数。

``` js
const f = v => v;

// 等同于

const f = function(v) {
  return v;
}
```

如果箭头函数不需要参数或者需要多个参数，就使用一个圆括号代表参数部分。若只有一个参数时，可以省略圆括号。

``` js
// 当没有参数时：
const foo = () => {
  return "Hello World";
}

// 当有一个参数时：
const foo = name => {
  return `Hello：${name}`;
}

// 当有两个参数时：
const add = (a, b) => {
  return a + b;
}
```

如果箭头函数的代码块只有一条语句时，可以省略大括号和return写成一行：而且语句的执行结果就是返回值。

``` js
const add = (a, b) => {
  return a + b;
}
// 简便写法：
const add = (a, b) => a + b;
```

如果返回值是一个对象时：也可以简写：
``` js
const obj = () => {
  return {
    name: "coderz",
    age: 18,
    height: 1.88
  }
}
console.log(obj());

// 简便写法：

const obj = () => ({
    name: "coderz",
    age: 18,
    height: 1.88
  })
console.log(obj());
```

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在外面加上括号，否则报错。

箭头函数用处：
1. 简化回调函数，使代码更加清晰
    ``` js
    // 正常函数写法
    [1, 2, 3].map(function(item) {
      return item * 3;
    })

    // 箭头函数的写法：
    [1, 2, 3].map(item => item * 3);
    ```

2. rest参数和箭头函数的结合
    ``` js
    const numbers = (...nums) => nums;
    numbers(1, 2, 3, 4, 5);   // [1, 2, 3, 4, 5]

    const handAndTail = (head, ...tail) => [head, tail];
    handAndTail(1, 2, 3, 4, 5);   // [1, [2, 3, 4, 5]]
    ```

### 使用注意点
1. 函数体内部的`this`对象是静态的，this始终指向的是函数声明时所在作用域下的this的值。
    另外，由于箭头函数没有自己的`this`，所以也就不能使用`call()`、`apply()`、`bind()`这些方法去改变`this`的指向。

    ``` js
    window.name = "kobe";
    const obj = {
      name: "james"
    };

    function getName1() {
      console.log(this.name);
    }

    const getName2 = () => {
      console.log(this.name);
    }

    getName1();   // kobe
    getName2();   // kobe

    // 当改变this指向
    getName1.call(obj);   // james
    getName2.call(obj);   // kobe
    ```

2. 箭头函数内部没有`arguments`对象。

    ``` js
    var add = (a, b) => {
      console.log(arguments);   // arguments is not defined
      return a + b;
    }
    add(1, 2);
    ```

3. 不能使用`new`关键字，来实例化对象，即不能当做构造函数来使用。
    因为箭头函数根本没有自己的`this`，导致内部的`this`是上一作用域的`this`。正是因为它没有`this`，所以也就不能用作构造函数了。
    ``` js
    let Person = (name, age) => {
      this.name = name;
      this.age = age;
    };
    const person = new Person("kobe", 20);
    console.log(person);
    // 报错：Person is not a constructor
    ```

4. 不能使用`yield`命令，既不能当作`Generactor`函数。


### 不适用场景

由于箭头函数使得`this`从“动态”变成“静态”，下面两种场景不适合使用箭头函数。

1. 定义对象的方法，且该方法内部有`this`；
``` js
const info = {
  name: "kobe",
  age: 20,
  sayHello: () => {
    console.log(`Hello：${this.name}`);
  }
}
```
当调用`info.sayHello()`时，使得`this`指向全局对象`window`，就不会得到预期的结果。这是因为对象不构成单独的作用域，导致`sayHello`函数定义时的作用域就是全局作用域。

2. 需要动态`this`的时候，也不要使用箭头函数。

``` js
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
```
因为button的监听函数是一个箭头函数，导致里面的`this`指向的是全局对象。所以点击按钮会报错。如果改为普通函数，`this`就动态的指向被点击按钮对象。

::: tip
箭头函数适合与this无关的回调，例如：定时器、数组方法的回调；
箭头函数不适合与this无关的回调，例如：DOM事件回调、对象的方法；
:::