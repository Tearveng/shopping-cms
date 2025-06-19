<template>
  <a-form
    @finish="onFinish"
    ref="formRef"
    style="padding: 20px"
    :rules="rules"
    :model="formState"
  >
    <a-space direction="vertical" size="middle" style="width: 100%">
      <a-space direction="vertical" style="width: 100%">
        <a-typography-text>About me</a-typography-text>
        <a-form-item name="about">
          <a-textarea
            v-model:value="formState.about"
            placeholder="Write here ..."
            :auto-size="{ minRows: 5, maxRows: 10 }"
          />
        </a-form-item>
      </a-space>
      <a-space>
        <a-button @click="resetForm">Reset</a-button>
        <a-button type="primary" html-type="submit" :loading="isLoading"
          >Submit</a-button
        >
      </a-space>
    </a-space>
  </a-form>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import {
getAboutMeById,
insertAboutMe,
updateAboutById,
} from "../services/AboutService";
import { useAuthStore } from "../stores/auth";

export interface AboutMe {
  id?: number;
  about: string;
}

const rules = {
  about: [
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
const formState = reactive<AboutMe>({
  about: "",
});

// Reset form
const resetForm = () => {
  formRef.value.resetFields();
};

const success = () => {
  message.success("Created successfully", 5);
};

const updated = () => {
  message.success("Updated successfully", 5);
};

const errors = (msg: string) => {
  message.error(msg, 5);
};

const onFinish = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        isLoading.value = true;
        if (formState.id) {
          updateAboutById({
            id: formState.id,
            about: formState.about,
            user_id: `${auth.user?.id}`,
          })
            .then(() => updated())
            .catch((e) => errors(e))
            .finally(() => {
              isLoading.value = false;
            });
        } else {
          insertAboutMe({
            about: formState.about,
            user_id: `${auth.user?.id}`,
          })
            .then((res) => {
              Object.assign(formState, res);
              success();
            })
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
    const about = await getAboutMeById(auth.user.id);
    Object.assign(formState, about);
  }
});
</script>
