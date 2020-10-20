module.exports = {
  title: "欣-技术笔记",
  header: [   // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/image/favicon.ico' }],
    ['meta', { name: 'Keywords', content: 'vuepress 前端' }],
    ['meta  ', { name: 'description', content: '用于记录所学知识' }]
  ],
  themeConfig: {
    nav: [    // 导航栏配置
      { text: '首页', link: '/' },
      { text: '前端', link: '/tech/webDesign/html.md' },
      { text: 'github', link: 'https://github.com/zhangxin1996' },
    ],
    sidebar: 'auto', // 侧边栏配置
  }
};