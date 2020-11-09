'use strict'
const production = process.env.NODE_ENV === 'production';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 相关配置请参考 https://cli.vuejs.org/config/
module.exports = {
  publicPath: production ? '/xlong-admin-ant-design-vue/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  // 代理服务
  devServer: {
    port: 3030
  },
  configureWebpack: {
    resolve: {
      // 定义别名和插件位置
      alias: {
        '@': resolve('src'),
        'api': resolve('src/api'),
        'mock': resolve('src/mock'),
        'mixins': resolve('src/mixins'),
        'assets': resolve('src/assets'),
        'config': resolve('src/config'),
        'components': resolve('src/components'),
        'views': resolve('src/views'),
        'bmob': resolve('src/bmob'),
        'utils': resolve('src/utils'),
        'router': resolve('src/router'),
      }
    },
    // 外部引用
    // externals: {
    //   $: 'jquery'
    // }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // 修改配置名称
        args[0].title= 'XLONG家里蹲管理系统';
        return args
      })
  },
}
