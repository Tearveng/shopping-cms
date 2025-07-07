<template>
  <a-flex style="justify-content: center" class="responsive-padding">
    <a-layout
      style="width: 100%; background-color: inherit; align-items: center"
    >
      <!-- headers  -->
      <a-flex class="sh-navigation"> Header </a-flex>

      <!-- shopping banner -->
      <a-flex vertical gap="55" style="width: 100%">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
        >
          <ShoppingBannerPage />
        </Motion>
      </a-flex>

      <!-- shopping top designers -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
        >
          <ShoppingTopDesigners />
        </Motion>
      </a-flex>

      <!-- feature collections -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
        >
          <ShoppingFeatureCollections />
        </Motion>
      </a-flex>

      <!-- shopping more top designers -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
        >
          <ShoppingMoreTopDesigners />
        </Motion>
      </a-flex>

      <!-- shopping editor picks -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
        >
          <ShoppingEditorPick />
        </Motion>
      </a-flex>
    </a-layout>
  </a-flex>
  <div v-if="!found && !isLoading">
    <NotFound />
  </div>
</template>

<style>
.sh-navigation {
  width: 100%;
  height: 50px;
  background-color: brown;
  max-width: 1280px;
  padding: 0 2rem;
  justify-content: center;
}
/* .responsive-padding {
  padding: 82px 62px;
} */

/* Extra small screens (xs: <576px) */
/* @media (max-width: 575px) {
  .responsive-padding {
    padding: 70px 22px 24px;
  }
} */
</style>

<script setup lang="ts">
import { Motion } from "@motionone/vue";
import { useHead } from "@vueuse/head";
import { computed, onMounted, ref } from "vue";
import { getSubdomainBySubdomain } from "../../services/SubdomainService";
import ShoppingBannerPage from "./ShoppingBannerPage.vue";
import ShoppingFeatureCollections from "./ShoppingFeatureCollections.vue";
import ShoppingTopDesigners from "./ShoppingTopDesigners.vue";
import ShoppingMoreTopDesigners from "./ShoppingMoreTopDesigners.vue";
import ShoppingEditorPick from "./ShoppingEditorPick.vue";

const user_id = ref<string>("");
const found = ref<boolean>(true);
const isLoading = ref<boolean>(false);

const subdomain = computed(() => {
  const hostname = window.location.hostname; // e.g., "sub.example.com"
  const parts = hostname.split(".");
  return parts.length > 2 ? parts[0] : ""; // Returns "sub" or empty string
});

onMounted(async () => {});
</script>
