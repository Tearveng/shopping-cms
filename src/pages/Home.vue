<template>
  <iframe
    :src="`https://${subdomain}.byveng.store`"
    title="official website"
    width="100%"
    height="900"
    style="border: none"
  ></iframe>
</template>

<script setup lang="ts">
import { computed } from "vue";
const subdomain = computed(() => {
  const hostname = window.location.hostname; // e.g., "sub.example.com"
  const parts = hostname.split(".");
  return parts.length > 2 ? parts[0] : ""; // Returns "sub" or empty string
});
</script>
