<template>
  <a-flex style="justify-content: center" class="responsive-padding">
    <a-layout style="width: 100%; max-width: 600px; background-color: inherit">
      <a-flex vertical gap="55">
        <ProfilePage />
        <AboutPage />
        <WorkExperiencePage />
        <ContactPage />
      </a-flex>
    </a-layout>
  </a-flex>
</template>

<style>
.responsive-padding {
  padding: 82px 62px;
}
/* Extra small screens (xs: <576px) */
@media (max-width: 575px) {
  .responsive-padding {
    padding: 70px 22px 24px;
  }
}
</style>

<script setup lang="ts">
import { onMounted } from "vue";
import AboutPage from "./publish/AboutPage.vue";
import ContactPage from "./publish/ContactPage.vue";
import ProfilePage from "./publish/ProfilePage.vue";
import WorkExperiencePage from "./publish/WorkExperiencePage.vue";

onMounted(() => {

})
</script>
