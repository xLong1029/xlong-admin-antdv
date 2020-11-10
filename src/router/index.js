/* eslint-disable */
import { createRouter, createWebHashHistory } from "vue-router";
/* LayoutDefault */
import LayoutDefault from "@/layout/default";

export const constantRoutes = [
  {
    path: '/redirect',
    component: LayoutDefault,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
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
        meta: { title: "主页", icon: "el-icon-s-home" }
      },
      {
        path: "contact",
        component: () => import("@/views/contact/index"),
        name: "Contact",
        hidden: true,
        meta: { title: "联系我们" },
      },
      {
        path: "about",
        component: () => import("@/views/about/index"),
        name: "About",
        hidden: true,
        meta: { title: "关于我们" },
      }
    ]
  },
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

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export const initRouter = () =>
  createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes]
  });


const router = initRouter();

export default router;
