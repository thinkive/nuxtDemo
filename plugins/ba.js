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
      setTimeout(()=>{
        var _hmt = window._hmt || [];
        (function() {
          //每次执行前，先移除上次插入的代码
          document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?xxxx";
          hm.id = "baidu_tj"
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      },0);
    }
  })
}
