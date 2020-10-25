module.exports = {
  title: '欣-技术笔记',
  description: '用于记录所学知识',
  header: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: '欣' }],
    ['meta', { name: 'Keywords', content: 'vuepress 前端' }],
  ],
  themeConfig: {
    nav: [ // 导航栏配置
      { 
        text: '首页', 
        link: '/' 
      },
      {
        text: '前端基础',
        ariaLabel: "前端的基础内容",
        items: [{
            text: 'HTML',
            link: '/pages/frontend/basis/html/'
          },
          {
            text: 'CSS',
            link: '/pages/webDesign/basis/css/'
          },
          {
            text: 'JavaScript',
            link: '/pages/webDesign/basis/javascript/'
          }
        ]
      },
      {
        text: 'github',
        link: 'https://github.com/zhangxin1996'
      }
    ],
    sidebar: {
      '/pages/frontend/basis/html/': [{
        title: 'HTML',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['', '首页'],
          ['html1', 'HTML基本标签'],
          ['html2', 'HTML标签属性']
        ]
      }]
    },
    // 下/上一篇 链接
    nextLinks: true,
    prevLinks: true,
    lastUpdated: '更新时间',
    plugins: [
      [
        '@vuepress/last-updated',
        {
          transformer: (timestamp) => {
            // 不要忘了安装 moment
            const moment = require('moment')
            moment.locale('zh-CN')
            return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      ]
    ]
  }
};