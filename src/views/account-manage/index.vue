<template>
  <div class="account-list-container">
    <div class="operate-btn-container mb-20">
      <a-space size="small">
        <a-button type="primary" @click="openAccountStoreMoadl(null, 3)"
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
      :scroll="{ x: 1130 }"
      :loading="listLoading"
      :columns="columns"
      :data-source="listData"
      :row-key="record => record.objectId"
      :pagination="pagination"
      :row-selection="rowSelection"
      @change="handleTableChange"
    >
      <template #provinceAndCity="{ record }">
        <span>{{ record.province }}</span>
        <span v-if="record.city">/ {{ record.city }}</span>
      </template>
      <template #action="{ record }">
        <a @click="openAccountStoreMoadl(record, 2)">
          <edit-outlined class="mr-5" />编辑
        </a>
        <a-divider type="vertical" />
        <a-popconfirm title="确认删除?" @confirm="showDevMoadl()">
          <a> <delete-outlined class="mr-5" />删除 </a>
        </a-popconfirm>
      </template>
    </a-table>
    <account-store
      v-model:visible="accountStoreModal.visible"
      :id="accountStoreModal.id"
      :type="accountStoreModal.type"
      @close="closeAccountStoreModal"
    />
  </div>
</template>

<script>
import { getCurrentInstance, computed, reactive, onMounted } from "vue";
import table from "common/table.js";
import common from "common";
import Api from "api/account-manage";
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
      selectList,
      pagination,
      rowSelection,
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
      type: 1 // 1 查看, 2 编辑, 3 新增
    });

    const openAccountStoreMoadl = (record, type) => {
      accountStoreModal.visible = true;
      accountStoreModal.id = record ? record.objectId : null;
      accountStoreModal.type = type;
    };

    const closeAccountStoreModal = val => {
      accountStoreModal.visible = val;
      accountStoreModal.id = null;
      accountStoreModal.type = 1;
    };

    // 表格改变事件
    const handleTableChange = (pagination, filters, sorter) => {
      console.log(pagination, filters, sorter);
      listLoading.value = true;

      getList(pagination.current, pagination.pageSize, apiGetList);
    };

    // 获取列表
    const apiGetList = (pageNo, pageSize) =>
      Api.GetAccList({}, pageNo, pageSize);

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
      accountStoreModal,
      openAccountStoreMoadl,
      closeAccountStoreModal
    };
  }
};
</script>

<style lang="less" scoped>
@height: calc(100vh - 270px);
.account-list-container {
  padding: 20px 0;
}

.account-detail {
  &-container {
    height: @height;
    display: flex;
  }

  &__left {
    min-width: 120px;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: 2px;
      height: 100%;
      background-color: #dfe4ed;
      z-index: 1;
    }
  }

  &__right {
    width: 100%;
  }

  &-tab {
    min-width: 120px;
    /deep/ .el-tabs__nav {
      height: @height;
      min-width: 120px;
    }
    /deep/ .el-tabs__item.is-left {
      text-align: center;
    }

    /deep/ .el-tabs__item.is-active {
      background-color: #def7f3;
    }

    /deep/ .el-tabs__header.is-left {
      margin-right: 15px;
    }

    &__content {
      height: @height;
      padding-right: 10px;
      overflow-y: auto;
    }
  }

  &-content {
    height: @height;
    overflow-y: auto;
    padding-right: 10px;

    &__title {
      font-size: 16px;
      margin-bottom: 10px;
      font-weight: bold;
      // color: $color-primary;
    }

    &__cont {
      margin-bottom: 20px;
    }
  }
}

@border: 1px solid #ebeef5;
.info-table {
  width: 100%;
  border-top: @border;
  border-left: @border;

  &-container {
    height: 100%;
    min-height: 400px;
  }

  &__tr {
    display: flex;
  }

  &__th,
  &__td {
    padding: 12px 10px;
    border-bottom: @border;
    border-right: @border;
  }

  &__td {
    padding-bottom: 0;
  }

  &__th {
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #fafafa;
    width: 135px;
    min-width: 135px;
    max-width: 135px;
  }

  &__td {
    width: 100%;
  }

  &__icon {
    font-size: 20px;
  }
}

.color-green {
  color: @green;
}

.color-red {
  color: @red;
}

.head-pic {
  text-align: center;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    .img-shade-actions {
      opacity: 1;
    }
  }

  img {
    min-width: 100px;
    max-width: 100px;
    max-height: 138px;
  }
}

.align-item-center {
  display: flex;
  align-items: center;
}

.img-shade {
  position: relative;
  width: 100%;
  height: 100%;

  &-thumbnail {
    width: 100%;
    height: 100%;
    // cursor: pointer;
  }

  &-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    color: #fff;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;

    &-btn {
      cursor: pointer;
    }

    /deep/ .el-upload:focus {
      color: #fff;
    }
  }
}

.required::before {
  content: "*";
  color: @pink;
  margin-right: 5px;
}
</style>
