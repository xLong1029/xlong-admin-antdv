<template>
  <div class="user-center-container">
    <a-alert
      v-if="alertVisible"
      :message="`尊敬的${realName}：`"
      :description="
        `您好！欢迎您使用${systemTitle}，我们将在这里为您提供便捷的在线服务。(这里只展示3个菜单内容，其他的可自行扩展)`
      "
      type="info"
      closable
      show-icon
      :after-close="handleAlertClose"
    >
      <template #icon>
        <smile-outlined />
      </template>
    </a-alert>
    <div class="list-container mt-20">
      <a-row
        :gutter="60"
        class="list"
        :class="{
          'column-two': filterList.length % 2 === 0,
          'column-three': filterList.length % 3 === 0,
          'column-four': filterList.length % 4 === 0
        }"
      >
        <a-col
          v-for="(item, index) in filterList"
          :key="index"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="listItemNumInRow"
          :xl="listItemNumInRow"
        >
          <div class="list-item flex" @click="toPage(item.url)">
            <div class="list-item__icon flex">
              <i :class="`iconfont icon-${item.icon}`"></i>
            </div>
            <h4 class="list-item__title">{{ item.title }}</h4>
            <p class="list-item__desc">{{ item.desc }}</p>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import common from "common";

export default {
  name: "UserCenter",
  setup() {
    const store = useStore();

    const { toPage } = common();

    const menuList = [
      {
        icon: "user1",
        title: "个人信息",
        visible: true,
        desc: "您可以在这里查看或变更您的个人信息。",
        outLink: false,
        url: "/user/info",
        roles: null
      },
      {
        icon: "mima",
        title: "修改密码",
        visible: true,
        desc: "您可以在这里变更您的账号密码。",
        outLink: false,
        url: "/user/change-password",
        roles: null
      },
      {
        icon: "danwei",
        title: "单位信息",
        visible: true,
        desc: "您可以在这里查看、变更您的单位信息。",
        outLink: false,
        url: "/user/company-info",
        roles: null
      }
    ];

    const systemTitle = process.env.VUE_APP_SYSYTEM_TITLE;

    const realName = computed(() => store.getters.realName);
    const roles = computed(() => store.getters.roles);

    const listItemNumInRow = ref(6);

    const filterList = ref([]);

    const alertVisible = ref(true);

    // 获取列表一行显示几个
    const getListItemNumInRow = list => {
      if (list.length % 4 === 0) {
        return 6;
      } else if (list.length % 3 === 0) {
        return 8;
      } else {
        return 12;
      }
    };

    // 获取权限列表
    const getFilterListByRoles = roles => {
      if (!roles || !roles.length) {
        return [menuList[0]];
      }
      return menuList.filter(e => {
        if (!e.roles) return true;

        const hasPermission = roles.some(role => e.roles.includes(role));
        if (hasPermission) {
          return e;
        }
      });
    };

    // 监听list变化
    watch(
      () => menuList.value,
      val => {
        listItemNumInRow.value = getListItemNumInRow(val);
      }
    );

    // 监听角色变化
    watch(
      () => store.getters.roles,
      val => {
        filterList.value = getFilterListByRoles(val);
      }
    );

    const handleAlertClose = () => {
      alertVisible.value = false;
    };

    listItemNumInRow.value = getListItemNumInRow(menuList);
    filterList.value = getFilterListByRoles(roles.value);

    return {
      realName,
      systemTitle,
      alertVisible,
      handleAlertClose,
      filterList,
      listItemNumInRow,
      toPage
    };
  }
};
</script>
<style lang="less" scoped>
.user-center-container {
  padding: 20px 0;

  .list {
    &.column-four {
      :v-depp(.a-col) {
        border-right: #e6e6e6 1px solid;
        height: 180px;
        margin: 40px 0;

        &:nth-child(4n) {
          border-right: none;
        }
      }
    }

    &.column-three {
      :v-depp(.a-col) {
        border-right: #e6e6e6 1px solid;
        height: 180px;
        margin: 40px 0;

        &:nth-child(3n) {
          border-right: none;
        }
      }
    }

    &.column-two {
      :v-depp(.a-col) {
        border-right: #e6e6e6 1px solid;
        height: 180px;
        margin: 40px 0;

        &:nth-child(2n) {
          border-right: none;
        }
      }
    }

    &-item {
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      margin-bottom: 20px;

      &:hover {
        .list-item__title {
          color: @primary-color;
        }
      }

      &__icon {
        width: 70px;
        height: 70px;
        border: 1px solid @primary-color;
        color: @primary-color;
        align-items: center;
        justify-content: center;
        border-radius: 100px;

        .iconfont {
          font-size: 40px;
        }
      }

      &__title {
        text-align: center;
        margin-top: 20px;
        font-size: 22px;
        font-weight: normal;
        margin-bottom: 0;
      }

      &__desc {
        text-indent: 2em;
        color: #7e8998;
      }
    }
  }
}
</style>
