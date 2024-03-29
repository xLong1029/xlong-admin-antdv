import { handleMock, handleResponse } from "./../mock-handle.js";

const users = [
  {
    username: 18376686974,
    password: 123456,
    token: "admin-token",
    id: "ozdUQQQe",
  },
  {
    username: 17777075292,
    password: 123456,
    token: "editor-token",
    id: "aDKHTTTk",
  },
  {
    username: 18888888888,
    password: 666666,
    token: "user-token",
    id: "LKdsAAAF",
  },
];

export const infos = [
  {
    id: "ozdUQQQe",
    avatar: "https://img1.baidu.com/it/u=2383052339,2925526515&fm=26&fmt=auto",
    gender: "女",
    username: 18376686974,
    realName: "小六子",
    nickName: "xLong",
    roles: "admin",
    companyId: "McCq1119"
  },
  {
    id: "aDKHTTTk",
    avatar:
      "https://img0.baidu.com/it/u=977697838,3935105105&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    gender: "男",
    username: 17777075292,
    realName: "Lio.Huang",
    nickName: "琛小黑",
    roles: "manage",
    companyId: "McCq1119"
  },
  {
    id: "LKdsAAAF",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    gender: "男",
    username: 18888888888,
    realName: "夏普",
    nickName: "小朋友",
    roles: "user",
    companyId: "McCq1119"
  },
];

export default [
  {
    url: "/api/user/login",
    method: "post",
    response: (config) =>
      handleMock(config, ({ config }) => {
        const { username, password } = config.body;

        const user = users.find((e) => e.username == username);

        if (user) {
          if (user.password == password) {
            const { token, id } = user;
            const info = infos.find((e) => e.id === id);
            return handleResponse(200, "success", { ...info, token });
          } else {
            return handleResponse(400, "密码错误，请重新输入");
          }
        } else {
          return handleResponse(404, "该用户不存在");
        }
      }),
  },
  {
    url: "/api/user/info",
    method: "get",
    response: (config) =>
      handleMock(config, ({ token }) => {
        const user = users.find((e) => e.token == token);

        if (user) {
          const info = infos.find((e) => e.id === user.id);
          return handleResponse(200, "success", info);
        } else {
          return handleResponse(404, "找不到该用户");
        }
      }),
  },
  {
    url: "/api/user/info/edit",
    method: "post",
    response: (config) =>
      handleMock(config, ({ token }) => {
        const user = users.find((e) => e.token == token);
        if (user) {
          const index = infos.findIndex((e) => e.id === user.id);
          for (let i in config.body) {
            infos[index][i] = config.body[i];
          }
          return handleResponse(200, "success", infos[index]);
        } else {
          return handleResponse(404, "找不到该用户");
        }
      }),
  },
  {
    url: "/api/user/password/edit",
    method: "post",
    response: (config) =>
      handleMock(config, ({ token }) => {
        const { oldPassword, newPassword } = config.body;

        const index = users.findIndex((e) => e.token == token);

        if (index >= 0) {
          if (users[index].password == oldPassword) {
            users[index].password = newPassword;
            return handleResponse(200, "success");
          } else {
            return handleResponse(403, "旧密码错误");
          }
        } else {
          return handleResponse(404, "密码修改失败");
        }
      }),
  },
  {
    url: "/api/user/logout",
    method: "post",
    response: () => handleResponse(200, "success"),
  },
];
