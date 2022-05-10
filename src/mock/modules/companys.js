import { handleMock, handleResponse } from "./../mock-handle.js";
import Mock from "mockjs";

export const companys = [
  {
    id: "McCq1119",
    companyName: "XLONG家里蹲有限责任公司",
    companyNature: "股份制企业",
    companyAddress: "广西柳州市XX区XX路XXX号",
    creditCode: "1245010033075599XL",
    legalPersonName: "夏普",
    legalPersonNumber: "45020519991025022X",
    contacter: "小六子",
    contacterPhone: "18376686999",
    createTime: '@date("yyyy-MM-dd hh:mm:ss")',
    updateTime: null,
  },
];

export default [
  {
    url: "/api/company/info",
    method: "get",
    response: (config) =>
      handleMock(config, ({ config }) => {
        const { id } = config.query;

        const company = companys.find((e) => e.id == id);
        if (company) {
          return handleResponse(200, "success", company);
        } else {
          return handleResponse(404, "该企业不存在");
        }
      }),
  },
  {
    url: "/api/company/edit",
    method: "post",
    response: (config) =>
      handleMock(config, ({ config }) => {
        const data = { ...config.body };

        const index = companys.findIndex((e) => e.id == data.id);

        if (index >= 0) {
          companys[index] = { ...config.body };
          companys[index].updateTime = Mock.mock('@now("yyyy-MM-dd hh:mm:ss")');
          return handleResponse(200, "success");
        } else {
          return handleResponse(404, "找不该企业");
        }
      }),
  },
];
