<template>
  <div id="screens">
    <!-- backdrops & modals -->
    <div class="modal--backdrop" @click="() => closeSidebar()"></div>
    <div
      v-if="getKeys.isLoading || pageLoading"
      class="screen--loading flex-column"
    >
      <span></span>
    </div>
    <!-- header -->
    <Header />
    <!-- views -->
    <main id="mainViews">
      <router-view v-slot="{ Component }">
        <transition name="scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./Header/Header.vue";
import Footer from "./Footer/Footer.vue";
export default {
  props: {
    pageLoading: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters("toggleKeys", ["getKeys"]),
  },
  methods: {
    ...mapActions("toggleKeys", ["mutateKeys"]),
    closeSidebar() {
      this.mutateKeys({ key: "openSidebar", val: false });
    },
  },
};
</script>

<style lang="scss" scoped>
div#screens {
  position: relative;
  width: auto;
  margin-left: 0px;
  min-width: 150px;
  background-color: var(--ultra-white);
  transition: var(--trans-05) !important;
  transition-property: margin-left, background-color;
  .modal--backdrop {
    display: none;
    z-index: var(--z-backdrop);
  }
  main#mainViews {
    width: 100%;
    margin-top: calc(-1 * var(--height-header));
    overflow: hidden;
    min-height: calc(
      100vh - var(--height-footer) - 1rem
    );
  }
}
</style>