<template>
  <Modal>
    <template #modal_body="{ closeModal }">
      <div id="sharePage">
        <div class="modal--header flex-row">
          <strong>Share</strong>
          <button
            class="close__modal__btn"
            @click="() => closeModal('share')"
            aria-label="close modal"
          >
            <svg-icon type="mdi" :path="mdiClose"></svg-icon>
          </button>
        </div>
        <div class="social--items--container flex-row">
          <Share
            :url="linkUrl"
            :title="'Important recommendation'"
            source="modifySource"
            :description="'Come watch my favorite channels with me'"
            :twitter="true"
            :QQ="false"
            :Qzone="false"
            :google="true"
            :facebook="true"
            :linkedin="true"
            class="social--item flex-row"
          >
            <span
              :title="`Share via ${network.name}`"
              :style="{ backgroundColor: network.color }"
              class="social__icon__container"
            >
              <i :class="network.icon"></i>
            </span>
            <span>{{ network.name }}</span>
          </Share>
        </div>
        <div class="modal--footer">
          <div class="modal--footer--title flex-row">
            <strong>Page Link</strong>
            <span v-show="isCopied" class="text-danger fadeEffect"
              >link copied</span
            >
          </div>
          <div class="link--zone flex-row">
            <span>{{ linkUrl }}</span>
            <button @click="() => copyLink()">
              <svg-icon type="mdi" :path="mdiContentCopy"></svg-icon>
            </button>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "../Modal.vue";
import { Share } from "vue3-social-share";
import { mdiContentCopy, mdiClose } from "@mdi/js";
export default {
  data() {
    return {
      isCopied: false,
    };
  },
  props: {
    linkUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    copyLink() {
      const link = this.linkUrl;
      const $body = document.getElementsByTagName("body")[0];
      const $tempInput = document.createElement("textarea");
      $body.appendChild($tempInput);
      $tempInput.innerHTML = link;
      $tempInput.style.whiteSpace = "pre-wrap";
      $tempInput.select();
      $tempInput.setSelectionRange(0, 99999);
      document.execCommand("copy");
      $body.removeChild($tempInput);
      this.isCopied = true;
    },
  },
  components: {
    Modal,
    Share,
  },
  setup() {
    return {
      mdiContentCopy,
      mdiClose,
    };
  },
};
</script>

<style lang="scss" scoped>
#sharePage {
  background: var(--ultra-white);
  border-radius: 0.4rem;
  overflow: hidden;
  width: 100%;
  button {
    cursor: pointer;
  }
  .close__modal__btn {
    border: none;
    padding: 0.3rem 0.4rem;
    border-radius: 0.2rem;
    background: none;
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-heavy);
    color: rgb(99, 99, 99);
    &:active {
      background: rgb(223, 223, 223);
    }
  }
  $border: 1px solid var(--gray);
  .modal--header {
    padding: 0.5rem 1rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: var(--dark);
    border-bottom: $border;
    strong {
      font-weight: 700;
    }
  }
  @media (min-width: 670px) {
    min-width: 400px;
  }
  .modal--footer {
    border-top: $border;
    padding: 1rem;
    .modal--footer--title {
      gap: 1rem 0.5rem;
      align-items: center;
    }
    .link--zone {
      align-items: center;
      justify-content: space-between;
      margin-top: 0.5rem;
      background: rgba(165, 139, 101, 0.2);
      padding: 0.3rem 0.6rem;
      border-radius: 0.2rem;
      color: var(--secondary-clr);
      font-weight: var(--font-weight-medium);
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 90%;
      }
      button {
        background: none;
        border: none;
        color: inherit;
        font-weight: var(--font-weight-heavy);
        font-size: 1.09rem;
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
        &:active {
          background: rgba(196, 196, 196, 0.4);
        }
      }
    }
  }
  .social--items--container {
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem;
    @media (max-width: 670px) {
      padding: 0.5rem;
    }
    &,
    .social--item {
      gap: 0.5rem;
      padding: 1.5rem 0;
      justify-content: center;
      align-content: center;
      text-align: center;
    }
    .social--item {
      padding: 0 0.6rem;
      color: var(--dark);
      text-decoration: none;
      row-gap: 0.3rem;
      .social__icon__container {
        border: 1px solid var(--gray);
        display: grid;
        place-content: center;
        border-radius: 50%;
        padding: 1rem 1.1rem;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        i {
          justify-self: center;
          color: var(--ultra-white);
        }
      }
    }
  }
}
</style>