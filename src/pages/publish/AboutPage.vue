<template>
  <a-flex vertical>
    <a-typography-text>About</a-typography-text>
    <a-typography-text style="color: dimgrey">{{
      formState.about
    }}</a-typography-text>
  </a-flex>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getAboutMeById } from "../../services/AboutService";
import { type AboutMe } from "../About.vue";

const formState = reactive<AboutMe>({
  about: "",
});

onMounted(async () => {
  const about = await getAboutMeById("07fea073-f8ae-4aeb-897e-1a53cf81b54e");
  Object.assign(formState, about);
});
</script>
