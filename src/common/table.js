/*
 * 模块 : 表格相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-10
 * 版本 : version 2.0
 */

import { ref, reactive } from "vue";
import { message } from "ant-design-vue";

export default function() {
  // 列表加载
  const listLoading = ref(false);

  const searchLoading = ref(false);

  // 列表数据
  const listData = ref([]);

  // 分页
  const pageConfig = reactive({
    // 当前页码
    current: 1,
    // 每页条数
    pageSize: 10,
    // 每页条数选择
    pageSizeOptions: ["10", "30", "50", "80"],
    // 列表总数
    total: 0,
    // 显示每页条数
    showSizeChanger: true,
    // 显示总数
    showTotal: (total) => `共 ${total} 个`,
  });

  const rowSelection = reactive({
    selectedRowKeys: [],
    onChange: (selectedRowKeys) => {
      rowSelection.selectedRowKeys = selectedRowKeys;
    },
  });

  /**
   * 获取列表内容
   *
   * @param {*} pageNo 当前页码
   * @param {*} pageSize 每页条数
   * @param {*} apiGetList Api方法
   */
  function getList(pageNo, pageSize, apiGetList) {
    pageConfig.current = pageNo;
    pageConfig.pageSize = pageSize;

    listLoading.value = true;
    apiGetList(pageNo, pageSize)
      .then((res) => {
        const {
          code,
          data: { list, page },
          messgae: msg,
        } = res;
        if (code === 200) {
          listLoading.value = false;
          listData.value = list;
          pageConfig.current = page.page;
          pageConfig.pageSize = page.size;
          pageConfig.total = page.count;
        } else message.error(msg)
      })
      .catch((err) => console.log(err));
  }

  /**
   * 清除勾选
   */
  function clearSelect() {
    rowSelection.selectedRowKeys = [];
  }

  return {
    listLoading,
    searchLoading,
    listData,
    pageConfig,
    rowSelection,
    getList,
    clearSelect,
  };
}
