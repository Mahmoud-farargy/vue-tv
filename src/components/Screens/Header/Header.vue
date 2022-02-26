<template>
  <header
    id="Header"
    :style="{
      background: headerBackground
    }"
    :class="{ 'fill--header': (this.$route.path !== '/' || (fillHeader > 1)) }"
    class="flex-row full-width"
  >
    <div class="header--inner flex-row full-width">
      <button
        @click="() => toggleSidebar()"
        class="menu--btn"
        aria-label="menu button"
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      <ul class="flex-row">
        <!-- <li>
          <form action="javascript:" class="search-bar flex-row">
            <input type="search" name="search" placeholder="Search for streams.." pattern=".*\S.*" required />
            <button class="search-btn" type="submit">
              <span>Search</span>
            </button>
          </form>
        </li> -->
        <li>
          <ThemeChanger />
        </li>
        <li class="flex-row">
          <img
            class="profile__img rounded-circle z-depth-2"
            :src="require(`@/assets/user.jpeg`)"
            alt="user name"
          />
        </li>
      </ul>
    </div>
  </header>
  <teleport v-if="showSMUBTN" to="body">
    <div class="scroll__me__up" @click="() => scrollMeUp()">
      <button><svg-icon type="mdi" :path="mdiArrowUp"></svg-icon></button>
    </div>
  </teleport>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mdiArrowUp } from "@mdi/js";
import ThemeChanger from "./ThemeChanger/ThemeChanger.vue";
export default {
  name: "header_component",
  data() {
    return {
      fillHeader: 0,
      showSMUBTN: false,
    };
  },
  components: {
    ThemeChanger
  },
  computed: {
    ...mapGetters("toggleKeys", ["getKeys"]),
    headerBackground(){
      const { fillHeader, getKeys } = this;
      const colorNumber = getKeys.isDay ? 255 : 41;
      return `rgba(${colorNumber}, ${ colorNumber}, ${ colorNumber}, ${Math.floor(fillHeader / 2) / 100})`;
    }
  },
  methods: {
    ...mapActions("toggleKeys", { changeKeys: "mutateKeys" }),
    trackScrolling() {
      const scrollHeight = window.scrollY || document.body.scrollTop;
      if (scrollHeight < 190) {
        this.fillHeader = scrollHeight;
      }
      this.showSMUBTN = scrollHeight > 200;
    },
    toggleSidebar() {
      this.changeKeys({ key: "openSidebar" });
    },
    scrollMeUp() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },

  mounted() {
    window.addEventListener("scroll", this.trackScrolling, false);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.trackScrolling, false);
  },
  setup() {
    return {
      mdiArrowUp,
    };
  },
};
</script>

<style lang="scss" scoped>
header#Header {
  position: sticky;
  top: 0;
  left: 0px;
  padding: 0px;
  min-height: var(--height-header);
  z-index: var(--z-header);
  background: transparent;
  .header--inner {
    justify-content: space-between;
    padding: 0 1rem;
    .menu--btn {
      cursor: pointer;
      border: none;
      background: none;
      div {
        display: block;
        width: 18px;
        height: 3px;
        background-color: var(--ultra-white);
        margin-bottom: 0.2rem;
        transition: background-color var(--trans-05);
        &:nth-child(2) {
          margin-left: 0.3rem;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
      }
      &:active {
        div {
          background-color: var(--primary-clr);
        }
      }
    }
    ul {
      list-style: none;
      li {
        padding: 6.5px 8px;
        &:last-of-type {
          padding-right: 0px;
        }
      }
    }
    &,
    ul,
    li {
      align-items: center;
    }
  }
}
[data-theme='dark'] header#Header.fill--header{
    background-color: rgba(0, 0, 0, 0.4);
    .menu--btn div {
      background: rgb(223, 223, 223);
    }
}
header#Header.fill--header {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.1);
  .menu--btn div {
    transition: var(--trans-1s);
    transition-property: background-color;
    background: rgb(97, 96, 96);
  }
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 1 0px 7px 16px 1px rgba(0, 0, 0, 0.6);
  backdrop-filter: saturate(190%) blur(20px);
}
</style>