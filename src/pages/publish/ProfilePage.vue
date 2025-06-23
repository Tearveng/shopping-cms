<template>
  <div>
    <a-flex justify="start" align="center" gap="middle">
      <a-avatar
        :src="formState.avatar"
        :size="{ xs: 92, sm: 92, md: 92, lg: 92, xl: 92, xxl: 92 }"
      >
        <template #icon>
          <AntDesignOutlined />
        </template>
      </a-avatar>
      <a-flex vertical>
        <a-typography-text style="font-size: 20px; font-weight: 400">{{
          formState.username
        }}</a-typography-text>
        <a-typography-text style="color: dimgrey">{{
          formState.bio
        }}</a-typography-text>

        <a :href="formState.website" target="_blank">
          <a-typography-text style="color: dimgrey; font-size: 12px">{{
            formState.website
          }}</a-typography-text></a
        >
      </a-flex>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getProfileById } from "../../services/ProfileService";
import type { Profile } from "../Profile.vue";
const props = defineProps({
  user_id: String,
});

const formState = reactive<Profile>({
  avatar: null,
  username: "",
  bio: "",
  website: "",
});

onMounted(async () => {
  // const hostname = subdomain.value;
  const profile = await getProfileById(`${props.user_id}`);
  formState.avatar = profile.profile_url;
  Object.assign(formState, profile);
});
</script>
