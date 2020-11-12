/* eslint-disable */
import { resetRouter, asyncRoutes, constantRoutes } from "@/router/index.js";

console.log(111, constantRoutes);

/**
 * 使用meta.role判断当前用户是否具有权限访问
 * @param route
 * @param roles
 */
function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    console.log(222);
    return true;
  }
}

/**
 * 递归过滤动态路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: constantRoutes,
  addRoutes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
}

const actions = {
  // 生成路由
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      resetRouter();
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      // 404重定向配置放结尾
      accessedRoutes.push({ path: "*", redirect: "/404", hidden: true });
      router.addRoutes(accessedRoutes);
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
