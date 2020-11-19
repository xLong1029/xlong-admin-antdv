<template>
  <div class="company-info-container">
    <a-tabs type="card" class="card-container">
      <a-tab-pane v-for="item in tabs" :key="item.label" :tab="item.label">
        <component
          :ref="item.name"
          :is="item.component"
          :active-tab-name="activeName"
          :data="tabDatas[item.data]"
          :loading="pageLoading"
          :disable-edit="disableEdit"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { getCurrentInstance, ref, computed } from "vue";
import BaseInfo from "./base-info";
import Member from "./member";
import Api from "api/company";

export default {
  name: "CompanyInfo",
  components: { BaseInfo, Member },
  setup() {
    const { ctx } = getCurrentInstance();

    const pageLoading = computed(() => ctx.$store.getters.pageLoading);
    const companyId = computed(() => ctx.$store.getters.companyId);

    const tabDatas = ref({
      companyBaseInfo: {},
      companyMembers: {}
    });

    const disableEdit = ref(true);

    const tabs = [
      {
        label: "基本信息",
        name: "base",
        data: "companyBaseInfo",
        component: "BaseInfo"
      },
      {
        label: "人员信息",
        name: "member",
        data: "companyMembers",
        component: "Member"
      }
    ];

    const activeName = ref("base");

    // 设置页面加载Loading
    const setPageLoding = val => {
      ctx.$store.dispatch("app/setPageLoading", val);
    };

    // 获取单位信息
    const getCompnayInfo = () => {
      setPageLoding(true);
      Api.GetCompanyInfo(companyId.value)
        .then(res => {
          const { code, data } = res;
          // 获取到数据
          if (code == 200) {
            tabDatas.value.companyBaseInfo = { ...data };
          } else {
            ctx.$message.error("数据获取失败，请稍后重试");
          }
        })
        .catch(err => console.log(err))
        .finally(() => setPageLoding(false));
    };

    getCompnayInfo();

    return {
      tabs,
      activeName,
      pageLoading,
      tabDatas,
      disableEdit
    };
  }
};
</script>
<style lang="less" scoped>
.company-info-container {
  padding: 20px 0;
  overflow: hidden;
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
</style>
