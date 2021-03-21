
## Promise的介绍

Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

## Promise的作用

常见的使用场景就是网络请求。当我们封装一个网络请求的函数，不可能立即就拿到结果，需要传入另外一个函数，用于请求成功时把数据通过此函数回调出去。如果是简单的网络请求，这种方法就可以。

但是如果网络请求复杂时，一层嵌套着一层，出现回调地狱的问题，虽说上面的方式也可以解决，但代码难看且不利于后期维护，使用Promise就能解决此问题。

## Promise的基本使用

先通过`console.dir(Promise)`来打印出来看看：

<img class="medium" :src="$withBase('/frontend/frame/vue/18_promise/01_打印Promise.png')" alt="打印Promise">

这么一看就很清楚了，Promise是构造函数，自己身上有`all`、`resolve`、`reject`这些方法，其原型上有`then`和`catch`方法。

我们通过`new Promise`的方式来玩玩：
1. 通过new实例化一个Promise对象，Promise的构造函数接受一个函数作为参数，该函数用于处理异步任务；
2. 该函数传递两个参数：resolve和reject，它们是两个函数。
  * `resolve`函数的作用：将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 fulfilled）。在异步操作成功时调用，并将异步操作的结果作为参数传递出去。
  * `reject`函数的作用：将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected）。在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
3. 之后通过`.then()`处理成功回调和`.catch()`处理错误回调。

``` js
new Promise((resolve, reject) => {
  // 这里做异步任务（暂时用setTimeout代替）
  setTimeout(() => {
    const data = {retCode: 0, msg: "你好啊"};

    if(data.retCode === 0) {
      // 请求成功时调用resolve
      resolve(data);
    } else {
      // 请求失败时调用reject
      reject({retCode: 1, msg: 'network error'});
    }
  }, 1000);
}).then(res => {
  // res获取正常结果
  console.log(res);
}).catch(err => {
  // err获取异常结果
  console.log(err);
});

// 结果：{retCode: 0, msg: "你好啊"}
```

上面代码，当请求数据中`data.retCode`值的不同，可能调用resolve也可能调用reject，看具体的业务决定。


## Promise对象的三种状态

<img class="medium" :src="$withBase('/frontend/frame/vue/18_promise/02_Promise三种状态.png')" alt="Promise三种状态">

* pending：等待状态，例如：正在进行网络请求；
* fulfilled：满足状态，当请求成功会主动调用resolve，并且会回调`.then()`；
* rejected：拒绝状态，当请求失败会主动调用reject，并且会调用`.catch()`；

异步操作包裹在Promise中，Promise对象就代表异步操作，有三种状态：pending（等待中）、fulfilled（已成功）、rejected（已失败），只有异步操作的结果可以决定当前是哪种状态，任何操作都无法改变这个状态。

Promise对象的状态改变，只有两种可能：从pending变为fulfilled或从pending变为rejected，只有这两种情况发生，状态就凝固了，不会再改变，会一直保持这种结果。


## Promise 处理多次Ajax请求（链式调用）
在实际开发中，我们经常需要同时请求多个接口。例如：在请求完接口1的数据data1之后，需要根据data1的数据继续请求接口2，来获取data2数据；然后根据data2的数据，继续请求接口3。

这种场景其实就是接口的多层嵌套调用。有了Promise后，我们可以把多层嵌套调用按照链式的方式进行书写，非常优雅。

代码展示：

``` js
// 封装的网络请求代码
function queryData(data) {
  const promise = new Promise((resolve, reject) => {
    const xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
      if(readyState !== 4) return;
      if(readyState === 4 && xml.status === 200) {
        // 成功处理
        resolve(xml.responseTest);    // xml.responseTest是从接口拿到的数据
      }else {
        // 失败处理
        reject("接口请求失败");
      }
    }

    xhr.responseType = 'json'; // 设置返回的数据类型
    xhr.open('get', url);
    xhr.send(null); // 请求接口
  })

  return promise;
}

// 发送多个ajax请求
queryData("网络请求1")
  .then(res1 => {
    console.log(JSON.stringify(res1));

    // 请求完接口1后，继续请求接口2
    return queryData("网络请求2" + res1);
  }, err1 => {
    console.log(err1);
  })
  .then(res2 => {
    console.log(JSON.stringify(res2));

    // 请求完接口2后，继续请求接口3
    return queryData("网络请求3" + res2);
  }, err2 => {
    console.log(err2);
  })
  .then(res3 => {
    console.log(JSON.stringify(res3));
  }, err3 => {
    console.log(err3);
  });
```

## return 的函数返回值

return 后面的返回值，有两种情况：

* 情况1：返回的是Promise实例对象，会调用下一个then；
* 情况2：返回的是普通值，会直接传递给下一个then，通过then方法参数中函数的参数接收该值。

我们针对上面的两种情况，详细解释一下。

情况1：返回Promise实例对象（同上面的例子代码）；
情况2：返回普通值；
``` js
// 封装的网络请求代码
function queryData(data) {
  const promise = new Promise((resolve, reject) => {
    const xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
      if(readyState !== 4) return;
      if(readyState === 4 && xml.status === 200) {
        // 成功处理
        resolve(xml.responseTest);    // xml.responseTest是从接口拿到的数据
      }else {
        // 失败处理
        reject("接口请求失败");
      }
    }

    xhr.responseType = 'json'; // 设置返回的数据类型
    xhr.open('get', url);
    xhr.send(null); // 请求接口
  })

  return promise;
}

// 发送多个ajax请求
queryData("网络请求1")
  .then(res1 => {
    console.log(JSON.stringify(res1));

    // 请求完接口1后，继续请求接口2
    return queryData("网络请求2" + res1);
  }, err1 => {
    console.log(err1);
  })
  .then(res2 => {
    console.log(JSON.stringify(res2));

    // 返回一个普通值
    // 会产生一个新的Promise实例，来调用这里的then，确保可以继续链式操作
    // return "111" 是 return Promise.resolve("111") 的简写 而它的简写又是 return new Promise(resolve => {})
    return "111";
  }, err2 => {
    console.log(err2);
  })
  .then(res3 => {
    // res3拿到的是普通值111
    console.log(res3);
  }, err3 => {
    console.log(err3);
  })
```

## Promise常用API

Promise 自带的API提供了如下实例方法：
* promise.then()：获取异步任务的正常结果。
* promise.catch()：获取异步任务的异常结果。
* promise.finaly()：异步任务无论成功与否，都会执行。

第一种方式和第二种方式，实现的效果是一样的：
第一种方式：
``` js
new Promise((resolve, reject) => {
  // 这里做异步任务（暂时用setTimeout代替）
  setTimeout(() => {
    const data = {retCode: 0, msg: "你好啊"};

    if(data.retCode === 0) {
      // 请求成功时调用resolve
      resolve(data);
    } else {
      // 请求失败时调用reject
      reject({retCode: -1, msg: 'network error'});
    }
  }, 1000);
}).then(res => {
  // res获取正常结果
  console.log(res);
}).catch(err => {
  // err获取异常结果
  console.log(err);
});
```

第二种方式：
``` js
new Promise((resolve, reject) => {
  // 这里做异步任务（暂时用setTimeout代替）
  setTimeout(() => {
    const data = {retCode: 0, msg: "你好啊"};

    if(data.retCode === 0) {
      // 请求成功时调用resolve
      resolve(data);
    } else {
      // 请求失败时调用reject
      reject({retCode: -1, msg: 'network error'});
    }
  }, 1000);
}).then(res => {
// res获取正常结果
console.log(res);
}, err => {
// err获取异常结果
console.log(err);
});
```

::: tip 提示
then()返回的是一个新的Promise实例（注意不是原来那个Promise实例）。为此可以采用链式调用，即then方法后面再调用另一个then方法。
then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的。
:::

Promise 自带的API提供了如下对象方法：
* Promise.all()：将多个Promise实例包裹的异步任务包装成一个新的Promise实例，并发处理所有任务，都执行成功时返回的是一个结果数组，失败时返回最先reject失败状态的值；

``` js
const p1 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve({name:'zhangsan',age:20,height:1.88})
  }, 1000);
});
const p2 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve({name:"kobe",age:19,height:1.87})
    // reject("error message")
  }, 3000);
});

Promise.all([p1, p2]).then(results => {
  console.log(results);
}).catch(err => {
  console.log(err);
});

/*
  3秒后打印：
  [
    {name: "zhangsan", age: 20, height: 1.88}, 
    {name: "kobe", age: 19, height: 1.87}
  ]
*/
```

作用：Promise.all在处理多个异步任务是非常有用，例如：一个页面上需要等两个或者多个ajax的数据回来以后才正常显示，在此之前只显示loading图标。

::: danger 注意
Promise.all获得成功结果的数组里面的数据顺序和Promise.all接受到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的要比p2要晚。
这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。
:::

* Promise.race()：将多个异步任务并发处理，只要有一个任务执行成功不管结果本身是成功状态还是失败状态，哪个结果获取的快就返回那个结果。

``` js
const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve("Hello VueJS");
  }, 1000)
});

const p2 = new Promise(reject => {
  setTimeout(() => {
    reject("error message");
  }, 500)
});

Promise.race([p1, p2]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```

