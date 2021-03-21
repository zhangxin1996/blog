## axios
### 什么是axios

Axios是一个基于 promise 的HTTP库，可以用在浏览器和node.js中。

axios有以下特性：
* 从浏览器中创建 XMLHttpRequests
* 从 node.js 创建 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转化请求数据和响应数据
* 取消请求
* 自动转化 JSON 数据
* 客户端支持防御 XSRF

### axios的安装

* 使用npm
```
npm install axios --save
```

* 使用cdn
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 请求方式及其请求方式的别名

``` js
// 请求方式
axios(config);
axios(url, config);

// 请求方式的别名
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

1. 使用axios(config)和axios(url, config)

* get请求（get请求是默认方式）
``` js
import axios from "axios"

axios({
  url: '/user?ID=12345'
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})

// 或者

axios({
  url: '/user',
  // 专门针对get请求的参数拼接
  params: {
    ID: '12345'
  }
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```

* post请求

``` js
import axios from "axios"

axios({
  method: 'post',
  url: '/user',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```

2. 使用axios.get()发送get请求

``` js
import axios from "axios"

axios.get('/user', {
  params: {
    ID: '12345'
  }
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```

3. 使用axios.post()发送post请求

``` js
import axios from "axios"

axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```

::: danger 注意
在使用别名方法时， url、method、data 这些属性都不必在配置中指定。
:::


## 发送并发请求

有时我们可能同时发送多个请求，这时可使用`axios.all(iterable)`将多个请求放到数组中，返回的结果是一个数组。

使用`axios.spread(callback)`可以将返回的数组[res1, res2]展开为res1、res2。

``` js
import axios from "axios"

axios.all([
  axios({
    url: 'http://123.207.32.32:8000/home/multidata'
  }),
  axios({
    url: 'http://123.207.32.32:8000/home/data',
    params: {
      type: 'pop',
      page: 1
    }
  })
]).then(axios.spread((res1, res2) => {
  console.log(res1);
  console.log(res2);
})).catch(err => {
  console.log(err);
})
```

## 全局axios默认配置

事实上在开发过程中，有很多参数是固定的，这时我们就可以做一些抽离，利用axios的全局默认配置。

``` js
import axios from "axios"

// 提取全局的配置
axios.defaults.baseURL = "http://123.207.32.32:8000";
axios.defaults.timeout = 5000;

axios.all([axios({
  url: '/home/multidata'
}),axios({
  url: '/home/data',
  params: {
    type: 'pop',
    page: 1
  }
})]).then(axios.spread((res1, res2) => {
  console.log(res1);
  console.log(res2);
})).catch(err => {
  console.log(err);
})
```

## 创建axios实例

当我们从axios模块中导入对象时，使用的实例是默认的axios实例。给该实例设置一些默认配置，这些配置就被固定下来了。

但后续开发中，某些配置可能会不太一样，比如：请求需要特定的baseURL或者timeout或者content-Type等。这时就可以创建新的axios实例，并且传入属于该实例的配置信息。

``` js
import axios from "axios"

const instance = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 5000
});

instance({
  url: "/home/multidata"
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```

## 请求拦截和响应拦截

``` js
import axios from "axios"
import { getTokenByStore } from "@/common/TokenStore";

// 创建自定义的axios对象
const instance = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 3000
});

// 添加请求拦截
instance.interceptors.request.use(config => {
  // 请求拦截处理
  console.log('请求拦截', config);

  // 添加一个请求头Authorization
  const token = getTokenByStore();
  if (token) {
    config.headers.common["Authorization"] = `Bear ${token}`;
  }

  return config; // 请求继承发送给服务端
}, err => {
  // 请求拦截错误处理
  return Promise.reject(err);
})

// 添加响应拦截
instence.interceptors.response.use(response => {
  // 响应拦截处理
  console.log('响应拦截 ', response);
  return response.data;
}, err => {
  const err = error.toString();
  console.log('响应错误拦截>>>', err);
  switch (true) {
    case err.indexOf('Network') !== -1:
      alert('资源找不到或网络出错，请检查url地址');
      break;
    case err.indexOf('timeout') !== -1:
      alert('连接超时!请查检ip或域名');
      break;
  }
  return Promise.reject(error);
})
```

请求拦截器作用：
* config中的一些信息不符合服务器的要求，比如请求头不符合在发送请求之前添加；
* 当网络请求时，在页面中加一个loading组件，作为动画；发送请求之前将loading组件显示出来，响应成功后，在响应拦截再隐藏起来；
* 某些网络请求，必须携带一些特殊的信息，比如：每一次请求去判断是否有token，如果token存在则在请求头加上这个token。后台会判断我这个token是否过期，如果token不存在，给用户一些错误提示让他登录，登录后携带上token，再去服务器发送对应请求;

响应拦截器作用：
* 响应的成功拦截中，主要是对数据进行过滤
* 响应的失败拦截中，可以根据status判断报错的错误码，跳转到不同的错误提示页面;


## axios的封装

将第三方axios插件进行封装，之后发送网络请求依赖我们封装的文件即可。这样做的好处是：当某天axios不再维护时，只有我们封装的文件是依赖它的，对后续的代码维护也是很方便的。

在src目录中，创建一个新的文件夹叫network，在该文件夹中创建request.js文件，用于配制axios实例，具体的配置如下：

``` js
// request.js
export function request1(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2. 请求拦截和响应拦截
  instance.interceptors.request.use(config => {
    console.log(config);

    return config;
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(response => {
    console.log(response);

    return response.data;
  }, err => {
    console.log(err);
  })

  // 发送真正的网络请求
  return instance(config)
}
```

在需要发送网络请求的使用request1。
``` vue
<!-- App.vue -->

<template>
  <div>
  </div>
</template>

<script>
  import {request1} from './network/request'

  export default {
    name: 'App',
    created() {
      // 在需要发送网络请求的使用request1。
      request1({
        url: '/home/multidata'
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
<style>
```