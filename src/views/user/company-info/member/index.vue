<template>
  <div class="member-container">
    <a-table
      :loading="listLoading"
      :columns="columns"
      :data-source="listData"
      :row-key="record => record.objectId"
      :pagination="pagination"
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
          <a-tag v-if="role === 'admin'" color="blue" class="mr-10">超级管理员</a-tag>
          <a-tag v-if="role === 'manage'" color="green" class="mr-10">系统管理员</a-tag>
          <a-tag v-if="role === 'user'" color="orange" class="mr-10">普通用户</a-tag>
        </span>
      </template>
      <template #action="{ text, record }">
        <span>
          <a>
            <eye-outlined class="mr-5" />查看详情
          </a>
          <a-divider type="vertical" />
          <a>
            <delete-outlined class="mr-5" />删除
          </a>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getCurrentInstance, computed } from "vue";
import table from "common/table.js";
import Api from "api/company";

export default {
  name: "Member",
  setup() {
    const { ctx } = getCurrentInstance();

    const companyId = computed(() => ctx.$store.getters.companyId);

    const {
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

    const handleTableChange = (pagination, filters, sorter) => {
      listLoading.value = true;
      console.log(pagination, filters, sorter);

      getList(pagination.current, pagination.pageSize, apiGetList);
    };

    // 获取列表
    const apiGetList = (pageNo, pageSize) =>
      Api.GetMemberList({ companyId: companyId.value }, pageNo, pageSize);

    getList(pagination.value.current, pagination.value.pageSize, apiGetList);

    return {
      listLoading,
      listData,
      selectList,
      pagination,
      getList,
      getSelectList,
      clearSelect,
      setPage,
      search,
      columns,
      handleTableChange
    };
  }
};
</script>
<style lang="less" scoped>
.member-container {
}
</style>
