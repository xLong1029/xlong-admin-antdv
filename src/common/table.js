import { ref } from "vue";

export default function() {
  // 列表加载
  const listLoading = ref(false);

  // 列表数据
  const listData = ref([]);

  // 选项
  const selectList = ref([]);

  // 分页
  const pageConfig = ref({
    // 当前页码
    current: 1,
    // 每页条数
    pageSize: 15,
    // 每页条数选择
    pageSizeOptions: ["15", "30", "50", "80"],
    // 列表总数
    total: 0,
    // 显示每页条数
    showSizeChanger: true,
    // 显示总数
    showTotal: total => `共 ${total} 个`
  });

  const rowSelection = ref({
    onChange: selectedRowKeys => {
      selectList.value = selectedRowKeys;
    }
  });

  function getList(pageNo, pageSize, apiGetList) {
    pageConfig.value.current = pageNo;
    pageConfig.value.pageSize = pageSize;

    listLoading.value = true;
    apiGetList(pageNo, pageSize)
      .then(res => {
        const { data } = res;
        listLoading.value = false;
        listData.value = data;
      })
      .catch(err => console.log(err));
  }

  function clearSelect() {
    selectList.value = [];
  }

  function search() {
    getList(1, pageConfig.value.pageSize);
  }

  return {
    listLoading,
    listData,
    selectList,
    pageConfig,
    rowSelection,
    getList,
    clearSelect,
    search
  };
}
