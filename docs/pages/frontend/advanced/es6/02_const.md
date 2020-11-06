# const的使用

## const的作用

const用于声明常量，何为常量即为值不可修改的量。

## const声明格式

```javascript
const PI = 3.14;
```

## const声明常量的特性

1. 一定要赋初始值

   ```javascript
   const A;
   ```

   <img class="medium" :src="$withBase('/frontend/advanced/es6/02_const的使用/image-20201028173625680.png')" alt="一定要赋初始值">

2. 一般常量使用大写（潜规则的）

   ```javascript
   const NAME = "kebe";
   ```

3. 常量一旦被声明，无法修改

   ```javascript
   const NAME = "kobe";
   NAME = "james";
   ```

   <img class="medium" :src="$withBase('/frontend/advanced/es6/02_const的使用/image-20201028174503516.png')" alt="常量的值不能修改">

4. 具有块级作用域

   ```javascript
   {
     const NAME = "kobe";
   }
   console.log(NAME);
   ```

   <img class="medium" :src="$withBase('/frontend/advanced/es6/02_const的使用/image-20201028174724156.png')" alt="具有块级作用域">

5. 对于数组和对象中的元素进行修改，不算对常量进行修改，不会报错 

   原因是：常量所指向的引用类型的地址并没有发生变化；

   ```javascript
   const NAMES = ["kebe", "james", "lilei"];
   NAMES.push("coderz");
   console.log(NAMES);
   
   const STUDENTS = {
     name: "coderz",
     age: 18,
     height: 1.88
   }
   STUDENTS.name = "lucy";
   console.log(STUDENTS);
   ```
   <img class="medium" :src="$withBase('/frontend/advanced/es6/02_const的使用/image-20201028175716060.png')" alt="引用类型修改元素">



建议：在默认情况下使用const，除非你知道变量值需要被修改的情况下使用let。