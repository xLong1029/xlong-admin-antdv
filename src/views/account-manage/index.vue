<template>
  <div class="account-list-container">
    <div class="operate-btn-container mb-20 flex">
      <a-space size="small">
        <a-button type="primary" @click="openAccountStoreMoadl(null, 1)"
          >添加</a-button
        >
        <a-popconfirm title="确认删除?" @confirm="handleDelelteAccount()">
          <a-button
            :disabled="rowSelection.selectedRowKeys.length === 0"
            :loading="delLoading"
            >删除</a-button
          >
        </a-popconfirm>
        <a-button
          type="primary"
          :loading="enableLoading"
          :disabled="rowSelection.selectedRowKeys.length === 0"
          @click="handleEnableAccount(1)"
          >启用</a-button
        >
        <a-button
          :loading="disableLoading"
          :disabled="rowSelection.selectedRowKeys.length === 0"
          @click="handleEnableAccount(-1)"
          >禁用</a-button
        >
      </a-space>
      <div class="search-container">
        <a-input-search
          v-model:value="filterParams.mobile"
          placeholder="请输入手机号码进行搜索"
          enter-button
          allowClear
          :loading="searchLoading"
          @search="onSearch"
          @change="handleFilterParamsChange"
        />
      </div>
    </div>
    <a-table
      class="table-container"
      :scroll="{ x: 1130 }"
      :loading="listLoading"
      :columns="columns"
      :data-source="listData"
      :row-key="record => record.id"
      :pagination="pageConfig"
      :row-selection="rowSelection"
      @change="handleTableChange"
    >
      <template #enabledStateText="{ record }">
        <a-tag v-if="record.enabledState == 1" color="green">启用</a-tag>
        <a-tag v-else color="red">禁用</a-tag>
      </template>
      <template #provinceAndCity="{ record }">
        <span>{{ record.province }}</span>
        <span v-if="record.city">/ {{ record.city }}</span>
      </template>
      <template #action="{ record }">
        <a @click="openAccountStoreMoadl(record, 2)">
          <edit-outlined class="mr-5" />编辑
        </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除?"
          @confirm="handleDelelteAccount(record.id)"
        >
          <a> <delete-outlined class="mr-5" />删除 </a>
        </a-popconfirm>
      </template>
    </a-table>
    <AccountStore
      v-model:visible="accountStoreModal.visible"
      :id="accountStoreModal.id"
      :type="accountStoreModal.type"
      @close="closeAccountStoreModal"
      @submit="handleAccountStoreSuccess"
    />
  </div>
</template>

<script>
import { computed, reactive, onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import moment from "moment";
// 通用模块
import useTable from "common/table.js";
import useCommon from "common/index.js";
// Api
import Api from "api/account-manage";
// 组件
import AccountStore from "./store.vue";

export default {
  name: "AccountList",

  components: { AccountStore },

  emits: {
    close: val => {
      console.log(8888, val);
      return true;
    }
  },

  setup() {
    const { showDevModal, store } = useCommon();

    const roles = computed(() => store.getters.roles);

    const {
      listLoading,
      searchLoading,
      listData,
      pageConfig,
      rowSelection,
      clearSelect,
      getList
    } = useTable();

    const columns = [
      {
        title: "真实姓名",
        dataIndex: "realname",
        key: "realname",
        width: 150,
        fixed: "left"
      },
      {
        title: "状态",
        dataIndex: "enabledState",
        key: "enabledState",
        slots: { customRender: "enabledStateText" },
        width: 100,
        filters: [
          {
            text: "启用",
            value: 1
          },
          {
            text: "禁用",
            value: -1
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.enabledState === value
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        width: 100,
        filters: [
          {
            text: "男",
            value: "男"
          },
          {
            text: "女",
            value: "女"
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.gender === value
      },
      {
        title: "手机号码",
        key: "mobile",
        dataIndex: "mobile",
        width: 150
      },
      {
        title: "电子邮箱",
        key: "email",
        dataIndex: "email",
        width: 150
      },
      {
        title: "所在省市",
        dataIndex: "province",
        key: "province",
        slots: { customRender: "provinceAndCity" },
        width: 200
      },
      {
        title: "所在单位",
        dataIndex: "companyName",
        key: "companyName",
        width: 200
      },
      {
        title: "职位",
        dataIndex: "job",
        key: "job",
        width: 120
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 150,
        sorter: (a, b) => moment(a.createTime).isBefore(b.createTime)
      },
      {
        title: "更新时间",
        dataIndex: "updateTime",
        key: "updateTime",
        width: 150,
      },
      {
        title: "操作",
        key: "action",
        slots: { customRender: "action" },
        width: 150,
        fixed: "right"
      }
    ];

    const accountStoreModal = reactive({
      visible: false,
      id: null,
      type: 1 // 1 新增, 2 编辑, 3 查看
    });

    // 打开账户存储弹窗
    const openAccountStoreMoadl = (record, type) => {
      accountStoreModal.visible = true;
      accountStoreModal.id = record?.id;
      accountStoreModal.type = type;
    };

    // 关闭账户存储弹窗
    const closeAccountStoreModal = val => {
      accountStoreModal.visible = val;
      accountStoreModal.id = null;
      accountStoreModal.type = 1;
    };

    // 获取列表
    const apiGetList = (pageNo, pageSize) =>
      Api.GetAccList(filterParams, pageNo, pageSize);

    // 表格改变事件
    const handleTableChange = (pagination, filters, sorter) => {
      console.log(pagination, filters, sorter);

      getList(pagination.current, pagination.pageSize, apiGetList);
    };

    const filterParams = reactive({});

    const handleFilterParamsChange = e => {
      const value = e.target.value;
      // 清空
      if (!value) {
        getList(1, pageConfig.pageSize, apiGetList);
      }
    };

    // 搜索
    function onSearch() {
      getList(1, pageConfig.pageSize, apiGetList);
    }

    // 账户存储成功
    const handleAccountStoreSuccess = type => {
      // 新增操作返回第一页
      if (type === 1) {
        pageConfig.current = 1;
      }
      getList(pageConfig.current, pageConfig.pageSize, apiGetList);
    };

    // 删除loading
    const delLoading = ref(false);

    // 删除账户
    const handleDelelteAccount = id => {
      if (!id && !rowSelection.selectedRowKeys.length) {
        message.warning("请勾选要删除的账户");
      }

      const ids = id ? [id] : rowSelection.selectedRowKeys

      delLoading.value = !id;

      Api.DeleteAcc(ids)
        .then(res => {
          const { code, message: msg } = res;
          if (code == 200) {
            message.success("删除成功!");
            getList(pageConfig.current, pageConfig.pageSize, apiGetList);
            clearSelect();
          } else message.error(msg);
        })
        .catch(err => console.log(err))
        .finally(() => (delLoading.value = false));
    };

    // 启/禁用loading
    const enableLoading = ref(false);
    const disableLoading = ref(false);

    // 启/禁用账户
    const handleEnableAccount = enabledState => {
      // console.log(rowSelection.selectedRowKeys);

      enabledState === 1
        ? (enableLoading.value = true)
        : (disableLoading.value = true);

      Api.EnableAcc(enabledState, rowSelection.selectedRowKeys)
        .then(res => {
          const { code, message: msg } = res;
          if (code == 200) {
            message.success("操作成功!");
            getList(pageConfig.current, pageConfig.pageSize, apiGetList);
          } else message.warning(msg);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          enabledState === 1
            ? (enableLoading.value = false)
            : (disableLoading.value = false);
          clearSelect();
        });
    };

    onMounted(() => {
      getList(pageConfig.current, pageConfig.pageSize, apiGetList);
    });

    return {
      listLoading,
      searchLoading,
      listData,
      pageConfig,
      getList,
      onSearch,
      columns,
      rowSelection,
      handleTableChange,
      roles,
      showDevModal,
      accountStoreModal,
      openAccountStoreMoadl,
      closeAccountStoreModal,
      handleAccountStoreSuccess,
      delLoading,
      handleDelelteAccount,
      enableLoading,
      disableLoading,
      handleEnableAccount,
      filterParams,
      handleFilterParamsChange
    };
  }
};
</script>

<style lang="less" scoped>
.account-list-container {
  padding: 20px 0;
}

.operate-btn-container {
  justify-content: space-between;
}

.search-container {
  width: 300px;
}
</style>
