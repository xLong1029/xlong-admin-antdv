const getters = {
  pageLoading: state => state.app.pageLoading,
  sysLoading: state => state.app.sysLoading,
  currentEnv: state => state.app.currentEnv,
  token: state => state.user.token,
  user: state => state.user.user,
  userId: state => state.user.user.id,
  companyId: state => state.user.user.companyId,
  avatar: state => state.user.user.avatar,
  nickName: state => state.user.user.nickName,
  realName: state => state.user.user.realName,
  username: state => state.user.user.username,
  roles: state => state.user.user.roles,
  gender: state => state.user.user.gender,
  permissionRoutes: state => state.permission.routes
};

export default getters;
