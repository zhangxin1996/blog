const secret = require("./secret");

module.exports = {
  '@vuepress/last-updated': {
    transformer: (timestamp) => {
      // 不要忘了安装 moment
      const moment = require('moment')
      moment.locale('zh-CN')
      return moment(timestamp).format('YYYY-MM-DD  HH:mm:ss')
    }
  },
  '@vssue/vuepress-plugin-vssue': {
    // 设置 `platform` 而不是 `api`
    platform: 'github-v4',

    // 其他的 Vssue 配置
    owner: 'zhangxin1996',
    repo: 'zhangxin1996.github.io',
    clientId: secret.clientId,
    clientSecret: secret.clientSecret,
    autoCreateIssue: true
  },
  '@vuepress/back-to-top': true,
  '@vuepress/medium-zoom': {
    selector: 'img.medium',
  }
};