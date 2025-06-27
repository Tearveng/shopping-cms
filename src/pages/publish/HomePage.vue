<template>
  <a-flex style="justify-content: center" class="responsive-padding">
    <a-layout style="width: 100%; max-width: 600px; background-color: inherit">
      <a-flex vertical gap="55" v-if="user_id">
        <ProfilePage :user_id="user_id" />
        <AboutPage :user_id="user_id" />
        <WorkExperiencePage :user_id="user_id" />
        <EducationPage :user_id="user_id" />
        <ProjectPage :user_id="user_id" />
        <LanguagePage :user_id="user_id" />
        <ContactPage :user_id="user_id" />
      </a-flex>
      <div
        v-if="isLoading"
        style="
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <a-button type="ghost" loading>Loading</a-button>
      </div>
    </a-layout>
  </a-flex>
  <div v-if="!found && !isLoading">
    <NotFound />
  </div>
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
import { useHead } from "@vueuse/head";
import { computed, onMounted, ref } from "vue";
import { getSubdomainBySubdomain } from "../../services/SubdomainService";
import AboutPage from "./AboutPage.vue";
import ContactPage from "./ContactPage.vue";
import EducationPage from "./EducationPage.vue";
import LanguagePage from "./LanguagePage.vue";
import ProfilePage from "./ProfilePage.vue";
import ProjectPage from "./ProjectPage.vue";
import WorkExperiencePage from "./WorkExperiencePage.vue";

const user_id = ref<string>("");
const found = ref<boolean>(true);
const isLoading = ref<boolean>(true);

const subdomain = computed(() => {
  const hostname = window.location.hostname; // e.g., "sub.example.com"
  const parts = hostname.split(".");
  return parts.length > 2 ? parts[0] : ""; // Returns "sub" or empty string
});

useHead({
  title: `Portfolio | ${subdomain.value} `,
  meta: [
    {
      name: "description",
      content:
        "A personal portfolio highlighting professional work, creative projects, and technical skills in web development and design. Explore my work today.",
    },
    {
      name: "keywords",
      content: "portfolio, programming, seo, developer, frontend, Veng Tear",
    },
    { property: "og:title", content: `Portfolio | ${subdomain.value} ` },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `https://${subdomain.value}.byveng.store` },
    { property: "og:image", content: `https://${subdomain.value}.byveng.store/lemon-logo.svg` },
    {
      property: "og:description",
      content:
        "A personal portfolio highlighting professional work, creative projects, and technical skills in web development and design. Explore my work today.",
    },
    { name: "robots", content: "index, follow" },
  ],
  link: [{ rel: "canonical", href: `https://${subdomain.value}.byveng.store` }],
});

onMounted(async () => {
  const subdomainn = await getSubdomainBySubdomain(subdomain.value);
  if (subdomainn) {
    user_id.value = subdomainn.user_id;
    isLoading.value = false;
  } else {
    found.value = false;
    isLoading.value = false;
  }
});
</script>
