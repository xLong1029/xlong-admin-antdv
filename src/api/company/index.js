/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 用处 : 企业信息操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2020-11-19
 */
/* eslint-disable */
import BmobServer from "bmob/bmob-server.js";

export default {
  /**
   * 获取单位信息
   *
   * @param {*} id 企业id
   */
  GetCompanyInfo: (id) => {
    return new Promise((resolve, reject) => {
      BmobServer.GetOne("CompanyInfo", id)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  /**
   * 变单位信息
   *
   * @param {*} params 新增的参数对象
   * @param {*} id 查询的objectId
   */
  EditCompanyInfo: (params, id) => {
    return new Promise((resolve, reject) => {
      BmobServer.EditOne("CompanyInfo", id, params)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  /**
   * 获取人员列表
   *
   * @param {*} params 查询参数对象
   * @param {*} pageNo 当前页码
   * @param {*} pageSize 每页显示几条数据
   */
  GetMemberList: (params, pageNo, pageSize) => {
    let query = BmobServer.GetQuery("_User");
    query.equalTo("companyId", "==", params.companyId);

    return new Promise((resolve, reject) => {
      BmobServer.GetListData(query, pageNo, pageSize)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  /**
   * 获取人员信息
   *
   * @param {*} id 查询的objectId
   */
  GetMemberInfo: (id) => {
    return new Promise((resolve, reject) => {
      BmobServer.GetOne("_User", id)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
