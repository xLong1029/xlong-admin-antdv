/*
 * 模块 : 表格相关配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2020-11-27
 * 版本 : version 1.0
 */

import { ref, reactive } from "vue";

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
    showTotal: total => `共 ${total} 个`
  });

  const rowSelection = reactive({
    selectedRowKeys: [],
    onChange: selectedRowKeys => {
      rowSelection.selectedRowKeys = selectedRowKeys;
    }
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
      .then(res => {
        const { data, page } = res;
        listLoading.value = false;
        listData.value = data;
        pageConfig.current = page.page;
        pageConfig.pageSize = page.size;
        pageConfig.total = page.count;
      })
      .catch(err => console.log(err));
  }

  /**
   * 清楚勾选
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
    clearSelect
  };
}
