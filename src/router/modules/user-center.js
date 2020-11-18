import LayoutDefault from "@/layout/default";

const router = {
  path: "/user",
  component: LayoutDefault,
  redirect: "/user/index",
  meta: {
    title: "用户中心",
    icon: "iconfont icon-user2",
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
        title: "个人信息"
      }
    },
    {
      path: "change-password",
      component: () => import("@/views/user/change-password/index"),
      name: "ChangePassword",
      meta: {
        title: "修改密码"
      }
    }
  ]
};

export default router;
