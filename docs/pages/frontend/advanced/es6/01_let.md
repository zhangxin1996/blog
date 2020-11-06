# let的使用

## let的作用

let用于定义变量。

## let声明变量的格式

``` javascript
// 声明但无初始值
let a;
let b;

// 声明且有初始值
let c = 200;
let d = "Hello World";

// 批量的声明并赋初始值
let e = 520, g = "i love you", h = [];
```

## let声明变量的特性

1. 变量不能重复声明

   ``` javascript
   let name = "kobe";
   let name = "james";
   ```

   <img class="medium" :src="$withBase('/frontend/advanced/es6/01_let的使用/image-20201028105617132.png')" alt="变量不能重复声明">

2. 具有块级作用域

   意思是：变量只在代码块中有效，出代码块外无效。

   ``` javascript
   {
     let age = 20;
   }
   
   console.log(age);
   ```

   <img class="medium" :src="$withBase('/frontend/advanced/es6/01_let的使用/image-20201028110637504.png')" alt="块级作用域">
   

   使用场景有：`if`、`if...else`、`while`、`for`，这些都有代码块。

3. 不存在变量提升

   意思是：不允许变量声明之前去使用这个变量。

   ``` javascript
   console.log(height);
   
   let height = 1.88;
   ```

   <img class="medium" :src="$withBase('/frontend/advanced/es6/01_let的使用/image-20201028112555115.png')" alt="不存在变量提升">

4. 不影响作用域链

   块级作用域内有一函数调用时，在函数作用域内部没有找到该name变量，即向上一作用域查找该name变量。虽说是块级作用域但不影响作用域链的效果。

   ```javascript
   {
     let name = "kobe";
   
     function foo() {
       console.log(name);
     }
   
     foo();
   }
   ```

   输出：

   ```
   kebe
   ```

## 使用场景

1. for循环是个经典例子

   ```javascript
   const arr = [];
   
   // var定义变量
   for (var i = 0; i < 10; i++) {
     arr[i] = function() {
       return i;
     }
   }
   console.log(arr[5]());		// 10
   
   // let定义变量
   for (let i = 0; i < 10; i++) {
     arr[i] = function() {
       return i;
     }
   }
   console.log(arr[5]());		// 5
   ```

2. 不会污染全局变量

   ```javascript
   let RegExp = 10;
   
   console.log(RegExp);		// 10
   console.log(window.RegExp);		// ƒ RegExp() { [native code] }
   ```

## 案例练习

1. 点击切换颜色

实现效果：
<img class="medium" :src="$withBase('/frontend/advanced/es6/01_let的使用/image-20201028132302692.png')" alt="实现效果">

实现代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>02_let的实践案例</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);  
      width: 400px;
      height: 300px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
    }
    .content .item {
      width: 100px;
      height: 50px;
      border: 1px solid blue;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>点击切换颜色</h2>
    <div class="content">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>

  <script>
    // 获取div元素对象
    var itemList = document.getElementsByClassName("item");

    // 遍历并绑定事件
    for(let i = 0; i < itemList.length; i++) {
      itemList[i].addEventListener("click", function(){
        // 排他思想 
        for(let j = 0; j < itemList.length; j++) {
          itemList[j].style.backgroundColor = "#fff";
        }

        // 修改元素的背景颜色
        itemList[i].style.backgroundColor = "yellow"
      });
    }
  </script>
</body>
</html>
```

   