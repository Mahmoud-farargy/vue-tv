<template>
  <div class="stream--item--inner">
    <div class="stream--cover--container">
      <div class="stream--cover--layout" aria-label="layout">
        <svg-icon
          type="mdi"
          :path="mdiPlay"
          :size="chosenLayout === 'grid--layout' ? 50 : 30"
          class="stream__play__icon"
        ></svg-icon>
      </div>
      <img
        ref="streamImg"
        :src="stream.stream_icon || defaultImg"
        loading="lazy"
        :alt="stream.name"
      />
      <div class="live__stream flex-row" v-if="stream.stream_type === 'live'">
        <svg-icon type="mdi" :path="mdiAccessPoint" :size="11"></svg-icon>
        <span>live</span>
      </div>
    </div>
    <div class="stream--title" :title="stream.name">{{ stream.name }}</div>
    <span class="stream__id">{{ stream.stream_id }}</span>
  </div>
</template>

<script>
import defaultImg from "../../assets/channels/default.png";
import { mdiPlay, mdiAccessPoint } from "@mdi/js";

export default {
  name: "stream_item",
  data() {
    return {
      defaultImg,
    };
  },
  props: {
    stream: {
      type: Object,
      required: true,
      default: () => {},
    },
    chosenLayout: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const imgRef = this.$refs?.streamImg;
    if (imgRef) {
      imgRef.addEventListener("error", () => {
        imgRef.src = defaultImg;
      });
    }
  },
  setup() {
    return {
      mdiPlay,
      mdiAccessPoint,
    };
  },
};
</script>