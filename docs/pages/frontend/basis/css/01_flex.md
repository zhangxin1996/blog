在之前的网页布局中，布局使用的是传统解决方案：基于盒子模型，依赖`display`属性 + `position`属性 + `float`属性。它对于那些特殊布局非常不方便，比如：垂直居中就不容易实现。

在2009年，W3C提出了一种新的方案——Flex布局，可以简单、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/01_浏览器支持flex情况.jpg')" alt="浏览器支持flex情况">


## flex布局是什么

flex是 `Flexible Box` 的缩写，意为“弹性布局”，用来为盒子模型提供最大的灵活性。

盒子设置了`display: flex`或者`display: inline-flex`属性可以成为`flex container`。
* flex：`flex container`以block-level形式存在；
* inline-flex：`flex container`以inline-level形式存在；

::: danger 注意
设为 flex 布局以后，子元素的float、clear和vertical-align属性将失效。
:::


## 基本概念

这里有两个重要的概念：
* 开启了flex布局的容器叫`flex container`；
* `flex container`里面的直接子元素叫做 `flex item`；

<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/02_flex布局模型.png')" alt="flex布局模型">

容器默认存在两根轴，水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`。交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列，单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。


## 容器的属性

以下6个属性设置在`flex container`上的CSS属性：
* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

### flex-direction

因为 flex-items 默认都是沿着 `main axis`（主轴）从 main start 往 main end 方向排布。

`flex-direction`属性决定了`main axis`的方向（有四个值）：
* row（默认值）：`main axis`为水平方向，`flex item`沿`main axis`从左向右排列
* row-reverse：`main axis`为水平方向，`flex item`沿`main axis`从从右向左排列，与`row`反向
* column：`main axis`为垂直方向，`flex item`沿`main axis`从上向下排列
* column-reverse：`main axis`为垂直方向，`flex item`沿`main axis`从下向上排列，与`column`反向

代码如下：

``` html
<div class="box">
  <div class="item item1">item1</div>
  <div class="item item2">item2</div>
  <div class="item item3">item3</div>
</div>
```

``` css
.box {
  width: 500px;
  height: 400px;
  background-color: orange;

  /* 开启flex布局 */
  display: flex;
  flex-direction: row / row-reverse / column / column-reverse;
}

.item {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-weight: bold;
}

.item1 {
  background-color: #f00;
}
.item2 {
  background-color: #0f0;
}
.item3 {
  background-color: #00f;
}
```

效果图：
<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/03_flex-direction.png')" alt="03_flex-direction">


### justify-content

默认`main axis`方向为 `row`。

`justify-content`属性决定`flex item`在`main axis`上的对齐方式（有六个值）：
* flex-start（默认值）：左对齐（与 main start 对齐）
* flex-end：右对齐（与 main end 对齐）
* center：居中对齐
* space-between：
  * `flex item`之间的间隔都相等；
  * 两端（与 main start、main end）对齐；
* space-around：
  * `flex item`之间的间隔都相等；
  * `flex item`与`main start`、`main end`之间的距离是`flex item`之间距离的一半，所以，`flex item`之间的间隔比`flex item`与边框的间隔要大一倍；
* space-evenly：
  * `flex item`之间的间隔都相等；
  * `flex-item`与`main start`、`main end`之间的距离等于`flex item`之间的距离；

代码如下：

``` html
<div class="box">
  <div class="item item1">item1</div>
  <div class="item item2">item2</div>
  <div class="item item3">item3</div>
</div>
```

``` css
.box {
  width: 500px;
  height: 400px;
  background-color: orange;
  
  /* 开启flex布局 */
  display: flex;
  justify-content: flex-start / flex-end / center / space-between / space-around / space-evenly;
}

.item {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-weight: bold;
}

.item1 {
  background-color: #f00;
}
.item2 {
  background-color: #0f0;
}
.item3 {
  background-color: #00f;
}
```

效果图：
<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/04_justify-content.png')" alt="04_justify-content">


### align-items

`align-items`决定了`flex item`在`cross axis`上的对齐方式（有六个值）：
* normal: 在弹性布局中，效果和 stretch 一样
* strech（默认值）: 当 `flex item` 在 `croll axis` 方向的 size 为 auto 时，会自动拉伸至填充 `flex container`
* flex-start: 与 cross start 对齐
* flex-end:  与 cross end 对齐
* center: 居中对齐
* baseline: 与文字底部基准线对齐（注意：基线只与第一行文本有关） 

normal 和 strech 效果一样，代码如下：

``` css
.box {
  width: 500px;
  height: 400px;
  background-color: orange;
  
  /* 开启flex布局 */
  display: flex;
  align-items: normal / strech;
}

.item {
  width: 100px;
  text-align: center;
  color: #fff;
  font-weight: bold;
}

.item1 {
  background-color: #f00;
  font-size: 30px;
}
.item2 {
  background-color: #0f0;
}
.item3 {
  background-color: #00f;
}
```

效果图：

<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/05_align-items属性值为normal或strech.png')" alt="05_align-items属性值为normal或strech">

其他属性值，代码如下：

``` css
.box {
  width: 500px;
  height: 400px;
  background-color: orange;
  
  /* 开启flex布局 */
  display: flex;
  align-items:  flex-start / flex-end / center / baseline;
}

.item {
  width: 100px;
  text-align: center;
  color: #fff;
  font-weight: bold;
}

.item1 {
  background-color: #f00;
  height: 100px;
  font-size: 30px;
}
.item2 {
  background-color: #0f0;
  height: 280px;
}
.item3 {
  background-color: #00f;
  height: 200px;
}
```

效果图：

<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/06_align-items属性值为其他值.png')" alt="06_align-items属性值为其他值">


### flex-wrap

flex-wrap（有三个值）: 
* nowrap（默认值）：不换行（单行）显示
* wrap：换行（多行）显示
* wrap-reverse：换行（多行）显示，在 croll axis 做反转（对比wrap，croll start 与 croll end 相反）

代码如下：

``` html
<div class="box">
  <div class="item item1">item1</div>
  <div class="item item2">item2</div>
  <div class="item item3">item3</div>
  <div class="item item1">item4</div>
  <div class="item item2">item5</div>
  <div class="item item3">item6</div>
  <div class="item item1">item7</div>
  <div class="item item2">item8</div>
  <div class="item item3">item9</div>
</div>
```

``` css
.box {
  width: 500px;
  height: 400px;
  background-color: orange;
  
  /* 开启flex布局 */
  display: flex;
  flex-wrap: nowrap / wrap / wrap-reverse;
}

.item {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-weight: bold;
}

.item1 {
  background-color: #f00;
}
.item2 {
  background-color: #0f0;
}
.item3 {
  background-color: #00f;
}
```

效果图：

<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/07_flex-wrap.png')" alt="07_flex-wrap">


### flex-flow

`flex-flow` 是 `flex-direction` || `flex-wrap` 的简写。默认为`row wrap`。

### align-content

align-content: 决定多行 `flex item` 在 `croll axis` 上的对齐方式，用法与 `justify-content` 相似（有七个值）：
* stretch（默认值）: 与 align-items 的 strech 类似
* flex-start: 与 `cross start` 对齐
* flex-end:  与 `cross end` 对齐
* center: 居中对齐
* space-between:
  * `flex item` 之间的距离相等
  * 与 `croll start`、`croll end` 两端对齐 
* space-around: 
  * `flex item` 之间的距离相等
  * `flex item` 与 `croll start`、`croll end` 之间的距离是 `flex item` 之间的距离的一半 
* space-evenly: 
  * `flex item` 之间的距离相等
  * `flex item` 与 `croll start`、`croll end` 之间的距离等于 `flex item` 之间的距离

代码如下：

``` html
<div class="box">
  <div class="item item1">item1</div>
  <div class="item item2">item2</div>
  <div class="item item3">item3</div>
  <div class="item item1">item4</div>
  <div class="item item2">item5</div>
  <div class="item item3">item6</div>
  <div class="item item1">item7</div>
  <div class="item item2">item8</div>
  <div class="item item3">item9</div>
</div>
```

``` css
.box {
  width: 500px;
  height: 400px;
  background-color: orange;
  
  /* 开启flex布局 */
  display: flex;

  flex-wrap: wrap;
  align-content: stretch / flex-start / flex-end / center / space-between / space-around / space-evenly;

}

.item {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-weight: bold;
}

.item1 {
  background-color: #f00;
}
.item2 {
  background-color: #0f0;
}
.item3 {
  background-color: #00f;
}
```

效果图：

<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/08_align-content.png')" alt="08_align-content">


## 项目的属性

### order

order 属性 决定了 flex items 的排布顺序：
* 可以设置任意整数（正整数、负整数、0），值越小就越排在前面
* 默认值是0

代码如下：

``` html
<div class="box">
  <div class="item item1">item1</div>
  <div class="item item2">item2</div>
  <div class="item item3">item3</div>
</div>
```

``` css
.box {
  width: 500px;
  height: 400px;
  background-color: orange;
  
  /* 开启flex布局 */
  display: flex;
}

.item {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-weight: bold;
}

.item1 {
  background-color: #f00;
  order: 10;
}
.item2 {
  background-color: #0f0;
  order: 5;
}
.item3 {
  background-color: #00f;
  order: 30;
}
```

效果图：

<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/09_order.png')" alt="09_order">


### align-self

`flex item` 可以通过 align-self 属性 覆盖 flex container 设置的 align-items
* auto（默认值）：遵从 flex container 的 align-items 设置；
* stretch / flex-start / flex-end / center / baseline，效果跟 align-items 一致

代码如下：
``` html
<div class="box">
  <div class="item item1">item1</div>
  <div class="item item2">item2</div>
  <div class="item item3">item3</div>
</div>
```

``` css
.box {
  width: 500px;
  height: 400px;
  background-color: orange;
  
  /* 开启flex布局 */
  display: flex;
  align-items: center;
}

.item {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-weight: bold;
}

.item1 {
  background-color: #f00;
  align-self: flex-end;
}
.item2 {
  background-color: #0f0;
}
.item3 {
  background-color: #00f;
}
```

效果图：

<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/10_align-self.png')" alt="10_align-self">


### flex-grow

flex-grow 属性 决定了 flex item 的放大比例：
* 可以设置任意非负数字（正小数、正整数、0），默认是0，即如果存在剩余空间也不放大
* 当 flex container 在 main axis 方向上有剩余 size 时，flex-grow属性才会生效

第一种情况：如果所有 `flex item` 的 flex-grow 总和 sum 超过1，每个 `flex item` 扩展的 size 为：
* flex container 的剩余 size * (每个 `flex item` 的 flex-grow / sum)

第二种情况：如果所有 `flex item` 的 flex-grow 总和不超过1，每个 `flex item` 扩展的 size 为：
* flex container 的剩余 size * 每个 `flex item` 的 flex-grow

例子：

div的width: 500px，item1的width: 100px，item2的width: 100px，item3的width: 100px；

第一种情况，
item1的 flex-grow: 1，item2的 flex-grow: 2，item3的 flex-grow: 1；
剩余空间：500px-100px-100px-100px=200px；
item1瓜分：200px * (1 / 4) = 50px，item2瓜分：200px * (2 / 4) = 100px，item3瓜分：200px * (1 / 4) = 50px;
最后，item1、item2、item3实际宽度为：100px + 50px = 150px，100px + 100px = 200px，100px + 50px = 150px；

第二种情况，
item1的 flex-grow: 0.3，item2的 flex-grow: 0.5，item3的 flex-grow: 0.1；
剩余空间：500px-100px-100px-100px=200px；
item1瓜分：200px * 0.3 = 60px，item2瓜分：200px * 0.5 = 100px，item3瓜分：200px * 0.1 = 20px;
最后，item1、item2、item3实际宽度为：100px + 60px = 160px，100px + 100px = 200px，100px + 20px = 120px；

效果图：
<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/11_flex-grow.png')" alt="11_flex-grow">

::: danger 注意
`flex item` 扩展后的最终 size 不能超过 max-width 或者 main-height
:::

### flex-shrink

flex-shrink决定了 `flex item` 的收缩比例：
* 可以设置任意非负数字（正小数、正整数、0），默认值是1
* 当 `flex item` 在 main axis 方向上超过了 flex container 的 size，flex-shrink属性才会生效

第一种情况：如果所有 `flex item` 的 flex-shrink 总和 sun 超过1，每个 `flex item` 收缩的 size 为：
* 所有 `flex item` 超出 flex container 的 size * 收缩比例 / 所有 `flex item` 的收缩比例之和

第二种情况：如果所有 `flex item` 的 flex-shrink 总和 sum 不超过1，每个 `flex item` 收缩的 size 为：
* 所有 `flex item` 超出 flex container 的 size * sum * 收缩比例 / 所有 `flex item` 的收缩比例之和
* 收缩比例 = flex-shrink * flex item 的 base size
* base size 就是 `flex item` 放入 flex container 之前的 size


例子：

div的width: 500px，item1、item2、item3的width都为200px；

第一种情况，
item1的 flex-shrink: 2，item2的 flex-shrink: 3，item3的 flex-shrink: 1；
超出空间：500px-200px-200px-200px = -100px；
item1收缩：100px * 2 / 6 = 33.33px，item2收缩：100px * 3 / 6 = 50px，item3收缩：100px * 1 / 6 = 16.66px;
最后，item1、item2、item3实际宽度为：200px - 33.33px = 166.67px，200px - 50px = 150px，200px - 16.66px = 183.34px；

<!-- 第二种情况，
item1的 flex-shrink: 0.3，item2的 flex-shrink: 0.5，item3的 flex-shrink: 0.1；
超出空间：500px-200px-200px-200px = -100px；
item1收缩：100px * 2 / 6 = 33.33px，item2收缩：100px * 3 / 6 = 50px，item3收缩：100px * 1 / 6 = 16.66px;
最后，item1、item2、item3实际宽度为：200px - 33.33px = 166.67px，200px - 50px = 150px，200px - 16.66px = 183.34px； -->


效果图：
<img class="medium" :src="$withBase('/frontend/basis/css/01_flex/12_flex-shrink.png')" alt="12_flex-shrink">

::: danger 注意
1. 如果一个 `flex item` 的 flex-shrink 属性为0时，其他 `flex item` 为1，则空间不足时，前者`flex item`不会缩小
2. `flex item` 收缩后的最终 size 不能小于 min-width / min-height
:::


### flex-basis

flex-basis 属性用来设置 `flex item` 在 main axis 方向上的 base size：
* auto（默认值）
* 具体的宽度数据（100px）

决定 `flex item` 最终 base size 的因素，从优先级高到低：
* max-width / max-height / min-width / min-height
* flex-basis
* width / height
* 内容本身的 size


### flex

flex属性 是 flex-grow || flex-shrink || flex-basis 属性的简写，flex 属性可以指定1个、2个或3个值。

单值语法，值必须为以下其中一个：
* 一个无单位数（<number>）：它会被当作 <flex-grow> 的值；
* 一个有效的宽度（width）值：它会被当作 <flex-basis> 的值；
* 关键字none、auto、initial；

双值语法
* 第一个值必须为一个无单位数，并且它会被当作 <flex-grow> 的值：
* 第二个值必须为以下之一：
    * 一个无单位数：它会被当作 <flex-shrink> 的值；
    * 一个有效的宽度值：它会被当作 <flex-basis> 的值；

三值语法：
* 第一个值必须为一个无单位数，并且它会被当作 <flex-grow> 的值：
* 第二个值必须为一个无单位数，并且它会被当作 <flex-shrink> 的值：
* 第三个值必须为一个有效的宽度值，并且它会被当作 <flex-basis> 的值：