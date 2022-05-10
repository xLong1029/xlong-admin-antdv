# xlong-admin-antdv

## 介绍

xlong-admin-antdv 是一套基于 Vue3 + Ant Design Vue + Mock 开发的单页面客户端渲染的信息化管理系统示例。

温馨提示：  
1. 原来使用Bmob开发的版本用的是开发版套餐（2022 年 5 月 5 日起，Bomb已对开发版应用创建时间超过 12 个月的停止免费服务），因为穷不想充值，所以不打算继续维护了。  
2. Bmob版传送门：[develop-vite-bmob](https://github.com/xLong1029/xlong-admin-antdv/tree/develop-bmob)

*该项目仅作学习参考，请勿商用

* 该项目仅作学习参考，请勿商用

## 项目展示

> DEMO 地址：https://xlong1029.github.io/xlong-admin-antdv/#/home

## 项目用到技术、框架与插件

[Vue3](https://v3.vuejs.org/)<br/>
[Ant Design Vue](https://github.com/vueComponent/ant-design-vue)<br/>
[Mock](http://mockjs.com/)<br/>

## 部分项目运行截图

- 首页/登录

![Image text](static/images/screen-1.gif)

- 个人信息

![Image text](static/images/screen-2.gif)

- 修改密码

![Image text](static/images/screen-3.gif)

- 单位信息

![Image text](static/images/screen-4.gif)

- 账户管理

![Image text](static/images/screen-5.gif)

![Image text](static/images/screen-6.gif)

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
│  ├─mock // 模拟请求数据
│  │    index.js // mock数据
│  │    mock-handle.js // mock数据处理
│  │    mock-server.js // mock服务
│  │
│  ├─common 通用方法
│  │    index.js
│  │    table.js
│  │    upload.js
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
│  │  └─router-view // N页面路由视图
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
│  │    request.js // 请求配置
│  │    scroll-to.js // 页面滚动
│  │    validate.js // 验证
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

2. 运行前台项目
   > npm run serve
   
3. 访问地址：http://localhost:3030

## 项目打包

请将 vue.config.js 中 publicPath 改成你的项目

> npm run build

## 作者联系方式

QQ：381612175
TEL: 18376686974

github：https://github.com/xLong1029/

站酷主页：http://xlong.zcool.com.cn/

UI 中国：http://i.ui.cn/ucenter/358591.html

- 此项目做学习 Vue3 测试使用，有什么问题可联系我讨论
