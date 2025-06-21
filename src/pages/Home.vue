<template>
  <!-- <div>
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card>
          <template #title>
            <HomeOutlined /> Welcome to Your Dashboard
          </template>
          <p>This is the home page of your Vue 3 + Ant Design application.</p>
          <a-button type="primary" @click="navigateToAbout">
            Learn More
          </a-button>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" style="margin-top: 16px;">
      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="Quick Stats" size="small">
          <a-statistic title="Total Users" :value="1128" />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="Revenue" size="small">
          <a-statistic
              title="This Month"
              :value="12589"
              prefix="$"
              :precision="2"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="Orders" size="small">
          <a-statistic title="Today" :value="89" />
        </a-card>
      </a-col>
    </a-row>
  </div> -->
   <iframe
    :src="`https://${subdomain}.byveng.store`"
    width="100%"
    max-height="1000"
    style="border: none"
  ></iframe>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const subdomain = computed(() => {
  const hostname = window.location.hostname; // e.g., "sub.example.com"
  const parts = hostname.split(".");
  return parts.length > 2 ? parts[0] : ""; // Returns "sub" or empty string
});
</script>