<template>
  <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      @finish="onFinish"
      style="width: 100%; padding: 20px;"
  >
    <a-space direction="vertical" style="width: 100%; margin-bottom: 20px">
      <a-typography-text>Avatar</a-typography-text>
      <a-flex justify="start" align="center" gap="middle">
        <a-avatar
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            :size="{ xs: 40, sm: 40, md: 40, lg: 64, xl: 64, xxl: 64 }"
        >
          <template #icon>
            <AntDesignOutlined/>
          </template>
        </a-avatar>
        <a-button type="primary" html-type="submit">Upload</a-button>
      </a-flex>
    </a-space>

    <a-space direction="vertical" style="width: 100%">
      <a-typography-text>Username</a-typography-text>
      <a-form-item name="username">
        <a-input v-model:value="formState.username" placeholder="Username"/>
      </a-form-item>
    </a-space>

    <a-space direction="vertical" style="width: 100%">
      <a-typography-text>Bio</a-typography-text>
      <a-form-item name="bio">
        <a-input v-model:value="formState.bio" placeholder="Bio ( optional )"/>
      </a-form-item>
    </a-space>

    <a-space>
      <a-form-item>
        <a-button @click="resetForm">Reset</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-space>
  </a-form>

  <!-- <form @submit="handleSubmit" @reset="handleReset" style="padding: 20px">
    <a-space direction="vertical" size="small" style="width: 100%">
      <a-space direction="vertical" style="width: 100%">
        <a-typography-text>Avatar</a-typography-text>
        <a-space size="small">
          <a-avatar
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            :size="{ xs: 40, sm: 40, md: 40, lg: 64, xl: 64, xxl: 64 }"
          >
            <template #icon>
              <AntDesignOutlined />
            </template>
          </a-avatar>
          <a-button type="ghost" @click="triggerFileInput">Upload</a-button>
          <input
            type="file"
            id="file"
            ref="profileRef"
            accept="image/*"
            v-bind="register('file', { type: 'file' })"
          />
        </a-space>
        <a-typography-title
          v-if="errors.file"
          type="danger"
          style="font-size: 12px; font-weight: normal; margin-top: 4px"
        >
          {{ errors.file }}
        </a-typography-title>
      </a-space>

      <a-space direction="vertical" style="width: 100%">
        <a-typography-text>Username</a-typography-text>
        <div>
          <a-input
            v-model:value="username"
            placeholder="Username"
            v-bind="usernameFieldAttrs"
          />
          <a-typography-title
            v-if="errors.username"
            type="danger"
            style="font-size: 12px; font-weight: normal; margin-top: 4px"
          >
            {{ errors.username }}
          </a-typography-title>
        </div>
      </a-space>

      <a-space direction="vertical" style="width: 100%">
        <a-typography-text>Bio</a-typography-text>
        <a-input v-model:value="bio" placeholder="Bio" v-bind="bioFieldAttrs" />
      </a-space>

      <a-space>
        <a-button>Reset</a-button>
        <a-button type="primary" @click="handleSubmit">Submit</a-button>
      </a-space>
    </a-space>
  </form> -->
</template>

<style scoped>
/* Change font size of error messages */
.ant-form-explain {
  font-size: 12px; /* Adjust font size as needed */
  color: #fff; /* Keep default error color, or customize */
}
</style>

<script setup lang="ts">
import {reactive, ref} from "vue";

// Reactive form state
const formState = reactive({
  username: "",
  bio: "",
  email: "",
});

// Form reference
const formRef = ref();

// Custom validator for password
// const validatePassword = async (_, value) => {
//   if (!value) {
//     return Promise.reject('Please input your password!');
//   }
//   if (value.length < 8) {
//     return Promise.reject('Password must be at least 8 characters!');
//   }
//   if (!/[A-Z]/.test(value)) {
//     return Promise.reject('Password must contain at least one uppercase letter!');
//   }
//   return Promise.resolve();
// };

// Validation rules
const rules = {
  username: [
    {required: true, message: "Please input your username!", trigger: "blur"},
    {
      min: 3,
      max: 20,
      message: "Username must be 3-20 characters!",
      trigger: "blur",
    },
  ],
  // password: [
  //   { required: true, validator: validatePassword, trigger: 'blur' },
  // ],
  email: [
    {required: true, message: "Please input your email!", trigger: "blur"},
    {type: "email", message: "Please enter a valid email!", trigger: "blur"},
  ],
};

// Handle form submission
const onFinish = (values: any) => {
  console.log("Form values:", values);
};

// Reset form
const resetForm = () => {
  formRef.value.resetFields();
};

</script>