<template>
  <div id="themeSwitcher" @click="() => switchTheme()">
    <button class="full-width">
        <svg-icon v-if="!getKeys.isDay" type="mdi" :path="mdiWhiteBalanceSunny" class="light__btn__icon"></svg-icon>
        <svg-icon v-else type="mdi" :path="mdiWeatherNight" class="dark__btn__icon"></svg-icon>
    </button>
  </div>
</template>

<script>
import { mdiWhiteBalanceSunny, mdiWeatherNight } from "@mdi/js";
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
      ...mapGetters("toggleKeys", ["getKeys"])
  },
  methods: {
      ...mapActions("toggleKeys", ["mutateKeys"]),
      switchTheme(){
          this.mutateKeys({ key: "isDay" });
      }
  },
  setup() {
    return {
      mdiWhiteBalanceSunny,
      mdiWeatherNight
    };
  },
};
</script>

<style lang="scss" scoped>
#themeSwitcher {
  width: 35px;
  height: 35px;
  background: none;
  margin-right: 0.2rem;
  z-index: var(--z-theme-changer);
  cursor: pointer;
  button {
    cursor: pointer;
    border-radius: 50%;
    margin: 0.3rem 0.5rem;
    border: 1px dashed var(--primary-clr);
    background: var(--gray);
    display: grid;
    place-items: center;
    height: 100%;
    svg {
      width:20px;
      height: 20px;
      font-size: var(--font-size-medium);
      transition: color 0.2s linear;
    }
    .dark__btn__icon {
      color: #4a525f;
    }
    .light__btn__icon {
      color: pink;
    }
  }
}
</style>