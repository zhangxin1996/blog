# Set和Map数据结构

## Set

### 基本用法

ES6提供了新的数据解构Set，它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成 Set 数据结构。

``` js
const s = new Set();
console.log(s);
```

<img class="medium" :src="$withBase('/frontend/advanced/es6/10_set-map/01_set的创建.png')" alt="set的创建">

`Set`函数可以接受一个数组（或者具有 iterable 接口的其他数据解构）作为参数，用来初始化。

``` js
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
item.size   // 5

// 例三
const set = new Set(document.querySelectorAll("div"));
set.size   // 5

// 类似于

const set = new Set();
document.querySelectorAll("div").forEach(item => set.add(item));
set.size    // 5
```

上面代码中，例一和例二都是`set`函数接受数组作为参数，例三是接受一个类似数组的对象作为参数。

上面代码也展示了一种去除数组中的重复成员的方法。

``` js
// 去除数组中的重复成员
[...new set(array)]
```

向 Set 加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值。Set内部判断两个值是否不同，使用的算法是”Same-value-zero equality”，它类似于精确相等运算符（`===`）,但主要区别是向 Set 添加值时认为`NaN`等于自身，而精确相等运算符认为`NaN`不等于自身。

``` js
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);

set   // Set(1) {NaN}
```

上面代码中，向Set添加了两次`NaN`，但最后只加入一个。这表明，在 Set 内部两个`NaN`是相等的。

如果向 Set 添加两个空对象，它们会被视为是两个值。
``` js
let set = new Set();
set.add({});
set.size    // 1

set.add({});
set.size    // 2
```

### Set实例的属性和方法

Set结构的实例有以下属性：
* `Set.prototype.constructor`：构造函数，默认是`Set`函数。
* `Set.prototype.size`：返回`Set`实例的成员总数。

Set实例的方法分为两大类：操作方法（用于操作的数据）和遍历方法（用于遍历成员）。下面先接受四种操作方法。

* `Set.prototype.add(value)`：添加某个值，返回Set结构本身；
* `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
* `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`成员，
* `Srt.prototype.clear()`：清除所有成员，没有返回值；

下面这些属性和方法的实例如下：
``` js
const set = new Set();

set.add(1);   // Set(1) {1}
set.add("4");   // Set(2) {1, "4"}
set.add("4");   // Set(2) {1, "4"}
set.add(["lilei", "kobe", "lucy"]);   // Set(3) {1, "4", ["lilei", "kobe", "lucy"]}

set.size    // 3

set.has(1);   // true
set.has(2);   // fasle
set.has(4);   // false
set.has("4");   // true

set.delete("4");    // true
set.has("4");   // fasle
```

因为`Array.from()`方法可以将Set结构转为数组，所以可以利用Set结构的特性（不重复的数组成员），提供另一种去除数组重复成员的方法。

``` js
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 2, 3, 3, 4]);    // [1, 2, 3, 4]
```

### 遍历操作

Set结构的实例有四个遍历的方法，可以用于遍历成员。

* `Set.prototype.keys()`：返回键名的遍历器；
* `Set.prototype.values()`：返回键值的遍历器；
* `Set.prototype.entries()`：返回键值对的遍历器；
* `Set.prototype.forEach()`：使用回调函数遍历每个成员；

1. keys()、values()、entries()

`key`方法、`values`方法和`entries`方法返回的都是遍历器对象。由于Set结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为是一致的。

``` js
let set = new Set(['red', 'green', 'blue']);

// keys方法
for(let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

// values方法
for(let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

// entries方法
for(let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

`entries`方法返回的遍历器，同时包含键名和键值，所以每次输出一个数组，它的两个成员完全相等。

2. forEach

Set结构的实例与数组一样，也拥有`forEach`方法，用于对每个成员执行某种操作，没有返回值。

``` js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(`${key}:${value}`));

// 1: 1
// 4: 4
// 9: 9
```

上面代码说明，`forEach`方法的参数就是一个处理函数。该函数的参数与数组的`forEach`一致，依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set结构的键名就是键值（两个是同一个值），因此第一个参数与第二个参数的值永远都是一样的。

另外，`forEach`方法还可以有第二个参数，表示绑定处理函数内部的`this`对象。

3. 遍历的应用

* 扩展运算符（...）与Set结合，用于去除数组中重复成员。（只适用于基本数据类型）

``` js
let arr = [1, 3, 2, 5, 2, 3];
let unique = [...new Set(arr)];
// [1, 3, 2, 5]
```

* 数组的`map`和`filter`方法也可以间接用于 Set 了。

``` js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(value => value*2));
// 返回Set结构 Set(3) {2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
let = new set([...set].filter(value = > (value % 2) === 0));
// 返回set结构 set(2) {2, 4}
```

* 使用Set可以很容易的实并集Union）、交集（Intersect）和差集（Difference）。

``` js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union  = new Set([...a, ...b]);
// Set(4) {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(value => b.has(value)));
// Set(2) {2, 3}

// (a相对于b而言)差集
let difference = new set([...a].filter(value => !b.has(value)));
// Set(1) {1}
```

如果想在便利操作中，同步改变原来Set结构，目前没有直接的方法，但有两种变通的方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用`Array.from`方法。

``` js
// 方法一：
let set = new Set([1, 2, 3,]);
set = new Set([...set].map(item => item * 2));
// Set(1) {[2, 4, 6]}

// 方法二：
let set = new Set([1, 2, 3,]);
set = Array.from(set, item => item * 2);
// Set(1) {[2, 4, 6]}
```

## WeakSet

### 含义

WeakSet结构与Set结构相似，也是不重复的值的集合。但是与Set有两个区别。

1. WeakSet的成员只能是对象，而不能是其他数据类型的值。否则报错。
``` js
let ws = new WeakSet();
ws.add(1);
// Uncaught TypeError: Invalid value used in weak set
ws.add(Symbol())
// Uncaught TypeError: Invalid value used in weak set
```

2. WeakSet中的对象都是弱引用。
即垃圾回收机制不考虑 WeakSet 对该对象的引用。也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制将会自动回收该对象所占的内存，不再考虑该对象还是否存在WeakSet中。

有一个例子，在Set结构添加一个空对象成员，之后释放资源Set中对象引用无法被释放，而WeakSet可以这也是使用WeakSet的原因。

``` js
// Set
let set = new Set(), obj = {};
set.add(obj);
// 释放当前资源
obj = null;
console.log(set);
// Set(1) {{}}

// WeakSet
let ws = new WeakSet(), obj = {};
ws.add(obj);
// 释放当前资源
obj = null;
console.log(ws);
// Set() {}
```

### 语法

WeakSet是一个构造函数，可以使用`new`命令，创建WeakSet数据结构。

``` js
const ws = new WeakSet();
```

作为构造函数，WeakSet可以接受一个数组或者类似于数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）**该数组的所有成员，都会自动成为WeakSet实例对象的成员**。

``` js
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet{[1, 2], [3, 4]}
```

::: danger 注意
是a数组的成员成为WeakSet的成员，而不是a数组本身。这意味着，数组成员只能是对象。
``` js
const a = [2,  4];
const ws = new WeakSet(a);
// Uncaught TypeError: Invalid value used in weak set
```
上面代码，a数组的成员不是对象，所以加入 WeakSet 会报错。
:::

WeakSet有三个方法：
* WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。
* WeakSet.prototype.delete(value)：返回一个布尔值，表示是否清除成功，用于清除WeakSet实例的指定成员。
* WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在WeakSet的实例中。


``` js
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window);   // true
ws.has(foo);    // false

ws.delete(window);    // true
ws.has(window);   // false
```

由于WeakSet没有`size`属性，所以没有办法遍历它的成员。这是因为成员都是弱引用，随时都可能消失。遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。

::: tip 总结：
WeakSet的缺点：
1. add(value)方法，传入的value参数不能是非对象的类型；
2. 没有size属性，所以没有办法遍历它的成员（不可迭代）；
3. 没有forEach遍历方法
:::

## Map

### 含义和基本用法

JavaScript的对象，本质上是键值对的集合，但是传统上只能用字符串当键名。这给它的使用带来了很大的限制。

``` js
const obj = {};
const divEle = document.getElementById("myDiv");

obj[divEle] = "metadata";
obj['[object HTMLDivElement]'];   // "metadata"
```

上面代码，原意是将一个DOM节点作为对象`obj`的键，但是由于对象只能接受字符串作为键名，所以`divEle`被转化为字符串`[object HTMLDivElement]`。

为了解决这个问题，ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不再局限于字符串，是各种类型的值都可当做键。也就是说，Object结构提供了“字符串-值”的对应，Map结构提供了“值-值”的对应，这是一种更加完善的Hash结构的实现。

``` js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content');
m.get(o);   // 'content'

m.has(o);   // true
m.delete(o);    // true
m.has(o);   // false
```

上面代码使用Map结构的`set`方法，将对象`o`当做`m`的一个键，然后使用`get`方法读取这个键，接着使用`delete`方法删除这个键。

上例展示了如何向Map添加成员。作为构造函数，Map也可以接受一个数组作为参数，该数组的成员是一个表示键值对的数组。

``` js
const map = new Map([
  ['name', 'kobe'],
  ['age', 18]
]);

map.size    // 2
map.has('name');    // true
map.get('name');    // 'kobe'
map.has('age');   // true
map.get('age');   // 18
```

事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当做`Map`构造函数的参数。这就是说，`Set`和`Map`都可以用来生成新的 Map。

``` js
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.map('foo');    // 1


const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz');    // 3
```

上面代码中，我们分别使用 Set对象 和 Map对象，当做`Map`构造函数的参数，结果都生成了新的 Map 对象。

如果对同一个键多次赋值，后面的值将覆盖前面的值。下例中对键`1`连续赋值了两次后一次的值覆盖了前一次的值。

``` js
const map = new Map();

map.set(1, 'aaa').map.set(1, 'bbb');

map.get(1);   // 'bbb'
```

如果读取一个未知的值，则返回`undefined`。
``` js
new Map().set('aassdd');
// undefined
```

::: danger 注意
只有对同一个对象的引用，Map结构才将视为同一个键。

``` js
const map = new Map();

map.set(['a'], 111);
map.get(['a']);   // undefined

上面代码的set和get方法，表面上针对的是同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。
```
:::

同样的值的两个实例，在 Map 结构中被视为是两个键。下例中，k1和k2是两个相同的值，但在它们的Map结构中是两个不同的键。

``` js
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map.set(k1, 111);
map.set(k2, 222);

map.get(k1);    // 111
map.get(k2);    // 222
```

由上可知，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为是两个键。这就解决同名属性碰撞的问题。当我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

如果Map的键是一个简单数据类型的值（数字、字符串、布尔值），则只要两个值严格相等Map就视为是同一个键，例如：`+0`和`-0`就是同一个键，布尔值`true`和字符串`true`则是两个不同的键。另外，`undefined`和`null`也是不同的两个键。虽然`NaN`不严格相等于自身，但Map将视为是同一个键。

``` js
let map = new Map();

map.set(-0, 123);
map.get(+0);    // 123

map.set(true, 1);
map.set("true", 2);
map.get(true);    // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined);   // 3

map.set(NaN, 5);
map.get(NaN);   // 5
```

### 实例的属性和操作方法

Map结构的实例有以下属性和操作方法。

1. size属性
`size`属性返回Map结构的成员总数。
``` js
const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size    // 2
```

2. Map.prototype.set(key, value)
`set`方法设置键名`key`对应的键值为`value`，然会返回整个`Map`结构。如果`key`已经有值了，则键值会被更新，否则就新生成该键。

``` js
const m = new Map();

m.set('edition', 6);    // 键是字符串
m.set(262, 'standard');   // 键是数值
m.set(undefined, 'nah');    // 键是undefined
```

3. Map.prototype.get(key)
`get`方法读取`key`对应的键值。如果找不到`key`，返回`undefined`。

``` js
const m = new Map();

const hello = function() {console.log('hello')};
m.set(hello, 'Hello ES6');    // 键是函数

m.get(hello);   // 'Hello ES6'
```

4. Map.prototype.has(key)
`has`方法返回一个布尔值。表示某个键是否在当前Map对象之中。

``` js
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition');   // true
m.has('years');     // false
m.has(262);         // true
m.has(undefined);   // true
```

5. Map.prototype.delete(key)
`delete`方法删除某个键，如果删除成功返回true，否则返回false。

```js
const m = new Map();

m.set(undefined, 'NaN');
m.has(undeined);    // truee

m.delete(undefined);    // true
m.has(undefined);   // false
```

6.Map.prototype.clear()
`clear`方法清除所有成员，没有返回值。

``` js
let m = new Map();

m.set('foo', true);
m.set('bar', false);

m.size    // 2
m.clear();
m.size    // 0
```

### 遍历方法

Map 结构原生提供了三个遍历器生成函数和遍历方法。
* Map.prototype.keys()：返回键名的遍历器
* Map.prototype.values()：返回键值的遍历器
* Map.prototype.entries()：返回所有成员的遍历器
* Map.prototype.forEach()：遍历Map的所有成员

::: danger 注意
Map的遍历顺序就是插入顺序。
:::

``` js
const map = new Map([
  ['F', 'no'],
  ['T', 'yes']
]);

for(let key of map.keys()) {
  console.log(key);
}
// 'F'
// 'T'

for(let value of map.values()) {
  console.log(value);
}
// 'no'
// 'yes'

for(let [key, value] of map.entries()) {
  console.log(key, item);
}
// "F", "no"
// "T", "yes"

// 等同于使用map.entries()
for(let [key, value] of map) {
  console.log(key, value);
}
// "F", "no"
// "T", "yes"
```

上面代码最后的例子，表示Map结构的默认遍历器接口（`Symbol.iterator`属性），就是`entries`方法。

``` js
map[Symbol.iterator] = map.entries
// true
```

Map结构转为数组结构，比较快速的方式是使用扩展运算符（`...`）。

``` js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
]);

[...map.keys()];
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1, 'one'], [2, 'two'], [3, 'three']]

[..map]
// [[1, 'one'], [2, 'two'], [3, 'three']]
```

结合数组的`map`方法、`filter`方法，可以实现 Map 的遍历和过滤（Map本身没有`map`和`filter`方法）。

``` js
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([key, value]) => key < 3)
);
// Map(2) {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([key, value]) => [key * 2, '_' + value])
);
// Map(3) {2 => '_a', 4 => '_b', 6 => '_c'}
```

此外，Map还有一个`forEach`方法。与数组的`forEach`方法类似，也可以实现遍历。

``` js
const map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

// Key: 1, Value: a
// Key: 2, Value: b
// Key: 3, Value: c
```

`forEach`方法还可以接受第二个参数，用来绑定`this`。下例代码，`forEach`方法回调函数的this，就指向`reporter`。

``` js
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
```


## WeakMap

### 含义

`WeakMap`结构与`Map`结构类似，也是生成键值对的集合。

``` js
// WeakMap可以使用set方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};

wm1.set(key, 2);
wm1.get(key);   // 2

// WeakMap也可以接受一个数组，作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([k1, 'foo'], [k2, 'bar']);

wm2.get(k1);    // 'foo'
wm2.get(k2);    // 'bar'
```

但`WeakMap`与`Map`的区别有两点。
* `WeakMap`只接受对象作为键名（null除外），不接受其他类型的值作为键名。

``` js
const wm = new WeakMap();

wm.set(1, 2);
// Uncaught TypeError: Invalid value used as weak map key
wm.set(Symbol(), 2);
// Uncaught TypeError: Invalid value used as weak map key
wm.set(null, 2);
// Uncaught TypeError: Invalid value used as weak map key
```

* `WeakMap`的键名所指向的对象，不计入垃圾回收机制。

有时我们想在一个对象上面存放一些数据，但是这会形成对于这个对象的引用。

``` js
const e1 = document.getElementById("foo");
const e2 = document.getElementById("bar");

const arr = [
  [el, 'foo元素'],
  [e2, 'bar元素'],
]
```

上面代码，`e1`和`e2`是两个对象，我们通过`arr`数组对这两个对象添加一些文字说明。这就形成了`arr`对`e1`和`e2`的引用。

一旦不需要这两个对象，我们必须手动删除这个引用，否则垃圾回收机制就不会释放`e1`和`e2`占用的内存。一旦忘了写就会造成内存泄漏。

``` js
// 不需要e1和e2的时候，必须手动删除引用
arr[0] = null;
arr[1] = null;
```

WeakMap就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不会将该引用考虑在内。一旦不需要，WeakMap里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

如果你想要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用WeakMap。一个典型的应用场景是，在网页的DOM元素上添加数据，就可以使用`WeakMap`结构。当该DOM元素删除时，其所对选哪个的`WeakMap`记录就会自动被删除。

``` js
const wm = new WeakMap();
const divEle = document.getElementById("example");

wm.set(divEle, 'some information');
wm.get(divEle);   // 'some information'
```

::: tip 使用场景
`WeakMap`使用的专门场景是，它的键所对应的对象，可能会在将来消失。`WeakMap`结构有助于防止内存泄漏。
:::

::: danger 注意
WeakMap弱引用的只是键名，而不是键值。键值依然是正常引用。
``` js
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key);    // Object {foo: 1}
```

上面代码中，键值`obj`是正常引用。所以，即使在WeakMap外部消除了`obj`的引用，WeakMap内部的引用依然存在。
:::

### WeakMap的语法

WeakMap与Map在API上主要有两个区别：
* 没有遍历操作（即没有`key()`、`values()`、`entries()`方法），也没有`size`属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。

* 无法清空，既不支持`clear`方法。

所以，WeakMap只有四个方法：`set()`、`get()`、`has()`、`delete()`。