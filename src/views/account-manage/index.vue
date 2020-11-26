<template>
  <div class="account-list-container">
    <div class="operate-btn-container mb-20">
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
          @click="handleEnableAccount(2)"
          >禁用</a-button
        >
      </a-space>
    </div>
    <a-table
      class="table-container"
      :scroll="{ x: 1130 }"
      :loading="listLoading"
      :columns="columns"
      :data-source="listData"
      :row-key="record => record.objectId"
      :pagination="pageConfig"
      :row-selection="rowSelection"
      @change="handleTableChange"
    >
      <template #enabledStateText="{ record }">
        <a-tag v-if="record.enabledState === 1" color="green">启用</a-tag>
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
          @confirm="handleDelelteAccount(record.objectId)"
        >
          <a> <delete-outlined class="mr-5" />删除 </a>
        </a-popconfirm>
      </template>
    </a-table>
    <account-store
      v-model:visible="accountStoreModal.visible"
      :id="accountStoreModal.id"
      :type="accountStoreModal.type"
      @close="closeAccountStoreModal"
      @submit="handleAccountStoreChange"
    />
  </div>
</template>

<script>
import { getCurrentInstance, computed, reactive, onMounted, ref } from "vue";
import table from "common/table.js";
import common from "common/index.js";
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
    const { ctx } = getCurrentInstance();

    const { showDevMoadl } = common();

    // const companyId = computed(() => ctx.$store.getters.companyId);
    const roles = computed(() => ctx.$store.getters.roles);

    const {
      listLoading,
      listData,
      pageConfig,
      rowSelection,
      clearSelect,
      getList,
      search
    } = table();

    const columns = [
      {
        title: "真实姓名",
        dataIndex: "realname",
        key: "realname",
        width: 200,
        fixed: "left"
      },
      {
        title: "状态",
        dataIndex: "enabledState",
        key: "enabledState",
        slots: { customRender: "enabledStateText" },
        width: 100
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        width: 100
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
        dataIndex: "createdAt",
        key: "createdAt",
        width: 200
      },
      {
        title: "Action",
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
      accountStoreModal.id = record ? record.objectId : null;
      accountStoreModal.type = type;
    };

    // 关闭账户存储弹窗
    const closeAccountStoreModal = val => {
      accountStoreModal.visible = val;
      accountStoreModal.id = null;
      accountStoreModal.type = 1;
    };

    // 表格改变事件
    const handleTableChange = (pagination, filters, sorter) => {
      console.log(pagination, filters, sorter);

      getList(pagination.current, pagination.pageSize, apiGetList);
    };

    // 获取列表
    const apiGetList = (pageNo, pageSize) =>
      Api.GetAccList({}, pageNo, pageSize);
    // 获取列表
    const handleAccountStoreChange = type => {
      // 新增操作返回第一页
      if (type === 1) {
        pageConfig.value.current = 1;
      }
      getList(pageConfig.value.current, pageConfig.value.pageSize, apiGetList);
    };

    // 删除loading
    const delLoading = ref(false);
    // 删除id
    const delIds = ref(null);

    // 删除账户
    const handleDelelteAccount = id => {
      if (!id && !rowSelection.value.selectedRowKeys.length) {
        ctx.$message.warning("无可操作的对象，请刷新页面重试");
      }

      delIds.value = id ? [id] : rowSelection.value.selectedRowKeys;

      delLoading.value = id ? false : true;

      Api.DeleteAcc(delIds.value)
        .then(res => {
          if (res.code == 200) {
            ctx.$message.success("删除成功!");
            getList(
              pageConfig.value.current,
              pageConfig.value.pageSize,
              apiGetList
            );
            clearSelect();
          } else console.log(res);
        })
        .catch(err => {
          console.log(err);
          ctx.$message.error("删除失败！");
        })
        .finally(() => {
          delLoading.value = false;
          delIds.value = null;
        });
    };

    // 启/禁用loading
    const enableLoading = ref(false);
    const disableLoading = ref(false);

    // 启/禁用账户
    const handleEnableAccount = enabledState => {
      // console.log(rowSelection.value.selectedRowKeys);

      enabledState === 1
        ? (enableLoading.value = true)
        : (disableLoading.value = true);

      Api.EnableAcc({ enabledState }, rowSelection.value.selectedRowKeys)
        .then(res => {
          if (res.code == 200) {
            ctx.$message.success("操作成功!");
            getList(
              pageConfig.value.current,
              pageConfig.value.pageSize,
              apiGetList
            );
          } else ctx.$message.warning(res.msg);
        })
        .catch(() => ctx.$message.error("操作失败！"))
        .finally(() => {
          enabledState === 1
            ? (enableLoading.value = false)
            : (disableLoading.value = false);
          clearSelect();
        });
    };

    onMounted(() => {
      getList(pageConfig.value.current, pageConfig.value.pageSize, apiGetList);
    });

    return {
      listLoading,
      listData,
      pageConfig,
      getList,
      search,
      columns,
      rowSelection,
      handleTableChange,
      roles,
      showDevMoadl,
      accountStoreModal,
      openAccountStoreMoadl,
      closeAccountStoreModal,
      handleAccountStoreChange,
      delLoading,
      handleDelelteAccount,
      enableLoading,
      disableLoading,
      handleEnableAccount
    };
  }
};
</script>

<style lang="less" scoped>
.account-list-container {
  padding: 20px 0;
}
</style>
