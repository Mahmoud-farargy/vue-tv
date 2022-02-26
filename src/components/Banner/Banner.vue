<template>
  <div class="banner">
    <div
      class="banner--bg fadeEffect"
      :style="{
        'background-image': `url(${require(`@/assets/${bgImage}`)})`,
      }"
    ></div>
    <div class="banner--content flex-column">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        bgImage: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
</style>