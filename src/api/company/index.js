/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 企业信息操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-10
 * 版本 : version 3.0
 */
import request from "utils/request.js";

export default {
  /**
   * 获取单位信息
   *
   * @param {*} id 企业id
   */
  GetCompanyInfo: (id) => {
    return request({
      url: `/api/company/info`,
      method: "get",
      params: {
        id
      },
    });
  },
  /**
   * 变单位信息
   *
   * @param {*} data 编辑的参数对象
   */
  EditCompanyInfo: (data) => {
    return request({
      url: `/api/company/edit`,
      method: "post",
      data
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
    return request({
      url: `/api/company/memberList`,
      method: "get",
      params: {
        params,
        pageNo,
        pageSize,
      },
    });
  },
  /**
   * 获取人员信息
   *
   * @param {*} id 查询的对象Id
   */
  GetMemberInfo: (id) => {
    return request({
      url: `/api/company/memberInfo`,
      method: "get",
      params: {
        id
      },
    });
  },
};
