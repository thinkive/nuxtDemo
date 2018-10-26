module.exports = {
    // 全局变量
    globals: {
        // 将变量设置为 true 将允许变量被重写，或 false 将不允许被重写
        DEBUG: false,
        FB: false,
        wx: false,
        location: false,
        window:false
    },
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
      'plugin:vue/essential',
      'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    // add your custom rules here
    rules: {
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // 禁用不必要的转义字符
      'no-useless-escape': 'off',
      // 对象末尾的逗号语法验证，为了开发更好的体验，忽略这个规则，写不写最后的逗号都行
      'comma-dangle': 'off',
      'no-callback-literal': 0
    }
}
