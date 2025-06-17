<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
    style="width: 100%; padding: 20px"
  >
    <a-typography-text>Contact</a-typography-text>
    <br />
    <br />
    <a-form-item
      v-for="(contact, index) in dynamicValidateForm.contacts"
      :key="contact.key"
      v-bind="formItemLayout"
    >
      <a-form-item
        style="margin-bottom: -16px"
        :name="['contacts', index, 'title']"
        :rules="[
          { required: true, message: 'Title is required', trigger: 'change' },
        ]"
      >
        <a-flex>
          <MinusCircleOutlined
            style="margin-right: 12px"
            v-if="dynamicValidateForm.contacts.length > 1"
            class="dynamic-delete-button"
            @click="removeDomain(contact)"
          />
          <a-input
            name="contact.title"
            v-model:value="contact.title"
            placeholder="Title"
            style="width: 100%"
          />
        </a-flex>
      </a-form-item>

        <a-form-item
          style="margin-bottom: -16px; width: 100%; flex-direction: row;"
          :name="['contacts', index, 'alias']"
          :rules="[
            {
              required: true,
              message: 'Alias is required',
              trigger: 'change',
            },
          ]"
        >
          <a-input
            name="contact.alias"
            v-model:value="contact.alias"
            placeholder="Alias"
            style="width: 100%; margin-right: 8px;"
          />
        </a-form-item>
        <a-form-item
          style="margin-bottom: -16px;"
          :name="['contacts', index, 'url']"
          :rules="[
            {
              required: true,
              message: 'Url is required',
              trigger: 'change',
            },
          ]"
        >
          <a-input
            addon-before="https://"
            name="contact.url"
            v-model:value="contact.url"
            placeholder="Url"
            style="width: 100%; margin-right: 8px"
          />
        </a-form-item>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addDomain">
        <PlusOutlined />
        Add field
      </a-button>
    </a-form-item>
    <a-button @click="resetForm">Reset</a-button>
    <a-button
      type="primary"
      style="margin-left: 10px"
      html-type="submit"
      @click="submitForm"
      >Submit</a-button
    >
  </a-form>
</template>

<script setup lang="ts">
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import { reactive, ref, toRaw } from "vue";

interface Contact {
  key: number;
  title: string;
  alias: string;
  url: string;
}

interface Domain {
  value: string;
  key: number;
}
const formRef = ref<FormInstance>();
// const fileList = ref<UploadProps['fileList']>([])
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const dynamicValidateForm = reactive<{ contacts: Contact[] }>({
  contacts: [],
});

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const submitForm = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", toRaw(dynamicValidateForm.contacts));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
};
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = "";
};

const removeDomain = (item: Contact) => {
  const index = dynamicValidateForm.contacts.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.contacts.splice(index, 1);
  }
};
const addDomain = () => {
  dynamicValidateForm.contacts.push({
    key: Date.now(),
    title: "",
    alias: "",
    url: "",
  });
};
</script>
<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
