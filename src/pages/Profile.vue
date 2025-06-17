<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    @finish="onFinish"
    style="width: 100%; padding: 20px"
  >
    <a-space direction="vertical" style="width: 100%; margin-bottom: 20px">
      <a-typography-text>Avatar</a-typography-text>
      <a-flex justify="start" align="center" gap="middle">
        <a-avatar
          src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
          :size="{ xs: 40, sm: 40, md: 40, lg: 64, xl: 64, xxl: 64 }"
        >
          <template #icon>
            <AntDesignOutlined />
          </template>
        </a-avatar>
        <a-button type="primary" html-type="submit">Upload</a-button>
      </a-flex>
    </a-space>

    <!-- <a-space direction="vertical" style="width: 100%;"> -->
    <a-typography-text>Username</a-typography-text>
    <a-form-item name="username" style="margin-bottom: -16px">
      <a-input v-model:value="formState.username" placeholder="Username" />
    </a-form-item>
    <!-- </a-space> -->

    <!-- <a-space direction="vertical" style="width: 100%"> -->
    <a-typography-text>Bio</a-typography-text>
    <a-form-item name="bio" style="margin-bottom: -16px">
      <a-input v-model:value="formState.bio" placeholder="Bio ( optional )" />
    </a-form-item>
    <!-- </a-space> -->

    <a-typography-text>Website</a-typography-text>
    <a-form-item name="website">
      <a-input
        name="website"
        v-model:value="formState.website"
        placeholder="Website ( optional )"
        style="width: calc(100% - 32px)"
      />
      <a-tooltip title="copy url">
        <a-button>
          <template #icon>
            <CopyOutlined />
          </template>
        </a-button>
      </a-tooltip>
    </a-form-item>

    <!-- <a-form-item name="bio">
      <a-input v-model:value="formState.bio" placeholder="Website ( optional )" />
    </a-form-item> -->

    <a-space>
      <a-form-item>
        <a-button @click="resetForm">Reset</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="isLoading">Save</a-button>
      </a-form-item>
    </a-space>
  </a-form>
</template>

<style>
/* Change font size of error messages */
.ant-form-item-explain-error {
  font-size: 12px;
}
</style>

<script setup lang="ts">
import { CopyOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { getProfileById, updateProfileById, type IProfile } from "../services/ProfileService";
import { useAuthStore } from "../stores/auth";

// Reactive form state
const formState = reactive({
  avatar: null,
  username: "",
  bio: "",
  website: "",
});

// Form reference
const formRef = ref();
const isLoading = ref(false)
const auth = useAuthStore();
const profileUser = ref<IProfile>();

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
    { required: true, message: "Please input your username!", trigger: "blur" },
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
    { required: true, message: "Please input your email!", trigger: "blur" },
    { type: "email", message: "Please enter a valid email!", trigger: "blur" },
  ],
};

// Handle form submission
const onFinish = async (values: IProfile) => {
  await saveProfile(values);
};

// Reset form
const resetForm = () => {
  formRef.value.resetFields();
};

const saveProfile = async (profile: Partial<IProfile>) => {
  isLoading.value = true
  updateProfileById(`${auth.user?.id}`, profile).then().catch(e => e).finally(() => {
    isLoading.value = false
  })
};

onMounted(async () => {
  if (auth.user) {
   const profile = await getProfileById(auth.user.id);
   Object.assign(formState, profile)
  }
})

</script>
