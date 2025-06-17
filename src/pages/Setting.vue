<template>
  <a-form
    @finish="onFinish"
    ref="formRef"
    style="padding: 20px"
    :rules="rules"
    :model="formState"
  >
    <a-space direction="vertical" size="middle" style="width: 100%">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <a-typography-text>Settings</a-typography-text>
        <a-button type="primary" danger ghost @click="logoutUser">Logout</a-button>
      </div>
      <a-space direction="vertical" style="width: 100%">
        <a-typography-text>Publish URL:</a-typography-text>
        <a-form-item
          name="username"
          style="margin-bottom: -16px; max-width: 400px"
        >
          <a-input
            v-model:value="formState.subdomain"
            placeholder="Subdomain"
            addon-after="portfolio.byveng.store"
          />
        </a-form-item>
        <div style="display: flex; flex-wrap: wrap;">
          <a-typography-text style="margin-right: 10px"
            >Redirect URL:</a-typography-text
          >
          <a
            style="text-decoration: underline;"
            :href="`https://${formState.subdomain}.portfolio.byveng.store`"
            target="_blank"
            >{{ `https://${formState.subdomain}.portfolio.byveng.store` }}</a
          >
        </div>
      </a-space>
      <a-space>
        <!-- <a-button @click="resetForm">Reset</a-button> -->
        <a-button type="primary" html-type="submit" :loading="isLoading"
          >Save</a-button
        >
      </a-space>
    </a-space>
  </a-form>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import router from "../router";
import {
getSubdomainById,
insertSubdomain,
updateSubdomainById,
} from "../services/SubdomainService";
import { useAuthStore } from "../stores/auth";

interface PublishUrl {
  id: number | null;
  subdomain: string;
}

const rules = {
  subdomain: [
    {
      required: true,
      message: "About me is required",
      trigger: "change",
    },
  ],
};

const auth = useAuthStore();
const isLoading = ref(false);
const formRef = ref();
const formState = reactive<PublishUrl>({
  id: null,
  subdomain: "",
});

// Reset form
// const resetForm = () => {
//   formRef.value.resetFields();
// };

const success = () => {
  message.success("Created successfully", 5);
};

const updated = () => {
  message.success("Updated successfully", 5);
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

const logoutUser = () => {
  auth
    .signOut()
    .then(() => router.push('/login'))
    .catch((e) => errors(e))
    .finally();
};

const onFinish = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        isLoading.value = true;
        if (formState.id) {
          updateSubdomainById(`${auth.user?.id}`, {
            id: formState.id,
            subdomain: formState.subdomain,
          })
            .then(() => updated())
            .catch((e) => errors(e))
            .finally(() => {
              isLoading.value = false;
            });
        } else {
          insertSubdomain({
            subdomain: formState.subdomain,
            user_id: `${auth.user?.id}`,
          })
            .then(() => success())
            .catch((e) => errors(e))
            .finally(() => {
              isLoading.value = false;
            });
        }
      })
      .catch((error: any) => {
        errors(error);
        console.log("error", error);
      });
  }
};

onMounted(async () => {
  if (auth.user) {
    const subdomain = await getSubdomainById(auth.user.id);
    Object.assign(formState, subdomain);
  }
});
</script>
