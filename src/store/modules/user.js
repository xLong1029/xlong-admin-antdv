/* eslint-disable */
import Api from 'api/user';
import { resetRouter } from 'router';
import { strToArr } from 'utils';
import {
  getToken,
  removeToken,
  setToken
} from 'utils/auth';

const defaultUser = {
  id: 0,
  avatar: '',
  gender: '',
  username: '',
  realName: '',
  nickName: '',
  roles: []
};

// 清空账户信息
function clearAccount(_commit) {
  removeToken();
  resetRouter();
  _commit('SET_TOKEN', null);
  _commit('SET_USER', {...defaultUser});
}

const state = {
  token: getToken(),
  user: {...defaultUser}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
}

const actions = {
  // 获取用户信息
  getInfo({
    commit  }) {
    return new Promise((resolve, reject) => {
      const token = getToken();

      Api.GetUser(token)
        .then(res => {
          // 登录成功
          if (res.code == 200) {
            const { realName, username, nickName, gender, objectId, userFace , role} = res.data;

            const data = {
              avatar: userFace ? userFace : null,
              roles: role ? strToArr(role, ',') : null,
              realName,
              username,
              nickName,              
              gender,
              id: objectId
            }

            commit('SET_USER', data);
            resolve(data);
          }
          // 登录失败
          else {
            clearAccount(commit);
            reject(res);
          }
        })
        .catch(err => {
          clearAccount(commit);
          reject(err);
        });
    })
  },

  // 登出
  logout({
    commit
  }) {
    return new Promise((resolve) => {
      clearAccount(commit);
      resolve();
    })
  },

  // 登录
  login({
    commit
  }, from) {
    return new Promise((resolve, reject) => {
      Api.Login(from)
        .then(res => {
          const { code, data } = res;
          if (code == 200) {
            // 存储token
            setToken(data.token);
            commit("SET_TOKEN", data.token);
            resolve(data);
          } else reject(res);
        })
        .catch(err => reject(err));
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
