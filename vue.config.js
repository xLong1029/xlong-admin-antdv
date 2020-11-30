"use strict";
const production = process.env.NODE_ENV === "production";
const title = process.env.VUE_APP_SYSYTEM_TITLE;
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 相关配置请参考 https://cli.vuejs.org/config/
module.exports = {
  publicPath: production ? "/xlong-admin-antdv/" : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  // 代理服务
  devServer: {
    port: 3030
  },
  configureWebpack: {
    //警告 webpack 的性能提示
    performance: {
      hints: "warning",
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith(".js");
      }
    },
    resolve: {
      // 定义别名和插件位置
      alias: {
        "@": resolve("src"),
        api: resolve("src/api"),
        mock: resolve("src/mock"),
        common: resolve("src/common"),
        assets: resolve("src/assets"),
        config: resolve("src/config"),
        components: resolve("src/components"),
        views: resolve("src/views"),
        bmob: resolve("src/bmob"),
        utils: resolve("src/utils"),
        router: resolve("src/router")
      }
    }
    // 外部引用
    // externals: {
    //   $: 'jquery'
    // }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      // 修改配置名称
      args[0].title = title;
      return args;
    });
  },
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          hack: `true; @import '~@/styles/variables.less';`
        },
        // 定制主题
        modifyVars: {
          "primary-color": "#3b8ccb",
          "link-color": "#3b8ccb",
          "info-color": "#3b8ccb",
          "border-radius-base": "4px"
        },
        javascriptEnabled: true
      }
    }
  }
};
