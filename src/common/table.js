import { ref } from "vue";

export default function() {
  // 列表加载
  const listLoading = ref(false);

  // 列表数据
  const listData = ref([]);

  // 分页
  const pageConfig = ref({
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

  const rowSelection = ref({
    selectedRowKeys: [],
    onChange: selectedRowKeys => {
      rowSelection.value.selectedRowKeys = selectedRowKeys;
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
    pageConfig.value.current = pageNo;
    pageConfig.value.pageSize = pageSize;

    listLoading.value = true;
    apiGetList(pageNo, pageSize)
      .then(res => {
        const { data, page } = res;
        listLoading.value = false;
        listData.value = data;
        pageConfig.value.current = page.page;
        pageConfig.value.pageSize = page.size;
        pageConfig.value.total = page.count;
      })
      .catch(err => console.log(err));
  }

  /**
   * 清楚勾选
   */
  function clearSelect() {
    rowSelection.value.selectedRowKeys = [];
  }

  /**
   * 搜索
   */
  function search() {
    getList(1, pageConfig.value.pageSize);
  }

  return {
    listLoading,
    listData,
    pageConfig,
    rowSelection,
    getList,
    clearSelect,
    search
  };
}
