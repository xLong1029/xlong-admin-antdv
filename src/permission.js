import router from "./router";
import store from "./store";
import { message } from "ant-design-vue";
import { getToken } from "utils/auth";
import { getPageTitle } from "utils";

const whiteList = ["/home", "/about", "/contact", "/404"]; // 重定向白名单

router.beforeEach(async (to, from, next) => {
  // 页面标题
  document.title = getPageTitle(to.meta.title);

  const hasRoles = store.getters.roles && store.getters.roles.length > 0;
  if (hasRoles) {
    next();
  }
  // 刷新页面或者首次打开系统
  else {
    try {
      const hasToken = getToken();
      // 用户未登录
      if (!hasToken) {
        if (whiteList.indexOf(to.path) !== -1) {
          next();
        }
        // 重定向到home进行登录
        else {
          store.dispatch("user/logout");
          next("/home");
        }
      } else {
        // 获取用户信息
        const { roles } = await store.dispatch("user/getInfo");

        console.log(`Get role's value, and the user's roles is ${roles}.`);

        // 获取可通过的路由
        await store.dispatch("permission/generateRoutes", roles);

        // hack方法以确保addroutes是完整的
        // 设置replace:true，这样导航就不会留下历史记录
        next({ ...to, replace: true });
      }
    } catch (err) {
      console.log(9999, err);
      // 重登录
      message.error(err || "用户信息已失效，请重新登录");

      setTimeout(async () => {
        await store.dispatch("user/logout");
        next("/home");
      }, 500);
    }
  }
});
