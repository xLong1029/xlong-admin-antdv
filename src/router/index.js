/* eslint-disable */
import LayoutDefault from "@/layout/default";
import { createRouter, createWebHashHistory } from "vue-router";

export const constantRoutes = [
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/",
    component: LayoutDefault,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index"),
        name: "Home",
        meta: { title: "首页", icon: "iconfont icon-home2" }
      },
      {
        path: "contact",
        component: () => import("@/views/contact/index"),
        name: "Contact",
        hidden: true,
        meta: { title: "联系我们" }
      },
      {
        path: "about",
        component: () => import("@/views/about/index"),
        name: "About",
        hidden: true,
        meta: { title: "关于我们" }
      },
      {
        path: "redirect/:path*",
        component: () => import("@/views/redirect/index"),
        hidden: true,
      },
    ]
  }
];

/* Router Modules */
const requireRouter = require["context"](
  // 其组件目录的相对路径
  "./modules",
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /\w+\.js$/
);

/**
 * 动态路由
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = requireRouter.keys().map(fileName => {
  // 获取组件配置
  return requireRouter(fileName).default || requireRouter(fileName);
});

/**
 * 初始化路由
 */
export const initRouter = () =>
  createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes]
  });

let router = initRouter();

/**
 * 重置路由
 * Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
export function resetRouter() {
  router = initRouter();
}

export default router;
