# 数组的扩展

## 扩展运算符
### 含义

扩展运算符是由三个点（`...`）。它好比rest参数的逆运算，将一个数组转为用逗号分割的参数序列。

``` js
console.log(...[1, 2, 3]);
// 1 2 3

console.log(1, ...[2, 3, 4], 5);
// 1 2 3 4 5
```

该运算符主要用于函数调用。

``` js
function push(array, ...items) {
  array.push(...items);
  return array;
}
push([], 1, 2, 3);    // [1, 2, 3]


function add(x, y) {
  return x + y;
}
const arr = [4, 5];
add(...arr)   // 9
```

::: danger 注意一：
如果扩展运算符后面是一个空数组，则无任何效果。
``` js
console.log([...[], 1]);    // [1]
```
:::

::: danger 注意二：
只有在函数调用时，扩展运算符才可以放到圆括号中，否则报错。
``` js
(...[1, 2])
// Uncaught SyntaxError: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2
```
上面三种情况都放在圆括号中，但前两种会报错，因为扩展运算符所在的括号不是函数的调用。
:::

### 代替函数的apply方法

因为扩展运算符可以将数组展开，所以就不再需要`apply`方法将数组转化为函数的参数了。

我们使用扩展运算符代替`apply`方法来实现两个案例：

1. 应用`Math.max()`方法，来求出数组中最大元素。

``` js
const arr = [23, 12, 43, 32, 12, 4];

// ES5写法：
console.log(Math.max.apply(null, arr));

// ES6写法：
console.log(Math.max(...arr));
```

2. 通过`push`函数，将一个数组添加到另一个数组的尾部。

``` js
// ES5写法：
const a1 = [1, 2, 3];
const a2 = [9, 8, 7];

function foo() {
  Array.prototype.push.apply(a1, a2);
  return a1;
}
console.log(foo());

// ES6写法：
const a1 = [1, 2, 3];
const a2 = [9, 8, 7];

function foo() {
  arr1.push(...a2);
  return a1;
}
console.log(foo());
```

### 扩展运算符的应用

1. 复制数组

数组是复合类型数据，如果直接复制的话，只是复制了指向底层数据结构的指针。而不是克隆一个全新的数组。

``` js
const a1 = [1, 2, 3];
a2 = a1;

a2[0] = 5;
console.log(a1);    // [5, 2, 3]
```

上面代码，`a2`并不是`a1`的克隆，它们都指向的是同一指针。当修改`a2`时，会直接导致`a1`的变化。

ES5只能使用变通的办法来复制数组，`concat`方法。

``` js
const a1 = [1, 2, 3];
a2 = a1.concat();

a2[0] = 5;
console.log(a1);    // [1, 2, 3]
console.log(a2);    // [5, 2, 3]
```

ES6提供了扩展运算符的简便写法。

``` js
const a1 = [1, 2, 3];
a2 = [...a1];

a2[0] = 5;
console.log(a1);    // [1, 2, 3]
console.log(a2);    // [5, 2, 3]
```

2. 合并数组

扩展运算符提供了数组合并的新写法。

``` js
const a1 = ['a', 'b'];
const a2 = ['c'];
const a3 = ['d', 'e'];

// ES5合并数组
a1.concat(a2, a3);   
//  ["a", "b", "c", "d", "e"]

// ES6合并数组
[...a1, ...a2, ...a3];   
// ["a", "b", "c", "d", "e"]
```

这两种方法都是`浅拷贝`，使用时需要注意。

``` js
const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true
```

`a3`和`a4`是使用上面两种方法合并成的新数组，但是它们的成员都是对原数组成员的引用，即`浅拷贝`。如果修改了引用指向的值，那么会同步反映到新数组上。


## Array.from()

`Array.from`方法用于将两类对象转化为真正的数组：类似数组的对象（array-like object）和可遍历的对象（包括 ES6 新增的数据结构 Set 和 Map）。

下面是类似数组的对象：任何有length属性的对象都可以通过`Array.from`转化为数组。
``` js
const arrayLike = {
  0: "kobe",
  1: "james",
  2: 'curry',
  length: 3
};

// ES5写法：
[].slice.call(arrayLike);   // ["kobe", "james", "curry"]

// ES6写法：
Array.from(arrayLike);    // ["kobe", "james", "curry"]
```

常见的类似数组的对象是：
* DOM操作返回的NodeList集合；
* 函数中的`arguments`对象；

``` js
// NodeList对象
let lis = document.querySelectorAll("li");
Array.from(lis).filter((item, index) => {
  retrun item.textContent.length > 10;
});

// arguments对象
function foo() {
  let args = Array.from(arguments);
  // ...
}
```

只要是部署了`Iterator`接口的数据结构，`Array.from`都能将其转为数组。包括了字符串和Set结构。
下面代码可以看到字符串有`Iterator`接口。

``` js
const str = new String();
console.log(str.__proto__);
```

``` js
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
```

如果参数是一个数组，那么`Array.from`会返回一个一模一样的新数组。

``` js
const newArr = Array.from([1, 2, 3]);
newArr    // [1, 2, 3]
```

返回的新数组是浅拷贝，下面是证明浅拷贝的过程。

``` js
var obj = new Object({
  name: "kobe",
  age: 18,
  isRich: [false, true]
});

// 将对象转化为数组
let objs = [];
for(let i in obj) {
  objs.push(obj[i])
}

let arrObj = Array.from(objs);

console.log(objs);    // ["kobe", 18, [false, true]]
console.log(arrObj);    // ["kobe", 18, [false, true]]

//我们要改变objs子对象的值；
objs[2][0] = true;

objs[1] = 50;

console.log(objs);   // ["kobe", 50, [true, true]]
console.log(arrObj);   // ["kobe", 18, [true, true]]
```

浅拷贝过来的数据只有第一层数据不是共享的，第二层乃至第三层的数据和源对象是共享的。

::: tip 提示
扩展运算符（...）也可以将某些数据结构转为数组。背后的原理是调用遍历器接口（Symbol.iterator），如果一个对象没有部署这个借口，就无法转换。

``` js
// arguments对象
function foo() {
  const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]
```
:::


`Array.from`还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，之后将处理后的值放到返回的数组中。

``` js
// 例一：取出一组DOM节点的文本内容
let lis = document.getElementsByTagName("li");
let liContentArr = Array.from(lis, item => item.textContent);

// 例二：将数组中布尔值为false的成员转为0
Array.from([1, , 2, 3, , 4], item => item || 0);

// 例三：返回各种数据的类型
function typesof() {
  return Array.from(arguments, item => typeof item);
}
typesof(null, [], NaN)   // ['object', 'object', 'number']

// 例四：将字符串转为数组，然后返回字符串的长度
function stringLength(string) {
  return Array.from(string).length;
};

stringLength("hello");    // 5
```

## Array.of()

`Array.of`方法用于将一组值，转化为数组。

``` js
Array.of(3, 11, 8);   // [3, 11, 8]
Array.of(3);    // [3]
Array.of(3).length;   // 1
```

这个方法的主要目的是：弥补数组的构造函数`Array()`的不足。因为参数的不同，会导致`Array()`的行为差异。

``` js
Array();   // []
Array(3);   // [, , ,]
Array(3, 11, 8);    // [3, 11, 8]
```

上面代码中，`Array`方法的不同参数返回的结果也是不同的。当参数个数只有一个时，实际表示的是数组的长度。只有当数组的长度个数不少于2个的时候，`Array()`方法才会返回由参数组成的新数组。

所以，`Array.of`基本上可以替代`Array()`或者`new Array()`，而且不存在因为参数的不同而导致的重载。

``` js
Array.of();   // []
Array.of(undefined);   // [undefined]
Array.of(1);   // [1]
Array.of(1, 2);   // [1, 2]
```

`Array.of`总是返回参数值组成的数组。如果没有参数，责任返回一个空数组。


## 数组实例的copyWithin()

数组的实例`copyWithin()`方法，在当前数组的内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

``` js
Array.prototype.copyWithin(target, start = 0, end = this.length);
```

它接受三个参数：
* target(必需)：从该位置开始替换数据。如果为负值，表示倒数。
* start(可选)：从该位置开始读取数据，默认为0。如果为负数，表示从末尾开始计算。
* end(可选)：`到该位置前`停止读取数据，默认等于数组的长度。如果为负数，表示从末尾开始计算。

这三个参数都应该是数值，如果不是，会自动转为数值。

``` js
// 将3号位至数组末尾复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]
```

## 数组实例的find()和findIndex()

数组实例的`find()`用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员则，返回`undefined`。

`find`方法的回调函数接受三个参数依次是：
* value：当前的值；
* index：当前的位置；
* arr：原数组；

找出数组中第一个小于0的成员：
``` js
[1, 3, -5, 10].find((value, index, arr) => item < 0);
// -5
```

`findIndex()`用法与`find()`非常相似，返回第一个符合条件的数组成员的位置。如果所有成员都不符合条件，则返回-1。

``` js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

## 数组实例的includes()

该方法返回一个布尔值，表示某个数组是否包含给定的值。

``` js
[1, 2, 3].includes(2);    // true
[1, 2, 3].includes(4);    // false
[1, 2, NaN].includes(NaN);    // true
```

该方法的第二个参数表示搜索的起始位置，默认为`0`.如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（如果第二个参数为`-4`，数组的长度为`3`）,则会重置为从`0`开始。

``` js
[1, 2, 3].includes(3, 3);   // false
[1, 2, 3].includes(3, -1);   // true
```

`includes()`为了解决`indexOf()`的不足，`indexOf()`的两个缺点：
* 不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于`-1`，表达起来不够明确；
* 它内部使用严格相等运算符（===）进行判断，这会导致`NaN`的误判。

## 数组实例的keys()、values()、entries()

keys()、values()、entries()用于遍历数组，它们都返回一个遍历器对象，可以使用for...of循环进行遍历。

keys()：对键名的遍历
``` js
const arr5 = ["kobe", "james", "curry"];

for(let index of arr5.keys()) {
  console.log(index);   // 0 1 2
}
```

value()：对键值的遍历
``` js
const arr5 = ["kobe", "james", "curry"];

for(let elem of arr5.values()) {
  console.log(elem);   // "kobe" "james" "curry"
}
```

entries(): 对键值对的遍历
``` js
const arr5 = ["kobe", "james", "curry"];

for(let [index, elem] of arr5.entries()) {
  console.log(index, elem);   // 0 "kobe"  1 "james"  2 "curry"
}
```

如果不使用for...of遍历，可以手动调用遍历器对象的next方法，进行遍历。

``` js
const arr5 = ["kobe", "james", "curry"];

const entries = arr5.entries();
console.log(entries.next().value);    // [0, "kobe"]
console.log(entries.next().value);    // [1, "james"]
console.log(entries.next().value);    // [2, "curry"]
console.log(entries.next().value);    // undefined
```