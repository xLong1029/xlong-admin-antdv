<script>
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Redirect",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const { params, query } = route;
    const { path } = params;

    router.replace({ path: "/" + path, query });
  }
};
</script>
