<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 50px;
    "
  >
    <a-typography-title :level="2">Login</a-typography-title>
    <div style="width: 100%; max-width: 500px">
      <a-form
        style="max-width: 100%"
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ offset: 0, span: 0 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="email"
          :rules="[
            { required: true, message: 'Please input your email!' },
            {
              type: 'email',
              message: 'Email is not valid',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <a-typography>Email</a-typography>
          <a-input v-model:value="formState.email" placeholder="Email" />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-typography>Password</a-typography>
          <a-input-password
            v-model:value="formState.password"
            placeholder="Password"
          />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 0, span: 12 }">
          <a-checkbox v-model:checked="formState.remember"
            >Remember me</a-checkbox
          >
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 0, span: 16 }">
          <a-button type="primary" html-type="submit" :loading="formLoading">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "../../stores/auth";

import { message } from "ant-design-vue";
import router from "../../router";

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

const formLoading = ref(false);
const authStore = useAuthStore();
const formState = reactive<FormState>({
  email: "",
  password: "",
  remember: true,
});

const success = () => {
  message.success("Login successfully", 5);
  router.push('admin/profile')
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

const onFinish = async (values: FormState) => {
  formLoading.value = true;
  authStore
    .signInWithEmail(values.email, values.password)
    .then(() => success())
    .catch((err) => errors(err))
    .finally(() => {
      formLoading.value = false;
    });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

onMounted(async () => {
  // Optionally refetch session (only if needed)
  if (!authStore.session && !authStore.user) {
    await authStore.fetchUser()
  }

  if (authStore.user) {
    router.replace('admin/dashboard') // already logged in, redirect
  }
})
</script>
