# 变量的解构赋值

ES6中允许按照一定模式从数组或者对象中提取值，之后对变量进行赋值，这一操作被称为解构赋值。

## 数组的解构赋值

### 基本用法

以前为变量进行赋值，只能直接指定值。
``` javascript
let a = 1;
let b = 2;
let c = 3;
```

ES6允许这样写：
``` javascript
let [a, b, c] = [1, 2, 3];
```

上面代码表示，可以从数组中提取值，按照对应位置对变量进行赋值。

本质上，这些写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。

``` javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo   // 1
bar   // 2
baz   // 3

let [ , , third] = ["foo", "bar", "baz"];
third   // "baz"

let [x, , y] = [1, 2, 3];
x   // 1
y   // 3

let [head, ...tail] = [1, 2, 3, 4];
head    // 1
tail    // [2, 3, 4]

let [x, y, ...z] = ["a"];
x   // a
y   // undefined
z   // []
```

### 解构不成功
如果解构不成功，变量的值就等于`undefined`。

``` javascript
let [foo] = [];
foo   // undefined

let [bar, foo] = [];
bar   // undefined
foo   // undefined
```
以上两种情况都属于解构不成功，`foo`的值都会等于`undefined`。

### 不完全解构
另一种情况是不完全解构，即等号左边的模式，只能够匹配等号右边的一部分数据。这种情况下解构依然是可以成功的。

``` javascript
let [x, y] = [1, 2, 3];
x   // 1
y   // 2

let [a, [b], d] = [1, [2, 3], 4];
a   // 1
b   // 2
d   // 4
```
上面的两个例子，都属于不完全解构，但都可以成功。


### 将数组剩余部分赋值给一个变量

当结构一个数组时，可以使用剩余模式，将数组剩余部分赋值给一个变量。
``` js
let [a, ...b] = [1, 2, 3];
a   // 1
b   // [2, 3]
```

::: danger 注意
如果剩余元素右侧有逗号，会抛出SyntaxError，因为剩余元素必须是数组的最后一个元素。
:::

``` js
let [a, ...b,] = [1, 2, 3];

// SyntaxError: rest element may not have a trailing comma
```


### 交换变量
在一个结构表达式中可以交换两个变量的值。
如没有解构赋值的情况下，交换两个变量需要使用一个临时变量。

``` js
let a = 1;
let b = 2;
[a, b] = [b, a];

a   // 2
b   // 1
```


### 默认值

解构赋值为了防止从数组中取出一个值为undefined，可以在表达式左边的数组中为任意对象预设默认值。

``` js
let [foo = true] = [];
foo     // true

let [x, y = 'b'] = ['a'];   // x = 'a', y = 'b'
let [x, y = 'b'] = ['a', undefined];    // x = 'a', y = 'b'
```

::: danger 注意
ES6内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，当一个数组成员严格等于`undefined`，默认值才会生效。
:::

``` js
let [x = 1] = [undefined];
x   // 1

let [x = 1] = [null];
x   // null
```
上面代码中，如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格相等于`undefined`。


如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
``` js
function f() {
  console.log("aaa");
}

let [x = f()] = [1];

x   // 1
```
上面代码中，因为x可以取到值，所以函数f根本不会执行。

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
``` js
let [x = 1, y = x] = [];    // x = 1, y = 1
let [x = 1, y = x] = [2];   // x = 2, y = 2
let [x = 1, y = x] = [1, 2];    // x = 1, y = 2
let [x = y, y = 1] = [];    // ReferenceError: y is not defined
```
上例中，最后一个表达式之所以会报错，是因为x使用y做默认值时，y还没有声明。


### 注意点

::: danger 注意
如果等号的右边不是数组（或严格地说，不是可遍历的结构）那么将会报错。
:::

``` javascript
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

上面的语句都会报错，因为等号右边的值，要么转化为对象以后不具备 Iterator 接口（前五个表达式 ），要么本身就不具备 Iterator 接口（最后一个表达式）。



## 对象的解构赋值

### 基本用法

解构不仅可以用于数组，还可以用于对象。

``` js
let {foo, bar} = {foo: 'aaa', bar: 'bbb'};
foo   // 'aaa'
bar   // 'bbb'
```
对象的解构赋值与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定的；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

``` js
let {bar, foo} = {foo: 'aaa', bar: 'bbb'};
bar   // bbb 
foo   // aaa
```

上面代码中，等号左边的两个变量的次序，与等号右边的同名属性的次序不一致，但是对取值完全没有印象。

### 解构不成功

如果解构不成功，变量的值为`undefined`。

``` js
let {baz} = {foo: 'aaa', bar: 'bbb'};
baz   // undefined
```

上面代码中，等号右边的对象没有`baz`属性，所以变量`baz`取不到值，所以等于`undefined`。


### 解构中的剩余参数
``` js
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
a   // 10
b   // 20
rest    // {c: 30, d: 40}
```

### 变量名与属性名不一致

如果变量名与属性名不一致，必须写成下面这样。

``` js
let {foo: baz} = {foo: 'aaa', bar: 'bbb'};
baz   // aaa

let obj = {first: 'hello', last: 'world'};
let {first: f, last: l} = obj;
f   // 'hello'
l   // 'world'
```

这实际上说明，对象的解构赋值是下面形式的简写。

``` js
let {foo: foo, bar: bar} = {foo: 'aaa', bar: 'bbb'};
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者，而不是前者。

``` js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
foo   // error: foo is not defined
baz   // 'aaa'
```

上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。


### 默认值

对象的解构也可以指定默认值。可以先给变量赋予默认值，当要提取的对象没有对应的属性时，变量就被赋予默认值。

``` js
var {x = 3} = {};
x   // 3

var {x, y = 5} = {x: 1};
x   // 1
y   // 5

var {x: y = 3} = {};
y   // 3

var {x: y = 3} = {x: 5};
y   // 5

var {message: msg = 'Something went wrong'} = {};
msg   // 'Something went wrong'
```

默认值生效的条件是：对象的属性值严格相等于`undefined`。

``` js
var {x = 3} = {x: undefined};
x   // 3

var {x = 3} = {x: null};
x   // null
```

上面代码中，属性`x`等于`null`，因为`null`与`undefined`不严格相等，所以是个有效的赋值，导致默认值`3`不会生效。


### 注意点

1. 如果要将一个已经声明的变量用于解构赋值，不需要非常小心。
``` js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```
上面代码的写法会报错，因为JavaScript引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免JavaScript将其解析为代码块，才会解决这个问题。

``` js
// 正确的写法
let x;
({x} = {x: 1});
```
上面代码将整个解构赋值语句，放到一个圆括号内，就可以正确执行。关于圆括号与解构赋值的关系，见下文。

2. 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
``` js
({} = [true, false]);
({} = 'abc');
({} = []);
```
上面的表达式虽然毫无意义，但是语法是合法的，可以执行。

3. 由于数组本质是特殊的对象，因此可以对数组进行对象属性的结构
``` js
let arr = [1, 2, 3];
let {0: first, [arr.length - 1]: last} = arr;
first   // 1
last    // 3
```
上面代码对数组进行对象解构，数组`arr`和`0`键对应的值是`1`。`[arr.length - 1]`就是`2`键，对应的值是`3`。方括号这种写法，属于“属性名表达式”。