<template>
  <div>
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
            <ShoppingHead />
          </Motion>
        </a-flex>
        <router-view />
      </a-layout>
    </a-flex>
    <div v-if="!found && !isLoading">
      <NotFound />
    </div>
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
import ShoppingHead from "./ShoppingHead.vue";

const found = ref<boolean>(true);
const isLoading = ref<boolean>(false);
</script>
