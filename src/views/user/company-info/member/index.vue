<template>
  <div class="member-list-container">
    <div v-if="roles.indexOf('user') < 0" class="operate-btn-container mb-20">
      <a-alert
        description="本页只做布局展示，若要测试增、删、改、查等功能请移步到“账户管理”页面进行操作"
        type="info"
        class="mb-20"
      >
        <template #icon>
          <smile-outlined />
        </template>
      </a-alert>
      <a-space size="small">
        <a-button type="primary" @click="openMemberStoreMoadl(null, 1)"
          >添加</a-button
        >
        <a-popconfirm title="确认删除?" @confirm="showDevModal()">
          <a-button :disabled="rowSelection.selectedRowKeys.length === 0"
            >删除</a-button
          >
        </a-popconfirm>
        <a-button
          type="primary"
          :disabled="rowSelection.selectedRowKeys.length === 0"
          @click="showDevModal"
          >启用</a-button
        >
        <a-button
          :disabled="rowSelection.selectedRowKeys.length === 0"
          @click="showDevModal"
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
      <template #role="{ text: role }">
        <span>
          <a-tag v-if="role === 'admin'" color="blue" class="mr-10"
            >超级管理员</a-tag
          >
          <a-tag v-if="role === 'manage'" color="green" class="mr-10"
            >系统管理员</a-tag
          >
          <a-tag v-if="role === 'user'" color="orange" class="mr-10"
            >普通用户</a-tag
          >
        </span>
      </template>
      <template #action="{ record }">
        <template v-if="roles.indexOf('user') < 0">
          <template
            v-if="
              roles.indexOf('admin') >= 0 ||
                roles.indexOf(record.role) >= 0 ||
                record.role === 'user'
            "
          >
            <a @click="openMemberStoreMoadl(record, 2)">
              <edit-outlined class="mr-5" />编辑
            </a>
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除?" @confirm="showDevModal()">
              <a> <delete-outlined class="mr-5" />删除 </a>
            </a-popconfirm>
          </template>
          <template v-else>
            <a @click="openMemberStoreMoadl(record, 3)">
              <eye-outlined class="mr-5" />查看详情
            </a>
          </template>
        </template>
        <template v-else>
          <a @click="openMemberStoreMoadl(record, 3)">
            <eye-outlined class="mr-5" />查看详情
          </a>
        </template>
      </template>
    </a-table>
    <member-store
      v-model:visible="memberStoreModal.visible"
      :id="memberStoreModal.id"
      :type="memberStoreModal.type"
      @close="closeMemberStoreModal"
    />
  </div>
</template>

<script>
import { computed, reactive, onMounted } from "vue";
// 通用模块
import table from "common/table.js";
import common from "common";
// Api
import Api from "api/company";
// 组件
import MemberStore from "./store.vue";

export default {
  name: "MemberList",

  components: { MemberStore },

  emits: {
    close: val => {
      console.log(8888, val);
      return true;
    }
  },

  setup() {
    const { store, showDevModal } = common();

    // 企业Id
    const companyId = computed(() => store.getters.companyId);
    // 当前角色
    const roles = computed(() => store.getters.roles);

    // 表格配置
    const {
      listLoading,
      listData,
      pageConfig,
      rowSelection,
      getList,
      search
    } = table();

    // 表格列
    const columns = [
      {
        title: "账号",
        dataIndex: "username",
        key: "username",
        width: 150,
        fixed: "left"
      },
      {
        title: "真实姓名",
        dataIndex: "realName",
        key: "realName"
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender"
      },
      {
        title: "角色",
        key: "role",
        dataIndex: "role",
        slots: { customRender: "role" }
      },
      {
        title: "操作",
        key: "action",
        slots: { customRender: "action" },
        width: 150,
        fixed: "right"
      }
    ];

    // 人员信息存储弹窗
    const memberStoreModal = reactive({
      visible: false,
      id: null,
      type: 1 // 1 新增, 2 编辑, 3 查看
    });

    // 打开人员信息弹窗
    const openMemberStoreMoadl = (record, type) => {
      memberStoreModal.visible = true;
      memberStoreModal.id = record ? record.objectId : null;
      memberStoreModal.type = type;
    };

    // 关闭人员信息弹窗
    const closeMemberStoreModal = val => {
      memberStoreModal.visible = val;
      memberStoreModal.id = null;
      memberStoreModal.type = 1;
    };

    // 表格改变事件
    const handleTableChange = (pagination, filters, sorter) => {
      console.log(pagination, filters, sorter);

      getList(pagination.current, pagination.pageSize, apiGetList);
    };

    // 获取列表
    const apiGetList = (pageNo, pageSize) =>
      Api.GetMemberList({ companyId: companyId.value }, pageNo, pageSize);

    // 初始化
    onMounted(() => {
      getList(pageConfig.current, pageConfig.pageSize, apiGetList);
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
      showDevModal,
      memberStoreModal,
      openMemberStoreMoadl,
      closeMemberStoreModal
    };
  }
};
</script>
