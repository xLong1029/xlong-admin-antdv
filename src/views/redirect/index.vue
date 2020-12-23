<script>
import common from "common";

export default {
  name: "Redirect",

  setup() {
    const { route, router } = common();

    const { params, query } = route;
    const { path } = params;

    router.replace({ path: "/" + path, query });
  }
};
</script>
