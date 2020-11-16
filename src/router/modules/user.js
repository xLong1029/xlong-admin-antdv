import LayoutDefault from "@/layout/default";
import LayoutRouterView from "@/layout/router-view";

const router = {
  path: "/user",
  component: LayoutDefault,
  redirect: "/user/index",
  meta: {
    title: "用户中心",
    directLink: true
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/user/index"),
      name: "UserCenter",
      hidden: true
    },
    {
      path: "info",
      component: () => import("@/views/user/info/index"),
      name: "UserInfo",
      meta: {
        title: "用户信息"
      }
    },
    {
      path: "account-manage",
      component: LayoutRouterView,
      redirect: "/user/account-manage/index",
      meta: {
        title: "账户管理"
      },
      children: [
        {
          component: () => import("@/views/user/account-manage/index"),
          name: "AccountManage",
          meta: {
            title: "账户管理",
            icon: "iconfont icon-yonghu",
            roles: ["admin"]
          }
        }
      ]
    }
  ]
};

export default router;
