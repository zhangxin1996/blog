# Symbol

## 概述

ES5中对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法，新方法的名字就有可能与现有方法产生冲突。如果有一种机制，来保证每个属性的名字都是独一无二的，这样就从根本上防止了属性名的冲突。这就是ES6提供的`Symbol`的原因。

ES6引用了一种新的原始数据类型`Symbol`，表示独一无二的值。它是JavaScript语言的第七中数据类型，前六种是：字符串(String)、数字(Number)、布尔值(Boolean)、对象(Object)、undefiend、null。

Symbol值通过`Symbol`函数生成。这就是说，对象的属性名现在有两种类型，一种是字符串，另一种是新增的Symbol类型。凡是属性名属于Symbol类型那都是独一无二的，可以保证不与其他属性名产生冲突。

```js 
let s = Symbol();
typeof s;
// Symbol
```

::: danger 注意
`Symbol`函数前不能使用`new`命令，否则会报错。这是因为生成的`Symbol`是一个原始类型的值，而不是对象。
:::

`Symbol`函数可以接受一个字符串作为参数，表示对`Symbol`实例的描述。这样做主要是为了在控制台显示，或者转为字符串，比较容易区分。

``` js
let s1 = Symbol("foo");
let s2 = Symbol("bar");

s1    // Symbol(foo)
s1    // Symbol(bar)

s1.toString();    // "Symbol(foo)"
s2.toString();    // "Symbol(bar)"
```

上面代码，`s1`和`s2`是两个Symbol值。如果不加参数，它们在控制台的输出都是`Symbol()`，不利于区分。有了参数之后，就等于给它们加上了描述，输出的时候就能够区分到底是哪个值。

如果Symbol的参数是一个对象，就会调用该对象的`toString()`方法，将其转化为字符串，然后才生成Symbol值。

``` js
const obj = {
  toString() {
    return "abc";
  }
}

const sym = Symbol(obj);
sym   // Symbol(abc)
```

::: danger 注意一
`Symbol`函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。

``` js
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2;    // false

//有参数的情况
let s1 = Symbol("foo");
let s2 = Symbol("foo");

s1 === s2;    // false
```
:::

::: danger 注意二
Symbol值不能与其他类型值进行运算，会报错。

``` js
let sym = Symbol("My symbol");

"your symbol is " + sym    
// TypeError: Cannot convert a Symbol value to a string
`your symbol is ${sym}`
// TypeError: 
// TypeError: Cannot convert a Symbol value to a string
```
:::

::: danger 注意三
1. Symbol值会显式转换为字符串；
``` js
let sym = Symbol("My symbol");

String(sym);    // Symbol(My symbol)
sym.toString();   // Symbol(My symbol)
```

2. Symbol值也可以转化为布尔值
``` js
let sym = Symbol("My symbol");

Boolean(sym);   // true
```

3. Symbol值不能转化为数值。
``` js
let sym = Symbol("My symbol");

Number(sym);
// Cannot convert a Symbol value to a number
```
:::

## Symbol的用途

由于Symbol值都是不相等的，这意味着Symbol值可以作为标识符，来用于对象的属性名，这样就保证了不会出现同名的属性名。

``` js
const name = Symbol("name");
const age = Symbol("age");

let obj = {
  [name]: "lilei",
  [age]: 18
};
```

上面代码通过方括号结构，将对象的属性名指定为一个Symbol值。如果不放到方括号内，该属性的键名就是一个字符串，而不是Symbol值。

当使用Symbol值作为对象的属性名时，取值时使用`对象名[变量名]`的方式。

``` js
console.log(obj.name);   // undefined
console.log(obj[name]);   // lilei
```

### 属性名的遍历

Symbol作为属性名，遍历对象的时候，该属性名不会出现在`for...in`、`for...of`循环中，也不会被`object.keys()`、`object.getOwnPropertyNames()`、`JSON.stringify()`返回。

可以使用`Object.getOwnPropertySymbols()`方法，获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

``` js
const obj = {};
const a = Symbol("a");
const b = Symbol("b");

obj[a] = 'hello';
obj[b] = 'world';

const objectSymbols = Object.getOwnPropertySymbols(obj);
obj   // [Symbol(a), Symbol(b)]
```

`for...in`和`Object.keys`方法都得不到Symbol键名。

``` js
const name = Symbol("name");
const age = Symbol("age");

let obj = {
  [name]: "lilei",
  [age]: 18
};

for(keys in obj) {
  console.log(keys);    // 没有输出
}

console.log(Object.keys(obj));    // 输出的是空数组：[]
```

`Reflect.ownKeys()`方法可以返回所有类型的键名，包括常规键名和Symbol键名。

``` js
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj);
// [Symbol(my_key), "enum", "nonEnum"]
```

### Symbol.for()和Symbol.keyFor()

有时我们希望重新使用同一个Symbol值，`Symbol.for()`方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有该参数作为名称的Symbol值。如果有就返回这个Symbol值，否则就新建一个该字符串为名称的Symbol值，并将其注册到全局。

``` js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

上面代码中，`s1`和`s2`都是Symbol值，但是他们都是由同样参数的`Symbol.for()`方法生成的，所以实际上是同一个值。

`Symbol.for()`与`Symbol()`这两种方法，都会生成新的Symbol值。它们的区别是：前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用都返回一个新的Symbol类型的值，而是先检查给定的`key`是否已经存在，如果不存在才会新建一个值。

``` js
Symbol.key("bar") === Symbol.for("bar");
// true

Symbol("bar") === Symbol("bar");
// false
```

上面代码中，由于`Symbol()`写法没有登记机制，所以每次调用都会返回一个新的值。

`Symbol.keyFor()`方法返回一个已经登记的Symbol类型值的`key`。

``` js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1);    // "foo"

let s2 = Symbol("bar");
Symbol.keyFor(s2);    // undefiend
```

上面代码中，变量`s2`是未登记的Symbol值，所以返回undefined。

::: danger 注意
Symbol.for()为Symbol值登记的名字，是全局环境的，不管有没有在全局环境运行。

``` js
function foo() {
  return Symbol.for("bar");
}

const x = foo();
const y = Symbol.for("bar");

console.log(x == y)    // true
```

上面代码中，`Symbol.for("bar")`是函数内部运行的，但是生成的Symbol值是登记在全局环境的。所以，第二次运行`Symbol.for("bar")`可以取到这个Symbol值。
:::