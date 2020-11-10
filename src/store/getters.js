const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  avatar: state => state.user.user.avatar,
  nickName: state => state.user.user.nickName,
  realName: state => state.user.user.realName,
  username: state => state.user.user.username,
  roles: state => state.user.user.roles,
  gender: state => state.user.user.gender,
  permissionRoutes: state => state.permission.routes
};

export default getters;
