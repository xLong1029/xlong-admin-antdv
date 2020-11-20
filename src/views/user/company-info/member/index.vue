<template>
  <div class="member-list-container">
    <div v-if="roles.indexOf('user') < 0" class="operate-btn-container mb-20">
      <a-space size="small">
        <a-button type="primary" @click="showMemberMoadl(null, 3)"
          >添加</a-button
        >
        <a-popconfirm title="确认删除?" @confirm="showDevMoadl()">
          <a-button :disabled="selectList.length === 0">删除</a-button>
        </a-popconfirm>
        <a-button
          type="primary"
          :disabled="selectList.length === 0"
          @click="showDevMoadl"
          >启用</a-button
        >
        <a-button :disabled="selectList.length === 0" @click="showDevMoadl"
          >禁用</a-button
        >
      </a-space>
    </div>
    <a-table
      class="table-container"
      :loading="listLoading"
      :columns="columns"
      :data-source="listData"
      :row-key="record => record.objectId"
      :pagination="pagination"
      :row-selection="rowSelection"
      @change="handleTableChange"
    >
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #customTitle>
        <span>Name</span>
      </template>
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
            <a @click="showMemberMoadl(record, 2)">
              <edit-outlined class="mr-5" />编辑
            </a>
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除?" @confirm="showDevMoadl()">
              <a> <delete-outlined class="mr-5" />删除 </a>
            </a-popconfirm>
          </template>
          <template v-else>
            <a @click="showMemberMoadl(record, 1)">
              <eye-outlined class="mr-5" />查看详情
            </a>
          </template>
        </template>
        <template v-else>
          <a @click="showMemberMoadl(record, 1)">
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
import { getCurrentInstance, computed, reactive, onMounted } from "vue";
import table from "common/table.js";
import common from "common";
import Api from "api/company";
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
    const { ctx } = getCurrentInstance();

    const { showDevMoadl } = common();

    const companyId = computed(() => ctx.$store.getters.companyId);
    const roles = computed(() => ctx.$store.getters.roles);

    const {
      listLoading,
      listData,
      selectList,
      pagination,
      rowSelection,
      getList,
      search
    } = table();

    const columns = [
      {
        title: "账号",
        dataIndex: "username",
        key: "username"
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
        title: "Action",
        key: "action",
        slots: { customRender: "action" }
      }
    ];

    const memberStoreModal = reactive({
      visible: false,
      id: null,
      type: 1 // 1 查看, 2 编辑, 3 新增
    });

    const showMemberMoadl = (record, type) => {
      memberStoreModal.visible = true;
      memberStoreModal.id = record ? record.objectId : null;
      memberStoreModal.type = type;
    };

    const closeMemberStoreModal = val => {
      memberStoreModal.visible = val;
      memberStoreModal.id = null;
      memberStoreModal.type = 1;
    };

    // 表格改变事件
    const handleTableChange = (pagination, filters, sorter) => {
      console.log(pagination, filters, sorter);
      listLoading.value = true;

      getList(pagination.current, pagination.pageSize, apiGetList);
    };

    // 获取列表
    const apiGetList = (pageNo, pageSize) =>
      Api.GetMemberList({ companyId: companyId.value }, pageNo, pageSize);

    onMounted(() => {
      getList(pagination.value.current, pagination.value.pageSize, apiGetList);
    });

    return {
      listLoading,
      listData,
      selectList,
      pagination,
      getList,
      search,
      columns,
      rowSelection,
      handleTableChange,
      roles,
      showDevMoadl,
      memberStoreModal,
      showMemberMoadl,
      closeMemberStoreModal
    };
  }
};
</script>
