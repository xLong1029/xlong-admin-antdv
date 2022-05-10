<template>
  <div class="breadcrumb-container">
    <div class="wrapper-container">
      <div class="breadcrumb-container-wrapper">
        <span class="fl">当前位置：</span>
        <a-breadcrumb>
          <a-breadcrumb-item
            v-for="(item, index) in levelList"
            :key="item.path"
          >
            <span
              v-if="
                item.redirect === 'noRedirect' || index == levelList.length - 1
              "
              class="no-redirect"
              >{{ item.meta.title }}</span
            >
            <a v-else @click.prevent="handleLink(item)">
              {{ item.meta.title }}
            </a>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <a-button v-if="$route.meta.needBack" class="back-btn" @click="onGoBack"
        >返回</a-button
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import useCommon from "common";

const { onGoBack, router } = useCommon();

// 监听路由变化
watch(
  () => router.currentRoute.value,
  (val) => {
    if (val.path.startsWith("/redirect/")) {
      return;
    }
    getBreadcrumb();
  }
);

const levelList = ref([]);

onMounted(() => {
  getBreadcrumb();
});

// 判断是否为首页
const isHome = (route) => {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase();
};

// 获取面包屑
const getBreadcrumb = () => {
  let matched = router.currentRoute.value.matched.filter(
    (item) => item.meta && item.meta.title
  );
  const first = matched[0];
  if (!isHome(first)) {
    matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
  }
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};

// 页面跳转
const handleLink = (item) => {
  const { redirect, path } = item;

  if (redirect) {
    router.push(redirect);
    return;
  }

  router.push(path);
};
</script>

<style lang="less" scoped>
.breadcrumb {
  &-container {
    position: relative;
    z-index: 50;
    background: #e4e4e4;
    padding: 10px 0;
  }
}

.back-btn {
  position: absolute;
  right: 15px;
  top: -5px;
}
</style>
