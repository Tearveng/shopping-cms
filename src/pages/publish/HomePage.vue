<template>
  <a-flex style="justify-content: center" class="responsive-padding">
    <a-layout
      style="width: 100%; background-color: inherit; align-items: center"
    >
      <!-- headers  -->
      <a-flex class="sh-navigation">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
        >
<<<<<<< HEAD
          <ShoppingHeaders />
=======
          <ShoppingHead />
>>>>>>> 3cf5bb91a3c49f1d3c9c76c3a3031b0009e33306
        </Motion>
      </a-flex>

      <!-- shopping banner -->
      <a-flex vertical gap="55" style="width: 100%">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.4 }"
        >
          <ShoppingBanner />
        </Motion>
      </a-flex>

      <!-- shopping top designers -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.6 }"
        >
          <ShoppingTopDesigners />
        </Motion>
      </a-flex>

      <!-- feature collections -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 0.8 }"
        >
          <ShoppingFeatureCollections />
        </Motion>
      </a-flex>

      <!-- shopping more top designers -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 1 }"
        >
          <ShoppingMoreTopDesigners />
        </Motion>
      </a-flex>

      <!-- shopping editor picks -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 1.2 }"
        >
          <ShoppingEditorPicks />
        </Motion>
      </a-flex>

      <!-- shopping live announce -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 1.4 }"
        >
          <ShoppingLiveAnnounce />
        </Motion>
      </a-flex>

      <!-- shopping in person -->
      <a-flex vertical gap="55" style="width: 100%; align-items: center">
        <Motion
          :initial="{ opacity: 0, x: -100 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay:1.6 }"
        >
          <ShoppingInPerson />
        </Motion>
      </a-flex>

      <a-flex
        vertical
        gap="55"
        style="width: 100%; align-items: center; background-color: #000"
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
</template>

<style>
.sh-navigation {
  width: 100%;
  height: auto;
  max-width: 1280px;
  padding: 0 2rem;
  justify-content: flex-start;
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
import ShoppingBanner from "./ShoppingBanner.vue";
import ShoppingEditorPicks from "./ShoppingEditorPicks.vue";
import ShoppingFeatureCollections from "./ShoppingFeatureCollections.vue";
import ShoppingFooter from "./ShoppingFooter.vue";
import ShoppingInPerson from "./ShoppingInPerson.vue";
import ShoppingLiveAnnounce from "./ShoppingLiveAnnounce.vue";
import ShoppingMoreTopDesigners from "./ShoppingMoreTopDesigners.vue";
import ShoppingTopDesigners from "./ShoppingTopDesigners.vue";
import ShoppingHead from "./ShoppingHead.vue";

const found = ref<boolean>(true);
const isLoading = ref<boolean>(false);

</script>
