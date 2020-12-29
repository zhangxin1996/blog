const headerConf = require("./config/headerConf");
const pluginsConf = require("./config/pluginsConf");
const navConf = require("./config/navConf");
const sidebarConf = require("./config/sidebarConf");

module.exports = {
  title: '欣-技术笔记',
  description: '用于记录所学知识',
  header: headerConf,
  plugins: pluginsConf,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nextLinks: true,
    prevLinks: true,
    lastUpdated: '更新时间',
    nav: navConf,
    sidebar: sidebarConf
  }
};