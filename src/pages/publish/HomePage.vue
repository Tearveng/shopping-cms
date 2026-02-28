<template>
  <div class="home-page" v-if="!isAdmin && !isLogin">
    <a-float-button :href="adminTelegram" target="_blank">
      <template #icon>
        <img src="/shopping-telegram-logo.svg" class="float-img" alt="icon" />
      </template>
    </a-float-button>
    <a-flex style="justify-content: center" class="responsive-padding">
      <a-layout style="width: 100%; background-color: inherit; align-items: center">
        <!-- headers  -->
        <a-flex class="sh-navigation">
          <Motion style="width:100%" :initial="{ opacity: 0, x: -100 }" :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, delay: 0.2 }">
            <ShoppingHead />
          </Motion>
        </a-flex>
        <br />
        <br />
        <router-view />
        <a-flex vertical gap="55" style="width: 100%; align-items: center; background-color: #000">
          <Motion :initial="{ opacity: 0, x: -100 }" :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, delay: 2 }">
            <ShoppingFooter />
          </Motion>
        </a-flex>
      </a-layout>
    </a-flex>
    <div v-if="!found && !isLoading">
      <NotFound />
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<style>
.float-img {
  width: 70px;
  height: 70px;
  margin-left: -25.5px;
  object-fit: cover;
  /* cover | contain depending on your need */
  border-radius: 50%;
}

.ant-float-btn {
  width: 64px;
  height: 64px
}

.ant-float-btn .ant-float-btn-body .ant-float-btn-content {
  overflow: visible;
}

.sh-navigation {
  width: 100%;
  height: auto;
  max-width: 1280px;
  padding: 0 2rem;
  justify-content: flex-start;
}

.home-page {
  background-image: url("/app-background.jpg");
  background-size: cover;
  /* 🔥 key */
  background-position: center;
  /* keep centered */
  background-repeat: no-repeat;
  /* no tiling */
  background-attachment: fixed;
  /* optional parallax */
}

@media (max-width: 575px) {
  .sh-navigation {
    padding: 0 1rem;
  }
}
</style>

<script setup lang="ts">
import { Motion } from "@motionone/vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import ShoppingFooter from "./ShoppingFooter.vue";
import ShoppingHead from "./ShoppingHead.vue";

const adminTelegram = import.meta.env.VITE_ADMIN_TELEGRAM
const found = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const route = useRoute();

const isAdmin = route.path.includes('/admin')
const isLogin = route.path.includes('/login')

console.log("route", route.path)
</script>
