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
          :src="formState.avatar"
          :size="{ xs: 40, sm: 40, md: 40, lg: 64, xl: 64, xxl: 64 }"
        >
          <template #icon>
            <AntDesignOutlined />
          </template>
        </a-avatar>
        <a-upload
          :before-upload="beforeUpload"
          :custom-request="customUpload"
          accept="image/*"
          list-type="picture"
          :show-upload-list="false"
        >
          <a-button :loading="isLoadingAvatar">
            <upload-outlined></upload-outlined>
            Upload Image
          </a-button>
        </a-upload>
      </a-flex>
    </a-space>

    <a-typography-text>Username</a-typography-text>
    <a-form-item name="username" style="margin-bottom: -16px">
      <a-input v-model:value="formState.username" placeholder="Username" />
    </a-form-item>

    <a-typography-text>Bio</a-typography-text>
    <a-form-item name="bio" style="margin-bottom: -16px">
      <a-input v-model:value="formState.bio" placeholder="Bio ( optional )" />
    </a-form-item>

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

    <a-space>
      <a-form-item>
        <a-button @click="resetForm">Reset</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="isLoading"
          >Save</a-button
        >
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
import { message } from "ant-design-vue";
import { onMounted, reactive, ref, toRaw } from "vue";
import { supabase } from "../lib/supabase";
import {
getProfileById,
insertProfileById,
updateProfileById,
type IProfile,
} from "../services/ProfileService";
import { useAuthStore } from "../stores/auth";

export interface Profile {
  id?: number;
  avatar: string | null;
  username: string;
  bio: string;
  website: string;
}

// Reactive form state
const formState = reactive<Profile>({
  avatar: null,
  username: "",
  bio: "",
  website: "",
});

// Form reference
const formRef = ref();
const isLoading = ref(false);
const isLoadingAvatar = ref(false);
const auth = useAuthStore();

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
  email: [
    { required: true, message: "Please input your email!", trigger: "blur" },
    { type: "email", message: "Please enter a valid email!", trigger: "blur" },
  ],
};

// Validate file before upload
const beforeUpload = (file: any) => {
  const isImage = file.type.startsWith("image/");
  const isLt5M = file.size / 1024 / 1024 < 5; // Limit to 5MB
  if (!isImage) {
    message.error("You can only upload image files!");
  }
  if (!isLt5M) {
    message.error("Image must be smaller than 5MB!");
  }
  return isImage && isLt5M; // Allow upload if valid
};

const update = () => {
  message.success("Updated successfully", 5);
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

// Custom upload handler for Supabase
const customUpload = async ({ file, onSuccess, onError }: any) => {
  try {
    isLoadingAvatar.value = true;
    // Generate unique file path
    const filePath = `${auth.user?.id}/${Date.now()}-${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from("portfolio-cms") // Replace with your bucket name
      .upload(filePath, file, {
        cacheControl: "3600", // Cache for 1 hour
        upsert: false, // Prevent overwriting
        contentType: file.type, // Set MIME type (e.g., image/jpeg)
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL for the uploaded image
    const { data: urlData } = supabase.storage
      .from("portfolio-cms")
      .getPublicUrl(filePath);

    formState.avatar = urlData.publicUrl;
    onSuccess(data); // Notify Ant Design upload success
    const { avatar, ...rest } = formState;
    await saveAvatar({ ...rest, profile_url: urlData.publicUrl, });
  } catch (err: any) {
    message.error(`Upload failed: ${err.message}`);
    onError(err); // Notify Ant Design upload failure
  }
};

// Handle form submission
const onFinish = async () => {
  const { avatar, ...rest } = toRaw(formState);
  await saveProfile(rest);
};

// Reset form
const resetForm = () => {
  formRef.value.resetFields();
};

const saveAvatar = async (profile: Partial<IProfile>) => {
  if (profile.id) {
    updateProfileById(`${auth.user?.id}`, profile)
      .then(() => message.success("Image updated successfully!"))
      .catch((e) => errors(e))
      .finally(() => {
        isLoadingAvatar.value = false;
      });
  } else {
    insertProfileById({ ...profile, user_id: `${auth.user?.id}` })
      .then((res) => {
        formState.avatar = res.profile_url;
        Object.assign(formState, res);
        message.success("Image created successfully!");
      })
      .catch((e) => errors(e))
      .finally(() => {
        isLoadingAvatar.value = false;
      });
  }
};

const saveProfile = async (profile: Partial<IProfile>) => {
  isLoading.value = true;
  if (profile.id) {
    updateProfileById(`${auth.user?.id}`, profile)
      .then(() => update())
      .catch((e) => errors(e))
      .finally(() => {
        isLoading.value = false;
      });
  } else {
    insertProfileById({
      ...profile,
      user_id: `${auth.user?.id}`,
    })
      .then((res) => {
        Object.assign(formState, res);
        update();
      })
      .catch((e) => errors(e))
      .finally(() => {
        isLoading.value = false;
      });
  }
};

onMounted(async () => {
  if (auth.user) {
    const profile = await getProfileById(auth.user.id);
    formState.avatar = profile.profile_url;
    Object.assign(formState, profile);
  }
});
</script>
