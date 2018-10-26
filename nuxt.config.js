// nuxt.config.js 文件配置
const path = require('path')
var minimist = require('minimist');
module.exports = {
  mode: 'spa',
  // cache: true,
  cache: {
    max: 1000,
    maxAge: 900000
  },
  dev: (process.env.NODE_ENV !== 'production'),
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxtDemo',
    titleTemplate: '%s | Awesome JS SSR Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'renderer', content: 'webkit' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { 'http-equiv': 'cache-control', content: 'no-cache' },
      { 'http-equiv': 'expires', content: '0' },
      { hid: 'keywords', name: 'keywords', content: '前端开发，JavaScript, Node, Vue，nuxt, 服务端渲染' },
      { name: 'author', content: 'thinkive@qq.com' },
      { content: 'telephone=no', name: 'format-detection' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.2/css/bulma.min.css'
      }
    ],
    // html head 中创建 script 标签
    script: [
      // {
      //   async: 'async',
      //   type: 'text/javascript',
      //   src: '//jkchao.disqus.com/count.js',
      //   id: 'dsq-count-scr'
      // }
    ],
    // 不对<script>标签中内容做转义处理
    __dangerouslyDisableSanitizers: ['script']
  },
  // Global CSS ,{src: '~/assets/scss/index.scss',lang: 'scss'}
  css: [{src:'~/assets/css/reset.css',lang: 'css'}],
// Global env
  env: {
    __ENV: process.env.__ENV,
    baseUrl: minimist(process.argv.slice(2)).BASE_URL || 'http://localhost:3000',
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'axios',
      'howler',
    ],
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ]
    },
    /*
    ** Run ESLINT on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'less-loader'
          ]
        }
        )
        // 添加 alias 配置
        Object.assign(config.resolve.alias, {
          'utils': path.resolve(__dirname, 'utils')
        })
        config.devtool = 'eval-source-map'
      }
    },
  },
  manifest: {
    name: 'nuxtDemo',
    description: 'A nuxtDemo system',
    theme_color: '#42B983'
  },
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/auth'
  ],
  axios: {
    https: false,
    progress: true,
    prefix: '/api/',
    // baseURL: '', //
    // proxy: false, //
    retry: {
      retries: 3, //
      shouldResetTimeout: false,
      retryDelay: function () {
        return  10 * 1000
      },
      retryCondition: function () {
        return  10 * 1000
      },
    },
    credentials: true,
    debug: true,
    // proxy: {
    //   '/api/': 'http://api.example.com',
    //   '/api2/': 'http://api.another-website.com',
    //   '/api3/': { target: 'http://api.example.com', pathRewrite: {'^/api3/': ''} }
    // } // Can be also an object with default options
  },
  generate: {
    routes (callback) {
      const posts = require('./posts.json')
      let routes = posts.map(post => `post/${post.id}`)
      callback(null, routes)
    },
    minify: {
      collapseWhitespace: false
    }
  },
  plugins: [
    {src: '~plugins/toast'},
    {src: '~plugins/dialog'},
    { src: '~plugins/ga.js', ssr: false },
    { src: '~plugins/ba.js'},
    { src: '~/plugins/axios'},
    { src: '~/plugins/baidu-seo-push.js', ssr: false },
    { src: '~/plugins/finally.js', ssr: false },
    { src: '~/plugins/debug.js', ssr: false }
  ]
}
