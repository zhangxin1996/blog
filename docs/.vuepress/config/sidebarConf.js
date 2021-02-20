module.exports = {
  '/pages/frontend/basis/html/': [
    {
      title: 'HTML',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        ['', '首页'],
        ['html1', 'HTML基本标签'],
        ['html2', 'HTML标签属性']
      ]
    }
  ],
  '/pages/frontend/advanced/es6/': [
    {
      title: 'ES6',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        ['', '前言'],
        ['01_let', 'let的使用'],
        ['02_const', 'const的使用'],
        ['03_template-Literal', '模板字符串'],
        ['04_destructuring', '变量的解构赋值'],
        ['05_function-extension', '函数的扩展'],
        ['06_Array-extension', '数组的扩展'],
        ['07_object-extension', '对象的扩展'],
        ['08_object-new-methods', '对象的新增方法'],
        ['09_Symbol', 'Symbol'],
        ['10_set-map', 'Set和Map数据结构']
      ]
    }
  ],
  '/pages/frontend/frame/vue/': [
    {
      title: 'Vue',
      collapsable: true,
      sidebarDepth: 2,
      children: [
        ['', '前言'],
        ['01_初识vue', '初识vue'],
        ['02_vue的差值操作', 'vue的差值操作'],
        ['03_计算属性', '计算属性'],
        ['04_v-bind绑定属性', 'v-bind绑定属性'],
        ['05_v-on事件监听', 'v-on事件监听'],
        ['06_条件判断', '条件判断'],
        ['07_循环遍历', '循环遍历'],
        ['08_实战案例-购物车', '实战案例-购物车'],
        ['09_表单绑定v-model', '表单绑定v-model'],
        ['10_组件化开发', '组件化开发'],
        ['11_模块化开发', '模块化开发'],
        ['12_生命周期函数', '生命周期函数'],
        ['13_过滤器', '过滤器'],
        ['14_自定义指令', '自定义指令'],
        ['15_动画', '动画'],
        ['16_Vue-CLI相关', 'Vue-CLI相关']
      ]
    }
  ]
};