import LayoutDefault from "@/layout/default";

const router = {
  path: "/account-manage",
  component: LayoutDefault,
  redirect: "/account-manage/index",
  meta: { title: "账户管理", icon: "iconfont icon-users1" },
  children: [
    {
      path: "index",
      component: () => import("@/views/account-manage/index"),
      name: "AccountManage",
      meta: { title: "账户管理1", icon: "iconfont icon-users1" }
    },
    {
      path: "test",
      component: () => import("@/views/account-manage/index"),
      name: "AccountManageTest",
      meta: { title: "账户管理2", icon: "iconfont icon-users1" }
    }
  ]
};

export default router;
