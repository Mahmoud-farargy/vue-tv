<template>
  <div id="modals">
    <share v-if="modalsState.share" :linkUrl="currentUrl" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Share from "./Share/Sharee.vue";

export default {
  name: "Modal",
  components: {
    Share,
  },
  computed: {
    ...mapGetters("toggleKeys", { modalsState: "getModals" }),
    currentUrl() {
      return window.location.href || "";
    },
  },
};
</script>

<style lang="scss" scoped>
#modals {
  position: relative;
}
</style>