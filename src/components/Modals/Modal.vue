<template>
  <div class="modal--popup">
    <div id="modalContent" class="flex-column fadeEffect">
      <!-- Modal body -->
      <slot name="modal_body" :closeModal="closeModal"></slot>
    </div>
    <div class="backdrop" @click="() => closeModal('closeAll')"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("toggleKeys", ["getKeys"]),
  },
  methods: {
    ...mapActions("toggleKeys", ["toggleModal"]),
    closeModal(type) {
      this.toggleModal({ type });
    },
  },
  mounted() {
    document.documentElement.style.overflowY = "hidden";
  },
  beforeUnmount() {
    document.documentElement.style.overflowY = "visible";
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  z-index: var(--z-backdrop);
}
#modalContent {
  z-index: var(--z-modal);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-content: center;
  padding: 0;
  margin: 0;
  width: 80%;
  max-width: 500px;
}
</style>