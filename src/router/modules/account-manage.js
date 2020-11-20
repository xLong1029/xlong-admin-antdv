import LayoutDefault from "@/layout/default";

const router = {
  path: "/account-manage",
  component: LayoutDefault,
  redirect: "/account-manage/index",
  meta: {
    roles: ["admin"]
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/account-manage/index"),
      name: "AccountManage",
      meta: {
        title: "账户管理",
        icon: "iconfont icon-users1"
      }
    }
  ]
};

export default router;
