/*
** 百度统计分析脚本
*/
export default ({ app: { router }, store }) => {
  /*
  ** 每次路由变更时进行pv统计
  */
  router.afterEach((to, from) => {
    console.log('路由统计')
    if (process.env.NODE_ENV === 'production') {
      /* 告诉增加一个PV */
      try {
        window._hmt = window._hmt || []
        window._hmt.push(['_trackPageview', to.fullPath])
      } catch (e) {}
    }
  })
}
