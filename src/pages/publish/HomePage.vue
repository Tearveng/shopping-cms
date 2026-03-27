<template>
  <a-float-button
    target="_blank"
    v-if="!isAdmin && !isLogin"
    @click="(event: any) => openTelegram(event, facebookUrl)"
    class="facebook-float-button"
  >
    <template #icon>
      <img src="/shopping-facebook-logo.svg" class="facebook-img" alt="icon" />
    </template>
  </a-float-button>
  <a-float-button
    target="_blank"
    v-if="!isAdmin && !isLogin"
    @click="(event: any) => openTelegram(event, instagramUrl)"
    class="instagram-float-button"
  >
    <template #icon>
      <img
        src="/shopping-instagram-logo.svg"
        class="instagram-img"
        alt="icon"
      />
    </template>
  </a-float-button>
  <a-float-button
    target="_blank"
    v-if="!isAdmin && !isLogin"
    @click="(event: any) => openTelegram(event, tiktokUrl)"
    class="tiktok-float-button"
  >
    <template #icon>
      <img src="/shopping-tiktok-logo.svg" class="tiktok-img" alt="icon" />
    </template>
  </a-float-button>
  <a-float-button
    target="_blank"
    v-if="!isAdmin && !isLogin"
    @click="(event: any) => openTelegram(event, adminTelegram)"
    class="telegram-float-button"
  >
    <template #icon>
      <img src="/shopping-telegram-logo.svg" class="float-img" alt="icon" />
    </template>
  </a-float-button>

  <div class="home-page" v-if="!isAdmin && !isLogin">
    <a-flex style="justify-content: center" class="responsive-padding">
      <a-layout
        style="width: 100%; background-color: inherit; align-items: center"
      >
        <!-- headers  -->
        <a-flex class="sh-navigation">
          <Motion
            style="width: 100%"
            :initial="{ opacity: 0, x: -100 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, delay: 0.2 }"
          >
            <ShoppingHead />
          </Motion>
        </a-flex>
        <br />
        <br />
        <router-view />
        <a-flex
          vertical
          gap="55"
          style="
            width: 100%;
            align-items: center;
            background: #eacda3; /* fallback for old browsers */
            background: -webkit-linear-gradient(
              to right,
              #d6ae7b,
              #eacda3
            ); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(
              to right,
              #d6ae7b,
              #eacda3
            ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          "
        >
          <Motion
            :initial="{ opacity: 0, x: -100 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, delay: 2 }"
          >
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
  width: 56px;
  height: 56px;
  margin-left: -19px;
  object-fit: cover;
  /* cover | contain depending on your need */
  border-radius: 50%;
}

.facebook-img {
  width: 45px;
  height: 45px;
  margin-left: -13.5px;
  object-fit: cover;
  /* cover | contain depending on your need */
  border-radius: 50%;
}

.instagram-img {
  width: 56px;
  height: 56px;
  margin-left: -19px;
  object-fit: cover;
  /* cover | contain depending on your need */
  border-radius: 50%;
}

.tiktok-img {
  width: 40px;
  height: 40px;
  margin-left: -11px;
  object-fit: cover;
  /* cover | contain depending on your need */
  border-radius: 50%;
}

.instagram-float-button {
  margin-bottom: 75px;
}

.tiktok-float-button {
  margin-bottom: 20px;
}

.facebook-float-button {
  margin-bottom: 130px;
}

.telegram-float-button {
  margin-bottom: -35px;
}

.ant-float-btn {
  width: 50px;
  height: 50px;
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

const adminTelegram = "https://t.me/everythingl11";
const facebookUrl = "https://www.facebook.com/everythingl11bygechlang";
const instagramUrl = "https://www.instagram.com/everythingl11/";
const tiktokUrl = "https://www.tiktok.com/@everything_l11";
const found = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const route = useRoute();

const isAdmin = route.path.includes("/admin");
const isLogin =
  route.path.includes("/login") || route.path.includes("/reset-password");

const openTelegram = (event: any, url: string) => {
  event.preventDefault();
  event.stopPropagation();

  // Try multiple methods to open link
  try {
    // Method 1: Direct location change
    window.location.href = url;

    // Method 2: Open in new tab (fallback)
    setTimeout(() => {
      window.open(adminTelegram, "_blank");
    }, 100);
  } catch (error) {
    console.error("Failed to open link:", error);
    // Method 3: Last resort
    window.open(adminTelegram, "_blank");
  }
};

console.log("route", route.path);
</script>
