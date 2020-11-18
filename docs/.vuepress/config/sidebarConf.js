module.exports = {
  '/pages/frontend/basis/html/': [
    {
      title: 'HTML',
      collapsable: true,
      sidebarDepth: 2,
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
      sidebarDepth: 2,
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
  ]
};