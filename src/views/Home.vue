<template>
  <div id="home">
    <div class="banner">
      <div
        class="banner--bg"
        :style="{
          'background-image': `url(${require('@/assets/hero-1920x1080.webp')})`,
        }"
      ></div>
      <div class="banner--content flex-column">
        <h1>
          <span class="first__line">All your streaming services</span>
          <br/>
          <span class="second__line">in one place</span>
        </h1>
      </div>
    </div>
    <div class="content">
      <!-- channels -->
      <div class="channels--container">
        <h4 class="section--title">Channels</h4>
        <carousel
          :settings="settings"
          :breakpoints="breakpoints"
          :autoplay="6000"
        >
          <slide
            v-for="channel in channels"
            :key="channel.title"
            :title="channel.title"
          >
            <div class="channel--item">
              <img
                loading="lazy"
                :src="require(`../assets/channels/${channel.imgPath}.png`)"
                :alt="`${channel.title} channel`"
              />
            </div>
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
      <!-- Categories -->
      <div class="categories--container">
        <h4 class="section--title">Live categories</h4>
        <p v-if="getData.hasError" class="text-danger">An error occurred while loading Categories. Please try again later.</p>
        <ul else class="categories--list flex-row">
          <li
            v-for="(category, idx) in getData.categories"
            :key="category.category_id || idx"
            class="cate__item__container"
          >
            <CategoryItem :item="category" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { mapGetters } from "vuex";
import CategoryItem from "@/components/CategoryItem/CategoryItem";
import channels from "@/fixtures/channels.json";
export default {
  name: "Home",
  data() {
    return {
      channels,
      settings: {
        snapAlign: "center",
      },
      breakpoints: {
        200: {
          itemsToShow: 1,
        },
        300: {
          itemsToShow: 2,
        },
        500: {
          itemsToShow: 3,
        },
        700: {
          itemsToShow: 7,
        },
        1024: {
          itemsToShow: 9,
        },
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    CategoryItem,
  },
  computed: {
    ...mapGetters("main", ["getData"]),
  },
};
</script>
<style lang="scss" scoped>
#home {
  .content {
    margin-top: -10rem;
    .channels--container {
      user-select: none;
      .section--title {
        padding-bottom: 0;
      }
    }
    .categories--container {
      margin: 1.5rem 0;     
      @media (max-width: 670px){
        padding: 0 0.4rem;
        .section--title{
          margin-bottom: 1rem;
        }
      }
    }
    ul.categories--list {
      list-style: none;
      padding: 0.3rem 0;
      gap: 2rem;
      flex-wrap: wrap;
      li.cate__item__container {
        padding: 0;
        margin: 0;
        max-width: 170px;
        @media (max-width: 570px) {
          max-width: none;
          width: 100%;
        }
      }
    }

    .channel--item {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      overflow: hidden;
      padding: 0.6rem;
      background: #f6f5f5;
      border: 1px solid #ffffff;
      cursor: pointer;
      display: grid;
      place-items: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}   
[data-theme='dark'] #mainViews #home .content .channel--item {
      background: rgb(31, 30, 30);
      border: 1px solid rgb(54, 53, 53);
}
</style>
