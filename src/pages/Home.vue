<template>
  <iframe
    :src="pro_link"
    title="official website"
    width="100%"
    height="900"
    style="border: none"
  ></iframe>
</template>

<script setup lang="ts">
const pro_link = import.meta.env.VITE_PRODUCTION_LINK
</script>
