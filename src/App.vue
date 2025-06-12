<template>
  <router-view />
</template>

<style scoped>
</style>

<script setup lang="ts">
import { message } from 'ant-design-vue'

const showMessage = () => {
 message.success('Hello from ant design vue!')
}
</script>
