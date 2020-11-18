<template>
  <div class="user-center-container">
    <a-alert
      v-if="alertVisible"
      :message="`尊敬的${realName}：`"
      :description="
        `您好！欢迎您使用${systemTitle}，我们将在这里为您提供便捷的在线服务。`
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
          'column-two': list.length % 2 === 0,
          'column-three': list.length % 3 === 0,
          'column-four': list.length % 4 === 0
        }"
      >
        <a-col
          v-for="(item, index) in list"
          :key="index"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="listItemNumInRow"
          :xl="listItemNumInRow"
        >
          <div class="list-item flex" @click="toPage(item)">
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
import { getCurrentInstance, computed, ref, watch } from "vue";

export default {
  name: "UserCenter",
  setup() {
    const { ctx } = getCurrentInstance();

    const listItemNumInRow = ref(6);

    const list = [
      {
        icon: "user1",
        title: "个人信息",
        visible: true,
        desc: "可以查看或变更您的个人信息。",
        outLink: false,
        url: "/user/info"
      },
      {
        icon: "mima",
        title: "修改密码",
        visible: true,
        desc: "可以变更您的账号密码。",
        outLink: false,
        url: "/user/change-password"
      }
    ];

    const systemTitle = process.env.VUE_APP_SYSYTEM_TITLE;

    const realName = computed(() => ctx.$store.getters.realName);

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

    watch(
      () => list.value,
      val => {
        listItemNumInRow.value = getListItemNumInRow(val);
      }
    );

    const handleAlertClose = () => {
      alertVisible.value = false;
    };

    listItemNumInRow.value = getListItemNumInRow(list);

    return {
      realName,
      systemTitle,
      alertVisible,
      handleAlertClose,
      list,
      listItemNumInRow
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
