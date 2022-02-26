<template>
  <div id="streams" class="content no--bannaer--page full-width">
    <div class="streams--toolkit flex-row full-width">
      <div class="btns--group flex-row">
        <button
          @click="() => changeView('grid--layout')"
          :class="{ active__view: chosenLayout === 'grid--layout' }"
        >
          <svg-icon type="mdi" :path="mdiViewGridOutline"></svg-icon>
        </button>
        <button
          @click="() => changeView('stacked--layout')"
          :class="{ active__view: chosenLayout === 'stacked--layout' }"
        >
          <svg-icon type="mdi" :path="mdiViewList"></svg-icon>
        </button>
      </div>
      <div class="btns--group flex-row">
        <button @click="() => shareStreamsList()">
          <svg-icon type="mdi" :path="mdiShareVariantOutline"></svg-icon>
        </button>
        <button @click="() => changeOrder()">
          <svg-icon
            type="mdi"
            v-if="isAscOrder"
            :path="mdiSortAscending"
          ></svg-icon>
          <svg-icon type="mdi" v-else :path="mdiSortDescending"></svg-icon>
        </button>
      </div>
    </div>
    <div class="streams--list--container">
      <h2 class="page--title" v-if="categoryName">{{ categoryName }}</h2>
      <ul :class="[chosenLayout, 'streams--list--inner']">
        <li
          v-for="(stream, idx) in streamsList"
          :key="stream.stream_id || stream.name || idx"
          class="stream--item"
        >
          <StreamItem :stream="stream" :chosenLayout="chosenLayout" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import fetchData from "@/utilities/fetchData";
import StreamItem from "@/components/StreamItem/StreamItem";
import {
  mdiViewGridOutline,
  mdiViewList,
  mdiShareVariantOutline,
  mdiSortAscending,
  mdiSortDescending,
} from "@mdi/js";
import { mapActions } from "vuex";
export default {
  name: "streams",
  data() {
    return {
      dataCopy: [],
      streamsList: [],
      categoryName: "",
      chosenLayout: "grid--layout",
      isAscOrder: true,
    };
  },
  components: {
    StreamItem,
  },
  methods: {
    ...mapActions("toggleKeys", ["mutateKeys", "toggleModal"]),
    getStreamsFromCategory(categoryId, categoryName) {
      this.mutateKeys({ key: "isLoading", val: true });
      fetchData("get_live_streams")
        .then((streamsList) => {
          this.mutateKeys({ key: "isLoading", val: false });
          if (streamsList) {
            const list = streamsList.filter(
              (stream) => stream.category_id === categoryId
            );
            this.dataCopy = list;
            this.streamsList = list;
            this.categoryName = categoryName || "";
          }
        })
        .catch(() => {
          this.mutateKeys({ key: "isLoading", val: false });
        });
    },
    changeView(newViewType) {
      if (newViewType) {
        this.chosenLayout = newViewType;
      }
    },
    changeOrder() {
      this.isAscOrder = !this.isAscOrder;
    },
    shareStreamsList() {
      this.toggleModal({ type: "share" });
    },
  },
  watch: {
    "$route.params": {
      deep: true,
      immediate: true,
      handler(params) {
        params?.id && this.getStreamsFromCategory(params.id, params.name);
      },
    },
    isAscOrder(val) {
      const arrCopy = [...this.dataCopy];
      this.streamsList = arrCopy.sort(() => (val ? 1 : -1));
    },
  },
  setup() {
    return {
      mdiViewList,
      mdiViewGridOutline,
      mdiShareVariantOutline,
      mdiSortAscending,
      mdiSortDescending,
    };
  },
};
</script>

<style lang="scss">
#streams {
  .streams--toolkit {
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .btns--group {
      align-items: center;
      gap: 0.2rem;
      button {
        border: none;
        background: none;
        cursor: pointer;
        transition: background 0.3 linear;
        padding: 0.4rem;
        display: grid;
        place-items: center;
        border-radius: 0.3rem;
        svg {
          width: 24px;
          height: 24px;
          transition: color var(--trans-05);
          color: var(--text-black);
          margin: auto;
        }
        &:hover {
          background: var(--streams-clr);
        }
      }
      .active__view {
        svg {
          color: var(--primary-clr);
        }
      }
    }
  }
  .streams--list--container {
    padding: 2rem 0.3rem;

    .page--title {
      margin-bottom: 2rem;
    }
    .streams--list--inner {
      list-style: none;
      padding: 0;
    }
    $card-img-border-radius: 8px;
    .stream--title {
      display: block;
      -webkit-tap-highlight-color: transparent;
      margin-top: 0px;
      margin-bottom: 0px;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: var(--font-weight-heavy);
      padding-bottom: 4px;
      color: inherit;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
    }
    span.stream__id {
      font-size: var(--font-size-small);
      line-height: 1rem;
      text-transform: none;
      letter-spacing: normal;
      font-weight: var(--font-weight-light);
      color: var(--light-black);
    }
    .live__stream {
      position: absolute;
      bottom: 5px;
      background-color: red;
      color: #fff;
      font-size: 11px;
      border-radius: 2px;
      padding: 1px 3px;
      align-items: center;
      gap: 0.2rem;
      svg,
      span {
        color: inherit;
      }
    }
    .stream__play__icon {
      color: #fff;
    }
    // grid view
    .grid--layout {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      row-gap: 1.5rem;
      column-gap: 1.5rem;
      overflow-y: hidden;
      li.stream--item {
        --column-width: 235px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 30px -15px;
        border-radius: $card-img-border-radius;
        isolation: isolate;
        position: relative;
        transition: background-color 0.3s ease;
        width: 100%;
        background: var(--category-item-clr);
        padding: 1rem;
        cursor: pointer;
        &:hover {
          background: var(--streams-clr);
          .stream--item--inner
            .stream--cover--container
            .stream--cover--layout {
            opacity: 1;
            visibility: visible;
          }
        }
        .stream--item--inner {
          .stream--cover--container {
            border-radius: $card-img-border-radius;
            padding-bottom: 100%;
            position: relative;
            width: 100%;
            margin-bottom: 16px;
            img,
            .stream--cover--layout {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            .stream--cover--layout {
              background-color: rgba(0, 0, 0, 0.2);
              color: var(--grey);
              padding: 0.4rem;
              visibility: hidden;
              display: grid;
              place-items: center;
              z-index: 15;
              transition: 0.25s ease-in;
              transition-property: visibility, opacity;
            }
            img {
              object-fit: contain;
            }
            .live__stream {
              right: 5px;
            }
          }
        }
      }
    }
    // stacked view
    .stacked--layout {
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      li.stream--item {
        padding: 0.6rem 0.9rem;
        transition: background-color 0.3s linear;
        border-radius: 0.4rem;
        cursor: pointer;
        &:hover {
          background: var(--streams-clr);
          .stream--item--inner
            .stream--cover--container
            .stream--cover--layout {
            opacity: 1;
            visibility: visible;
          }
        }
        @media (max-width: 600px) {
          padding: 0.6rem 0.5rem;
        }
        .stream--item--inner {
          gap: 0.5rem;
          flex-wrap: nowrap;
          .stream--cover--container {
            position: relative;
            border-radius: $card-img-border-radius;
            width: 70px;
            height: 70px;
            img,
            .stream--cover--layout {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            .stream--cover--layout {
              background-color: rgba(0, 0, 0, 0.2);
              color: var(--grey);
              padding: 0.4rem;
              visibility: hidden;
              display: grid;
              place-items: center;
              z-index: 15;
              transition: 0.25s ease-in;
              transition-property: visibility, opacity;
            }
            img {
              object-fit: contain;
            }
            .live__stream {
              right: 3px;
            }
          }
          .stream__id {
            justify-self: flex-end;
            margin-left: auto;
            color: var(--lightest-gray);
          }
        }
        &,
        .stream--item--inner {
          width: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
    @media (max-width: 400px) {
      padding: 2rem 0rem;
    }
  }
}
</style>