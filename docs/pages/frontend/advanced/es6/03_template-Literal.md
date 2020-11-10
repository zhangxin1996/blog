# 模板字符串

ES6引入新的声明字符串的方式即模板字符串。

## 模板字符串的使用

模板字符串使用tab键上面的反引号``，插入变量时使用${变量名}。

``` javascript
const name = "kobe";
const str = `你好${name}`;
```

## 使用场景

1. 内容中可以直接出现换行符

  ```javascript
  let movies = `<ul>
                <li>《花木兰》</li>
                  <li>《姜子牙》</li>
                  <li>《我和我的家乡》</li>
                </ul>`;
  
  console.log(movies);
  ```
  <img class="medium" :src="$withBase('/frontend/advanced/es6/03_模板字符串/image-20201028200736399.png')" alt="内容中可以添加换行符">
  
2. 变量拼接

  ```javascript
  const country = "中国";
  const message = `我爱你${country}`;
  
  console.log(message);
  ```

  <img class="medium" :src="$withBase('/frontend/advanced/es6/03_模板字符串/image-20201028200809026.png')" alt="变量拼接">