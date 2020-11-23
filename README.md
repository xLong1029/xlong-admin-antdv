# xlong-admin-antdv

## 介绍

xlong-admin-antdv 是一套基于 Vue3 + Ant Design Vue + Bmob 开发的单页面客户端渲染管理后台系统示例。  

*该项目仅作学习参考，请勿商用

<!-- ## 项目展示

> DEMO地址：https://xlong1029.github.io/xlong-admin-element/#/Login

## 项目说明

#### 1. 前后端分离开发模式
- **前端**：Vue + Webpack+ Element
- **后端**：Bmob

#### 2. 项目用到技术、框架与插件
[Vue.js](https://github.com/vuejs)<br/>
[webpack](https://github.com/webpack)<br/>
[Element](https://github.com/ElemeFE/element)<br/>
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)<br/>
[ECharts](https://www.echartsjs.com/zh)<br/>

## 部分项目运行截图
* 首页

* 用户中心

* 单位信息

* 账户管理 -->

## 目录结构

```
│  .env.development // 开发环境配置
│  .env.production // 生产环境配置
│  .gitignore
│  babel.config.js // babel配置
│  package.json
│  vue.config.js // 配置文件
│  README.md
│
├─pubilc
│   favicon.ico // 图标
│   index.html // 首页入口文件
│
├─src
│  │  main.js // 项目入口js
│  │  permission.js // 角色权限配置
│  │  App.vue // 根组件
│  │
│  ├─assets // 资源目录，这里的资源会被wabpack构建
│  ├─api // api接口文件
│  ├─store  // 应用级数据（state）
│  ├─styles  // 样式
│  │
│  ├─common 通用方法
│  │    index.js
│  │    table.js
│  │
│  ├─config // 项目配置
│  │    index.js
│  │
│  ├─components // 功能组件
│  │
│  ├─layout // 布局
│  │  │
│  │  │  
│  │  ├─ default // 基础布局
│  │  │   │  index.vue
│  │  │   │
│  │  │   └─components // 布局组件
│  │  │      │  index.js
│  │  │      │  
│  │  │      ├─BackTop // 返回顶部
│  │  │      ├─Breadcrumb // 面包屑
│  │  │      ├─Footer // 底部
│  │  │      ├─Main // 主页面
│  │  │      ├─Navbar // 导航
│  │  │      └─Top // 顶部
│  │  │
│  │  ├─fullscreen // 全屏布局
│  │  │
│  │  └─default // N页面路由视图
│  │
│  ├─views // 视图
│  │  │
│  │  ├─about // 关于我们
│  │  ├─account-manage // 账户管理
│  │  ├─contact // 联系我们
│  │  ├─error-page // 错误页面
│  │  ├─home // 首页、登录
│  │  ├─redirect // 重定向
│  │  └─user
│  │      │  index.vue // 用户中心
│  │      │  
│  │      ├─change-password // 修改密码
│  │      ├─company-info // 单位信息
│  │      └─info // 个人信息
│  │
│  ├─utils // 通用工具函数
│  │    index.js
│  │    auth.js // 读写token
│  │    request.js // 请求配置，因用了bmob，所以没用到requrest请求
│  │    scroll-to.js // 页面滚动
│  │    validate.js // 验证
│  │
│  ├─bmob  // 封装Bmob请求函数
│  │    bmob-server.js
│  │
│  └─router  // 路由配置
│     │  index.js
│     │  
│     └─modules // 分模块的动态路由
│
└─static // 静态资源
```

## 本地运行
1. 安装前台依赖
> npm install

安装依赖后若报错：Cannot find module 'vue-loader-v16/package.json'
请安装vue-loader-v16

> npm install --save-dev vue-loader-v16 

2. 运行前台项目
> npm run serve
3. 访问地址：http://localhost:3030

## 项目打包
请将vue.config.js中publicPath改成你的项目

> npm run build

## 作者联系方式

QQ：381612175
TEL: 18376686974

github：https://github.com/xLong1029/

站酷主页：http://xlong.zcool.com.cn/

UI中国：http://i.ui.cn/ucenter/358591.html

* 此项目做学习Vue3测试使用，有什么问题可联系我讨论
