<template>
  <div id="app" :class="{ 'sidebar--lg--show': getKeys.openSidebar }">
    <!-- Modals & loaders -->
    <Modals
      v-if="
        getModals &&
        Object.keys(getModals).length > 0 &&
        Object.values(getModals).some((el) => el === true)
      "
    />
    <!-- Sidebar -->
    <Sidebar />
    <!-- Screens -->
    <Screens :pageLoading="pageLoading" />
  </div>
</template>


<script>
import Sidebar from "@/components/Sidebar/Sidebar";
import Screens from "@/components/Screens/Screens";
import { mapGetters, mapActions } from "vuex";
import * as actionTypes from "@/state/actionsTypes";
import fetchData from "@/utilities/fetchData";
import Modals from "@/components/Modals/Modals";
export default {
  data() {
    return {
      pageLoading: true,
    };
  },
  components: {
    Sidebar,
    Screens,
    Modals,
  },
  computed: {
    ...mapGetters("toggleKeys", ["getKeys", "getModals"]),
  },
  methods: {
    ...mapActions("toggleKeys", ["mutateKeys"]),
    ...mapActions("main", { updateData: actionTypes.updateData }),
    onPageFinishLoading() {
      this.pageLoading = false;
    },
  },
  watch: {
    "getKeys.isDay": {
      deep: true,
      immediate: true,
      handler(val) {
        document.documentElement.setAttribute(
          "data-theme",
          val ? "day" : "dark"
        );
      },
    },
  },
  created() {
    this.mutateKeys({
      key: "openSidebar",
      val: (window.innerWidth || document.documentElement.offsetWidth) > 900,
    });
  },
  mounted() {
    document.addEventListener("load", this.onPageFinishLoading, true);
    this.mutateKeys({ key: "isLoading", val: true });
    fetchData("get_live_categories")
      .then((res) => {
        this.mutateKeys({ key: "isLoading", val: false });
        this.getKeys.hasError && this.mutateKeys({ key: "hasError", val: false});
        this.updateData({ type: "categories", newVal: res });
      })
      .catch(() => {
        this.mutateKeys({ key: "hasError", val: true});
        this.mutateKeys({ key: "isLoading", val: false });
      });
  },
  beforeUnmount() {
    document.removeEventListener("load", this.onPageFinishLoading, true);
  },
};
</script>
