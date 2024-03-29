module.exports = [ // 导航栏配置
  {
    text: '首页',
    link: '/'
  },
  {
    text: '前端基础',
    ariaLabel: "前端的基础内容",
    items: [
      {
        text: 'HTML',
        link: '/pages/frontend/basis/html/'
      },
      {
        text: 'CSS',
        link: '/pages/frontend/basis/css/'
      },
      {
        text: 'JavaScript',
        link: '/pages/frontend/basis/javascript/'
      }
    ]
  },
  {
    text: '前端进阶',
    ariaLabel: "前端的进阶内容",
    items: [
      {
        text: 'ES6',
        link: '/pages/frontend/advanced/es6/'
      },
      {
        text: 'Git',
        link: '/pages/frontend/advanced/git/'
      }
    ]
  },
  {
    text: '前端框架',
    ariaLabel: "前端的框架内容",
    items: [
      {
        text: 'Vue',
        link: '/pages/frontend/frame/vue/'
      },
      {
        text: 'Vue3',
        link: '/pages/frontend/frame/vue3/'
      }
    ]
  },
  {
    text: 'github',
    link: 'https://github.com/zhangxin1996'
  }
];