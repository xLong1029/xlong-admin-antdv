<template>
  <div class="app-wrapper">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LayoutFullScreen",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>
