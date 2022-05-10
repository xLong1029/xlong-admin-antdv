<script setup>
import useCommon from "common";

const { route, router } = useCommon();

const { params, query } = route;
const { path } = params;

router.replace({ path: "/" + path, query });
</script>
