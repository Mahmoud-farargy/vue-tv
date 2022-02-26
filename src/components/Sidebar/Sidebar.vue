<template>
  <aside id="sidebar" class="flex-column">
    <div @click="() => closeSidebar()" class="logo--container flex-row">
      <RouterLink to="/">
        <div class="logo--txt flex-row">Magic</div>
      </RouterLink>
    </div>
    <div class="sidebar--inner flex-column full-width">
      <ul>
        <li
          class="sidebar--item"
          v-for="(item, idx) in menuData.list"
          :key="item.title + idx"
        >
          <Item
            :item="item"
            :showSubItem="item.title === openedSubListName"
            :changeActiveSublist="changeActiveSublist"
            :amount="item.title === 'Categories' ? getData?.categories?.length : ''"
          />
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import menuData from "@/fixtures/menu.json";
import Item from "./Item/Item.vue";
import { mapActions, mapGetters } from "vuex";
import { lowerString } from "@/utilities/utilities";
export default {
  data() {
    return {
      menuData,
      openedSubListName: "",
    };
  },
  components: {
    Item,
  },
  computed: {
    ...mapGetters("main", ["getData"]),
  },
  methods: {
    ...mapActions("toggleKeys", ["mutateKeys"]),
    closeSidebar() {
      if ((window.innerWidth || document.documentElement.offsetWidth) < 670) {
        this.mutateKeys({ key: "openSidebar", val: false });
      }
    },
    changeActiveSublist(subListTitle) {
      this.openedSubListName =
        lowerString(subListTitle) === lowerString(this.openedSubListName)
          ? ""
          : subListTitle;
    },
  },
};
</script>

<style lang="scss">
aside#sidebar#sidebar {
  user-select: none;
  position: fixed;
  left: 0px;
  right: 0px;
  flex: 0 0 var(--default-layout-size);
  z-index: var(--z-sidebar);
  order: -1;
  padding: 0;
  width: var(--default-layout-size);
  margin-left: var(--minimized-layout-size);
  height: 100%;
  background: var(--seconday-clr);
  transition: var(--trans-05);
  transition-property: width, background-color;
  overflow: hidden;
  .logo--container {
    position: sticky;
    top: 0;
    width: 100%;
    color: #fff;
    background: rgba(0, 0, 21, 0.2);
    align-content: center;
    justify-content: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    flex: 0 0 55px;
    a,
    i,
    strong,
    .logo--txt {
      color: inherit;
    }
    a {
      display: flex;
      align-items: center;
      text-decoration: none;

      i {
        font-size: var(--font-size-x-large);
        margin-right: 4px;
      }
      .logo--txt {
        flex-wrap: nowrap;
        white-space: nowrap;
        font-family: billabong;
        font-size: var(--font-size-x-large);
        color: var(--primary-clr);
        span {
          color: rgb(73, 148, 219);
        }
      }
    }
  }
  .sidebar--inner {
    padding: 0 0 1rem;
    overflow-y: auto;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    strong,
    span,
    i,
    em {
      color: var(--ultra-white);
    }
    ul {
      padding: 0;
      list-style: none;
      .sidebar--item {
        .sidebar--row{
          align-items: center;
          gap: 0.5rem;
        }
        .sidebar--item--inner {
          align-items: center;
          flex: 1 1;
          padding: 0.8445rem 1rem;
          white-space: nowrap;
          transition: 0.2s linear;
          transition-property: background, color, padding;
          color: var(--light-gray);
          i:not(.chevron__icon) {
            font-size: 1.09375rem;
          }
          i.chevron__icon {
            font-size: 17px;
          }
          span {
            text-transform: capitalize;
          }
          i,
          span {
            color: inherit;
          }
          text-decoration: none;
          &:hover {
            background: var(--lighter-gray) !important;
            color: var(--ultra-white) !important;
            padding-left: 1.3rem;
          }
        }
        .sidebar--item--inner.active__route {
          background: var(--quaternary-clr);
          color: var(--ultra-white);
          position: relative;
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            background: var(--primary-clr);
            width: 0.6rem;
            border-radius: 50%;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            height: 100%;
            box-shadow: var(--light-shadow);
          }
        }
        .parent--list {
          justify-content: space-between;
          align-items: center;
          .new__badge {
            background: var(--transparent-black);
            color: var(--primary-clr);
            box-shadow: var(--light-shadow);
          }
        }
        .active--nestedList {
          background: rgba(0, 0, 0, 0.2);
          i.chevron__icon {
            transform: rotate(-90deg);
          }
        }
        .nestedList {
          cursor: pointer;
          .nestedList--btn {
            align-items: center;
            justify-content: space-between;
          }
          .subItem--details {
            height: auto;
            max-height: 0;
            overflow-y: hidden;
            transition: max-height 0.3s ease-in-out;
            .sidebar--subItem .sidebar--item--inner {
              padding-left: 2.5rem;
            }
          }
          .active__details {
            max-height: 1500px;
          }
        }
      }
    }
  }
}
</style>