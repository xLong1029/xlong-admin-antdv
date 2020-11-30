<template>
  <div class="company-info-container">
    <a-tabs v-model:active-key="activeName" type="card" class="card-container">
      <a-tab-pane v-for="item in tabs" :key="item.name" :tab="item.label">
        <component
          :ref="item.name"
          :is="item.component"
          :active-tab-name="activeName"
          :data="tabDatas[item.data]"
          :loading="pageLoading"
          :disable-edit="disableEdit"
          @change="tabContentChange"
        />
      </a-tab-pane>
    </a-tabs>
    <div class="operate-btn-container">
      <template v-if="showBaseInfoChangeBtn">
        <a-button v-if="!isChange" type="primary" @click="changeInfo(true)"
          >变更基本信息</a-button
        >
        <a-button v-else @click="changeInfo(false)">取消变更</a-button>
      </template>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref, computed, onMounted } from "vue";
import BaseInfo from "./base-info";
import MemberList from "./member";
import Api from "api/company";

export default {
  name: "CompanyInfo",
  components: { BaseInfo, MemberList },
  setup() {
    const { ctx } = getCurrentInstance();

    const pageLoading = computed(() => ctx.$store.getters.pageLoading);
    const companyId = computed(() => ctx.$store.getters.companyId);
    const showBaseInfoChangeBtn = computed(
      () =>
        activeName.value === "base" &&
        (ctx.$store.getters.roles.indexOf("admin") >= 0 ||
          ctx.$store.getters.roles.indexOf("manage") >= 0)
    );

    const tabDatas = ref({
      companyBaseInfo: {},
      companyMembers: {},
    });

    const disableEdit = ref(true);

    const tabs = [
      {
        label: "基本信息",
        name: "base",
        data: "companyBaseInfo",
        component: "BaseInfo",
      },
      {
        label: "人员信息",
        name: "member",
        data: "companyMembers",
        component: "MemberList",
      },
    ];

    const activeName = ref("base");

    // 设置页面加载Loading
    const setPageLoding = (val) => {
      ctx.$store.dispatch("app/setPageLoading", val);
    };

    // 获取单位信息
    const getCompnayInfo = () => {
      setPageLoding(true);
      Api.GetCompanyInfo(companyId.value)
        .then((res) => {
          const { code, data } = res;
          // 获取到数据
          if (code == 200) {
            tabDatas.value.companyBaseInfo = { ...data };
          } else {
            ctx.$message.error("数据获取失败，请稍后重试");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setPageLoding(false));
    };

    const isChange = ref(false);

    // 变更单位信息
    const changeInfo = (val) => {
      disableEdit.value = !val;
      isChange.value = val;
      if (!val) {
        getCompnayInfo();
      }
    };

    // tab内容改变
    const tabContentChange = (val) => {
      if (val === "变更基本信息" || val === "取消变更基本信息") {
        changeInfo(false);
        getCompnayInfo();
      }
    };

    onMounted(() => {
      getCompnayInfo();
    });

    return {
      tabs,
      activeName,
      pageLoading,
      tabDatas,
      disableEdit,
      changeInfo,
      isChange,
      tabContentChange,
      showBaseInfoChangeBtn,
    };
  },
};
</script>
<style lang="less" scoped>
.company-info-container {
  padding: 20px 0;
  overflow: hidden;
  position: relative;
}

.card-container {
  ::v-deep(.ant-tabs-tab) {
    border: none !important;
  }

  ::v-deep(.ant-tabs-content) {
    min-height: calc(100vh - 360px);
    margin-top: -16px;
  }

  ::v-deep(.ant-tabs-bar) {
    border-color: #fff;
    margin-top: 0 !important;
  }

  ::v-deep(.ant-tabs-tabpane) {
    background: #fff;
    padding: 16px;
    border-radius: 0 0 4px 4px;
  }
}

.operate-btn-container {
  position: absolute;
  right: 0;
  top: 20px;
}
</style>
