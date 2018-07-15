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
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {}
}
