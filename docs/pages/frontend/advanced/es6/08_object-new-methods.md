# 对象的新增方法

## Object.is()

在ES5中，比较两个值是否相等有两个运算符：相等运算符（==）和全等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。

JavaScript缺少一种运算，在所有环境中，只要两个值是一样的，他们就应该相等。在ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。

``` js
Object.is('foo', 'foo');    // true

Object.is({}, {});    // false
```

`Object.is`用来比较两个值是否严格性等，与严格相等运算符（===）的行为基本一致。但是有两处不同：一是`+0`不等于`-0`，二是`NaN`等于自身。

``` js
+0 === -0   // true
NaN === NaN   // false

Object.is(+0, -0);    // false
Object.is(NaN, NaN);    // true
```

## Object.assign()

### 基本使用
`Object.assign()`方法用于对象的合并，将源对象的所有可枚举属性，复制到目标对象。

``` js
const target = {a: 1};

const source1 = {b: 2};
const source2 = {c: 3};

Object.assign(target, source1, source2);
target    // {a: 1, b: 2, c: 3}
```

`Object.assign()`方法的第一个参数是目标对象，后面的参数是源对象。返回值是合并之后的新对象。

::: danger 注意：
如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
``` js
const target = {a: 1, b: 1};

const source1 = {b: 2, c: 2};
const source2 = {c: 3};

Object.assign(target, source1, source2);
target    // {a: 1, b: 2, c: 3}
```
:::

如果只有一个参数，`Object.assign()`会直接返回该参数。

``` js
const obj = {a: 1};
Object.assign(obj) === obj;   // true
```

如果这个参数不是一个对象，则会先转化为对象，然后返回。

``` js
typeof Object.assign(1);   // "object"
```

由于`undefined`和`null`无法转化为对象，所以如果他们作为参数，就会报错。

``` js
Object.assign(undefined);   // 报错
Object.assign(null);    // 报错
```

对于非对象参数出现在源对象的位置（即非首参数），处理规则也有所不同。首先这些参数都会转化为对象，如果无法转化就会跳过。这意味着，如果`undefined`和`null`不在首位置，就不会报错。

``` js
const obj = {a: 1};
Object.assign(obj, undefiend) === obj;    // true
Object.assign(obj, null) === obj;   // true
```

要是其他类型的值（即字符串、数值、布尔值）不在首位置，也不会报错。但是，除了字符串会以数组形式，拷贝到目标对象，其他值都不会产生此效果。

``` js
const v1 = "abc";
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
obj   // {0: "a", 1: "b", 2: "c"}
```

这是因为只有字符串的包装对象，会产生可枚举属性，所以那些属性会被拷贝。

属性名为Symbol值的属性名，也会被`Object.assign`拷贝。

``` js
Object.assign({a: 'b'}, {[Symbol('c')]: 'd'});
// {a: 'b', [Sybol(c)]: 'd'}
```

### 注意点

1. 浅拷贝

`Object.assign()`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

``` js
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b    // 2
```

上面代码，源对象obj1的a属性的值是一个对象，`Object.assign()`拷贝得到的是这个对象的引用。这个对象的任何变化，到会反映到目标对象上面。

2. 同名属性的替换
对于这种嵌套的对象，一旦遇到同名属性，`Object.assign()`的处理方式是替换，而不是添加。

``` js
const target = {a: {b: 'c', d: 'e'}};
const source = {a: {b: 'hello'}};

Object.assign(target, source);
// {a: {b: 'hello'}}
```

上面代码，target对象的a属性被source对象的a属性整个替换掉了，而不会得到`{a: {b: 'hello', d: 'e'}}`的结果，这里点需要特别小心。

3. 数组的处理
`Object.assign()`也可以处理数组，只不过会把数组视为对象。

``` js
Object.assign([1, 2, 3], [4, 5]);
// [4, 5, 3]
```

上面代码，`Object.assign()`把数组视为属性名为0、1、2的对象，因此源数组的0号属性`4`会覆盖目标数组的`0`号属性`1`。

4. 取值函数的处理

`Object.assign()`只能进行值得复制，如果要复制的值是一个取值函数，那么将求值后再复制。

``` js
const source = {
  get foo() { return 1 };
};
const target = {};

Object.assign(target, source);
// {foo: 1}
```

上面代码，`source`对象的`foo`属性是一个取值函数，`Object.assign()`不会复制这个取值函数，只会拿到这个值之后，将这个值复制过去。