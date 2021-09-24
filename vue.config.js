const path = require('path')
module.exports = {
  // yarn build 之后配置
  lintOnSave: false,
  // 配置svg
  chainWebpack: config => {
    // 配置svg
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icons 目录
      .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({ extract: false }).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({ ...options, plugins: [{ removeAttrs: { attrs: 'fill' } }] })).end()
    // 自动删除svg属性的默认颜色，以后让其全靠css样式控制
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{ plainSprite: true }])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
    // 发布模式，配置自己的打包入口文件
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式，配置自己的打包入口文件
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },


}