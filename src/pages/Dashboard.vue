<template>
   <div>
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card>
          <template #title>
            <HomeOutlined /> Welcome to Your Dashboard
          </template>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" style="margin: 16px 16px">
      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="Works" size="small">
          <a-statistic title="Total Users" :value="1128" />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="Projects" size="small">
          <a-statistic
              title="This Month"
              :value="12589"
              prefix="$"
              :precision="2"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="Contact" size="small">
          <a-statistic title="Today" :value="89" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">

</script>