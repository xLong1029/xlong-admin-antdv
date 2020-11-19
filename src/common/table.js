import { ref } from "vue";

export default function() {
  // 列表加载
  const listLoading = ref(false);

  // 列表数据
  const listData = ref([]);

  // 选项
  const selectList = ref([]);

  // 分页
  const pagination = ref({
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

  //   // 当前页码
  //   const pageNo = ref(1);
  //   // 每页条数
  //   const pageSize = ref(15);
  //   // 每页条数选择
  //   const pageSizes = ref([15, 30, 50, 80]);
  //   // 列表总数
  //   const listTotal = ref(1);

  function getList(pageNo, pageSize, apiGetList) {
    pagination.value.current = pageNo;
    pagination.value.pageSize = pageSize;

    listLoading.value = true;
    apiGetList(pageNo, pageSize)
      .then(res => {
        listLoading.value = false;
        listData.value = res.data;
        // setPage(res.page);
      })
      .catch(err => console.log(err));
  }

  function getSelectList(selection) {
    clearSelect();
    for (let i = 0; i < selection.length; i++) {
      selectList.value.push(selection[i].objectId);
    }
  }

  function clearSelect() {
    selectList.value = [];
  }

  function setPage(data) {
    pagination.value = data;
  }

  function search() {
    getList(1, pagination.value);
  }

  return {
    listLoading,
    listData,
    selectList,
    pagination,
    // pageNo,
    // pageSize,
    // pageSizes,
    // listTotal,
    getList,
    getSelectList,
    clearSelect,
    setPage,
    search
  };
}
